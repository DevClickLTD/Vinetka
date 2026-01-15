"use client";

import { useState } from "react";
import Script from "next/script";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

/**
 * FAQ Component with FAQPage Schema Markup
 * 
 * @param {Object} props
 * @param {Array} props.faqs - Array of FAQ objects with question and answer
 * @param {string} props.title - Section title (optional)
 * @param {string} props.subtitle - Section subtitle (optional)
 * @param {string} props.pageUrl - URL of the page for schema (optional)
 * 
 * Example usage:
 * const faqs = [
 *   {
 *     question: "Как да закупя винетка?",
 *     answer: "Можете да закупите винетка онлайн..."
 *   }
 * ];
 * 
 * <FAQ faqs={faqs} title="Често задавани въпроси" />
 */
export default function FAQ({ 
  faqs = [], 
  title = "Често задавани въпроси", 
  subtitle = "",
  pageUrl = "https://vinetka.bg"
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <>
      <Script
        id={`faq-schema-${Math.random().toString(36).substr(2, 9)}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-lg text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-purple-600">
                      {openIndex === index ? (
                        <FaChevronUp className="h-5 w-5" />
                      ) : (
                        <FaChevronDown className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
