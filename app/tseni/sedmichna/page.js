import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { 
  FaCalendarWeek, 
  FaCheckCircle, 
  FaClock,
  FaArrowLeft,
  FaRoute,
  FaBriefcase,
  FaMapMarkedAlt,
  FaPlane
} from "react-icons/fa";

export const metadata = {
  title: "Седмична винетка - 7 дни | Цена и информация | Vinetka.bg",
  description:
    "Седмична винетка за 7 дни - идеалното решение за кратки почивки и бизнес командировки. Валидна 168 часа (7 дни) от момента на активиране. Перфектна за туристи и бизнес пътувания.",
  keywords: [
    "седмична винетка",
    "7 дни винетка",
    "винетка 168 часа",
    "една седмица винетка",
    "туристическа винетка",
    "бизнес винетка",
    "командировка винетка"
  ],
  openGraph: {
    title: "Седмична винетка - 7 дни | Цена и информация | Vinetka.bg",
    description: "Седмична винетка за 7 дни - идеалното решение за кратки почивки и бизнес командировки.",
    images: [
      {
        url: "/weekly-vignette-og.jpg",
        width: 1200,
        height: 630,
        alt: "Седмична винетка за 7 дни",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Седмична винетка - 7 дни | Vinetka.bg",
    description: "Седмична винетка за 7 дни - идеалното решение за кратки почивки и бизнес командировки.",
    images: ["/weekly-vignette-og.jpg"],
  },
  alternates: {
    canonical: "/tseni/sedmichna",
  },
};

export default function SedmichnaVignette() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: "Валидна 168 часа",
      description: "Точно 7 последователни дни от момента на активиране"
    },
    {
      icon: <FaPlane className="w-6 h-6 text-purple-600" />,
      title: "Перфектна за туристи",
      description: "Идеална за посетители, които идват за дълъг уикенд"
    },
    {
      icon: <FaBriefcase className="w-6 h-6 text-purple-600" />,
      title: "Бизнес пътувания",
      description: "Подходяща за командировки с продължителност до една седмица"
    },
    {
      icon: <FaMapMarkedAlt className="w-6 h-6 text-purple-600" />,
      title: "Всички дестинации",
      description: "Покрива пътувания до морето, планината или различни градове"
    }
  ];

  const useCases = [
    "Туристи за дълъг уикенд",
    "Бизнес командировки до 7 дни",
    "Пътуване до морето за една седмица",
    "Планински ваканции",
    "Посещение на различни градове в страната",
    "Семейни почивки до седмица",
    "Културни обиколки из България",
    "Фестивали и събития"
  ];

  const benefits = [
    "Активира се в момента на закупуване",
    "Покрива всички нужди за кратковременно пътуване",
    "Най-популярният избор за туристи",
    "Отлично съотношение цена-качество",
    "Без притеснения за 7 пълни дни"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Седмична винетка - 7 дни",
    "description": "Електронна винетка за леки автомобили, валидна 7 дни (168 часа) от момента на активиране",
    "category": "Електронна винетка",
    "brand": {
      "@type": "Organization",
      "name": "Vinetka.bg"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "BGN",
      "validFor": "P7D",
      "areaServed": {
        "@type": "Country",
        "name": "България"
      }
    }
  };

  return (
    <>
      <Script
        id="weekly-vignette-schema"
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
                  <span className="text-gray-900 font-medium">Седмична винетка</span>
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
                <FaCalendarWeek className="w-10 h-10 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Седмична винетка
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Идеалното решение за кратки почивки и бизнес командировки!
            </p>
            <div className="mt-8 inline-flex items-center rounded-lg bg-purple-100 px-4 py-2">
              <FaClock className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-lg font-semibold text-purple-900">Валидна 7 дни (168 часа)</span>
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
                Седмичната винетка е валидна за период от 7 последователни дни и покрива всички ваши нужди 
                за кратковременно пътуване из България. Седмичната винетка се активира в момента на закупуване 
                и е валидна точно 168 часа (7 дни) от момента на активиране.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Тя е перфектна за туристи, които идват за дълъг уикенд, или за бизнес пътувания с 
                продължителност до една седмица. Препоръчваме седмичната винетка за всички, които планират 
                пътуване с автомобил до морето, планината или за посещение на различни градове в страната 
                в рамките на една седмица.
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
              Защо да изберете седмичната винетка?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства и характеристики на 7-дневната винетка
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
              Кога да използвате седмична винетка?
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
              Основни предимства
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
              Важна информация
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Активация</h3>
                  <p className="text-gray-600">Винетката се активира в момента на закупуване</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Валидност</h3>
                  <p className="text-gray-600">Точно 7 последователни дни (168 часа)</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Покритие</h3>
                  <p className="text-gray-600">Всички платени магистрали и скоростни пътища</p>
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
              Планирате седмично пътуване?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Купете седмична винетка сега и се наслаждавайте на 7 дни безгрижно пътуване.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Купете седмична винетка
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