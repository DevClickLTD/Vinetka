import { generateSEOMetadata } from '../../../lib/seo-utils';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'myVignettesPage' });
  
  const metadata = generateSEOMetadata({
    locale,
    path: 'moite-vinetki',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
    keywords: [
      "моите винетки",
      "управление на винетки",
      "проверка на винетки",
      "профил винетки",
      "my vignettes",
      "vignette management"
    ],
  });

  return {
    ...metadata,
    title: {
      absolute: `${t('title')} | avtovia bg`,
    },
  };
}

export default async function MyVignettesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'myVignettesPage' });
  const siteUrl = 'https://www.avtovia.bg';
  const registerUrl = 'https://web.avtovia.bg/register';
  const loginUrl = 'https://web.avtovia.bg/login';

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-purple-50 to-white pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-display">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Какво получаваш Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('benefitsTitle')}
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="relative flex flex-col items-start p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('feature1Title')}</h3>
                <p className="mt-2 text-gray-600">{t('feature1Desc')}</p>
              </div>

              {/* Feature 2 */}
              <div className="relative flex flex-col items-start p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('feature2Title')}</h3>
                <p className="mt-2 text-gray-600">{t('feature2Desc')}</p>
              </div>

              {/* Feature 3 */}
              <div className="relative flex flex-col items-start p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('feature3Title')}</h3>
                <p className="mt-2 text-gray-600">{t('feature3Desc')}</p>
              </div>

              {/* Feature 4 */}
              <div className="relative flex flex-col items-start p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('feature4Title')}</h3>
                <p className="mt-2 text-gray-600">{t('feature4Desc')}</p>
              </div>

              {/* Feature 5 */}
              <div className="relative flex flex-col items-start p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('feature5Title')}</h3>
                <p className="mt-2 text-gray-600">{t('feature5Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как да провериш Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
              {t('howToCheckTitle')}
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('step1Title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('step1Desc')} <a href={registerUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-medium underline">{registerUrl}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('step2Title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('step2Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-100">
              {t('ctaSubtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 rounded-md bg-white px-8 py-4 text-base font-semibold text-purple-700 shadow-lg hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105"
              >
                {t('registerButton')}
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
            <p className="mt-6 text-purple-100">
              {t('loginText')}{' '}
              <a 
                href={loginUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white font-semibold hover:text-purple-200 underline"
              >
                {loginUrl}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
