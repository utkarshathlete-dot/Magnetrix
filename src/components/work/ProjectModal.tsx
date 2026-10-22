import React, { useEffect, useRef } from 'react';
import {
  X,
  ExternalLink,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Briefcase,
  Target,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Project, INDUSTRY_PLACEHOLDER } from '../../data/projects';
import { getClientInitials } from '../../utils/workFilters';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation?: (topic?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenConsultation,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Esc key listener and focus management
  useEffect(() => {
    if (!project) return;

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Simple focus trap
      if (e.key === 'Tab' && modalContentRef.current) {
        const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const showIndustry =
    Boolean(project.industry) &&
    project.industry.trim() !== '' &&
    project.industry !== INDUSTRY_PLACEHOLDER;

  const initials = getClientInitials(project.clientName);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-950 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-red-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg shrink-0 border border-white/20">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="modal-project-title"
                  className="text-xl sm:text-2xl font-extrabold text-white tracking-tight truncate"
                >
                  {project.clientName}
                </h2>
                {showIndustry && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
                    {project.industry}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 truncate">
                Client Portfolio Overview · Magnetrix Digital
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details modal"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-neutral-300">
          {/* Services Scope */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Services Provided</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.services.map((svc) => (
                <span
                  key={svc}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.06] border border-white/10 text-white flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{svc}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Project Overview
            </h3>
            <p className="text-neutral-200 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/10">
              {project.shortDescription}
            </p>
          </div>

          {/* Conditional Challenge Block */}
          {project.challenge && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>The Challenge</span>
              </h3>
              <p className="text-neutral-300 leading-relaxed bg-neutral-900/40 p-4 rounded-2xl border border-white/10">
                {project.challenge}
              </p>
            </div>
          )}

          {/* Conditional Solution Block */}
          {project.solution && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Solution & Execution</span>
              </h3>
              <p className="text-neutral-300 leading-relaxed bg-neutral-900/40 p-4 rounded-2xl border border-white/10">
                {project.solution}
              </p>
            </div>
          )}

          {/* Conditional Results Block */}
          {project.results && project.results.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2.5">
                Verified Outcomes
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30"
                  >
                    <div className="text-xl font-bold text-white">{res.value}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{res.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditional Testimonial Block */}
          {project.testimonial && project.testimonial.quote && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>Client Feedback</span>
              </h3>
              <blockquote className="p-4 rounded-2xl bg-amber-950/15 border border-amber-500/30 italic text-neutral-200">
                "{project.testimonial.quote}"
                <footer className="mt-2 text-xs not-italic text-amber-300 font-semibold">
                  — {project.testimonial.name}, {project.testimonial.role}
                </footer>
              </blockquote>
            </div>
          )}

          {/* Conditional Website URL Link */}
          {project.websiteUrl && (
            <div className="pt-2">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Visit live website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-neutral-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            Want similar growth strategies for your brand?
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`https://wa.me/919211374014?text=Hi%20Utkarsh%2C%20I%20saw%20your%20work%20for%20${encodeURIComponent(
                project.clientName
              )}%20and%20would%20like%20to%20discuss%20our%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation?.(`Project inquiry: ${project.clientName}`);
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
