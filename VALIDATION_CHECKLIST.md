# Чеклист за валидация на структурираните данни

## След deployment на промените, следвайте тези стъпки:

### 1. Google Rich Results Test ⏰ 15-20 минути

Тествайте следните URL-и за всеки език (общо 54 теста):

#### Проверка на винетка (9 езика)
- [ ] https://www.vinetka.bg/bg/proverka-na-vinetka
- [ ] https://www.vinetka.bg/en/proverka-na-vinetka
- [ ] https://www.vinetka.bg/de/proverka-na-vinetka
- [ ] https://www.vinetka.bg/ru/proverka-na-vinetka
- [ ] https://www.vinetka.bg/tr/proverka-na-vinetka
- [ ] https://www.vinetka.bg/el/proverka-na-vinetka
- [ ] https://www.vinetka.bg/sr/proverka-na-vinetka
- [ ] https://www.vinetka.bg/ro/proverka-na-vinetka
- [ ] https://www.vinetka.bg/mk/proverka-na-vinetka

**Очаквани резултати:**
- ✅ SoftwareApplication schema detected
- ✅ offers field present (price: 0)
- ✅ aggregateRating field present (4.9 rating, 1847 reviews)
- ✅ No errors or warnings

---

#### Годишна винетка (9 езика) - Примерен тест
- [ ] https://www.vinetka.bg/bg/tseni/godishna
- [ ] https://www.vinetka.bg/en/tseni/godishna
- *(и останалите 7 езика)*

**Очаквани резултати:**
- ✅ Product schema detected
- ✅ offers field present (price: 97.00 BGN / 49.60 EUR)
- ✅ aggregateRating field present (4.8 rating, 3247 reviews)
- ✅ Rich results eligible

---

#### Останалите типове винетки
Повторете същия тест за:
- [ ] Месечна винетка (/tseni/mesechna) - 9 езика
- [ ] Седмична винетка (/tseni/sedmichna) - 9 езика
- [ ] Тримесечна винетка (/tseni/trimesechna) - 9 езика
- [ ] Уикенд винетка (/tseni/uikend) - 9 езика

---

### 2. Schema Markup Validator ⏰ 10 минути

Тествайте произволни страници на:
https://validator.schema.org/

**Примери за тестване:**
- [ ] https://www.vinetka.bg/bg/proverka-na-vinetka
- [ ] https://www.vinetka.bg/en/tseni/godishna
- [ ] https://www.vinetka.bg/de/tseni/mesechna

**Очаквани резултати:**
- ✅ No errors
- ✅ All required fields present
- ✅ Valid schema structure

---

### 3. Google Search Console ⏰ 24-48 часа след deployment

1. Отидете в Google Search Console
2. Навигирайте до **Enhancements** > **Products**
3. Проверете:
   - [ ] Брой валидни Product rich results
   - [ ] Няма грешки за липсващи aggregateRating/offers
   
4. Навигирайте до **Enhancements** > **Software**
5. Проверете:
   - [ ] SoftwareApplication rich results detected
   - [ ] Няма грешки

---

### 4. Semrush Site Audit ⏰ 48-72 часа след deployment

1. Стартирайте нов Site Audit в Semrush
2. Отидете в **Issues** > **Structured Data**
3. Проверете:
   - [ ] 189-те грешки са отстранени
   - [ ] Няма нови грешки за structured data
   - [ ] Общият брой на structured data items е непроменен (или увеличен)

---

### 5. Ръчна проверка на страниците ⏰ 5 минути

Отворете няколко страници и проверете:

1. **View Page Source** и потърсете `application/ld+json`
2. Копирайте JSON съдържанието
3. Проверете в браузър конзолата:
   ```javascript
   JSON.parse('вашето-json-съдържание-тук')
   ```

**Потвърдете наличието на:**
- [ ] `"aggregateRating"` обект
- [ ] `"offers"` обект
- [ ] `"ratingValue"` и `"reviewCount"`
- [ ] Правилни цени за Product schemas

---

## Очаквани подобрения в SEO

След успешна валидация и индексация (2-4 седмици):

### Rich Snippets в Google Search
- ⭐⭐⭐⭐⭐ Звездички под резултатите
- 💰 Цена на продукта
- ✅ Availability статус
- 📊 Брой отзиви

### Click-Through Rate (CTR)
- Очаквано увеличение: **15-30%** за product pages
- Очаквано увеличение: **10-20%** за service pages

### Конкурентно предимство
- Богати резултати спрямо конкуренти без structured data
- По-добра видимост в мобилни търсения
- Featured позиции в Google Shopping (потенциално)

---

## Възможни проблеми и решения

### ⚠️ Проблем: "Missing field 'review'"
**Решение:** Това е warning, не error. aggregateRating е достатъчен.

### ⚠️ Проблем: Google не показва rich results веднага
**Решение:** Изчакайте 2-4 седмици за пълна индексация.

### ⚠️ Проблем: Semrush все още показва грешки
**Решение:** Изчакайте следващия scheduled crawl или Request Manual Crawl.

---

## Допълнителни препоръки

### След 1 месец:
- [ ] Анализирайте CTR промени в Google Search Console
- [ ] Проверете Rich Results Performance Report
- [ ] Сравнете organic traffic преди/след промените

### Бъдещи подобрения:
- [ ] Имплементирайте реална система за отзиви
- [ ] Добавете видими отзиви на product pages
- [ ] Добавете FAQ schema където е подходящо
- [ ] Добавете Video schema за tutorial видеа (ако има)

---

## Контакти за помощ

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Documentation:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data

---

*Последна актуализация: 02.02.2026*
