"use client";

import { useState, useEffect } from "react";
import { Pacifico } from "next/font/google";
import useSubscribe from "../hooks/useSubscribe";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../lib/navigation';

const pacifico = Pacifico({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
});



export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [year, setYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const { subscribe, loading } = useSubscribe();

  const allSupportItems = [
    { name: t('support.blog'), href: "/blog" },
    { name: t('support.contact'), href: "/contact" },
    { name: t('support.faq'), href: "#" },
  ];

  // Filter out blog for non-bg locales
  const supportItems = allSupportItems.filter(item => 
    item.href !== "/blog" || locale === 'bg'
  );

  const navigation = {
    services: [
      { name: t('services.vignetteCheck'), href: "/proverka-na-vinetka" },
      { name: t('services.prices'), href: "/tseni" },
      { name: t('services.tollTax'), href: "/toll-taksa" },
    ],
    support: supportItems,
    company: [
      { name: t('company.aboutUs'), href: "#" },
    ],
    legal: [
      { name: t('legal.terms'), href: "/obshti-usloviya" },
      { name: t('legal.privacy'), href: "/privacy-policy" },
      { name: t('legal.cookies'), href: "/politika-za-biskvitki" }
    ],
    social: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/vinetka.bg",
        icon: FaFacebook,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/vinetka.bg",
        icon: FaLinkedin,
        target: "_blank",
        rel: "noopener noreferrer",
      },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribe(email, () => setEmail(""));
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
            <img
              alt="Vinetka.bg лого"
              src="/vinetka.bg-logo.png"
              width={180}
              height={40}
            />
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
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
              <div className="mt-10 md:mt-0">
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
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">
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
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">{t('sections.legal')}</h3>
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
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-gray-900">
              {t('newsletter.title')}
            </h3>
            <p className="mt-2 text-sm/6 text-gray-600">
              {t('newsletter.description')}
            </p>
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10 pointer-events-none">
              <div className="w-12 h-12 border-4 border-gray-400 border-t-[#803487] rounded-full animate-spin"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className={`mt-6 sm:flex sm:max-w-md lg:mt-0 ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <label htmlFor="email-address" className="sr-only">
              {t('newsletter.emailLabel')}
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder={t('newsletter.emailPlaceholder')}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-[#803487] hover:bg-gray-300 cursor-pointer hover:text-[#000000] px-3 py-2 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('newsletter.subscribe')}
              </button>
            </div>
          </form>
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
      </div>
    </footer>
  );
}
