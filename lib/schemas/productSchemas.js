/**
 * Product Schemas за всички типове винетки
 * 
 * Използване:
 * import { getVignetteProductSchema } from '@/lib/schemas/productSchemas';
 * const schema = getVignetteProductSchema('weekly', locale);
 */

export const vignetteTypes = {
  weekend: {
    bg: {
      name: 'Уикенд винетка',
      alternateName: ['2-дневна винетка', 'Weekend vignette', 'Винетка за уикенд'],
      description: 'Електронна винетка за леки автомобили до 3.5 тона, валидна 2 дни от момента на активиране. Идеална за кратки пътувания през уикенда. Покрива всички платени магистрали в България.',
      sku: 'VIG-WEEKEND-2D',
      price: '10.00',
      priceEur: '5.11',
      duration: '2 дни',
      url: '/bg/tseni/uikend',
      reviewCount: '456'
    },
    en: {
      name: 'Weekend Vignette',
      alternateName: ['2-day vignette', 'Weekend toll pass'],
      description: 'Electronic vignette for light vehicles up to 3.5 tons, valid for 2 days from activation. Perfect for short weekend trips. Covers all paid highways in Bulgaria.',
      sku: 'VIG-WEEKEND-2D',
      price: '10.00',
      priceEur: '5.11',
      duration: '2 days',
      url: '/en/tseni/uikend',
      reviewCount: '456'
    }
  },
  weekly: {
    bg: {
      name: 'Седмична винетка',
      alternateName: ['7-дневна винетка', 'Weekly vignette', 'Една седмица винетка'],
      description: 'Електронна винетка за леки автомобили до 3.5 тона, валидна 7 дни от момента на активиране. Подходяща за кратки визити и бизнес пътувания. Покрива всички платени магистрали в България.',
      sku: 'VIG-WEEK-7D',
      price: '15.00',
      priceEur: '7.67',
      duration: '7 дни',
      url: '/bg/tseni/sedmichna',
      reviewCount: '1243'
    },
    en: {
      name: 'Weekly Vignette',
      alternateName: ['7-day vignette', 'One week vignette'],
      description: 'Electronic vignette for light vehicles up to 3.5 tons, valid for 7 days from activation. Suitable for short visits and business trips. Covers all paid highways in Bulgaria.',
      sku: 'VIG-WEEK-7D',
      price: '15.00',
      priceEur: '7.67',
      duration: '7 days',
      url: '/en/tseni/sedmichna',
      reviewCount: '1243'
    }
  },
  monthly: {
    bg: {
      name: 'Месечна винетка',
      alternateName: ['30-дневна винетка', 'Monthly vignette', 'Един месец винетка'],
      description: 'Електронна винетка за леки автомобили до 3.5 тона, валидна 30 дни от момента на активиране. Оптимална за по-дълги визити и редовни пътувания. Покрива всички платени магистрали в България.',
      sku: 'VIG-MONTH-30D',
      price: '30.00',
      priceEur: '15.34',
      duration: '30 дни',
      url: '/bg/tseni/mesechna',
      reviewCount: '2156'
    },
    en: {
      name: 'Monthly Vignette',
      alternateName: ['30-day vignette', 'One month vignette'],
      description: 'Electronic vignette for light vehicles up to 3.5 tons, valid for 30 days from activation. Optimal for longer visits and regular trips. Covers all paid highways in Bulgaria.',
      sku: 'VIG-MONTH-30D',
      price: '30.00',
      priceEur: '15.34',
      duration: '30 days',
      url: '/en/tseni/mesechna',
      reviewCount: '2156'
    }
  },
  quarterly: {
    bg: {
      name: 'Тримесечна винетка',
      alternateName: ['90-дневна винетка', 'Quarterly vignette', 'Три месеца винетка'],
      description: 'Електронна винетка за леки автомобили до 3.5 тона, валидна 90 дни от момента на активиране. Икономично решение за сезонни пътувания. Покрива всички платени магистрали в България.',
      sku: 'VIG-QUARTER-90D',
      price: '54.00',
      priceEur: '27.61',
      duration: '90 дни',
      url: '/bg/tseni/trimesechna',
      reviewCount: '1876'
    },
    en: {
      name: 'Quarterly Vignette',
      alternateName: ['90-day vignette', 'Three months vignette'],
      description: 'Electronic vignette for light vehicles up to 3.5 tons, valid for 90 days from activation. Economical solution for seasonal travel. Covers all paid highways in Bulgaria.',
      sku: 'VIG-QUARTER-90D',
      price: '54.00',
      priceEur: '27.61',
      duration: '90 days',
      url: '/en/tseni/trimesechna',
      reviewCount: '1876'
    }
  },
  annual: {
    bg: {
      name: 'Годишна винетка',
      alternateName: ['365-дневна винетка', 'Annual vignette', 'Една година винетка'],
      description: 'Електронна винетка за леки автомобили до 3.5 тона, валидна 365 дни от момента на активиране. Най-изгодното решение - спестяване до 40% спрямо месечни винетки. Покрива всички платени магистрали в България.',
      sku: 'VIG-ANNUAL-365D',
      price: '97.00',
      priceEur: '49.60',
      duration: '365 дни',
      url: '/bg/tseni/godishna',
      reviewCount: '3247'
    },
    en: {
      name: 'Annual Vignette',
      alternateName: ['365-day vignette', 'One year vignette'],
      description: 'Electronic vignette for light vehicles up to 3.5 tons, valid for 365 days from activation. Most cost-effective solution - save up to 40% compared to monthly vignettes. Covers all paid highways in Bulgaria.',
      sku: 'VIG-ANNUAL-365D',
      price: '97.00',
      priceEur: '49.60',
      duration: '365 days',
      url: '/en/tseni/godishna',
      reviewCount: '3247'
    }
  }
};

/**
 * Генерира Product Schema за конкретен тип винетка
 * 
 * @param {string} type - Тип винетка: 'weekend', 'weekly', 'monthly', 'quarterly', 'annual'
 * @param {string} locale - Език: 'bg', 'en', etc.
 * @param {object} options - Допълнителни опции
 * @returns {object} Product Schema
 */
export function getVignetteProductSchema(type, locale = 'bg', options = {}) {
  const data = vignetteTypes[type]?.[locale] || vignetteTypes[type].bg;
  const baseUrl = options.baseUrl || 'https://www.vinetka.bg';
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}${data.url}#product`,
    "name": data.name,
    "alternateName": data.alternateName,
    "description": data.description,
    "category": "Електронна винетка",
    "sku": data.sku,
    "brand": {
      "@type": "Brand",
      "name": "Vinetka.bg"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Vinetka.bg",
      "@id": `${baseUrl}/#organization`
    },
    "image": [
      `${baseUrl}/default.webp`,
      `${baseUrl}/купи-винетка.jpg`
    ],
    "url": `${baseUrl}${data.url}`,
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}${data.url}`,
      "priceCurrency": "BGN",
      "price": data.price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "validFrom": "2024-01-01",
      "seller": {
        "@type": "Organization",
        "name": "Vinetka.bg",
        "@id": `${baseUrl}/#organization`
      },
      "areaServed": {
        "@type": "Country",
        "name": "България",
        "sameAs": "https://en.wikipedia.org/wiki/Bulgaria"
      },
      "eligibleRegion": {
        "@type": "Country",
        "name": "България"
      },
      "deliveryLeadTime": {
        "@type": "QuantitativeValue",
        "value": "0",
        "unitCode": "MIN",
        "name": locale === 'bg' ? "Моментална активация" : "Instant activation"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "BGN"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "BG"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "MIN"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "MIN"
          }
        }
      },
      "priceSpecification": [
        {
          "@type": "UnitPriceSpecification",
          "price": data.price,
          "priceCurrency": "BGN",
          "valueAddedTaxIncluded": false,
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "C62",
            "unitText": locale === 'bg' ? "Винетка" : "Vignette"
          }
        },
        {
          "@type": "UnitPriceSpecification",
          "price": data.priceEur,
          "priceCurrency": "EUR",
          "valueAddedTaxIncluded": false,
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "C62",
            "unitText": locale === 'bg' ? "Винетка" : "Vignette"
          }
        }
      ],
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "BG",
        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
        "merchantReturnDays": 0,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "acceptedPaymentMethod": [
        {
          "@type": "PaymentMethod",
          "@id": "https://schema.org/CreditCard"
        },
        {
          "@type": "PaymentMethod",
          "@id": "https://schema.org/DebitCard"
        }
      ]
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": locale === 'bg' ? "Валидност" : "Validity",
        "value": data.duration
      },
      {
        "@type": "PropertyValue",
        "name": locale === 'bg' ? "Категория превозно средство" : "Vehicle category",
        "value": locale === 'bg' ? "Леки автомобили до 3.5 тона" : "Light vehicles up to 3.5 tons"
      },
      {
        "@type": "PropertyValue",
        "name": locale === 'bg' ? "Покритие" : "Coverage",
        "value": locale === 'bg' ? "Всички платени магистрали в България" : "All paid highways in Bulgaria"
      },
      {
        "@type": "PropertyValue",
        "name": locale === 'bg' ? "Активация" : "Activation",
        "value": locale === 'bg' ? "Моментална (веднага след плащане)" : "Instant (immediately after payment)"
      },
      {
        "@type": "PropertyValue",
        "name": locale === 'bg' ? "Необходими документи" : "Required documents",
        "value": locale === 'bg' ? "Регистрационен номер на автомобила" : "Vehicle registration number"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": data.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "isRelatedTo": getRelatedProducts(type, locale, baseUrl),
    "potentialAction": {
      "@type": "BuyAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}${data.url}`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };
}

/**
 * Генерира списък със свързани продукти
 */
function getRelatedProducts(currentType, locale, baseUrl) {
  const types = Object.keys(vignetteTypes).filter(t => t !== currentType);
  
  return types.map(type => {
    const data = vignetteTypes[type][locale] || vignetteTypes[type].bg;
    return {
      "@type": "Product",
      "name": data.name,
      "url": `${baseUrl}${data.url}`
    };
  });
}

/**
 * Генерира ItemList Schema за страницата с всички цени
 */
export function getVignettePriceListSchema(locale = 'bg', baseUrl = 'https://www.vinetka.bg') {
  const types = ['weekend', 'weekly', 'monthly', 'quarterly', 'annual'];
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === 'bg' ? "Цени на винетки за България" : "Vignette Prices for Bulgaria",
    "description": locale === 'bg' 
      ? "Пълен списък с всички типове винетки и техните цени" 
      : "Complete list of all vignette types and their prices",
    "url": `${baseUrl}/${locale}/tseni`,
    "numberOfItems": types.length,
    "itemListElement": types.map((type, index) => {
      const data = vignetteTypes[type][locale] || vignetteTypes[type].bg;
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `${baseUrl}${data.url}#product`,
          "name": data.name,
          "url": `${baseUrl}${data.url}`,
          "image": `${baseUrl}/default.webp`,
          "description": data.description,
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "BGN",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-12-31",
            "url": `${baseUrl}${data.url}`
          }
        }
      };
    })
  };
}
