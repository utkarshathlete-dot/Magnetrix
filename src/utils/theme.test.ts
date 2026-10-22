import test from 'node:test';
import assert from 'node:assert/strict';
import { getInitialTheme, getNextTheme } from './theme.ts';

test('getInitialTheme defaults to dark when no storage value exists', () => {
  assert.equal(getInitialTheme(null), 'dark');
  assert.equal(getInitialTheme(undefined), 'dark');
  assert.equal(getInitialTheme('unknown'), 'dark');
});

test('getInitialTheme restores light theme when stored', () => {
  assert.equal(getInitialTheme('light'), 'light');
});

test('getNextTheme toggles back and forth cleanly', () => {
  assert.equal(getNextTheme('dark'), 'light');
  assert.equal(getNextTheme('light'), 'dark');
});
