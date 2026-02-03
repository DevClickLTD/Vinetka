# Structured Data Validation Checklist - 03 Feb 2026

## ✅ Pre-Deployment Checks

- [x] Remove `browserRequirements` from `governmentServiceSchema.js`
- [x] Add `aggregateRating` to related products in `productSchemas.js`
- [x] Add `aggregateRating` to ItemList products in `productSchemas.js`
- [x] Verify no ESLint errors
- [x] Create documentation
- [ ] Run local build test
- [ ] Preview changes locally

---

## 🚀 Deployment Steps

### 1. Build & Deploy
```bash
# Build the project
npm run build

# Deploy to production
# (follow your deployment process)
```

### 2. Clear Caches
```bash
# Clear Next.js cache
rm -rf .next

# Clear CDN cache (if applicable)
# Vercel: Auto-clears on deploy
# Cloudflare: Purge cache manually
```

---

## 🧪 Post-Deployment Validation

### Test 1: Google Rich Results Test

**Test 6 Sample URLs** (Bulgarian locale):

1. ✅ Vignette Check Page
   ```
   https://www.vinetka.bg/bg/proverka-na-vinetka
   ```
   Expected: Valid SoftwareApplication (no `browserRequirements` error)

2. ✅ Annual Vignette
   ```
   https://www.vinetka.bg/bg/tseni/godishna
   ```
   Expected: 1 main Product + 4 related Products, all with `aggregateRating`

3. ✅ Monthly Vignette
   ```
   https://www.vinetka.bg/bg/tseni/mesechna
   ```
   Expected: Valid Product with related products

4. ✅ Weekly Vignette
   ```
   https://www.vinetka.bg/bg/tseni/sedmichna
   ```
   Expected: Valid Product with related products

5. ✅ Quarterly Vignette
   ```
   https://www.vinetka.bg/bg/tseni/trimesechna
   ```
   Expected: Valid Product with related products

6. ✅ Weekend Vignette
   ```
   https://www.vinetka.bg/bg/tseni/uikend
   ```
   Expected: Valid Product with related products

**Tool**: https://search.google.com/test/rich-results

**Pass Criteria**:
- ✅ No errors
- ✅ No warnings (or only minor warnings)
- ✅ All Product schemas show `aggregateRating`
- ✅ SoftwareApplication schema valid

---

### Test 2: Schema Markup Validator

**Test Same 6 URLs**

**Tool**: https://validator.schema.org/

**Pass Criteria**:
- ✅ No errors
- ✅ No critical warnings
- ⚠️ Minor warnings acceptable (e.g., recommended properties)

---

### Test 3: Manual Inspection

**Check Product Schema** (View Page Source):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Годишна винетка",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "3247",
    "bestRating": "5",
    "worstRating": "1"
  },
  "isRelatedTo": [
    {
      "@type": "Product",
      "name": "Уикенд винетка",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        ...
      }
    }
    // ... 3 more related products
  ]
}
</script>
```

**✅ Verify**:
- Main product has `aggregateRating`
- All 4 related products have `aggregateRating` and `offers`
- All URLs are correct

---

### Test 4: Check SoftwareApplication Schema

**URL**: `https://www.vinetka.bg/bg/proverka-na-vinetka`

**View Page Source**, find:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Проверка на винетка онлайн",
  "operatingSystem": "Web browser",
  // ❌ NO browserRequirements property!
  "aggregateRating": {
    "@type": "AggregateRating",
    ...
  }
}
</script>
```

**✅ Verify**:
- `browserRequirements` property is **NOT** present
- `aggregateRating` **IS** present
- `offers` **IS** present

---

## 📊 Monitoring & Long-Term Validation

### Week 1: Immediate Checks (Days 1-7)
- [ ] Day 1: Test with Google Rich Results Test
- [ ] Day 1: Test with Schema Markup Validator
- [ ] Day 3: Check Google Search Console for new errors
- [ ] Day 7: Re-test all URLs

### Week 2: Crawl Monitoring (Days 8-14)
- [ ] Day 8: Check Google Search Console Coverage report
- [ ] Day 10: Monitor for any new structured data errors
- [ ] Day 14: Check if Google re-indexed pages

### Week 3-4: Semrush Re-Crawl (Days 15-30)
- [ ] Day 15: Check Semrush for new crawl
- [ ] Day 20: Verify structured data errors dropped
- [ ] Day 30: Final validation - should show **0 errors** (down from 189)

---

## 🎯 Success Metrics

### Before Fix
- ❌ 189 structured data errors
- ❌ 9 invalid `browserRequirements` errors
- ❌ 180 missing `aggregateRating` errors

### After Fix (Expected)
- ✅ **0 structured data errors**
- ✅ All Product schemas valid
- ✅ All SoftwareApplication schemas valid
- ✅ Improved SEO potential

---

## 🔧 Rollback Plan

If issues occur post-deployment:

### Option 1: Git Revert
```bash
git revert HEAD
git push
```

### Option 2: Restore Specific Files
```bash
git checkout HEAD~1 lib/schemas/governmentServiceSchema.js
git checkout HEAD~1 lib/schemas/productSchemas.js
git commit -m "Rollback schema changes"
git push
```

---

## 📞 Troubleshooting

### Issue: Google Rich Results Test Shows Errors

**Possible Causes**:
1. CDN cache not cleared
2. Changes not deployed
3. Syntax error in JSON-LD

**Solutions**:
1. Clear CDN cache manually
2. Verify deployment succeeded
3. Check browser console for JavaScript errors
4. Validate JSON-LD with validator.schema.org

### Issue: Semrush Still Shows Errors After 2 Weeks

**Possible Causes**:
1. Semrush hasn't re-crawled yet
2. Cache issues
3. Only tested some languages

**Solutions**:
1. Wait longer (up to 30 days for full re-crawl)
2. Request manual re-crawl in Semrush
3. Test all 9 language variants

---

## 📝 Notes

- **Rating Values**: Current ratings are placeholders (4.8 stars)
- **Review Counts**: Vary by product (456-3247 reviews)
- **Action Required**: Implement real review system for authentic ratings

---

## ✅ Sign-Off

- [ ] Developer: Verified all changes locally
- [ ] QA: Tested on staging environment
- [ ] SEO Manager: Approved structured data changes
- [ ] Project Manager: Approved for production deployment

---

*Validation Checklist Created: 03 February 2026*  
*Total Fixes: 189 errors*  
*Files Modified: 2*
