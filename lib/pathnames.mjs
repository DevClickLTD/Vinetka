/**
 * Localized URL pathnames for all 12 locales.
 * Keys are internal paths (matching the App Router filesystem).
 * Values are per-locale external URLs shown to users and search engines.
 *
 * BG paths = internal filesystem paths (unchanged).
 * All other locales get translated, SEO-friendly slugs.
 *
 * Used by:
 *  - routing.js     → next-intl middleware + Link component
 *  - lib/seo-utils.js → canonical URLs, hreflang
 *  - next.config.mjs  → 301 redirects from old BG-slug URLs
 */

export const pathnames = {
  '/': '/',

  '/contact': {
    bg: '/contact',
    en: '/contact',
    de: '/kontakt',
    ru: '/kontakt',
    tr: '/iletisim',
    el: '/epikoinonia',
    sr: '/kontakt',
    ro: '/contact',
    mk: '/kontakt',
    fr: '/contact',
    hu: '/kapcsolat',
    uk: '/kontakt',
  },

  '/za-nas': {
    bg: '/za-nas',
    en: '/about',
    de: '/ueber-uns',
    ru: '/o-nas',
    tr: '/hakkimizda',
    el: '/peri-mas',
    sr: '/o-nama',
    ro: '/despre-noi',
    mk: '/za-nas',
    fr: '/a-propos',
    hu: '/rolunk',
    uk: '/pro-nas',
  },

  '/proverka-na-vinetka': {
    bg: '/proverka-na-vinetka',
    en: '/vignette-check',
    de: '/vignette-pruefen',
    ru: '/proverka-vinjetki',
    tr: '/vinyeti-kontrol',
    el: '/elegxos-vinyetas',
    sr: '/provera-vinjete',
    ro: '/verificare-vigneta',
    mk: '/proverka-na-vinjeta',
    fr: '/verification-vignette',
    hu: '/matrica-ellenorzese',
    uk: '/perevirka-vinyetky',
  },

  '/moite-vinetki': {
    bg: '/moite-vinetki',
    en: '/my-vignettes',
    de: '/meine-vignetten',
    ru: '/moi-vinjetki',
    tr: '/vinyetlerim',
    el: '/oi-vinyetes-mou',
    sr: '/moje-vinjete',
    ro: '/vignetele-mele',
    mk: '/moite-vinjeti',
    fr: '/mes-vignettes',
    hu: '/matricaim',
    uk: '/moi-vinyetky',
  },

  '/obshti-usloviya': {
    bg: '/obshti-usloviya',
    en: '/terms-of-use',
    de: '/nutzungsbedingungen',
    ru: '/usloviya-ispolzovaniya',
    tr: '/kullanim-kosullari',
    el: '/oroi-xrisis',
    sr: '/uslovi-koriscenja',
    ro: '/termeni-si-conditii',
    mk: '/opsti-uslovi',
    fr: '/conditions-utilisation',
    hu: '/felhasznalasi-feltetelek',
    uk: '/umovy-vykorystannya',
  },

  '/privacy-policy': {
    bg: '/privacy-policy',
    en: '/privacy-policy',
    de: '/datenschutz',
    ru: '/politika-konfidencialnosti',
    tr: '/gizlilik-politikasi',
    el: '/politiki-aporrhtou',
    sr: '/politika-privatnosti',
    ro: '/politica-confidentialitate',
    mk: '/politika-za-privatnost',
    fr: '/politique-confidentialite',
    hu: '/adatvedelmi-iranyelvek',
    uk: '/polityka-konfidentsijnosti',
  },

  '/politika-za-biskvitki': {
    bg: '/politika-za-biskvitki',
    en: '/cookie-policy',
    de: '/cookie-richtlinie',
    ru: '/politika-cookie',
    tr: '/cerez-politikasi',
    el: '/politiki-cookie',
    sr: '/politika-kolacica',
    ro: '/politica-cookies',
    mk: '/politika-za-kolaci',
    fr: '/politique-cookies',
    hu: '/suti-iranyelvek',
    uk: '/polityka-cookie',
  },

  '/blog': '/blog',

  '/blog/[slug]': '/blog/[slug]',

  '/tseni': {
    bg: '/tseni',
    en: '/prices',
    de: '/preise',
    ru: '/tseny',
    tr: '/fiyatlar',
    el: '/times',
    sr: '/cene',
    ro: '/preturi',
    mk: '/ceni',
    fr: '/tarifs',
    hu: '/arak',
    uk: '/tsiny',
  },

  '/tseni/dnevna': {
    bg: '/tseni/dnevna',
    en: '/prices/daily',
    de: '/preise/taeglich',
    ru: '/tseny/dnevnaya',
    tr: '/fiyatlar/gunluk',
    el: '/times/imerisio',
    sr: '/cene/dnevna',
    ro: '/preturi/zilnica',
    mk: '/ceni/dnevna',
    fr: '/tarifs/journalier',
    hu: '/arak/napi',
    uk: '/tsiny/shchodenna',
  },

  '/tseni/uikend': {
    bg: '/tseni/uikend',
    en: '/prices/weekend',
    de: '/preise/wochenende',
    ru: '/tseny/vikend',
    tr: '/fiyatlar/hafta-sonu',
    el: '/times/savvatokyriako',
    sr: '/cene/vikend',
    ro: '/preturi/weekend',
    mk: '/ceni/vikend',
    fr: '/tarifs/week-end',
    hu: '/arak/hetvege',
    uk: '/tsiny/vikend',
  },

  '/tseni/sedmichna': {
    bg: '/tseni/sedmichna',
    en: '/prices/weekly',
    de: '/preise/woechentlich',
    ru: '/tseny/nedelnaya',
    tr: '/fiyatlar/haftalik',
    el: '/times/evdomadiaia',
    sr: '/cene/nedeljno',
    ro: '/preturi/saptamanala',
    mk: '/ceni/nedelen',
    fr: '/tarifs/hebdomadaire',
    hu: '/arak/heti',
    uk: '/tsiny/tyzhneva',
  },

  '/tseni/mesechna': {
    bg: '/tseni/mesechna',
    en: '/prices/monthly',
    de: '/preise/monatlich',
    ru: '/tseny/mesechnaya',
    tr: '/fiyatlar/aylik',
    el: '/times/meniaia',
    sr: '/cene/mesecna',
    ro: '/preturi/lunara',
    mk: '/ceni/mesecna',
    fr: '/tarifs/mensuel',
    hu: '/arak/havi',
    uk: '/tsiny/shchomisyachna',
  },

  '/tseni/trimesechna': {
    bg: '/tseni/trimesechna',
    en: '/prices/quarterly',
    de: '/preise/quartalsweise',
    ru: '/tseny/kvartalnaya',
    tr: '/fiyatlar/ucaylik',
    el: '/times/trimeniaia',
    sr: '/cene/kvartalna',
    ro: '/preturi/trimestriala',
    mk: '/ceni/kvartalna',
    fr: '/tarifs/trimestriel',
    hu: '/arak/negyedeves',
    uk: '/tsiny/kvartalna',
  },

  '/tseni/godishna': {
    bg: '/tseni/godishna',
    en: '/prices/annual',
    de: '/preise/jaehrlich',
    ru: '/tseny/godovaya',
    tr: '/fiyatlar/yillik',
    el: '/times/etisia',
    sr: '/cene/godisnja',
    ro: '/preturi/anuala',
    mk: '/ceni/godisna',
    fr: '/tarifs/annuel',
    hu: '/arak/eves',
    uk: '/tsiny/richna',
  },
};

export const locales = ['bg', 'en', 'de', 'ru', 'tr', 'el', 'sr', 'ro', 'mk', 'fr', 'hu', 'uk'];
export const defaultLocale = 'bg';

/**
 * Returns the localized external path for a given internal path and locale.
 * Falls back to the internal path if no translation is defined.
 */
export function getLocalizedPath(internalPath, locale) {
  const normalized = internalPath.startsWith('/') ? internalPath : `/${internalPath}`;
  const config = pathnames[normalized];

  if (!config) return normalized;
  if (typeof config === 'string') return config;

  return config[locale] || config['bg'] || normalized;
}
