"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "../lib/navigation";
import Image from "next/image";
import { getServicesNav } from "../services/services";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations, useLocale } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const allPages = [
    { name: t('home'), href: "/" },
    { name: t('prices'), href: "/tseni" },
    { name: t('tollTax'), href: "/toll-taksi" },
    { name: t('blog'), href: "/blog" },
    { name: t('contact'), href: "/contact" },
  ];
  
  // Filter out blog for non-bg locales
  const pages = allPages.filter(page => 
    page.href !== "/blog" || locale === 'bg'
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const services = await getServicesNav();

  //       if (!services || !Array.isArray(services) || services.length === 0) {
  //         console.warn("No services found from API");
  //         return;
  //       }

  //       const featured = services.slice(0, 2);
  //       const remainingServices = services.slice(2);

  //       setNavigation((prev) => ({
  //         ...prev,
  //         categories: [
  //           {
  //             id: "categories",
  //             name: "Услуги",
  //             featured: featured.map((service) => ({
  //               name: service.title.rendered,
  //               href: `/services/${service.slug}`,
  //               imageSrc:
  //                 service.yoast_head_json?.og_image?.[0]?.url ||
  //                 "/placeholder.webp",
  //               imageAlt: service.title.rendered,
  //             })),
  //             services: remainingServices.map((service) => ({
  //               id: service.id,
  //               name: service.title.rendered,
  //               href: `/services/${service.slug}`,
  //             })),
  //           },
  //         ],
  //       }));
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching navigation data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);



  return (
    <div className="bg-white sticky shadow-md top-0 block w-full z-50">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-3 pt-4 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
              <div className="ml-3 flex-1">
                <Image
                  src="/vinetka.bg-logo.png"
                  alt="Vinetka.bg лого"
                  width={180}
                  height={40}
                  className="h-10 w-auto max-w-full object-contain"
                />
              </div>
            </div>
            {/* Links */}
            <TabGroup className="mt-2">
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                      prefetch={true}
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>
              {/* <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-xl font-bold text-center text-gray-900 hover:text-[#803487] data-headlessui-state-selected:border-[#803487] data-headlessui-state-selected:text-[#803487]"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div> */}
              {/* Loader */}
              {loading && (
                <div className="flex justify-center py-10">
                  <div className="w-12 h-12 border-4 border-gray-500 border-t-[#803487] rounded-full animate-spin"></div>
                </div>
              )}
              {/* {!loading && (
                <TabPanels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <TabPanel
                      key={category.name}
                      className="space-y-6 px-4 pt-6 pb-8"
                    >
                      <ul className="flex flex-col space-y-4">
                        {[...category.featured, ...category.services].map(
                          (service) => (
                            <li
                              key={service.id || service.name}
                              className="flow-root"
                            >
                              <Link
                                href={service.href}
                                className="-m-2 block p-2 font-medium text-gray-900"
                                onClick={() => setOpen(false)}
                                prefetch={true}
                              >
                                {service.name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </TabPanel>
                  ))}
                </TabPanels>
              )} */}
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between h-16 lg:h-16">
              {/* Mobile menu button - намален padding за повече място */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-1 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-5" />
              </button>

              {/* Секция 1: Лого - намален padding и оптимизиран размер */}
              <div className="flex items-center justify-start lg:w-1/5 pl-1 pr-2 flex-1 lg:flex-initial">
                <Link href="/" className="block w-full lg:w-auto">
                  <span className="sr-only">Vinetka.bg</span>
                  <Image
                    width={180}
                    height={40}
                    alt="Vinetka.bg лого"
                    src="/vinetka.bg-logo.png"
                    className="h-9 lg:h-12 w-full lg:w-auto max-w-full object-contain transition-all duration-300 ease-in-out"
                  />
                </Link>
              </div>

              {/* Секция 2: Меню - центрирано */}
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
                <PopoverGroup className="flex">
                  <div className="flex space-x-8">
                    {pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className="flex items-center font-medium text-gray-700 hover:text-gray-800 text-base"
                        prefetch={true}
                      >
                        {page.name}
                      </Link>
                    ))}
                    {/* {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open, close }) => (
                          <>
                            <div className="relative flex">
                              <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-[#803487] data-open:text-[#803487] cursor-pointer focus-visible:outline-none transition-all text-base">
                                {category.name}
                                <ChevronDownIcon
                                  className={`ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 ease-in-out ${
                                    open ? "rotate-180" : "rotate-0"
                                  }`}
                                />
                              </PopoverButton>
                            </div>
                            <PopoverPanel
                              transition
                              className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 top-1/2 bg-white shadow-sm"
                              />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  {loading && (
                                    <div className="flex justify-center py-10">
                                      <div className="w-12 h-12 border-4 border-gray-500 border-t-[#803487] rounded-full animate-spin"></div>
                                    </div>
                                  )}
                                  {!loading && (
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-6">
                                      <div className="col-start-2">
                                        <div className="group relative text-base sm:text-sm">
                                          <Image
                                            width={560}
                                            height={560}
                                            alt="Представително изображение за навигационно меню"
                                            src="/menu-hero-image.jpg"
                                            sizes="(max-width: 1024px) 50vw, 280px"
                                            quality={75}
                                            loading="lazy"
                                            className="w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75 h-auto"
                                          />
                                        </div>
                                      </div>
                                      <ul className="text-lg divide-y divide-gray-100 start-1 row-start-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        {[
                                          ...category.featured,
                                          ...category.services,
                                        ].map((service) => (
                                          <li
                                            key={service.id || service.name}
                                            className="flex gap-x-4 py-1 items-center"
                                          >
                                            <Link
                                              className="min-w-0 w-full flex"
                                              href={service.href}
                                              prefetch={true}
                                              onClick={close}
                                            >
                                              <p className="text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-[#803487]">
                                                {service.name}
                                              </p>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </PopoverPanel>
                          </>
                        )}
                      </Popover>
                    ))} */}
                  </div>
                </PopoverGroup>
              </div>

              {/* Секция 3: Language Switcher */}
              <div className="flex justify-end items-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
