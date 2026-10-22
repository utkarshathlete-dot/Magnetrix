import React from 'react';
import { ArrowRight, MessageCircle, Phone, Calendar, Sparkles } from 'lucide-react';

interface WorkCtaSectionProps {
  onOpenConsultation: () => void;
  onNavigateToContact: () => void;
}

export const WorkCtaSection: React.FC<WorkCtaSectionProps> = ({
  onOpenConsultation,
  onNavigateToContact,
}) => {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 relative overflow-hidden"
    >
      {/* High-Contrast Magnetic Glow Backdrop */}
      <div className="max-w-[1400px] mx-auto relative rounded-[2.5rem] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/20 p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 blur-[130px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono uppercase tracking-wider text-red-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Real Growth?</span>
          </div>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5"
          >
            Your brand could be next.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-10 max-w-2xl font-normal">
            Tell us about your business and goals. We'll share a clear plan to help you attract the right customers.
          </p>

          {/* 3 Prominent Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(239,68,68,0.45)] hover:shadow-[0_6px_35px_rgba(239,68,68,0.65)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919211374014?text=Hi%20Utkarsh%2C%20I%20am%20looking%20to%20scale%20our%20digital%20marketing%20and%20would%20like%20to%20consult%20directly."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp: +91 92113 74014</span>
            </a>

            <a
              href="tel:+919211374014"
              className="px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-neutral-200 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>Call Us: +91 92113 74014</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
