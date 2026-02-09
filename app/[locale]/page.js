import HeroSection from "../../components/hero";
import { WebVitals } from "../web-vitals";
import dynamic from "next/dynamic";
import ServicesLoop from "../../components/servicesLoop";
import { getServices } from "../../services/services";
import { Suspense } from "react";
import CardsRow from "@/components/CardsRow";
import VignetteCheckerCTA from "@/components/VignetteCheckerCTA";
import FAQ from "@/components/FAQ";
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
  
  return generateSEOMetadata({
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
}

export default async function Home({ params }) {
  const { locale } = await params;
  const allServices = await getServices();
  const t = await getTranslations('home');
  const metaT = await getTranslations('meta');

  // ✅ WebPage Schema за homepage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.vinetka.bg/${locale}#webpage`,
    "url": `https://www.vinetka.bg/${locale}`,
    "name": metaT('title'),
    "description": metaT('description'),
    "inLanguage": locale === 'bg' ? 'bg-BG' : `${locale}-${locale.toUpperCase()}`,
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.vinetka.bg/#website"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://www.vinetka.bg/default.webp"
    },
    "datePublished": "2024-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": metaT('title'),
        "item": `https://www.vinetka.bg/${locale}`
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

  // FAQ данни за винетки
  const faqs = [
    {
      question: "Какво е електронна винетка?",
      answer: "Електронната винетка е електронен документ, който удостоверява заплатената такса за ползване на републиканската пътна мрежа в България. Тя заменя физическата винетка и се свързва директно с регистрационния номер на автомобила. Не е необходимо да се поставя на стъклото на автомобила."
    },
    {
      question: "Как да закупя електронна винетка?",
      answer: "Електронната винетка може да се закупи онлайн чрез официалния сайт на Агенция пътна инфраструктура или чрез упълномощените партньори какъвто е Vinetka.bg. Необходими са само регистрационният номер на автомобила, държавата на регистрация и изборът на период на валидност. Плащането се извършва с банкова карта или други електронни методи."
    },
    {
      question: "Кога се активира електронната винетка?",
      answer: "Електронната винетка се активира веднага след успешното плащане. За уикенд и седмичните винетки активацията е моментална. За месечните, тримесечните и годишните винетки можете да изберете начална дата на валидност в рамките на 30 дни напред."
    },
    {
      question: "Как мога да проверя валидността на моята винетка?",
      answer: "Можете да проверите валидността на вашата винетка безплатно чрез нашата услуга за проверка. Въведете регистрационния номер на автомобила и системата ще покаже дали имате валидна винетка, типа ѝ и периода на валидност. Проверката е синхронизирана в реално време с базата данни на АПИ."
    },
    {
      question: "Какви видове винетки има?",
      answer: "В България се предлагат 5 вида електронни винетки за леки автомобили:\n• Уикенд (2 дни) - 10 лв.\n• Седмична (7 дни) - 15 лв.\n• Месечна (30 дни) - 30 лв.\n• Тримесечна (90 дни) - 60 лв.\n• Годишна (365 дни) - 97 лв.\n\nВсяка винетка покрива всички платени магистрали в България."
    },
    {
      question: "Какво се случва ако пътувам без винетка?",
      answer: "Ако пътувате по платена пътна мрежа без валидна винетка, рискувате да получите компенсаторна такса. Размерът на компенсаторната такса варира в зависимост от типа на превозното средство и е значително по-висока от цената на самата винетка. Препоръчваме винаги да проверявате валидността на винетката си преди пътуване."
    },
    {
      question: "Мога ли да получа винетка за автомобил с чуждестранна регистрация?",
      answer: "Да, електронна винетка може да се закупи за всички автомобили, независимо от държавата на регистрация. При покупката трябва да посочите държавата на регистрация и регистрационния номер на автомобила. Винетката важи за всички платени пътища в България."
    },
    {
      question: "Трябва ли да нося документ за закупена винетка?",
      answer: "Не е задължително да носите документ за електронната винетка, тъй като тя е електронна и е свързана с регистрационния номер на автомобила. Системата автоматично разпознава наличието на валидна винетка чрез камери. Препоръчваме обаче да запазите имейла или потвърждението за покупката за всеки случай."
    }
  ];

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
      <FAQ 
        faqs={faqs} 
        title="Често задавани въпроси за винетки"
        subtitle="Отговори на най-често срещаните въпроси относно електронните винетки в България"
        pageUrl="https://www.vinetka.bg/bg"
      />
      <Lastestposts />
    </>
  );
}
