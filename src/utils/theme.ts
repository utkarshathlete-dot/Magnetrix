/**
 * Pure theme helper utilities
 */

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'magentrix_theme';

export function getInitialTheme(storedValue?: string | null): Theme {
  if (storedValue === 'light') return 'light';
  return 'dark'; // Default to dark cybernetic aesthetic
}

export function getNextTheme(currentTheme: Theme): Theme {
  return currentTheme === 'dark' ? 'light' : 'dark';
}
