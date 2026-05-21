import { getPostBySlug } from "../../../../services/posts";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import BlogSidebar from "../../../../components/BlogSidebar";
import { getCanonicalUrl, getAbsoluteImageUrl } from '../../../../lib/seo-utils';
import { getBlogPostingSchema } from '../../../../lib/schemas/blogSchemas';
import {
  getTranslatedContent,
  hasTranslation,
  injectImageAlts,
  getBgSlugFromTranslatedSlug,
  getTranslatedSlug,
} from '../../../../lib/wordpress-helpers';
import Script from "next/script";

// ISR — revalidate every 5 minutes
export const revalidate = 300;

/**
 * Resolves the URL slug to an actual BG slug and determines whether a
 * permanent redirect to the translated URL is needed.
 *
 * Three cases:
 *  1. BG locale → use slug as-is
 *  2. Translated slug (new URL) → reverse-lookup BG slug, serve directly
 *  3. BG slug on non-BG locale (old URL) → redirect to translated slug (301)
 */
function resolveSlug(urlSlug, locale) {
  if (locale === 'bg') {
    return { bgSlug: urlSlug, shouldRedirect: false, translatedSlug: urlSlug };
  }

  // Decode the incoming slug — Next.js usually decodes params, but in some
  // client-side navigation scenarios with non-ASCII slugs it may stay encoded.
  let decodedSlug = urlSlug;
  try { decodedSlug = decodeURIComponent(urlSlug); } catch { /* already decoded */ }

  // Case 2: Is the URL slug a known translated slug (for this locale OR any other)?
  // The cross-locale fallback handles switching from e.g. /ru/ → /tr/ where the
  // URL still carries the Russian slug until the page resolves it.
  const bgSlugRaw = getBgSlugFromTranslatedSlug(decodedSlug, locale);
  if (bgSlugRaw) {
    // The JSON keys are URL-encoded (%d0%b4%d0%bd...) — decode for the WP API
    let bgSlug = bgSlugRaw;
    try { bgSlug = decodeURIComponent(bgSlugRaw); } catch { /* already decoded */ }

    // If the URL slug is NOT the correct translation for this locale, redirect.
    // This happens when switching between non-BG locales (e.g. RU → TR passes
    // the Russian slug to the Turkish page).
    const correctSlug = getTranslatedSlug(bgSlug, locale);
    if (correctSlug && correctSlug !== decodedSlug) {
      return { bgSlug, shouldRedirect: true, translatedSlug: correctSlug };
    }

    return { bgSlug, shouldRedirect: false, translatedSlug: decodedSlug };
  }

  // Case 3: The URL contains the BG slug — check if a translated slug exists
  const translatedSlug = getTranslatedSlug(decodedSlug, locale);
  if (translatedSlug && translatedSlug !== decodedSlug) {
    return { bgSlug: decodedSlug, shouldRedirect: true, translatedSlug };
  }

  // No translated slug available yet — serve BG slug directly
  return { bgSlug: decodedSlug, shouldRedirect: false, translatedSlug: decodedSlug };
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  if (slug.includes('LINK_PLACEHOLDER') || slug.includes('LINK_YER') || slug.includes('__HREF')) {
    return { robots: { index: false, follow: false } };
  }

  const { bgSlug } = resolveSlug(slug, locale);

  const post = await getPostBySlug(bgSlug);
  if (!post || post.length === 0) return {};

  const baseUrl = 'https://www.avtovia.bg';
  const meta = post[0].yoast_head_json;
  const ogImageObject = meta.og_image?.[0] ?? null;
  const ogImage = ogImageObject?.url ?? null;
  const ogImageWidth = ogImageObject?.width ?? 1200;
  const ogImageHeight = ogImageObject?.height ?? 630;

  const translatedContent = getTranslatedContent(bgSlug, locale, 'post');
  const title = translatedContent?.title || meta.title;
  const description = translatedContent?.metaDescription || meta.description;

  // Canonical uses the resolved (translated) slug for this locale
  // Encode non-ASCII slugs (Cyrillic, Greek) for valid canonical URLs
  const { translatedSlug } = resolveSlug(slug, locale);
  const canonicalUrl = `${baseUrl}/${locale}/blog/${encodeURIComponent(translatedSlug)}`;

  // Hreflang: each locale gets its own translated slug (encoded for validity)
  const languages = {
    'x-default': `${baseUrl}/bg/blog/${encodeURIComponent(bgSlug)}`,
    bg: `${baseUrl}/bg/blog/${encodeURIComponent(bgSlug)}`,
  };
  const supportedLocales = ['en', 'de', 'ru', 'tr', 'el', 'sr', 'ro', 'mk'];
  supportedLocales.forEach(lang => {
    if (hasTranslation(bgSlug, lang, 'post')) {
      const tSlug = getTranslatedSlug(bgSlug, lang);
      languages[lang] = `${baseUrl}/${lang}/blog/${encodeURIComponent(tSlug)}`;
    }
  });

  return {
    title: { absolute: `${post[0].title.rendered} | avtovia bg` },
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage ? getAbsoluteImageUrl(ogImage) : getAbsoluteImageUrl('/default.webp'), width: ogImageWidth, height: ogImageHeight }],
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;

  if (slug.includes('LINK_PLACEHOLDER') || slug.includes('LINK_YER') || slug.includes('__HREF')) {
    notFound();
  }

  const { bgSlug, shouldRedirect, translatedSlug } = resolveSlug(slug, locale);

  // permanentRedirect/notFound throw special Next.js errors — they must stay
  // OUTSIDE any try-catch so they propagate correctly to the framework.
  // Encode the translated slug so the Location header is valid ASCII
  // (raw Cyrillic/Greek in redirect URLs breaks client-side navigation).
  if (shouldRedirect) {
    permanentRedirect(`/${locale}/blog/${encodeURIComponent(translatedSlug)}`);
  }

  try {
    const post = await getPostBySlug(bgSlug);
    if (!post || post.length === 0) {
      notFound();
    }

    const translatedContent = getTranslatedContent(bgSlug, locale, 'post');
    const title = translatedContent?.title || post[0].title.rendered;
    const rawContent = translatedContent?.content || post[0].content.rendered;
    const content = injectImageAlts(rawContent, title, locale);

    const meta = post[0].yoast_head_json;
    const ogImageObject = meta.og_image?.[0] ?? null;
    const ogImage = ogImageObject?.url ?? null;
    const ogImageWidth = ogImageObject?.width ?? 1200;
    const ogImageHeight = ogImageObject?.height ?? 630;

    const siteUrl = 'https://www.avtovia.bg';
    const blogPostingSchema = getBlogPostingSchema(post[0], locale, siteUrl);

    return (
      <>
        <Script
          id="blog-posting-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
        {/* Hero Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {title}
                </h1>
              </div>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#803487" />
                    <stop offset={1} stopColor="#803487" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Article */}
              <div className="lg:col-span-8">
                <article className="w-full">
                  {ogImage && (
                    <Image
                      src={ogImage}
                      alt={meta.og_title || title}
                      width={ogImageWidth}
                      height={ogImageHeight}
                      sizes="(max-width: 768px) 100vw, 66vw"
                      quality={80}
                      priority={true}
                      className="w-full h-auto mb-8 rounded-xl shadow-lg"
                    />
                  )}
                  <time
                    dateTime={new Date(post[0].date).toISOString()}
                    className="block mt-2 text-sm text-gray-500 mb-6"
                  >
                    {new Date(post[0].date).toLocaleDateString(
                      locale === 'bg' ? 'bg-BG' : locale === 'en' ? 'en-US' : locale,
                      { day: 'numeric', month: 'long', year: 'numeric' }
                    )}
                  </time>
                  <div
                    className="wordpress-content prose max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-8">
                  <BlogSidebar currentPostSlug={bgSlug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    // Re-throw Next.js internal signals (notFound, redirect) so the framework
    // handles them correctly instead of displaying them as text errors.
    if (error?.digest) throw error;
    return <p>Error loading post.</p>;
  }
}
