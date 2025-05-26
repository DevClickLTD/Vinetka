"use client";

import dynamic from "next/dynamic";

// Динамично импортиране на оригиналния CookieConsentBanner само на клиента
const CookieConsentBanner = dynamic(
  () => import("./cookieConsentBanner"), // Пътят е относителен спрямо текущия файл
  { ssr: false }
);

export default function DynamicCookieConsentBanner() {
  return <CookieConsentBanner />;
}
