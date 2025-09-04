"use client";

import { useState } from "react";
import { Link } from "../lib/navigation";
import Image from "next/image";
import { useTranslations } from 'next-intl';

// const navigation = [ // Не се използва
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

export default function HeroSection() {
  const t = useTranslations('components.hero');

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
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 lg:flex-shrink-0">
              <Image
                src="/купи-винетка.jpg"
                alt={t('title')}
                width={608}
                height={506}
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
