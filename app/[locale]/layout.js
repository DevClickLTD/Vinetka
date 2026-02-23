import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/request";
import Navigation from "../../components/nav";
import Footer from "../../components/footer";
import DynamicCookieConsentBanner from "../../components/DynamicCookieConsentBanner";
import ReCaptchaProvider from "../../components/ReCaptchaProvider";
import { getCanonicalUrl, getAbsoluteImageUrl } from "../../lib/seo-utils";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const isComingSoon = false; // process.env.NEXT_PUBLIC_COMING_SOON === 'true';

  if (isComingSoon) {
    return {
      title: "В процес на разработка | Vinetka.bg",
      description: "Сайтът е в процес на разработка",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { locale } = await params;
  const messages = await getMessages();

  // ✅ ПОПРАВКА: Генерирай абсолютни URL-и
  const canonicalUrl = getCanonicalUrl(locale, "");
  const ogImage = getAbsoluteImageUrl("/default.webp");

  return {
    title: {
      template: messages.meta.titleTemplate,
      default: messages.meta.title,
    },
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: messages.meta.title,
        },
      ],
      type: "website",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      siteName: messages.meta.title,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": getCanonicalUrl("bg", ""),
        bg: getCanonicalUrl("bg", ""),
        en: getCanonicalUrl("en", ""),
        de: getCanonicalUrl("de", ""),
        ru: getCanonicalUrl("ru", ""),
        tr: getCanonicalUrl("tr", ""),
        el: getCanonicalUrl("el", ""),
        sr: getCanonicalUrl("sr", ""),
        ro: getCanonicalUrl("ro", ""),
        mk: getCanonicalUrl("mk", ""),
      },
    },
  };
}

function ComingSoonPage() {
  const crossPattern = {
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, 0.1) 25%, rgba(139, 92, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.1) 25%, rgba(139, 92, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 76%, transparent 77%, transparent)
    `,
    backgroundSize: "80px 80px",
    backgroundPosition: "0 0",
  };

  const radialOverlay = {
    background:
      "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.8) 100%)",
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0" style={crossPattern}>
        <div className="absolute inset-0" style={radialOverlay}></div>
      </div>

      <div className="text-center px-4 z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          В процес на разработка
        </h1>
        <div className="w-32 h-1 bg-purple-500 mx-auto opacity-50"></div>
      </div>
    </div>
  );
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  const isComingSoon = false; // process.env.NEXT_PUBLIC_COMING_SOON === 'true';

  // If Coming Soon mode is active, show only the Coming Soon page for ALL routes
  if (isComingSoon) {
    return (
      <NextIntlClientProvider messages={messages}>
        <ReCaptchaProvider>
          <ComingSoonPage />
        </ReCaptchaProvider>
      </NextIntlClientProvider>
    );
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <ReCaptchaProvider>
        <Navigation />
        {children}
        <DynamicCookieConsentBanner />
        <Footer />
      </ReCaptchaProvider>
    </NextIntlClientProvider>
  );
}
