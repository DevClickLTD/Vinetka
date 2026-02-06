"use client";

import { useState } from "react";
import { Link } from "../lib/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { getWebAppUrl } from "../lib/web-app-url";

// const navigation = [ // Не се използва
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

export default function HeroSection() {
  const t = useTranslations('components.hero');
  const locale = useLocale();
  const webAppUrl = getWebAppUrl(locale);

  return (
    <div className="bg-gray-800">
      <div className="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20 pt-2">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-6 sm:py-10 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none lg:mx-0 lg:flex lg:flex-row lg:items-start lg:gap-x-16">
            <div className="lg:w-1/2 lg:flex-shrink-0">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                {t('title')}
              </h1>
              <div className="mt-6">
                <p className="text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                  {t('subtitle')}
                </p>
              </div>
              <div className="mt-10">
                <a
                  href={webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-x-2 rounded-md bg-[#803487] px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487] transition-all duration-300"
                >
                  {t('buyButton')}
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 lg:flex-shrink-0">
              <Image
                src="/купи-винетка.webp"
                alt={t('title')}
                width={608}
                height={507}
                className="aspect-[6/5] w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-gray-800 sm:h-32" />
      </div>
    </div>
  );
}
