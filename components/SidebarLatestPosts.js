"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "../services/api";
import { Link } from "../lib/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { NewspaperIcon } from "@heroicons/react/24/outline";

export default function SidebarLatestPosts({ currentPostSlug }) {
  const t = useTranslations("components.sidebarLatestPosts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const postsData = await fetchAPI(
          "posts?per_page=3&_fields=id,slug,title,date,yoast_head_json"
        );

        // Филтрираме текущия пост, ако е зададен
        const filteredPosts = currentPostSlug
          ? postsData?.filter((post) => post.slug !== currentPostSlug)
          : postsData;

        setPosts(filteredPosts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, [currentPostSlug]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#803487] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#803487] to-[#037672] px-6 py-4">
        <div className="flex items-center">
          <NewspaperIcon className="h-6 w-6 text-white mr-2" />
          <h3 className="text-lg font-bold text-white">{t("title")}</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {posts.slice(0, 3).map((post, index) => {
          const featuredImage = post.yoast_head_json?.og_image?.[0]?.url;

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-4 hover:bg-gray-50 transition-colors duration-200 group"
            >
              <article className="flex gap-3">
                {/* Thumbnail */}
                {featuredImage && (
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={featuredImage}
                        alt={post.title.rendered}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div
                  className={`flex-1 min-w-0 ${!featuredImage ? "pl-0" : ""}`}
                >
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#803487] transition-colors line-clamp-2 mb-1">
                    {post.title.rendered}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString("bg-BG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* View All Link */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <Link
          href="/blog"
          className="text-sm font-semibold text-[#803487] hover:text-[#037672] transition-colors flex items-center justify-center group"
        >
          {t("viewAll")}
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
