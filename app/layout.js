import { headers } from "next/headers";
import Script from "next/script";
import ImagePreloader from "../components/ImagePreloader";
import { CriticalCSS } from "./critical-css";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import { Roboto } from "next/font/google";
import { detectDomain, getBrandName } from "../lib/domain-utils";
import DynamicSchemas from "../components/DynamicSchemas";

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

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const domain = detectDomain(headersList);
  const brandName = getBrandName(domain);
  const siteName = domain === 'vinetka' ? 'Vinetka.bg' : 'Avtovia.bg';

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      template: `%s | ${brandName}`,
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
      siteName,
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
        <DynamicSchemas />

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
