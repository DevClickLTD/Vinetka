import Image from "next/image";
import Script from "next/script";
import { Link } from "../../../../lib/navigation";
import { 
  FaCalendar, 
  FaCheckCircle, 
  FaClock,
  FaArrowLeft,
  FaRoute,
  FaSun,
  FaSnowflake,
  FaMapMarkedAlt,
  FaPiggyBank,
  FaPercentage
} from "react-icons/fa";
import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata } from '../../../../lib/seo-utils';
import { getVignetteProductSchema } from '../../../../lib/schemas/productSchemas';
import { getWebAppUrl } from '../../../../lib/web-app-url';

// ISR: Revalidate every 24 hours (prices rarely change)
export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('prices.quarterly');
  
  const metadata = generateSEOMetadata({
    locale,
    path: 'tseni/trimesechna',
    title: t('pageTitle'),
    description: t('pageDescription'),
    image: '/default.webp',
    keywords: [
      "тримесечна винетка",
      "90 дни винетка",
      "три месеца винетка",
      "сезонна винетка",
      "летна винетка",
      "зимна винетка",
      "икономична винетка",
      "спестяване 15%"
    ],
  });
  
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function TrimesechnaVignette({ params }) {
  const { locale } = await params;
  const t = await getTranslations('prices.quarterly');
  const webAppUrl = getWebAppUrl(locale);
  
  // ✅ Product Schema
  const productSchema = getVignetteProductSchema('quarterly', locale);
  
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: t('features.valid90'),
      description: t('features.valid90Desc')
    },
    {
      icon: <FaPercentage className="w-6 h-6 text-purple-600" />,
      title: t('features.save15'),
      description: t('features.save15Desc')
    },
    {
      icon: <FaSun className="w-6 h-6 text-purple-600" />,
      title: t('features.idealSeasons'),
      description: t('features.idealSeasonsDesc')
    },
    {
      icon: <FaPiggyBank className="w-6 h-6 text-purple-600" />,
      title: t('features.noPurchases'),
      description: t('features.noPurchasesDesc')
    }
  ];

  const useCases = [
    t('useCases.summerSeason'),
    t('useCases.winterSki'),
    t('useCases.seasonalWork'),
    t('useCases.longProjects'),
    t('useCases.familyHolidays'),
    t('useCases.regular3Months'),
    t('useCases.studentsSemester'),
    t('useCases.resortResidents')
  ];

  const benefits = [
    t('benefits.seasonPeace'),
    t('benefits.save15Percent'),
    t('benefits.intensiveTravel'),
    t('benefits.coversAllNeeds'),
    t('benefits.instantActivation'),
    t('benefits.valid90Days')
  ];

  const seasonInfo = [
    {
      icon: <FaSun className="w-8 h-8 text-yellow-500" />,
      title: t('seasonInfo.summer.title'),
      description: t('seasonInfo.summer.description'),
      months: t('seasonInfo.summer.months')
    },
    {
      icon: <FaSnowflake className="w-8 h-8 text-blue-500" />,
      title: t('seasonInfo.winter.title'),
      description: t('seasonInfo.winter.description'),
      months: t('seasonInfo.winter.months')
    }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Начало",
        "item": "https://www.vinetka.bg/bg"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Цени",
        "item": "https://www.vinetka.bg/bg/tseni"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Тримесечна винетка",
        "item": "https://www.vinetka.bg/bg/tseni/trimesechna"
      }
    ]
  };

  return (
    <>
      <Script
        id="quarterly-vignette-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      
      <Script
        id="quarterly-vignette-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500 transition-colors">
                  Начало
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/tseni" className="text-gray-400 hover:text-gray-500 transition-colors">
                    Цени
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">{t('title')}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                <FaCalendar className="w-10 h-10 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center rounded-lg bg-purple-100 px-4 py-2">
                <FaClock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-lg font-semibold text-purple-900">{t('features.valid90')}</span>
              </div>
              <div className="inline-flex items-center rounded-lg bg-green-100 px-4 py-2">
                <FaPercentage className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-900">{t('features.save15')}</span>
              </div>
              <div className="inline-flex flex-col items-center rounded-lg bg-white px-6 py-3">
                <span className="text-2xl font-bold text-purple-900">27,61 €</span>
                <span className="text-sm text-gray-600">54,00 лв.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('description1')}
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                {t('description2')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Season Info Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('seasonInfo.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('seasonInfo.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {seasonInfo.map((season, index) => (
                <div key={index} className="relative rounded-lg border border-gray-200 bg-white p-8 shadow-sm text-center">
                  <div className="flex items-center justify-center mb-6">
                    {season.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {season.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{season.months}</p>
                  <p className="text-gray-700">{season.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('features.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
              {t('useCases.title')}
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center">
                  <FaCheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
              {t('benefits.title')}
            </h2>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm">
                  <FaCheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important Info Section */}
      <div className="bg-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              {t('info.title')}
            </h2>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('info.activationTitle')}</h3>
                  <p className="text-gray-600">{t('info.activation')}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('info.validityTitle')}</h3>
                  <p className="text-gray-600">{t('info.validity')}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('info.savingsTitle')}</h3>
                  <p className="text-gray-600">{t('info.savings')}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('info.vehiclesTitle')}</h3>
                  <p className="text-gray-600">{t('info.vehicles')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={webAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {t('cta.button')}
              </a>
              <Link
                href="/tseni"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors flex items-center"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                {t('cta.allPrices')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 