import React from 'react';
import { ArrowUpRight, Globe, Layers, Sparkles, Target, Search } from 'lucide-react';
import { Project, INDUSTRY_PLACEHOLDER } from '../../data/projects';
import { getClientInitials } from '../../utils/workFilters';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const showIndustry =
    Boolean(project.industry) &&
    project.industry.trim() !== '' &&
    project.industry !== INDUSTRY_PLACEHOLDER;

  const initials = getClientInitials(project.clientName);

  return (
    <article
      className="group relative rounded-3xl border border-white/10 bg-neutral-950/70 hover:bg-neutral-900/90 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/50 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(99,102,241,0.18)] flex flex-col justify-between overflow-hidden"
    >
      {/* Top Media / Tasteful Branded Placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black flex items-center justify-center p-6">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.clientName} project showcase`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Subtle magnet field lines and gradient badge */
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-indigo-950/50 via-neutral-900/80 to-neutral-950 border border-white/10 p-5 flex flex-col justify-between overflow-hidden">
            {/* Magnetic radial ambient glow */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none group-hover:bg-indigo-500/25 transition-all duration-500"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-red-500/10 blur-2xl pointer-events-none group-hover:bg-red-500/20 transition-all duration-500"
              aria-hidden="true"
            />

            {/* Top Row: Initials Monogram + Verified badge */}
            <div className="flex items-center justify-between relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-red-600 text-white font-mono font-extrabold text-sm flex items-center justify-center shadow-lg tracking-wider border border-white/20">
                {initials}
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-neutral-300">
                Verified Client
              </span>
            </div>

            {/* Bottom Row in visual: Client name watermark */}
            <div className="relative z-10">
              <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-semibold block mb-0.5">
                Client Showcase
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight line-clamp-1">
                {project.clientName}
              </h3>
            </div>
          </div>
        )}

        {/* Industry Pill if available */}
        {showIndustry && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/80 backdrop-blur-md border border-indigo-400/40 text-indigo-300 shadow-md">
              {project.industry}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Client Title */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
              {project.clientName}
            </h3>
          </div>

          {/* Factual Short Description */}
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Services Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.services.map((svc) => (
              <span
                key={svc}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] border border-white/10 text-neutral-300 hover:border-white/20 transition-colors"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelect(project)}
            aria-label={`View project details for ${project.clientName}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.clientName} website`}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
