import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Target,
  FileText,
  BarChart3,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { AgencyService, filterServicesByCategory } from '../utils/metrics';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  onNavigateToServices?: () => void;
}

export const SERVICES_DATA: (AgencyService & {
  icon: React.ComponentType<{ className?: string }>;
})[] = [
  {
    id: 'seo',
    number: '01.',
    title: 'Search Engine Optimization',
    shortTitle: 'SEO',
    category: 'acquisition',
    icon: Search,
    headline: 'Organic Revenue Engine & Entity Architecture',
    description:
      'Engineered search visibility built on technical indexability audits, high-intent semantic keyword clustering, programmatic landing pages, and authority link acquisition.',
    deliverables: [
      'Technical Core Web Vitals Audits',
      'Semantic Topic & Entity Mapping',
      'Programmatic Content Generation',
      'High-Tier Digital PR & Backlinks',
    ],
    impactMetric: {
      value: '+240%',
      label: 'Organic pipeline growth over 6 months',
    },
  },
  {
    id: 'ppc',
    number: '02.',
    title: 'Pay-Per-Click Advertising',
    shortTitle: 'PPC',
    category: 'acquisition',
    icon: Target,
    headline: 'Algorithmic Paid Search & Social Performance',
    description:
      'Full-funnel campaign orchestration across Google Search, Performance Max, LinkedIn B2B, and Meta Ads with automated dayparting and predictive bid management.',
    deliverables: [
      'Google Search & PMax Orchestration',
      'High-Intent Keyword Negative Scrubbing',
      'LinkedIn Account-Based Targeting',
      'Real-Time Bid & Margin Optimization',
    ],
    impactMetric: {
      value: '-34%',
      label: 'Average reduction in blended CAC',
    },
  },
  {
    id: 'content',
    number: '03.',
    title: 'Content Strategy & Editorial',
    shortTitle: 'Content Strategy',
    category: 'creative',
    icon: FileText,
    headline: 'High-Conviction ICP Educational Content',
    description:
      'Deep-dive industry research, buyer comparison guides, whitepapers, and interactive diagnostic tools structured to compress complex enterprise sales cycles.',
    deliverables: [
      'ICP-Targeted Thought Leadership',
      'Bottom-Funnel Comparative Guides',
      'Data-Backed Industry Benchmark Reports',
      'Multi-Format Asset Repurposing',
    ],
    impactMetric: {
      value: '3.8x',
      label: 'Higher average time-on-page dwell',
    },
  },
  {
    id: 'cro',
    number: '04.',
    title: 'Conversion Rate Optimization',
    shortTitle: 'CRO',
    category: 'optimization',
    icon: BarChart3,
    headline: 'Scientific Experimentation & Friction Removal',
    description:
      'Pinpointing drop-off zones with heatmaps and user session recordings, followed by rapid-cadence multivariate split testing across messaging, layouts, and checkout flows.',
    deliverables: [
      'Multivariate Value Prop Testing',
      'Heatmap & Scroll Telemetry Diagnostics',
      'Frictionless Checkout & Form Design',
      'Micro-Copy & Social Proof Orchestration',
    ],
    impactMetric: {
      value: '+42%',
      label: 'Average lift in visitor-to-lead conversion',
    },
  },
  {
    id: 'creative',
    number: '05.',
    title: 'Performance Creative & Motion',
    shortTitle: 'Creative',
    category: 'creative',
    icon: Sparkles,
    headline: 'High-Velocity Video & Static Ad Production',
    description:
      'High-converting motion graphics, vertical short-form video frameworks, and modular ad variations engineered to eliminate ad fatigue and sustain aggressive ROAS.',
    deliverables: [
      'Vertical Short-Form UGC & Founder Video',
      'High-Contrast Modular Ad Templates',
      'Iterative Hook & Caption Testing',
      '3D Product Explanations & Renders',
    ],
    impactMetric: {
      value: '5.2M+',
      label: 'Monthly verified ad impressions delivered',
    },
  },
  {
    id: 'automation',
    number: '06.',
    title: 'Marketing Automation & Telemetry',
    shortTitle: 'Automation',
    category: 'optimization',
    icon: Layers,
    headline: 'Multi-Touch Attribution & CRM Life-Cycles',
    description:
      'Connecting advertising platforms, CRM pipelines, and server-side conversion APIs into unified executive dashboards with automated lead routing and reactivation flows.',
    deliverables: [
      'Server-Side Multi-Touch Attribution',
      'HubSpot & Salesforce Automated Sequences',
      'Predictive Lead Velocity Scoring',
      'Real-Time Executive BI Dashboards',
    ],
    impactMetric: {
      value: '100%',
      label: 'Attribution clarity across all channels',
    },
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onNavigateToServices,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const filteredServices = filterServicesByCategory(SERVICES_DATA, activeCategory);

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'acquisition', label: 'Customer Acquisition' },
    { id: 'optimization', label: 'Conversion & Telemetry' },
    { id: 'creative', label: 'Creative & Content' },
  ];

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="services-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/[0.04] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10"
        >
          <div className="max-w-2xl">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Agency Capabilities & Offerings</span>
            </div>

            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Strategic Marketing Disciplines{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">
                Engineered for Growth
              </span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Every discipline is focused on generating qualified enterprise pipeline, lowering
              blended acquisition costs, and establishing resilient category leadership.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/60 border border-white/15 rounded-xl backdrop-blur-md self-start md:self-end">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Services Grid with Staggered Scroll Trigger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-10"
        >
          {filteredServices.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                className="group relative rounded-2xl border border-white/15 bg-black/50 hover:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]"
              >
                {/* Subtle top-right ambient hover glow */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 bg-red-600/0 group-hover:bg-red-600/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top: Header, Number, Icon & Description */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Editorial Number */}
                    <span className="font-mono text-xs sm:text-sm font-semibold text-red-500/90 tracking-wider">
                      {service.number}
                    </span>

                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:border-red-500/50 group-hover:text-red-400 group-hover:bg-red-950/30 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Headline */}
                  <div className="text-xs sm:text-[13px] font-medium text-neutral-300 mt-1 mb-3">
                    {service.headline}
                  </div>

                  {/* Core Description */}
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables / Scope List */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                      Included Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-neutral-300 leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom: Impact Metric & Interactive Action Button */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-none">
                      {service.impactMetric.value}
                    </div>
                    <div className="text-neutral-400 text-[11px] sm:text-xs mt-1 leading-tight">
                      {service.impactMetric.label}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-red-600 text-white border border-white/15 hover:border-red-500 transition-all duration-200 cursor-pointer shadow-sm group/btn shrink-0"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <span>Request Strategy</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Lead Banner / Callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-14 p-6 sm:p-8 rounded-2xl border border-white/15 bg-gradient-to-r from-black/80 via-neutral-950/90 to-red-950/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="max-w-xl text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Need a custom multi-channel growth architecture?
            </h4>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1 leading-relaxed">
              We engineer custom retained engagements tailored to your customer acquisition
              economics, unit targets, and sales cycle duration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onNavigateToServices && (
              <button
                type="button"
                onClick={onNavigateToServices}
                className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-[0_4px_20px_rgba(239,68,68,0.35)] active:scale-[0.98]"
              >
                Browse Full Catalog & Scope Estimator
              </button>
            )}
            <button
              type="button"
              onClick={() => onSelectService('Multi-Channel Growth Architecture')}
              className="px-6 py-3 bg-white text-black hover:bg-neutral-200 font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-md shrink-0 active:scale-[0.98]"
            >
              Schedule Architecture Session
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
