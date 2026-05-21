import { fetchAPI } from '../services/api';
import { getLocalizedPath, locales } from '../lib/pathnames.mjs';

const baseUrl = 'https://www.avtovia.bg';

// Static pages — internal paths (BG filesystem slugs)
const staticPages = [
  { path: '',                      priority: 1.0, changeFrequency: 'daily' },
  { path: 'contact',               priority: 0.8, changeFrequency: 'monthly' },
  { path: 'za-nas',                priority: 0.7, changeFrequency: 'monthly' },
  { path: 'proverka-na-vinetka',   priority: 0.9, changeFrequency: 'weekly' },
  { path: 'obshti-usloviya',       priority: 0.5, changeFrequency: 'yearly' },
  { path: 'privacy-policy',        priority: 0.5, changeFrequency: 'yearly' },
  { path: 'politika-za-biskvitki', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'blog',                  priority: 0.8, changeFrequency: 'daily' },
  { path: 'tseni',                 priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/dnevna',          priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/uikend',          priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/sedmichna',       priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/mesechna',        priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/trimesechna',     priority: 0.9, changeFrequency: 'weekly' },
  { path: 'tseni/godishna',        priority: 0.9, changeFrequency: 'weekly' },
];

async function getBlogPosts() {
  try {
    const posts = await fetchAPI('posts?per_page=100&_fields=slug,modified');
    if (!posts || !Array.isArray(posts)) {
      console.warn('WordPress API недостъпен — sitemap генериран без blog постове');
      return [];
    }
    return posts;
  } catch (error) {
    console.warn('WordPress API грешка при sitemap генериране:', error.message);
    return [];
  }
}

export default async function sitemap() {
  const currentDate = new Date();
  const urls = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      let url;
      if (!page.path) {
        url = `${baseUrl}/${locale}`;
      } else {
        const localizedPath = getLocalizedPath(`/${page.path}`, locale);
        url = `${baseUrl}/${locale}${localizedPath}`;
      }

      urls.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // Blog posts — BG locale only (content is in Bulgarian)
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
