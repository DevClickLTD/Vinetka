import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { 
  FaCalendarDay, 
  FaCheckCircle, 
  FaClock,
  FaArrowLeft,
  FaRoute,
  FaCalendarPlus,
  FaMapMarkedAlt
} from "react-icons/fa";

export const metadata = {
  title: "Уикенд винетка - 2 дни | Цена и информация | Vinetka.bg",
  description:
    "Уикенд винетка за 2 дни - перфектна за кратки излети и спонтанни пътувания. Валидна 48 часа от момента на активиране. Идеална за пътувания от петък до неделя.",
  keywords: [
    "уикенд винетка",
    "2 дни винетка",
    "винетка 48 часа",
    "кратка винетка",
    "винетка за уикенд",
    "спонтанни пътувания",
    "петък неделя винетка"
  ],
  openGraph: {
    title: "Уикенд винетка - 2 дни | Цена и информация | Vinetka.bg",
    description: "Уикенд винетка за 2 дни - перфектна за кратки излети и спонтанни пътувания. Валидна 48 часа.",
    images: [
      {
        url: "/default.webp",
        width: 1200,
        height: 630,
        alt: "Уикенд винетка за 2 дни",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Уикенд винетка - 2 дни | Vinetka.bg",
    description: "Уикенд винетка за 2 дни - перфектна за кратки излети и спонтанни пътувания.",
    images: ["/default.webp"],
  },
  alternates: {
    canonical: "/tseni/uikend",
  },
};

export default function UikendVignette() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: "Валидна 48 часа",
      description: "Винетката е активна точно 48 часа от момента на закупуване"
    },
    {
      icon: <FaCalendarPlus className="w-6 h-6 text-purple-600" />,
      title: "Идеална за уикенди",
      description: "Специално създадена за двудневни пътувания и кратки почивки"
    },
    {
      icon: <FaRoute className="w-6 h-6 text-purple-600" />,
      title: "Спонтанни решения",
      description: "Перфектна за неочаквани решения за кратко пътуване"
    },
    {
      icon: <FaMapMarkedAlt className="w-6 h-6 text-purple-600" />,
      title: "Всички магистрали",
      description: "Валидна за всички платени магистрали в България"
    }
  ];

  const useCases = [
    "Пътуване от петък до неделя",
    "Кратки почивки извън града",
    "Двудневни екскурзии",
    "Посещение на приятели и семейство",
    "Бизнес командировки до 2 дни",
    "Спонтанни излети до морето или планината"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Уикенд винетка - 2 дни",
    "description": "Електронна винетка за леки автомобили, валидна 48 часа от момента на активиране",
    "category": "Електронна винетка",
    "brand": {
      "@type": "Organization",
      "name": "Vinetka.bg"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "BGN",
      "validFor": "PT48H",
      "areaServed": {
        "@type": "Country",
        "name": "България"
      }
    }
  };

  return (
    <>
      <Script
        id="weekend-vignette-schema"
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
                  <span className="text-gray-900 font-medium">Уикенд винетка</span>
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
                <FaCalendarDay className="w-10 h-10 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Уикенд винетка
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Перфектна за кратки бягства от ежедневието!
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center rounded-lg bg-purple-100 px-4 py-2">
                <FaClock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-lg font-semibold text-purple-900">Валидна 2 дни (48 часа)</span>
              </div>
              <div className="inline-flex flex-col items-center rounded-lg bg-white px-6 py-3">
                <span className="text-2xl font-bold text-purple-900">10,00 лв.</span>
                <span className="text-sm text-gray-600">5,11 €</span>
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
                Уикенд винетката е специално създадена за двудневните пътувания и покрива нуждите за кратки 
                почивки без излишни разходи. Валидна е за период от 48 часа от момента на активиране, което 
                я прави идеална за пътувания от петък до неделя или за всеки друг двудневен период.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Уикенд винетката предлага най-добрата стойност спрямо цената за кратки пътувания. Идеална за 
                спонтанни решения за кратко пътуване и осигурява пълна свобода на движение по всички платени 
                магистрали в България.
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
              Защо да изберете уикенд винетката?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства и характеристики на 2-дневната винетка
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
              Кога да използвате уикенд винетка?
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
                  <p className="text-gray-600">Винетката се активира моментално след плащането</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Валидност</h3>
                  <p className="text-gray-600">Точно 48 часа от момента на активиране</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Покритие</h3>
                  <p className="text-gray-600">Всички платени магистрали в България</p>
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
              Готови за кратко пътешествие?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Купете уикенд винетка сега и тръгвайте на път за няколко секунди.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Купете уикенд винетка
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