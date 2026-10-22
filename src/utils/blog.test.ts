import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMaxSlideIndex,
  getNextSlideIndex,
  getPrevSlideIndex,
  getVisiblePosts,
  filterBlogPosts,
  validateNewsletterEmail,
  calculateEstimatedReadTime,
} from './blog.ts';
import type { BlogPost } from './blog.ts';

const mockPosts: BlogPost[] = [
  {
    id: 'post-1',
    category: 'Paid Search',
    title: 'Deconstructing PMax',
    teaser: 'Algorithmic dayparting insights',
    readTime: '8 min read',
    publishDate: 'Oct 2026',
    author: { name: 'Alexander Vance', role: 'Head of Growth', initials: 'AV' },
    keyTakeaway: 'Always cap max CPA',
  },
  {
    id: 'post-2',
    category: 'Technical SEO',
    title: 'The 2026 Entity SEO Playbook',
    teaser: 'Machine-readable schemas',
    readTime: '11 min read',
    publishDate: 'Oct 2026',
    author: { name: 'Elena Rostova', role: 'SEO Architect', initials: 'ER' },
    keyTakeaway: 'Prioritize Schema.org graphs',
  },
  {
    id: 'post-3',
    category: 'Telemetry',
    title: 'Server-Side Attribution',
    teaser: 'Cookieless tracking architecture',
    readTime: '9 min read',
    publishDate: 'Sep 2026',
    author: { name: 'David Kalu', role: 'Telemetry Lead', initials: 'DK' },
    keyTakeaway: 'First-party tracking is resilient',
  },
  {
    id: 'post-4',
    category: 'Creative',
    title: 'Modular Motion Creative',
    teaser: 'High-velocity video systems',
    readTime: '6 min read',
    publishDate: 'Sep 2026',
    author: { name: 'Maya Lindqvist', role: 'Creative Lead', initials: 'ML' },
    keyTakeaway: 'Modular hooks lower fatigue',
  },
];

test('calculateMaxSlideIndex computes correct upper bounds', () => {
  assert.equal(calculateMaxSlideIndex(6, 3), 1);
  assert.equal(calculateMaxSlideIndex(4, 2), 1);
  assert.equal(calculateMaxSlideIndex(5, 3), 1);
  assert.equal(calculateMaxSlideIndex(0, 3), 0);
});

test('getNextSlideIndex and getPrevSlideIndex cycle smoothly', () => {
  const maxIdx = 2; // indices 0, 1, 2
  assert.equal(getNextSlideIndex(0, maxIdx), 1);
  assert.equal(getNextSlideIndex(1, maxIdx), 2);
  assert.equal(getNextSlideIndex(2, maxIdx), 0); // loop back

  assert.equal(getPrevSlideIndex(0, maxIdx), 2); // loop to end
  assert.equal(getPrevSlideIndex(2, maxIdx), 1);
  assert.equal(getPrevSlideIndex(1, maxIdx), 0);
});

test('getVisiblePosts slices posts for slide pages', () => {
  const page0 = getVisiblePosts(mockPosts, 0, 2);
  assert.equal(page0.length, 2);
  assert.equal(page0[0].id, 'post-1');
  assert.equal(page0[1].id, 'post-2');

  const page1 = getVisiblePosts(mockPosts, 1, 2);
  assert.equal(page1.length, 2);
  assert.equal(page1[0].id, 'post-3');
});

test('filterBlogPosts filters accurately by category', () => {
  const seoOnly = filterBlogPosts(mockPosts, 'Technical SEO', '');
  assert.equal(seoOnly.length, 1);
  assert.equal(seoOnly[0].id, 'post-2');

  const all = filterBlogPosts(mockPosts, 'all', '');
  assert.equal(all.length, 4);
});

test('filterBlogPosts filters by search query across titles and teasers', () => {
  const attribution = filterBlogPosts(mockPosts, 'all', 'attribution');
  assert.equal(attribution.length, 1);
  assert.equal(attribution[0].id, 'post-3');

  const vance = filterBlogPosts(mockPosts, 'all', 'Alexander');
  assert.equal(vance.length, 1);
  assert.equal(vance[0].id, 'post-1');
});

test('validateNewsletterEmail validates valid and invalid addresses', () => {
  assert.equal(validateNewsletterEmail('growth@company.com'), true);
  assert.equal(validateNewsletterEmail('invalid-email'), false);
  assert.equal(validateNewsletterEmail(''), false);
});

test('calculateEstimatedReadTime handles word counts gracefully', () => {
  assert.equal(calculateEstimatedReadTime(0), '1 min read');
  assert.equal(calculateEstimatedReadTime(500), '3 min read');
  assert.equal(calculateEstimatedReadTime(1400), '7 min read');
});
