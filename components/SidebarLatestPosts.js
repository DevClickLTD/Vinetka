"use client";

import { useEffect, useState } from "react";
import { Link } from "../lib/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import wordpressContent from "../messages/wordpress-content.json";

export default function SidebarLatestPosts({ currentPostSlug }) {
  const t = useTranslations("components.sidebarLatestPosts");
  const locale = useLocale();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = () => {
      try {
        // Вземаме постовете от wordpress-content.json
        const allPosts = Object.values(wordpressContent.posts || {});
        
        // Филтрираме и вземаме само първите 3 (или 4 ако текущият е в списъка)
        let filteredPosts = currentPostSlug
          ? allPosts.filter((post) => post.slug_bg !== currentPostSlug)
          : allPosts;
        
        // Вземаме само първите 3
        filteredPosts = filteredPosts.slice(0, 3);
        
        // Форматираме за показване
        const formattedPosts = filteredPosts.map(post => ({
          id: post.id,
          slug: post.slug_bg,
          title: post[`title_${locale}`] || post.title_bg,
          date: post.modified,
          featuredImage: null // Ще използваме placeholder
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPostSlug, locale]);

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
        {posts.map((post, index) => {
          const featuredImage = post.featuredImage;
          
          // Форматираме датата според locale
          const dateLocaleMap = {
            'bg': 'bg-BG',
            'en': 'en-US',
            'de': 'de-DE',
            'ru': 'ru-RU',
            'tr': 'tr-TR',
            'el': 'el-GR',
            'sr': 'sr-RS',
            'ro': 'ro-RO',
            'mk': 'mk-MK'
          };

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
                        alt={post.title}
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
                    {post.title}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString(dateLocaleMap[locale] || locale, {
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
