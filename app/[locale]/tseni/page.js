import Image from "next/image";
import Script from "next/script";
import { Link } from "../../../lib/navigation";
import { 
  FaCalendarWeek, 
  FaCalendarDay, 
  FaCalendarAlt, 
  FaCalendar, 
  FaCheckCircle, 
  FaCreditCard,
  FaShieldAlt,
  FaClock,
  FaEuroSign,
  FaTags
} from "react-icons/fa";

import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { getVignettePriceListSchema } from '../../../lib/schemas/productSchemas';

// ISR: Revalidate every 24 hours (prices rarely change)
export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('prices');
  
  return generateSEOMetadata({
    locale,
    path: 'tseni',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
    keywords: [
      "цени винетки",
      "електронна винетка цена",
      "винетка онлайн цени",
      "уикенд винетка цена",
      "седмична винетка цена",
      "месечна винетка цена",
      "тримесечна винетка цена",
      "годишна винетка цена",
      "vinetka.bg цени",
      "Bulgaria vignette prices"
    ],
  });
}

export default async function tseni({ params }) {
  const { locale } = await params;
  const t = await getTranslations('prices');
  
  // ✅ ItemList Schema за pricing page
  const priceListSchema = getVignettePriceListSchema(locale);
  
  const vignetteTypes = [
    {
      id: "uikend",
      icon: <FaCalendarDay className="w-8 h-8 text-purple-600" />,
      title: t('weekend.mainTitle'),
      duration: t('weekend.duration'),
      price: "10,00 лв.",
      priceEur: "5,11 €",
      description: t('weekend.description'),
      features: [
        t('weekend.feature1'),
        t('weekend.feature2'),
        t('weekend.feature3'),
        t('weekend.feature4')
      ],
      highlight: t('weekend.highlight')
    },
    {
      id: "sedmichna",
      icon: <FaCalendarWeek className="w-8 h-8 text-purple-600" />,
      title: t('weekly.title'),
      duration: t('weekly.duration'),
      price: "15,00 лв.",
      priceEur: "7,67 €",
      description: t('weekly.description'),
      features: [
        t('weekly.feature1'),
        t('weekly.feature2'),
        t('weekly.feature3'),
        t('weekly.feature4')
      ],
      highlight: t('weekly.highlight')
    },
    {
      id: "mesechna",
      icon: <FaCalendarAlt className="w-8 h-8 text-purple-600" />,
      title: t('monthly.title'),
      duration: t('monthly.duration'),
      price: "30,00 лв.",
      priceEur: "15,34 €",
      description: t('monthly.description'),
      features: [
        t('monthly.feature1'),
        t('monthly.feature2'),
        t('monthly.feature3'),
        t('monthly.feature4')
      ],
      highlight: t('monthly.highlight')
    },
    {
      id: "trimesechna",
      icon: <FaCalendar className="w-8 h-8 text-purple-600" />,
      title: t('quarterly.title'),
      duration: t('quarterly.duration'),
      price: "54,00 лв.",
      priceEur: "27,61 €",
      description: t('quarterly.description'),
      features: [
        t('quarterly.feature1'),
        t('quarterly.feature2'),
        t('quarterly.feature3'),
        t('quarterly.feature4')
      ],
      highlight: t('quarterly.highlight')
    },
    {
      id: "godishna",
      icon: <FaCalendar className="w-8 h-8 text-purple-600" />,
      title: t('annual.title'),
      duration: t('annual.duration'),
      price: "97,00 лв.",
      priceEur: "49,60 €",
      description: t('annual.description'),
      features: [
        t('annual.feature1'),
        t('annual.feature2'),
        t('annual.feature3'),
        t('annual.feature4')
      ],
      highlight: t('annual.highlight')
    }
  ];

  const benefits = [
    {
      icon: <FaEuroSign className="w-8 h-8 text-green-600" />,
      title: t('benefits.competitive.title'),
      description: t('benefits.competitive.description')
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-600" />,
      title: t('benefits.noHiddenFees.title'),
      description: t('benefits.noHiddenFees.description')
    },
    {
      icon: <FaTags className="w-8 h-8 text-green-600" />,
      title: t('benefits.vatIncluded.title'),
      description: t('benefits.vatIncluded.description')
    },
    {
      icon: <FaClock className="w-8 h-8 text-green-600" />,
      title: t('benefits.instantActivation.title'),
      description: t('benefits.instantActivation.description')
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Електронни винетки за България",
    "description": "Онлайн продажба на електронни винетки за всички типове превозни средства в България",
    "provider": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "url": "https://www.vinetka.bg"
    },
    "areaServed": {
      "@type": "Country",
      "name": "България"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Винетки за България",
      "itemListElement": vignetteTypes.map((vignette, index) => ({
        "@type": "Offer",
        "name": vignette.title,
        "description": vignette.description,
        "validFor": vignette.duration,
        "category": "Електронна винетка"
      }))
    }
  };

  return (
    <>
      <Script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <Script
        id="pricing-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(priceListSchema),
        }}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://web.vinetka.bg/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#803487] shadow-sm hover:bg-[#037672] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
              >
                Купи винетка
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('intro.title')}
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              {t('intro.description1')}
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              {t('intro.description2')}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('benefitsSection.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('benefitsSection.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    {benefit.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div id="pricing" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('pricingSection.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('pricingSection.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {vignetteTypes.map((vignette, index) => (
              <div key={index} className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                {vignette.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                      {vignette.highlight}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    {vignette.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {vignette.title}
                </h3>
                
                <p className="text-center text-sm text-gray-600 mb-2">
                  {t('pricingSection.validFor')} {vignette.duration}
                </p>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600">{vignette.priceEur}</div>
                  <div className="text-lg text-gray-500">{vignette.price}</div>
                </div>
                
                <p className="text-center text-gray-700 mb-6">
                  {vignette.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {vignette.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FaCheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/tseni/${vignette.id}`}
                  className="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
                >
                  {t('pricingSection.learnMore')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-8">
              {t('infoSection.title')}
            </h2>
            
            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-gray-700 leading-relaxed">
                {t('infoSection.description1')}
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                {t('infoSection.description2')}
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-flex items-center rounded-lg bg-white px-6 py-4 shadow-sm">
                <FaCreditCard className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-lg font-semibold text-gray-900">
                  {t('infoSection.paymentText')}
                </span>
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
              {t('ctaSection.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              {t('ctaSection.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://web.vinetka.bg/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#803487] shadow-sm hover:bg-[#037672] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
              >
                Купи винетка
              </a>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                {t('ctaSection.questionsText')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 