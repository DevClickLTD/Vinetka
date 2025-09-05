import { getRequestConfig } from 'next-intl/server';

export const locales = ['bg', 'en', 'de', 'ru', 'tr', 'gr', 'srb', 'ro'];
export const defaultLocale = 'bg';

export default getRequestConfig(async ({ requestLocale }) => {
  // This can either be defined statically at the top level or read from the user database
  let locale = await requestLocale;
  
  // Ensure that the incoming `locale` is valid
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
