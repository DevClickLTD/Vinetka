import HeroSection from "../../components/hero";
import { WebVitals } from "../web-vitals";
import dynamic from "next/dynamic";
import ServicesLoop from "../../components/servicesLoop";
import { getServices } from "../../services/services";
import { Suspense } from "react";
import CardsRow from "@/components/CardsRow";
import VignetteCheckerCTA from "@/components/VignetteCheckerCTA";
import FAQ from "@/components/FAQ";
import RegisterCTA from "@/components/RegisterCTA";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Script from "next/script";

const CTA = dynamic(() => import("../../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../../components/clients"), { ssr: true });
const Lastestposts = dynamic(() => import("../../components/latestposts"), {
  ssr: true,
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

import { generateSEOMetadata } from '../../lib/seo-utils';

// Generate metadata using translations
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('meta');
  
  const metadata = generateSEOMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
    keywords: [
      "винетка онлайн",
      "електронна винетка", 
      "купи винетка",
      "винетка",
      "online vignette",
      "electronic vignette",
      "buy vignette",
      "vignette"
    ],
  });

  return {
    ...metadata,
    title: {
      absolute: `${t('title')} | avtovia bg`,
    },
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  const allServices = await getServices();
  const t = await getTranslations('home');
  const metaT = await getTranslations('meta');
  const faqT = await getTranslations('faq');
  const siteUrl = 'https://www.avtovia.bg';

  // ✅ WebPage Schema за homepage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/${locale}#webpage`,
    "url": `${siteUrl}/${locale}`,
    "name": metaT('title'),
    "description": metaT('description'),
    "inLanguage": locale === 'bg' ? 'bg-BG' : `${locale}-${locale.toUpperCase()}`,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${siteUrl}/default.webp`
    },
    "datePublished": "2024-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": metaT('title'),
        "item": `${siteUrl}/${locale}`
      }]
    },
    "about": [
      {
        "@type": "Thing",
        "name": locale === 'bg' ? "Електронни винетки" : "Electronic Vignettes"
      },
      {
        "@type": "Service",
        "name": locale === 'bg' ? "Продажба на винетки" : "Vignette Sales"
      }
    ],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".hero-description"]
    }
  };

  // FAQ данни от преводите
  const faqs = faqT.raw('items');

  return (
    <>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <WebVitals />
      <HeroSection />
      {/* <Incentives /> */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto w-full">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl font-display">
              {t('hero.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('hero.subtitle')}
            </p>
          </div>
          {/* <Suspense
            fallback={
              <div className="text-center py-10">{t('loading')}</div>
            }
          >
            <ServicesLoop services={allServices} />
          </Suspense> */}
        </div>
      </section>
      <CTA />
      <VignetteCheckerCTA />
      <CardsRow />
      <RegisterCTA />
      <FAQ 
        faqs={faqs} 
        title={faqT('title')}
        subtitle={faqT('subtitle')}
      />
      <Lastestposts />
    </>
  );
}
