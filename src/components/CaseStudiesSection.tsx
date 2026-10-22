import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BarChart2,
  DollarSign,
  Users,
  Quote,
} from 'lucide-react';
import { CaseStudy, formatCurrencyValue } from '../utils/caseStudies';

interface CaseStudiesSectionProps {
  onOpenConsultation: (serviceOrClient?: string) => void;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'brandflow',
    client: 'BrandFlow',
    industry: 'B2B Workflow SaaS',
    duration: '6-Month Growth Sprint',
    headlineMetric: '+346%',
    headlineMetricLabel: 'Organic Traffic Lift',
    secondaryMetric: '$720K',
    secondaryMetricLabel: 'Monthly Inbound Pipeline Generated',
    summary:
      'BrandFlow faced rising Google Ads acquisition costs and stagnating search presence. Magentrix rebuilt their technical architecture, deployed 140+ programmatic comparison pages, and mapped semantic topic clusters that compounded qualified inbound pipeline within 180 days.',
    strategyDeliverables: [
      'Technical Core Web Vitals Overhaul',
      'High-Intent Comparison Page Architecture',
      'Entity Graph Optimization & Internal Linking',
      'Authority Backlink PR in Tech Press',
    ],
    testimonial: {
      quote:
        'Magentrix completely decoupled our customer acquisition from linear ad spend. Organic search is now our highest-converting revenue channel with zero marginal cost per lead.',
      author: 'Elena Vance',
      role: 'VP of Growth, BrandFlow',
    },
    metricsData: [
      { month: 'Month 1', traffic: 18500, revenue: 120000, roi: 3.2, cac: 680 },
      { month: 'Month 2', traffic: 24200, revenue: 165000, roi: 3.8, cac: 610 },
      { month: 'Month 3', traffic: 38900, revenue: 260000, roi: 4.9, cac: 520 },
      { month: 'Month 4', traffic: 51400, revenue: 380000, roi: 5.8, cac: 440 },
      { month: 'Month 5', traffic: 68000, revenue: 540000, roi: 6.7, cac: 390 },
      { month: 'Month 6', traffic: 82600, revenue: 720000, roi: 7.8, cac: 340 },
    ],
  },
  {
    id: 'novascale',
    client: 'NovaScale',
    industry: 'Cloud Infrastructure',
    duration: '6-Month Growth Sprint',
    headlineMetric: '-42%',
    headlineMetricLabel: 'Blended CAC Reduction',
    secondaryMetric: '4.8x',
    secondaryMetricLabel: 'Blended Return on Ad Spend (ROAS)',
    summary:
      'NovaScale was burning budget on low-intent Google Ads queries with poor lead follow-through. We audited negative keywords, introduced algorithmic bid caps, and built high-converting interactive ROI landing calculators tailored to enterprise DevOps buyers.',
    strategyDeliverables: [
      'Google Search & PMax Negative Keyword Restructure',
      'LinkedIn Account-Based Targeting for CTOs',
      'Interactive DevOps ROI Calculator Landing Pages',
      'HubSpot Server-Side Offline Conversion Tracking',
    ],
    testimonial: {
      quote:
        'Within 90 days, Magentrix slashed our blended CAC by 42% while doubling our sales-accepted leads. Their telemetry left nowhere for poor creative to hide.',
      author: 'Marcus Chen',
      role: 'Chief Marketing Officer, NovaScale',
    },
    metricsData: [
      { month: 'Month 1', traffic: 14200, revenue: 95000, roi: 1.8, cac: 850 },
      { month: 'Month 2', traffic: 19800, revenue: 140000, roi: 2.3, cac: 740 },
      { month: 'Month 3', traffic: 28400, revenue: 215000, roi: 3.1, cac: 620 },
      { month: 'Month 4', traffic: 39200, revenue: 310000, roi: 3.9, cac: 540 },
      { month: 'Month 5', traffic: 52100, revenue: 440000, roi: 4.4, cac: 510 },
      { month: 'Month 6', traffic: 66400, revenue: 590000, roi: 4.8, cac: 490 },
    ],
  },
  {
    id: 'cresta',
    client: 'Cresta',
    industry: 'Enterprise FinTech',
    duration: '6-Month Growth Sprint',
    headlineMetric: '+185%',
    headlineMetricLabel: 'Enterprise Pipeline Lift',
    secondaryMetric: '4.6%',
    secondaryMetricLabel: 'Visitor-to-Opportunity Conversion',
    summary:
      'Cresta had steady top-of-funnel traffic but suffered high checkout friction and ambiguous pricing messaging. We launched a rigorous CRO experimentation framework with 28 multivariate tests, personalized product tours, and friction-free calendar booking.',
    strategyDeliverables: [
      '28 Multivariate Split Tests on Pricing & Demos',
      'Interactive Product Tour & Instant Demo Booking',
      'Heatmap & Session Friction Telemetry Analysis',
      'Executive Micro-Copy & Social Proof Reinforcement',
    ],
    testimonial: {
      quote:
        'Their scientific testing methodology removed friction across our entire funnel. Our SDR team had full calendars within 3 weeks of the new demo launch.',
      author: 'Sarah Lindqvist',
      role: 'Head of Demand Generation, Cresta',
    },
    metricsData: [
      { month: 'Month 1', traffic: 22000, revenue: 380000, roi: 2.4, cac: 590 },
      { month: 'Month 2', traffic: 28500, revenue: 540000, roi: 3.1, cac: 520 },
      { month: 'Month 3', traffic: 37000, revenue: 810000, roi: 3.9, cac: 460 },
      { month: 'Month 4', traffic: 46500, revenue: 1150000, roi: 4.8, cac: 410 },
      { month: 'Month 5', traffic: 58000, revenue: 1520000, roi: 5.6, cac: 380 },
      { month: 'Month 6', traffic: 71200, revenue: 1940000, roi: 6.5, cac: 350 },
    ],
  },
];

interface TooltipPayloadItem {
  value: number;
  name: string;
  color: string;
  payload: {
    month: string;
    traffic: number;
    revenue: number;
    roi: number;
    cac?: number;
  };
}

const CustomChartTooltip: React.FC<{
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  metricType: 'traffic' | 'revenue' | 'roi';
}> = ({ active, payload, label, metricType }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0c0c0c]/95 border border-white/20 p-3.5 rounded-xl shadow-2xl backdrop-blur-xl text-left text-xs space-y-1.5 min-w-[170px]">
        <div className="font-semibold text-white border-b border-white/10 pb-1 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-red-400 font-mono text-[11px]">Sprint Milestone</span>
        </div>
        <div className="flex items-center justify-between text-neutral-300">
          <span>Monthly Traffic:</span>
          <span className="font-bold font-mono text-white">
            {data.traffic.toLocaleString()} visits
          </span>
        </div>
        <div className="flex items-center justify-between text-neutral-300">
          <span>Pipeline Value:</span>
          <span className="font-bold font-mono text-emerald-400">
            {formatCurrencyValue(data.revenue)}
          </span>
        </div>
        <div className="flex items-center justify-between text-neutral-300">
          <span>Target ROI:</span>
          <span className="font-bold font-mono text-amber-400">{data.roi}x</span>
        </div>
        {data.cac && (
          <div className="flex items-center justify-between text-neutral-300 border-t border-white/10 pt-1">
            <span>Blended CAC:</span>
            <span className="font-bold font-mono text-red-400">${data.cac}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenConsultation }) => {
  const [selectedStudyId, setSelectedStudyId] = useState<string>('brandflow');
  const [metricType, setMetricType] = useState<'traffic' | 'revenue' | 'roi'>('traffic');

  const currentStudy = CASE_STUDIES.find((s) => s.id === selectedStudyId) || CASE_STUDIES[0];

  const getYAxisFormatter = (val: number) => {
    if (metricType === 'traffic') {
      return val >= 1000 ? `${Math.round(val / 1000)}k` : `${val}`;
    }
    if (metricType === 'revenue') {
      return formatCurrencyValue(val);
    }
    return `${val}x`;
  };

  const getMetricDataKey = () => {
    if (metricType === 'traffic') return 'traffic';
    if (metricType === 'revenue') return 'revenue';
    return 'roi';
  };

  const getMetricColor = () => {
    if (metricType === 'traffic') return '#ff3333';
    if (metricType === 'revenue') return '#10b981';
    return '#f59e0b';
  };

  return (
    <section
      id="work"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="case-studies-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-red-600/[0.035] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10"
        >
          <div className="max-w-2xl">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Verified Case Studies & Telemetry</span>
            </div>

            <h2
              id="case-studies-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Real Client Growth{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">Visualized</span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Transparent before-and-after data showing how data-backed customer acquisition,
              conversion rate optimization, and search authority build scalable pipeline.
            </p>
          </div>

          {/* Client Selector Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/60 border border-white/15 rounded-xl backdrop-blur-md self-start lg:self-end">
            {CASE_STUDIES.map((study) => {
              const isSelected = selectedStudyId === study.id;
              return (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setSelectedStudyId(study.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {study.client}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Case Study Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 rounded-3xl border border-white/15 bg-black/55 backdrop-blur-xl p-6 sm:p-9 lg:p-11 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decorative background gradient */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-red-600/[0.04] rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Summary, Metrics & Strategy (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Metadata Lockup */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-white font-semibold text-sm">{currentStudy.client}</span>
                <span aria-hidden="true">·</span>
                <span>{currentStudy.industry}</span>
                <span aria-hidden="true">·</span>
                <span className="text-red-400">{currentStudy.duration}</span>
              </div>

              {/* Big Metrics Callout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl border border-red-500/30 bg-red-950/20 backdrop-blur-md">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight leading-none">
                    {currentStudy.headlineMetric}
                  </div>
                  <div className="text-xs text-neutral-300 font-medium mt-2 leading-snug">
                    {currentStudy.headlineMetricLabel}
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight leading-none">
                    {currentStudy.secondaryMetric}
                  </div>
                  <div className="text-xs text-neutral-300 font-medium mt-2 leading-snug">
                    {currentStudy.secondaryMetricLabel}
                  </div>
                </div>
              </div>

              {/* Project Summary */}
              <p className="text-neutral-300 text-sm leading-relaxed font-normal">
                {currentStudy.summary}
              </p>

              {/* Deliverables Checklist */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                  Applied Growth Architecture
                </div>
                <ul className="space-y-1.5">
                  {currentStudy.strategyDeliverables.map((item, idx) => (
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

              {/* Executive Testimonial Quote */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] relative">
                <Quote className="w-5 h-5 text-red-500/40 absolute top-3 right-3" />
                <p className="text-xs italic text-neutral-300 leading-relaxed pr-6">
                  &ldquo;{currentStudy.testimonial.quote}&rdquo;
                </p>
                <div className="mt-2.5 text-xs">
                  <span className="font-semibold text-white">
                    {currentStudy.testimonial.author}
                  </span>
                  <span className="text-neutral-400 ml-1.5">
                    — {currentStudy.testimonial.role}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onOpenConsultation(`${currentStudy.client} Case Study Strategy`)}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Replicate These Results for Your Brand</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Recharts Visualization (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-black/60 p-5 sm:p-7 backdrop-blur-md flex flex-col justify-between">
              {/* Chart Header & Metric Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span>6-Month Progression Telemetry</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Verified first-party CRM and analytics pipeline data
                  </p>
                </div>

                {/* Metric Selector Buttons */}
                <div className="flex items-center gap-1 p-1 bg-white/[0.06] rounded-xl border border-white/10 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setMetricType('traffic')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      metricType === 'traffic'
                        ? 'bg-red-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Traffic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetricType('revenue')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      metricType === 'revenue'
                        ? 'bg-emerald-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Pipeline</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetricType('roi')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      metricType === 'roi'
                        ? 'bg-amber-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>ROI</span>
                  </button>
                </div>
              </div>

              {/* Recharts Chart Container */}
              <div className="w-full h-[300px] sm:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={currentStudy.metricsData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.45} />
                        <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255, 255, 255, 0.08)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#888888"
                      tick={{ fill: '#a3a3a3', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      tick={{ fill: '#a3a3a3', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={getYAxisFormatter}
                    />
                    <Tooltip
                      content={
                        <CustomChartTooltip
                          metricType={metricType}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey={getMetricDataKey()}
                      stroke={getMetricColor()}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#metricGradient)"
                      activeDot={{
                        r: 6,
                        fill: getMetricColor(),
                        stroke: '#ffffff',
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Footer: Sprint Baseline vs Month 6 Comparison */}
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03]">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                    Baseline (M1)
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-neutral-300 mt-1">
                    {metricType === 'traffic' &&
                      `${currentStudy.metricsData[0].traffic.toLocaleString()}`}
                    {metricType === 'revenue' &&
                      formatCurrencyValue(currentStudy.metricsData[0].revenue)}
                    {metricType === 'roi' && `${currentStudy.metricsData[0].roi}x`}
                  </div>
                </div>

                <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03]">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                    Milestone (M6)
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
                    {metricType === 'traffic' &&
                      `${currentStudy.metricsData[5].traffic.toLocaleString()}`}
                    {metricType === 'revenue' &&
                      formatCurrencyValue(currentStudy.metricsData[5].revenue)}
                    {metricType === 'roi' && `${currentStudy.metricsData[5].roi}x`}
                  </div>
                </div>

                <div className="p-2 sm:p-3 rounded-xl bg-red-950/25 border border-red-500/30">
                  <div className="text-[11px] text-red-400 font-semibold uppercase tracking-wider">
                    Net Sprint Lift
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
                    {metricType === 'traffic' && '+346%'}
                    {metricType === 'revenue' && '+500%'}
                    {metricType === 'roi' && '+143%'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
