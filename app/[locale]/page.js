import HeroSection from "../../components/hero";
import { WebVitals } from "../web-vitals";
import dynamic from "next/dynamic";
import ServicesLoop from "../../components/servicesLoop";
import { getServices } from "../../services/services";
import { Suspense } from "react";
import CardsRow from "@/components/CardsRow";
import CtasRow from "@/components/CtasRow";
import VignetteCheckerCTA from "@/components/VignetteCheckerCTA";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const CTA = dynamic(() => import("../../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../../components/clients"), { ssr: true });
const Lastestposts = dynamic(() => import("../../components/latestposts"), {
  ssr: true,
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

// Generate metadata using translations
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('meta');
  
  return {
    title: t('title'),
    description: t('description'),
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
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: "/default.webp",
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/default.webp"],
    },
  };
}

export default async function Home() {
  const allServices = await getServices();
  const t = await getTranslations('home');

  return (
    <>
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
      <CtasRow />
      <CardsRow />
      <Lastestposts />
    </>
  );
}
