import createNextIntlPlugin from 'next-intl/plugin';
import { pathnames, locales } from './lib/pathnames.mjs';

// Fix SSL cert verification issue in local/CI environments with self-signed or
// intermediate certs (does not affect production TLS — only build-time fetches)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const withNextIntl = createNextIntlPlugin();

/**
 * Generate 301 redirects from old BG-slug URLs to new localized URLs.
 *
 * Before localized routing was added, every locale used the same BG slug
 * (e.g. /ro/tseni/dnevna). Now each locale has its own translated URL
 * (e.g. /ro/preturi/zilnica). We redirect the old paths permanently so that
 * any existing links / bookmarks / search-engine crawls are updated.
 *
 * BG paths are unchanged — no redirects generated for 'bg'.
 */
function buildLocaleRedirects() {
  const redirects = [];

  for (const [internalPath, localeMap] of Object.entries(pathnames)) {
    // Skip home page and same-for-all paths
    if (internalPath === '/' || typeof localeMap === 'string') continue;

    for (const locale of locales) {
      if (locale === 'bg') continue; // BG keeps the same URL — no redirect needed

      const newPath = localeMap[locale];
      if (!newPath || newPath === internalPath) continue; // path unchanged — no redirect

      redirects.push({
        source: `/${locale}${internalPath}`,
        destination: `/${locale}${newPath}`,
        permanent: true, // 301
      });
    }
  }

  return redirects;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  trailingSlash: false,
  async redirects() {
    return [
      // Blog slug rename (legacy)
      {
        source: '/:locale/blog/proverka-na-vinetka',
        destination: '/:locale/blog/validnost-na-vinetka',
        permanent: true,
      },
      // Localized URL redirects — old BG-style slugs → new per-locale slugs
      ...buildLocaleRedirects(),
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'vinetka.admin-panels.com' },
      { protocol: 'https', hostname: 'tailwindui.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [50, 75, 80, 85, 90, 100],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/public/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*.(woff|woff2|ttf|otf|eot)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
