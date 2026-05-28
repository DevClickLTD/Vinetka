import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import { encodeBlogSlug, normalizeBlogSlug } from './lib/seo-utils';

const intlMiddleware = createMiddleware(routing);
const LOCALE_PATTERN = 'bg|en|de|ru|tr|el|sr|ro|mk|fr|hu|uk';

/**
 * Redirects raw Unicode blog slugs to percent-encoded canonical paths.
 * Next.js/Vercel return 500 for unencoded Cyrillic/Greek in URL paths.
 */
function canonicalizeBlogSlugRedirect(request) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(new RegExp(`^/(${LOCALE_PATTERN})/blog/([^/?#]+)$`));

  if (!match) return null;

  const [, locale, slugSegment] = match;
  const decoded = normalizeBlogSlug(slugSegment);
  const encoded = encodeBlogSlug(slugSegment);

  // Raw Unicode in the path → redirect to encoded canonical URL
  if (slugSegment !== encoded && /[^\x00-\x7F]/.test(slugSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/blog/${encoded}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // Already encoded but not normalized (e.g. mixed casing) → normalize encoding
  if (slugSegment !== encoded && slugSegment === decoded) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/blog/${encoded}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  return null;
}

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

  const blogRedirect = canonicalizeBlogSlugRedirect(request);
  if (blogRedirect) return blogRedirect;

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
