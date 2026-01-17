/**
 * Vehicle Schemas
 * 
 * Използва се за описание на типовете превозни средства
 * 
 * Използване:
 * import { getVehicleCategorySchema } from '@/lib/schemas/vehicleSchema';
 */

/**
 * Категории превозни средства според българското законодателство
 */
export const vehicleCategories = {
  bg: {
    category1: {
      name: "Категория 1 - Мотоциклети",
      description: "Двуколесни и триколесни моторни превозни средства",
      maxWeight: null,
      examples: ["Мотоциклет", "Скутер", "Триколка"],
      vignettePrice: {
        weekend: "5.00",
        weekly: "7.00",
        monthly: "13.00",
        quarterly: "25.00",
        annual: "44.00"
      }
    },
    category2: {
      name: "Категория 2 - Леки автомобили",
      description: "Автомобили до 3.5 тона",
      maxWeight: 3.5,
      examples: ["Лек автомобил", "Джип", "Бус до 3.5т", "Пикап"],
      vignettePrice: {
        weekend: "10.00",
        weekly: "15.00",
        monthly: "30.00",
        quarterly: "54.00",
        annual: "97.00"
      }
    },
    category3: {
      name: "Категория 3 - Товарни автомобили",
      description: "Автомобили над 3.5 тона до 12 тона",
      maxWeight: 12,
      minWeight: 3.5,
      examples: ["Камион до 12т", "Автобус"],
      hasDifferentPricing: true,
      pricingNote: "Цените зависят от броя оси и екологичната категория"
    },
    category4: {
      name: "Категория 4 - Тежки товарни автомобили",
      description: "Автомобили над 12 тона",
      minWeight: 12,
      examples: ["Камион над 12т", "ТИР"],
      hasDifferentPricing: true,
      pricingNote: "Цените зависят от броя оси и екологичната категория"
    }
  },
  en: {
    category1: {
      name: "Category 1 - Motorcycles",
      description: "Two-wheeled and three-wheeled motor vehicles",
      maxWeight: null,
      examples: ["Motorcycle", "Scooter", "Trike"],
      vignettePrice: {
        weekend: "5.00",
        weekly: "7.00",
        monthly: "13.00",
        quarterly: "25.00",
        annual: "44.00"
      }
    },
    category2: {
      name: "Category 2 - Light Vehicles",
      description: "Vehicles up to 3.5 tons",
      maxWeight: 3.5,
      examples: ["Car", "SUV", "Van up to 3.5t", "Pickup"],
      vignettePrice: {
        weekend: "10.00",
        weekly: "15.00",
        monthly: "30.00",
        quarterly: "54.00",
        annual: "97.00"
      }
    },
    category3: {
      name: "Category 3 - Medium Trucks",
      description: "Vehicles over 3.5 tons up to 12 tons",
      maxWeight: 12,
      minWeight: 3.5,
      examples: ["Truck up to 12t", "Bus"],
      hasDifferentPricing: true,
      pricingNote: "Prices depend on the number of axles and environmental category"
    },
    category4: {
      name: "Category 4 - Heavy Trucks",
      description: "Vehicles over 12 tons",
      minWeight: 12,
      examples: ["Truck over 12t", "Semi-trailer"],
      hasDifferentPricing: true,
      pricingNote: "Prices depend on the number of axles and environmental category"
    }
  }
};

/**
 * Генерира Vehicle Category Schema
 */
export function getVehicleCategorySchema(locale = 'bg', baseUrl = 'https://vinetka.bg') {
  const categories = vehicleCategories[locale] || vehicleCategories.bg;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === 'bg' 
      ? "Категории превозни средства за винетки"
      : "Vehicle Categories for Vignettes",
    "description": locale === 'bg'
      ? "Пълен списък с категории превозни средства и приложими цени за електронни винетки"
      : "Complete list of vehicle categories and applicable electronic vignette prices",
    "url": `${baseUrl}/${locale}/tseni`,
    "numberOfItems": Object.keys(categories).length,
    "itemListElement": Object.entries(categories).map(([key, category], index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "VehicleCategory",
        "name": category.name,
        "description": category.description,
        "vehicleType": category.examples,
        "additionalProperty": [
          category.maxWeight ? {
            "@type": "PropertyValue",
            "name": locale === 'bg' ? "Максимално тегло" : "Maximum weight",
            "value": category.maxWeight,
            "unitCode": "TNE",
            "unitText": locale === 'bg' ? "тона" : "tons"
          } : null,
          category.minWeight ? {
            "@type": "PropertyValue",
            "name": locale === 'bg' ? "Минимално тегло" : "Minimum weight",
            "value": category.minWeight,
            "unitCode": "TNE",
            "unitText": locale === 'bg' ? "тона" : "tons"
          } : null,
          category.vignettePrice ? {
            "@type": "PropertyValue",
            "name": locale === 'bg' ? "Годишна винетка" : "Annual vignette",
            "value": category.vignettePrice.annual,
            "unitText": "BGN"
          } : null
        ].filter(Boolean)
      }
    }))
  };
}

/**
 * Генерира Vehicle Schema за конкретен тип превозно средство
 */
export function getVehicleSchema(vehicleType, locale = 'bg') {
  const vehicleData = {
    car: {
      bg: {
        name: "Лек автомобил",
        category: "Category 2",
        description: "Лек автомобил до 3.5 тона за лично ползване",
        fuelType: ["Petrol", "Diesel", "Electric", "Hybrid"],
        applicableVignette: "Категория 2 - Леки автомобили"
      },
      en: {
        name: "Passenger Car",
        category: "Category 2",
        description: "Light vehicle up to 3.5 tons for personal use",
        fuelType: ["Petrol", "Diesel", "Electric", "Hybrid"],
        applicableVignette: "Category 2 - Light Vehicles"
      }
    },
    motorcycle: {
      bg: {
        name: "Мотоциклет",
        category: "Category 1",
        description: "Двуколесно моторно превозно средство",
        fuelType: ["Petrol", "Electric"],
        applicableVignette: "Категория 1 - Мотоциклети"
      },
      en: {
        name: "Motorcycle",
        category: "Category 1",
        description: "Two-wheeled motor vehicle",
        fuelType: ["Petrol", "Electric"],
        applicableVignette: "Category 1 - Motorcycles"
      }
    },
    truck: {
      bg: {
        name: "Камион",
        category: "Category 3/4",
        description: "Товарен автомобил за комерсиална употреба",
        fuelType: ["Diesel"],
        applicableVignette: "Категория 3 или 4 - В зависимост от теглото"
      },
      en: {
        name: "Truck",
        category: "Category 3/4",
        description: "Commercial freight vehicle",
        fuelType: ["Diesel"],
        applicableVignette: "Category 3 or 4 - Depending on weight"
      }
    }
  };

  const data = vehicleData[vehicleType]?.[locale] || vehicleData.car[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": data.name,
    "category": data.category,
    "description": data.description,
    "fuelType": data.fuelType,
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": locale === 'bg' ? "Приложима винетка" : "Applicable vignette",
      "value": data.applicableVignette
    }
  };
}

/**
 * Генерира OfferCatalog за различни категории превозни средства
 */
export function getVehicleOfferCatalogSchema(locale = 'bg', baseUrl = 'https://vinetka.bg') {
  const categories = vehicleCategories[locale] || vehicleCategories.bg;

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": locale === 'bg' 
      ? "Цени на винетки по категории превозни средства"
      : "Vignette Prices by Vehicle Category",
    "description": locale === 'bg'
      ? "Пълен каталог с цени на електронни винетки за различни категории превозни средства"
      : "Complete catalog of electronic vignette prices for different vehicle categories",
    "url": `${baseUrl}/${locale}/tseni`,
    "itemListElement": Object.entries(categories)
      .filter(([, category]) => category.vignettePrice)
      .map(([key, category], index) => ({
        "@type": "Offer",
        "name": category.name,
        "description": category.description,
        "category": "Електронна винетка",
        "itemOffered": {
          "@type": "Product",
          "name": `${category.name} - ${locale === 'bg' ? 'Годишна винетка' : 'Annual vignette'}`,
          "category": category.name
        },
        "price": category.vignettePrice.annual,
        "priceCurrency": "BGN",
        "availability": "https://schema.org/InStock",
        "url": `${baseUrl}/${locale}/tseni`
      }))
  };
}
