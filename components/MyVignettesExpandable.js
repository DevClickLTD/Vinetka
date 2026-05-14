"use client";

import { useState } from "react";

export default function MyVignettesExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
            Управление на винетки на едно място
          </h2>

          <div className="prose prose-lg prose-purple mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              С регистрация в Avtovia.bg получавате удобно място, където да управлявате всички свои електронни винетки бързо и лесно. Вместо да пазите имейли, разписки или да проверявате различни сайтове, можете да виждате на едно място всички активни и изтекли винетки за вашите автомобили.
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                Платформата е особено удобна за семейства и хора с повече от един автомобил. Можете да добавяте винетки за различни регистрационни номера и да следите техния срок на валидност в един общ профил. Така винаги знаете кога изтича дадена винетка и избягвате риска от неприятни глоби или пропуски при пътуване.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Едно от големите предимства е, че можете да добавяте винетки, закупени и от други доставчици, а не само през платформата. Това ви дава пълна гъвкавост и централизирано управление на всички ваши пътни такси, независимо откъде са купени. Освен това ще получавате навременни известия и напомняния преди изтичане на валидността, което ви спестява време и излишно притеснение.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-x-2 rounded-md bg-[#803487] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487] transition-all duration-300"
            >
              {isExpanded ? "Виж по-малко" : "Виж повече"}
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
