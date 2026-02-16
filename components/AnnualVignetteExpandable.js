"use client";

import { useState } from "react";
import Image from "next/image";

export default function AnnualVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Защо да изберем годишна винетка вместо месечна?
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Годишната винетка е идеалният избор за тези, които често пътуват
              по българските пътища и искат да спестят време и средства. Ето
              някои от основните причини да предпочетете годишната винетка:
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
                  Спестяване на пари
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Годишната винетка е по-изгодна от{" "}
                  <a
                    href="/bg/tseni/mesechna"
                    className="text-[#803487] hover:underline"
                  >
                    месечната
                  </a>{" "}
                  в дългосрочен план. Купувайки винетка за цяла
                  година, получавате значителна икономия в сравнение с месечните
                  такси, особено ако планирате повече от едно пътуване през
                  годината.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Удобство на едногодишната винетка
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  С <b>годишната винетка</b> не се налага да се притеснявате за
                  подновяване на винетката всеки месец. Това осигурява удобство
                  и спокойствие, като елиминира нуждата от постоянно внимание
                  към сроковете и платените такси.
                </p>

                {/* Снимка между параграфите */}
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/godishna-vinetka.jpg"
                    alt="Годишна винетка за България"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    quality={90}
                  />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Подходяща за редовни пътувания
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Ако сте водач, който често пътува по пътищата в България,
                  годишната винетка е по-удобна и практична, тъй като не е нужно
                  да се занимавате с честото подновяване на месечни винетки.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Лесна покупка
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  С платформите като vinetka.bg, закупуването на годишна винетка
                  става бързо и лесно. Можете да я закупите онлайн и да я
                  регистрирате за вашето превозно средство за кратко време.
                </p>

                <p className="text-gray-700 leading-relaxed font-medium mt-6">
                  Избирайки годишната винетка, вие не само че осигурявате
                  спокойствие за цялата година, но и спестявате пари и време,
                  което прави този избор наистина изгоден.
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
