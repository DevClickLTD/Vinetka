import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { 
  FaCalendar, 
  FaCheckCircle, 
  FaClock,
  FaArrowLeft,
  FaRoute,
  FaSun,
  FaSnowflake,
  FaMapMarkedAlt,
  FaPiggyBank,
  FaPercentage
} from "react-icons/fa";

export const metadata = {
  title: "Тримесечна винетка - 3 месеца | Цена и информация | Vinetka.bg",
  description:
    "Тримесечна винетка за 90 дни - икономичен избор за сезонни пътници. Спестяване до 15% спрямо месечни винетки. Идеална за летния сезон или зимните месеци.",
  keywords: [
    "тримесечна винетка",
    "90 дни винетка",
    "три месеца винетка",
    "сезонна винетка",
    "летна винетка",
    "зимна винетка",
    "икономична винетка",
    "спестяване 15%"
  ],
  openGraph: {
    title: "Тримесечна винетка - 3 месеца | Цена и информация | Vinetka.bg",
    description: "Тримесечна винетка за 90 дни - икономичен избор за сезонни пътници. Спестяване до 15%.",
    images: [
      {
        url: "/quarterly-vignette-og.jpg",
        width: 1200,
        height: 630,
        alt: "Тримесечна винетка за 90 дни",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Тримесечна винетка - 3 месеца | Vinetka.bg",
    description: "Тримесечна винетка за 90 дни - икономичен избор за сезонни пътници.",
    images: ["/quarterly-vignette-og.jpg"],
  },
  alternates: {
    canonical: "/ceni/trimesechna",
  },
};

export default function TrimesechnaVignette() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6 text-purple-600" />,
      title: "Валидна 90 дни",
      description: "Точно 3 месеца от момента на активиране"
    },
    {
      icon: <FaPercentage className="w-6 h-6 text-purple-600" />,
      title: "Спестяване 15%",
      description: "Значителна икономия спрямо месечни винетки поотделно"
    },
    {
      icon: <FaSun className="w-6 h-6 text-purple-600" />,
      title: "Идеална за сезони",
      description: "Перфектна за летния сезон или зимните месеци"
    },
    {
      icon: <FaPiggyBank className="w-6 h-6 text-purple-600" />,
      title: "Без допълнителни покупки",
      description: "Забравете за винетките за период от 90 дни"
    }
  ];

  const useCases = [
    "Летен туристически сезон",
    "Зимни месеци за ски туризъм",
    "Сезонна работа в друг град",
    "Дълготрайни проекти и командировки",
    "Семейни почивки през сезона",
    "Редовни пътувания за 3 месеца",
    "Студенти през семестъра",
    "Сезонни жители на курорти"
  ];

  const benefits = [
    "Осигурете си спокойствие за цял сезон",
    "Спестяване до 15% от общата стойност",
    "Идеална за интензивни пътувания",
    "Покрива всички нужди без допълнителни покупки",
    "Моментална активация при онлайн поръчка",
    "Валидна точно 90 дни от активирането"
  ];

  const seasonInfo = [
    {
      icon: <FaSun className="w-8 h-8 text-yellow-500" />,
      title: "Летен сезон",
      description: "Перфектна за летните месеци, когато пътуванията са най-интензивни",
      months: "Юни - Август"
    },
    {
      icon: <FaSnowflake className="w-8 h-8 text-blue-500" />,
      title: "Зимен сезон",
      description: "Идеална за зимните месеци за любителите на ски туризма",
      months: "Декември - Февруари"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Тримесечна винетка - 90 дни",
    "description": "Електронна винетка за леки автомобили, валидна 90 дни (3 месеца) от момента на активиране",
    "category": "Електронна винетка",
    "brand": {
      "@type": "Organization",
      "name": "Vinetka.bg"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "BGN",
      "validFor": "P90D",
      "areaServed": {
        "@type": "Country",
        "name": "България"
      }
    }
  };

  return (
    <>
      <Script
        id="quarterly-vignette-schema"
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
                  <Link href="/ceni" className="text-gray-400 hover:text-gray-500 transition-colors">
                    Цени
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">Тримесечна винетка</span>
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
              Тримесечна винетка
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Осигурете си спокойствие за цял сезон!
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="inline-flex items-center rounded-lg bg-purple-100 px-4 py-2">
                <FaClock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-lg font-semibold text-purple-900">Валидна 90 дни</span>
              </div>
              <div className="inline-flex items-center rounded-lg bg-green-100 px-4 py-2">
                <FaPercentage className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-900">Спестяване 15%</span>
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
                Тримесечната винетка е перфектна за тези, които искат да забравят за винетките за период от 90 дни. 
                Идеална за летния сезон, когато пътуванията са най-интензивни, или за зимните месеци за любителите 
                на ски туризма.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Тримесечната винетка покрива всички ваши нужди без необходимост от допълнителни покупки. 
                Значителна икономия спрямо покупката на месечни винетки поотделно - спестявате до 15% от общата 
                стойност при избор на тримесечен период. Активира се моментално при онлайн поръчка и е валидна 
                точно 90 дни.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Season Info Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Сезонно покритие
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Идеална за различните сезони в годината
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {seasonInfo.map((season, index) => (
                <div key={index} className="relative rounded-lg border border-gray-200 bg-white p-8 shadow-sm text-center">
                  <div className="flex items-center justify-center mb-6">
                    {season.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {season.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{season.months}</p>
                  <p className="text-gray-700">{season.description}</p>
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
              Защо да изберете тримесечната винетка?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Предимства и характеристики на 90-дневната винетка
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
              Кога да използвате тримесечна винетка?
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
                  <p className="text-gray-600">Моментална активация при онлайн поръчка</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Валидност</h3>
                  <p className="text-gray-600">Точно 90 дни (3 месеца) от активирането</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Икономия</h3>
                  <p className="text-gray-600">До 15% спестяване спрямо месечни винетки</p>
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
              Планирате сезонни пътувания?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Купете тримесечна винетка сега и спестете до 15% за 90 дни безгрижно пътуване.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Купете тримесечна винетка
              </a>
              <Link
                href="/ceni"
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