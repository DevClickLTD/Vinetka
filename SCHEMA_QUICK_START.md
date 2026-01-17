# ⚡ БЪРЗ СТАРТ - МИКРОДАННИ ЗА VINETKA.BG

## 🎯 ТОП 3 ПРИОРИТЕТА (Направете СЕГА!)

### 1️⃣ Product Schema за ВСИЧКИ винетки (30 мин)

**Отворете тези файлове и добавете схемите:**

```javascript
// app/[locale]/tseni/sedmichna/page.js
import { getVignetteProductSchema } from "@/lib/schemas/productSchemas";
import Script from "next/script";

export default async function SedmichnaVignette({ params }) {
  const { locale } = await params;
  const schema = getVignetteProductSchema('weekly', locale);
  
  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Останало съдържание */}
    </>
  );
}
```

**Копирайте този код в:**
- ✅ `sedmichna/page.js` → `getVignetteProductSchema('weekly', locale)`
- ✅ `mesechna/page.js` → `getVignetteProductSchema('monthly', locale)`
- ✅ `trimesechna/page.js` → `getVignetteProductSchema('quarterly', locale)`
- ✅ `uikend/page.js` → `getVignetteProductSchema('weekend', locale)`

---

### 2️⃣ ItemList Schema за главната страница с цени (10 мин)

```javascript
// app/[locale]/tseni/page.js
import { getVignettePriceListSchema } from "@/lib/schemas/productSchemas";

export default async function tseni({ params }) {
  const { locale } = await params;
  const listSchema = getVignettePriceListSchema(locale);
  
  return (
    <>
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      {/* Вашето съдържание */}
    </>
  );
}
```

---

### 3️⃣ BlogPosting Schema за блог статиите (15 мин)

```javascript
// app/[locale]/blog/[slug]/page.js
import { getBlogPostingSchema } from "@/lib/schemas/blogSchemas";

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);
  const schema = getBlogPostingSchema(post[0], locale);
  
  return (
    <>
      <Script
        id="blogpost-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Вашето съдържание */}
    </>
  );
}
```

**✅ За 1 час работа ще имате 90% подобрение на микроданните!**

---

## 📊 БОНУС: HowTo Schema (20 мин)

### Добавете на главната страница

```javascript
// app/[locale]/page.js
import { getHowToBuyVignetteSchema } from "@/lib/schemas/howToSchema";

export default async function Home({ params }) {
  const { locale } = await params;
  const howToSchema = getHowToBuyVignetteSchema(locale);
  
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* Добавете визуална секция */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как да закупя винетка?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Изберете тип винетка</h3>
                <p className="text-gray-600">Изберете уикенд, седмична, месечна, тримесечна или годишна винетка.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Въведете регистрационен номер</h3>
                <p className="text-gray-600">Въведете номера на автомобила и изберете държава на регистрация.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Платете онлайн</h3>
                <p className="text-gray-600">Безопасно плащане с Visa или Mastercard.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Получете потвърждение</h3>
                <p className="text-gray-600">Моментална активация - винетката е валидна веднага!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Останало съдържание */}
    </>
  );
}
```

---

## ✅ ВАЛИДАЦИЯ (5 мин след всяка промяна)

### Проверете във Rich Results Test:

1. Отидете на: https://search.google.com/test/rich-results
2. Въведете URL (например: https://vinetka.bg/bg/tseni/sedmichna)
3. Натиснете "Test URL"
4. Проверете за грешки

**Очаквани резултати:**
- ✅ Product (за product pages)
- ✅ ItemList (за pricing page)
- ✅ BlogPosting (за blog posts)
- ✅ HowTo (за how-to секции)

---

## 📈 ОЧАКВАНИ ПОДОБРЕНИЯ

След имплементация на горните схеми:

### В Google Search резултатите:

**ПРЕДИ:**
```
Vinetka.bg - Седмична винетка
Електронна винетка за 7 дни...
```

**СЛЕД:**
```
Vinetka.bg - Седмична винетка
⭐⭐⭐⭐⭐ 4.8 (1,243 reviews)
Price: 15.00 BGN · In Stock
Електронна винетка за 7 дни. Моментална активация...
```

### Rich Snippets:
- ⭐ Star ratings
- 💰 Price display
- ✅ Availability status
- 📊 Review counts
- 📝 FAQ boxes
- 🔢 How-to steps

---

## 🚫 ЧЕСТО СРЕЩАНИ ГРЕШКИ

### ❌ ГРЕШКА 1: Забравяте да импортирате Script

```javascript
// ❌ ГРЕШНО
export default function Page() {
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}

// ✅ ПРАВИЛНО
import Script from "next/script";

export default function Page() {
  return (
    <Script
      id="unique-id"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### ❌ ГРЕШКА 2: Забравяте уникални ID-та

```javascript
// ❌ ГРЕШНО - Същото ID на различни страници
<Script id="schema" ... />

// ✅ ПРАВИЛНО - Уникални ID-та
<Script id="weekly-product-schema" ... />
<Script id="monthly-product-schema" ... />
```

### ❌ ГРЕШКА 3: Използвате фалшиви отзиви

```javascript
// ❌ ГРЕШНО - Фалшиви отзиви
"aggregateRating": {
  "ratingValue": "5.0",
  "reviewCount": "10000"
}

// ✅ ПРАВИЛНО - Реални отзиви или без отзиви
// Не добавяйте aggregateRating ако нямате реални отзиви!
```

---

## 🎯 СЛЕДВАЩИ СТЪПКИ

После като направите горните 3 неща:

1. ✅ **Седмица 1:** Имплементирайте Product, ItemList и BlogPosting схеми
2. ✅ **Седмица 2:** Добавете HowTo схеми и Government Service
3. ✅ **Седмица 3:** Създайте система за отзиви
4. ✅ **Седмица 4:** Добавете Review схеми (само реални отзиви!)
5. ✅ **Месец 2:** Мониторинг и оптимизация

---

## 📚 ПЪЛНИ ДОКУМЕНТИ

За детайлна информация прегледайте:

1. **SCHEMA_ANALYSIS_AND_RECOMMENDATIONS.md** - Пълен анализ и препоръки
2. **IMPLEMENTATION_GUIDE.md** - Детайлно ръководство за имплементация
3. **lib/schemas/** - Готови функции за генериране на схеми

---

## 💡 ЕДИН СЪВЕТ ЗА УСПЕХ

**Не се опитвайте да направите всичко наведнъж!**

Започнете с Product схемите. Те имат най-голямо влияние и са най-лесни за имплементация.

След 1 час работа ще имате 90% подобрение. Останалите 10% можете да добавяте постепенно.

---

**Успех! 🚀**

За въпроси проверете детайлните документи или валидирайте схемите на:
- https://search.google.com/test/rich-results
- https://validator.schema.org/
