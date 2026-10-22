import test from 'node:test';
import assert from 'node:assert/strict';
import { filterSuccessStories, truncateQuote } from './testimonials.ts';
import type { ClientSuccessStory } from './testimonials.ts';

const mockStories: ClientSuccessStory[] = [
  {
    id: 'brandflow',
    client: 'BrandFlow',
    industry: 'saas',
    industryLabel: 'Enterprise SaaS',
    metricBadge: '+346% Pipeline',
    metricHighlight: '+346%',
    quote: 'Magentrix transformed our organic traffic into a compounding pipeline engine.',
    author: {
      name: 'Elena Vance',
      role: 'VP of Growth',
      company: 'BrandFlow',
      avatarColor: 'amber',
      initials: 'EV',
    },
  },
  {
    id: 'novascale',
    client: 'NovaScale',
    industry: 'cloud',
    industryLabel: 'Cloud Infrastructure',
    metricBadge: '-42% CAC',
    metricHighlight: '-42%',
    quote: 'Cut our acquisition costs by nearly half in 90 days.',
    author: {
      name: 'Marcus Chen',
      role: 'CMO',
      company: 'NovaScale',
      avatarColor: 'indigo',
      initials: 'MC',
    },
  },
];

test('filterSuccessStories filters by industry accurately', () => {
  assert.equal(filterSuccessStories(mockStories, 'all').length, 2);
  assert.equal(filterSuccessStories(mockStories, 'saas').length, 1);
  assert.equal(filterSuccessStories(mockStories, 'saas')[0].client, 'BrandFlow');
  assert.equal(filterSuccessStories(mockStories, 'fintech').length, 0);
});

test('truncateQuote shortens long quotes cleanly', () => {
  const quote = 'Magentrix transformed our organic traffic into a compounding pipeline engine.';
  assert.equal(truncateQuote(quote, 20), 'Magentrix transforme...');
  assert.equal(truncateQuote(quote, 200), quote);
});
