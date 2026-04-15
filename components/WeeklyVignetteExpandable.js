"use client";

import { useState } from "react";
import { Link } from "../lib/navigation";

export default function WeeklyVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Седмична винетка онлайн
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Седмичната винетка е удобено решение за всички шофьори, които използват Републиканската пътна мрежа в България за кратък период. Тя представлява електронен документ, който дава право на движение по автомагистрали и републикански пътища за срок от 7 последователни дни (не е нужно да е календарна седмица), считано от избраната начална дата.
            </p>

            <div className="relative">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-6">
                  Този тип винетка е особено подходящ при краткосрочни пътувания – например уикенд + разходки, почивки, командировки или временно пребиваване в страната. Вместо да се плаща за по-дълъг период, седмичната винетка предлага оптимален баланс между цена и удобство. Тя е идеален избор за хора, които не пътуват ежедневно, но имат нужда от достъп до пътищата за ограничено време.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Преимущества на винетката за седмица
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Сред основните предимства на седмичната винетка са гъвкавостта и лесното ѝ закупуване. Тя може да бъде купена онлайн само за няколко минути, като се въвеждат регистрационният номер на автомобила и държавата на регистрация. Винетката може да бъде активирана веднага или с бъдеща дата – до 30 дни напред, което позволява предварително планиране на пътуването.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <Link
                    href="/proverka-na-vinetka"
                    className="text-[#803487] hover:underline font-medium"
                  >
                    Проверката на валидността
                  </Link>{" "}
                  също е бърза. Достатъчно е да се въведе регистрационният номер на автомобила в онлайн системата, където се показва статусът на винетката – активна, изтекла или неактивирана. Освен това контролът по пътищата се извършва автоматично чрез камери и мобилни екипи, които засичат регистрационните номера в реално време.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Седмичната винетка е отлична опция за всеки, който търси удобство, бързина и ефективност при краткосрочно пътуване. Тя ви спестява излишни разходи и осигурява свободно придвижване по основните пътища в страната, без ангажимент за дългосрочен период.
                </p>
              </div>

              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
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
