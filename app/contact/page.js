import Link from "next/link";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
// import HeaderBreadcrumb from "@/components/HeaderBreadcrumb"; // Ще го добавим по-късно

export async function generateMetadata() {
  return {
    title: "Контакти - Vinetka.bg",
    description:
      "Свържете се с нас чрез нашата форма за контакт или намерете нашите данни за контакт.",
  };
}

export default function ContactPage() {
  const officeContacts = [
    {
      type: "Корпоративен офис",
      contacts: [
        {
          icon: BuildingOffice2Icon,
          label: "Адрес",
          value: "гр. София, ул. „Майор Юрий Гагарин“ 30Б",
          href: null,
        },
        {
          icon: EnvelopeIcon,
          label: "Имейл",
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
            Контакти
          </h2>
          {/* <p className="mt-2 text-lg leading-8 text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p> */}
        </div>
        <form
          action="#"
          method="POST"
          className="w-full xl:max-w-[80%] mx-auto mt-2 sm:mt-6"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Вашето име
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Вашият имейл
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Вашият телефон
              </label>
              <div className="mt-2.5">
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Съобщение
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <label
                htmlFor="agree"
                className="text-sm leading-6 text-gray-600"
              >
                Съгласен съм с{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-indigo-600"
                >
                  Политиката за поверителност
                </Link>
                .
              </label>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-[#803487] px-3.5 py-2.5 text-center cursor-pointer text-sm font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Изпращане
            </button>
          </div>
        </form>

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
