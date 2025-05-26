"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  GlobeAltIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const ctaItems = [
  {
    id: 1,
    name: "Домашно имущество",
    href: "/services/domashno-imushtestvo", // Примерна връзка
    icon: HomeIcon,
    description:
      "Застраховка домашно имущество - изцяло онлайн. Лесна процедура, оценка на имота и адекватни покрития срещу пожар, природни бедствия, земетресение и кражба. Допълнителни клаузи. Подходяща за апартаменти, къщи и ваканционни имоти.",
    buttonText: "Виж повече",
  },
  {
    id: 2,
    name: "При пътуване в чужбина",
    href: "/services/patuvane-chujbina", // Примерна връзка
    icon: GlobeAltIcon,
    description:
      "Застраховка при пътуване в чужбина с осигурен асистанс - онлайн! Покрития за пътувания зад граница - лични, служебни или за спортни състезания. Допълнителни клаузи, вкл. спасителни разноски, загуба на багаж, отговорност, покритие за COVID-19.",
    buttonText: "Застраховай онлайн",
  },
  {
    id: 3,
    name: "Планинска застраховка",
    href: "/services/planinska-zastrahovka", // Примерна връзка
    icon: SparklesIcon, // Заменено с SparklesIcon поради липса на MountainIcon
    description:
      "Застраховка с покритие срещу злополуки в планината - за ски, сноуборд, планинско колоездене, катерене, трекинг и други екстремни спортове в България. Сключване лесно и сигурно онлайн! Спокойствие при всяко ходене в планината.",
    buttonText: "Застраховай онлайн",
  },
  {
    id: 4,
    name: "Здравна застраховка",
    href: "/services/zdravna-zastrahovka", // Примерна връзка
    icon: HeartIcon,
    description:
      "Здравна застраховка с фиксирани пакети с обезщетения при определени медицински случаи: операция, болничен престой (вкл.раждане), при фрактури. Лесно и бързо сключване онлайн без нужда от попълване на подробна здравна декларация.",
    buttonText: "Застраховай онлайн",
  },
];

export default function CtasRow() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      {/* <div className="mx-auto w-full px-6 lg:px-8 xl:w-4/5 2xl:w-4/5 max-w-screen-2xl 2xl:px-0"> */}
      <div className="mx-auto w-full px-6 lg:px-8 xl_w_full xl_max-w-[1500px] xl_px-0 2xl_w-4/5">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ctaItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg overflow-hidden flex flex-col border border-gray-200 rounded-tr-[1.5rem] rounded-bl-[1.5rem]"
            >
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-center mb-4">
                    <item.icon
                      className="h-12 w-12 text-[#803487]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 text-center flex-grow">
                    {item.description}
                  </p>
                </div>
                <div className="mt-auto text-center">
                  <Link
                    href={item.href}
                    className="inline-block rounded-md bg-[#037672] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#803487] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037672]"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
