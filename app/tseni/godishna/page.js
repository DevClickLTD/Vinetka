import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { 
  FaCalendar, 
  FaCheckCircle, 
  FaClock,
  FaArrowLeft,
  FaRoute,
  FaMapMarkedAlt,
  FaPiggyBank,
  FaPercentage,
  FaCrown,
  FaShieldAlt
} from "react-icons/fa";

export const metadata = {
  title: "Годишна винетка - 365 дни | Цена и информация | Vinetka.bg",
  description:
    "Годишна винетка за 365 дни - най-изгодното решение за всички, които пътуват редовно. Спестяване до 40% спрямо месечни винетки. Максимално удобство без притеснения.",
  keywords: [
    "годишна винетка",
    "365 дни винетка",
    "една година винетка",
    "годишна електронна винетка",
    "най-изгодна винетка",
    "спестяване 40%",
    "годишно покритие винетка"
  ],
  openGraph: {
    title: "Годишна винетка - 365 дни | Цена и информация | Vinetka.bg",
    description: "Годишна винетка за 365 дни - най-изгодното решение за всички, които пътуват редовно. Спестяване до 40%.",
    images: [
      {
        url: "/default.webp",
        width: 1200,
        height: 630,
        alt: "Годишна винетка за 365 дни",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Годишна винетка - 365 дни | Vinetka.bg",
    description: "Годишна винетка за 365 дни - най-изгодното решение за всички, които пътуват редовно.",
    images: ["/default.webp"],
  },
  alternates: {
    canonical: "/tseni/godishna",
  },
};

export default function GodishnaVignette() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: "Валидна 365 дни",
      description: "Точно една цяла година от момента на активиране"
    },
    {
      icon: <FaPercentage className="w-6 h-6 text-purple-600" />,
      title: "Спестяване 40%",
      description: "Максимална икономия спрямо покупката на месечни винетки"
    },
    {
      icon: <FaCrown className="w-6 h-6 text-purple-600" />,
      title: "Максимално удобство",
      description: "Най-удобното решение за цели 365 дни"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-purple-600" />,
      title: "Без притеснения",
      description: "Забравете за статуса на винетката за цяла година"
    }
  ];

  const useCases = [
    "Притежатели на автомобили с редовно използване",
    "Хора, които пътуват ежедневно за работа",
    "Бизнес собственици с чести командировки",
    "Семейства с активен начин на живот",
    "Търговски представители",
    "Хора с жилища в различни градове",
    "Професионални шофьори",
    "Всички, които не искат притеснения"
  ];

  const benefits = [
    "Най-изгодното решение за цяла година",
    "Спестяване до 40% спрямо месечни винетки",
    "Елиминира необходимостта от чести покупки",
    "Моментална активация при поръчка",
    "Валидна точно 365 дни от активирането",
    "Задължителна за редовни ползватели",
    "Най-добра стойност спрямо цената",
    "Пълно спокойствие за цяла година"
  ];

  const comparison = [
    {
      period: "Месечни винетки",
      cost: "12x месечна цена",
      savings: "0%",
      convenience: "Честа подмяна"
    },
    {
      period: "Годишна винетка",
      cost: "Фиксирана цена",
      savings: "До 40%",
      convenience: "Един път за годината"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Годишна винетка - 365 дни",
    "description": "Електронна винетка за леки автомобили, валидна 365 дни (1 година) от момента на активиране",
    "category": "Електронна винетка",
    "brand": {
      "@type": "Organization",
      "name": "Vinetka.bg"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "BGN",
      "validFor": "P365D",
      "areaServed": {
        "@type": "Country",
        "name": "България"
      }
    }
  };

  return (
    <>
      <Script
        id="annual-vignette-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
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
                  <span className="text-gray-900 font-medium">Годишна винетка</span>
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
              Годишна винетка
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Най-изгодното решение за всички, които пътуват редовно!
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center rounded-lg bg-purple-100 px-4 py-2">
                <FaClock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-lg font-semibold text-purple-900">Валидна 365 дни</span>
              </div>
              <div className="inline-flex items-center rounded-lg bg-green-100 px-4 py-2">
                <FaPercentage className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-900">Спестяване 40%</span>
              </div>
              <div className="inline-flex items-center rounded-lg bg-yellow-100 px-4 py-2">
                <FaCrown className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-lg font-semibold text-yellow-900">Най-изгодна</span>
              </div>
              <div className="inline-flex flex-col items-center rounded-lg bg-white px-6 py-3">
                <span className="text-2xl font-bold text-purple-900">97,00 лв.</span>
                <span className="text-sm text-gray-600">49,60 €</span>
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
                Годишната винетка е задължителна за всички притежатели на автомобили, които използват редовно 
                платените пътища в България. Тя предлага най-добрата стойност спрямо цената и елиминира 
                необходимостта от чести покупки.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                При годишна винетка спестявате до 40% спрямо покупката на месечни винетки през цялата година. 
                Особено изгодна за всички, които не искат да се притесняват за статуса на винетката си. 
                Годишната винетка се активира моментално и е валидна точно 365 дни от датата на активиране.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Comparison */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Сравнение на разходите
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Вижте колко можете да спестите с годишна винетка
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {comparison.map((option, index) => (
                <div key={index} className={`relative rounded-lg border p-8 shadow-sm text-center ${index === 1 ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        Препоръчано
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {option.period}
                  </h3>
                  <div className="space-y-3">
                    <div className="text-gray-700">
                      <span className="font-medium">Разход:</span> {option.cost}
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Спестяване:</span> {option.savings}
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Удобство:</span> {option.convenience}
                    </div>
                  </div>
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
              Защо да изберете годишната винетка?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства и характеристики на 365-дневната винетка
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
              За кого е подходяща годишната винетка?
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
              Основни предимства
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
              Важна информация
            </h2>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Активация</h3>
                  <p className="text-gray-600">Годишната винетка се активира моментално</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Валидност</h3>
                  <p className="text-gray-600">Точно 365 дни от датата на активиране</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Икономия</h3>
                  <p className="text-gray-600">До 40% спестяване спрямо месечни винетки</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Превозни средства</h3>
                  <p className="text-gray-600">Леки автомобили до 3.5 тона</p>
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
              Готови за цяла година безгрижно пътуване?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Купете годишна винетка сега и спестете до 40% за 365 дни пълна свобода.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Купете годишна винетка
              </Link>
              <Link
                href="/tseni"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors flex items-center"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Всички цени
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 