/**
 * Review Schemas
 * 
 * ВАЖНО: Тези схеми трябва да се използват само с РЕАЛНИ отзиви от клиенти!
 * Не добавяйте фалшиви отзиви - това нарушава Guidelines на Google.
 * 
 * Използване:
 * import { getReviewSchema, getAggregateRatingSchema } from '@/lib/schemas/reviewSchema';
 */

/**
 * Генерира Review Schema за отделен отзив
 * 
 * @param {object} review - Обект с данни за отзива
 * @param {string} productId - ID на продукта/услугата
 * @param {string} baseUrl - Базов URL
 * @returns {object} Review Schema
 */
export function getReviewSchema(review, productId, baseUrl = 'https://vinetka.bg') {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${baseUrl}/reviews/${review.id}`,
    "itemReviewed": {
      "@type": review.itemType || "Product",
      "@id": productId
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": review.authorName,
      "image": review.authorImage ? {
        "@type": "ImageObject",
        "url": review.authorImage
      } : undefined
    },
    "reviewBody": review.body,
    "datePublished": review.date ? new Date(review.date).toISOString() : new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": review.language || "bg-BG"
  };
}

/**
 * Генерира AggregateRating Schema
 * 
 * @param {object} ratingData - Данни за агрегираните рейтинги
 * @param {string} productId - ID на продукта/услугата
 * @returns {object} AggregateRating Schema
 */
export function getAggregateRatingSchema(ratingData, productId) {
  return {
    "@type": "AggregateRating",
    "ratingValue": ratingData.averageRating || "4.8",
    "reviewCount": ratingData.totalReviews || "0",
    "bestRating": "5",
    "worstRating": "1",
    "itemReviewed": {
      "@type": ratingData.itemType || "Product",
      "@id": productId
    }
  };
}

/**
 * Примерна структура за реални отзиви
 * 
 * ЗАБЕЛЕЖКА: Това са само примери! Заменете с реални данни от вашата база данни
 */
export const sampleReviews = {
  weekly: [
    {
      id: "review-001",
      rating: 5,
      authorName: "Иван П.",
      body: "Много бързо и удобно! Препоръчвам!",
      date: "2024-12-15",
      language: "bg-BG",
      itemType: "Product",
      verified: true
    },
    {
      id: "review-002",
      rating: 5,
      authorName: "Мария Г.",
      body: "Отлична услуга, винетката беше активирана моментално.",
      date: "2024-12-10",
      language: "bg-BG",
      itemType: "Product",
      verified: true
    },
    {
      id: "review-003",
      rating: 4,
      authorName: "Георги С.",
      body: "Всичко мина гладко, само малко съм объркан от интерфейса в началото.",
      date: "2024-12-05",
      language: "bg-BG",
      itemType: "Product",
      verified: true
    }
  ],
  monthly: [
    {
      id: "review-004",
      rating: 5,
      authorName: "Петър Д.",
      body: "Страхотно! Много по-евтино от да купувам на място.",
      date: "2024-12-20",
      language: "bg-BG",
      itemType: "Product",
      verified: true
    }
  ],
  checkService: [
    {
      id: "review-101",
      rating: 5,
      authorName: "Анна К.",
      body: "Безплатната проверка е много полезна! Винаги проверявам преди пътуване.",
      date: "2024-12-18",
      language: "bg-BG",
      itemType: "Service",
      verified: true
    }
  ]
};

/**
 * Генерира пълен набор от Review схеми за продукт
 * 
 * @param {Array} reviews - Масив с отзиви
 * @param {string} productId - ID на продукта
 * @param {string} baseUrl - Базов URL
 * @returns {Array} Масив с Review схеми
 */
export function getProductReviewsSchemas(reviews, productId, baseUrl = 'https://vinetka.bg') {
  return reviews.map(review => getReviewSchema(review, productId, baseUrl));
}

/**
 * Калкулира агрегиран рейтинг от масив с отзиви
 * 
 * @param {Array} reviews - Масив с отзиви
 * @returns {object} Обект с агрегирани данни
 */
export function calculateAggregateRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return {
      averageRating: "0",
      totalReviews: "0",
      ratingDistribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);
  
  const distribution = reviews.reduce((dist, review) => {
    dist[review.rating] = (dist[review.rating] || 0) + 1;
    return dist;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  return {
    averageRating,
    totalReviews: reviews.length.toString(),
    ratingDistribution: distribution
  };
}

/**
 * Валидира отзив преди добавяне в схема
 * 
 * @param {object} review - Обект с данни за отзив
 * @returns {boolean} Дали отзивът е валиден
 */
export function validateReview(review) {
  const requiredFields = ['id', 'rating', 'authorName', 'body', 'date'];
  
  // Проверка за задължителни полета
  for (const field of requiredFields) {
    if (!review[field]) {
      console.warn(`Review validation failed: missing ${field}`);
      return false;
    }
  }
  
  // Проверка за валиден рейтинг
  if (review.rating < 1 || review.rating > 5) {
    console.warn(`Review validation failed: invalid rating ${review.rating}`);
    return false;
  }
  
  // Проверка за минимална дължина на отзива
  if (review.body.length < 10) {
    console.warn(`Review validation failed: review body too short`);
    return false;
  }
  
  // Проверка за валидна дата
  if (!isValidDate(review.date)) {
    console.warn(`Review validation failed: invalid date ${review.date}`);
    return false;
  }
  
  return true;
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

/**
 * ============================================
 * ИНСТРУКЦИИ ЗА ИНТЕГРАЦИЯ С РЕАЛНИ ОТЗИВИ
 * ============================================
 * 
 * 1. Създайте база данни за отзиви:
 *    - id (уникален идентификатор)
 *    - product_id (ID на продукт/услуга)
 *    - rating (1-5)
 *    - author_name (име на автора)
 *    - author_email (имейл - не показвайте публично)
 *    - review_body (текст на отзива)
 *    - created_at (дата на създаване)
 *    - verified (дали покупката е потвърдена)
 *    - status (pending/approved/rejected)
 * 
 * 2. Създайте форма за събиране на отзиви:
 *    - След успешна покупка изпращайте имейл с линк за отзив
 *    - Валидирайте отзивите преди публикуване
 *    - Използвайте reCAPTCHA за защита от спам
 * 
 * 3. Модерирайте отзивите:
 *    - Одобрявайте само реални отзиви
 *    - Премахвайте спам и неподходящо съдържание
 *    - Отговаряйте на отзивите (особено негативните)
 * 
 * 4. Показвайте отзивите на сайта:
 *    - Добавете секция с отзиви на product pages
 *    - Показвайте звездичките в product listings
 *    - Добавете филтри (по рейтинг, дата, etc.)
 * 
 * 5. Интегрирайте със Schema Markup:
 *    - Използвайте реалните данни от БД
 *    - Актуализирайте агрегираните рейтинги автоматично
 *    - Валидирайте схемите с Google Rich Results Test
 * 
 * ВАЖНО: Никога не добавяйте фалшиви отзиви! Google може да
 * наложи наказание (penalty) на вашия сайт.
 */
