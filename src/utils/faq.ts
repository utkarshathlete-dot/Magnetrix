/**
 * FAQ types and pure logic helpers
 */

export interface FaqItem {
  id: string;
  category: 'pricing' | 'services' | 'onboarding' | 'reporting';
  question: string;
  answer: string;
  keyTakeaway?: string;
}

export interface SchemaQuestion {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface FaqPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: SchemaQuestion[];
}

export function toggleAccordionId(
  currentOpenId: string | null,
  clickedId: string
): string | null {
  return currentOpenId === clickedId ? null : clickedId;
}

export function filterFaqs(
  faqs: FaqItem[],
  category: string,
  searchQuery: string = ''
): FaqItem[] {
  return faqs.filter((faq) => {
    const matchesCategory = category === 'all' || faq.category === category;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
}

/**
 * Generates Schema.org compliant FAQPage JSON-LD structured data
 * to qualify for Google rich snippet search results.
 */
export function generateFaqSchema(faqs: FaqItem[]): FaqPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Returns formatted JSON-LD string ready for embedding in <script type="application/ld+json">
 */
export function getFaqJsonLdString(faqs: FaqItem[]): string {
  return JSON.stringify(generateFaqSchema(faqs), null, 2);
}
