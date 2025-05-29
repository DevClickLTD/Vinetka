import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { FaTruck, FaRoute, FaCreditCard, FaClock, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";

export const metadata = {
  title: "Тол такса онлайн - Режим за тежкотоварни автомобили | Vinetka.bg",
  description:
    "Купете тол такса онлайн за тежкотоварни автомобили и автобуси в България. Бърз и лесен достъп до магистралите. Заплатете предварително и избегнете спирането на физическите пунктове.",
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
    title: "Тол такса онлайн - Режим за тежкотоварни автомобили | Vinetka.bg",
    description: "Купете тол такса онлайн за тежкотоварни автомобили и автобуси в България. Бърз и лесен достъп до магистралите.",
    images: [
      {
        url: "/toll-road-og.jpg",
        width: 1200,
        height: 630,
        alt: "Тол такса за тежкотоварни автомобили",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Тол такса онлайн - Режим за тежкотоварни автомобили",
    description: "Купете тол такса онлайн за тежкотоварни автомобили и автобуси в България.",
    images: ["/toll-road-og.jpg"],
  },
  alternates: {
    canonical: "/tol-taksa",
  },
};

export default function TolTaksa() {
  const tollPoints = [
    { name: "Мост при Видин", description: "Дунав мост 1" },
    { name: "Мост при Русе", description: "Дунав мост 2" },
    { name: "Тунел Топли дол", description: "Автомагистрала А1" },
    { name: "Други обекти", description: "Специфични пътни участъци" }
  ];

  const benefits = [
    {
      icon: <FaClock className="w-8 h-8 text-purple-600" />,
      title: "Спестете време",
      description: "Избегнете спирането на физическите пунктове за събиране"
    },
    {
      icon: <FaCreditCard className="w-8 h-8 text-purple-600" />,
      title: "Онлайн плащане",
      description: "Заплатете предварително с карта от удобството на дома си"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-purple-600" />,
      title: "Избегнете глоби",
      description: "Осигурете си валидна тол такса и избегнете санкции"
    },
    {
      icon: <FaRoute className="w-8 h-8 text-purple-600" />,
      title: "Планирайте маршрута",
      description: "Получете детайлна информация за всички тол пунктове"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Тол такса онлайн за тежкотоварни автомобили",
    "description": "Онлайн услуга за закупуване на тол такси за тежкотоварни превозни средства и автобуси в България",
    "provider": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "url": "https://vinetka.bg"
    },
    "areaServed": {
      "@type": "Country",
      "name": "България"
    },
    "serviceType": "Тол такса",
    "audience": {
      "@type": "Audience",
      "audienceType": "Собственици на тежкотоварни автомобили и автобуси"
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
              Тол такса онлайн
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Режим за тежкотоварни автомобили и автобуси
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#info"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Научете повече
              </Link>
              <Link
                href="#toll-points"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                Тол пунктове <span aria-hidden="true">→</span>
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
                Какво е тол таксата?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Специален режим на таксуване за тежкотоварни превозни средства
              </p>
            </div>

            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-gray-700 leading-relaxed">
                На vinetka.bg можете да закупите тол такса онлайн за бърз и лесен достъп до магистралите. 
                За разлика от електронните винетки, предназначени за леки автомобили, тол таксите в България 
                се отнасят за тежкотоварни превозни средства и автобуси.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Този режим е базиран на изминато разстояние и категория на превозното средство, осигурявайки 
                справедливо таксуване за по-голямото натоварване на пътната инфраструктура.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Разберете системата за тол таксуване, за да планирате маршрутите си и да управлявате 
                плащанията ефективно. Тол таксите се събират за преминаване през определени мостове, 
                тунели и специфични пътни участъци извън основната винетна система.
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
              Защо да изберете онлайн плащане?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства на предварителното заплащане на тол таксите
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
              Основни тол пунктове в България
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Места където се събират тол такси
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
              За кого е предназначена услугата?
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Независимо дали сте собственик на транспортна фирма или шофьор на тежкотоварен автомобил, 
              нашата цел е да улесним Вашата работа и да осигурим безпроблемно преминаване по платените 
              пътни участъци.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Нашата платформа ви предлага възможност да заплатите тол таксите предварително онлайн, 
              като избегнете спирането на физическите пунктове за събиране. Това е особено удобно при 
              интензивен трафик или при пътуване в неработно време.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Спести време – избегни глоби!
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Предлагаме детайлна информация за всички тол пунктове и актуални цени.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Свържете се с нас
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                Всички услуги <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 