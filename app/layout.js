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
      <body className={roboto.className}>
        <CriticalCSS />
        
        {/* Preconnect and DNS-prefetch */}
        <Script
          id="resource-hints"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const preconnect = document.createElement('link');
                preconnect.rel = 'preconnect';
                preconnect.href = 'https://vinetka.admin-panels.com';
                preconnect.crossOrigin = 'anonymous';
                document.head.appendChild(preconnect);
                
                const dnsPrefetch = document.createElement('link');
                dnsPrefetch.rel = 'dns-prefetch';
                dnsPrefetch.href = 'https://vinetka.admin-panels.com';
                document.head.appendChild(dnsPrefetch);
              })();
            `,
          }}
        />
        
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
              name: "Avtovia.bg",
              url: "https://www.avtovia.bg",
              logo: "https://www.avtovia.bg/images/logo.png",
              description:
                "Винетка онлайн - Купи си електронна винетка за България",
              email: "hello@avtovia.bg",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BG",
              },
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
              name: "Avtovia.bg",
              url: "https://www.avtovia.bg",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.avtovia.bg/bg/proverka-na-vinetka?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
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
              name: "Avtovia.bg",
              url: "https://www.avtovia.bg",
              logo: "https://www.avtovia.bg/images/logo.png",
              image: "https://www.avtovia.bg/images/logo.png",
              description:
                "Винетка онлайн - Купи си електронна винетка за България",
              email: "hello@avtovia.bg",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BG",
              },
              priceRange: "$$",
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3L64SCZY3S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
