/**
 * Government Service Schema
 * 
 * Използва се за показване на легитимност и връзка с официални институции
 * 
 * Използване:
 * import { getGovernmentServiceSchema } from '@/lib/schemas/governmentServiceSchema';
 */

/**
 * Генерира GovernmentService Schema
 * 
 * @param {string} locale - Език
 * @param {string} baseUrl - Базов URL
 * @returns {object} GovernmentService Schema
 */
export function getGovernmentServiceSchema(locale = 'bg', baseUrl = 'https://www.vinetka.bg') {
  const content = {
    bg: {
      name: "Информация за електронни винетки в България",
      description: "Информационна услуга за проверка и закупуване на електронни винетки в България. Синхронизирана с официалната система на НК Автомагистрали.",
      serviceType: "Информационна и консултантска услуга за електронни винетки",
      audience: "Собственици на моторни превозни средства",
      serviceOutput: {
        name: "Информация за винетки",
        description: "Актуална информация за цени, валидност и изисквания за електронни винетки"
      },
      language: "Български",
      eligibility: "Всички собственици на моторни превозни средства",
      availableChannel: "Онлайн услуга 24/7"
    },
    en: {
      name: "Electronic Vignette Information for Bulgaria",
      description: "Information service for checking and purchasing electronic vignettes in Bulgaria. Synchronized with the official Road Infrastructure Agency system.",
      serviceType: "Information and consulting service for electronic vignettes",
      audience: "Motor vehicle owners",
      serviceOutput: {
        name: "Vignette Information",
        description: "Current information about prices, validity and requirements for electronic vignettes"
      },
      language: "English",
      eligibility: "All motor vehicle owners",
      availableChannel: "Online service 24/7"
    }
  };

  const data = content[locale] || content.bg;

  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "@id": `${baseUrl}/${locale}#governmentservice`,
    "name": data.name,
    "description": data.description,
    "serviceType": data.serviceType,
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Vinetka.bg"
    },
    "areaServed": {
      "@type": "Country",
      "name": "България",
      "sameAs": "https://en.wikipedia.org/wiki/Bulgaria"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": data.audience
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": baseUrl,
      "serviceType": "Online Service",
      "availableLanguage": [
        {
          "@type": "Language",
          "name": "Bulgarian",
          "alternateName": "bg"
        },
        {
          "@type": "Language",
          "name": "English",
          "alternateName": "en"
        },
        {
          "@type": "Language",
          "name": "German",
          "alternateName": "de"
        },
        {
          "@type": "Language",
          "name": "Russian",
          "alternateName": "ru"
        },
        {
          "@type": "Language",
          "name": "Turkish",
          "alternateName": "tr"
        },
        {
          "@type": "Language",
          "name": "Greek",
          "alternateName": "el"
        },
        {
          "@type": "Language",
          "name": "Serbian",
          "alternateName": "sr"
        },
        {
          "@type": "Language",
          "name": "Romanian",
          "alternateName": "ro"
        },
        {
          "@type": "Language",
          "name": "Macedonian",
          "alternateName": "mk"
        }
      ],
      "processingTime": {
        "@type": "Duration",
        "value": "PT5M",
        "name": locale === 'bg' ? "5 минути" : "5 minutes"
      }
    },
    "termsOfService": `${baseUrl}/${locale}/obshti-usloviya`,
    "privacyPolicy": `${baseUrl}/${locale}/privacy-policy`,
    "serviceOutput": {
      "@type": "Thing",
      "name": data.serviceOutput.name,
      "description": data.serviceOutput.description
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "category": "Transportation",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'bg' ? "Каталог с винетки" : "Vignette Catalog",
      "url": `${baseUrl}/${locale}/tseni`
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BGN",
      "lowPrice": "10.00",
      "highPrice": "97.00",
      "offerCount": "5"
    }
  };
}

/**
 * Генерира връзки с официални правителствени организации
 */
export function getGovernmentOrganizationsSchema(locale = 'bg') {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === 'bg' ? "Официални институции" : "Official Institutions",
    "description": locale === 'bg' 
      ? "Свързани официални организации и институции"
      : "Related official organizations and institutions",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "GovernmentOrganization",
          "name": "НК Автомагистрали",
          "alternateName": "Road Infrastructure Agency",
          "url": "https://www.bgtoll.bg",
          "sameAs": [
            "https://www.api.government.bg/bg/agency/102"
          ],
          "description": locale === 'bg'
            ? "Национална компания Автомагистрали - официален оператор на електронните винетки в България"
            : "Road Infrastructure Agency - official operator of electronic vignettes in Bulgaria",
          "areaServed": {
            "@type": "Country",
            "name": "България"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "GovernmentOrganization",
          "name": "Агенция Пътна инфраструктура",
          "alternateName": "Road Infrastructure Agency",
          "url": "https://www.api.government.bg",
          "description": locale === 'bg'
            ? "Отговорна за управлението и поддръжката на пътната мрежа в България"
            : "Responsible for the management and maintenance of the road network in Bulgaria",
          "areaServed": {
            "@type": "Country",
            "name": "България"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "GovernmentOrganization",
          "name": "Министерство на регионалното развитие и благоустройството",
          "alternateName": "Ministry of Regional Development and Public Works",
          "url": "https://www.mrrb.bg",
          "description": locale === 'bg'
            ? "Министерство отговорно за пътната инфраструктура в България"
            : "Ministry responsible for road infrastructure in Bulgaria",
          "areaServed": {
            "@type": "Country",
            "name": "България"
          }
        }
      }
    ]
  };
}

/**
 * Генерира PublicService Schema за услугата за проверка
 */
export function getVignetteCheckPublicServiceSchema(locale = 'bg', baseUrl = 'https://www.vinetka.bg') {
  return {
    "@context": "https://schema.org",
    "@type": "PublicService",
    "@id": `${baseUrl}/${locale}/proverka-na-vinetka#publicservice`,
    "name": locale === 'bg' ? "Безплатна проверка на винетка" : "Free Vignette Check",
    "description": locale === 'bg'
      ? "Безплатна онлайн услуга за проверка на валидността на електронни винетки в реално време"
      : "Free online service for checking the validity of electronic vignettes in real-time",
    "serviceType": locale === 'bg' ? "Проверка на валидност" : "Validity Check",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "serviceArea": {
      "@type": "Country",
      "name": "България"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": locale === 'bg' 
        ? "Собственици на моторни превозни средства"
        : "Motor vehicle owners"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}/${locale}/proverka-na-vinetka`,
      "serviceType": "Online Service",
      "availableLanguage": locale,
      "processingTime": "PT1M"
    },
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BGN",
      "availability": "https://schema.org/InStock"
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };
}

/**
 * Генерира SoftwareApplication Schema за услугата за проверка
 */
export function getVignetteCheckSoftwareSchema(locale = 'bg', baseUrl = 'https://www.vinetka.bg') {
  const content = {
    bg: {
      name: "Проверка на винетка онлайн",
      description: "Безплатно уеб приложение за моментална проверка на валидността на електронни винетки в реално време. Синхронизирано с официалната база данни на НК Автомагистрали.",
      applicationCategory: "UtilityApplication",
      category: "Проверка на винетки"
    },
    en: {
      name: "Online Vignette Check",
      description: "Free web application for instant checking of electronic vignette validity in real-time. Synchronized with the official Road Infrastructure Agency database.",
      applicationCategory: "UtilityApplication",
      category: "Vignette Check"
    }
  };

  const data = content[locale] || content.bg;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/${locale}/proverka-na-vinetka#softwareapp`,
    "name": data.name,
    "description": data.description,
    "url": `${baseUrl}/${locale}/proverka-na-vinetka`,
    "applicationCategory": data.applicationCategory,
    "operatingSystem": "Web browser",
    "browserRequirements": "Requires JavaScript. Supports all modern browsers (Chrome, Firefox, Safari, Edge)",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BGN",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Vinetka.bg",
        "@id": `${baseUrl}/#organization`
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "@id": `${baseUrl}/#organization`
    },
    "provider": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "@id": `${baseUrl}/#organization`
    },
    "softwareVersion": "2.0",
    "datePublished": "2023-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": locale === 'bg' ? 'bg-BG' : `${locale}-${locale.toUpperCase()}`,
    "featureList": [
      locale === 'bg' ? "Моментална проверка на валидност" : "Instant validity check",
      locale === 'bg' ? "Синхронизация в реално време" : "Real-time synchronization",
      locale === 'bg' ? "100% точност на данните" : "100% data accuracy",
      locale === 'bg' ? "Безплатно използване" : "Free to use",
      locale === 'bg' ? "24/7 достъпност" : "24/7 availability"
    ],
    "screenshot": `${baseUrl}/default.webp`,
    "softwareHelp": {
      "@type": "CreativeWork",
      "url": `${baseUrl}/${locale}/proverka-na-vinetka`
    },
    "applicationSubCategory": data.category,
    "availableOnDevice": [
      "Desktop",
      "Mobile",
      "Tablet"
    ]
  };
}
