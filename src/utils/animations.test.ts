import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_VIEW_TRANSITION,
  createViewTransitionVariants,
  calculateSlideUpOffset,
} from './animations.ts';

test('DEFAULT_VIEW_TRANSITION provides slight slide-up initial Y offset and smooth duration', () => {
  assert.equal(DEFAULT_VIEW_TRANSITION.initialY, 24);
  assert.equal(DEFAULT_VIEW_TRANSITION.exitY, -14);
  assert.ok(DEFAULT_VIEW_TRANSITION.enterDuration >= 0.3);
  assert.deepEqual(DEFAULT_VIEW_TRANSITION.ease, [0.22, 1, 0.36, 1]);
});

test('createViewTransitionVariants produces framer-motion variants with slide-up entrance', () => {
  const variants = createViewTransitionVariants() as Record<string, any>;

  assert.equal(variants.initial.opacity, 0);
  assert.equal(variants.initial.y, 24);

  assert.equal(variants.animate.opacity, 1);
  assert.equal(variants.animate.y, 0);
  assert.equal(variants.animate.transition.duration, 0.35);

  assert.equal(variants.exit.opacity, 0);
  assert.equal(variants.exit.y, -14);
});

test('createViewTransitionVariants allows custom override of slide-up parameters', () => {
  const custom = createViewTransitionVariants({ initialY: 30, enterDuration: 0.4 }) as Record<string, any>;
  assert.equal(custom.initial.y, 30);
  assert.equal(custom.animate.transition.duration, 0.4);
  assert.equal(custom.exit.y, -14);
});

test('calculateSlideUpOffset returns responsive values based on viewport width', () => {
  assert.equal(calculateSlideUpOffset(375), 16); // Mobile
  assert.equal(calculateSlideUpOffset(768), 20); // Tablet
  assert.equal(calculateSlideUpOffset(1440), 24); // Desktop
  assert.equal(calculateSlideUpOffset(0), 24); // Fallback
});
