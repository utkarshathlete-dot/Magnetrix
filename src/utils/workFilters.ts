import { type Project, INDUSTRY_PLACEHOLDER } from '../data/projects.ts';

export const SERVICE_FILTERS = [
  'All',
  'Website Design',
  'Social Media Marketing',
  'Meta Ads',
  'Google Ads',
] as const;

export type ServiceFilter = (typeof SERVICE_FILTERS)[number];

export const SERVICE_SLUG_MAP: Record<string, string> = {
  'website-design': 'Website Design',
  'social-media-marketing': 'Social Media Marketing',
  'meta-ads': 'Meta Ads',
  'google-ads': 'Google Ads',
};

export const REVERSE_SERVICE_SLUG_MAP: Record<string, string> = {
  'Website Design': 'website-design',
  'Social Media Marketing': 'social-media-marketing',
  'Meta Ads': 'meta-ads',
  'Google Ads': 'google-ads',
};

/**
 * Normalizes service string to URL-safe slug
 */
export function getServiceSlug(service: string): string {
  return REVERSE_SERVICE_SLUG_MAP[service] || '';
}

/**
 * Resolves filter name from URL slug
 */
export function getServiceFromSlug(slug: string | null): string {
  if (!slug) return 'All';
  return SERVICE_SLUG_MAP[slug] || 'All';
}

/**
 * Normalizes industry name to URL-safe slug
 */
export function getIndustrySlug(industry: string): string {
  if (!industry || industry === 'All' || industry === INDUSTRY_PLACEHOLDER) return '';
  return industry.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Resolves industry name from URL slug based on available industries
 */
export function getIndustryFromSlug(slug: string | null, availableIndustries: string[]): string {
  if (!slug || slug === 'all') return 'All';
  const match = availableIndustries.find(
    (ind) => getIndustrySlug(ind) === slug
  );
  return match || 'All';
}

/**
 * Extracts distinct, verified industries (excluding placeholder)
 */
export function getDistinctIndustries(projects: Project[]): string[] {
  const set = new Set<string>();
  for (const project of projects) {
    if (
      project.industry &&
      project.industry.trim() !== '' &&
      project.industry !== INDUSTRY_PLACEHOLDER
    ) {
      set.add(project.industry.trim());
    }
  }
  return Array.from(set).sort();
}

/**
 * Per requirement: Optional second filter by industry appears ONLY when
 * at least two distinct industries are filled in.
 */
export function shouldShowIndustryFilter(projects: Project[]): boolean {
  return getDistinctIndustries(projects).length >= 2;
}

/**
 * Filters projects by both service and industry
 */
export function filterProjects(
  projects: Project[],
  selectedService: string = 'All',
  selectedIndustry: string = 'All'
): Project[] {
  return projects.filter((project) => {
    // Service filter check
    const matchesService =
      selectedService === 'All' || project.services.includes(selectedService);

    // Industry filter check
    const matchesIndustry =
      selectedIndustry === 'All' ||
      (project.industry &&
        project.industry !== INDUSTRY_PLACEHOLDER &&
        project.industry.toLowerCase() === selectedIndustry.toLowerCase());

    return matchesService && matchesIndustry;
  });
}

/**
 * Checks whether any project in the portfolio contains verified testimonial data
 */
export function hasAnyTestimonials(projects: Project[]): boolean {
  return projects.some(
    (project) =>
      project.testimonial &&
      project.testimonial.quote &&
      project.testimonial.quote.trim().length > 0
  );
}

/**
 * Generates initial monogram letters for placeholder branding
 */
export function getClientInitials(name: string): string {
  if (!name) return 'MD';
  const clean = name.replace(/[^\w\s]/g, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Generates Schema.org ItemList / CollectionPage structured data for SEO
 */
export function generatePortfolioSchema(projects: Project[], origin: string = 'https://magnetrix.in') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Work | Magnetrix Digital Portfolio',
    description:
      'Verified digital marketing and advertising portfolio of Magnetrix Digital serving clients in New Delhi and globally.',
    url: `${origin}/?view=work`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: `${project.clientName} - Growth & Marketing Portfolio`,
          headline: project.shortDescription,
          creator: {
            '@type': 'Organization',
            name: 'Magnetrix Digital',
            url: origin,
          },
          keywords: project.services.join(', '),
        },
      })),
    },
  };
}
