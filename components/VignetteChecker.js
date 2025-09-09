"use client";

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from 'next-intl';

export default function VignetteChecker() {
  const t = useTranslations('vignetteCheckerComponent');
  const [plateNumber, setPlateNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!plateNumber.trim()) {
      setError(t('errorRequired'));
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiUrl = `https://check.bgtoll.bg/check/vignette/plate/BG/${plateNumber.trim()}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(t('errorServer'));
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error occurred:', err);
      setError(t('errorGeneral'));
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.ok && result.vignette) {
      const vignette = result.vignette;
      
      return (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">{t('resultsTitle')}</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">{t('fields.status')}:</span>
              <span className={`font-semibold ${vignette.statusBoolean ? 'text-green-600' : 'text-red-600'}`}>
                {vignette.status}
              </span>
            </div>
            
            {vignette.validityDateFromFormated && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('fields.validFrom')}:</span>
                <span className="text-gray-900">{vignette.validityDateFromFormated}</span>
              </div>
            )}
            
            {vignette.validityDateToFormated && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('fields.validTo')}:</span>
                <span className="text-gray-900">{vignette.validityDateToFormated}</span>
              </div>
            )}
            
            {vignette.licensePlateNumber && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('fields.plateNumber')}:</span>
                <span className="text-gray-900">{vignette.licensePlateNumber}</span>
              </div>
            )}
            
            {vignette.country && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('fields.country')}:</span>
                <span className="text-gray-900">{vignette.country}</span>
              </div>
            )}
            
            {vignette.vehicleClass && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('fields.vehicleClass')}:</span>
                <span className="text-gray-900">{vignette.vehicleClass}</span>
              </div>
            )}
            
            {vignette.emissionsClass && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('fields.emissionsClass')}:</span>
                <span className="text-gray-900">{vignette.emissionsClass}</span>
              </div>
            )}
            
            {vignette.price && vignette.currency && (
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-700">{t('fields.price')}:</span>
                <span className="text-gray-900">{vignette.price} {vignette.currency}</span>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">{t('resultTitle')}</h2>
          </div>
          <p className="text-red-600 font-medium">
            {t('noValidVignette')}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="plate" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('inputLabel')}
            </label>
            <div className="relative">
              <input
                id="plate"
                name="plate"
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder={t('inputPlaceholder')}
                className="block w-full rounded-md bg-white px-3.5 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#803487] uppercase"
                disabled={loading}
                maxLength={10}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">BG</span>
              </div>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !plateNumber.trim()}
            className="w-full rounded-md bg-[#803487] px-3.5 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {t('checkingButton')}
              </div>
            ) : (
              t('checkButton')
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {renderResult()}

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          {t('infoTitle')}
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('infoItems.realtime')}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('infoItems.free')}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('infoItems.format')}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('infoItems.bulgarian')}
          </li>
        </ul>
      </div>
    </div>
  );
} 