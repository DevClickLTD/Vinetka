import { Link } from "../../../lib/navigation";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contactForm';
// import HeaderBreadcrumb from "@/components/HeaderBreadcrumb"; // Ще го добавим по-късно

export async function generateMetadata() {
  const t = await getTranslations('contact');
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');
  
  const officeContacts = [
    {
      type: t('officeType'),
      contacts: [
        {
          icon: BuildingOffice2Icon,
          label: t('address'),
          value: "гр. София, ул. \"Майор Юрий Гагарин\" 30Б",
          href: null,
        },
        {
          icon: EnvelopeIcon,
          label: t('email'),
          value: "hq@insurance.bg",
          href: "mailto:hq@insurance.bg",
        },
      ],
    },
  ];

  return (
    <>
      {/* <HeaderBreadcrumb title="Контакти" /> */}
      <div className="isolate bg-white px-6 py-4 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
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
