import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  // Skip API routes entirely — no locale prefix needed
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip Next.js internals and static assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/_vercel') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // vinetka.bg → avtovia.bg 301 permanent redirect (global SEO)
  if (hostname.includes('vinetka.bg')) {
    const newUrl = new URL(pathname, 'https://www.avtovia.bg');
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // next-intl handles: locale prefix, localized pathname rewrites, missing-locale redirects
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(bg|en|de|ru|tr|el|sr|ro|mk|fr|hu|uk)/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};
