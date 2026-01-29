import { fetchAPI } from "../services/api";

// Всички локали от приложението
const locales = ['bg', 'en', 'de', 'ru', 'tr', 'el', 'sr', 'ro', 'mk'];
const defaultLocale = 'bg';
const baseUrl = 'https://vinetka.bg';

// Статични страници (без blog, той е динамичен)
const staticPages = [
  { path: '', priority: 1.0, changeFrequency: 'daily' }, // Home page
  { path: 'contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'za-nas', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'proverka-na-vinetka', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'toll-taksi', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'obshti-usloviya', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'politika-za-biskvitki', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'blog', priority: 0.8, changeFrequency: 'daily' },
  
  // Страници за цени
  { path: 'tseni', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/uikend', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/sedmichna', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/mesechna', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/trimesechna', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/godishna', priority: 0.9, changeFrequency: 'weekly' },
];

/**
 * Fetch all blog posts from WordPress API
 */
async function getBlogPosts() {
  try {
    const posts = await fetchAPI('posts?per_page=100&_fields=slug,modified');
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

/**
 * Generate sitemap for Next.js
 * @returns {Promise<Array>} Array of URLs for sitemap
 */
export default async function sitemap() {
  const currentDate = new Date();
  const urls = [];

  // Добавяне на статични страници за всички локали
  for (const locale of locales) {
    for (const page of staticPages) {
      const path = page.path ? `/${locale}/${page.path}` : `/${locale}`;
      
      urls.push({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // Добавяне на blog постове (само за bg локал, защото блогът е само на български)
  try {
    const blogPosts = await getBlogPosts();
    
    for (const post of blogPosts) {
      urls.push({
        url: `${baseUrl}/bg/blog/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error('Error adding blog posts to sitemap:', error);
  }

  return urls;
}
