import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ClientAvatars } from './ClientAvatars';
import { PARTNERS_LIST } from './PartnerLogos';

import { Language, getTranslation } from '../utils/translations';

interface HeroProps {
  onOpenGetStarted: () => void;
  language?: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGetStarted, language = 'en' }) => {
  const t = getTranslation(language);
  return (
    <section className="relative w-full overflow-hidden pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Kicker: Wireframe Globe + Text */}
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
          {/* Wireframe Globe Icon */}
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          <div className="text-white text-[12px] sm:text-[13px] font-normal leading-[1.3] tracking-tight">
            <div>{t.heroKicker}</div>
          </div>
        </div>

        {/* Big Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[84px] font-extrabold text-white tracking-[-0.035em] leading-[0.95] max-w-4xl select-none">
          <div className="flex flex-wrap items-baseline gap-x-3.5 sm:gap-x-4">
            <span>{t.heroTitlePrefix}</span>
            <span className="font-serif-italic text-[#ff2e2e] font-normal tracking-normal">
              {t.heroTitleHighlight}
            </span>
          </div>
        </h1>

        {/* Subtitle Paragraph */}
        <p className="mt-4 sm:mt-5 text-neutral-300 text-sm sm:text-[16px] leading-relaxed max-w-lg font-normal drop-shadow-sm">
          {t.heroSubtitle}
        </p>

        {/* CTA & Social Proof Community Row */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-5 sm:gap-8">
          {/* Red Pill Button with Arrow Circle */}
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="group relative flex items-center bg-gradient-to-r from-[#ff2020] via-[#ee1616] to-[#dc1212] hover:from-[#ff3030] hover:to-[#e41818] active:scale-[0.98] text-white rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 sm:py-2 shadow-[0_4px_25px_rgba(238,22,22,0.4)] transition-all cursor-pointer"
          >
            <span className="font-semibold text-sm sm:text-[16px] tracking-tight mr-3 select-none">
              {t.heroCta}
            </span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:translate-x-0.5 transition-transform duration-200">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.5]" />
            </div>
          </button>

          {/* Overlapping Avatars + 50K+ Community */}
          <div className="py-0.5">
            <ClientAvatars />
          </div>
        </div>

        {/* Bottom Section: Stat Cards & Partner Logos */}
        <div className="mt-9 sm:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-6">
          {/* Left: Metric / Stat Cards */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Card 1: 250+ Campaigns launched */}
            <div className="w-44 sm:w-48 h-[104px] rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-white/40 hover:bg-black/50">
              <div className="text-3xl sm:text-[36px] font-bold text-white tracking-tight leading-none">
                250+
              </div>
              <div className="text-neutral-300 text-xs sm:text-[13px] font-normal leading-tight">
                {t.heroMetric1Label}
              </div>
            </div>

            {/* Card 2: 95% Client retention (Red glowing border) */}
            <div className="w-44 sm:w-48 h-[104px] rounded-2xl border border-[#dc2626]/90 bg-gradient-to-b from-[#3a0808]/40 to-black/60 backdrop-blur-md p-4 sm:p-5 shadow-[0_0_25px_rgba(220,38,38,0.3)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:border-red-500">
              {/* Internal subtle red radial ambient glow */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 bg-red-600/35 rounded-full blur-xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="text-3xl sm:text-[36px] font-bold text-white tracking-tight leading-none relative z-10">
                95%
              </div>
              <div className="text-neutral-300 text-xs sm:text-[13px] font-normal leading-tight relative z-10">
                {t.heroMetric2Label}
              </div>
            </div>
          </div>

          {/* Right: "Our Partners" and 5 Brand Logos */}
          <div className="flex flex-col lg:items-end">
            <div className="text-neutral-300 text-xs sm:text-[13px] font-medium tracking-normal mb-2.5 lg:text-right">
              Our Partners
            </div>

            {/* Logos Row */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 lg:gap-8">
              {PARTNERS_LIST.map(({ id, Component }) => (
                <div
                  key={id}
                  className="opacity-95 hover:opacity-100 transition-opacity duration-200 cursor-default"
                >
                  <Component />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
