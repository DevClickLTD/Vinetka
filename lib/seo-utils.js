/**
 * SEO Utility Functions
 * 
 * Помощни функции за SEO оптимизация
 */

const SITE_URL = 'https://www.avtovia.bg';

/**
 * Генерира абсолютен canonical URL
 * 
 * @param {string} locale - Локал (bg, en, etc.)
 * @param {string} path - Път без locale (/tseni, /contact, etc.)
 * @returns {string} Пълен абсолютен URL
 */
export function getCanonicalUrl(locale, path = '') {
  // Премахни leading slash ако има
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Ако няма path, връщай само с locale
  if (!cleanPath) {
    return `${SITE_URL}/${locale}`;
  }
  
  return `${SITE_URL}/${locale}/${cleanPath}`;
}

/**
 * Генерира абсолютен URL за изображение
 * 
 * @param {string} imagePath - Релативен път към изображението
 * @returns {string} Пълен абсолютен URL
 */
export function getAbsoluteImageUrl(imagePath) {
  // Ако вече е абсолютен URL, върни го директно
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Премахни leading slash ако има
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${SITE_URL}/${cleanPath}`;
}

/**
 * Генерира hreflang links за всички локали
 * 
 * @param {string} path - Път без locale
 * @param {Array<string>} locales - Масив с локали
 * @returns {Object} Обект с hreflang данни (абсолютни URL-и)
 */
export function getHreflangLinks(path = '', locales = ['bg', 'en', 'de', 'ru', 'tr', 'el', 'sr', 'ro', 'mk']) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const links = {};
  
  // Добавяне на x-default (абсолютен URL)
  links['x-default'] = cleanPath ? `${SITE_URL}/bg/${cleanPath}` : `${SITE_URL}/bg`;
  
  // Добавяне на всички локали (абсолютни URL-и)
  locales.forEach(locale => {
    const fullPath = cleanPath ? `${SITE_URL}/${locale}/${cleanPath}` : `${SITE_URL}/${locale}`;
    links[locale] = fullPath;
  });
  
  return links;
}

/**
 * Генерира пълен metadata обект с правилни canonical и OG изображения
 * 
 * @param {Object} params - Параметри
 * @param {string} params.locale - Локал
 * @param {string} params.path - Път
 * @param {string} params.title - Заглавие
 * @param {string} params.description - Описание
 * @param {string} params.image - Изображение (релативен път)
 * @param {Array<string>} params.keywords - Keywords
 * @returns {Object} Metadata обект
 */
export function generateSEOMetadata({
  locale = 'bg',
  path = '',
  title,
  description,
  image = '/default.webp',
  keywords = [],
  type = 'website'
}) {
  const canonical = getCanonicalUrl(locale, path);
  const absoluteImage = getAbsoluteImageUrl(image);
  const ogLocale = locale === 'bg' ? 'bg_BG' : `${locale}_${locale.toUpperCase()}`;
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: getHreflangLinks(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Vinetka.bg',
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
    },
  };
}

/**
 * Генерира breadcrumb schema
 * 
 * @param {Array} items - Масив с breadcrumb items
 * @returns {Object} BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": getCanonicalUrl(item.locale || 'bg', item.path || '')
    }))
  };
}
