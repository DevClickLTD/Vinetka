import Image from "next/image";
import Link from "next/link";
import { getServices } from "../../services/services";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

// Динамично зареждане на новия компонент със списъка с услуги
const ServicesLoop = dynamic(() => import("../../components/servicesLoop.js"), {
  ssr: true,
  loading: () => (
    <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
  ),
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export const metadata = {
  title: "Услуги - Vinetka.bg",
  description:
    "Разгледайте всички наши професионални услуги, които предлагаме за бизнеса. Открийте как можем да помогнем на вашия бизнес да расте и да се развива.",
  keywords: ["услуги", "бизнес услуги", "професионални услуги", "Vinetka.bg"],
  openGraph: {
    title: "Професионални Услуги | Vinetka.bg",
    description: "Разгледайте всички наши професионални услуги",
    images: [
      {
        url: "/default.webp",
        width: 1200,
        height: 630,
        alt: "Vinetka.bg Services",
      },
    ],
  },
};

export default async function Services() {
  try {
    const services = await getServices();

    if (!services || services.length === 0) {
      return (
        <p className="text-gray-600 text-center mt-10">
          В момента няма налични услуги!
        </p>
      );
    }

    // Подготвяме структурирани данни за Schema.org
    const servicesSchemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title.rendered,
          url: `https://example.bg/services/${service.slug}`,
          description:
            service.content.rendered.replace(/<[^>]+>/g, "").substring(0, 150) +
            "...",
          provider: {
            "@type": "Organization",
            name: "Vinetka.bg",
            url: "https://example.bg",
          },
        },
      })),
    };

    return (
      <>
        <Script
          id="services-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchemaData),
          }}
        />
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Нашите услуги
              </h1>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#803487" />
                    <stop offset={1} stopColor="#803487" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto w-full px-6 lg:px-8">
            <Suspense
              fallback={
                <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
              }
            >
              <ServicesLoop services={services} />
            </Suspense>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <p className="text-gray-600 text-center mt-10">
        Неуспешно зареждане на услугите!
      </p>
    );
  }
}
