import VignetteChecker from "../../components/VignetteChecker";
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

export const metadata = {
  title: "Проверка на винетка - Бързо, лесно и сигурно | Vinetka.bg",
  description:
    "Проверете Вашата винетка за секунди! Бърза проверка на валидността на електронната винетка с 100% точност. Синхронизирано в реално време с НК Автомагистрали. Избягвайте глоби!",
  keywords: [
    "проверка винетка",
    "валидност винетка",
    "електронна винетка проверка",
    "БГ ТОЛ проверка",
    "статус винетка",
    "винетка България проверка",
    "избягване глоби винетка",
    "НК Автомагистрали винетка"
  ],
  openGraph: {
    title: "Проверка на винетка - Бързо, лесно и сигурно | Vinetka.bg",
    description: "Проверете Вашата винетка за секунди! Избягвайте глоби с бърза проверка на валидността.",
    images: [
      {
        url: "/vignette-check-og.jpg",
        width: 1200,
        height: 630,
        alt: "Проверка на винетка",
      },
    ],
    type: "website",
    locale: "bg_BG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Проверка на винетка - Бързо, лесно и сигурно | Vinetka.bg",
    description: "Проверете Вашата винетка за секунди! Избягвайте глоби с бърза проверка.",
    images: ["/vignette-check-og.jpg"],
  },
  alternates: {
    canonical: "/proverka-na-vinetka",
  },
};

export default function VignetteCheckPage() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: "Проверка за секунди",
      description: "Моментална проверка на валидността на винетката"
    },
    {
      icon: <FaDatabase className="w-6 h-6 text-purple-600" />,
      title: "Реално време",
      description: "Синхронизирано с базата на НК 'Автомагистрали' ЕАД"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-purple-600" />,
      title: "100% точност",
      description: "Гарантирана точност на информацията"
    },
    {
      icon: <FaExclamationTriangle className="w-6 h-6 text-purple-600" />,
      title: "Избягване на глоби",
      description: "Предотвратете ненужни санкции и стрес"
    }
  ];

  const benefits = [
    "Моментална информация за статуса на винетката",
    "Данни за валидността и типа на винетката",
    "Предотвратяване на глоби и санкции",
    "Особено полезно при смяна на автомобил",
    "Проследяване на изтичащи винетки",
    "Подходящо за компании с автопаркове"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Проверка на винетка",
    "description": "Онлайн система за проверка на валидността на електронни винетки за България",
    "url": "https://vinetka.bg/proverka-na-vinetka",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BGN"
    },
    "provider": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "url": "https://vinetka.bg"
    }
  };

  return (
    <>
      <Script
        id="vignette-check-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
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
                Проверка на винетка
              </h1>
              <p className="mt-6 text-lg leading-8 text-purple-100">
                Бързо, лесно и сигурно!
              </p>
              <div className="mt-8 inline-flex items-center rounded-lg bg-green-100 px-4 py-2">
                <FaMoneyBillWave className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-900">Спести време – избегни глоби!</span>
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

        {/* Introduction Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Проверете Вашата винетка за секунди
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                С бърза проверка на винетка можете да проверите валидността ѝ за секунди! Въведете 
                регистрационния номер на автомобила и системата ще покаже дали имате валидна винетка 
                и до кога е активна.
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Избягвайте глоби и ненужен стрес – проверете винетката си сега!
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Защо да използвате нашата проверка?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Надеждна и точна информация за вашата винетка
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
                Гарантирана точност
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Нашата система е синхронизирана в реално време с базата данни на НК "Автомагистрали" ЕАД, 
                което гарантира 100% точност на информацията.
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Моментално ще получите информация за статуса на винетката - дали е активна, кога изтича 
                валидността й и какъв тип винетка притежавате.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-purple-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
                Какво ще получите?
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
                За бизнес клиенти
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Услугата е особено полезна за компании с автопаркове, които искат да проследяват 
                статуса на винетките на множество превозни средства едновременно.
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Препоръчваме редовна проверка, особено при смяна на автомобил или при изтичане на 
                срока на винетката.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-purple-900">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Нужна ви е нова винетка?
              </h2>
              <p className="mt-6 text-lg leading-8 text-purple-100">
                Ако проверката покаже, че винетката ви е изтекла, купете нова лесно и бързо онлайн.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/services"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Купете винетка
                </a>
                <a
                  href="/ceni"
                  className="text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors"
                >
                  Вижте цените <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 