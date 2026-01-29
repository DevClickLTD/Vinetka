import { headers } from "next/headers";
import Script from "next/script";
import ImagePreloader from "../components/ImagePreloader";
import { CriticalCSS } from "./critical-css";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export async function generateMetadata() {
  const host = (await headers()).get("host"); // Get the current domain
  const protocol = host?.includes("localhost") ? "http" : "https"; // Adjust for local dev

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      template: "%s | Винетка онлайн - Информация за електронна винетка",
      default: "Винетка онлайн - Информация за електронна винетка",
    },
    description:
      "Винетка онлайн - Информация за електронна винетка",
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
    openGraph: {
      title: "Винетка онлайн - Информация за електронна винетка",
      description:
        "Винетка онлайн - Информация за електронна винетка",
      images: "/default.webp",
      type: "website",
      locale: "bg_BG",
      siteName: "Винетка онлайн - Информация за електронна винетка",
    },
    twitter: {
      card: "summary_large_image",
      title: "Винетка онлайн - Информация за електронна винетка",
      description:
        "Винетка онлайн - Информация за електронна винетка",
      images: ["/default.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        'x-default': "/bg",
        bg: "/bg",
        en: "/en",
        de: "/de",
        ru: "/ru",
        tr: "/tr",
        el: "/el",
        sr: "/sr",
        ro: "/ro",
        mk: "/mk",
      },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <head>
        <CriticalCSS />
        <link
          rel="preconnect"
          href="https://vinetka.admin-panels.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://vinetka.admin-panels.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={roboto.className}>
        <NextTopLoader showSpinner={false} color="#803487" />
        <ImagePreloader />
        <main>{children}</main>
        {/* Organization Schema */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://vinetka.bg/#organization",
              name: "Vinetka.bg",
              legalName: "Vinetka.bg - Информация за електронни винетки",
              description:
                "Информация за електронни винетки в България. Проверка на винетка, цени и пълна информация за всички видове електронни винетки - уикенд, седмична, месечна, тримесечна и годишна.",
              url: "https://vinetka.bg",
              logo: {
                "@type": "ImageObject",
                url: "https://vinetka.bg/vinetka.bg-logo.png",
                width: "250",
                height: "60"
              },
              image: "https://vinetka.bg/default.webp",
              email: "hello@vinetka.bg",
              telephone: "+359876995177",
              foundingDate: "2024",
              sameAs: [
                "https://vinetka.bg",
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
              geo: {
                "@type": "GeoCoordinates",
                latitude: "42.6977",
                longitude: "23.3219"
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
              "@id": "https://vinetka.bg/#website",
              url: "https://vinetka.bg",
              name: "Vinetka.bg - Информация за електронни винетки",
              description: "Проверка на винетка, цени и пълна информация за всички видове електронни винетки в България",
              publisher: {
                "@id": "https://vinetka.bg/#organization"
              },
              inLanguage: ["bg", "en", "de", "ru", "tr", "el", "sr", "ro", "mk"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://vinetka.bg/bg/blog?search={search_term_string}"
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
              "@id": "https://vinetka.bg/#localbusiness",
              name: "Vinetka.bg",
              image: "https://vinetka.bg/default.webp",
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
              url: "https://vinetka.bg",
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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M4B682N8FK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M4B682N8FK');
          `}
        </Script>
      </body>
    </html>
  );
}
