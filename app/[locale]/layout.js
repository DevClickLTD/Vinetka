import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n/request';
import Navigation from '../../components/nav';
import Footer from '../../components/footer';
import DynamicCookieConsentBanner from '../../components/DynamicCookieConsentBanner';
import { getCanonicalUrl, getAbsoluteImageUrl } from '../../lib/seo-utils';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages();
  
  // ✅ ПОПРАВКА: Генерирай абсолютни URL-и
  const canonicalUrl = getCanonicalUrl(locale, '');
  const ogImage = getAbsoluteImageUrl('/default.webp');
  
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
        }
      ],
      type: "website",
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
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
        bg: getCanonicalUrl('bg', ''),
        en: getCanonicalUrl('en', ''),
        de: getCanonicalUrl('de', ''),
        ru: getCanonicalUrl('ru', ''),
        tr: getCanonicalUrl('tr', ''),
        gr: getCanonicalUrl('gr', ''),
        srb: getCanonicalUrl('srb', ''),
        ro: getCanonicalUrl('ro', ''),
        mk: getCanonicalUrl('mk', ''),
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }
  
  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      {children}
      <DynamicCookieConsentBanner />
      <Footer />
    </NextIntlClientProvider>
  );
}
