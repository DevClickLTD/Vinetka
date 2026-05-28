/**
 * SEO Utility Functions
 *
 * Canonical URLs and hreflang tags are locale-aware:
 * the same internal path (e.g. "tseni/dnevna") resolves to a different
 * external URL per locale (e.g. /ro/preturi/zilnica for Romanian).
 */

import { getLocalizedPath, locales as allLocales } from './pathnames.mjs';

const SITE_URL = 'https://www.avtovia.bg';

/**
 * Normalizes a blog slug to a single decoded form for lookups and WP API calls.
 */
export function normalizeBlogSlug(slug) {
  if (!slug) return '';
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/**
 * Percent-encodes a blog slug for safe URL paths (required for Cyrillic/Greek on Next.js).
 */
export function encodeBlogSlug(slug) {
  return encodeURIComponent(normalizeBlogSlug(slug));
}

/**
 * Absolute blog post URL — always percent-encoded (canonical, hreflang, sitemap).
 */
export function buildBlogPostUrl(locale, slug) {
  return `${SITE_URL}/${locale}/blog/${encodeBlogSlug(slug)}`;
}

/**
 * Relative blog post path for redirects and next-intl Link params.
 */
export function buildBlogPostPath(locale, slug) {
  return `/${locale}/blog/${encodeBlogSlug(slug)}`;
}

/**
 * Returns the absolute canonical URL for a given locale and internal path.
 *
 * @param {string} locale   - Locale code (bg, en, de, …)
 * @param {string} path     - Internal path WITHOUT leading slash (e.g. "tseni/dnevna")
 */
export function getCanonicalUrl(locale, path = '') {
  const cleanInternal = path.startsWith('/') ? path : (path ? `/${path}` : '');

  if (!cleanInternal) {
    return `${SITE_URL}/${locale}`;
  }

  const localizedPath = getLocalizedPath(cleanInternal, locale);
  return `${SITE_URL}/${locale}${localizedPath}`;
}

/**
 * Returns an absolute URL for a static asset.
 *
 * @param {string} imagePath - Relative path (e.g. "/default.webp")
 */
export function getAbsoluteImageUrl(imagePath) {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const clean = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${SITE_URL}/${clean}`;
}

/**
 * Returns an hreflang object keyed by locale (plus x-default).
 * Each value is the fully-qualified localized URL for that locale.
 *
 * @param {string}   path    - Internal path WITHOUT leading slash
 * @param {string[]} locales - Locales to include (defaults to all 12)
 */
export function getHreflangLinks(path = '', locales = allLocales) {
  const links = {};

  links['x-default'] = getCanonicalUrl('bg', path);

  for (const locale of locales) {
    links[locale] = getCanonicalUrl(locale, path);
  }

  return links;
}

/**
 * Like getHreflangLinks but appends a query/hash suffix to every URL.
 * Useful for paginated pages (e.g. ?page=2).
 */
export function getHreflangLinksWithSuffix(path = '', suffix = '', locales = allLocales) {
  if (!suffix) {
    return getHreflangLinks(path, locales);
  }

  const links = getHreflangLinks(path, locales);
  return Object.fromEntries(
    Object.entries(links).map(([locale, url]) => [locale, `${url}${suffix}`])
  );
}

/**
 * Builds hreflang for a blog post — only locales with an actual translation.
 */
export function getBlogPostHreflangLinks(bgSlug, hasTranslationFn, getTranslatedSlugFn) {
  const normalizedBgSlug = normalizeBlogSlug(bgSlug);
  const languages = {
    'x-default': buildBlogPostUrl('bg', normalizedBgSlug),
    bg: buildBlogPostUrl('bg', normalizedBgSlug),
  };

  for (const locale of allLocales) {
    if (locale === 'bg') continue;
    if (hasTranslationFn(bgSlug, locale, 'post')) {
      const translatedSlug = getTranslatedSlugFn(bgSlug, locale);
      languages[locale] = buildBlogPostUrl(locale, translatedSlug);
    }
  }

  return languages;
}

/**
 * Builds a full Next.js metadata object with canonical, hreflang, OG and Twitter tags.
 */
export function generateSEOMetadata({
  locale = 'bg',
  path = '',
  title,
  description,
  image = '/default.webp',
  keywords = [],
  type = 'website',
}) {
  const canonical = getCanonicalUrl(locale, path);
  const absoluteImage = getAbsoluteImageUrl(image);
  const ogLocale = locale === 'bg' ? 'bg_BG' : `${locale}_${locale.toUpperCase()}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: getHreflangLinks(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Avtovia.bg',
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
    },
  };
}

/**
 * Generates a BreadcrumbList schema.
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.locale || 'bg', item.path || ''),
    })),
  };
}
