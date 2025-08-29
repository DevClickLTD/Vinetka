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
              "@type": "LegalService",
              name: "Lorem ipsum dolor sit amet",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              url: "https://example.bg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+359XXXXXXXXX",
                contactType: "customer service",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Example Street 123",
                addressLocality: "София",
                postalCode: "1000",
                addressCountry: "BG",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
