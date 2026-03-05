import Script from "next/script";
import { headers } from "next/headers";
import { detectDomain, getSiteUrl, getSiteName } from "../lib/domain-utils";

export default async function DynamicSchemas() {
  const headersList = await headers();
  const domain = detectDomain(headersList);
  const siteUrl = getSiteUrl(domain);
  const siteName = getSiteName(domain);

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: siteName,
            legalName: `${siteName} - Информация за електронни винетки`,
            description:
              "Информация за електронни винетки в България. Проверка на винетка, цени и пълна информация за всички видове електронни винетки - уикенд, седмична, месечна, тримесечна и годишна.",
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/vinetka.bg-logo.png`,
              width: "250",
              height: "60"
            },
            image: `${siteUrl}/default.webp`,
            email: "hello@vinetka.bg",
            telephone: "+359876995177",
            foundingDate: "2024",
            sameAs: [
              siteUrl,
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+359876995177",
                email: "hello@vinetka.bg",
                contactType: "customer service",
                areaServed: "BG",
                availableLanguage: [
                  {
                    "@type": "Language",
                    name: "Bulgarian",
                    alternateName: "bg"
                  },
                  {
                    "@type": "Language",
                    name: "English",
                    alternateName: "en"
                  },
                  {
                    "@type": "Language",
                    name: "German",
                    alternateName: "de"
                  },
                  {
                    "@type": "Language",
                    name: "Russian",
                    alternateName: "ru"
                  }
                ],
                contactOption: "TollFree",
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  opens: "09:00",
                  closes: "18:00"
                }
              }
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Майор Юрий Гагарин 30Б",
              addressLocality: "София",
              addressRegion: "София-град",
              postalCode: "1113",
              addressCountry: "BG"
            },
            areaServed: [
              {
                "@type": "Country",
                name: "Bulgaria",
                sameAs: "https://en.wikipedia.org/wiki/Bulgaria"
              }
            ]
          }),
        }}
      />
      
      {/* WebSite Schema with SearchAction */}
      <Script
        id="structured-data-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: `${siteName} - Информация за електронни винетки`,
            description: "Проверка на винетка, цени и пълна информация за всички видове електронни винетки в България",
            publisher: {
              "@id": `${siteUrl}/#organization`
            },
            inLanguage: ["bg", "en", "de", "ru", "tr", "el", "sr", "ro", "mk"],
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteUrl}/bg/blog?search={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
      
      {/* LocalBusiness Schema */}
      <Script
        id="structured-data-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${siteUrl}/#localbusiness`,
            name: siteName,
            image: `${siteUrl}/default.webp`,
            description: "Информационен портал за електронни винетки в България с възможност за проверка на валидност и информация за цени",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Майор Юрий Гагарин 30Б",
              addressLocality: "София",
              addressRegion: "София-град",
              postalCode: "1113",
              addressCountry: "BG"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "42.6977",
              longitude: "23.3219"
            },
            url: siteUrl,
            telephone: "+359876995177",
            email: "hello@vinetka.bg",
            priceRange: "10 BGN - 97 BGN",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                opens: "09:00",
                closes: "18:00"
              }
            ],
            paymentAccepted: "Cash, Credit Card, Debit Card",
            currenciesAccepted: "BGN"
          }),
        }}
      />
    </>
  );
}
