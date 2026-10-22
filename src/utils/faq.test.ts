import test from 'node:test';
import assert from 'node:assert/strict';
import { toggleAccordionId, filterFaqs, generateFaqSchema, getFaqJsonLdString } from './faq.ts';
import type { FaqItem } from './faq.ts';

const mockFaqs: FaqItem[] = [
  {
    id: 'pricing-1',
    category: 'pricing',
    question: 'What is your typical monthly retainer fee?',
    answer: 'Our retainers start at $5,000/month for single discipline growth engagements.',
  },
  {
    id: 'pricing-2',
    category: 'pricing',
    question: 'Are media ad spends included in your management fee?',
    answer: 'No, ad spend is paid directly to the ad platforms (Google, Meta, LinkedIn).',
  },
  {
    id: 'services-1',
    category: 'services',
    question: 'Can you work alongside our existing in-house team?',
    answer: 'Yes, we frequently operate as specialized performance extensions.',
  },
];

test('toggleAccordionId opens closed item and closes already open item', () => {
  assert.equal(toggleAccordionId(null, 'pricing-1'), 'pricing-1');
  assert.equal(toggleAccordionId('pricing-1', 'pricing-1'), null);
  assert.equal(toggleAccordionId('pricing-1', 'pricing-2'), 'pricing-2');
});

test('filterFaqs filters correctly by category', () => {
  assert.equal(filterFaqs(mockFaqs, 'all').length, 3);
  assert.equal(filterFaqs(mockFaqs, 'pricing').length, 2);
  assert.equal(filterFaqs(mockFaqs, 'services').length, 1);
});

test('filterFaqs filters correctly by search query', () => {
  const result = filterFaqs(mockFaqs, 'all', 'retainer');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'pricing-1');

  const emptyResult = filterFaqs(mockFaqs, 'all', 'cryptocurrency');
  assert.equal(emptyResult.length, 0);
});

test('generateFaqSchema produces Schema.org compliant FAQPage structured data', () => {
  const schema = generateFaqSchema(mockFaqs);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity.length, 3);

  const firstQuestion = schema.mainEntity[0];
  assert.equal(firstQuestion['@type'], 'Question');
  assert.equal(firstQuestion.name, 'What is your typical monthly retainer fee?');
  assert.equal(firstQuestion.acceptedAnswer['@type'], 'Answer');
  assert.equal(firstQuestion.acceptedAnswer.text, 'Our retainers start at $5,000/month for single discipline growth engagements.');
});

test('getFaqJsonLdString formats valid parsable JSON-LD string', () => {
  const jsonString = getFaqJsonLdString(mockFaqs);
  assert.ok(typeof jsonString === 'string');
  const parsed = JSON.parse(jsonString);
  assert.equal(parsed['@type'], 'FAQPage');
  assert.equal(parsed.mainEntity.length, 3);
  assert.equal(parsed.mainEntity[1].name, 'Are media ad spends included in your management fee?');
});

