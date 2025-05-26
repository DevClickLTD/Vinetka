"use client";

import Image from "next/image";

// Примерни данни за логата на разплащателните системи
const paymentLogos = [
  {
    src: "/images/payment/visa-verified.svg",
    alt: "Verified by Visa",
    width: 100,
    height: 40,
  },
  {
    src: "/images/payment/visa-secure.svg",
    alt: "Visa Secure",
    width: 80,
    height: 40,
  },
  {
    src: "/images/payment/mastercard-securecode.svg",
    alt: "Mastercard SecureCode",
    width: 120,
    height: 40,
  },
  {
    src: "/images/payment/mastercard-idcheck.svg",
    alt: "Mastercard ID Check",
    width: 70,
    height: 40,
  },
];

export default function CardsRow() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
      <div className="mx-auto w-full px-6 lg:px-8 xl:w-4/5 2xl_w-4/5 max-w-screen-2xl 2xl_px-0 text-center">
        {/* Секция с лога на разплащателни системи */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ние приемаме
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
          {paymentLogos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain h-8 sm:h-10 md:h-12 w-auto"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-xl text-gray-300 sm:text-2xl">
            При нас можете да си купите винетка онлайн
          </p>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217-cards)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217-cards">
              <stop stopColor="#803487" />
              <stop offset={1} stopColor="#803487" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
