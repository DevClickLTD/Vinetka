import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';

// Създаваме next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Redirect to default locale if none is specified
  localePrefix: 'always',
  
  // Disable automatic locale detection to ensure bg is always default
  localeDetection: false
});

export default function middleware(request) {
  const { pathname, hostname } = request.nextUrl;
  
  // Проверяваме дали URL-ът вече има език префикс
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Пропускаме Next.js файлове и статични ресурси
  if (pathname.startsWith('/_next') || pathname.startsWith('/_vercel') || pathname.includes('.')) {
    return intlMiddleware(request);
  }
  
  // Ако няма език префикс, правим 301 редирект
  if (!pathnameHasLocale) {
    // Премахваме trailing slash ако има
    const cleanPath = pathname.endsWith('/') && pathname !== '/' 
      ? pathname.slice(0, -1) 
      : pathname;
    
    // Създаваме нов URL с език префикс
    const newUrl = new URL(`/${defaultLocale}${cleanPath === '/' ? '' : cleanPath}`, request.url);
    
    return NextResponse.redirect(newUrl, { status: 301 }); // 301 permanent redirect
  }
  
  // За всички останали случаи използваме стандартния next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(bg|en|de|ru|tr|el|sr|ro|mk)/:path*',
    
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
