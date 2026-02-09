/**
 * HowTo Schema за процеса на закупуване на винетка
 * 
 * Използване:
 * import { getHowToBuyVignetteSchema } from '@/lib/schemas/howToSchema';
 * const schema = getHowToBuyVignetteSchema(locale);
 */

export function getHowToBuyVignetteSchema(locale = 'bg', baseUrl = 'https://www.vinetka.bg') {
  const content = {
    bg: {
      name: "Как да закупя електронна винетка онлайн",
      description: "Пълно ръководство за закупуване на електронна винетка за България в 5 лесни стъпки",
      estimatedTime: "PT5M",
      totalTimeText: "5 минути",
      supply: [
        "Регистрационен номер на автомобила",
        "Банкова карта за плащане (Visa, Mastercard)",
        "Имейл адрес за потвърждение"
      ],
      tool: [
        "Компютър, таблет или смартфон с интернет връзка",
        "Актуален браузър (Chrome, Firefox, Safari, Edge)"
      ],
      steps: [
        {
          name: "Изберете тип винетка",
          text: "Изберете желания тип винетка според нуждите си - уикенд (2 дни), седмична (7 дни), месечна (30 дни), тримесечна (90 дни) или годишна (365 дни). Всеки тип винетка покрива различен период и има различна цена.",
          url: `${baseUrl}/bg/tseni`,
          tip: "Годишната винетка е най-изгодна - спестявате до 40% спрямо закупуване на месечни винетки."
        },
        {
          name: "Въведете данни за автомобила",
          text: "Въведете регистрационния номер на вашия автомобил точно както е изписан на регистрационния документ. Изберете държава на регистрация от падащото меню. Уверете се, че данните са правилни - винетката се свързва директно с регистрационния номер.",
          tip: "Проверете внимателно регистрационния номер преди да продължите - грешки могат да доведат до невалидна винетка."
        },
        {
          name: "Изберете период на валидност",
          text: "За уикенд и седмични винетки активацията е моментална от момента на плащането. За месечни, тримесечни и годишни винетки можете да изберете начална дата на валидност в рамките на 30 дни напред. Това ви позволява да закупите винетка предварително.",
          tip: "Ако планирате пътуване в бъдеще, изберете началната дата на валидност съответно."
        },
        {
          name: "Извършете сигурно плащане",
          text: "Платете с банкова карта (Visa или Mastercard) чрез нашата защитена платежна система. Всички данни се обработват по стандарта PCI DSS Level 1, което гарантира максимална сигурност на вашата информация. Плащането се обработва моментално.",
          tip: "Уверете се, че имате достатъчно средства по картата преди да започнете процеса."
        },
        {
          name: "Получете потвърждение и винетка",
          text: "Веднага след успешно плащане ще получите потвърждение на предоставения имейл адрес. Винетката се активира автоматично в системата на АПИ. Не е необходимо да поставяте нищо на стъклото на автомобила - системата разпознава винетката автоматично чрез камери.",
          tip: "Запазете имейла с потвърждението за ваша справка. Можете винаги да проверите валидността на винетката чрез нашата безплатна услуга за проверка."
        }
      ]
    },
    en: {
      name: "How to Buy an Electronic Vignette Online",
      description: "Complete guide to purchasing an electronic vignette for Bulgaria in 5 easy steps",
      estimatedTime: "PT5M",
      totalTimeText: "5 minutes",
      supply: [
        "Vehicle registration number",
        "Credit/debit card for payment (Visa, Mastercard)",
        "Email address for confirmation"
      ],
      tool: [
        "Computer, tablet, or smartphone with internet connection",
        "Modern web browser (Chrome, Firefox, Safari, Edge)"
      ],
      steps: [
        {
          name: "Choose Vignette Type",
          text: "Select the desired vignette type according to your needs - weekend (2 days), weekly (7 days), monthly (30 days), quarterly (90 days), or annual (365 days). Each type covers a different period and has a different price.",
          url: `${baseUrl}/en/tseni`,
          tip: "The annual vignette is the most cost-effective - save up to 40% compared to buying monthly vignettes."
        },
        {
          name: "Enter Vehicle Details",
          text: "Enter your vehicle's registration number exactly as it appears on the registration document. Select the country of registration from the dropdown menu. Make sure the data is correct - the vignette is linked directly to the registration number.",
          tip: "Double-check the registration number before proceeding - errors can result in an invalid vignette."
        },
        {
          name: "Choose Validity Period",
          text: "For weekend and weekly vignettes, activation is instant from the moment of payment. For monthly, quarterly, and annual vignettes, you can choose a start date of validity within 30 days in advance. This allows you to purchase a vignette in advance.",
          tip: "If you're planning a trip in the future, select the start date of validity accordingly."
        },
        {
          name: "Make Secure Payment",
          text: "Pay with a credit or debit card (Visa or Mastercard) through our secure payment system. All data is processed according to PCI DSS Level 1 standard, ensuring maximum security of your information. Payment is processed instantly.",
          tip: "Make sure you have sufficient funds on your card before starting the process."
        },
        {
          name: "Receive Confirmation and Vignette",
          text: "Immediately after successful payment, you will receive confirmation at the provided email address. The vignette is automatically activated in the Road Infrastructure Agency system. There's no need to place anything on your vehicle's windshield - the system recognizes the vignette automatically through cameras.",
          tip: "Save the confirmation email for your records. You can always check the validity of the vignette through our free checking service."
        }
      ]
    }
  };

  const data = content[locale] || content.bg;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.name,
    "description": data.description,
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/купи-винетка.jpg`,
      "width": 1200,
      "height": 800
    },
    "totalTime": data.estimatedTime,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "BGN",
      "value": "10-97",
      "minValue": "10",
      "maxValue": "97"
    },
    "supply": data.supply.map(item => ({
      "@type": "HowToSupply",
      "name": item
    })),
    "tool": data.tool.map(item => ({
      "@type": "HowToTool",
      "name": item
    })),
    "step": data.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url || `${baseUrl}/${locale}`,
      "itemListElement": step.tip ? [{
        "@type": "HowToTip",
        "text": step.tip
      }] : undefined
    }))
  };
}

/**
 * HowTo Schema за проверка на винетка
 */
export function getHowToCheckVignetteSchema(locale = 'bg', baseUrl = 'https://www.vinetka.bg') {
  const content = {
    bg: {
      name: "Как да проверя валидността на моята винетка",
      description: "Безплатна проверка на електронна винетка в 3 лесни стъпки",
      estimatedTime: "PT2M",
      steps: [
        {
          name: "Отворете инструмента за проверка",
          text: "Посетете страницата за проверка на винетка на Vinetka.bg. Услугата е напълно безплатна и работи 24/7.",
          url: `${baseUrl}/${locale}/proverka-na-vinetka`
        },
        {
          name: "Въведете регистрационен номер",
          text: "Въведете регистрационния номер на автомобила в полето за търсене. Изберете държава на регистрация от падащото меню.",
          tip: "Уверете се, че въвеждате номера точно както е изписан на регистрационния документ."
        },
        {
          name: "Вижте резултата",
          text: "Системата ще покаже моментално дали имате валидна винетка, типа ѝ и периода на валидност. Информацията е синхронизирана в реално време с базата данни на АПИ.",
          tip: "Препоръчваме да проверявате валидността на винетката преди всяко пътуване."
        }
      ]
    },
    en: {
      name: "How to Check My Vignette Validity",
      description: "Free electronic vignette check in 3 easy steps",
      estimatedTime: "PT2M",
      steps: [
        {
          name: "Open the Checking Tool",
          text: "Visit the vignette check page on Vinetka.bg. The service is completely free and works 24/7.",
          url: `${baseUrl}/${locale}/proverka-na-vinetka`
        },
        {
          name: "Enter Registration Number",
          text: "Enter the vehicle's registration number in the search field. Select the country of registration from the dropdown menu.",
          tip: "Make sure you enter the number exactly as it appears on the registration document."
        },
        {
          name: "View the Result",
          text: "The system will instantly show whether you have a valid vignette, its type, and validity period. The information is synchronized in real-time with the Road Infrastructure Agency database.",
          tip: "We recommend checking the vignette validity before every trip."
        }
      ]
    }
  };

  const data = content[locale] || content.bg;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.name,
    "description": data.description,
    "totalTime": data.estimatedTime,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "BGN",
      "value": "0"
    },
    "step": data.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url || `${baseUrl}/${locale}/proverka-na-vinetka`,
      "itemListElement": step.tip ? [{
        "@type": "HowToTip",
        "text": step.tip
      }] : undefined
    }))
  };
}
