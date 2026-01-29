import Image from "next/image";
import { Link } from "../../../lib/navigation";
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogListingSchema } from '../../../lib/schemas/blogSchemas';
import Script from "next/script";

export async function generateMetadata({ params, searchParams }) {
  const { locale } = await params;
  
  // Hide blog for all locales except 'bg'
  if (locale !== 'bg') {
    return {};
  }
  
  const t = await getTranslations('blog');
  const page = (await searchParams).page;
  const currentPage = parseInt(page) || 1;
  
  const baseUrl = 'https://www.vinetka.bg';
  const blogUrl = `${baseUrl}/${locale}/blog`;
  
  // Get total pages for prev/next links
  const response = await fetch(
    `https://vinetka.admin-panels.com/wp-json/wp/v2/posts?page=${currentPage}&per_page=9&_fields=id`,
    { next: { revalidate: 120 } }
  );
  const totalPages = response.ok ? Number(response.headers.get("x-wp-totalpages")) || 1 : 1;
  
  const metadata = {
    title: currentPage > 1 ? `${t('pageTitle')} - Страница ${currentPage}` : t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: currentPage === 1 ? blogUrl : `${blogUrl}?page=${currentPage}`,
      languages: {
        'x-default': `${baseUrl}/bg/blog`,
        bg: `${baseUrl}/bg/blog`,
        // Блогът е достъпен само на български - премахнати са hreflang линковете към несъществуващи езикови версии
      },
    },
  };
  
  // Add prev/next links for pagination
  if (currentPage > 1) {
    metadata.alternates.prev = currentPage === 2 ? blogUrl : `${blogUrl}?page=${currentPage - 1}`;
  }
  if (currentPage < totalPages) {
    metadata.alternates.next = `${blogUrl}?page=${currentPage + 1}`;
  }
  
  return metadata;
}

export default async function Blog({ searchParams, params }) {
  const { locale } = await params;
  
  // Hide blog for all locales except 'bg'
  if (locale !== 'bg') {
    notFound();
  }
  const t = await getTranslations('blog');
  const page = (await searchParams).page;
  const currentPage = parseInt(page) || 1;
  const perPage = 9;

  // Fetch posts from WordPress API with caching enabled
  const response = await fetch(
    `https://vinetka.admin-panels.com/wp-json/wp/v2/posts?page=${currentPage}&per_page=${perPage}&_fields=id,yoast_head_json,date,slug,title,content`,
    {
      next: { revalidate: 120 },
    }
  );

  if (!response.ok) {
    return (
      <p className="text-gray-600 text-center mt-10">
        {t('loading')}
      </p>
    );
  }

  const posts = await response.json();
  const totalPagesHeader = response.headers.get("x-wp-totalpages");
  const totalPages = Number(totalPagesHeader) || 1;

  // ✅ Blog Listing Schema with Pagination
  const blogListingSchema = getBlogListingSchema(posts, currentPage, totalPages, locale);

  return (
    <>
      <Script
        id="blog-listing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListingSchema),
        }}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {t('title')}
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
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} prefetch={true}>
                  <article className="flex flex-col items-start justify-between">
                    <div className="relative w-full">
                      <Image
                        width={380}
                        height={250}
                        alt={
                          post.yoast_head_json?.og_image?.[0]?.alt || 
                          `Изображение на статия: ${post.title.rendered}` ||
                          "Изображение към публикация за винетки"
                        }
                        src={
                          post.yoast_head_json?.og_image?.[0]?.url ||
                          "/placeholder.webp"
                        }
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        className="w-full h-auto rounded-2xl bg-gray-100 object-cover"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <time dateTime={post.date} className="text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                          {post.title.rendered}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                          {post.content.rendered
                            ? post.content.rendered
                                .replace(/<[^>]+>/g, "")
                                .substring(0, 150) + "..."
                            : "No description available"}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-10">
              Няма намерени публикации.
            </p>
          )}
          {/* Pagination Controls */}
          <div className="mt-10 flex justify-center">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="px-4 py-2 mx-2 bg-gray-200 rounded-md"
                prefetch={true}
              >
                Предишна
              </Link>
            )}
            <span className="px-4 py-2 mx-2">
              Страница {currentPage} от {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="px-4 py-2 mx-2 bg-gray-200 rounded-md"
                prefetch={true}
              >
                Следваща
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
