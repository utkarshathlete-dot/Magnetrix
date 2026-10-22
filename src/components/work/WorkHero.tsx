import React from 'react';
import { ArrowRight, MessageCircle, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

interface WorkHeroProps {
  brandsServedCount: number;
  onOpenConsultation: () => void;
}

export const WorkHero: React.FC<WorkHeroProps> = ({
  brandsServedCount,
  onOpenConsultation,
}) => {
  return (
    <section
      aria-labelledby="work-hero-heading"
      className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Magnetic field line ambient glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="max-w-3xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Verified Client Case Studies</span>
          </div>

          {/* Semantic H1 */}
          <h1
            id="work-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6"
          >
            Work that makes brands{' '}
            <span className="italic font-serif font-normal bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              magnetic.
            </span>
          </h1>

          {/* Intro Description */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl font-normal">
            Every brand we work with starts with a goal. Here is a look at the
            businesses we've helped grow their digital presence, from first
            website to full-funnel advertising.
          </p>

          {/* 3 Real-Fact Highlight Chips */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="px-4 py-2 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex items-center gap-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                {brandsServedCount} brands served
              </span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex items-center gap-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                4 core services
              </span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex items-center gap-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Founded 2025 in New Delhi
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_6px_30px_rgba(239,68,68,0.6)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919211374014?text=Hi%20Utkarsh%2C%20I%20am%20exploring%20your%20work%20portfolio%20and%20would%20like%20to%20chat%20about%20our%20brand."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-neutral-200 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
