import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Award,
  Globe,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { TeamLeader, OperatingPrinciple, filterTeamByExpertise } from '../utils/about';

interface AboutSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const OPERATING_PRINCIPLES: OperatingPrinciple[] = [
  {
    number: '01.',
    title: 'Telemetry Over Intuition',
    summary:
      'We never gamble marketing capital on unverified instincts. Every headline test, bid cap adjustment, and programmatic topic cluster is validated against statistical significance and first-party CRM revenue telemetry.',
    deliverableFocus: 'Empirical split testing & statistical attribution models',
  },
  {
    number: '02.',
    title: '100% Account Governance',
    summary:
      'You maintain complete legal and administrative ownership of all ad accounts, tracking pixels, audience lists, and direct platform contracts. We never take hidden percentage markups on your media budgets.',
    deliverableFocus: 'Direct billing lines & uncompromised corporate asset ownership',
  },
  {
    number: '03.',
    title: 'Unified Full-Funnel Squads',
    summary:
      'Siloed agencies cause leaky funnels. At Magentrix, technical SEO architects, algorithmic paid media buyers, conversion engineers, and motion video creators operate inside a single collaborative sprint team.',
    deliverableFocus: 'Zero handoff friction between acquisition, CRO, and creative',
  },
  {
    number: '04.',
    title: 'Radical Real-Time Transparency',
    summary:
      'No curated monthly PDF reports designed to hide poor performance. Our clients get 24/7 access to live first-party BI dashboards showing exact blended CAC, pipeline velocity, and return on ad spend in real-time.',
    deliverableFocus: 'Live executive dashboards & weekly async video briefings',
  },
];

export const TEAM_LEADERS: TeamLeader[] = [
  {
    id: 'alexander-vance',
    name: 'Alexander Vance',
    role: 'Co-Founder & Head of Algorithmic Growth',
    background:
      'Former Google Ads acquisition lead; 12+ years scaling performance marketing and algorithmic bidding engines for high-growth enterprise SaaS.',
    expertise: ['Paid Acquisition', 'Algorithmic Bidding', 'Unit Economics'],
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Co-Founder & Technical SEO Architect',
    background:
      'Architected programmatic semantic indexing systems and entity graphs powering 50M+ monthly search sessions across competitive B2B software verticals.',
    expertise: ['Technical SEO', 'Entity Architecture', 'Programmatic Content'],
  },
  {
    id: 'david-kalu',
    name: 'David Kalu',
    role: 'Director of Conversion Engineering & Telemetry',
    background:
      'Ex-lead CRO experimentation engineer at European FinTech scaleups; deployed over 350 multivariate funnel tests optimizing enterprise checkout velocity.',
    expertise: ['CRO & A/B Testing', 'Server-Side Telemetry', 'Funnel Diagnostics'],
  },
  {
    id: 'maya-lindqvist',
    name: 'Maya Lindqvist',
    role: 'Lead Performance Motion & Creative Strategist',
    background:
      'Specialized in high-velocity modular video frameworks and motion graphics that combat ad fatigue, delivering over $40M+ in tracked paid social pipeline.',
    expertise: ['Motion Design', 'High-Velocity Video', 'Paid Social Creative'],
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'principles' | 'team'>('principles');
  const [teamExpertiseFilter, setTeamExpertiseFilter] = useState<string>('all');

  const filteredTeam = filterTeamByExpertise(TEAM_LEADERS, teamExpertiseFilter);

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="about-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.035] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>About Magentrix · Engineering Commercial Growth</span>
            </div>

            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              We Are Engineers of Market Presence,{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">Not Guesswork</span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Founded in 2021 by performance marketers and data engineers frustrated by opaque
              agency retainers, vanity impressions, and disconnected creative silos. We built
              Magentrix to treat modern customer acquisition as an empirical science: first-party
              telemetry, mathematical search authority, and zero ad spend markups.
            </p>
          </div>

          {/* Interactive View Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-black/60 border border-white/15 rounded-xl backdrop-blur-md self-start lg:self-end">
            <button
              type="button"
              onClick={() => setActiveTab('principles')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'principles'
                  ? 'bg-red-600 text-white shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Operating Principles
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'team'
                  ? 'bg-red-600 text-white shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Leadership Squad
            </button>
          </div>
        </div>

        {/* Agency Vital Signs / Milestones Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 pb-12">
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              2021
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-medium">
              Founded & 100% Self-Funded
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-emerald-400">
              $180M+
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-medium">
              Client Inbound Pipeline Attributed
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-red-500/40 bg-red-950/20 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.12)]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-red-400">
              95%
            </div>
            <div className="text-xs sm:text-sm text-neutral-300 mt-1.5 font-medium">
              Annual Client Retention Rate
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              32
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-medium">
              Senior Engineers Across 8 Countries
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'principles' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 animate-in fade-in duration-200">
            {OPERATING_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="group relative rounded-2xl border border-white/15 bg-black/55 hover:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
              >
                {/* Subtle top-right ambient hover glow */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 bg-red-600/0 group-hover:bg-red-600/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-semibold text-red-500/90 tracking-wider">
                      {principle.number}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-neutral-500 group-hover:text-red-400 transition-colors" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {principle.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-neutral-400">
                  <span className="text-red-400 font-semibold uppercase tracking-wider text-[11px]">
                    Outcome:
                  </span>
                  <span>{principle.deliverableFocus}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {filteredTeam.map((leader) => (
                <div
                  key={leader.id}
                  className="rounded-2xl border border-white/15 bg-black/55 hover:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-red-500/50"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {leader.name}
                      </h3>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-red-400">
                        <Terminal className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-xs sm:text-[13px] font-semibold text-red-400 mb-3">
                      {leader.role}
                    </div>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                      {leader.background}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Core Specializations
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {leader.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-neutral-300 bg-white/[0.06] border border-white/10 rounded-md px-2.5 py-1 font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="mt-14 rounded-2xl border border-white/15 bg-gradient-to-r from-black/80 via-neutral-950/90 to-red-950/30 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left max-w-xl">
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Ready to meet the senior squad running your growth sprints?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              We never pawn client accounts off to junior interns. Work directly with seasoned
              directors and technical engineers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenConsultation('Executive Squad Consultation')}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] cursor-pointer shrink-0 active:scale-[0.98]"
          >
            <span>Initiate Direct Dialogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
