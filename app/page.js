import HeroSection from "../components/hero";
import { WebVitals } from "./web-vitals";
import dynamic from "next/dynamic";
import ServicesLoop from "../components/servicesLoop";
import { getServices } from "../services/services";
import { Suspense } from "react";
import CardsRow from "@/components/CardsRow";
import CtasRow from "@/components/CtasRow";
import VignetteCheckerCTA from "@/components/VignetteCheckerCTA";

const CTA = dynamic(() => import("../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../components/clients"), { ssr: true });
const Lastestposts = dynamic(() => import("../components/latestposts"), {
  ssr: true,
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "Винетка онлайн - Купи електронна винетка",
  description:
    "Винетка онлайн - Купи лесно електронна винетка с няколко клика, плати с карта и получи разписката",
  keywords: [
    "винетка онлайн",
    "електронна винетка",
    "купи винетка",
    "винетка",
  ],
  openGraph: {
    title: "Винетка онлайн - Купи електронна винетка",
    description: "Купи лесно електронна винетка с няколко клика, плати с карта и получи разписката",
    images: [
      {
        url: "/hero-image-desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Винетка онлайн - Купи електронна винетка",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Винетка онлайн - Купи електронна винетка",
    description: "Купи лесно електронна винетка с няколко клика, плати с карта и получи разписката",
    images: ["/hero-image-desktop.jpg"],
  },
};

export default async function Home() {
  const allServices = await getServices();

  return (
    <>
      <WebVitals />
      <HeroSection />
      {/* <Incentives /> */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto w-full">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl font-display">
              Винетки онлайн
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Електронни винетки за леки автомобили до 3.5 т
            </p>
          </div>
          <Suspense
            fallback={
              <div className="text-center py-10">Зареждане на услугите...</div>
            }
          >
            <ServicesLoop services={allServices} />
          </Suspense>
        </div>
      </section>
      <CTA />
      <VignetteCheckerCTA />
      <CtasRow />
      <CardsRow />
      <Clients />
      <Lastestposts />
    </>
  );
}
