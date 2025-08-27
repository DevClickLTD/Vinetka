"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function CardsRow() {
  const t = useTranslations('components.cardsRow');
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
      <div className="mx-auto w-full px-6 lg:px-8 xl:w-4/5 2xl_w-4/5 max-w-screen-2xl 2xl_px-0 text-center">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <div className="flex justify-center items-center mb-8 sm:mb-12 px-4">
          <Image
            src="/accepted-cards.jpg"
            alt={t('altText')}
            width={800}
            height={100}
            quality={85}
            loading="lazy"
            className="object-contain max-w-full h-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          />
        </div>
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217-cards)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217-cards">
              <stop stopColor="#803487" />
              <stop offset={1} stopColor="#803487" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
