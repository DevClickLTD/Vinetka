import HeroSection from "../../components/hero";
import HomeBelowFold from "@/components/HomeBelowFold";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "../../lib/seo-utils";

const CTA = dynamic(() => import("../../components/cta"), { ssr: true });

export const revalidate = 3600;

function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations("meta");

  const metadata = generateSEOMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
    image: "/default.webp",
    keywords: [
      "винетка онлайн",
      "електронна винетка",
      "купи винетка",
      "винетка",
      "online vignette",
      "electronic vignette",
      "buy vignette",
      "vignette",
    ],
  });

  return {
    ...metadata,
    title: {
      absolute: `${t("title")} | avtovia bg`,
    },
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const metaT = await getTranslations("meta");
  const faqT = await getTranslations("faq");
  const siteUrl = "https://www.avtovia.bg";

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/${locale}#webpage`,
    url: `${siteUrl}/${locale}`,
    name: metaT("title"),
    description: metaT("description"),
    inLanguage: locale === "bg" ? "bg-BG" : `${locale}-${locale.toUpperCase()}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/default.webp`,
    },
    datePublished: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: metaT("title"),
          item: `${siteUrl}/${locale}`,
        },
      ],
    },
    about: [
      {
        "@type": "Thing",
        name: locale === "bg" ? "Електронни винетки" : "Electronic Vignettes",
      },
      {
        "@type": "Service",
        name: locale === "bg" ? "Продажба на винетки" : "Vignette Sales",
      },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".hero-description"],
    },
  };

  const faqs = faqT.raw("items");
  const faqSchema = faqs?.length ? buildFaqSchema(faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <HeroSection locale={locale} />
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto w-full">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl font-display">
              {t("hero.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>
      <CTA />
      <HomeBelowFold faqs={faqs} faqTitle={faqT("title")} faqSubtitle={faqT("subtitle")} />
    </>
  );
}
