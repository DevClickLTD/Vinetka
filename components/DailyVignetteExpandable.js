"use client";

import { useState } from "react";
import { Link } from "../lib/navigation";

export default function DailyVignetteExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Еднодневна винетка онлайн
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Еднодневна винетка онлайн е най-новото решение за шофьори, които използват платената пътна мрежа в България само за кратко – в рамките на един ден. Тя дава право на движение по автомагистрали и републикански пътища за точно 24 часа от избраната начална дата и час.
            </p>

            <div className="relative">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed mb-6">
                  Този тип винетка е идеален при еднократни пътувания – например кратка командировка, посещение в друг град или преминаване транзитно през страната. Вместо да плащате за{" "}
                  <Link
                    href="/tseni/sedmichna"
                    className="text-[#803487] hover:underline font-medium"
                  >
                    седмична винетка
                  </Link>
                  , еднодневната винетка ви позволява да оптимизирате разходите си и да платите само за времето, което реално ще използвате.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Закупуването на еднодневна винетка онлайн е бързо и лесно
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Нужно е да въведете регистрационния номер на автомобила, държавата на регистрация и да изберете начална дата и час. След плащане винетката се активира автоматично и е валидна за следващите 24 часа. Целият процес отнема само няколко минути и може да бъде направен от телефон, таблет или компютър.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Едно от основните предимства на онлайн покупката е удобството. Не се налага да търсите физически пунктове или да чакате на опашки. Освен това имате възможност да планирате предварително, като закупите винетката за бъдеща дата, което е особено полезно при организирани пътувания.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                  Оптималният избор за кратки дневни пътувания и транзити
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Еднодневната винетка онлайн е най-добрият избор, когато ви трябва максимална гъвкавост и минимален разход. Тя ви дава свобода да пътувате спокойно, без излишни ангажименти и без да плащате повече от необходимото.
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
