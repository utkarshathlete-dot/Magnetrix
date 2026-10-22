import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScrollProgress } from './scrollProgress.ts';

test('calculateScrollProgress returns 0 at top of page', () => {
  assert.equal(calculateScrollProgress(0, 2000, 1000), 0);
});

test('calculateScrollProgress returns 50 at midpoint', () => {
  assert.equal(calculateScrollProgress(500, 2000, 1000), 50);
});

test('calculateScrollProgress returns 100 at bottom of page', () => {
  assert.equal(calculateScrollProgress(1000, 2000, 1000), 100);
});

test('calculateScrollProgress clamps values between 0 and 100', () => {
  assert.equal(calculateScrollProgress(-50, 2000, 1000), 0);
  assert.equal(calculateScrollProgress(1500, 2000, 1000), 100);
});

test('calculateScrollProgress handles unscrollable pages gracefully', () => {
  assert.equal(calculateScrollProgress(0, 800, 800), 0);
  assert.equal(calculateScrollProgress(0, 500, 800), 0);
});
