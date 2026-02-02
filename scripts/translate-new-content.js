/**
 * SMART TRANSLATION SCRIPT FOR VINETKA.BG
 * Превежда САМО новите и променените страници/постове от WordPress
 * ✅ UPDATE DETECTION: Автоматично засича промени в съдържанието
 * 
 * Използва: translate-google за безплатни преводи
 * Превежда на: EN, DE, RU, TR, EL, SR, RO, MK (всички поддържани езици)
 */

const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

// WordPress API endpoint
const WORDPRESS_API = 'https://vinetka.admin-panels.com/wp-json/wp/v2';

// Поддържани езици за превод (без BG - това е източникът)
const TARGET_LANGUAGES = ['en', 'de', 'ru', 'tr', 'el', 'sr', 'ro', 'mk'];

// Delay между заявки за да не претоварим Google Translate API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Slug mappings - ако имаш специфични slug преводи
const slugMappings = {
  // Пример: "kak-da-kupim-vinetka": "how-to-buy-vignette",
  // Може да добавиш повече тук при нужда
};

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
 */
async function translateHtmlContent(htmlContent, targetLang) {
  if (!htmlContent || htmlContent.trim() === '') return '';
  
  try {
    // За големи HTML блокове, превеждаме директно
    const result = await translate(htmlContent, { from: 'bg', to: targetLang });
    return result;
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
 * Превежда един item на всички езици
 */
async function translateItem(itemData, slug, type) {
  console.log(`\n📄 Translating ${type}: ${slug}`);
  console.log(`   Title: ${itemData.title_bg}`);
  
  const translated = { ...itemData };
  
  // Превод на всеки език
  for (const lang of TARGET_LANGUAGES) {
    console.log(`\n   🌐 Translating to ${lang.toUpperCase()}...`);
    
    // Slug превод
    const customSlug = slugMappings[itemData.slug_bg];
    if (customSlug && typeof customSlug === 'object' && customSlug[lang]) {
      translated[`slug_${lang}`] = customSlug[lang];
    } else if (typeof customSlug === 'string' && lang === 'en') {
      translated[`slug_${lang}`] = customSlug;
    } else {
      // Автоматична транслитерация
      translated[`slug_${lang}`] = itemData.slug_bg;
    }
    
    // Title превод
    console.log(`      → Title...`);
    translated[`title_${lang}`] = await translateText(itemData.title_bg, lang);
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
        
        translated[`content_${lang}`] = translatedChunks.join('');
      } else {
        translated[`content_${lang}`] = await translateHtmlContent(itemData.content_bg, lang);
        await delay(1000);
      }
    } else {
      translated[`content_${lang}`] = '';
    }
    
    console.log(`      ✅ ${lang.toUpperCase()} completed`);
  }
  
  console.log(`\n   ✅ ALL LANGUAGES COMPLETED: ${translated.title_bg}`);
  return translated;
}

/**
 * Main function
 */
async function main() {
  try {
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
    console.log(`   🌐 Languages: ${TARGET_LANGUAGES.join(', ').toUpperCase()}\n`);
    
    if (newPages.length === 0 && updatedPages.length === 0 && newPosts.length === 0 && updatedPosts.length === 0) {
      console.log('✅ Everything is up to date! No new or updated content.');
      console.log('\n💡 All WordPress content is synced with translations.\n');
      return;
    }
    
    // Translate NEW pages
    if (newPages.length > 0) {
      console.log('\n═══════════════════════════════════════════════════');
      console.log('📄 TRANSLATING NEW PAGES');
      console.log('═══════════════════════════════════════════════════\n');
      
      for (let i = 0; i < newPages.length; i++) {
        console.log(`\n[${i + 1}/${newPages.length}] ═════════════════════════════════════`);
        const pageData = prepareForTranslation(newPages[i]);
        const translated = await translateItem(pageData, pageData.slug_bg, 'page');
        
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
        const translated = await translateItem(pageData, pageData.slug_bg, 'page');
        
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
        const translated = await translateItem(postData, postData.slug_bg, 'post');
        
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
        const translated = await translateItem(postData, postData.slug_bg, 'post');
        
        existingData.posts[postData.slug_bg] = translated;
        
        // Save after each post
        fs.writeFileSync(translationsPath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log(`   💾 Saved to disk`);
        
        await delay(1500);
      }
    }
    
    console.log('\n\n═══════════════════════════════════════════════════');
    console.log('✅ TRANSLATION COMPLETE!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`📁 Saved to: ${translationsPath}`);
    console.log(`📊 Total pages: ${Object.keys(existingData.pages).length}`);
    console.log(`📊 Total posts: ${Object.keys(existingData.posts).length}`);
    console.log(`🌐 Languages: BG (source) + ${TARGET_LANGUAGES.join(', ').toUpperCase()}`);
    
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
