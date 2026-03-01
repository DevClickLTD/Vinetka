/**
 * Blog Posting Schemas
 * 
 * Използване:
 * import { getBlogPostingSchema, getBlogSchema } from '@/lib/schemas/blogSchemas';
 */

/**
 * Генерира BlogPosting Schema за отделна статия
 * 
 * @param {object} post - WordPress post обект
 * @param {string} locale - Език
 * @param {string} baseUrl - Базов URL
 * @returns {object} BlogPosting Schema
 */
export function getBlogPostingSchema(post, locale = 'bg', baseUrl = 'https://www.avtovia.bg') {
  const yoast = post.yoast_head_json || {};
  const ogImage = yoast.og_image?.[0];
  
  // Extract plain text from content
  const plainText = post.content?.rendered 
    ? post.content.rendered.replace(/<[^>]+>/g, '').trim()
    : '';
  
  const wordCount = plainText.split(/\s+/).length;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}/${locale}/blog/${post.slug}#blogpost`,
    "headline": post.title?.rendered || yoast.og_title || '',
    "alternativeHeadline": yoast.og_title !== yoast.title ? yoast.title : undefined,
    "description": yoast.og_description || yoast.description || '',
    "image": ogImage ? {
      "@type": "ImageObject",
      "url": ogImage.url,
      "width": ogImage.width || 1200,
      "height": ogImage.height || 630,
      "caption": ogImage.alt || post.title?.rendered
    } : {
      "@type": "ImageObject",
      "url": `${baseUrl}/default.webp`,
      "width": 1200,
      "height": 630
    },
    "datePublished": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    "dateModified": post.modified ? new Date(post.modified).toISOString() : new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author_name || "Avtovia.bg Team",
      "url": `${baseUrl}/${locale}/za-nas`,
      "image": {
        "@type": "ImageObject",
        "url": post.author_avatar || `${baseUrl}/avtovia-logo.svg`
      }
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Avtovia.bg",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/avtovia-logo.svg`,
        "width": 250,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${post.slug}`
    },
    "url": `${baseUrl}/${locale}/blog/${post.slug}`,
    "articleSection": determineArticleSection(post, locale),
    "articleBody": plainText.substring(0, 5000), // First 5000 chars
    "wordCount": wordCount,
    "keywords": extractKeywords(post, yoast),
    "inLanguage": locale === 'bg' ? 'bg-BG' : `${locale}-${locale.toUpperCase()}`,
    "isPartOf": {
      "@type": "Blog",
      "@id": `${baseUrl}/${locale}/blog#blog`,
      "name": locale === 'bg' ? "Блог Avtovia.bg" : "Avtovia.bg Blog",
      "url": `${baseUrl}/${locale}/blog`
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".wordpress-content"]
    },
    "about": generateAboutEntities(post, locale),
    "mentions": generateMentions(post, baseUrl, locale)
  };
}

/**
 * Генерира Blog Schema за основната блог страница
 */
export function getBlogSchema(locale = 'bg', baseUrl = 'https://www.avtovia.bg') {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/${locale}/blog#blog`,
    "url": `${baseUrl}/${locale}/blog`,
    "name": locale === 'bg' ? "Блог Avtovia.bg - Новини и съвети за винетки" : "Avtovia.bg Blog - Vignette News and Tips",
    "description": locale === 'bg' 
      ? "Актуална информация, новини и полезни съвети за електронни винетки в България. Научете всичко за цените, законовите изисквания и как да избегнете глоби."
      : "Current information, news and useful tips about electronic vignettes in Bulgaria. Learn everything about prices, legal requirements and how to avoid fines.",
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": locale === 'bg' ? 'bg-BG' : `${locale}-${locale.toUpperCase()}`,
    "blogPost": [] // Will be populated dynamically with actual posts
  };
}

/**
 * Генерира CollectionPage Schema за блог листинг
 */
export function getBlogListingSchema(posts, currentPage, totalPages, locale = 'bg', baseUrl = 'https://www.avtovia.bg') {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/${locale}/blog?page=${currentPage}#collectionpage`,
    "url": `${baseUrl}/${locale}/blog?page=${currentPage}`,
    "name": locale === 'bg' ? `Блог - Страница ${currentPage}` : `Blog - Page ${currentPage}`,
    "description": locale === 'bg' 
      ? "Новини и статии за електронни винетки в България"
      : "News and articles about electronic vignettes in Bulgaria",
    "isPartOf": {
      "@type": "Blog",
      "@id": `${baseUrl}/${locale}/blog#blog`
    },
    "hasPart": posts.map(post => ({
      "@type": "BlogPosting",
      "@id": `${baseUrl}/${locale}/blog/${post.slug}#blogpost`,
      "headline": post.title?.rendered,
      "url": `${baseUrl}/${locale}/blog/${post.slug}`,
      "datePublished": post.date ? new Date(post.date).toISOString() : undefined,
      "image": post.yoast_head_json?.og_image?.[0]?.url || `${baseUrl}/default.webp`
    })),
    "pagination": currentPage > 1 || currentPage < totalPages ? {
      "@type": "Pagination",
      "currentPage": currentPage,
      "numberOfPages": totalPages,
      "previousPage": currentPage > 1 ? `${baseUrl}/${locale}/blog?page=${currentPage - 1}` : undefined,
      "nextPage": currentPage < totalPages ? `${baseUrl}/${locale}/blog?page=${currentPage + 1}` : undefined
    } : undefined
  };
}

/**
 * Helper functions
 */

function determineArticleSection(post, locale) {
  const title = (post.title?.rendered || '').toLowerCase();
  const content = (post.content?.rendered || '').toLowerCase();
  const combined = title + ' ' + content;
  
  const sections = {
    bg: {
      'винетки': 'Винетки и пътни такси',
      'закон': 'Законодателство',
      'цен': 'Цени и тарифи',
      'глоб': 'Глоби и санкции',
      'пътуван': 'Пътувания',
      'съвет': 'Съвети и препоръки'
    },
    en: {
      'vignette': 'Vignettes and Road Tolls',
      'law': 'Legislation',
      'price': 'Prices and Tariffs',
      'fine': 'Fines and Penalties',
      'travel': 'Travel',
      'tip': 'Tips and Recommendations'
    }
  };
  
  const sectionMap = sections[locale] || sections.bg;
  
  for (const [keyword, section] of Object.entries(sectionMap)) {
    if (combined.includes(keyword)) {
      return section;
    }
  }
  
  return locale === 'bg' ? 'Общи статии' : 'General Articles';
}

function extractKeywords(post, yoast) {
  const keywords = new Set();
  
  // From Yoast meta keywords
  if (yoast.keywords) {
    yoast.keywords.split(',').forEach(kw => keywords.add(kw.trim()));
  }
  
  // Default keywords
  const defaultKeywords = [
    'винетки', 'електронна винетка', 'България', 'пътни такси',
    'vignette', 'electronic vignette', 'Bulgaria', 'road tolls'
  ];
  
  defaultKeywords.forEach(kw => keywords.add(kw));
  
  return Array.from(keywords);
}

function generateAboutEntities(post, locale) {
  return [
    {
      "@type": "Thing",
      "name": locale === 'bg' ? "Електронни винетки" : "Electronic Vignettes",
      "description": locale === 'bg' 
        ? "Електронна система за заплащане на пътни такси"
        : "Electronic road toll payment system"
    },
    {
      "@type": "Place",
      "name": locale === 'bg' ? "България" : "Bulgaria",
      "sameAs": "https://en.wikipedia.org/wiki/Bulgaria"
    }
  ];
}

function generateMentions(post, baseUrl, locale) {
  const mentions = [
    {
      "@type": "Organization",
      "name": "Агенция Пътна инфраструктура",
      "url": "https://www.bgtoll.bg"
    }
  ];
  
  // Add mentions of vignette types if found in content
  const content = (post.content?.rendered || '').toLowerCase();
  const vignetteTypes = ['годишна', 'месечна', 'седмична', 'тримесечна', 'уикенд'];
  
  vignetteTypes.forEach(type => {
    if (content.includes(type)) {
      mentions.push({
        "@type": "Thing",
        "name": `${type.charAt(0).toUpperCase() + type.slice(1)} винетка`,
        "url": `${baseUrl}/${locale}/tseni/${type}`
      });
    }
  });
  
  return mentions;
}
