/**
 * SEO Utility Functions
 * 
 * Помощни функции за SEO оптимизация
 */

import { getSiteUrl } from './domain-utils';

/**
 * Генерира абсолютен canonical URL
 * 
 * @param {string} locale - Локал (bg, en, etc.)
 * @param {string} path - Път без locale (/tseni, /contact, etc.)
 * @param {string} domain - Domain identifier ('vinetka' или 'avtovia')
 * @returns {string} Пълен абсолютен URL
 */
export function getCanonicalUrl(locale, path = '', domain = 'avtovia') {
  const SITE_URL = getSiteUrl(domain);
  
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
 * @param {string} domain - Domain identifier ('vinetka' или 'avtovia')
 * @returns {string} Пълен абсолютен URL
 */
export function getAbsoluteImageUrl(imagePath, domain = 'avtovia') {
  const SITE_URL = getSiteUrl(domain);
  
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
 * @param {string} domain - Domain identifier ('vinetka' или 'avtovia')
 * @returns {Object} Обект с hreflang данни (абсолютни URL-и)
 */
export function getHreflangLinks(path = '', locales = ['bg', 'en', 'de', 'ru', 'tr', 'el', 'sr', 'ro', 'mk'], domain = 'avtovia') {
  const SITE_URL = getSiteUrl(domain);
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
 * @param {string} params.domain - Domain identifier ('vinetka' или 'avtovia')
 * @returns {Object} Metadata обект
 */
export function generateSEOMetadata({
  locale = 'bg',
  path = '',
  title,
  description,
  image = '/default.webp',
  keywords = [],
  type = 'website',
  domain = 'avtovia'
}) {
  const canonical = getCanonicalUrl(locale, path, domain);
  const absoluteImage = getAbsoluteImageUrl(image, domain);
  const ogLocale = locale === 'bg' ? 'bg_BG' : `${locale}_${locale.toUpperCase()}`;
  const siteName = domain === 'vinetka' ? 'Vinetka.bg' : 'Avtovia.bg';
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: getHreflangLinks(path, undefined, domain),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
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
 * @param {string} domain - Domain identifier ('vinetka' или 'avtovia')
 * @returns {Object} BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items, domain = 'avtovia') {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": getCanonicalUrl(item.locale || 'bg', item.path || '', domain)
    }))
  };
}
