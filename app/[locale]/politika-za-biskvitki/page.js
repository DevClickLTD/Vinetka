import { getTranslations } from 'next-intl/server';
import Link from "next/link";

export async function generateMetadata() {
  const t = await getTranslations('components.cookiePolicy');
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function CookiesPolicy() {
  const t = await getTranslations('components.cookiePolicy');

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {t('title')}
        </h1>
        
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('introduction') }} />
        <p className="mb-4">
          <a href="http://www.vinetka.bg" className="text-purple-600 hover:text-purple-800">www.vinetka.bg</a>.
        </p>

        <p className="mb-4">
          {t('contactInfo')}
        </p>

        <p className="mb-4">
          {t('updatePolicy')}
        </p>

        <p className="mb-6">
          {t('compliance')}
        </p>

        <p className="mb-6">
          {t('purpose')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.whatAreCookies.title')}
        </h2>

        <p className="mb-4">
          {t('sections.whatAreCookies.definition')}
        </p>

        <p className="mb-4">
          {t('sections.whatAreCookies.invitation')}
        </p>

        <p className="mb-6">
          {t('sections.whatAreCookies.types')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.browserManagement.title')}
        </h2>

        <p className="mb-4">
          {t('sections.browserManagement.description')}
        </p>

        <p className="mb-4">
          {t('sections.browserManagement.deletion')}
        </p>

        <ul className="list-disc pl-6 mb-4 space-y-2">
          {t.raw('sections.browserManagement.browsers').map((browser, index) => (
            <li key={index}>
              {browser.name}
              <br />
              <a href={browser.url} className="text-purple-600 hover:text-purple-800 break-all">
                {browser.url}
              </a>
            </li>
          ))}
        </ul>

        <p className="mb-6">
          {t('sections.browserManagement.moreInfo')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.blocking.title')}
        </h2>

        <p className="mb-4">
          {t('sections.blocking.consequences')}
        </p>

        <p className="mb-4">
          {t('sections.blocking.settings')}
        </p>

        <p className="mb-6">
          {t('sections.blocking.details')}
        </p>

        <p className="mb-4">
          {t('sections.contact')}
        </p>

        <p className="mb-4">
          {t('sections.effectiveDate')}
        </p>
      </div>
    </div>
  );
}