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

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations("aboutPage");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/default.webp",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      type: "website",
      locale: locale === "bg" ? "bg_BG" : "en_US",
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  const values = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-[#803487]" />,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      icon: <HeartIcon className="w-8 h-8 text-[#037672]" />,
      title: "Dolor Sit Amet",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: <LightBulbIcon className="w-8 h-8 text-[#803487]" />,
      title: "Consectetur",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      icon: <TrophyIcon className="w-8 h-8 text-[#037672]" />,
      title: "Adipiscing Elit",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Lorem Ipsum" },
    { value: "99.9%", label: "Dolor Sit" },
    { value: "24/7", label: "Consectetur" },
    { value: "5+", label: "Adipiscing" },
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            Lorem Ipsum Dolor Sit Amet
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
              Lorem ipsum dolor sit amet?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
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
