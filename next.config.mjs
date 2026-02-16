import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  skipTrailingSlashRedirect: true, // Избягваме допълнителни trailing slash редиректи
  trailingSlash: false, // Без trailing slashes
  async redirects() {
    return [
      // Blog redirect: proverka-na-vinetka -> validnost-na-vinetka
      {
        source: '/:locale/blog/proverka-na-vinetka',
        destination: '/:locale/blog/validnost-na-vinetka',
        permanent: true, // 301 redirect (SEO friendly)
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vinetka.admin-panels.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 часа кеширане
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [50, 75, 80, 85, 90, 100], // Конфигурация за качество на изображенията
  },
  poweredByHeader: false, // Премахваме X-Powered-By хедъра
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Премахваме console.log в production
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      // Cache headers за статични ресурси
      {
        source: '/public/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      // Cache headers за шрифтове
      {
        source: '/:all*.(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
