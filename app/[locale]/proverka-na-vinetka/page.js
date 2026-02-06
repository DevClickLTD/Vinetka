import { Link } from "../../../lib/navigation";
import VignetteChecker from "@/components/VignetteChecker";
import ExpandableTextSection from "@/components/ExpandableTextSection";
import Script from "next/script";
import { 
  FaSearch, 
  FaCheckCircle, 
  FaClock,
  FaShieldAlt,
  FaDatabase,
  FaBriefcase,
  FaExclamationTriangle,
  FaMoneyBillWave
} from "react-icons/fa";
import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { getVignetteCheckSoftwareSchema } from '../../../lib/schemas/governmentServiceSchema';
import { getWebAppUrl } from '../../../lib/web-app-url';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('vignetteCheckPage');
  
  return generateSEOMetadata({
    locale,
    path: 'proverka-na-vinetka',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
  });
}

export default async function VignetteCheckPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations('vignetteCheckPage');
  const tNav = await getTranslations('navigation');
  const baseUrl = 'https://www.vinetka.bg';
  const webAppUrl = getWebAppUrl(locale);
  
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: t('features.instantCheck.title'),
      description: t('features.instantCheck.description')
    },
    {
      icon: <FaDatabase className="w-6 h-6 text-purple-600" />,
      title: t('features.realTime.title'),
      description: t('features.realTime.description')
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-purple-600" />,
      title: t('features.accuracy.title'),
      description: t('features.accuracy.description')
    },
    {
      icon: <FaExclamationTriangle className="w-6 h-6 text-purple-600" />,
      title: t('features.avoidFines.title'),
      description: t('features.avoidFines.description')
    }
  ];

  const benefits = [
    t('benefits.instant'),
    t('benefits.validity'),
    t('benefits.prevention'),
    t('benefits.carChange'),
    t('benefits.tracking'),
    t('benefits.fleets')
  ];

  // Generate schemas with proper locale
  const softwareAppSchema = getVignetteCheckSoftwareSchema(locale, baseUrl);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'bg' ? "Начало" : "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'bg' ? "Проверка на винетка" : "Vignette Check",
        "item": `${baseUrl}/${locale}/proverka-na-vinetka`
      }
    ]
  };

  return (
    <>
      <Script
        id="vignette-check-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema),
        }}
      />
      
      <Script
        id="vignette-check-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                  <FaSearch className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-purple-100">
                {t('heroSubtitle')}
              </p>
              <div className="mt-8 inline-flex items-center rounded-lg bg-green-100 px-4 py-2">
                <FaMoneyBillWave className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-900">{t('heroCallout')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checker Tool */}
        <div className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <VignetteChecker />
          </div>
        </div>

        {/* Buy Vignette CTA */}
        <div className="bg-white py-8">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <a
              href={webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 rounded-md bg-[#803487] px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487] transition-all duration-300"
            >
              {tNav('buyVignette')}
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('introTitle')}
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                {t('introDescription1')}
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                {t('introDescription2')}
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('featuresTitle')}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {t('featuresSubtitle')}
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

        {/* Accuracy Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('accuracyTitle')}
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                {t('accuracyDescription1')}
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                {t('accuracyDescription2')}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-purple-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                {t('benefitsTitle')}
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

        {/* Business Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <FaBriefcase className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('businessTitle')}
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                {t('businessDescription1')}
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                {t('businessDescription2')}
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Text Section */}
        <ExpandableTextSection />

        {/* CTA Section */}
        <div className="bg-purple-900">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('ctaTitle')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-purple-100">
                {t('ctaDescription')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href={webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#803487] shadow-sm hover:bg-[#037672] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
                >
                  {tNav('buyVignette')}
                </a>
                <Link
                  href="/tseni"
                  className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
                >
                  {t('ctaPricesButton')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 