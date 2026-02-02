# 🔄 Update Detection - Автоматична Синхронизация на Промени

## 📋 Какво е Update Detection?

**Update Detection** е нова функционалност, която автоматично засича промени в WordPress съдържанието и го превежда отново, без да трябва ръчно да изтриваш постове от `wordpress-content.json`.

---

## ✨ Как работи?

### 1. **Записва `modified` дата**
При всяко превеждане, скриптът записва датата на последна промяна от WordPress:

```json
{
  "posts": {
    "kak-da-kupim-vinetka": {
      "id": 123,
      "modified": "2026-02-02T14:30:00",
      "title_bg": "Как да купим винетка",
      "content_bg": "...",
      ...
    }
  }
}
```

### 2. **Сравнява дати**
При всяко пускане на скрипта:

1. ✅ Fetch-ва всички постове от WordPress
2. ✅ Проверява дали `modified` датата се различава
3. ✅ Ако е различна → автоматично превежда отново
4. ✅ Ако е същата → прескача

### 3. **Автоматично превежда промените**
Когато промениш съдържание в WordPress admin:

- WordPress обновява `modified` датата
- Скриптът го засича при следващото пускане
- Автоматично превежда отново поста на всички езици
- Запазва новите преводи в `wordpress-content.json`

---

## 🚀 Използване

### **Автоматично (всяка неделя)**

GitHub Actions автоматично пуска скрипта:
- ✅ Проверява за нови постове
- ✅ Проверява за променени постове
- ✅ Превежда и едното, и другото
- ✅ Commit-ва и push-ва промените

**Не трябва да правиш нищо!**

---

### **Ръчно (когато искаш)**

Ако направиш промяна в WordPress и искаш веднага да се отрази:

```bash
npm run translate
```

Скриптът ще:
1. ✅ Fetch-не всички постове от WordPress
2. ✅ Засече променения пост (различна `modified` дата)
3. ✅ Превede го отново на всички езици
4. ✅ Запази промените

---

## 📊 Output на скрипта

```
🎯 CONTENT TO TRANSLATE:
   ✨ New pages: 0
   🔄 Updated pages: 0
   ✨ New posts: 0
   🔄 Updated posts: 1
   📊 Total: 1
   🌐 Languages: EN, DE, RU, TR, EL, SR, RO, MK

═══════════════════════════════════════════════════
🔄 RE-TRANSLATING UPDATED POSTS
═══════════════════════════════════════════════════

[1/1] ═════════════════════════════════════
   ⚡ DETECTED CHANGES in WordPress

📄 Translating post: kak-da-kupim-vinetka
   Title: Как да купим винетка

   🌐 Translating to EN...
      → Title...
      → Meta...
      → Content...
      ✅ EN completed

   [... all other languages ...]

   ✅ ALL LANGUAGES COMPLETED
   💾 Saved to disk

═══════════════════════════════════════════════════
✅ TRANSLATION COMPLETE!
═══════════════════════════════════════════════════

🔄 UPDATE DETECTION SUMMARY:
   Pages updated: 0
   Posts updated: 1
   ✅ Changes from WordPress automatically synced!
```

---

## 💡 Предимства

### **Преди (без Update Detection):**
1. ❌ Промениш текст в WordPress
2. ❌ Промяната НЕ се вижда на сайта
3. ❌ Трябва ръчно да изтриеш поста от JSON
4. ❌ Трябва да пуснеш скрипта
5. ✅ Тогава се отразява

### **Сега (с Update Detection):**
1. ✅ Промениш текст в WordPress
2. ✅ Пускаш `npm run translate` (или чакаш неделя)
3. ✅ Скриптът автоматично засича промяната
4. ✅ Превежда отново
5. ✅ Всичко е синхронизирано!

---

## 🔧 Технически детайли

### **Променени файлове:**
- `scripts/translate-new-content.js` - Добавена Update Detection логика

### **Нови полета в `wordpress-content.json`:**
```json
{
  "posts": {
    "example-post": {
      "modified": "2026-02-02T14:30:00",  // ✨ НОВО
      ...
    }
  }
}
```

### **WordPress API:**
Fetch-ва се `modified` поле от WordPress:
```javascript
'/posts?per_page=100&_fields=id,slug,title,content,yoast_head_json,modified'
```

### **Логика за сравнение:**
```javascript
const existingModified = existingData.posts[post.slug]?.modified;
if (existingModified && post.modified !== existingModified) {
  // Променен пост → превеждаме отново
  updatedPosts.push(post);
}
```

---

## ❓ FAQ

### **Как да принудя повторен превод на пост?**
Има два начина:

**1. Промени го в WordPress** (препоръчва се)
- Отвори поста в WordPress admin
- Направи малка промяна (добави интервал или промени текст)
- Publish
- Пусни `npm run translate`

**2. Изтрий `modified` датата от JSON**
- Отвори `wordpress-content.json`
- Намери поста
- Изтрий `"modified": "..."` полето
- Пусни `npm run translate`

### **Колко често трябва да пускам скрипта?**
- ✅ **Автоматично:** Всяка неделя в 22:00 (GitHub Actions)
- ✅ **Ръчно:** Когато направиш промяна и искаш веднага да се отрази

### **Може ли директно да редактирам `wordpress-content.json`?**
✅ **ДА!** Ако направиш малка промяна (линк, текст):
1. Редактирай директно `wordpress-content.json`
2. Запази файла
3. Рестартирай dev server (ако работиш локално)
4. Промяната се отразява веднага

За по-големи промени препоръчвам да пуснеш скрипта.

---

## 🎯 Заключение

**Update Detection** прави синхронизацията между WordPress и Next.js напълно автоматична:

✅ Промениш в WordPress → Скриптът засича → Превежда отново → Всичко синхронизирано

**Няма нужда от ръчно изтриване на постове!**

---

📅 **Добавено:** 2 февруари 2026  
👨‍💻 **Автор:** AI Assistant  
📝 **Статус:** ✅ Активно и работещо
