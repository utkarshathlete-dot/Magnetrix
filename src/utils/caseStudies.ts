/**
 * Pure data and computation helpers for Case Studies metrics
 */

export interface CaseStudyDataPoint {
  month: string;
  traffic: number;
  revenue: number;
  roi: number;
  cac?: number;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  duration: string;
  headlineMetric: string;
  headlineMetricLabel: string;
  secondaryMetric: string;
  secondaryMetricLabel: string;
  summary: string;
  strategyDeliverables: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  metricsData: CaseStudyDataPoint[];
}

export function calculateGrowthPercentage(initial: number, final: number): string {
  if (initial === 0) return '0%';
  const growth = Math.round(((final - initial) / initial) * 100);
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth}%`;
}

export function getCaseStudyById(studies: CaseStudy[], id: string): CaseStudy | undefined {
  return studies.find((study) => study.id === id);
}

export function formatCurrencyValue(val: number): string {
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`;
  }
  if (val >= 1000) {
    return `$${Math.round(val / 1000)}K`;
  }
  return `$${val}`;
}
