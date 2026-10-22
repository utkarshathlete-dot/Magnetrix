import test from 'node:test';
import assert from 'node:assert/strict';
import {
  shouldShowSkeleton,
  getSkeletonLayoutConfig,
  calculateSkeletonStagger,
  getShimmerAnimationClass,
  SKELETON_CONFIGS,
} from './initialization.ts';

test('shouldShowSkeleton returns true if initializing or fetching', () => {
  assert.equal(shouldShowSkeleton(true, false), true);
  assert.equal(shouldShowSkeleton(false, true), true);
  assert.equal(shouldShowSkeleton(true, true), true);
  assert.equal(shouldShowSkeleton(false, false), false);
});

test('getSkeletonLayoutConfig returns distinct configs for views', () => {
  const home = getSkeletonLayoutConfig('home');
  assert.equal(home.headerItems, 5);
  assert.equal(home.metricCards, 2);
  assert.equal(home.partnerLogos, 5);

  const blog = getSkeletonLayoutConfig('blog');
  assert.equal(blog.contentCards, 4);

  const fallback = getSkeletonLayoutConfig('unknown' as any);
  assert.equal(fallback.headerItems, 5);
});

test('calculateSkeletonStagger computes monotonic non-negative offsets', () => {
  assert.equal(calculateSkeletonStagger(0), 0);
  assert.equal(calculateSkeletonStagger(1, 0.1), 0.1);
  assert.equal(calculateSkeletonStagger(3, 0.05), 0.15);
  assert.equal(calculateSkeletonStagger(-2), 0);
});

test('getShimmerAnimationClass returns valid tailwind animation classes', () => {
  const classes = getShimmerAnimationClass();
  assert.ok(classes.includes('animate-pulse'));
  assert.ok(classes.includes('bg-gradient-to-r'));
});
