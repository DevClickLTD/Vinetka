import ContactForm from "../../components/contactForm"; // Запазваме формата за контакт
import { getPageById } from "../../services/pages";
import Script from "next/script";

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export async function generateMetadata() {
  // Премахваме params, тъй като ID-то е фиксирано
  const page = await getPageById(20); // ID на страницата "Контакти"

  if (!page) {
    return {
      title: "Страницата не е намерена",
    };
  }

  const meta = page.yoast_head_json;
  return {
    title: meta?.title || page.title.rendered,
    description:
      meta?.description ||
      page.content.rendered.replace(/<[^>]+>/g, "").substring(0, 160),
    openGraph: {
      title: meta?.og_title || page.title.rendered,
      description:
        meta?.og_description ||
        page.content.rendered.replace(/<[^>]+>/g, "").substring(0, 200),
      url: meta?.og_url || `/contact`, // Предполагаме, че линкът е /contact
      type: meta?.og_type || "website",
      images: meta?.og_image
        ? meta.og_image.map((img) => ({ url: img.url }))
        : [],
    },
  };
}

export default async function ContactPage() {
  const page = await getPageById(20); // ID на страницата "Контакти"

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl">Страницата не е намерена.</p>
      </div>
    );
  }

  // Подготвяме структурирани данни за Schema.org
  const contactPageSchemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage", // Може да се смени с WebPage ако е по-подходящо
    name: page.title.rendered,
    description:
      page.content.rendered.replace(/<[^>]+>/g, "").substring(0, 200) + "...",
    url:
      page.yoast_head_json?.canonical ||
      `https://vinetka.admin-panels.com/contact`, // Трябва да е пълният URL
  };

  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchemaData),
        }}
      />
      {/* Основна структура на страницата, вдъхновена от предишния ви файл */}
      <div className="relative isolate bg-white">
        <div className="mx-auto w-full">
          {/* Лява колона със съдържанието от WordPress */}
          <div className="px-6 pt-2 pb-20 lg:static">
            <div className="w-full">
              {/* Декоративен SVG елемент, ако искате да го запазите или промените */}
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                >
                  <defs>
                    <pattern
                      x="100%"
                      y={-1}
                      id="pattern-contact"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#pattern-contact)"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                </svg>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {page.title.rendered}
              </h1>
              <div
                className="mt-6 text-lg/8 text-gray-600 prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />

              {/* Форма за контакт под съдържанието */}
              {/* <div className="mt-16">
                <ContactForm />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
