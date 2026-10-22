import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Target,
} from 'lucide-react';
import {
  ROADMAP_STAGES,
  calculateTimelineProgress,
  getNextRoadmapIndex,
  getPrevRoadmapIndex,
} from '../utils/roadmap';

interface AgencyRoadmapSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const AgencyRoadmapSection: React.FC<AgencyRoadmapSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = ROADMAP_STAGES[activeStageIndex];
  const progressPercent = calculateTimelineProgress(activeStageIndex, ROADMAP_STAGES.length);

  const handleNext = () => {
    setActiveStageIndex((prev) => getNextRoadmapIndex(prev, ROADMAP_STAGES.length));
  };

  const handlePrev = () => {
    setActiveStageIndex((prev) => getPrevRoadmapIndex(prev, ROADMAP_STAGES.length));
  };

  return (
    <section
      id="roadmap"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="roadmap-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[550px] bg-red-600/[0.035] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-2xl">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Agency Execution Framework · Horizontal Onboarding Timeline</span>
            </div>

            <h2
              id="roadmap-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              The 90-Day{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">
                Client Growth Journey
              </span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              From forensic telemetry auditing to autonomous revenue compounding. Every phase is
              engineered with transparent contractual milestones and verified delivery cycles.
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous roadmap phase"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono text-neutral-400">
              <span className="text-white font-bold">{activeStage.stepNumber}</span>
              <span className="mx-1">/</span>
              <span>04</span>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next roadmap phase"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Timeline Bar */}
        <div className="mt-12 pt-6 relative">
          {/* Progress Track */}
          <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 4 Interactive Timeline Step Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {ROADMAP_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              const isPast = idx < activeStageIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative ${
                    isActive
                      ? 'border-red-500/80 bg-red-950/25 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                      : isPast
                      ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.06]'
                      : 'border-white/10 bg-black/40 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-red-400' : 'text-neutral-500'
                      }`}
                    >
                      {stage.phase}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {stage.timeframe}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
                    {stage.title}
                  </div>

                  <div className="mt-1 text-xs text-neutral-400 line-clamp-1">
                    {stage.tag}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detail Showcase Card */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-gradient-to-br from-neutral-950/90 via-black/80 to-red-950/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Stage Details & Deliverables */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-red-600/20 border border-red-500/40 text-red-400 font-bold text-xs uppercase tracking-wider">
                  {activeStage.phase} · {activeStage.timeframe}
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-neutral-300 text-xs font-medium">
                  {activeStage.tag}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeStage.title}
                </h3>
                <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                  Core Engineering Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStage.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Milestone & CTA */}
            <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-black/60 border border-white/10 h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                  <Target className="w-4 h-4 text-red-500" />
                  <span>Phase Milestone Outcome</span>
                </div>

                <div className="text-lg font-bold text-white tracking-tight leading-snug">
                  {activeStage.milestone}
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1">
                    Quantified Benchmark
                  </span>
                  {activeStage.kpiTarget}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenConsultation(`Roadmap Consultation: ${activeStage.phase} (${activeStage.title})`)}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Initiate Your 90-Day Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
