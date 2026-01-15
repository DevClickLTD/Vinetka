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
        bg: "/bg",
        en: "/en",
        de: "/de",
        ru: "/ru",
        tr: "/tr",
        gr: "/gr",
        srb: "/srb",
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
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vinetka.bg",
              description:
                "Информация за електронни винетки в България. Проверка на винетка, цени и пълна информация за всички видове електронни винетки - уикенд, седмична, месечна, тримесечна и годишна.",
              url: "https://vinetka.bg",
              logo: "https://vinetka.bg/vinetka.bg-logo.png",
              image: "https://vinetka.bg/default.webp",
              email: "hello@vinetka.bg",
              telephone: "+359876995177",
              sameAs: [
                "https://vinetka.bg",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+359876995177",
                email: "hello@vinetka.bg",
                contactType: "customer service",
                areaServed: "BG",
                availableLanguage: ["Bulgarian", "English", "German", "Russian", "Turkish", "Greek", "Serbian", "Romanian", "Macedonian"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Майор Юрий Гагарин 30Б",
                addressLocality: "София",
                postalCode: "1113",
                addressCountry: "BG",
              },
              areaServed: {
                "@type": "Country",
                name: "Bulgaria",
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "BGN",
                priceSpecification: [
                  {
                    "@type": "UnitPriceSpecification",
                    name: "Уикенд винетка",
                    price: "10.00",
                    priceCurrency: "BGN",
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    name: "Седмична винетка",
                    price: "15.00",
                    priceCurrency: "BGN",
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    name: "Месечна винетка",
                    price: "30.00",
                    priceCurrency: "BGN",
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    name: "Тримесечна винетка",
                    price: "60.00",
                    priceCurrency: "BGN",
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    name: "Годишна винетка",
                    price: "97.00",
                    priceCurrency: "BGN",
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
