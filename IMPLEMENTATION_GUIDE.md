# 🚀 РЪКОВОДСТВО ЗА ИМПЛЕМЕНТАЦИЯ НА МИКРОДАННИ

## 📁 Структура на файловете

Създадох следните файлове със схеми:

```
lib/schemas/
├── productSchemas.js          # Product Schema за всички винетки
├── howToSchema.js             # HowTo Schema за инструкции
├── blogSchemas.js             # BlogPosting Schema за блог статии
├── reviewSchema.js            # Review Schema за отзиви
├── governmentServiceSchema.js # GovernmentService Schema
└── vehicleSchema.js           # Vehicle Category Schema
```

---

## 🎯 ПРИОРИТЕТИ ЗА ИМПЛЕМЕНТАЦИЯ

### 🔴 ВИСОКИ (Направете ВЕДНАГА)

#### 1. Product Schema за ВСИЧКИ типове винетки

**Файлове за редактиране:**
- `app/[locale]/tseni/sedmichna/page.js`
- `app/[locale]/tseni/mesechna/page.js`
- `app/[locale]/tseni/trimesechna/page.js`
- `app/[locale]/tseni/uikend/page.js`

**Как да имплементирате:**

```javascript
// app/[locale]/tseni/sedmichna/page.js
import Script from "next/script";
import { getVignetteProductSchema } from "@/lib/schemas/productSchemas";

export default async function SedmichnaVignette({ params }) {
  const { locale } = await params;
  
  // Генерирайте схемата
  const productSchema = getVignetteProductSchema('weekly', locale);
  
  return (
    <>
      {/* Добавете схемата */}
      <Script
        id="weekly-vignette-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      
      {/* Вашето съществуващо съдържание */}
      {/* ... */}
    </>
  );
}
```

**Направете същото за:**
- Седмична: `getVignetteProductSchema('weekly', locale)`
- Месечна: `getVignetteProductSchema('monthly', locale)`
- Тримесечна: `getVignetteProductSchema('quarterly', locale)`
- Уикенд: `getVignetteProductSchema('weekend', locale)`

---

#### 2. ItemList Schema за страницата с цени

**Файл за редактиране:** `app/[locale]/tseni/page.js`

```javascript
import Script from "next/script";
import { getVignettePriceListSchema } from "@/lib/schemas/productSchemas";

export default async function tseni({ params }) {
  const { locale } = await params;
  
  // Генерирайте ItemList схемата
  const priceListSchema = getVignettePriceListSchema(locale);
  
  return (
    <>
      <Script
        id="pricing-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(priceListSchema),
        }}
      />
      
      {/* Съществуващата схема */}
      <Script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Вашето съдържание */}
      {/* ... */}
    </>
  );
}
```

---

#### 3. BlogPosting Schema за всички статии

**Файл за редактиране:** `app/[locale]/blog/[slug]/page.js`

```javascript
import Script from "next/script";
import { getBlogPostingSchema } from "@/lib/schemas/blogSchemas";

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);
  
  // Генерирайте схемата
  const blogPostSchema = getBlogPostingSchema(post[0], locale);
  
  return (
    <>
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema),
        }}
      />
      
      {/* Вашето съдържание */}
      {/* ... */}
    </>
  );
}
```

**За блог листинга:** `app/[locale]/blog/page.js`

```javascript
import { getBlogListingSchema, getBlogSchema } from "@/lib/schemas/blogSchemas";

export default async function Blog({ searchParams, params }) {
  const { locale } = await params;
  const page = (await searchParams).page;
  const currentPage = parseInt(page) || 1;
  
  const posts = await fetchPosts(); // Вашият fetch
  const totalPages = 10; // Вашият total pages
  
  const blogSchema = getBlogSchema(locale);
  const listingSchema = getBlogListingSchema(posts, currentPage, totalPages, locale);
  
  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      
      <Script
        id="blog-listing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingSchema),
        }}
      />
      
      {/* Вашето съдържание */}
      {/* ... */}
    </>
  );
}
```

---

### 🟡 СРЕДНИ (Направете в рамките на 1-2 седмици)

#### 4. HowTo Schema за процеса на покупка

**Вариант 1: На главната страница**

Създайте нова секция на главната страница с "Как да купите винетка":

```javascript
// app/[locale]/page.js
import { getHowToBuyVignetteSchema } from "@/lib/schemas/howToSchema";

export default async function Home({ params }) {
  const { locale } = await params;
  const howToSchema = getHowToBuyVignetteSchema(locale);
  
  return (
    <>
      <Script
        id="how-to-buy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      
      {/* Добавете визуална секция със стъпките */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            Как да закупя винетка?
          </h2>
          
          <div className="space-y-8">
            {/* Стъпка 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Изберете тип винетка</h3>
                <p className="mt-2 text-gray-600">
                  Изберете желания тип винетка според нуждите си...
                </p>
              </div>
            </div>
            
            {/* Стъпка 2-5... */}
          </div>
        </div>
      </section>
      
      {/* Останалото съдържание */}
      {/* ... */}
    </>
  );
}
```

**Вариант 2: Отделна страница "Как да купя"**

Създайте `app/[locale]/kak-da-kupya/page.js`:

```javascript
import { getHowToBuyVignetteSchema } from "@/lib/schemas/howToSchema";

export default async function HowToBuyPage({ params }) {
  const { locale } = await params;
  const schema = getHowToBuyVignetteSchema(locale);
  
  return (
    <>
      <Script
        id="how-to-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      
      {/* Пълно ръководство */}
    </>
  );
}
```

#### 5. HowTo Schema за проверка на винетка

**Файл за редактиране:** `app/[locale]/proverka-na-vinetka/page.js`

```javascript
import { getHowToCheckVignetteSchema } from "@/lib/schemas/howToSchema";

export default async function VignetteCheckPage({ params }) {
  const { locale } = await params;
  
  // Добавете HowTo схемата
  const howToCheckSchema = getHowToCheckVignetteSchema(locale);
  
  return (
    <>
      {/* Съществуващите схеми */}
      <Script
        id="vignette-check-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      
      {/* НОВА: HowTo схема */}
      <Script
        id="how-to-check-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToCheckSchema),
        }}
      />
      
      {/* Съдържание */}
      {/* ... */}
    </>
  );
}
```

---

#### 6. Government Service Schema

**Файл за редактиране:** `app/layout.js` (глобално)

```javascript
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body>
        {children}
        
        {/* Съществуващите схеми */}
        <Script id="structured-data-organization" {...} />
        <Script id="structured-data-website" {...} />
        <Script id="structured-data-localbusiness" {...} />
        
        {/* НОВА: Government Service схема */}
        <Script
          id="structured-data-government-service"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentService",
              "name": "Информация за електронни винетки в България",
              "description": "Информационна услуга за проверка и закупуване на електронни винетки в България",
              "provider": {
                "@type": "Organization",
                "@id": "https://vinetka.bg/#organization"
              },
              "areaServed": {
                "@type": "Country",
                "name": "България"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
```

**ИЛИ използвайте helper функцията:**

```javascript
import { getGovernmentServiceSchema } from "@/lib/schemas/governmentServiceSchema";

const govServiceSchema = getGovernmentServiceSchema('bg');
```

---

#### 7. Vehicle Category Schema

**Вариант 1: На страницата с цени**

```javascript
// app/[locale]/tseni/page.js
import { getVehicleCategorySchema } from "@/lib/schemas/vehicleSchema";

export default async function tseni({ params }) {
  const { locale } = await params;
  const vehicleSchema = getVehicleCategorySchema(locale);
  
  return (
    <>
      <Script
        id="vehicle-category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(vehicleSchema),
        }}
      />
      
      {/* Добавете секция с категории превозни средства */}
      <section className="bg-gray-50 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Категории превозни средства
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Категория 1 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              Категория 1 - Мотоциклети
            </h3>
            <p className="text-gray-600 mb-4">
              Двуколесни и триколесни моторни превозни средства
            </p>
            <p className="text-purple-600 font-bold">
              Годишна винетка: 44,00 лв.
            </p>
          </div>
          
          {/* Категория 2 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              Категория 2 - Леки автомобили
            </h3>
            <p className="text-gray-600 mb-4">
              Автомобили до 3.5 тона
            </p>
            <p className="text-purple-600 font-bold">
              Годишна винетка: 97,00 лв.
            </p>
          </div>
          
          {/* Останалите категории */}
        </div>
      </section>
      
      {/* Останалото съдържание */}
    </>
  );
}
```

**Вариант 2: Отделна страница**

Създайте `app/[locale]/kategorii-prevozni-sredstva/page.js`

---

### 🟢 НИСКИ (Nice to have - бъдещи подобрения)

#### 8. Review Schema (след имплементация на система за отзиви)

**ВАЖНО: Използвайте само РЕАЛНИ отзиви!**

```javascript
// Първо създайте система за събиране на отзиви
// След това ги добавете към Product схемите

import { getReviewSchema, calculateAggregateRating } from "@/lib/schemas/reviewSchema";

// В product page:
export default async function ProductPage() {
  // Вземете реалните отзиви от БД
  const reviews = await getReviewsFromDatabase(productId);
  
  // Калкулирайте агрегираните рейтинги
  const aggregateRating = calculateAggregateRating(reviews);
  
  // Генерирайте схемите
  const reviewSchemas = reviews.map(review => 
    getReviewSchema(review, productId)
  );
  
  return (
    <>
      {reviewSchemas.map((schema, index) => (
        <Script
          key={`review-${index}`}
          id={`review-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      
      {/* Визуално показване на отзивите */}
      <section className="reviews">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="rating">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p>{review.body}</p>
            <p className="author">{review.authorName}</p>
          </div>
        ))}
      </section>
    </>
  );
}
```

**Стъпки за създаване на система за отзиви:**

1. **Създайте таблица в БД:**
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  author_name VARCHAR(100),
  author_email VARCHAR(100),
  review_body TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'pending'
);
```

2. **Създайте форма за отзиви**
3. **Имплементирайте модерация**
4. **Показвайте одобрените отзиви**
5. **Добавете схемите**

---

## 📊 ВАЛИДАЦИЯ И ТЕСТВАНЕ

### 1. Google Rich Results Test

След всяка имплементация:

1. Отидете на: https://search.google.com/test/rich-results
2. Въведете URL на страницата
3. Проверете за грешки
4. Поправете евентуални проблеми

### 2. Schema.org Validator

1. Отидете на: https://validator.schema.org/
2. Копирайте JSON-LD кода
3. Paste и валидирайте
4. Проверете за предупреждения

### 3. Google Search Console

1. Влезте в Search Console
2. Отидете на "Enhancements" → "Structured Data"
3. Мониторирайте за грешки
4. Проверете Rich Results

---

## 🎨 ВИЗУАЛНИ КОМПОНЕНТИ

### Компонент за стъпки (HowTo)

```javascript
// components/HowToSteps.js
export default function HowToSteps({ steps }) {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg">
              {index + 1}
            </div>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {step.name}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {step.text}
            </p>
            {step.tip && (
              <div className="mt-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                <p className="text-sm text-purple-900">
                  💡 <strong>Съвет:</strong> {step.tip}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Компонент за отзиви (Reviews)

```javascript
// components/ReviewCard.js
export default function ReviewCard({ review }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < review.rating ? '' : 'opacity-30'}>
              ★
            </span>
          ))}
        </div>
        <span className="ml-2 text-gray-600 text-sm">
          {review.rating}/5
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">
        {review.body}
      </p>
      
      <div className="flex items-center text-sm text-gray-500">
        <span className="font-medium">{review.authorName}</span>
        <span className="mx-2">•</span>
        <span>{new Date(review.date).toLocaleDateString('bg-BG')}</span>
        {review.verified && (
          <>
            <span className="mx-2">•</span>
            <span className="text-green-600 flex items-center">
              ✓ Потвърдена покупка
            </span>
          </>
        )}
      </div>
    </div>
  );
}
```

---

## 🔄 АВТОМАТИЗАЦИЯ

### Автоматично генериране на схеми при deploy

```javascript
// scripts/generate-schemas.js
import fs from 'fs';
import { getVignetteProductSchema } from './lib/schemas/productSchemas.js';

const vignetteTypes = ['weekend', 'weekly', 'monthly', 'quarterly', 'annual'];
const locales = ['bg', 'en'];

vignetteTypes.forEach(type => {
  locales.forEach(locale => {
    const schema = getVignetteProductSchema(type, locale);
    const filename = `public/schemas/${type}-${locale}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(schema, null, 2));
    console.log(`Generated: ${filename}`);
  });
});
```

Добавете в `package.json`:

```json
{
  "scripts": {
    "generate-schemas": "node scripts/generate-schemas.js",
    "prebuild": "npm run generate-schemas"
  }
}
```

---

## 📝 CHECKLIST

Използвайте този checklist за проследяване на прогреса:

### Високи приоритети
- [ ] Product Schema за седмична винетка
- [ ] Product Schema за месечна винетка
- [ ] Product Schema за тримесечна винетка
- [ ] Product Schema за уикенд винетка
- [ ] ItemList Schema за страницата с цени
- [ ] BlogPosting Schema за всички блог статии
- [ ] Blog Schema за blog index

### Средни приоритети
- [ ] HowTo Schema за процеса на покупка
- [ ] HowTo Schema за проверка на винетка
- [ ] Government Service Schema
- [ ] Vehicle Category Schema
- [ ] Подобрени Offer schemas

### Ниски приоритети
- [ ] Система за събиране на отзиви
- [ ] Review Schema (само с реални отзиви!)
- [ ] Video Object Schema (ако имате видеа)
- [ ] Event Schema
- [ ] Learning Resource Schema

### Валидация
- [ ] Google Rich Results Test за всички страници
- [ ] Schema.org Validator
- [ ] Google Search Console monitoring
- [ ] Lighthouse audit

---

## 💡 СЪВЕТИ ЗА УСПЕХ

1. **Започнете с Product schemas** - Те имат най-голямо влияние върху SEO
2. **Валидирайте веднага след имплементация** - Не чакайте до края
3. **Използвайте реални данни** - Никога не измисляйте отзиви или статистики
4. **Мониторирайте Search Console** - Проверявайте за грешки редовно
5. **Актуализирайте редовно** - Цените, наличността, отзивите
6. **Тествайте на различни страници** - Не забравяйте подстраниците
7. **Документирайте промените** - За бъдеща референция

---

## 🆘 ЧЕСТО СРЕЩАНИ ПРОБЛЕМИ

### Проблем 1: Schema не се показва в Rich Results
**Решение:**
- Проверете за JavaScript грешки
- Уверете се, че JSON е валиден
- Изчакайте 1-2 седмици за индексиране

### Проблем 2: Дублиращи се схеми
**Решение:**
- Използвайте уникални ID-та
- Проверете за конфликти в layout и page файловете

### Проблем 3: Невалидни данни
**Решение:**
- Използвайте Schema.org validator
- Проверете типовете данни (string vs number)
- Уверете се, че датите са в ISO формат

---

## 📞 СЛЕДВАЩИ СТЪПКИ

1. ✅ Започнете с Product schemas за всички винетки
2. ✅ Добавете ItemList за страницата с цени
3. ✅ Имплементирайте BlogPosting схеми
4. ✅ Добавете HowTo схеми
5. ✅ Валидирайте всички схеми
6. ✅ Мониторирайте резултатите в Search Console
7. ✅ Оптимизирайте на базата на данните

---

**Успех с имплементацията! 🚀**
