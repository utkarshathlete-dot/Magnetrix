import React from 'react';
import { ArrowUpRight, Monitor, Share2, Target, Search } from 'lucide-react';

interface ServicesBehindTheWorkProps {
  onNavigateToServices: () => void;
}

export const ServicesBehindTheWork: React.FC<ServicesBehindTheWorkProps> = ({
  onNavigateToServices,
}) => {
  const services = [
    {
      id: 'web-design',
      title: 'Website Design & Development',
      description: 'Fast, modern websites built to convert visitors into customers.',
      icon: Monitor,
      accent: 'from-blue-600/20 to-indigo-600/20 border-blue-500/30 text-blue-400',
    },
    {
      id: 'social-media',
      title: 'Social Media Marketing',
      description: 'Organic audience growth and high-engagement content strategy.',
      icon: Share2,
      accent: 'from-violet-600/20 to-purple-600/20 border-violet-500/30 text-violet-400',
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads (FB & IG)',
      description: 'Targeted acquisition campaigns focused on qualified leads and sales.',
      icon: Target,
      accent: 'from-rose-600/20 to-red-600/20 border-rose-500/30 text-rose-400',
    },
    {
      id: 'google-ads',
      title: 'Google Ads',
      description: 'Reach buyers at the exact moment they search for your services.',
      icon: Search,
      accent: 'from-amber-600/20 to-emerald-600/20 border-amber-500/30 text-amber-400',
    },
  ];

  return (
    <section
      aria-labelledby="services-behind-heading"
      className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-white/[0.02] backdrop-blur-sm"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-semibold mb-2">
              Capabilities
            </div>
            <h2
              id="services-behind-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            >
              Services Behind the Work
            </h2>
            <p className="text-neutral-400 text-sm mt-1 max-w-xl">
              Every project in our portfolio is powered by these four core marketing disciplines.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToServices}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All Agency Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={onNavigateToServices}
                className="group p-6 rounded-3xl border border-white/10 bg-neutral-950/70 hover:bg-neutral-900/90 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${svc.accent} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
