# 🚨 SEO СПЕШЕН ПЛАН ЗА ДЕЙСТВИЕ - VINETKA.BG

## 📊 РЕЗЮМЕ НА ПРОБЛЕМИТЕ

### 🔴 КРИТИЧНИ (Поправи ВЕДНАГА!)

1. **Canonical tags са релативни, НЕ абсолютни** ❌
2. **Open Graph изображения са релативни** ❌  
3. **Липсва locale в canonical URLs** ❌

### 🟡 ВАЖНИ (Поправи тази седмица)

4. **Липсват Product Schemas** за всички винетки
5. **Липсва BlogPosting Schema** за блог статии
6. **Липсва ItemList Schema** за pricing page
7. **Липсва WebPage Schema** на homepage

### 🟢 ПОДОБРЕНИЯ (Nice to have)

8. Pagination markup за blog
9. Review Schema (след система за отзиви)
10. HowTo Schema за инструкции

---

## 🔥 ФАЗА 1: КРИТИЧНИ ПОПРАВКИ (30 МИНУТИ)

### ✅ Стъпка 1: SEO Utility (ГОТОВО!)

Вече създадох `lib/seo-utils.js` с helper функции.

---

### Стъпка 2: Поправи Pricing Page

**Файл:** `app/[locale]/tseni/page.js`

**ПРЕДИ (реди 19-60):**
```javascript
export async function generateMetadata() {
  const t = await getTranslations('prices');
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: [...],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: "/default.webp",  // ❌ ГРЕШНО!
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: "bg_BG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/default.webp"],  // ❌ ГРЕШНО!
    },
    alternates: {
      canonical: "/tseni",  // ❌ ГРЕШНО!
    },
  };
}
```

**СЛЕД (замени с това):**
```javascript
import { generateSEOMetadata } from '../../../lib/seo-utils';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('prices');
  
  return generateSEOMetadata({
    locale,
    path: 'tseni',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
    keywords: [
      "цени винетки",
      "електронна винетка цена",
      "винетка онлайн цени",
      "уикенд винетка цена",
      "седмична винетка цена",
      "месечна винетка цена",
      "тримесечна винетка цена",
      "годишна винетка цена",
      "vinetka.bg цени",
      "Bulgaria vignette prices"
    ],
  });
}
```

---

### Стъпка 3: Поправи Vignette Check Page

**Файл:** `app/[locale]/proverka-na-vinetka/page.js`

**Замени реди 16-47 с:**
```javascript
import { generateSEOMetadata } from '../../../lib/seo-utils';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('vignetteCheckPage');
  
  return generateSEOMetadata({
    locale,
    path: 'proverka-na-vinetka',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
  });
}
```

---

### Стъпка 4: Поправи Home Page

**Файл:** `app/[locale]/page.js`

**Замени реди 23-61 с:**
```javascript
import { generateSEOMetadata } from '../../lib/seo-utils';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('meta');
  
  return generateSEOMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description'),
    image: '/default.webp',
    keywords: [
      "винетка онлайн",
      "електронна винетка", 
      "купи винетка",
      "винетка",
      "online vignette",
      "electronic vignette",
      "buy vignette",
      "vignette"
    ],
  });
}
```

---

### Стъпка 5: Поправи Blog Post Page

**Файл:** `app/[locale]/blog/[slug]/page.js`

**Замени реди 9-41 с:**
```javascript
import { getCanonicalUrl, getAbsoluteImageUrl } from '../../../../lib/seo-utils';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  if (locale !== "bg") {
    return {};
  }
  
  const post = await getPostBySlug(slug);

  if (!post || post.length === 0) {
    throw new Error("Post not found");
  }

  const meta = post[0].yoast_head_json;
  const ogImageObject =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0] : null;
  const ogImage = ogImageObject ? ogImageObject.url : null;
  
  // ✅ ПОПРАВКА: Използвай абсолютен canonical
  const canonicalUrl = meta.canonical || getCanonicalUrl(locale, `blog/${slug}`);
  const absoluteOgImage = ogImage ? getAbsoluteImageUrl(ogImage) : getAbsoluteImageUrl('/default.webp');

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.og_title,
      description: meta.og_description,
      url: canonicalUrl,  // ✅ ДОБАВЕНО!
      images: [{ url: absoluteOgImage }],  // ✅ ПОПРАВЕНО!
    },
    alternates: {
      canonical: canonicalUrl,  // ✅ ПОПРАВЕНО!
    },
  };
}
```

---

### Стъпка 6: Поправи Locale Layout

**Файл:** `app/[locale]/layout.js`

**Замени реди 13-52 с:**
```javascript
import { getCanonicalUrl, getHreflangLinks, getAbsoluteImageUrl } from '../../lib/seo-utils';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages();
  
  return {
    title: {
      template: messages.meta.titleTemplate,
      default: messages.meta.title,
    },
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: getCanonicalUrl(locale),  // ✅ ДОБАВЕНО!
      images: getAbsoluteImageUrl('/default.webp'),  // ✅ ПОПРАВЕНО!
      type: "website",
      locale: locale === 'bg' ? 'bg_BG' : `${locale}_${locale.toUpperCase()}`,
      siteName: messages.meta.title,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: [getAbsoluteImageUrl('/default.webp')],  // ✅ ПОПРАВЕНО!
    },
    alternates: {
      canonical: getCanonicalUrl(locale),  // ✅ ПОПРАВЕНО!
      languages: getHreflangLinks(),
    },
  };
}
```

---

## ✅ CHECKLIST ФАЗА 1

- [ ] Създаден `lib/seo-utils.js` ✅ (ГОТОВО)
- [ ] Поправен `app/[locale]/tseni/page.js`
- [ ] Поправен `app/[locale]/proverka-na-vinetka/page.js`
- [ ] Поправен `app/[locale]/page.js`
- [ ] Поправен `app/[locale]/blog/[slug]/page.js`
- [ ] Поправен `app/[locale]/layout.js`

---

## 🔥 ФАЗА 2: SCHEMA МИКРОДАННИ (1 ЧАС)

**Следвай инструкциите от:**
- `SCHEMA_QUICK_START.md` - Бърз старт
- `IMPLEMENTATION_GUIDE.md` - Детайлни инструкции

### Приоритети:

1. ✅ Product Schemas за всички винетки (30 мин)
2. ✅ ItemList Schema за pricing page (10 мин)
3. ✅ BlogPosting Schema за блог (15 мин)
4. ✅ HowTo Schemas (20 мин)

---

## 📊 ТЕСТВАНЕ

След всяка промяна тествай с:

### 1. Google Rich Results Test
```
https://search.google.com/test/rich-results
```

Тествай:
- https://vinetka.bg/bg
- https://vinetka.bg/bg/tseni
- https://vinetka.bg/bg/proverka-na-vinetka

### 2. Провери canonical в source

**Отвори страницата** → **View Page Source** → **Търси:**
```html
<link rel="canonical" href="https://vinetka.bg/bg/tseni" />
```

Трябва да видиш **АБСОЛЮТЕН URL**!

### 3. Провери OG изображения

В source търси:
```html
<meta property="og:image" content="https://vinetka.bg/default.webp" />
```

Трябва да е **АБСОЛЮТЕН URL**!

---

## 📈 ОЧАКВАНИ РЕЗУЛТАТИ

### Преди:
```html
<link rel="canonical" href="/tseni" />  ❌
<meta property="og:image" content="/default.webp" />  ❌
```

### След:
```html
<link rel="canonical" href="https://vinetka.bg/bg/tseni" />  ✅
<meta property="og:image" content="https://vinetka.bg/default.webp" />  ✅
```

---

## 🚀 СЛЕДВАЩИ СТЪПКИ

1. **Направи Фаза 1** (30 мин) - Поправи canonical и OG images
2. **Тествай** (10 мин) - Rich Results Test
3. **Направи Фаза 2** (1 час) - Добави Schema микроданни
4. **Submit sitemap** в Google Search Console
5. **Мониторирай** резултатите

---

## 💡 ВАЖНИ ЗАБЕЛЕЖКИ

### За canonical:
- **ВИНАГИ** използвай абсолютни URL-и
- **ВИНАГИ** включвай locale в пътя
- **НЕ** забравяй trailing slash (ако е нужен)

### За OG изображения:
- **ВИНАГИ** абсолютни URL-и
- Препоръчителен размер: 1200x630px
- Формат: WebP, PNG или JPG

### За Schema.org:
- **ВИНАГИ** използвай абсолютни URL-и
- Валидирай със Schema.org validator
- Тествай с Rich Results Test

---

## 📞 ГОТОВ ЛИ СИ?

**Започни с Фаза 1!**

Копирай кода от стъпки 2-6 и поправи файловете!

След това тествай и продължи с Фаза 2 (Schema микроданни)!

**Успех! 🚀**
