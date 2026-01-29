'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../lib/navigation';
import { locales } from '../i18n/request';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative ml-4">
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="appearance-none bg-white border-2 border-[#803487] rounded-lg px-6 py-3 text-base font-semibold text-[#803487] focus:outline-none focus:ring-2 focus:ring-[#803487] focus:border-transparent shadow-md cursor-pointer min-w-[120px]"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} className="bg-white text-gray-800">
            {loc === 'bg' ? '🇧🇬 BG' : loc === 'en' ? '🇬🇧 EN' : loc === 'de' ? '🇩🇪 DE' : loc === 'ru' ? '🇷🇺 RU' : loc === 'tr' ? '🇹🇷 TR' : loc === 'el' ? '🇬🇷 EL' : loc === 'sr' ? '🇷🇸 SR' : loc === 'ro' ? '🇷🇴 RO' : loc === 'mk' ? '🇲🇰 MK' : ''}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#803487]">
        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}
