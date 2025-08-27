import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n/request';
import Navigation from '../../components/nav';
import Footer from '../../components/footer';
import DynamicCookieConsentBanner from '../../components/DynamicCookieConsentBanner';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages();
  
  return {
    title: {
      template: messages.meta.titleTemplate,
      default: messages.meta.title,
    },
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      images: "/default.webp",
      type: "website",
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      siteName: messages.meta.title,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["/default.webp"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        bg: '/bg',
        en: '/en',
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
