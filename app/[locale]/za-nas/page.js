import { getTranslations } from "next-intl/server";
import { Link } from "../../../lib/navigation";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  UsersIcon,
  HeartIcon,
  LightBulbIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { generateSEOMetadata } from '../../../lib/seo-utils';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations("aboutPage");

  return generateSEOMetadata({
    locale,
    path: 'za-nas',
    title: t("title"),
    description: t("description"),
    image: '/default.webp',
  });
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  const values = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-[#803487]" />,
      title: "Сигурност и надеждност",
      description:
        "Работим с лицензиран Национален доставчик на услуги, гарантирайки пълна сигурност и валидност на всяка електронна винетка.",
    },
    {
      icon: <HeartIcon className="w-8 h-8 text-[#037672]" />,
      title: "Грижа за клиента",
      description:
        "Предлагаме бърза и удобна поддръжка, за да направим покупката на винетка максимално лесна и безпроблемна.",
    },
    {
      icon: <LightBulbIcon className="w-8 h-8 text-[#803487]" />,
      title: "Иновативни решения",
      description:
        "Използваме съвременни технологии и дигитални платформи, за да предоставим най-добрата услуга на пазара.",
    },
    {
      icon: <TrophyIcon className="w-8 h-8 text-[#037672]" />,
      title: "Доказано качество",
      description:
        "Част сме от международна група с дългогодишен опит в толинг индустрията и високотехнологични решения.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Доволни клиенти" },
    { value: "99.9%", label: "Надеждност" },
    { value: "24/7", label: "Онлайн достъп" },
    { value: "5+", label: "Години опит" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#803487] to-[#037672] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              За нас
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Предоставяме надеждна платформа за покупка на електронни винетки и пътни такси, подкрепена от лицензиран национален доставчик.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#803487] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
            За платформата
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              avtovia.bg е платформа за бърза и сигурна покупка на електронни винетки и пътни такси, зад която стои Digital Policy Hub. Продажбата на винетки се осъществява от името на &quot;Диджитол Смарт Инфраструктура&quot; АД, опериращо под търговската марка Digitoll – Национален доставчик на услуги, лицензиран от Агенция &quot;Пътна инфраструктура&quot; (АПИ). Digitoll стъпва на българския пазар през 2019 г. и е част от международна група с мажоритарен собственик американската Concord, Inc. Дейността на Digitoll обхваща както продажбата на електронни винетки и маршрутни карти, така и високотехнологични толинг решения за тежкотоварни превозни средства над 3,5 т, базирани на съвременни сателитни технологии.
            </p>

            <p>
              Digital Policy Hub е компания с фокус върху развитието и управлението на дигитални платформи в силно регулирани сектори. Компанията съчетава експертиза в публичните политики, технологиите и потребителските услуги, като работи за прозрачни, ефективни и устойчиви дигитални решения в обществен интерес.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Нашите ценности
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Принципите, които ръководят работата ни всеки ден
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#803487] to-[#037672]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Имате въпроси?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Свържете се с нас или проверете валидността на вашата винетка онлайн.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-[#803487] shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Свържи се с нас
              </Link>
              <Link
                href="/proverka-na-vinetka"
                className="text-base font-semibold leading-6 text-white hover:text-gray-100 transition-colors"
              >
                Провери винетка <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
