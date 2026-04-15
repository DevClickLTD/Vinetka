"use client";

import { useState } from "react";
import { Link } from "../lib/navigation";

export default function QuarterlyVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Тримесечна винетка онлайн
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Тримесечната винетка е отличен избор за шофьори, които използват Републиканската пътна мрежа в България редовно, но не целогодишно. Тя предоставя право на движение по автомагистрали и републикански пътища за период от 3 последователни месеца, считано от избраната начална дата. Това я прави балансирано решение между краткосрочните и{" "}
              <Link
                href="/tseni/godishna"
                className="text-[#803487] hover:underline font-medium"
              >
                годишните винетки
              </Link>
              .
            </p>

            <div className="relative">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-6">
                  Този тип винетка е особено подходящ за сезонни пътувания, чести командировки или хора, които работят в друг град за определен период. Например, ако планирате активно шофиране през летните месеци или имате интензивни ангажименти за няколко месеца, тримесечната винетка ще ви осигури спокойствие и удобство без необходимост от често подновяване.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Предимства на 3-месечната винетка
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Едно от основните предимства на тримесечната винетка е нейната икономическа ефективност. В сравнение с няколко последователни краткосрочни винетки, тя предлага по-добра стойност за парите, като същевременно остава по-достъпна от годишната. Това я прави предпочитан избор за шофьори, които търсят оптимален баланс между цена и продължителност.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Закупуването на тримесечна винетка е бързо и лесно. Можете да я активирате веднага или да изберете бъдеща дата, което е удобно при предварително планиране на пътувания. Необходимо е само да въведете регистрационния номер на автомобила и държавата на регистрация, като цялата процедура отнема само няколко минути.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Проверката на валидността се извършва изцяло онлайн
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Достатъчно е да въведете регистрационния номер в системата за проверка, където ще видите текущия статус на винетката. Освен това, контролът по пътищата се осъществява автоматично чрез камери, които разчитат регистрационните номера и засичат наличието на активна винетка в реално време.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Тримесечната винетка е практично и гъвкаво решение за всеки, който иска да пътува спокойно за по-дълъг период, без да се обвързва с годишен абонамент. Тя комбинира удобство, икономия и сигурност, като ви гарантира безпроблемно движение по платената пътна мрежа.
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
