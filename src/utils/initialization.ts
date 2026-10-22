/**
 * Pure helper functions and configuration for application initialization and loading skeletons
 */

export interface SkeletonLayoutConfig {
  headerItems: number;
  heroLines: number;
  metricCards: number;
  partnerLogos: number;
  contentCards: number;
}

export const SKELETON_CONFIGS: Record<'home' | 'services' | 'blog' | 'contact' | 'about', SkeletonLayoutConfig> = {
  home: {
    headerItems: 5,
    heroLines: 3,
    metricCards: 2,
    partnerLogos: 5,
    contentCards: 6,
  },
  services: {
    headerItems: 5,
    heroLines: 2,
    metricCards: 3,
    partnerLogos: 0,
    contentCards: 6,
  },
  blog: {
    headerItems: 5,
    heroLines: 2,
    metricCards: 0,
    partnerLogos: 0,
    contentCards: 4,
  },
  contact: {
    headerItems: 5,
    heroLines: 2,
    metricCards: 0,
    partnerLogos: 0,
    contentCards: 1,
  },
  about: {
    headerItems: 5,
    heroLines: 3,
    metricCards: 2,
    partnerLogos: 4,
    contentCards: 9,
  },
  work: {
    headerItems: 5,
    heroLines: 3,
    metricCards: 3,
    partnerLogos: 0,
    contentCards: 7,
  },
};

export function shouldShowSkeleton(isInitializing: boolean, isFetching = false): boolean {
  return isInitializing || isFetching;
}

export function getSkeletonLayoutConfig(
  view: 'home' | 'services' | 'blog' | 'contact' | 'about' | 'work'
): SkeletonLayoutConfig {
  return SKELETON_CONFIGS[view] || SKELETON_CONFIGS.home;
}

export function calculateSkeletonStagger(index: number, step = 0.08): number {
  return Math.max(0, Math.round(index * step * 1000) / 1000);
}

export function getShimmerAnimationClass(): string {
  return 'animate-pulse bg-gradient-to-r from-white/[0.03] via-white/[0.09] to-white/[0.03] bg-[length:200%_100%]';
}
