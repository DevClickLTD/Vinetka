"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"; // Ще използваме тези икони за бутона
import { useTranslations } from 'next-intl';

export default function ExpandableInfoRow() {
  const t = useTranslations('home.expandableInfoRow');
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-full">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-lg leading-8 text-white">
            {t('description')}
          </p>
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={toggleOpen}
            className="inline-flex items-center gap-x-2 cursor-pointer rounded-md bg-[#803487] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
          >
            {isOpen ? t('less') : t('more')}
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
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  {t('whatType')}
                </h3>
                <p className="mt-3 text-lg leading-8 text-white">
                  {t('whatTypeDescription')}
                </p>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  {t('howToBuy')}
                </h3>
                <p className="mt-3 text-lg leading-8 text-white">
                  {t('howToBuyDescription')}
                </p>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  {t('check')}
                </h3>
                <p className="mt-3 text-lg leading-8 text-white">
                  {t('checkDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
