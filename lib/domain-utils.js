/**
 * Domain Detection Utilities
 * 
 * Помощни функции за детекция на домейн и brand-specific конфигурация
 */

/**
 * Детектира текущия домейн от headers
 * 
 * @param {Headers} headers - Next.js headers
 * @returns {string} 'vinetka' или 'avtovia'
 */
export function detectDomain(headers) {
  // Проверяваме различни header варианти (Vercel използва x-forwarded-host)
  const host = headers.get('host') || '';
  const forwardedHost = headers.get('x-forwarded-host') || '';
  const referer = headers.get('referer') || '';
  
  // Проверяваме всички възможни headers за vinetka.bg домейн
  const allHosts = `${host} ${forwardedHost} ${referer}`.toLowerCase();
  
  if (allHosts.includes('vinetka.bg')) {
    return 'vinetka';
  }
  
  // По подразбиране avtovia.bg
  return 'avtovia';
}

/**
 * Връща базовия URL за текущия домейн
 * 
 * @param {string} domain - 'vinetka' или 'avtovia'
 * @returns {string} Пълен URL
 */
export function getSiteUrl(domain) {
  return domain === 'vinetka' 
    ? 'https://www.vinetka.bg' 
    : 'https://www.avtovia.bg';
}

/**
 * Връща brand name за текущия домейн
 * 
 * @param {string} domain - 'vinetka' или 'avtovia'
 * @returns {string} Brand name
 */
export function getBrandName(domain) {
  return domain === 'vinetka' ? 'vinetka bg' : 'avtovia bg';
}

/**
 * Връща пълното site name за текущия домейн
 * 
 * @param {string} domain - 'vinetka' или 'avtovia'
 * @returns {string} Site name
 */
export function getSiteName(domain) {
  return domain === 'vinetka' ? 'Vinetka.bg' : 'Avtovia.bg';
}

/**
 * Генерира абсолютен URL за даден path и domain
 * 
 * @param {string} domain - 'vinetka' или 'avtovia'
 * @param {string} locale - Локал
 * @param {string} path - Път
 * @returns {string} Абсолютен URL
 */
export function getAbsoluteUrl(domain, locale, path = '') {
  const baseUrl = getSiteUrl(domain);
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  if (!cleanPath) {
    return `${baseUrl}/${locale}`;
  }
  
  return `${baseUrl}/${locale}/${cleanPath}`;
}
