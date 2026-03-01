/**
 * Generate the correct web app URL based on the current locale
 * Maps locale codes to the web app's language parameter
 * 
 * @param {string} locale - The current locale (bg, en, de, ru, tr, el, sr, ro, mk)
 * @returns {string} - The web app URL with the appropriate language parameter
 */
export function getWebAppUrl(locale) {
  const baseUrl = 'https://web.avtovia.bg/';
  
  // Map locale codes to web app language parameters
  const localeMap = {
    'bg': '', // Bulgarian is default, no parameter needed
    'en': '?lang=en',
    'de': '?lang=de',
    'ru': '?lang=ru',
    'tr': '?lang=tr',
    'el': '?lang=gr', // Greek uses 'gr' in the web app
    'sr': '?lang=sr',
    'ro': '?lang=ro',
    'mk': '?lang=mk'
  };
  
  // Get the language parameter for the current locale
  const langParam = localeMap[locale] || '';
  
  return `${baseUrl}${langParam}`;
}
