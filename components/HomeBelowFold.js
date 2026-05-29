"use client";

import dynamic from "next/dynamic";

const CTA = dynamic(() => import("@/components/cta"), {
  ssr: false,
  loading: () => <div className="min-h-[280px]" aria-hidden="true" />,
});

const VignetteCheckerCTA = dynamic(() => import("@/components/VignetteCheckerCTA"), {
  ssr: false,
  loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
});

const CardsRow = dynamic(() => import("@/components/CardsRow"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" aria-hidden="true" />,
});

const RegisterCTA = dynamic(() => import("@/components/RegisterCTA"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" aria-hidden="true" />,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" aria-hidden="true" />,
});

const HomeExpandable = dynamic(() => import("@/components/HomeExpandable"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden="true" />,
});

const Lastestposts = dynamic(() => import("@/components/latestposts"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" aria-hidden="true" />,
});

const WebVitals = dynamic(
  () => import("../app/web-vitals").then((mod) => ({ default: mod.WebVitals })),
  { ssr: false }
);

export default function HomeBelowFold({
  faqs,
  faqTitle,
  faqSubtitle,
  introTitle,
  introSubtitle,
}) {
  return (
    <>
      <WebVitals />
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto w-full">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl font-display">
              {introTitle}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{introSubtitle}</p>
          </div>
        </div>
      </section>
      <CTA />
      <VignetteCheckerCTA />
      <CardsRow />
      <RegisterCTA />
      <FAQ faqs={faqs} title={faqTitle} subtitle={faqSubtitle} />
      <HomeExpandable />
      <Lastestposts />
    </>
  );
}
