import type { Variants } from 'framer-motion';

export interface TransitionConfig {
  initialY: number;
  exitY: number;
  enterDuration: number;
  exitDuration: number;
  ease: [number, number, number, number];
}

export const DEFAULT_VIEW_TRANSITION: TransitionConfig = {
  initialY: 24, // Slide-up distance for entering content
  exitY: -14,
  enterDuration: 0.35,
  exitDuration: 0.2,
  ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier curve
};

export function createViewTransitionVariants(config: Partial<TransitionConfig> = {}): Variants {
  const merged: TransitionConfig = { ...DEFAULT_VIEW_TRANSITION, ...config };

  return {
    initial: {
      opacity: 0,
      y: merged.initialY,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: merged.enterDuration,
        ease: merged.ease,
      },
    },
    exit: {
      opacity: 0,
      y: merged.exitY,
      transition: {
        duration: merged.exitDuration,
        ease: 'easeIn',
      },
    },
  };
}

export function calculateSlideUpOffset(viewportWidth: number): number {
  if (viewportWidth <= 0) return 24;
  if (viewportWidth < 640) return 16; // subtle on mobile devices
  if (viewportWidth < 1024) return 20; // tablet screens
  return 24; // desktop screens
}
