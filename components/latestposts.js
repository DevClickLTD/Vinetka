"use client";

import { useEffect, useState } from "react";
import { getLatestPosts } from "../services/posts";
import { Link } from "../lib/navigation";
import Image from "next/image";
import { useLocale } from 'next-intl';

export default function LatestPosts() {
  const locale = useLocale();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hide component for non-bg locales
  if (locale !== 'bg') {
    return null;
  }

  // Fetch latests posts from WordPress API on component mount
  useEffect(() => {
    setLoading(true);
    const fetchLatestPosts = async () => {
      const postsData = await getLatestPosts();
      setPosts(postsData);
      setLoading(false);
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto w-full py-0 sm:py-0 lg:px-0">
        <div className="relative isolate overflow-hidden bg-gray-900 w-full py-24 text-center shadow-2xl">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h3 className="text-4xl text-white">Последни новини</h3>
            {/* Loader */}
            {loading && (
              <div className="flex justify-center mt-10">
                <div className="w-12 h-12 border-4 border-gray-500 border-t-[#803487] rounded-full animate-spin"></div>
              </div>
            )}

            {!loading && (
              <div className="mx-auto mt-16 grid w-full grid-cols-1 gap-x-8 gap-y-20 lg:mx-auto lg:grid-cols-3">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post.id}
                      prefetch={true}
                    >
                      <article className="flex flex-col items-start justify-between">
                        <div className="relative w-full">
                          <Image
                            width={400}
                            height={225}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={85}
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            alt={post.title.rendered || "Публикация"}
                            src={
                              post.yoast_head_json?.og_image?.[0]?.url ||
                              "/placeholder.webp"
                            }
                            className="w-full h-auto rounded-2xl bg-gray-100 object-cover"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                        </div>
                        <div className="max-w-xl">
                          <div className="mt-8 flex items-center gap-x-4 text-xs">
                            <time dateTime={post.date} className="text-white">
                              {new Date(post.date).toLocaleDateString()}
                            </time>
                          </div>
                          <div className="group relative text-left">
                            <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                              <span className="absolute inset-0" />
                              {post.title.rendered}
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm/6 text-white">
                              {post.content.rendered
                                ? post.content.rendered
                                    .replace(/<\/?[^>]+(>|$)/g, "")
                                    .substring(0, 150) + "..."
                                : "No description available"}
                            </p>
                          </div>
                          <div className="relative mt-8 flex items-center gap-x-4">
                            <Image
                              width={40}
                              height={40}
                              quality={80}
                              loading="lazy"
                              alt={post.yoast_head_json?.author || "Автор"}
                              src={
                                post.yoast_head_json?.schema?.["@graph"]?.find(
                                  (person) => person["@type"] === "Person"
                                )?.image?.url || "/placeholder.webp"
                              }
                              className="size-10 rounded-full bg-gray-100"
                            />
                            <div className="text-sm/6 text-left">
                              <p className="font-semibold text-white">
                                {post.yoast_head_json?.author ||
                                  "Unknown Author"}
                              </p>
                              <p className="text-white">Author</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-600">No posts found.</p>
                )}
              </div>
            )}
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute -left-20 -bottom-140 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
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
    </div>
  );
}
