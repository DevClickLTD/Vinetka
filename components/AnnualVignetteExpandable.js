"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "../lib/navigation";
import { useTranslations } from "next-intl";

export default function AnnualVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("prices.annual.expandable");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            {t("title")}
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("intro")}
            </p>

            <div className="relative">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "max-h-[10000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  {t("heading1")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t.rich("paragraph1", {
                    monthlyLink: (chunks) => (
                      <Link href="/tseni/mesechna" className="text-[#803487] hover:underline">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t("heading2")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("paragraph2")}
                </p>

                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/ednogodishna-vinetka.jpg"
                    alt={t("imgAlt1")}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    quality={80}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t("heading3")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("paragraph3")}
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t("heading4")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t("paragraph4")}
                </p>

                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/винетка-за-една-година.jpg"
                    alt={t("imgAlt2")}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    quality={80}
                    loading="lazy"
                  />
                </div>

                <p className="text-gray-700 leading-relaxed font-medium mt-6">
                  {t("paragraph5")}
                </p>
              </div>

              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={toggleExpand}
              className="inline-flex items-center gap-x-2 rounded-md bg-[#803487] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487] transition-all duration-300"
            >
              {isExpanded ? t("less") : t("more")}
              <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
