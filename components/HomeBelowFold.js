"use client";

import dynamic from "next/dynamic";

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

export default function HomeBelowFold({ faqs, faqTitle, faqSubtitle }) {
  return (
    <>
      <WebVitals />
      <VignetteCheckerCTA />
      <CardsRow />
      <RegisterCTA />
      <FAQ faqs={faqs} title={faqTitle} subtitle={faqSubtitle} />
      <HomeExpandable />
      <Lastestposts />
    </>
  );
}
