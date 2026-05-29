import HeroSection from "../../components/hero";
import HomeBelowFold from "@/components/HomeBelowFold";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "../../lib/seo-utils";

export const revalidate = 3600;

const HERO_LCP_IMAGE = "/купи-винетка.webp";

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
      url: `${siteUrl}${HERO_LCP_IMAGE}`,
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
      <link
        rel="preload"
        as="image"
        href={HERO_LCP_IMAGE}
        type="image/webp"
        fetchPriority="high"
      />
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
      <HomeBelowFold
        faqs={faqs}
        faqTitle={faqT("title")}
        faqSubtitle={faqT("subtitle")}
        introTitle={t("hero.title")}
        introSubtitle={t("hero.subtitle")}
      />
    </>
  );
}
