import Script from "next/script";
import { CriticalCSS } from "./critical-css";
import DeferredTopLoader from "../components/DeferredTopLoader";
import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Avtovia.bg",
  url: "https://www.avtovia.bg",
  logo: "https://www.avtovia.bg/images/logo.png",
  description: "Винетка онлайн - Купи си електронна винетка за България",
  email: "hello@avtovia.bg",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BG",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Avtovia.bg",
  url: "https://www.avtovia.bg",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.avtovia.bg/bg/proverka-na-vinetka?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Avtovia.bg",
  url: "https://www.avtovia.bg",
  logo: "https://www.avtovia.bg/images/logo.png",
  image: "https://www.avtovia.bg/images/logo.png",
  description: "Винетка онлайн - Купи си електронна винетка за България",
  email: "hello@avtovia.bg",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BG",
  },
  priceRange: "$$",
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export function generateMetadata() {
  return {
    metadataBase: new URL('https://www.avtovia.bg'),
    title: {
      template: '%s | avtovia bg',
      default: "Винетка онлайн - Електронна винетка за България",
    },
    description:
      "Винетка онлайн - Информация за електронна винетка",
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
    openGraph: {
      title: "Винетка онлайн - Електронна винетка за България",
      description:
        "Винетка онлайн - Информация за електронна винетка",
      images: "/default.webp",
      type: "website",
      locale: "bg_BG",
      siteName: 'Avtovia.bg',
    },
    twitter: {
      card: "summary_large_image",
      title: "Винетка онлайн - Електронна винетка за България",
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
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <head>
        <link rel="llms" href="https://www.avtovia.bg/llms.txt" />
        <link rel="llms-full" href="https://www.avtovia.bg/llms-full.txt" />
        <link rel="preconnect" href="https://vinetka.admin-panels.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vinetka.admin-panels.com" />
        <link rel="preconnect" href="https://web.avtovia.bg" crossOrigin="anonymous" />
      </head>
      <body className={roboto.className}>
        <CriticalCSS />
        <DeferredTopLoader />
        <main>{children}</main>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Google Analytics — deferred until after load */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3L64SCZY3S"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3L64SCZY3S');
          `}
        </Script>
      </body>
    </html>
  );
}
