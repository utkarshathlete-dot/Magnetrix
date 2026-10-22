import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Inbox, Quote } from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/projects';
import {
  filterProjects,
  getDistinctIndustries,
  shouldShowIndustryFilter,
  hasAnyTestimonials,
  getServiceSlug,
  getServiceFromSlug,
  getIndustrySlug,
  getIndustryFromSlug,
  generatePortfolioSchema,
} from '../utils/workFilters';
import { WorkHero } from './work/WorkHero';
import { FilterBar } from './work/FilterBar';
import { ProjectCard } from './work/ProjectCard';
import { ProjectModal } from './work/ProjectModal';
import { ServicesBehindTheWork } from './work/ServicesBehindTheWork';
import { DeliverResultsStrip } from './work/DeliverResultsStrip';
import { WorkCtaSection } from './work/WorkCtaSection';

interface OurWorkPageProps {
  onOpenConsultationModal: (topic?: string) => void;
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({
  onOpenConsultationModal,
  onNavigateToServices,
  onNavigateToContact,
}) => {
  const projects = PROJECTS_DATA;
  const availableIndustries = useMemo(() => getDistinctIndustries(projects), [projects]);
  const showIndustryFilter = useMemo(() => shouldShowIndustryFilter(projects), [projects]);

  // Read initial filter values from URL query parameters
  const [selectedService, setSelectedService] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return getServiceFromSlug(params.get('service'));
    }
    return 'All';
  });

  const [selectedIndustry, setSelectedIndustry] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return getIndustryFromSlug(params.get('industry'), availableIndustries);
    }
    return 'All';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync filters to URL query string so filtered views can be shared
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    params.set('view', 'work');

    const serviceSlug = getServiceSlug(selectedService);
    if (serviceSlug) {
      params.set('service', serviceSlug);
    } else {
      params.delete('service');
    }

    const industrySlug = getIndustrySlug(selectedIndustry);
    if (industrySlug) {
      params.set('industry', industrySlug);
    } else {
      params.delete('industry');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [selectedService, selectedIndustry]);

  // Dynamic SEO metadata updates
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title =
      'Our Work | Magnetrix Digital - Digital Marketing Portfolio, New Delhi';

    // Meta description (~155 characters)
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Explore our portfolio of verified digital marketing work for clients across New Delhi and India—from web design and SEO to full-funnel Meta and Google Ads.'
    );

    // OpenGraph tags
    const setMetaProperty = (prop: string, val: string) => {
      let meta = document.querySelector(`meta[property="${prop}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', prop);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', val);
    };

    setMetaProperty(
      'og:title',
      'Our Work | Magnetrix Digital - Digital Marketing Portfolio, New Delhi'
    );
    setMetaProperty(
      'og:description',
      'Explore our portfolio of verified digital marketing work for clients across New Delhi and India—from web design and SEO to full-funnel Meta and Google Ads.'
    );
    setMetaProperty('og:type', 'website');
    if (typeof window !== 'undefined') {
      setMetaProperty('og:url', window.location.href);
    }

    // JSON-LD Structured Data
    const scriptId = 'magnetrix-portfolio-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://magnetrix.in';
    script.textContent = JSON.stringify(generatePortfolioSchema(projects, origin));

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, selectedService, selectedIndustry);
  }, [projects, selectedService, selectedIndustry]);

  const hasTestimonials = useMemo(() => hasAnyTestimonials(projects), [projects]);

  return (
    <div className="w-full relative z-20 pb-16 text-white selection:bg-red-500 selection:text-white">
      {/* 1. HERO SECTION */}
      <WorkHero
        brandsServedCount={projects.length}
        onOpenConsultation={() => onOpenConsultationModal('Work Portfolio Inquiry')}
      />

      {/* 2. FILTER BAR & 3. PROJECT GRID */}
      <section
        id="projects-grid"
        aria-label="Client projects portfolio"
        className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Filter Bar */}
          <FilterBar
            selectedService={selectedService}
            onSelectService={setSelectedService}
            selectedIndustry={selectedIndustry}
            onSelectIndustry={setSelectedIndustry}
            availableIndustries={availableIndustries}
            showIndustryFilter={showIndustryFilter}
            totalFilteredCount={filteredProjects.length}
          />

          {/* Project Cards Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={(p) => setSelectedProject(p)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Friendly Empty State if filter yields zero matches */
            <div className="text-center py-20 px-6 rounded-3xl border border-white/10 bg-neutral-950/60 backdrop-blur-md max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-6">
                No client projects match the selected filter criteria. Try resetting the filters to view all projects.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedService('All');
                  setSelectedIndustry('All');
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. SERVICES BEHIND THE WORK */}
      <ServicesBehindTheWork onNavigateToServices={onNavigateToServices} />

      {/* 5. TESTIMONIALS (CONDITIONAL: Omitted completely if no testimonials exist) */}
      {hasTestimonials && (
        <section
          aria-labelledby="testimonials-heading"
          className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10"
        >
          <div className="max-w-[1400px] mx-auto">
            <h2
              id="testimonials-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white mb-8"
            >
              Client Feedback
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects
                .filter((p) => p.testimonial && p.testimonial.quote)
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-6 rounded-3xl border border-white/10 bg-neutral-950/70"
                  >
                    <Quote className="w-5 h-5 text-amber-400 mb-3" />
                    <p className="text-neutral-200 text-sm italic mb-4">
                      "{p.testimonial?.quote}"
                    </p>
                    <div className="text-xs text-white font-semibold">
                      {p.testimonial?.name} · {p.testimonial?.role} ({p.clientName})
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. HOW WE DELIVER RESULTS */}
      <DeliverResultsStrip />

      {/* 7. FINAL CALL TO ACTION */}
      <WorkCtaSection
        onOpenConsultation={() => onOpenConsultationModal('General Portfolio Consultation')}
        onNavigateToContact={onNavigateToContact}
      />

      {/* Accessible Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={(topic) => onOpenConsultationModal(topic)}
      />
    </div>
  );
};
