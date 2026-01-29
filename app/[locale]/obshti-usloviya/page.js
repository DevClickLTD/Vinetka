import { getTranslations } from 'next-intl/server';
import { Link } from "../../../lib/navigation";
import { generateSEOMetadata } from '../../../lib/seo-utils';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('components.termsOfUse');
  
  return generateSEOMetadata({
    locale,
    path: 'obshti-usloviya',
    title: t('pageTitle'),
    description: t('pageDescription'),
    image: '/default.webp',
  });
}

export default async function TermsOfUse() {
  const t = await getTranslations('components.termsOfUse');

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {t('title')}
        </h1>
        
        <p className="mb-4">
          {t('introduction')}
        </p>

        <p className="mb-4">
          {t('companyInfo')}
        </p>

        <p className="mb-4">
          {t('phone')}
        </p>

        <p className="mb-6">
          {t('partnership')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.generalProvisions.title')}
        </h2>

        <p className="mb-4">
          {t('sections.generalProvisions.description')}
        </p>

        <p className="mb-4">
          {t('sections.generalProvisions.termsRegulation')}
        </p>

        <p className="mb-6">
          {t('sections.generalProvisions.updateRights')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.usageRules.title')}
        </h2>

        <p className="mb-4">
          {t('sections.usageRules.registration')}
        </p>

        <p className="mb-4">
          {t('sections.usageRules.emailRequirement')}
        </p>

        <p className="mb-6">
          {t('sections.usageRules.pricing')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.intellectualProperty.title')}
        </h2>

        <p className="mb-6">
          {t('sections.intellectualProperty.content')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.purchases.title')}
        </h2>

        <p className="mb-4">
          {t('sections.purchases.process')}
        </p>

        <p className="mb-4">
          {t('sections.purchases.vignetteRequirements')}
        </p>

        <p className="mb-6">
          {t('sections.purchases.vignetteCheck')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.withdrawalRights.title')}
        </h2>

        <p className="mb-4">
          {t('sections.withdrawalRights.timeLimit')}
        </p>

        <p className="mb-6">
          {t('sections.withdrawalRights.noWithdrawal')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.dataProtection.title')}
        </h2>

        <p className="mb-6">
          {t('sections.dataProtection.policy')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.payments.title')}
        </h2>

        <p className="mb-6">
          {t('sections.payments.pricing')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.forcemajeure.title')}
        </h2>

        <p className="mb-6">
          {t('sections.forcemajeure.definition')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.applicableLaw.title')}
        </h2>

        <p className="mb-4">
          {t('sections.applicableLaw.content')}
        </p>

        <p className="mb-4">
          {t('sections.applicableLaw.effectiveDate')}
        </p>
      </div>
    </div>
  );
}