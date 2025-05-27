import VignetteChecker from "../../components/VignetteChecker";

export const metadata = {
  title: "Проверка на винетка | Vinetka.bg",
  description:
    "Проверете валидността на вашата електронна винетка за България. Бърза и лесна проверка на статуса на винетката по регистрационен номер.",
  keywords: [
    "проверка винетка",
    "електронна винетка",
    "валидност винетка",
    "БГ ТОЛ",
    "винетка България",
  ],
  openGraph: {
    title: "Проверка на винетка | Vinetka.bg",
    description: "Проверете валидността на вашата електронна винетка за България",
    type: "website",
    locale: "bg_BG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Проверка на винетка | Vinetka.bg",
    description: "Проверете валидността на вашата електронна винетка за България",
  },
};

export default function VignetteCheckPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-800">
        <div className="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20 pt-2">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          />
          <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Проверка на винетка
              </h1>
              <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                Проверете валидността на вашата електронна винетка за България бързо и лесно
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-gray-50 sm:h-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <VignetteChecker />
        </div>
      </div>
    </div>
  );
} 