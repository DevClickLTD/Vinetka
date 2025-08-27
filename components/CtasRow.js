"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  GlobeAltIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from 'next-intl';

export default function CtasRow() {
  const t = useTranslations('components.ctasRow');
  
  const ctaItems = [
    {
      id: 1,
      name: t('cta1Title'),
      href: "/services/domashno-imushtestvo",
      icon: HomeIcon,
      description: t('cta1Description'),
      buttonText: t('cta1Button'),
    },
    {
      id: 2,
      name: t('cta2Title'),
      href: "/services/patuvane-chujbina",
      icon: GlobeAltIcon,
      description: t('cta2Description'),
      buttonText: t('cta2Button'),
    },
    {
      id: 3,
      name: t('cta3Title'),
      href: "/services/planinska-zastrahovka",
      icon: SparklesIcon,
      description: t('cta3Description'),
      buttonText: t('cta3Button'),
    },
    {
      id: 4,
      name: t('cta4Title'),
      href: "/services/zdravna-zastrahovka",
      icon: HeartIcon,
      description: t('cta4Description'),
      buttonText: t('cta4Button'),
    },
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      {/* <div className="mx-auto w-full px-6 lg:px-8 xl:w-4/5 2xl:w-4/5 max-w-screen-2xl 2xl:px-0"> */}
      <div className="mx-auto w-full px-6 lg:px-8 xl_w_full xl_max-w-[1500px] xl_px-0 2xl_w-4/5">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ctaItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg overflow-hidden flex flex-col border border-gray-200 rounded-tr-[1.5rem] rounded-bl-[1.5rem]"
            >
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-center mb-4">
                    <item.icon
                      className="h-12 w-12 text-[#803487]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 text-center flex-grow">
                    {item.description}
                  </p>
                </div>
                <div className="mt-auto text-center">
                  <Link
                    href={item.href}
                    className="inline-block rounded-md bg-[#037672] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#803487] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037672]"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
