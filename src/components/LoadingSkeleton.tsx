import React from 'react';
import { motion } from 'framer-motion';
import { getSkeletonLayoutConfig } from '../utils/initialization';

interface LoadingSkeletonProps {
  view?: 'home' | 'services' | 'blog' | 'contact' | 'about' | 'work';
  message?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  view = 'home',
  message = 'Initializing Engine & Telemetry...',
}) => {
  const config = getSkeletonLayoutConfig(view);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading application content"
      className="w-full min-h-screen bg-[#07080b] text-neutral-200 relative overflow-hidden select-none"
    >
      {/* Background ambient lighting effects */}
      <div
        className="fixed top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.07] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-[450px] h-[450px] bg-red-800/[0.04] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Shimmering Top Navbar Skeleton */}
      <header className="w-full relative z-30 pt-5 sm:pt-7 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-32 h-8 rounded-xl bg-white/[0.08] animate-pulse" />
          </div>

          {/* Desktop Capsule Skeleton */}
          <div className="hidden lg:flex items-center bg-[#0a0a0a]/80 border border-white/10 rounded-full p-1.5 gap-2 shadow-xl backdrop-blur-md">
            {Array.from({ length: config.headerItems }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-7 rounded-full bg-white/[0.05] animate-pulse"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>

          {/* Right Action Controls Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-8 rounded-xl bg-white/[0.05] border border-white/10 animate-pulse" />
            <div className="w-9 h-8 rounded-xl bg-white/[0.05] border border-white/10 animate-pulse" />
            <div className="w-28 h-9 rounded-xl bg-white/[0.12] border border-white/10 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Skeleton Body */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-20 relative z-20">
        {/* Wireframe Kicker Skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 animate-pulse" />
          <div className="w-48 h-4 rounded-md bg-white/[0.06] animate-pulse" />
        </div>

        {/* Hero Big Headline Skeleton */}
        <div className="space-y-4 max-w-3xl mb-8">
          <div className="w-full h-12 sm:h-16 rounded-2xl bg-white/[0.08] animate-pulse" />
          <div className="w-5/6 h-12 sm:h-16 rounded-2xl bg-white/[0.06] animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2/3 h-12 sm:h-16 rounded-2xl bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent border border-red-500/20 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Subtitle Paragraph Skeleton */}
        <div className="space-y-2.5 max-w-xl mb-10">
          <div className="w-full h-4 rounded bg-white/[0.05] animate-pulse" />
          <div className="w-4/5 h-4 rounded bg-white/[0.04] animate-pulse" style={{ animationDelay: '100ms' }} />
        </div>

        {/* CTA Button & Avatar Stack Skeleton */}
        <div className="flex flex-wrap items-center gap-6 mb-14">
          <div className="w-44 h-12 rounded-full bg-red-600/30 border border-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.25)] animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/[0.08] border-2 border-[#07080b] animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <div className="w-28 h-4 rounded bg-white/[0.05] animate-pulse" />
          </div>
        </div>

        {/* Stat Cards & Partner Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-44 h-24 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 flex flex-col justify-between animate-pulse">
              <div className="w-20 h-7 rounded bg-white/[0.08]" />
              <div className="w-28 h-3 rounded bg-white/[0.04]" />
            </div>
            <div className="w-44 h-24 rounded-2xl border border-red-500/40 bg-gradient-to-b from-red-950/20 to-black/40 backdrop-blur-md p-4 flex flex-col justify-between shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse">
              <div className="w-16 h-7 rounded bg-red-500/30" />
              <div className="w-24 h-3 rounded bg-white/[0.04]" />
            </div>
          </div>

          {config.partnerLogos > 0 && (
            <div className="flex items-center gap-6 opacity-60">
              {Array.from({ length: config.partnerLogos }).map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-6 rounded-lg bg-white/[0.05] animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          {Array.from({ length: config.contentCards }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col justify-between h-64 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10" />
                  <div className="w-14 h-4 rounded-full bg-red-500/15 border border-red-500/20" />
                </div>
                <div className="w-3/4 h-5 rounded bg-white/[0.08]" />
                <div className="space-y-2">
                  <div className="w-full h-3 rounded bg-white/[0.04]" />
                  <div className="w-5/6 h-3 rounded bg-white/[0.04]" />
                </div>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="w-20 h-4 rounded bg-white/[0.05]" />
                <div className="w-16 h-4 rounded bg-red-500/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Loading Indicator Pill */}
        <div className="fixed bottom-6 right-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/15 text-xs text-neutral-300 backdrop-blur-xl shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-[11px] tracking-wide">{message}</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export const CardGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between h-72 animate-pulse"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-24 h-5 rounded-md bg-red-500/20 border border-red-500/30" />
              <div className="w-16 h-4 rounded bg-white/[0.06]" />
            </div>
            <div className="w-4/5 h-6 rounded bg-white/[0.08]" />
            <div className="space-y-2">
              <div className="w-full h-3 rounded bg-white/[0.04]" />
              <div className="w-5/6 h-3 rounded bg-white/[0.04]" />
              <div className="w-2/3 h-3 rounded bg-white/[0.04]" />
            </div>
          </div>
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/[0.08]" />
              <div className="w-20 h-3 rounded bg-white/[0.05]" />
            </div>
            <div className="w-20 h-4 rounded bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
};

