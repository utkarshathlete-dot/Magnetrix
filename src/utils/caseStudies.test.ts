import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateGrowthPercentage,
  formatCurrencyValue,
  getCaseStudyById,
} from './caseStudies.ts';
import type { CaseStudy } from './caseStudies.ts';

const mockStudies: CaseStudy[] = [
  {
    id: 'brandflow',
    client: 'BrandFlow',
    industry: 'B2B SaaS',
    duration: '6 Months',
    headlineMetric: '+346%',
    headlineMetricLabel: 'Traffic growth',
    secondaryMetric: '$720K',
    secondaryMetricLabel: 'Pipeline added',
    summary: 'SEO transformation',
    strategyDeliverables: ['Technical SEO', 'Keyword Architecture'],
    testimonial: {
      quote: 'Great growth',
      author: 'Elena Vance',
      role: 'VP Growth',
    },
    metricsData: [
      { month: 'M1', traffic: 18500, revenue: 120000, roi: 3.2 },
      { month: 'M6', traffic: 82600, revenue: 720000, roi: 7.8 },
    ],
  },
];

test('calculateGrowthPercentage computes correct signed percentages', () => {
  assert.equal(calculateGrowthPercentage(18500, 82600), '+346%');
  assert.equal(calculateGrowthPercentage(100, 50), '-50%');
  assert.equal(calculateGrowthPercentage(100, 100), '+0%');
  assert.equal(calculateGrowthPercentage(0, 100), '0%');
});

test('formatCurrencyValue formats values in M and K abbreviations', () => {
  assert.equal(formatCurrencyValue(1500000), '$1.5M');
  assert.equal(formatCurrencyValue(720000), '$720K');
  assert.equal(formatCurrencyValue(500), '$500');
});

test('getCaseStudyById returns correct study or undefined', () => {
  const study = getCaseStudyById(mockStudies, 'brandflow');
  assert.equal(study?.client, 'BrandFlow');
  assert.equal(getCaseStudyById(mockStudies, 'non-existent'), undefined);
});
