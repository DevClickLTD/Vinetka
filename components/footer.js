"use client";

import { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../lib/navigation';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [year, setYear] = useState(new Date().getFullYear());

  const allSupportItems = [
    { name: t('support.blog'), href: "/blog" },
    { name: t('support.contact'), href: "/contact" },
  ];

  // Filter out blog for non-bg locales
  const supportItems = allSupportItems.filter(item => 
    item.href !== "/blog" || locale === 'bg'
  );

  const navigation = {
    services: [
      { name: t('services.vignetteCheck'), href: "/proverka-na-vinetka" },
      { name: t('services.tollTax'), href: "/toll-taksi" },
    ],
    vignettes: [
      { name: t('vignettes.daily'), href: "/tseni/dnevna" },
      { name: t('vignettes.weekend'), href: "/tseni/uikend" },
      { name: t('vignettes.weekly'), href: "/tseni/sedmichna" },
      { name: t('vignettes.monthly'), href: "/tseni/mesechna" },
      { name: t('vignettes.quarterly'), href: "/tseni/trimesechna" },
      { name: t('vignettes.annual'), href: "/tseni/godishna" },
    ],
    support: supportItems,
    company: [
      { name: t('company.aboutUs'), href: "/za-nas" },
    ],
    legal: [
      { name: t('legal.terms'), href: "/obshti-usloviya" },
      { name: t('legal.privacy'), href: "/privacy-policy" },
      { name: t('legal.cookies'), href: "/politika-za-biskvitki" }
    ],
    social: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/people/Vinetka-BG/61587222121605/",
        icon: FaFacebook,
        target: "_blank",
        rel: "noopener noreferrer",
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (currentYear !== year) {
        setYear(currentYear);
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [year]);

  return (
    <footer className="relative bg-white border border-t-[#eaeaea]">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-2/5 h-full flex items-center justify-center pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-70 hidden md:block"
          viewBox="0 0 300 800"
          fill="none"
          preserveAspectRatio="xMinYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 800 L180 0"
            stroke="#803487"
            strokeWidth="3.5"
            opacity="0.8"
            fill="none"
          />
          <path
            d="M65 800 L240 0"
            stroke="#803487"
            strokeWidth="2"
            opacity="0.6"
            strokeDasharray="40 25"
            fill="none"
          />
          <path
            d="M110 800 L300 0"
            stroke="#803487"
            strokeWidth="1"
            opacity="0.4"
            fill="none"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <Image
              alt="Avtovia.bg лого"
              src="/avtovia-logo.svg"
              width={180}
              height={40}
              priority
            />
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-3">
            {/* Services Column */}
            <div>
              <h3 className="text-sm/6 font-semibold text-gray-900">
                {t('sections.services')}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm/6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Vignettes Column */}
            <div>
              <h3 className="text-sm/6 font-semibold text-gray-900">
                {t('sections.vignettes')}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.vignettes.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm/6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support + Company Column */}
            <div>
              <h3 className="text-sm/6 font-semibold text-gray-900">
                {t('sections.support')}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm/6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm/6 font-semibold text-gray-900 mt-8">
                {t('sections.company')}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm/6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm/6 font-semibold text-gray-900 mt-8">{t('sections.legal')}</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm/6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">
            &copy; {year} {t('copyright')}
          </p>
        </div>
        <div className="mt-4 border-t border-gray-900/10 pt-4 text-center">
          <p className="text-xs text-gray-500">
            Powered by{' '}
            <a 
              href="https://webstation.bg/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              WebStation™
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
