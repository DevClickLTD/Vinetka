"use client";

import Link from "next/link";
import Image from "next/image";
// import { getServicesNav } from "../services/services"; // Вече не е необходимо

// Няма нужда от useEffect и useState тук, тъй като данните идват като props
export default function ServicesLoop({ services: initialServices }) {
  // Проверяваме дали имаме услуги, преди да продължим
  if (!initialServices || initialServices.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-700">Няма налични услуги.</p>
      </div>
    );
  }

  // Трансформираме данните директно от props
  // Предполагаме, че excerpt е налично в initialServices[i].excerpt.rendered
  // Изображението се взима от yoast_head_json.og_image[0].url
  const services = initialServices.map((service) => ({
    id: service.id,
    name: service.title.rendered,
    href: `/services/${service.slug}`,
    imageSrc:
      service.yoast_head_json?.og_image?.[0]?.url || "/placeholder.webp",
    imageAlt: service.title.rendered,
    excerpt: service.excerpt?.rendered || "Няма налично описание.",
  }));

  // Функция за преобразуване на HTML excerpt в списък с булети
  const formatExcerptToList = (htmlExcerpt) => {
    if (!htmlExcerpt || htmlExcerpt === "Няма налично описание.")
      return <p>{htmlExcerpt}</p>;
    // Премахваме <p> таговете и разделяме по нов ред или <br> тагове
    const items = htmlExcerpt
      .replace(/<p>|<\/p>/gi, "")
      .split(/\n|<br\s*\/?>(?!\s*<\/?ul>)/gi)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (items.length === 0) return <p>{htmlExcerpt}</p>; // Връщаме оригиналния текст, ако няма елементи след обработка

    return (
      <ul className="list-none pl-0 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-[#803487] mr-2 flex-shrink-0 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    );
  };

  // Няма нужда от if (loading) ... тъй като компонентът разчита на Suspense в родителя

  return (
    // <div className="mx-auto 2xl:w-4/5">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="w-full py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:w-full lg:mx-auto lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-200 rounded-tr-[1.5rem] rounded-bl-[1.5rem]"
            >
              <div className="md:w-2/5 flex-shrink-0">
                <div className="aspect-w-1 aspect-h-1 h-full">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    priority={services.indexOf(service) < 2} // Priority за първите няколко изображения
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between md:w-3/5">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    {formatExcerptToList(service.excerpt)}
                  </div>
                </div>
                <div className="mt-auto">
                  <Link
                    href={service.href}
                    className="inline-block rounded-md bg-[#803487] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#037672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#803487]"
                  >
                    Купи
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
