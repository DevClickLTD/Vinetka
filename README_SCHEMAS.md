# 📋 СХЕМИ ЗА МИКРОДАННИ - VINETKA.BG

## 📦 Какво съдържа този пакет?

Пълен набор от готови за използване Schema.org микроданни, оптимизирани специално за бизнес за продажба на винетки.

---

## 📁 Файлова структура

```
lib/schemas/
├── productSchemas.js          # Product & ItemList schemas за винетки
├── howToSchema.js             # HowTo schemas за инструкции
├── blogSchemas.js             # BlogPosting schemas за блог
├── reviewSchema.js            # Review schemas за отзиви
├── governmentServiceSchema.js # Government Service schemas
└── vehicleSchema.js           # Vehicle Category schemas

Документация:
├── SCHEMA_ANALYSIS_AND_RECOMMENDATIONS.md  # Пълен анализ
├── IMPLEMENTATION_GUIDE.md                 # Детайлно ръководство
├── SCHEMA_QUICK_START.md                   # Бърз старт гайд
└── README_SCHEMAS.md                       # Този файл
```

---

## 🚀 БЪРЗ СТАРТ (3 стъпки)

### Стъпка 1: Product Schemas (30 мин)

```javascript
import { getVignetteProductSchema } from "@/lib/schemas/productSchemas";
import Script from "next/script";

export default async function ProductPage({ params }) {
  const { locale } = await params;
  const schema = getVignetteProductSchema('weekly', locale);
  
  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Вашето съдържание */}
    </>
  );
}
```

**Приложете за:**
- `sedmichna/page.js` → type: `'weekly'`
- `mesechna/page.js` → type: `'monthly'`
- `trimesechna/page.js` → type: `'quarterly'`
- `uikend/page.js` → type: `'weekend'`

### Стъпка 2: ItemList Schema (10 мин)

```javascript
import { getVignettePriceListSchema } from "@/lib/schemas/productSchemas";

const schema = getVignettePriceListSchema(locale);
```

Приложете в: `app/[locale]/tseni/page.js`

### Стъпка 3: BlogPosting Schema (15 мин)

```javascript
import { getBlogPostingSchema } from "@/lib/schemas/blogSchemas";

const schema = getBlogPostingSchema(post[0], locale);
```

Приложете в: `app/[locale]/blog/[slug]/page.js`

---

## 📊 НАЛИЧНИ СХЕМИ

### 1. Product Schemas

**Файл:** `lib/schemas/productSchemas.js`

**Функции:**
- `getVignetteProductSchema(type, locale, options)`
- `getVignettePriceListSchema(locale, baseUrl)`

**Типове винетки:**
- `'weekend'` - Уикенд винетка
- `'weekly'` - Седмична винетка
- `'monthly'` - Месечна винетка
- `'quarterly'` - Тримесечна винетка
- `'annual'` - Годишна винетка

**Пример:**
```javascript
const weeklySchema = getVignetteProductSchema('weekly', 'bg');
const priceList = getVignettePriceListSchema('bg');
```

**Schema Types:**
- ✅ Product
- ✅ ItemList
- ✅ Offer
- ✅ Brand
- ✅ AggregateRating

---

### 2. HowTo Schemas

**Файл:** `lib/schemas/howToSchema.js`

**Функции:**
- `getHowToBuyVignetteSchema(locale, baseUrl)` - Как да купите
- `getHowToCheckVignetteSchema(locale, baseUrl)` - Как да проверите

**Пример:**
```javascript
const buyGuide = getHowToBuyVignetteSchema('bg');
const checkGuide = getHowToCheckVignetteSchema('bg');
```

**Schema Types:**
- ✅ HowTo
- ✅ HowToStep
- ✅ HowToSupply
- ✅ HowToTool

---

### 3. Blog Schemas

**Файл:** `lib/schemas/blogSchemas.js`

**Функции:**
- `getBlogPostingSchema(post, locale, baseUrl)` - За отделна статия
- `getBlogSchema(locale, baseUrl)` - За блог index
- `getBlogListingSchema(posts, currentPage, totalPages, locale, baseUrl)` - За листинг

**Пример:**
```javascript
const postSchema = getBlogPostingSchema(post, 'bg');
const blogSchema = getBlogSchema('bg');
const listingSchema = getBlogListingSchema(posts, 1, 10, 'bg');
```

**Schema Types:**
- ✅ BlogPosting
- ✅ Blog
- ✅ CollectionPage
- ✅ Article
- ✅ Person (Author)

---

### 4. Review Schemas

**Файл:** `lib/schemas/reviewSchema.js`

**ВАЖНО:** Използвайте САМО с реални отзиви!

**Функции:**
- `getReviewSchema(review, productId, baseUrl)`
- `getAggregateRatingSchema(ratingData, productId)`
- `calculateAggregateRating(reviews)`
- `validateReview(review)`

**Пример:**
```javascript
const review = {
  id: 'review-001',
  rating: 5,
  authorName: 'Иван П.',
  body: 'Отлична услуга!',
  date: '2024-12-15',
  verified: true
};

const reviewSchema = getReviewSchema(review, productId);
const aggregateRating = calculateAggregateRating(reviews);
```

**Schema Types:**
- ✅ Review
- ✅ AggregateRating
- ✅ Rating

---

### 5. Government Service Schemas

**Файл:** `lib/schemas/governmentServiceSchema.js`

**Функции:**
- `getGovernmentServiceSchema(locale, baseUrl)`
- `getGovernmentOrganizationsSchema(locale)`
- `getVignetteCheckPublicServiceSchema(locale, baseUrl)`

**Пример:**
```javascript
const govService = getGovernmentServiceSchema('bg');
const govOrgs = getGovernmentOrganizationsSchema('bg');
const publicService = getVignetteCheckPublicServiceSchema('bg');
```

**Schema Types:**
- ✅ GovernmentService
- ✅ GovernmentOrganization
- ✅ PublicService

---

### 6. Vehicle Schemas

**Файл:** `lib/schemas/vehicleSchema.js`

**Функции:**
- `getVehicleCategorySchema(locale, baseUrl)`
- `getVehicleSchema(vehicleType, locale)`
- `getVehicleOfferCatalogSchema(locale, baseUrl)`

**Пример:**
```javascript
const vehicleCategories = getVehicleCategorySchema('bg');
const carSchema = getVehicleSchema('car', 'bg');
const offerCatalog = getVehicleOfferCatalogSchema('bg');
```

**Schema Types:**
- ✅ VehicleCategory
- ✅ Vehicle
- ✅ OfferCatalog

---

## 🎨 ВИЗУАЛНИ КОМПОНЕНТИ

### Пример за HowTo Steps

```jsx
<section className="py-16">
  <h2 className="text-3xl font-bold mb-12">Как да купя винетка?</h2>
  
  <div className="space-y-8">
    {[1, 2, 3, 4, 5].map(step => (
      <div key={step} className="flex gap-4">
        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
          {step}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Заглавие стъпка {step}</h3>
          <p className="text-gray-600">Описание...</p>
        </div>
      </div>
    ))}
  </div>
</section>
```

### Пример за Reviews

```jsx
<div className="bg-white p-6 rounded-lg shadow">
  <div className="flex text-yellow-400 mb-4">
    {'★★★★★'.split('').map((star, i) => (
      <span key={i}>{star}</span>
    ))}
  </div>
  <p className="text-gray-700 mb-4">Отличен отзив текст...</p>
  <div className="text-sm text-gray-500">
    <span className="font-medium">Иван П.</span>
    <span className="mx-2">•</span>
    <span>15.12.2024</span>
  </div>
</div>
```

---

## ✅ CHECKLIST

### Високи приоритети (Направете първо)
- [ ] Product Schema за седмична винетка
- [ ] Product Schema за месечна винетка
- [ ] Product Schema за тримесечна винетка
- [ ] Product Schema за уикенд винетка
- [ ] ItemList Schema за страницата с цени
- [ ] BlogPosting Schema за блог статиите

### Средни приоритети
- [ ] HowTo Schema за процеса на покупка
- [ ] HowTo Schema за проверка на винетка
- [ ] Government Service Schema
- [ ] Vehicle Category Schema

### Ниски приоритети (Nice to have)
- [ ] Система за събиране на отзиви
- [ ] Review Schema (само реални отзиви!)
- [ ] Video Object Schema
- [ ] Event Schema

---

## 🔧 ВАЛИДАЦИЯ

### Инструменти за валидация:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Тествайте всяка страница след промяна

2. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Копирайте JSON-LD кода за валидация

3. **Google Search Console**
   - Мониторирайте "Enhancements" → "Structured Data"
   - Проверявайте за грешки редовно

---

## 📈 ОЧАКВАНИ РЕЗУЛТАТИ

### Rich Snippets в Google:

**За Product pages:**
- ⭐ Star ratings
- 💰 Price (BGN & EUR)
- ✅ In Stock status
- 🚚 Instant delivery
- 📦 Product details

**За Blog posts:**
- 📅 Published date
- 👤 Author name
- 📰 Article preview
- 🖼️ Featured image

**За HowTo:**
- 🔢 Numbered steps
- 📝 Step descriptions
- 💡 Tips and tricks
- ⏱️ Estimated time

**За FAQ:**
- ❓ Question accordion
- ✅ Instant answers
- 🔍 Featured snippets

---

## 🚫 ЧЕСТО СРЕЩАНИ ГРЕШКИ

### ❌ ГРЕШКА 1: Липсващ import

```javascript
// ❌ ГРЕШНО
<script type="application/ld+json">

// ✅ ПРАВИЛНО
import Script from "next/script";
<Script type="application/ld+json" ...>
```

### ❌ ГРЕШКА 2: Еднакви ID-та

```javascript
// ❌ ГРЕШНО
<Script id="schema" ...>

// ✅ ПРАВИЛНО
<Script id="weekly-product-schema" ...>
```

### ❌ ГРЕШКА 3: Фалшиви данни

```javascript
// ❌ ГРЕШНО - Фалшиви отзиви
"reviewCount": "10000"

// ✅ ПРАВИЛНО - Реални данни или без данни
// Не добавяйте отзиви ако нямате реални!
```

---

## 📚 ДОКУМЕНТАЦИЯ

### Основни документи:

1. **SCHEMA_QUICK_START.md**
   - Бърз старт за 1 час
   - Топ 3 приоритета
   - Copy-paste примери

2. **IMPLEMENTATION_GUIDE.md**
   - Пълно ръководство
   - Стъпка по стъпка инструкции
   - Визуални компоненти

3. **SCHEMA_ANALYSIS_AND_RECOMMENDATIONS.md**
   - Детайлен анализ
   - Препоръки за вашия бизнес
   - Приоритизация

### Schema файлове:

- `lib/schemas/productSchemas.js` - Product & ItemList
- `lib/schemas/howToSchema.js` - HowTo инструкции
- `lib/schemas/blogSchemas.js` - Blog статии
- `lib/schemas/reviewSchema.js` - Отзиви (само реални!)
- `lib/schemas/governmentServiceSchema.js` - Легитимност
- `lib/schemas/vehicleSchema.js` - Категории превозни средства

---

## 💡 СЪВЕТИ ЗА УСПЕХ

1. **Започнете с Product schemas** - Най-голямо влияние върху SEO
2. **Валидирайте веднага** - Не чакайте до края
3. **Използвайте реални данни** - Никога не измисляйте
4. **Мониторирайте редовно** - Search Console е ваш приятел
5. **Актуализирайте често** - Цени, наличност, отзиви
6. **Тествайте на всички страници** - Не забравяйте подстраниците

---

## 🆘 ПОДДРЪЖКА

### Ако имате проблеми:

1. Проверете валидността на Schema.org validator
2. Тествайте в Rich Results Test
3. Прегледайте примерите в документацията
4. Проверете за JavaScript грешки в конзолата
5. Уверете се, че JSON е валиден

### Полезни ресурси:

- Google Search Central: https://developers.google.com/search/docs/appearance/structured-data
- Schema.org: https://schema.org/
- Rich Results Test: https://search.google.com/test/rich-results

---

## 📊 МЕТРИКИ ЗА ПРОСЛЕДЯВАНЕ

След имплементация следете:

1. **Click-Through Rate (CTR)** в Search Console
2. **Impressions** за rich results
3. **Valid items** за structured data
4. **Ranking positions** за ключови думи
5. **Rich result clicks** в Analytics

---

## 🎯 ROADMAP

### Седмица 1
- ✅ Product schemas за всички винетки
- ✅ ItemList schema
- ✅ Валидация

### Седмица 2
- ✅ BlogPosting schemas
- ✅ HowTo schemas
- ✅ Тестване

### Седмица 3-4
- ✅ Government Service schema
- ✅ Vehicle Category schema
- ✅ Мониторинг

### Месец 2+
- ✅ Система за отзиви
- ✅ Review schemas
- ✅ Оптимизация

---

## ✨ ЗАКЛЮЧЕНИЕ

Този пакет ви предоставя всичко необходимо за перфектна имплементация на микроданни за вашия сайт за винетки.

**Стартирайте с Product schemas и след 1 час ще видите разлика!**

За детайли вижте **SCHEMA_QUICK_START.md** за бърз старт или **IMPLEMENTATION_GUIDE.md** за пълно ръководство.

---

**Версия:** 1.0  
**Дата:** 2026-01-16  
**Създаден за:** Vinetka.bg

**Успех! 🚀**
