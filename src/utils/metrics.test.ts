import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatMetricNumber,
  calculateRetentionRatio,
  validateInquiryForm,
  filterServicesByCategory,
} from './metrics.ts';
import type { AgencyService } from './metrics.ts';

test('formatMetricNumber formats thousands with K suffix', () => {
  assert.equal(formatMetricNumber(50000), '50K+');
  assert.equal(formatMetricNumber(250), '250+');
  assert.equal(formatMetricNumber(1000), '1K+');
});

test('calculateRetentionRatio computes correct percentage bounded by 100', () => {
  assert.equal(calculateRetentionRatio(95, 100), '95%');
  assert.equal(calculateRetentionRatio(19, 20), '95%');
  assert.equal(calculateRetentionRatio(0, 100), '0%');
  assert.equal(calculateRetentionRatio(110, 100), '100%');
});

test('validateInquiryForm handles valid and invalid fields', () => {
  const valid = validateInquiryForm({
    name: 'Sarah Connor',
    email: 'sarah@skynet.ai',
    website: 'skynet.ai',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  const invalid = validateInquiryForm({
    name: '',
    email: 'bad-email',
  });
  assert.equal(invalid.isValid, false);
  assert.equal(typeof invalid.errors.name, 'string');
  assert.equal(typeof invalid.errors.email, 'string');
});

test('filterServicesByCategory returns all when category is all', () => {
  const mockServices: AgencyService[] = [
    {
      id: 'seo',
      number: '01.',
      title: 'Search Engine Optimization',
      shortTitle: 'SEO',
      category: 'acquisition',
      headline: 'Organic search growth',
      description: 'Technical audits and keyword systems',
      deliverables: ['Audit', 'Keywords'],
      impactMetric: { value: '+240%', label: 'Organic traffic' },
    },
    {
      id: 'cro',
      number: '02.',
      title: 'Conversion Rate Optimization',
      shortTitle: 'CRO',
      category: 'optimization',
      headline: 'Funnel lift',
      description: 'A/B testing and friction removal',
      deliverables: ['A/B Testing', 'Heatmaps'],
      impactMetric: { value: '+38%', label: 'Conversion rate' },
    },
  ];

  assert.equal(filterServicesByCategory(mockServices, 'all').length, 2);
  assert.equal(filterServicesByCategory(mockServices, 'acquisition').length, 1);
  assert.equal(filterServicesByCategory(mockServices, 'acquisition')[0].id, 'seo');
  assert.equal(filterServicesByCategory(mockServices, 'creative').length, 0);
});
