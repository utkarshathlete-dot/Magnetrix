import React, { useState } from 'react';
import { Quote, ArrowRight, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { ClientSuccessStory, filterSuccessStories } from '../utils/testimonials';

interface ClientSuccessStoriesProps {
  onOpenConsultation: (clientName?: string) => void;
}

export const STORIES_DATA: (ClientSuccessStory & {
  renderLogo: () => React.ReactNode;
})[] = [
  {
    id: 'brandflow',
    client: 'BrandFlow',
    industry: 'saas',
    industryLabel: 'Enterprise SaaS',
    metricBadge: '+346% Organic Pipeline',
    metricHighlight: '+346%',
    quote:
      'Magentrix completely decoupled our customer acquisition from linear ad spend. Within five months, our organic inbound pipeline increased by 346% and now drives over $700K in new monthly pipeline.',
    author: {
      name: 'Elena Vance',
      role: 'VP of Growth',
      company: 'BrandFlow',
      avatarColor: 'from-amber-500 to-red-500',
      initials: 'EV',
    },
    renderLogo: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.6 7.9 8.6 8.6 9.4C7.8 8.7 6.8 8.3 5.7 8.3C3.2 8.3 1.2 10.3 1.2 12.8C1.2 15.3 3.2 17.3 5.7 17.3C6.8 17.3 7.8 16.9 8.6 16.2C7.9 17 7.5 18 7.5 19.1C7.5 21.6 9.5 23.6 12 23.6C14.5 23.6 16.5 21.6 16.5 19.1C16.5 18 16.1 17 15.4 16.2C16.2 16.9 17.2 17.3 18.3 17.3C20.8 17.3 22.8 15.3 22.8 12.8C22.8 10.3 20.8 8.3 18.3 8.3C17.2 8.3 16.2 8.7 15.4 9.4C16.1 8.6 16.5 7.6 16.5 6.5C16.5 4 14.5 2 12 2Z" />
      </svg>
    ),
  },
  {
    id: 'novascale',
    client: 'NovaScale',
    industry: 'cloud',
    industryLabel: 'Cloud Infrastructure',
    metricBadge: '-42% Blended CAC',
    metricHighlight: '-42%',
    quote:
      'They audited our runaway Google Ads budget, eliminated wasted negative queries, and cut our blended CAC by 42% in under 90 days. Their real-time BI telemetry gave our executive board absolute confidence.',
    author: {
      name: 'Marcus Chen',
      role: 'Chief Marketing Officer',
      company: 'NovaScale',
      avatarColor: 'from-blue-500 to-indigo-600',
      initials: 'MC',
    },
    renderLogo: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4H8.5L15.5 15.5V4H19.5V20H15.5L8.5 8.5V20H4V4Z" />
      </svg>
    ),
  },
  {
    id: 'cresta',
    client: 'Cresta Systems',
    industry: 'fintech',
    industryLabel: 'Enterprise FinTech',
    metricBadge: '4.6% Demo Conversion',
    metricHighlight: '4.6%',
    quote:
      'Their scientific CRO methodology transformed our enterprise demo conversion rate from 1.6% to 4.6%. Our SDR team had full calendars within 3 weeks of deploying their friction-free onboarding flows.',
    author: {
      name: 'Sarah Lindqvist',
      role: 'Head of Demand Generation',
      company: 'Cresta',
      avatarColor: 'from-emerald-500 to-teal-600',
      initials: 'SL',
    },
    renderLogo: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 20H7.5L12 11.5L16.5 20H22L12 2ZM12 14.5L9.8 19H14.2L12 14.5Z" />
      </svg>
    ),
  },
  {
    id: 'pulsemedia',
    client: 'PulseMedia',
    industry: 'adtech',
    industryLabel: 'AdTech & Media',
    metricBadge: '4.8x Blended ROAS',
    metricHighlight: '4.8x',
    quote:
      'Most agencies deliver pretty creative that completely fails to convert. Magentrix builds high-velocity modular video frameworks that lowered our paid social CPMs by 28% and unlocked $4.2M in annual pipeline.',
    author: {
      name: 'Julian Thorne',
      role: 'Director of Performance Marketing',
      company: 'PulseMedia',
      avatarColor: 'from-purple-500 to-pink-600',
      initials: 'JT',
    },
    renderLogo: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 8C4.5 8 2 10.2 2 13C2 15.8 4.5 18 7.5 18C10.2 18 12.3 16.2 13.5 14C14.7 16.2 16.8 18 19.5 18C22.5 18 25 15.8 25 13C25 10.2 22.5 8 19.5 8C16.8 8 14.7 9.8 13.5 12C12.3 9.8 10.2 8 7.5 8ZM7.5 10.5C9.2 10.5 10.7 11.6 11.4 13C10.7 14.4 9.2 15.5 7.5 15.5C5.8 15.5 4.5 14.4 4.5 13C4.5 11.6 5.8 10.5 7.5 10.5ZM19.5 10.5C21.2 10.5 22.5 11.6 22.5 13C22.5 14.4 21.2 15.5 19.5 15.5C17.8 15.5 16.3 14.4 15.6 13C16.3 11.6 17.8 10.5 19.5 10.5Z" />
      </svg>
    ),
  },
  {
    id: 'nextgen',
    client: 'NextGen Systems',
    industry: 'saas',
    industryLabel: 'Enterprise Logistics',
    metricBadge: '+280% Commercial Leads',
    metricHighlight: '+280%',
    quote:
      'Their technical SEO team restructured our entire global entity architecture. We now dominate commercial intent queries across 14 enterprise automation keywords our competitors spent millions trying to rank for.',
    author: {
      name: 'Dr. Aris Thorne',
      role: 'Chief Commercial Officer',
      company: 'NextGen',
      avatarColor: 'from-orange-500 to-amber-600',
      initials: 'AT',
    },
    renderLogo: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM12 4.3L18.7 8L12 11.7L5.3 8L12 4.3ZM5 9.7L11 13V19.7L5 16.3V9.7ZM13 19.7V13L19 9.7V16.3L13 19.7Z" />
      </svg>
    ),
  },
  {
    id: 'velocelabs',
    client: 'Veloce Labs',
    industry: 'cloud',
    industryLabel: 'Observability & Cloud',
    metricBadge: '$2.4M Net New ARR',
    metricHighlight: '$2.4M',
    quote:
      'Zero fluff, zero vanity metrics. Magentrix operates like an in-house engineering team that happens to specialize in customer acquisition. They delivered our fastest quarter of ARR growth in company history.',
    author: {
      name: 'Sonia Alvarez',
      role: 'VP of Revenue Operations',
      company: 'Veloce Labs',
      avatarColor: 'from-rose-500 to-red-600',
      initials: 'SA',
    },
    renderLogo: () => (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </svg>
    ),
  },
];

export const ClientSuccessStories: React.FC<ClientSuccessStoriesProps> = ({
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredStories = filterSuccessStories(STORIES_DATA, activeCategory);

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'saas', label: 'Enterprise SaaS' },
    { id: 'cloud', label: 'Cloud Infrastructure' },
    { id: 'fintech', label: 'FinTech & Payments' },
    { id: 'adtech', label: 'AdTech & Media' },
  ];

  return (
    <section
      id="stories"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="stories-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.035] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Verified Client Voices · Social Proof & Commercial Outcomes</span>
            </div>

            <h2
              id="stories-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Trusted by High-Velocity Leaders Who Demand{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">Predictable Growth</span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Direct feedback from executives and growth directors on pipeline acceleration, unit
              economic efficiency, and transparent sprint execution.
            </p>
          </div>

          {/* Industry Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/60 border border-white/15 rounded-xl backdrop-blur-md self-start lg:self-end">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-[0_2px_10px_rgba(220,38,38,0.35)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-10">
          {filteredStories.map((story) => {
            const Logo = story.renderLogo;

            return (
              <div
                key={story.id}
                className="group relative rounded-2xl border border-white/15 bg-black/55 hover:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.16)]"
              >
                {/* Subtle top-right ambient hover glow */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 bg-red-600/0 group-hover:bg-red-600/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* Top: Logo, Company Name & Metric Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                        <Logo />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm tracking-tight leading-none">
                          {story.client}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 leading-none">
                          {story.industryLabel}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-semibold font-mono text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg px-2.5 py-1 whitespace-nowrap shadow-sm">
                      {story.metricBadge}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-red-500/20 absolute -top-1 -left-1 pointer-events-none" />
                    <p className="text-neutral-200 text-xs sm:text-[13px] leading-relaxed font-normal pl-4 italic">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom: Author Lockup & Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar Initials with Duotone Glow */}
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-tr ${story.author.avatarColor} p-0.5 flex items-center justify-center shadow-md`}
                    >
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[11px] font-bold text-white font-mono">
                        {story.author.initials}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                        <span>{story.author.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-tight">
                        {story.author.role}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`${story.client} Success Strategy`)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer shrink-0"
                    aria-label={`View strategy for ${story.client}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Proof Banner */}
        <div className="mt-14 rounded-2xl border border-white/15 bg-gradient-to-r from-black/80 via-neutral-950/90 to-red-950/30 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-semibold text-white ml-2">4.9/5 Average Partner Rating</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to become our next client success case?
            </h4>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Join 50+ enterprise brands that scaled their commercial pipeline with zero guesswork.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenConsultation('Client Partnership')}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] cursor-pointer shrink-0 active:scale-[0.98]"
          >
            Start Your Growth Sprint
          </button>
        </div>
      </div>
    </section>
  );
};
