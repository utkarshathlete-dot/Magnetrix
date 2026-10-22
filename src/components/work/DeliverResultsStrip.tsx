import React from 'react';
import { Compass, Lightbulb, Zap, TrendingUp, Sparkles } from 'lucide-react';

export const DeliverResultsStrip: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'We learn your business, audience and goals.',
      icon: Compass,
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      number: '02',
      title: 'Strategize',
      description: 'We build a plan backed by research and data.',
      icon: Lightbulb,
      gradient: 'from-indigo-600 to-violet-600',
    },
    {
      number: '03',
      title: 'Execute',
      description: 'We create and launch with attention to detail.',
      icon: Zap,
      gradient: 'from-violet-600 to-rose-600',
    },
    {
      number: '04',
      title: 'Optimize',
      description: 'We track results and keep improving them.',
      icon: TrendingUp,
      gradient: 'from-rose-600 to-red-600',
    },
  ];

  return (
    <section
      aria-labelledby="framework-heading"
      className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-semibold mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>
          <h2
            id="framework-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            How We Deliver Results
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            A disciplined, 4-step framework designed for speed, precision, and compounding returns.
          </p>
        </div>

        {/* 4-Step Connected Horizontal Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Subtle Connecting Line on Desktop */}
          <div
            className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-red-500 z-0 opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative z-10 p-6 rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/50 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center font-mono font-bold text-sm shadow-md`}
                    >
                      {step.number}
                    </div>
                    <Icon className="w-4 h-4 text-neutral-500" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Phase {step.number} of 04
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
