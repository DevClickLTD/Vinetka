import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale, pathnames } from './lib/pathnames.js';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
  pathnames,
});
