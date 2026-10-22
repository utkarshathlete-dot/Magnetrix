import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  Wrench,
  Users,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  DETAILED_SERVICES_CATALOG,
  DetailedService,
  filterDetailedServices,
  calculateSquadEstimate,
} from '../utils/servicesPage';
import { CardGridSkeleton } from './LoadingSkeleton';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateHome,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'seo',
    'ppc',
    'cro',
  ]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 280);
  };

  const filteredServices = filterDetailedServices(
    DETAILED_SERVICES_CATALOG,
    selectedCategory,
    searchQuery
  );

  const squadEstimate = calculateSquadEstimate(selectedServiceIds);

  const toggleServiceSelection = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'acquisition', label: 'Customer Acquisition' },
    { id: 'optimization', label: 'Conversion & CRO' },
    { id: 'creative', label: 'Creative & Editorial' },
    { id: 'telemetry', label: 'Telemetry & Architecture' },
  ];

  const methodologyStages = [
    {
      step: '01',
      title: 'Telemetry & Technical Auditing',
      timeline: 'Weeks 1 – 2',
      description:
        'Full-stack diagnostics across Core Web Vitals, server-side attribution tracking, ad account query waste, and heatmap drop-off telemetry.',
    },
    {
      step: '02',
      title: 'High-Conviction Re-Architecture',
      timeline: 'Weeks 3 – 4',
      description:
        'Negative query scrubbing, programmatic comparison matrix buildouts, target CAC recalibration, and high-intent landing page deployment.',
    },
    {
      step: '03',
      title: 'Multivariate Experimentation',
      timeline: 'Weeks 5 – 12',
      description:
        'Continuous rapid A/B testing on checkout and lead capture flows, dynamic video ad variations, and dayparted algorithmic bid management.',
    },
    {
      step: '04',
      title: 'Autonomous Scale & Moat Compounding',
      timeline: 'Weeks 13+',
      description:
        'Expanding organic entity authority, scaling high-ROAS lookalike campaigns, and embedding automated executive BI dashboards.',
    },
  ];

  const retainerPlans = [
    {
      name: 'Accelerate Sprint',
      duration: '90-Day Engagement',
      idealFor: 'Growth-stage companies wanting rapid CAC reduction and pipeline validation.',
      features: [
        'Dedicated Senior Growth Lead',
        '2 Core Growth Disciplines',
        'Bi-Weekly Experimentation Sprints',
        'Direct Slack Channel & 24hr SLA',
        'Real-Time Attribution Dashboard',
      ],
      highlight: false,
    },
    {
      name: 'Full-Funnel Growth Partner',
      duration: 'Retained Partnership',
      idealFor: 'Market leaders scaling from $5M to $50M+ ARR across multiple digital channels.',
      features: [
        'Multi-Disciplinary 3-Person Squad',
        'All 6 Growth Capabilities Included',
        'Unlimited Multivariate Split Testing',
        'Custom Server-Side CRM Pipeline Sync',
        'Direct Access to Magentrix Partners',
        'Weekly Executive Growth Briefings',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise Transformation',
      duration: '6 to 12 Months',
      idealFor: 'Enterprise organizations undertaking full digital re-architecture.',
      features: [
        'Dedicated Enterprise Squad & Lead Architect',
        'Custom Programmatic CMS Infrastructure',
        'Multi-Region Entity Graph Optimization',
        'Legal & Compliance Sign-Off Workflows',
        'Executive Board-Ready Reporting',
      ],
      highlight: false,
    },
  ];

  return (
    <div className="w-full relative z-20 pb-20">
      {/* Top Breadcrumb & Back Bar */}
      <div className="pt-6 sm:pt-8 px-6 sm:px-10 lg:px-16 border-b border-white/10 pb-4">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Overview</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>Magentrix</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white">Capabilities & Growth Catalog</span>
          </div>
        </div>
      </div>

      {/* Main Page Header */}
      <div className="pt-12 sm:pt-16 pb-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Quiet Editorial Kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span>Magentrix Growth Systems · Comprehensive Capabilities Catalog</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.035em] leading-[1.05] max-w-4xl">
            Engineering Commercial Inbound Pipeline with{' '}
            <span className="font-serif-italic font-normal text-[#ff2e2e]">
              Mathematical Rigor
            </span>
          </h1>

          <p className="mt-5 text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-normal">
            Every capability is executed by senior operators with transparent SLAs, direct account
            ownership, and multi-touch server attribution. Select individual disciplines or model
            a customized multi-disciplinary sprint.
          </p>

          {/* Interactive Search & Filter Controls */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/10">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-red-600 text-white shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
                        : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, platforms, scope..."
                className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/15 focus:border-red-500 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scope Estimator Banner */}
      <div className="px-6 sm:px-10 lg:px-16 mb-12">
        <div className="max-w-[1400px] mx-auto p-5 sm:p-7 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/30 via-neutral-950/80 to-black/80 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-red-400 font-semibold">
                Custom Growth Squad Estimator
              </div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                {squadEstimate.selectedCount} Disciplines Selected · {squadEstimate.totalWeeklyHours} hrs / week
              </div>
              <div className="text-xs text-neutral-300 mt-1">
                Estimated configuration: {squadEstimate.recommendedEngineers} Senior Operator(s) under a {squadEstimate.estimatedSprintDuration}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenConsultation(
                `Custom Squad Scope: ${selectedServiceIds.join(', ')} (${squadEstimate.totalWeeklyHours} hrs/wk)`
              )
            }
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.98]"
          >
            <span>Deploy Squad for This Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detailed Services Grid */}
      <div className="px-6 sm:px-10 lg:px-16 mb-24">
        <div className="max-w-[1400px] mx-auto">
          {isFetching ? (
            <CardGridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredServices.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);

            return (
              <div
                key={service.id}
                className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl relative overflow-hidden ${
                  isSelected
                    ? 'border-red-500/60 bg-neutral-950/90 shadow-[0_0_35px_rgba(239,68,68,0.18)]'
                    : 'border-white/15 bg-black/55 hover:border-white/30'
                }`}
              >
                <div>
                  {/* Header Row: Number, Category & Selection Checkbox */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-red-500 tracking-wider">
                      {service.number}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleServiceSelection(service.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'border-red-500 bg-red-600 text-white'
                          : 'border-white/15 bg-white/5 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'In Scope' : 'Add to Scope'}</span>
                    </button>
                  </div>

                  {/* Title & Category Badge */}
                  <div className="mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                      {service.categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mt-1">
                      {service.title}
                    </h3>
                  </div>

                  {/* Objective Headline */}
                  <div className="text-xs sm:text-[13px] font-semibold text-red-400 mb-3">
                    {service.headline}
                  </div>

                  {/* Deep Description */}
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Supported Technology & Tooling Stack */}
                  <div className="mb-5 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                      <Wrench className="w-3.5 h-3.5 text-red-500" />
                      <span>Technology & Tooling Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 text-[11px] font-mono text-neutral-300 bg-white/[0.04] border border-white/10 rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Full Deliverables Scope */}
                  <div className="pt-4 border-t border-white/10 mb-6">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                      Contractual Deliverables
                    </div>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Row: SLA, Impact Metric & Request Button */}
                <div className="pt-5 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      <span>{service.slaTimeline}</span>
                    </div>
                    <span className="font-mono text-white font-semibold">{service.weeklyHours} hrs/wk</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white leading-none">
                      {service.impactMetric.value}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                      {service.impactMetric.label}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`${service.title} Strategy Brief`)}
                    className="w-full py-2.5 bg-white/[0.08] hover:bg-red-600 text-white font-semibold text-xs rounded-xl border border-white/15 hover:border-red-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group"
                  >
                    <span>Inquire About This Discipline</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
            </div>
          )}
        </div>
      </div>

      {/* 4-Stage Sprint Methodology */}
      <div className="px-6 sm:px-10 lg:px-16 mb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-wider font-semibold text-red-500 mb-2">
              Execution Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How We Deploy & Scale Your Growth System
            </h2>
            <p className="mt-3 text-neutral-300 text-sm leading-relaxed">
              Every client engagement follows a disciplined, sprint-based delivery model structured to
              compress time to first revenue impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologyStages.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-red-500 tracking-wider">
                      {stage.step}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">{stage.timeline}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retainer & Partnership Models */}
      <div className="px-6 sm:px-10 lg:px-16 mb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-wider font-semibold text-red-500 mb-2">
              Engagement Frameworks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Flexible Engagement Structures Built for Velocity
            </h2>
            <p className="mt-3 text-neutral-300 text-sm leading-relaxed">
              No long-term locked contracts. Work with us on 90-day acceleration sprints or embedded
              retained partnerships with direct senior engineer access.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {retainerPlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-7 sm:p-9 rounded-3xl border flex flex-col justify-between backdrop-blur-xl relative ${
                  plan.highlight
                    ? 'border-red-500 bg-gradient-to-b from-neutral-950 via-black to-red-950/40 shadow-2xl ring-1 ring-red-500/50'
                    : 'border-white/15 bg-black/55'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    Most Popular Model
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono text-red-400 uppercase tracking-wider font-semibold mb-1">
                    {plan.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 mb-6 leading-relaxed">
                    {plan.idealFor}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                      What&apos;s Included
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`${plan.name} Engagement Inquiry`)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-[0.98] ${
                      plan.highlight
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_4px_25px_rgba(239,68,68,0.4)]'
                        : 'bg-white hover:bg-neutral-200 text-black'
                    }`}
                  >
                    <span>Inquire About {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Conversion CTA */}
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-r from-black/90 via-neutral-950/95 to-red-950/40 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to deploy our engineering squad to your growth engine?
            </h3>
            <p className="mt-3 text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Schedule a technical growth sprint consultation with our managing directors. We&apos;ll
              audit your ad accounts, indexation, and funnel telemetry before the call.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenConsultation('Comprehensive Strategy Call')}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.4)] cursor-pointer active:scale-[0.98]"
            >
              Book Strategy Session
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="px-5 py-3.5 bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white font-semibold text-sm rounded-xl border border-white/15 transition-colors cursor-pointer"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
