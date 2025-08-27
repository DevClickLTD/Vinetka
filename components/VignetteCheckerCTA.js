"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from 'next-intl';

export default function VignetteCheckerCTA() {
  const t = useTranslations('components.vignetteCheckerCTA');
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#803487] to-[#037672] px-4 py-4 shadow-2xl sm:px-12 lg:px-16">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 bg-white/5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            <div className="relative">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                {/* Left Content */}
                <div>
                  <div className="flex items-center mb-4">
                    <ShieldCheckIcon className="h-8 w-8 text-white mr-3" />
                    <h3 className="text-2xl font-bold text-white">
                      {t('title')}
                    </h3>
                  </div>

                  <p className="text-lg text-white/90 mb-6">
                    {t('subtitle')}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-white/90">
                      <CheckCircleIcon className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                      <span>{t('realTimeCheck')}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <CheckCircleIcon className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                      <span>{t('officialAPI')}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <CheckCircleIcon className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                      <span>{t('freeService')}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <CheckCircleIcon className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                      <span>{t('noRegistration')}</span>
                    </div>
                  </div>

                  <Link
                    href="/proverka-na-vinetka"
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#803487] shadow-lg hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 hover:scale-105"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    {t('checkVignette')}
                  </Link>
                </div>

                {/* Right Content - Visual Element */}
                <div className="relative">
                  <div className="relative mx-auto w-full max-w-sm">
                    {/* Mock Phone/Device */}
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                      <div className="px-6 py-8">
                        <div className="text-center mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {t('checkVignette')}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {t('enterRegistrationNumber')}
                          </p>
                        </div>

                        {/* Mock Form */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('registrationNumber')}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="CA1234AB"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-50"
                                disabled
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                  BG
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            disabled
                            className="w-full rounded-md bg-[#803487] px-3 py-2 text-sm font-semibold text-white"
                          >
                            {t('checkVignette')}
                          </button>
                        </div>

                        {/* Mock Result */}
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm font-medium text-green-800">
                              {t('vignetteValid')}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-green-700">
                            {t('validityUntil')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 rounded-full animate-pulse delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-[#803487]/10 rounded-lg flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="h-6 w-6 text-[#803487]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('quickCheck')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('resultShownInSeconds')}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-[#037672]/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-[#037672]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('officialAPI')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('dataDirectlyFromBGToll')}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('freeService')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('noTaxesOrHiddenFees')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
