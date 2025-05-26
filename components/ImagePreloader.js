"use client";

import { useEffect } from "react";

// Списък с изображения, които трябва да се заредят предварително
const CRITICAL_IMAGES = [
  "/купи-винетка.jpg", // Актуално LCP изображение от HeroSection
  // "/hero-image-mobile.jpg", // Премахнато, ако не се използва като LCP
  // "/hero-image-desktop.jpg", // Премахнато, ако не се използва като LCP
];

/**
 * Компонент за предварително зареждане на критични изображения
 * Подобрява LCP метриката, като зарежда важните изображения предварително
 */
export default function ImagePreloader() {
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      // fetchPriority може да не е валиден атрибут директно върху Image инстанция по този начин
      // img.fetchPriority = "high"; // Next/image <Image priority> се грижи за това по-добре
      img.src = src;
      img.onload = () => {
        console.log(`Image preloaded: ${src}`);
        if (window.performance && window.performance.mark) {
          window.performance.mark(`preloaded-${src}`);
        }
      };
      img.onerror = () => {
        console.error(`Failed to preload image: ${src}`);
      };
    };

    CRITICAL_IMAGES.forEach(preloadImage);

    // Логиката за isMobile и разделяне на priorityImage/remainingImages е премахната,
    // тъй като next/image с priority={true} на LCP елемента е по-ефективен
    // за управление на приоритета на зареждане на LCP изображението.
    // Ако има други _наистина_ критични изображения, които не са LCP,
    // те могат да се добавят в CRITICAL_IMAGES и ще се заредят асинхронно тук.
  }, []);

  return null; // Този компонент не рендерира нищо видимо
}
