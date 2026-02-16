"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "../lib/navigation";

export default function WeekendVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Предимства на уикенд винетката
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Уикенд винетката предлага удобство и икономия за шофьори, които
              използват Републиканската пътна мрежа само през уикендите. Тя е
              изключително полезна за хора, които пътуват основно през почивните
              дни, като осигурява намаляване на разходите в сравнение с{" "}
              <Link
                href="/tseni/mesechna"
                className="text-[#803487] hover:underline"
              >
                месечната винетка
              </Link>
              .
            </p>

            <div className="relative">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "max-h-[10000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Достъпна цена и икономия
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Едно от основните предимства е, че тя е достъпна на по-ниска
                  цена, отколкото месечната винетка, което я прави атрактивен
                  избор за тези, които пътуват спорадично или спонтанно. Това я
                  прави по-икономична и ефективна опция за частни лица или
                  семейства, които не използват автомобилите си често през
                  седмицата.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Лесно и бързо закупуване
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Другото преимущество е лесното и бързо закупуване на уикенд
                  винетка, което не изисква дълготрайни ангажименти. Шофьорите
                  могат лесно да я закупят онлайн или на бензиностанции, като не
                  се налага да плащат за целия годишен период. Нейната валидност
                  е винаги от 12:00 ч в петък до 23:59 ч в неделя.
                </p>

                {/* Снимка между параграфите */}
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/предимства-на-уикенд-винетката.jpg"
                    alt="Предимства на уикенд винетката за България"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    quality={90}
                  />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Гъвкавост и удобство
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Накрая, уикенд винетката осигурява гъвкавост и удобство, като
                  позволява на пътуващите да използват пътищата само когато им е
                  необходимо, без да се натоварват с допълнителни разходи за
                  цели месеци или години. Тази опция е идеална за тези, които
                  искат да пътуват изгодно, без да се обвързват с дългосрочни
                  винетни плащания.
                </p>
              </div>

              {/* Fade effect overlay when collapsed */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={toggleExpand}
              className="inline-flex items-center gap-x-2 rounded-md bg-[#803487] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487] transition-all duration-300"
            >
              {isExpanded ? "По-малко" : "Вижте повече"}
              <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
