import Image from "next/image";
import Script from "next/script";
import { Link } from "../../../../lib/navigation";
import { 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock,
  FaArrowLeft,
  FaRoute,
  FaBriefcase,
  FaMapMarkedAlt,
  FaBalanceScale,
  FaStar
} from "react-icons/fa";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('prices.monthly');
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: [
      "месечна винетка",
      "30 дни винетка",
      "винетка един месец",
      "месечна електронна винетка",
      "редовни пътувания винетка",
      "популярна винетка",
      "командировки винетка"
    ],
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      images: [
        {
          url: "/default.webp",
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: "bg_BG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('pageTitle'),
      description: t('pageDescription'),
      images: ["/default.webp"],
    },
    alternates: {
      canonical: "/tseni/mesechna",
    },
  };
}

export default async function MesechnaVignette() {
  const t = await getTranslations('prices.monthly');
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: t('features.valid30'),
      description: t('features.valid30Desc')
    },
    {
      icon: <FaBalanceScale className="w-6 h-6 text-purple-600" />,
      title: t('features.excellentBalance'),
      description: t('features.excellentBalanceDesc')
    },
    {
      icon: <FaBriefcase className="w-6 h-6 text-purple-600" />,
      title: t('features.forWorking'),
      description: t('features.forWorkingDesc')
    },
    {
      icon: <FaRoute className="w-6 h-6 text-purple-600" />,
      title: t('features.fullFreedom'),
      description: t('features.fullFreedomDesc')
    }
  ];

  const useCases = [
    t('useCases.regularWork'),
    t('useCases.businessTrips'),
    t('useCases.countryTravelers'),
    t('useCases.familyTrips'),
    t('useCases.students'),
    t('useCases.businessMeetings'),
    t('useCases.tourists'),
    t('useCases.secondHome')
  ];

  const benefits = [
    t('benefits.mostPopularChoice'),
    t('benefits.excellentValue'),
    t('benefits.idealForRegular'),
    t('benefits.fullCoverage'),
    t('benefits.instantActivation'),
    t('benefits.noAdditionalPurchases')
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vinetka.bg/bg/tseni/mesechna#product",
    "name": "Месечна винетка",
    "alternateName": ["30-дневна винетка", "Един месец винетка", "Месечна електронна винетка"],
    "description": "Електронна винетка за леки автомобили до 3.5 тона, валидна 30 дни от момента на активиране. Най-популярният избор за редовни пътувания. Отличен баланс между цена и гъвкавост. Покрива всички платени магистрали в България.",
    "category": "Електронна винетка",
    "sku": "VIG-MONTHLY-30D",
    "brand": {
      "@type": "Brand",
      "name": "Vinetka.bg"
    },
    "image": "https://vinetka.bg/default.webp",
    "url": "https://vinetka.bg/bg/tseni/mesechna",
    "offers": {
      "@type": "Offer",
      "url": "https://vinetka.bg/bg/tseni/mesechna",
      "priceCurrency": "BGN",
      "price": "30.00",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "validFrom": "2024-01-01",
      "seller": {
        "@type": "Organization",
        "name": "Vinetka.bg",
        "@id": "https://vinetka.bg/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "България",
        "sameAs": "https://en.wikipedia.org/wiki/Bulgaria"
      },
      "deliveryLeadTime": {
        "@type": "QuantitativeValue",
        "value": 0,
        "unitCode": "MIN"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Валидност",
        "value": "30 дни"
      },
      {
        "@type": "PropertyValue",
        "name": "Категория превозно средство",
        "value": "Леки автомобили до 3.5 тона"
      },
      {
        "@type": "PropertyValue",
        "name": "Покритие",
        "value": "Всички платени магистрали в България"
      },
      {
        "@type": "PropertyValue",
        "name": "Активация",
        "value": "Моментална"
      },
      {
        "@type": "PropertyValue",
        "name": "Популярност",
        "value": "Най-популярен избор"
      },
      {
        "@type": "PropertyValue",
        "name": "Подходяща за",
        "value": "Редовни пътувания, командировки, месечни нужди"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "892",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Начало",
        "item": "https://vinetka.bg/bg"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Цени",
        "item": "https://vinetka.bg/bg/tseni"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Месечна винетка",
        "item": "https://vinetka.bg/bg/tseni/mesechna"
      }
    ]
  };

  return (
    <>
      <Script
        id="monthly-vignette-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      
      <Script
        id="monthly-vignette-breadcrumb-schema"
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
                <FaCalendarAlt className="w-10 h-10 text-purple-600" />
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
                <span className="text-lg font-semibold text-purple-900">{t('features.valid30')}</span>
              </div>
              <div className="inline-flex items-center rounded-lg bg-yellow-100 px-4 py-2">
                <FaStar className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-lg font-semibold text-yellow-900">{t('features.mostPopular')}</span>
              </div>
              <div className="inline-flex flex-col items-center rounded-lg bg-white px-6 py-3">
                <span className="text-2xl font-bold text-purple-900">30,00 лв.</span>
                <span className="text-sm text-gray-600">15,34 €</span>
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

      {/* Features Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
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
      <div className="bg-white py-16 sm:py-24">
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
      <div className="bg-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
              {t('benefits.title')}
            </h2>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-white rounded-lg p-4 shadow-sm">
                  <FaCheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important Info Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              {t('info.title')}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
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
                  <h3 className="font-semibold text-gray-900 mb-2">{t('info.coverageTitle')}</h3>
                  <p className="text-gray-600">{t('info.coverage')}</p>
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
              <Link
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {t('cta.button')}
              </Link>
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