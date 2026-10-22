/**
 * Pure business logic and calculation helpers for Magentrix marketing metrics
 */

export interface MetricItem {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  highlighted?: boolean;
}

export interface PartnerBrand {
  name: string;
  tagline: string;
  category: string;
}

export interface AgencyService {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'acquisition' | 'optimization' | 'creative';
  headline: string;
  description: string;
  deliverables: string[];
  impactMetric: {
    value: string;
    label: string;
  };
}

export function formatMetricNumber(val: number, suffix = '+'): string {
  if (val >= 1000) {
    return `${Math.floor(val / 1000)}K${suffix}`;
  }
  return `${val}${suffix}`;
}

export function calculateRetentionRatio(retained: number, total: number): string {
  if (total === 0) return '0%';
  const ratio = Math.round((retained / total) * 100);
  return `${Math.min(100, Math.max(0, ratio))}%`;
}

export function validateInquiryForm(formData: {
  name?: string;
  email?: string;
  website?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Full name is required';
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'A valid corporate or business email is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterServicesByCategory<T extends AgencyService>(
  services: T[],
  category: string
): T[] {
  if (!category || category === 'all') return services;
  return services.filter((s) => s.category === category);
}
