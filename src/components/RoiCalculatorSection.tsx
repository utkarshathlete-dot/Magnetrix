import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Percent,
  Layers,
  Info,
} from 'lucide-react';
import {
  RoiInputs,
  calculateRoiMetrics,
  formatRoiCurrency,
} from '../utils/roiCalculator';

interface RoiCalculatorSectionProps {
  onOpenConsultation: (details?: string) => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({
  onOpenConsultation,
}) => {
  const [inputs, setInputs] = useState<RoiInputs>({
    monthlyBudget: 35000,
    customerLtv: 14000,
    monthlyVisitors: 28000,
    conversionRate: 1.8,
    closeRate: 15,
  });

  const results = calculateRoiMetrics(inputs);

  const presets = [
    {
      name: 'B2B Enterprise SaaS',
      values: {
        monthlyBudget: 35000,
        customerLtv: 14000,
        monthlyVisitors: 28000,
        conversionRate: 1.8,
        closeRate: 15,
      },
    },
    {
      name: 'Cloud Infrastructure',
      values: {
        monthlyBudget: 60000,
        customerLtv: 32000,
        monthlyVisitors: 55000,
        conversionRate: 2.1,
        closeRate: 16,
      },
    },
    {
      name: 'FinTech & Payments',
      values: {
        monthlyBudget: 45000,
        customerLtv: 22000,
        monthlyVisitors: 40000,
        conversionRate: 1.6,
        closeRate: 18,
      },
    },
  ];

  return (
    <section
      id="calculator"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="calculator-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/[0.035] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Empirical Return Forecasting · Interactive Pipeline Model</span>
            </div>

            <h2
              id="calculator-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Calculate Your Projected{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">
                Pipeline Lift & ROAS
              </span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Model your customer acquisition unit economics. Adjust monthly media budget, deal size,
              and conversion rates to calculate projected return on ad spend and net ARR addition.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-col gap-1.5 self-start lg:self-end">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
              Industry Presets:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setInputs(preset.values)}
                  className="px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dual Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
          {/* Left Column: Interactive Sliders & Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-black/60 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Calculator className="w-5 h-5 text-red-500" />
                  <span>Growth Parameters</span>
                </div>
                <span className="text-xs text-neutral-400">Live Real-Time Modeling</span>
              </div>

              {/* Input 1: Monthly Budget */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="budget-input" className="text-neutral-300 font-semibold">
                    Monthly Media & Growth Budget
                  </label>
                  <span className="font-mono text-white font-bold text-sm">
                    {formatRoiCurrency(inputs.monthlyBudget)}
                  </span>
                </div>
                <input
                  id="budget-input"
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={inputs.monthlyBudget}
                  onChange={(e) =>
                    setInputs({ ...inputs, monthlyBudget: Number(e.target.value) })
                  }
                  className="w-full accent-red-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>$5K</span>
                  <span>$100K</span>
                  <span>$200K+</span>
                </div>
              </div>

              {/* Input 2: Customer LTV / Deal ACV */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="ltv-input" className="text-neutral-300 font-semibold">
                    Average Deal Size / Annual Contract Value (ACV)
                  </label>
                  <span className="font-mono text-white font-bold text-sm">
                    {formatRoiCurrency(inputs.customerLtv)}
                  </span>
                </div>
                <input
                  id="ltv-input"
                  type="range"
                  min="2000"
                  max="100000"
                  step="2000"
                  value={inputs.customerLtv}
                  onChange={(e) =>
                    setInputs({ ...inputs, customerLtv: Number(e.target.value) })
                  }
                  className="w-full accent-red-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>$2K</span>
                  <span>$50K</span>
                  <span>$100K</span>
                </div>
              </div>

              {/* Input 3: Monthly Traffic */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="visitors-input" className="text-neutral-300 font-semibold">
                    Current Monthly Website Visitors
                  </label>
                  <span className="font-mono text-white font-bold text-sm">
                    {inputs.monthlyVisitors.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  id="visitors-input"
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={inputs.monthlyVisitors}
                  onChange={(e) =>
                    setInputs({ ...inputs, monthlyVisitors: Number(e.target.value) })
                  }
                  className="w-full accent-red-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>5K</span>
                  <span>100K</span>
                  <span>200K+</span>
                </div>
              </div>

              {/* Grid: Conversion Rate & Close Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Conversion Rate */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-300 font-medium">Visitor → Lead Rate</span>
                    <span className="font-mono text-white font-bold">{inputs.conversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={inputs.conversionRate}
                    onChange={(e) =>
                      setInputs({ ...inputs, conversionRate: Number(e.target.value) })
                    }
                    className="w-full accent-red-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-neutral-400">
                    Magentrix target: {(inputs.conversionRate * 1.4).toFixed(1)}% (+40%)
                  </div>
                </div>

                {/* Close Rate */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-300 font-medium">Lead → Won Deal Rate</span>
                    <span className="font-mono text-white font-bold">{inputs.closeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={inputs.closeRate}
                    onChange={(e) =>
                      setInputs({ ...inputs, closeRate: Number(e.target.value) })
                    }
                    className="w-full accent-red-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-neutral-400">
                    Magentrix target: {Math.round(inputs.closeRate * 1.18)}% (+18%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated ROI & Telemetry Projection (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-red-500/40 bg-gradient-to-b from-neutral-950/90 via-black/90 to-red-950/30 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Highlight Output Banner */}
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-red-400 mb-1">
                  Projected Annual Pipeline Addition
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight text-emerald-400">
                  +{formatRoiCurrency(results.annualizedPipelineAddition)}
                </div>
                <div className="text-xs text-neutral-300 mt-1">
                  Estimated +{formatRoiCurrency(results.netMonthlyLift)} net monthly commercial pipeline
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* ROAS */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] uppercase text-neutral-400 font-medium">
                    Blended ROAS
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                    {results.blendedRoas}x
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5 font-medium">
                    Strong unit economics
                  </div>
                </div>

                {/* CAC Reduction */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] uppercase text-neutral-400 font-medium">
                    Blended CAC
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 text-red-400">
                    -{results.cacReductionPercent}%
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {formatRoiCurrency(results.projectedCac)} per deal
                  </div>
                </div>

                {/* Deals per Month */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] uppercase text-neutral-400 font-medium">
                    Monthly Won Deals
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                    {results.projectedDeals}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    vs {results.baselineDeals} baseline
                  </div>
                </div>

                {/* Pipeline Qualified Leads */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] uppercase text-neutral-400 font-medium">
                    Monthly Leads
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                    {results.projectedLeads}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    +{Math.round(((results.projectedLeads - results.baselineLeads) / results.baselineLeads) * 100)}% lead volume
                  </div>
                </div>
              </div>

              {/* Conversion CTA Button */}
              <button
                type="button"
                onClick={() =>
                  onOpenConsultation(
                    `Growth Sprint Model: Budget ${formatRoiCurrency(inputs.monthlyBudget)}, Target +${formatRoiCurrency(results.netMonthlyLift)}/mo`
                  )
                }
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_25px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Lock In This Growth Model</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>Zero retainers lock-in · 100% direct account ownership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
