"use client";

import { useState } from "react";
import { Link } from "../lib/navigation";

export default function MonthlyVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Месечна винетка онлайн
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Месечната винетка е една от най-купуваните и предпочитани опции сред шофьорите в България. Тя предлага отличен баланс между цена и продължителност, като осигурява право на движение по платената пътна мрежа за период от 1 месец, считано от избраната начална дата.
            </p>

            <div className="relative">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-6">
                  Този тип винетка е изключително подходящ за хора, които използват автомобила си активно в рамките на определен месец – например при временна работа в друг град, интензивни служебни ангажименти или по-дълга почивка. Месечната винетка е идеално решение и за шофьори, които не желаят да се ангажират с годишен период, но все пак пътуват достатъчно често.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Една от най-търсените електронни винетки
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Една от основните причини тя да бъде сред най-популярните винетки е нейната гъвкавост. Можете да изберете точна начална дата и да планирате разходите си според нуждите. Освен това, в сравнение със{" "}
                  <Link
                    href="/tseni/sedmichna"
                    className="text-[#803487] hover:underline font-medium"
                  >
                    седмичната винетка
                  </Link>
                  , месечната предлага по-добра стойност при по-честа употреба, без да достига цената на по-дългосрочните варианти.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Закупуването на месечна винетка става изцяло онлайн и отнема само 1 минута. Необходимо е да въведете рег. номер на автомобила и държавата на регистрация, след което избирате начална дата – веднага или в бъдещ момент. Това прави процеса изключително удобен и бърз, без нужда от физически стикери или посещения на място.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Месечната винетка е практичен и разумен избор за шофьори, които търсят удобство, гъвкавост и добра цена. Тя осигурява спокойствие при пътуване и ви позволява да използвате платената пътна мрежа без излишни ограничения или дългосрочни ангажименти.
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
