# 🔐 Google reCAPTCHA v3 - Инструкции за настройка

## 📋 Съдържание
1. [Създаване на reCAPTCHA ключове](#1-създаване-на-recaptcha-ключове)
2. [Next.js конфигурация](#2-nextjs-конфигурация)
3. [WordPress конфигурация](#3-wordpress-конфигурация)
4. [Тестване](#4-тестване)

---

## 1. Създаване на reCAPTCHA ключове

### Стъпка 1: Отиди в Google reCAPTCHA Admin Console
👉 [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)

### Стъпка 2: Попълни формата
- **Label:** `vinetka.bg Contact Form`
- **reCAPTCHA type:** Избери **reCAPTCHA v3**
- **Domains:** Добави:
  - `vinetka.bg`
  - `localhost` (за локално тестване)
- **Accept the reCAPTCHA Terms of Service** ✓
- Натисни **Submit**

### Стъпка 3: Копирай ключовете
След създаването ще получиш 2 ключа:
- **Site Key** (публичен) - за Next.js frontend
- **Secret Key** (таен) - за WordPress backend

---

## 2. Next.js конфигурация

### Създай `.env.local` файл в root директорията
```bash
# В D:\Work\Not clients\Github Projects\Vinetka\.env.local
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=твоят_site_key_тук
```

**⚠️ ВАЖНО:** 
- Замени `твоят_site_key_тук` с реалния **Site Key** от Google
- `.env.local` файлът е gitignore-нат (не се commit-ва)
- За production (хостинг) добави същата променлива в environment variables

### Провери дали работи
```bash
npm run dev
```

Отвори `http://localhost:3000/bg/contact` и отвори Developer Console:
- Не трябва да има грешки за reCAPTCHA
- Трябва да виждаш reCAPTCHA badge в долния десен ъгъл на страницата

---

## 3. WordPress конфигурация

### Опция А: Използване на Contact Form 7 v3 reCAPTCHA Integration (ПРЕПОРЪЧИТЕЛНО)

Contact Form 7 има вградена поддръжка за reCAPTCHA v3 от версия 5.1+

#### Стъпка 1: В WordPress Admin
1. Отиди на **Contact → Integration**
2. Намери секцията **reCAPTCHA**
3. Натисни **Configure Keys**

#### Стъпка 2: Добави ключовете
- **Site Key:** Постави **Site Key** от Google (същия като в Next.js)
- **Secret Key:** Постави **Secret Key** от Google
- Натисни **Save**

#### Стъпка 3: Активирай reCAPTCHA за формата
1. Отиди на **Contact → Contact Forms**
2. Избери формата (ID: 6)
3. reCAPTCHA автоматично се активира за всички форми след конфигурацията

**✅ Готово!** Contact Form 7 автоматично ще валидира reCAPTCHA токена.

---

### Опция Б: Manual Validation (Алтернатива)

Ако искаш да правиш manual validation, може да използваш plugin или custom code:

#### Инсталирай reCAPTCHA plugin
Може да използваш:
- **Advanced Google reCAPTCHA** plugin
- **reCaptcha by BestWebSoft** plugin

ИЛИ

#### Custom Validation (с functions.php)

Добави във `functions.php`:

```php
add_filter('wpcf7_validate', 'verify_recaptcha_v3', 20, 2);

function verify_recaptcha_v3($result, $tag) {
    // Get reCAPTCHA token from POST data
    $recaptcha_token = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    
    if (empty($recaptcha_token)) {
        $result->invalidate('g-recaptcha-response', 'reCAPTCHA токенът липсва.');
        return $result;
    }
    
    // Verify with Google
    $secret_key = 'твоят_secret_key_тук'; // Замени с реалния Secret Key
    $verify_url = 'https://www.google.com/recaptcha/api/siteverify';
    
    $response = wp_remote_post($verify_url, array(
        'body' => array(
            'secret' => $secret_key,
            'response' => $recaptcha_token,
            'remoteip' => $_SERVER['REMOTE_ADDR']
        )
    ));
    
    if (is_wp_error($response)) {
        $result->invalidate('g-recaptcha-response', 'reCAPTCHA грешка при свързване.');
        return $result;
    }
    
    $response_body = wp_remote_retrieve_body($response);
    $verify_result = json_decode($response_body, true);
    
    // Check score (v3 gives score from 0.0 to 1.0)
    // 0.5 is a good threshold (higher = more likely human)
    if (!$verify_result['success'] || $verify_result['score'] < 0.5) {
        $result->invalidate('g-recaptcha-response', 'reCAPTCHA валидацията не премина. Моля, опитайте отново.');
    }
    
    return $result;
}
```

---

## 4. Тестване

### Тест на контактната форма

1. **Отвори сайта** `https://vinetka.bg/bg/contact`
2. **Попълни формата** с тестови данни
3. **Натисни Submit**

### Очаквани резултати

✅ **Успех:**
- Формата се изпраща успешно
- Получаваш success съобщение
- В WordPress получаваш email

❌ **Грешка:**
- Ако reCAPTCHA не е конфигуриран правилно, ще видиш error съобщение
- Провери Console за детайли

### Debug

#### В Next.js:
```javascript
// В contactForm.js можеш временно да добавиш:
console.log('reCAPTCHA Token:', recaptchaToken);
```

#### В WordPress:
Провери логовете в **Contact → Contact Forms → вашата форма → Mail Log**

---

## 🔒 Security Best Practices

1. **НИКОГА не commit-вай secret keys** в Git
2. **Използвай environment variables** за production
3. **Провери score threshold** - 0.5 е добър баланс
4. **Мониторинг** - провери Contact Form 7 submissions редовно

---

## 🆘 Troubleshooting

### Проблем: "reCAPTCHA все още се зарежда"
**Решение:** Изчакай 2-3 секунди след зареждане на страницата

### Проблем: reCAPTCHA badge не се показва
**Решение:** Провери дали Site Key е правилно конфигуриран в `.env.local`

### Проблем: Форма се изпраща, но WordPress отхвърля
**Решение:** 
- Провери Secret Key в WordPress
- Провери дали Contact Form 7 reCAPTCHA интеграцията е активна

### Проблем: "Invalid site key"
**Решение:** 
- Провери дали домейнът е добавен в reCAPTCHA admin console
- За localhost, увери се че `localhost` е в списъка с домейни

---

## 📞 Готово!

Сега контактната форма е защитена с Google reCAPTCHA v3! 🎉

Потребителите няма да виждат captcha challenge - всичко работи на фона, като анализира поведението и дава score.
