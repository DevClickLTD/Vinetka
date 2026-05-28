/**
 * SMART TRANSLATION SCRIPT FOR VINETKA.BG
 * Превежда САМО новите и променените страници/постове от WordPress
 * ✅ UPDATE DETECTION: Автоматично засича промени в съдържанието
 * 
 * Използва: translate-google за безплатни преводи
 * Превежда на: всички translationLocales от lib/pathnames.mjs (без BG)
 */

const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

// WordPress API endpoint
const WORDPRESS_API = 'https://vinetka.admin-panels.com/wp-json/wp/v2';

// Delay между заявки за да не претоварим Google Translate API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Converts a translated title into a clean, URL-friendly slug.
 * Works for Latin, Cyrillic (RU/SR/MK/UK) and Greek (EL) scripts.
 */
function titleToSlug(title) {
  if (!title) return '';
  let slug = title
    .toLowerCase()
    // Normalize German umlauts before NFD decomposition
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    // NFD strips combining diacritics from Latin letters (é → e, ñ → n, etc.)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Keep: a-z, 0-9, spaces, Cyrillic (U+0400–U+04FF), Greek (U+0370–U+03FF), hyphens
    .replace(/[^a-z0-9\s\u0400-\u04ff\u0370-\u03ff-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug;
}

/**
 * Scans all existing translations and fills in any slug_{lang} fields that are
 * missing or still equal to the BG slug (i.e. were never properly translated).
 * Generates slugs from the already-translated titles — NO API calls needed.
 * Returns the number of entries fixed.
 */
function fixMissingSlugs(data, targetLanguages) {
  let fixed = 0;
  for (const store of [data.posts, data.pages]) {
    for (const [bgSlug, entry] of Object.entries(store)) {
      for (const lang of targetLanguages) {
        const currentSlug = entry[`slug_${lang}`];
        const translatedTitle = entry[`title_${lang}`];
        // Fix when: no slug yet, OR slug is still the BG slug (not translated)
        if (translatedTitle && (!currentSlug || currentSlug === bgSlug)) {
          const generated = titleToSlug(translatedTitle);
          if (generated) {
            entry[`slug_${lang}`] = generated;
            fixed++;
          }
        }
      }
    }
  }
  return fixed;
}

// Slug mappings - ако имаш специфични slug преводи
const slugMappings = {
  // Пример: "kak-da-kupim-vinetka": "how-to-buy-vignette",
  // Може да добавиш повече тук при нужда
};

// 🔗 Web App URL mapping по език
const WEB_APP_URL_MAP = {
  'bg': 'https://web.avtovia.bg/',
  'en': 'https://web.avtovia.bg/?lang=en',
  'de': 'https://web.avtovia.bg/?lang=de',
  'ru': 'https://web.avtovia.bg/?lang=ru',
  'tr': 'https://web.avtovia.bg/?lang=tr',
  'el': 'https://web.avtovia.bg/?lang=gr', // Greek uses 'gr' in web app
  'sr': 'https://web.avtovia.bg/?lang=sr',
  'ro': 'https://web.avtovia.bg/?lang=ro',
  'mk': 'https://web.avtovia.bg/?lang=mk',
  'fr': 'https://web.avtovia.bg/?lang=fr',
  'hu': 'https://web.avtovia.bg/?lang=hu',
  'uk': 'https://web.avtovia.bg/?lang=uk',
};

/**
 * 🔒 Защитава href атрибутите от превод
 * Използва непреводими Unicode токени вместо текстови placeholders,
 * за да предотврати Google Translate да ги промени.
 */
function protectLinks(content) {
  const links = [];
  // Използваме Unicode Private Use Area символи (не се превеждат от Google Translate)
  // Форматът е: \uE000<index>\uE001 - невидими за потребителя, непреводими
  const protectedContent = content.replace(/href="([^"]*)"/g, (match, url) => {
    const idx = links.length;
    links.push(url);
    // Backup: пазим и оригиналния URL в data атрибут
    return `href="\uE000${idx}\uE001"`;
  });
  return { protectedContent, links };
}

/**
 * 🔒 Възстановява href атрибутите след превод
 * Търси Unicode токените и ги заменя с оригиналните URL-и.
 * Ако Unicode токените са повредени от превода, търси и текстови fallback.
 */
function restoreLinks(content, links) {
  // Основно възстановяване - Unicode токени (непреводими)
  let restored = content.replace(/href="\uE000(\d+)\uE001"/g, (match, idx) => {
    const originalUrl = links[parseInt(idx)];
    return originalUrl !== undefined ? `href="${originalUrl}"` : match;
  });

  // Fallback - старият формат LINK_PLACEHOLDER (ако съществуват от стари преводи)
  restored = restored.replace(/href="LINK_PLACEHOLDER_(\d+)"/gi, (match, idx) => {
    const originalUrl = links[parseInt(idx)];
    return originalUrl !== undefined ? `href="${originalUrl}"` : match;
  });

  // Финален fallback - ако Unicode токените са повредени (напр. \uE000 0\uE001 с интервал)
  restored = restored.replace(/href="[\uE000\s]*(\d+)[\uE001\s]*"/g, (match, idx) => {
    const originalUrl = links[parseInt(idx)];
    return originalUrl !== undefined ? `href="${originalUrl}"` : match;
  });

  return restored;
}

/**
 * 🔗 Заменя линковете към web app-а с правилния език
 */
function replaceWebAppLinks(content, targetLang) {
  if (!content) return content;
  
  const targetUrl = WEB_APP_URL_MAP[targetLang] || 'https://web.avtovia.bg/';
  
  // Replace all variations of web.avtovia.bg links
  let updatedContent = content;
  
  // Pattern 1: https://web.avtovia.bg/ (with or without trailing slash)
  updatedContent = updatedContent.replace(/https:\/\/web\.avtovia\.bg\/?(?!\?)/g, targetUrl);
  
  // Pattern 2: Existing language parameters (replace them too)
  updatedContent = updatedContent.replace(/https:\/\/web\.vinetka\.bg\/\?lang=[a-z]{2}/g, targetUrl);
  
  return updatedContent;
}

/**
 * Извлича чист текст от HTML
 */
function extractTextFromHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Превежда текст с retry механизъм
 */
async function translateText(text, targetLang, retries = 3) {
  if (!text || text.trim() === '') return '';
  
  try {
    const result = await translate(text, { from: 'bg', to: targetLang });
    return result;
  } catch (error) {
    if (retries > 0) {
      console.log(`   ⚠️  Retry... (${retries} left) for ${targetLang}`);
      await delay(2000);
      return translateText(text, targetLang, retries - 1);
    }
    console.error(`   ❌ Translation to ${targetLang} failed:`, error.message);
    return text; // Fallback към оригиналния текст
  }
}

/**
 * Превежда HTML съдържание
 * ✅ Защитава href атрибутите от превод с placeholder система
 */
async function translateHtmlContent(htmlContent, targetLang) {
  if (!htmlContent || htmlContent.trim() === '') return '';
  
  // 🔒 Защити href атрибутите преди превода
  const { protectedContent, links } = protectLinks(htmlContent);
  
  try {
    // За големи HTML блокове, превеждаме директно
    const result = await translate(protectedContent, { from: 'bg', to: targetLang });
    // 🔒 Възстанови оригиналните href стойности
    return restoreLinks(result, links);
  } catch (error) {
    console.error(`   ❌ HTML translation to ${targetLang} failed, trying plain text`);
    // Ако HTML превода не работи, извличаме текст и го превеждаме
    const textOnly = extractTextFromHtml(htmlContent);
    return await translateText(textOnly, targetLang) || htmlContent;
  }
}

/**
 * Fetch от WordPress API
 */
async function fetchFromWordPress(endpoint) {
  console.log(`📡 Fetching from WordPress: ${endpoint}`);
  const response = await fetch(`${WORDPRESS_API}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }
  
  const data = await response.json();
  console.log(`✅ Found ${data.length} items`);
  return data;
}

/**
 * Подготвя item за превод
 */
function prepareForTranslation(item) {
  const bgSlug = item.slug;
  
  // ✅ Взима Yoast SEO Title (ако има), иначе стандартния Title
  const seoTitle = item.yoast_head_json?.og_title || item.title.rendered;
  
  return {
    id: item.id,
    slug_bg: bgSlug,
    title_bg: seoTitle,  // ✅ Yoast SEO Title приоритет
    content_bg: item.content.rendered,
    meta_description_bg: item.yoast_head_json?.og_description || item.yoast_head_json?.description || '',
    modified: item.modified, // ✅ За Update Detection
    // Празни полета за преводи - ще се запълнят
  };
}

/**
 * Превежда един item на избрани езици (по подразбиране — всички)
 */
async function translateItem(itemData, slug, type, targetLanguages, langsToTranslate = null) {
  console.log(`\n📄 Translating ${type}: ${slug}`);
  console.log(`   Title: ${itemData.title_bg}`);

  const langs = langsToTranslate || targetLanguages;
  const translated = { ...itemData };
  
  // Превод на всеки език
  for (const lang of langs) {
    console.log(`\n   🌐 Translating to ${lang.toUpperCase()}...`);
    
    // Title превод (изпълнява се ПЪРВО — slug зависи от него)
    console.log(`      → Title...`);
    translated[`title_${lang}`] = await translateText(itemData.title_bg, lang);

    // Slug — генерира се от преведеното заглавие
    // Ако има ръчно дефиниран slug в slugMappings, той има приоритет
    const customSlug = slugMappings[itemData.slug_bg];
    if (customSlug && typeof customSlug === 'object' && customSlug[lang]) {
      translated[`slug_${lang}`] = customSlug[lang];
    } else if (typeof customSlug === 'string' && lang === 'en') {
      translated[`slug_${lang}`] = customSlug;
    } else {
      // Генерираме slug от преведеното заглавие
      translated[`slug_${lang}`] = titleToSlug(translated[`title_${lang}`]) || itemData.slug_bg;
    }
    await delay(500);
    
    // Meta description превод
    if (itemData.meta_description_bg) {
      console.log(`      → Meta...`);
      translated[`meta_description_${lang}`] = await translateText(itemData.meta_description_bg, lang);
      await delay(500);
    } else {
      translated[`meta_description_${lang}`] = '';
    }
    
    // Content превод
    console.log(`      → Content...`);
    if (itemData.content_bg && itemData.content_bg.length > 0) {
      let translatedContent = '';
      
      if (itemData.content_bg.length > 5000) {
        // Голямо съдържание - делим на части
        console.log(`      → Large content (${itemData.content_bg.length} chars), chunking...`);
        const chunkSize = 4500;
        const chunks = [];
        for (let i = 0; i < itemData.content_bg.length; i += chunkSize) {
          chunks.push(itemData.content_bg.substring(i, i + chunkSize));
        }
        
        const translatedChunks = [];
        for (let i = 0; i < chunks.length; i++) {
          console.log(`         Chunk ${i + 1}/${chunks.length}`);
          const translatedChunk = await translateHtmlContent(chunks[i], lang);
          translatedChunks.push(translatedChunk);
          await delay(1000);
        }
        
        translatedContent = translatedChunks.join('');
      } else {
        translatedContent = await translateHtmlContent(itemData.content_bg, lang);
        await delay(1000);
      }
      
      // 🔗 ВАЖНО: Замяна на web app линковете с правилния език
      translatedContent = replaceWebAppLinks(translatedContent, lang);
      console.log(`      → 🔗 Web app links updated for ${lang}`);
      
      translated[`content_${lang}`] = translatedContent;
    } else {
      translated[`content_${lang}`] = '';
    }
    
    console.log(`      ✅ ${lang.toUpperCase()} completed`);
  }
  
  console.log(`\n   ✅ ALL LANGUAGES COMPLETED: ${translated.title_bg}`);
  return translated;
}

function itemDataFromExisting(entry, slug) {
  return {
    slug_bg: entry.slug_bg || slug,
    title_bg: entry.title_bg,
    content_bg: entry.content_bg,
    meta_description_bg: entry.meta_description_bg || '',
    modified: entry.modified,
  };
}

function collectMissingLocaleBackfill(existingData, targetLanguages) {
  const items = [];

  for (const [storeKey, type] of [['pages', 'page'], ['posts', 'post']]) {
    for (const [slug, entry] of Object.entries(existingData[storeKey])) {
      const missingLangs = targetLanguages.filter((lang) => !entry[`title_${lang}`]);
      if (missingLangs.length > 0) {
        items.push({ storeKey, slug, entry, type, missingLangs });
      }
    }
  }

  return items;
}

/**
 * Main function
 */
async function main() {
  try {
    const { translationLocales } = await import('../lib/pathnames.mjs');
    const targetLanguages = translationLocales;

    // ✅ Check for --force flag
    const forceMode = process.argv.includes('--force');
    
    console.log('\n🤖 VINETKA.BG - SMART TRANSLATION');
    console.log('═══════════════════════════════════════════════════\n');
    
    if (forceMode) {
      console.log('⚡ FORCE MODE ENABLED - Will re-translate ALL content!\n');
    }
    
    const translationsPath = path.join(__dirname, '../messages/wordpress-content.json');
    
    // Load existing translations
    let existingData = { pages: {}, posts: {} };
    if (fs.existsSync(translationsPath)) {
      existingData = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));
      console.log('📊 Current state:');
      console.log(`   Pages translated: ${Object.keys(existingData.pages).length}`);
      console.log(`   Posts translated: ${Object.keys(existingData.posts).length}\n`);

      // Patch any entries that have translated titles but still use the BG slug
      const fixed = fixMissingSlugs(existingData, targetLanguages);
      if (fixed > 0) {
        console.log(`🔧 Fixed ${fixed} missing/untranslated slug fields from existing titles`);
        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log('   💾 Saved\n');
      }
    } else {
      console.log('⚠️  No existing translations found, will translate all\n');
    }
    
    // Fetch current content from WordPress
    console.log('🔍 Fetching content from WordPress...\n');
    const wpPages = await fetchFromWordPress('/pages?per_page=100&_fields=id,slug,title,content,yoast_head_json,modified');
    await delay(500);
    const wpPosts = await fetchFromWordPress('/posts?per_page=100&_fields=id,slug,title,content,yoast_head_json,modified');
    
    // Find NEW and UPDATED pages
    const existingPageSlugs = Object.keys(existingData.pages);
    const newPages = [];
    const updatedPages = [];
    
    wpPages.forEach(page => {
      if (!existingPageSlugs.includes(page.slug)) {
        // Нова страница
        newPages.push(page);
      } else if (forceMode) {
        // ✅ FORCE MODE - третира всички като променени
        updatedPages.push(page);
      } else {
        // Съществуваща страница - проверка за промени
        const existingModified = existingData.pages[page.slug]?.modified;
        if (existingModified && page.modified !== existingModified) {
          // Променена страница
          updatedPages.push(page);
        }
      }
    });
    
    // Find NEW and UPDATED posts
    const existingPostSlugs = Object.keys(existingData.posts);
    const newPosts = [];
    const updatedPosts = [];
    
    wpPosts.forEach(post => {
      if (!existingPostSlugs.includes(post.slug)) {
        // Нов пост
        newPosts.push(post);
      } else if (forceMode) {
        // ✅ FORCE MODE - третира всички като променени
        updatedPosts.push(post);
      } else {
        // Съществуващ пост - проверка за промени
        const existingModified = existingData.posts[post.slug]?.modified;
        if (existingModified && post.modified !== existingModified) {
          // Променен пост
          updatedPosts.push(post);
        }
      }
    });
    
    console.log('\n🎯 CONTENT TO TRANSLATE:');
    console.log(`   ✨ New pages: ${newPages.length}`);
    console.log(`   🔄 Updated pages: ${updatedPages.length}`);
    console.log(`   ✨ New posts: ${newPosts.length}`);
    console.log(`   🔄 Updated posts: ${updatedPosts.length}`);
    console.log(`   📊 Total: ${newPages.length + updatedPages.length + newPosts.length + updatedPosts.length}`);
    console.log(`   🌐 Languages: ${targetLanguages.join(', ').toUpperCase()}\n`);

    const backfillItems = forceMode ? [] : collectMissingLocaleBackfill(existingData, targetLanguages);
    const hasWpWork = newPages.length + updatedPages.length + newPosts.length + updatedPosts.length > 0;

    if (!hasWpWork && backfillItems.length === 0) {
      console.log('✅ Everything is up to date! No new or updated content.');
      console.log('\n💡 All WordPress content is synced with translations.\n');
      return;
    }

    if (backfillItems.length > 0) {
      console.log(`   🔁 Missing locale backfill: ${backfillItems.length} item(s)\n`);
    }
    
    if (!hasWpWork && backfillItems.length > 0) {
      console.log('ℹ️ No new WordPress content — running locale backfill only.\n');
    }
    
    // Translate NEW pages
    if (newPages.length > 0) {
      console.log('\n═══════════════════════════════════════════════════');
      console.log('📄 TRANSLATING NEW PAGES');
      console.log('═══════════════════════════════════════════════════\n');
      
      for (let i = 0; i < newPages.length; i++) {
        console.log(`\n[${i + 1}/${newPages.length}] ═════════════════════════════════════`);
        const pageData = prepareForTranslation(newPages[i]);
        const translated = await translateItem(pageData, pageData.slug_bg, 'page', targetLanguages);
        
        existingData.pages[pageData.slug_bg] = translated;
        
        // Save after each page
        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log(`   💾 Saved to disk`);
        
        await delay(1500);
      }
    }
    
    // Translate UPDATED pages
    if (updatedPages.length > 0) {
      console.log('\n═══════════════════════════════════════════════════');
      console.log('🔄 RE-TRANSLATING UPDATED PAGES');
      console.log('═══════════════════════════════════════════════════\n');
      
      for (let i = 0; i < updatedPages.length; i++) {
        console.log(`\n[${i + 1}/${updatedPages.length}] ═════════════════════════════════════`);
        console.log(`   ⚡ DETECTED CHANGES in WordPress`);
        const pageData = prepareForTranslation(updatedPages[i]);
        const translated = await translateItem(pageData, pageData.slug_bg, 'page', targetLanguages);
        
        existingData.pages[pageData.slug_bg] = translated;
        
        // Save after each page
        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log(`   💾 Saved to disk`);
        
        await delay(1500);
      }
    }
    
    // Translate NEW posts
    if (newPosts.length > 0) {
      console.log('\n\n═══════════════════════════════════════════════════');
      console.log('📝 TRANSLATING NEW POSTS');
      console.log('═══════════════════════════════════════════════════\n');
      
      for (let i = 0; i < newPosts.length; i++) {
        console.log(`\n[${i + 1}/${newPosts.length}] ═════════════════════════════════════`);
        const postData = prepareForTranslation(newPosts[i]);
        const translated = await translateItem(postData, postData.slug_bg, 'post', targetLanguages);
        
        existingData.posts[postData.slug_bg] = translated;
        
        // Save after each post
        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log(`   💾 Saved to disk`);
        
        await delay(1500);
      }
    }
    
    // Translate UPDATED posts
    if (updatedPosts.length > 0) {
      console.log('\n\n═══════════════════════════════════════════════════');
      console.log('🔄 RE-TRANSLATING UPDATED POSTS');
      console.log('═══════════════════════════════════════════════════\n');
      
      for (let i = 0; i < updatedPosts.length; i++) {
        console.log(`\n[${i + 1}/${updatedPosts.length}] ═════════════════════════════════════`);
        console.log(`   ⚡ DETECTED CHANGES in WordPress`);
        const postData = prepareForTranslation(updatedPosts[i]);
        const translated = await translateItem(postData, postData.slug_bg, 'post', targetLanguages);
        
        existingData.posts[postData.slug_bg] = translated;
        
        // Save after each post
        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log(`   💾 Saved to disk`);
        
        await delay(1500);
      }
    }

    if (backfillItems.length > 0) {
      console.log('\n\n═══════════════════════════════════════════════════');
      console.log('🔁 BACKFILLING MISSING LOCALES');
      console.log('═══════════════════════════════════════════════════\n');

      for (let i = 0; i < backfillItems.length; i++) {
        const item = backfillItems[i];
        console.log(`\n[${i + 1}/${backfillItems.length}] ═════════════════════════════════════`);
        console.log(`   Missing: ${item.missingLangs.join(', ').toUpperCase()}`);

        const itemData = itemDataFromExisting(item.entry, item.slug);
        const translated = await translateItem(
          itemData,
          item.slug,
          item.type,
          targetLanguages,
          item.missingLangs
        );

        existingData[item.storeKey][item.slug] = {
          ...item.entry,
          ...translated,
        };

        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log('   💾 Saved to disk');

        await delay(1500);
      }
    }
    
    console.log('\n\n═══════════════════════════════════════════════════');
    console.log('✅ TRANSLATION COMPLETE!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`📁 Saved to: ${translationsPath}`);
    console.log(`📊 Total pages: ${Object.keys(existingData.pages).length}`);
    console.log(`📊 Total posts: ${Object.keys(existingData.posts).length}`);
    console.log(`🌐 Languages: BG (source) + ${targetLanguages.join(', ').toUpperCase()}`);
    
    if (backfillItems.length > 0) {
      console.log('\n🔁 LOCALE BACKFILL SUMMARY:');
      console.log(`   Items updated: ${backfillItems.length}`);
      console.log(`   ✅ Missing locale fields filled automatically`);
    }
    
    if (updatedPages.length > 0 || updatedPosts.length > 0) {
      console.log('\n🔄 UPDATE DETECTION SUMMARY:');
      console.log(`   Pages updated: ${updatedPages.length}`);
      console.log(`   Posts updated: ${updatedPosts.length}`);
      console.log(`   ✅ Changes from WordPress automatically synced!`);
    }
    
    console.log('\n💡 Next steps:');
    console.log('   1. Test locally: npm run dev');
    console.log('   2. Build: npm run build');
    console.log('   3. Deploy: git push\n');
    
  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
