import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import { encodeBlogSlug } from './lib/seo-utils';

const intlMiddleware = createMiddleware(routing);
const LOCALE_PATTERN = 'bg|en|de|ru|tr|el|sr|ro|mk|fr|hu|uk';

/**
 * Rewrites non-canonical blog slug paths internally (raw Unicode → percent-encoded).
 * Uses rewrite (not redirect) to avoid infinite 308 loops on Vercel, which
 * decodes URL paths before middleware runs.
 */
function canonicalizeBlogSlugRequest(request) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(new RegExp(`^/(${LOCALE_PATTERN})/blog/([^/?#]+)$`));

  if (!match) return null;

  const [, locale, slugSegment] = match;
  const encoded = encodeBlogSlug(slugSegment);
  const canonicalPath = `/${locale}/blog/${encoded}`;

  // Already at the canonical encoded path — serve directly
  if (slugSegment === encoded) {
    return null;
  }

  // Rewrite internally to encoded path (no redirect response → no loop)
  const url = request.nextUrl.clone();
  url.pathname = canonicalPath;
  return NextResponse.rewrite(url);
}

export default function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/_next') || pathname.startsWith('/_vercel') || pathname.includes('.')) {
    return NextResponse.next();
  }

  if (hostname.includes('vinetka.bg')) {
    const newUrl = new URL(pathname, 'https://www.avtovia.bg');
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  const blogRewrite = canonicalizeBlogSlugRequest(request);
  if (blogRewrite) return blogRewrite;

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(bg|en|de|ru|tr|el|sr|ro|mk|fr|hu|uk)/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};
