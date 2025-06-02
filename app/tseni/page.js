import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
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

export const metadata = {
  title: "Цени на електронни винетки - Изберете най-подходящата | Vinetka.bg",
  description:
    "Открийте най-изгодните цени за всички типове електронни винетки в България! Конкурентни цени за уикенд, седмична, месечна, тримесечна и годишна винетка. Без скрити такси.",
  keywords: [
    "цени винетки",
    "електронна винетка цена",
    "винетка онлайн цени",
    "уикенд винетка цена",
    "седмична винетка цена",
    "месечна винетка цена",
    "тримесечна винетка цена",
    "годишна винетка цена",
    "виnetka.bg цени",
    "Bulgaria vignette prices"
  ],
  openGraph: {
    title: "Цени на електронни винетки - Изберете най-подходящата | Vinetka.bg",
    description: "Открийте най-изгодните цени за всички типове електронни винетки в България! Конкурентни цени без скрити такси.",
    images: [
      {
        url: "/default.webp",
        width: 1200,
        height: 630,
        alt: "Цени на електронни винетки",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Цени на електронни винетки - Vinetka.bg",
    description: "Открийте най-изгодните цени за всички типове електронни винетки в България!",
    images: ["/default.webp"],
  },
  alternates: {
    canonical: "/tseni",
  },
};

export default function tseni() {
  const vignetteTypes = [
    {
      id: "uikend",
      icon: <FaCalendarDay className="w-8 h-8 text-purple-600" />,
      title: "Уикенд винетка",
      duration: "2 дни",
      description: "Перфектна за кратки излети",
      features: [
        "Валидна 48 часа",
        "Идеална за спонтанни пътувания",
        "Най-добра стойност за кратки пътувания",
        "От петък до неделя"
      ],
      highlight: "Кратки бягства"
    },
    {
      id: "sedmichna",
      icon: <FaCalendarWeek className="w-8 h-8 text-purple-600" />,
      title: "Седмична винетка",
      duration: "7 дни",
      description: "Идеална за кратки пътувания",
      features: [
        "Валидна точно 168 часа",
        "Перфектна за туристи",
        "Подходяща за бизнес пътувания",
        "Покрива дълъг уикенд"
      ],
      highlight: "Популярен избор"
    },
    {
      id: "mesechna",
      icon: <FaCalendarAlt className="w-8 h-8 text-purple-600" />,
      title: "Месечна винетка",
      duration: "30 дни",
      description: "Подходяща за по-дълги пътувания",
      features: [
        "Валидна точно 30 дни",
        "Отличен баланс цена-гъвкавост",
        "За редовни пътувания",
        "Пълна свобода на движение"
      ],
      highlight: "Най-популярна"
    },
    {
      id: "trimesechna",
      icon: <FaCalendar className="w-8 h-8 text-purple-600" />,
      title: "Тримесечна винетка",
      duration: "3 месеца",
      description: "Икономичен избор за сезонни пътници",
      features: [
        "Валидна точно 90 дни",
        "Спестяване до 15%",
        "Идеална за сезони",
        "Без допълнителни покупки"
      ],
      highlight: "Спестяване 15%"
    },
    {
      id: "godishna",
      icon: <FaCalendar className="w-8 h-8 text-purple-600" />,
      title: "Годишна винетка",
      duration: "12 месеца",
      description: "Най-изгодна за редовни шофьори",
      features: [
        "Валидна точно 365 дни",
        "Спестяване до 40%",
        "Максимално удобство",
        "Без притеснения за статуса"
      ],
      highlight: "Спестяване 40%"
    }
  ];

  const benefits = [
    {
      icon: <FaEuroSign className="w-8 h-8 text-green-600" />,
      title: "Конкурентни цени",
      description: "Най-изгодните цени на пазара със синхронизация с официалните тарифи"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-600" />,
      title: "Без скрити такси",
      description: "Всички цени включват такси и комисионни - няма допълнителни разходи"
    },
    {
      icon: <FaTags className="w-8 h-8 text-green-600" />,
      title: "Включен ДДС",
      description: "Всички цени са с включен ДДС и са валидни за леки автомобили до 3.5 тона"
    },
    {
      icon: <FaClock className="w-8 h-8 text-green-600" />,
      title: "Моментална активация",
      description: "Винетката се активира веднага след плащането без изчакване"
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
      "url": "https://vinetka.bg"
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
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Цени на електронни винетки
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Изберете най-подходящата опция за вашите нужди
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#pricing"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Вижте цените
              </Link>
              <Link
                href="#benefits"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                Предимства <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Конкурентни цени за всички видове винетки
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              На vinetka.bg предлагаме конкурентни цени за всички видове винетки. Нашата ценова листа е винаги 
              актуална и синхронизирана с официалните тарифи на НК "Автомагистрали" ЕАД.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Предлагаме различни варианти на винетки, които покриват всички ваши нужди - от кратко пътуване 
              до цялостно годишно покритие. Всяка винетка е валидна за всички платени магистрали и скоростни 
              пътища в България.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Защо да изберете нас?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства на нашата ценова политика
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
              Изберете вашата винетка
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Сравнете различните опции и изберете най-подходящата за вашите нужди
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
                
                <p className="text-center text-sm text-gray-600 mb-4">
                  Валидна {vignette.duration}
                </p>
                
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
                  Научете повече
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
              Пълна и актуална информация
            </h2>
            
            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-gray-700 leading-relaxed">
                На vinetka.bg ще намерите пълна и актуална информация за цените на всички видове електронни 
                винетки в България. Нашите цени включват всички такси и комисионни - няма скрити разходи 
                или допълнителни такси при плащане.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Сравнете различните опции и изберете най-подходящата за вашите нужди. Всички цени са с 
                включен ДДС и са валидни за леки автомобили до 3.5 тона.
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-flex items-center rounded-lg bg-white px-6 py-4 shadow-sm">
                <FaCreditCard className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-lg font-semibold text-gray-900">
                  Плащане с карта - бързо и сигурно
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
              Готови за пътуване?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Изберете подходящата винетка и заплатете онлайн за няколко секунди.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Купете винетка
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
              >
                Имате въпроси? <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 