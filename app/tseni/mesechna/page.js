import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
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

export const metadata = {
  title: "Месечна винетка - 30 дни | Цена и информация | Vinetka.bg",
  description:
    "Месечна винетка за 30 дни - най-популярният избор за редовни пътувания. Отличен баланс между цена и гъвкавост. Валидна точно 30 дни от момента на активиране.",
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
    title: "Месечна винетка - 30 дни | Цена и информация | Vinetka.bg",
    description: "Месечна винетка за 30 дни - най-популярният избор за редовни пътувания. Отличен баланс между цена и гъвкавост.",
    images: [
      {
        url: "/default.webp",
        width: 1200,
        height: 630,
        alt: "Месечна винетка за 30 дни",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Месечна винетка - 30 дни | Vinetka.bg",
    description: "Месечна винетка за 30 дни - най-популярният избор за редовни пътувания.",
    images: ["/default.webp"],
  },
  alternates: {
    canonical: "/tseni/mesechna",
  },
};

export default function MesechnaVignette() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: "Валидна 30 дни",
      description: "Точно 30 дни от момента на активиране"
    },
    {
      icon: <FaBalanceScale className="w-6 h-6 text-purple-600" />,
      title: "Отличен баланс",
      description: "Перфектно съотношение между цена и гъвкавост"
    },
    {
      icon: <FaBriefcase className="w-6 h-6 text-purple-600" />,
      title: "За работещи хора",
      description: "Идеална за хора с редовни командировки"
    },
    {
      icon: <FaRoute className="w-6 h-6 text-purple-600" />,
      title: "Пълна свобода",
      description: "Пълна свобода на движение по всички платени пътища"
    }
  ];

  const useCases = [
    "Редовни пътувания за работа",
    "Хора с командировки",
    "Пътешественици из страната",
    "Семейни пътувания през месеца",
    "Студенти с честа нужда от пътуване",
    "Бизнес срещи и клиенти",
    "Туристи за дълготрайни почивки",
    "Хора с второ жилище"
  ];

  const benefits = [
    "Най-популярният избор сред клиентите",
    "Отлично съотношение цена-качество",
    "Идеален за редовни пътувания",
    "Пълно покритие за цял месец",
    "Моментална активация при плащане",
    "Без нужда от допълнителни покупки"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Месечна винетка - 30 дни",
    "description": "Електронна винетка за леки автомобили, валидна 30 дни от момента на активиране",
    "category": "Електронна винетка",
    "brand": {
      "@type": "Organization",
      "name": "Vinetka.bg"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "BGN",
      "validFor": "P30D",
      "areaServed": {
        "@type": "Country",
        "name": "България"
      }
    }
  };

  return (
    <>
      <Script
        id="monthly-vignette-schema"
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
                  <span className="text-gray-900 font-medium">Месечна винетка</span>
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
              Месечна винетка
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Най-популярният избор за редовни пътувания!
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="inline-flex items-center rounded-lg bg-purple-100 px-4 py-2">
                <FaClock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-lg font-semibold text-purple-900">Валидна 30 дни</span>
              </div>
              <div className="inline-flex items-center rounded-lg bg-yellow-100 px-4 py-2">
                <FaStar className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-lg font-semibold text-yellow-900">Най-популярна</span>
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
                Най-популярният избор за редовни пътувания за работа, за хора с командировки или тези, които 
                просто обичат да pacteшестват из страната. Тя предлага отличен баланс между цена и гъвкавост.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Месечната винетка осигурява пълна свобода на движение по всички платени пътища в България за 
                период от 30 дни. Активира се веднага след плащането и е валидна точно 30 дни от момента на 
                активиране.
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
              Защо да изберете месечната винетка?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства и характеристики на 30-дневната винетка
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
              Кога да използвате месечна винетка?
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
                  <p className="text-gray-600">Винетката се активира веднага след плащането</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Валидност</h3>
                  <p className="text-gray-600">Точно 30 дни от момента на активиране</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Покритие</h3>
                  <p className="text-gray-600">Всички платени пътища в България</p>
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
              Нуждаете се от месечно покритие?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Купете месечна винетка сега и се наслаждавайте на пълна свобода за 30 дни.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Купете месечна винетка
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