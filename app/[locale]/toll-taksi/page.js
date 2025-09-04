import Image from "next/image";
import { Link } from "../../../lib/navigation";
import Script from "next/script";
import { FaTruck, FaRoute, FaCreditCard, FaClock, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('tollTax');
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      "тол такса",
      "тол такса онлайн",
      "тежкотоварни автомобили",
      "автобуси",
      "тол пунктове България",
      "мост Видин",
      "мост Русе",
      "тунел Топли дол",
      "платени пътища България"
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: "/default.webp",
          width: 1200,
          height: 630,
          alt: t('pageTitle'),
        },
      ],
      locale: "bg_BG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/default.webp"],
    },
    alternates: {
      canonical: "/toll-taksa",
    },
  };
}

export default async function TolTaksa() {
  const t = await getTranslations('tollTax');
  
  const tollPoints = [
    { name: t('tollPoints.vidinBridge'), description: t('tollPoints.vidinBridgeDesc') },
    { name: t('tollPoints.ruseBridge'), description: t('tollPoints.ruseBridgeDesc') },
    { name: t('tollPoints.topliDolTunnel'), description: t('tollPoints.topliDolTunnelDesc') },
    { name: t('tollPoints.otherObjects'), description: t('tollPoints.otherObjectsDesc') }
  ];

  const benefits = [
    {
      icon: <FaClock className="w-8 h-8 text-purple-600" />,
      title: t('benefits.saveTime'),
      description: t('benefits.saveTimeDesc')
    },
    {
      icon: <FaCreditCard className="w-8 h-8 text-purple-600" />,
      title: t('benefits.onlinePayment'),
      description: t('benefits.onlinePaymentDesc')
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-purple-600" />,
      title: t('benefits.avoidFines'),
      description: t('benefits.avoidFinesDesc')
    },
    {
      icon: <FaRoute className="w-8 h-8 text-purple-600" />,
      title: t('benefits.planRoute'),
      description: t('benefits.planRouteDesc')
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('heroTitle'),
    "description": t('description'),
    "provider": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "url": "https://vinetka.bg"
    },
    "areaServed": {
      "@type": "Country",
      "name": "България"
    },
    "serviceType": t('heroTitle'),
    "audience": {
      "@type": "Audience",
      "audienceType": t('targetAudience.title')
    }
  };

  return (
    <>
      <Script
        id="toll-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              {t('heroSubtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#info"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {t('learnMore')}
              </Link>
              <Link
                href="#toll-points"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                {t('tollPointsNav')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="info" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('whatIsTollTax.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {t('whatIsTollTax.subtitle')}
              </p>
            </div>

            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-gray-700 leading-relaxed">
                {t('whatIsTollTax.description1')}
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                {t('whatIsTollTax.description2')}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {t('whatIsTollTax.description3')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('benefits.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('benefits.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
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

      {/* Toll Points Section */}
      <div id="toll-points" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('tollPoints.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('tollPoints.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {tollPoints.map((point, index) => (
                <div key={index} className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaMapMarkerAlt className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {point.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="bg-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FaTruck className="mx-auto h-16 w-16 text-purple-600" />
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('targetAudience.title')}
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              {t('targetAudience.description1')}
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              {t('targetAudience.description2')}
            </p>
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
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {t('cta.contactUs')}
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                {t('cta.allServices')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 