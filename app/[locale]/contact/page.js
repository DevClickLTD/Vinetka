import { Link } from "../../../lib/navigation";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contactForm";
import Script from "next/script";
import { generateSEOMetadata } from '../../../lib/seo-utils';
// import HeaderBreadcrumb from "@/components/HeaderBreadcrumb"; // Ще го добавим по-късно

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations("contact");

  return generateSEOMetadata({
    locale,
    path: 'contact',
    title: t("pageTitle"),
    description: t("pageDescription"),
    image: '/default.webp',
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.avtovia.bg/bg/contact#contactpage",
    "name": "Контакти - Avtovia.bg",
    "description": "Свържете се с нас за въпроси относно електронни винетки, проверка на винетки и информация за пътни такси в България.",
    "url": "https://www.avtovia.bg/bg/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Avtovia.bg",
      "@id": "https://www.avtovia.bg/#organization"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Начало",
        "item": "https://www.avtovia.bg/bg"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Контакти",
        "item": "https://www.avtovia.bg/bg/contact"
      }
    ]
  };

  const officeContacts = [
    {
      type: t("officeType"),
      contacts: [
        {
          icon: BuildingOffice2Icon,
          label: t("address"),
          value: 'гр. София, ул. "Майор Юрий Гагарин" 30Б',
          href: null,
        },
        {
          icon: EnvelopeIcon,
          label: t("email"),
          value: "hello@avtovia.bg",
          href: "mailto:hello@avtovia.bg",
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      
      <Script
        id="contact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* <HeaderBreadcrumb title="Контакти" /> */}
      <div className="isolate bg-white px-6 py-4 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          {/* <p className="mt-2 text-lg leading-8 text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p> */}
        </div>
        <div className="w-full xl:max-w-[80%] mx-auto mt-2 sm:mt-6">
          <ContactForm />
        </div>

        {/* Секция с информация за офиси */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
          {officeContacts.map((officeSection) => (
            <div key={officeSection.type} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-semibold leading-7 text-gray-900 text-center mb-10">
                {officeSection.type}
              </h3>
              <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {officeSection.contacts.map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#803487]">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="mt-4 text-lg font-medium leading-7 text-gray-900">
                      {item.label}
                    </h4>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-1 block text-sm leading-6 text-gray-700 hover:text-purple-700 hover:underline"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <p className="mt-1 text-sm leading-6 text-gray-700">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Секция с iframe карта */}
      <div className="w-full mt-16 sm:mt-24">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1ImMwCOgNe_xaP3Hv4naAce3bcml3uEo&ehbc=2E312F&noprof=1&z=12"
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
