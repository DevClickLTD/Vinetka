"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "../lib/navigation";
import { useTranslations } from "next-intl";

export default function VignetteCheckerSidebar() {
  const t = useTranslations("components.vignetteCheckerSidebar");
  const [plateNumber, setPlateNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!plateNumber.trim()) {
      setError(t("errorRequired"));
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiUrl = `https://check.bgtoll.bg/check/vignette/plate/BG/${plateNumber.trim()}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(t("errorServer"));
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error occurred:", err);
      setError(t("errorGeneral"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#803487] to-[#037672] rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t("title")}</h3>
          <p className="text-sm text-white/90">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                id="plate"
                name="plate"
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder={t("inputPlaceholder")}
                className="block w-full rounded-lg bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white uppercase"
                disabled={loading}
                maxLength={10}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  BG
                </span>
              </div>
            </div>
            {error && <p className="text-white text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !plateNumber.trim()}
            className="w-full rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-[#803487] shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#803487] border-t-transparent rounded-full animate-spin mr-2"></div>
                {t("checkingButton")}
              </div>
            ) : (
              t("checkButton")
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-4">
            {result.ok && result.vignette ? (
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-semibold text-gray-900">
                    {t("validVignette")}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  {result.vignette.validityDateToFormated && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("validTo")}:</span>
                      <span className="text-gray-900 font-medium">
                        {result.vignette.validityDateToFormated}
                      </span>
                    </div>
                  )}
                  {result.vignette.vehicleClass && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {t("vehicleClass")}:
                      </span>
                      <span className="text-gray-900 font-medium">
                        {result.vignette.vehicleClass}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center">
                  <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm font-semibold text-red-600">
                    {t("noValidVignette")}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
