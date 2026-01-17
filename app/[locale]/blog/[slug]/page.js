import { getPostBySlug } from "../../../../services/posts";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogSidebar from "../../../../components/BlogSidebar";
import { getCanonicalUrl, getAbsoluteImageUrl } from '../../../../lib/seo-utils';
import { getBlogPostingSchema } from '../../../../lib/schemas/blogSchemas';
import Script from "next/script";

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  // Hide blog posts for all locales except 'bg'
  if (locale !== "bg") {
    return {};
  }
  const post = await getPostBySlug(slug);

  if (!post || post.length === 0) {
    throw new Error("Post not found");
  }

  const meta = post[0].yoast_head_json;
  const ogImageObject =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0] : null;
  const ogImage = ogImageObject ? ogImageObject.url : null;
  const ogImageWidth = ogImageObject ? ogImageObject.width : 1200;
  const ogImageHeight = ogImageObject ? ogImageObject.height : 630;

  // ✅ ПОПРАВКА: Използвай абсолютен canonical и OG image
  const canonicalUrl = meta.canonical || getCanonicalUrl(locale, `blog/${slug}`);
  const absoluteOgImage = ogImage ? getAbsoluteImageUrl(ogImage) : getAbsoluteImageUrl('/default.webp');

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.og_title,
      description: meta.og_description,
      url: canonicalUrl,
      images: [{ url: absoluteOgImage, width: ogImageWidth, height: ogImageHeight }],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PostPage({ params }) {
  try {
    const { slug, locale } = await params;

    // Hide blog posts for all locales except 'bg'
    if (locale !== "bg") {
      notFound();
    }
    const post = await getPostBySlug(slug);

    if (!post || post.length === 0) {
      throw new Error("Post not found");
    }

    const meta = post[0].yoast_head_json;
    const ogImageObject =
      meta.og_image && meta.og_image.length > 0 ? meta.og_image[0] : null;
    const ogImage = ogImageObject ? ogImageObject.url : null;
    const ogImageWidth = ogImageObject ? ogImageObject.width : 1200;
    const ogImageHeight = ogImageObject ? ogImageObject.height : 630;

    // ✅ BlogPosting Schema
    const blogPostingSchema = getBlogPostingSchema(post[0], locale);

    return (
      <>
        <Script
          id="blog-posting-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingSchema),
          }}
        />
        {/* Hero Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {post[0].title.rendered}
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
              {/* Main Article Content */}
              <div className="lg:col-span-8">
                <article className="w-full">
                  {ogImage && (
                    <Image
                      src={ogImage}
                      alt={meta.og_title || post[0].title.rendered}
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
                    {new Date(post[0].date).toLocaleDateString("bg-BG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <div
                    className="wordpress-content prose max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: post[0].content.rendered,
                    }}
                  />
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-8">
                  <BlogSidebar currentPostSlug={slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
