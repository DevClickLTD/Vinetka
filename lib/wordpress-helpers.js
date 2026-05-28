/**
 * WordPress Content Helpers
 * 
 * Помощни функции за работа с преведено WordPress съдържание
 */

import wordpressContent from '../messages/wordpress-content.json';
import { translationLocales } from './pathnames.mjs';

/**
 * Normalize slug (handle both encoded and decoded versions)
 * WordPress може да връща slugs в URL encoded формат
 */
function normalizeSlug(slug) {
  // Опитай се да декодираш slug-а
  try {
    const decoded = decodeURIComponent(slug);
    // Ако е различно от оригиналния, значи е бил encoded
    if (decoded !== slug) {
      return decoded;
    }
  } catch (e) {
    // Ако има грешка при декодиране, върни оригиналния
  }
  return slug;
}

/**
 * Взима преведена страница или post по slug и locale
 * 
 * @param {string} slug - Slug на страницата/поста
 * @param {string} locale - Език (bg + translationLocales от pathnames.mjs)
 * @param {string} type - Тип ('page' или 'post')
 * @returns {Object|null} Преведеното съдържание или null
 */
export function getTranslatedContent(slug, locale = 'bg', type = 'post') {
  // BG език ВИНАГИ използва fresh data от WordPress API (не от JSON)
  if (locale === 'bg') {
    return null;
  }
  
  const contentStore = type === 'page' ? wordpressContent.pages : wordpressContent.posts;
  
  // Нормализирай slug-а към lowercase (URL encoding е case-insensitive)
  const normalizedInputSlug = slug.toLowerCase();
  
  // Опитай с lowercase slug
  let content = contentStore[normalizedInputSlug];
  
  // Ако не го намери, опитай с encoded версия
  if (!content) {
    const encodedSlug = encodeURIComponent(normalizedInputSlug).toLowerCase();
    content = contentStore[encodedSlug];
  }
  
  // Ако все още не го намери, опитай с decoded версия
  if (!content) {
    const decodedSlug = normalizeSlug(normalizedInputSlug);
    content = contentStore[decodedSlug.toLowerCase()];
  }
  
  if (!content) {
    return null;
  }
  
  // Ако е български или няма превод, връщай BG версията
  if (locale === 'bg' || !content[`title_${locale}`]) {
    return {
      title: content.title_bg,
      content: content.content_bg,
      metaDescription: content.meta_description_bg || '',
      slug: content.slug_bg,
      locale: 'bg',
      hasTranslation: locale === 'bg',
    };
  }
  
  // Връщай преведената версия
  return {
    title: content[`title_${locale}`],
    content: content[`content_${locale}`],
    metaDescription: content[`meta_description_${locale}`] || '',
    slug: content[`slug_${locale}`] || content.slug_bg,
    locale: locale,
    hasTranslation: true,
  };
}

/**
 * Проверява дали съществува превод за даден post/page
 * 
 * @param {string} slug - Slug на страницата/поста
 * @param {string} locale - Език
 * @param {string} type - Тип ('page' или 'post')
 * @returns {boolean} True ако има превод
 */
export function hasTranslation(slug, locale = 'bg', type = 'post') {
  if (locale === 'bg') return true; // BG винаги има
  
  const contentStore = type === 'page' ? wordpressContent.pages : wordpressContent.posts;
  
  // Нормализирай slug-а към lowercase
  const normalizedInputSlug = slug.toLowerCase();
  
  // Опитай с lowercase slug
  let content = contentStore[normalizedInputSlug];
  
  // Ако не го намери, опитай с encoded версия
  if (!content) {
    const encodedSlug = encodeURIComponent(normalizedInputSlug).toLowerCase();
    content = contentStore[encodedSlug];
  }
  
  // Ако все още не го намери, опитай с decoded версия
  if (!content) {
    const decodedSlug = normalizeSlug(normalizedInputSlug);
    content = contentStore[decodedSlug.toLowerCase()];
  }
  
  if (!content) return false;
  
  return Boolean(content[`title_${locale}`]);
}

/**
 * Взима всички налични преводи за даден post/page
 * 
 * @param {string} slug - Slug на страницата/поста
 * @param {string} type - Тип ('page' или 'post')
 * @returns {string[]} Масив с locale кодове които имат превод
 */
export function getAvailableTranslations(slug, type = 'post') {
  const contentStore = type === 'page' ? wordpressContent.pages : wordpressContent.posts;
  
  // Нормализирай slug-а към lowercase
  const normalizedInputSlug = slug.toLowerCase();
  
  // Опитай с lowercase slug
  let content = contentStore[normalizedInputSlug];
  
  // Ако не го намери, опитай с encoded версия
  if (!content) {
    const encodedSlug = encodeURIComponent(normalizedInputSlug).toLowerCase();
    content = contentStore[encodedSlug];
  }
  
  // Ако все още не го намери, опитай с decoded версия
  if (!content) {
    const decodedSlug = normalizeSlug(normalizedInputSlug);
    content = contentStore[decodedSlug.toLowerCase()];
  }
  
  if (!content) return ['bg']; // Само BG по подразбиране
  
  const available = ['bg']; // BG винаги е налично

  translationLocales.forEach((locale) => {
    if (content[`title_${locale}`]) {
      available.push(locale);
    }
  });
  
  return available;
}

/**
 * Инжектира alt атрибути в img тагове без alt или с празен alt
 * Използва се за WordPress HTML съдържание за SEO оптимизация
 * 
 * @param {string} html - HTML съдържание от WordPress
 * @param {string} fallbackTitle - Заглавие на поста за fallback alt текст
 * @param {string} locale - Локал за локализиран fallback
 * @returns {string} HTML с добавени alt атрибути
 */
export function injectImageAlts(html, fallbackTitle = '', locale = 'bg') {
  if (!html) return html;

  const localePrefix = {
    bg: 'Изображение',
    mk: 'Слика',
    en: 'Image',
    de: 'Bild',
    ru: 'Изображение',
    tr: 'Görsel',
    el: 'Εικόνα',
    sr: 'Слика',
    ro: 'Imagine',
    fr: 'Image',
    hu: 'Kép',
    uk: 'Зображення',
  };
  const prefix = localePrefix[locale] || 'Image';

  let counter = 1;
  return html
    // Добавя alt към img без alt атрибут изобщо
    .replace(/<img(?![^>]*\balt\s*=)([^>]*)>/gi, (match, attrs) => {
      const alt = fallbackTitle
        ? `${prefix}: ${fallbackTitle} ${counter++}`
        : `${prefix} ${counter++}`;
      return `<img${attrs} alt="${alt}">`;
    })
    // Заменя alt="" или alt='' (празен alt) с описателен текст
    .replace(/<img([^>]*)\balt\s*=\s*(?:""|'')([^>]*)>/gi, (match, before, after) => {
      const alt = fallbackTitle
        ? `${prefix}: ${fallbackTitle} ${counter++}`
        : `${prefix} ${counter++}`;
      return `<img${before}alt="${alt}"${after}>`;
    });
}

/**
 * Взима превод на post за показване в blog listing
 * 
 * @param {Object} post - WordPress post обект
 * @param {string} locale - Език
 * @returns {Object} Форматиран post обект
 */
export function formatBlogPost(post, locale = 'bg') {
  const translated = getTranslatedContent(post.slug, locale, 'post');
  
  const localeImagePrefix = {
    bg: 'Изображение',
    mk: 'Слика',
    en: 'Image',
    de: 'Bild',
    ru: 'Изображение',
    tr: 'Görsel',
    el: 'Εικόνα',
    sr: 'Слика',
    ro: 'Imagine',
    fr: 'Image',
    hu: 'Kép',
    uk: 'Зображення',
  };

  if (!translated) {
    const title = post.title?.rendered || '';
    const imgAlt = post.yoast_head_json?.og_image?.[0]?.alt;
    const prefix = localeImagePrefix['bg'];
    // Fallback към WordPress данните
    return {
      id: post.id,
      slug: post.slug,
      title,
      excerpt: post.content?.rendered ? 
        post.content.rendered.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150) + '...' : 
        '',
      date: post.date,
      image: post.yoast_head_json?.og_image?.[0]?.url || '/placeholder.webp',
      imageAlt: imgAlt || `${prefix}: ${title}`,
      locale: 'bg',
    };
  }
  
  const imgAlt = post.yoast_head_json?.og_image?.[0]?.alt;
  const prefix = localeImagePrefix[translated.locale] || localeImagePrefix['en'];
  return {
    id: post.id,
    slug: translated.slug,
    title: translated.title,
    excerpt: translated.content ? 
      translated.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150) + '...' : 
      '',
    date: post.date,
    image: post.yoast_head_json?.og_image?.[0]?.url || '/placeholder.webp',
    imageAlt: imgAlt || `${prefix}: ${translated.title}`,
    locale: translated.locale,
    hasTranslation: translated.hasTranslation,
  };
}

/**
 * Проверява дали има преведени постове за даден език
 * 
 * @param {string} locale - Език
 * @returns {boolean} True ако има поне 1 преведен пост
 */
export function hasTranslatedPosts(locale = 'bg') {
  if (locale === 'bg') return true;
  
  const posts = Object.values(wordpressContent.posts);
  return posts.some(post => Boolean(post[`title_${locale}`]));
}

/**
 * Given a translated slug (the localized URL slug) and a locale,
 * returns the original BG slug used as the WordPress post/page key.
 *
 * Used by blog/[slug]/page.js to fetch content when the URL contains
 * a translated slug like "how-to-buy-vignette" instead of the BG slug.
 *
 * @param {string} translatedSlug - The slug as it appears in the URL for this locale
 * @param {string} locale         - The current locale
 * @param {string} type           - 'post' or 'page'
 * @returns {string|null} BG slug, or null if not found
 */
export function getBgSlugFromTranslatedSlug(translatedSlug, locale, type = 'post') {
  if (locale === 'bg') return translatedSlug;

  const store = type === 'page' ? wordpressContent.pages : wordpressContent.posts;

  // Precompute normalised variants of the input for robust matching
  const inputLower = translatedSlug.toLowerCase();
  let inputEncoded = '';
  try { inputEncoded = encodeURIComponent(translatedSlug).toLowerCase(); } catch { /* ignore */ }

  const matchesValue = (stored) => {
    if (!stored) return false;
    if (stored === translatedSlug) return true;
    if (stored.toLowerCase() === inputLower) return true;
    try {
      if (encodeURIComponent(stored).toLowerCase() === inputEncoded) return true;
    } catch { /* ignore */ }
    return false;
  };

  // PRIMARY: match against the target locale's slug field
  const key = `slug_${locale}`;
  for (const [bgSlug, entry] of Object.entries(store)) {
    if (matchesValue(entry[key])) return bgSlug;
  }

  // CROSS-LOCALE FALLBACK: the slug may come from a *different* locale
  // (e.g. user switches from /ru/ → /tr/ and the URL still carries the RU slug).
  // Search every slug_* field so we can still identify the correct post.
  for (const [bgSlug, entry] of Object.entries(store)) {
    for (const [field, val] of Object.entries(entry)) {
      if (!field.startsWith('slug_') || field === 'slug_bg' || field === key) continue;
      if (matchesValue(val)) return bgSlug;
    }
  }

  // Also check pages if type is post
  if (type === 'post') {
    for (const [bgSlug, entry] of Object.entries(wordpressContent.pages)) {
      if (matchesValue(entry[key])) return bgSlug;
      for (const [field, val] of Object.entries(entry)) {
        if (!field.startsWith('slug_') || field === 'slug_bg' || field === key) continue;
        if (matchesValue(val)) return bgSlug;
      }
    }
  }

  return null;
}

/**
 * Returns the translated slug for a given BG slug and locale.
 * Falls back to the BG slug if no translated slug is stored.
 *
 * @param {string} bgSlug  - The BG WordPress slug (key in wordpress-content.json)
 * @param {string} locale  - Target locale
 * @param {string} type    - 'post' or 'page'
 * @returns {string} Translated slug (or BG slug if not available)
 */
export function getTranslatedSlug(bgSlug, locale, type = 'post') {
  if (locale === 'bg') return bgSlug;

  const store = type === 'page' ? wordpressContent.pages : wordpressContent.posts;
  const normalizedBgSlug = bgSlug.toLowerCase();

  let entry = store[normalizedBgSlug];
  if (!entry) {
    entry = store[encodeURIComponent(normalizedBgSlug).toLowerCase()];
  }
  if (!entry) {
    entry = store[normalizeSlug(normalizedBgSlug).toLowerCase()];
  }

  if (!entry) return bgSlug;

  return entry[`slug_${locale}`] || bgSlug;
}

/**
 * Брой преведени постове за даден език
 * 
 * @param {string} locale - Език
 * @returns {number} Брой преведени постове
 */
export function getTranslatedPostsCount(locale = 'bg') {
  if (locale === 'bg') {
    return Object.keys(wordpressContent.posts).length;
  }
  
  const posts = Object.values(wordpressContent.posts);
  return posts.filter(post => Boolean(post[`title_${locale}`])).length;
}
