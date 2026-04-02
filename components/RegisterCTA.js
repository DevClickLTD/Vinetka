"use client";

import { useTranslations } from 'next-intl';

/**
 * Register CTA Component - призив за регистрация над FAQ
 */
export default function RegisterCTA() {
  const t = useTranslations('registerCTA');
  const webAppUrl = "https://web.avtovia.bg/register";

  return (
    <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display mb-6">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-purple-100">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 rounded-md bg-white px-8 py-4 text-base font-semibold text-purple-700 shadow-lg hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105"
            >
              {t('button')}
              <svg 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 mb-3 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold">{t('feature1Title')}</h3>
              <p className="text-sm text-purple-100 mt-1">{t('feature1Desc')}</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 mb-3 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-lg font-semibold">{t('feature2Title')}</h3>
              <p className="text-sm text-purple-100 mt-1">{t('feature2Desc')}</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 mb-3 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold">{t('feature3Title')}</h3>
              <p className="text-sm text-purple-100 mt-1">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
