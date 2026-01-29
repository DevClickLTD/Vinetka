import { getTranslations } from 'next-intl/server';
import { Link } from "../../../lib/navigation";
import { generateSEOMetadata } from '../../../lib/seo-utils';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations('components.privacyPolicy');
  
  return generateSEOMetadata({
    locale,
    path: 'privacy-policy',
    title: t('pageTitle'),
    description: t('pageDescription'),
    image: '/default.webp',
  });
}

export default async function PrivacyPolicy() {
  const t = await getTranslations('components.privacyPolicy');

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {t('title')}
        </h1>
        
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('introduction') }} />
        <p className="mb-4">
          <a href="https://www.vinetka.bg" className="text-purple-600 hover:text-purple-800">www.vinetka.bg</a>.
        </p>

        <p className="mb-4">
          {t('contactInfo')}
        </p>

        <p className="mb-6">
          {t('updatePolicy')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.definitions.title')}
        </h2>

        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.personalData') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.processing') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.personalDataFile') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.controller') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.processor') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.dataSubject') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.consent') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.dataBreach') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.platform') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.roadTaxes') }} />
        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.definitions.electronicVignette') }} />
        <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('sections.definitions.compensatoryTax') }} />

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.generalProvisions.title')}
        </h2>

        <p className="mb-4">
          {t('sections.generalProvisions.compliance')}
        </p>

        <p className="mb-4">
          {t('sections.generalProvisions.internalProcedures')}
        </p>

        <p className="mb-6">
          {t('sections.generalProvisions.legitimateInterest')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.purposes.title')}
        </h2>

        <p className="mb-4">
          {t('sections.purposes.principles')}
        </p>

        <p className="mb-4">
          {t('sections.purposes.dataSharing')}
        </p>

        <p className="mb-4">
          {t('sections.purposes.dataCollection')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.userProfile')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.additionalInfo')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.vignettePurchase')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.contactForm')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.comments')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.socialMedia')}
        </p>

        <p className="mb-2">
          {t('sections.purposes.browsing')}
        </p>

        <p className="mb-6">
          {t('sections.purposes.sensitiveData')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.dataTransfer.title')}
        </h2>

        <p className="mb-4">
          {t('sections.dataTransfer.recipients')}
        </p>

        <p className="mb-2">
          {t('sections.dataTransfer.dsiAd')}
        </p>
        <p className="mb-2">{t('sections.dataTransfer.api')}</p>
        <p className="mb-2">{t('sections.dataTransfer.courier')}</p>
        <p className="mb-2">{t('sections.dataTransfer.payment')}</p>
        <p className="mb-4">{t('sections.dataTransfer.legal')}</p>

        <p className="mb-4">
          {t('sections.dataTransfer.guarantee')}
        </p>

        <p className="mb-4">
          {t('sections.dataTransfer.apiProcessing')}
        </p>

        <p className="mb-6">
          {t('sections.dataTransfer.phoneRecording')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.security.title')}
        </h2>

        <p className="mb-4">
          {t('sections.security.intro')}
        </p>

        <ul className="list-disc pl-6 mb-4 space-y-1">
          {t.raw('sections.security.measures').map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>

        <p className="mb-6">
          {t('sections.security.disclaimer')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.retention.title')}
        </h2>

        <p className="mb-6">
          {t('sections.retention.period')}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          {t('sections.rights.title')}
        </h2>

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.informationRight') }} />

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.accessRight') }} />

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.rectificationRight') }} />

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.erasureRight.title') }} />

        <ul className="list-disc pl-6 mb-4">
          {t.raw('sections.rights.erasureRight.conditions').map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>

        <p className="mb-4">
          {t('sections.rights.erasureRight.contact')}
        </p>

        <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('sections.rights.restrictionRight.title') }} />
        {t.raw('sections.rights.restrictionRight.conditions').map((condition, index) => (
          <p key={index} className="mb-2">{condition}</p>
        ))}

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.portabilityRight') }} />

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.objectionRight') }} />

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.automatedDecisionRight') }} />

        <p className="mb-4">
          {t('sections.rights.profilingDefinition')}
        </p>

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('sections.rights.legalProtection.title') }} />

        <p className="mb-2">
          {t('sections.rights.legalProtection.supervisoryAuthority')}
        </p>

        <p className="mb-4">
          {t('sections.rights.legalProtection.court')}
        </p>
        
        <p className="mb-2">
          {t('sections.rights.legalProtection.email')}
        </p>
        
        <p className="mb-4">
          {t('sections.rights.legalProtection.mail')}
        </p>
        
        <p className="mb-4">
          {t('sections.rights.legalProtection.responseTime')}
        </p>

        <p className="mb-4">
          {t('sections.rights.legalProtection.questions')}
        </p>

        <p className="mb-4">
          {t('sections.rights.legalProtection.effectiveDate')}
        </p>
      </div>
    </div>
  );
}