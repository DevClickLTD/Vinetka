"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"; // Ще използваме тези икони за бутона

export default function ExpandableInfoRow() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-full">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Винетка за България – всичко, което трябва да знаете
          </h2>
          <p className="mt-3 text-lg leading-8 text-white">
            Ако планирате пътуване с автомобил в България, задължително е да
            закупите винетка за България. Това е електронна такса за ползване на
            републиканската пътна мрежа, която важи за леки и товарни
            автомобили. Без валидна винетка рискувате глоба, затова е важно да
            се информирате предварително.
          </p>
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={toggleOpen}
            className="inline-flex items-center gap-x-2 cursor-pointer rounded-md bg-[#803487] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
          >
            {isOpen ? "По-малко" : "Вижте повече"}
            {isOpen ? (
              <ChevronUpIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 mt-10" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {/* <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Колона 1
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Колона 2
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Колона 3
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Действие</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[...Array(3)].map(
                      (
                        _,
                        i // Примерни данни за таблицата
                      ) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            Данни {i + 1}.1
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            Данни {i + 1}.2
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            Данни {i + 1}.3
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Редактирай
                              <span className="sr-only">, Данни {i + 1}</span>
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table> */}

                <h3 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  Какъв вид винетка да изберете?
                </h3>
                <p className="mt-3 text-lg leading-8 text-white">
                  Съществуват няколко вида винетки – дневна, уикенд, седмична,
                  месечна, тримесечна и годишна. За туристи най-често се
                  използва уикенд винетката, а за чести пътувания – годишната.
                  Електронната система улеснява покупката и проверката, като
                  може да се закупи онлайн или на каса.
                </p>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  Как да закупите винетка?
                </h3>
                <p className="mt-3 text-lg leading-8 text-white">
                  Можете лесно да закупите електронна винетка за България чрез
                  официалния сайт http://bgtoll.bg или през мобилни приложения.
                  Нужно е само да въведете регистрационния номер на автомобила,
                  държавата на регистрация и да изберете периода на валидност.
                </p>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  Проверка на винетка
                </h3>
                <p className="mt-3 text-lg leading-8 text-white">
                  Проверката за валидност се извършва чрез камери и мобилни
                  екипи. Можете да проверите статуса на вашата винетка онлайн.
                  Уверете се, че въведените данни са точни, тъй като системата
                  не допуска корекции след активиране.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
