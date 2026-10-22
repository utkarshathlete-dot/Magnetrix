/**
 * Pure helper for calculating scroll progress percentage
 */

export function calculateScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollableHeight = scrollHeight - clientHeight;
  if (scrollableHeight <= 0) return 0;
  const progress = (scrollTop / scrollableHeight) * 100;
  return Math.min(100, Math.max(0, Number(progress.toFixed(2))));
}
