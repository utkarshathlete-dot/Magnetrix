/**
 * Magnetrix Digital - Client Projects Portfolio Data
 * 
 * EDITING GUIDE FOR UTKARSH GIRI / AGENCY TEAM:
 * To add or update case studies, edit the fields below:
 * - id: unique URL-safe string identifier
 * - clientName: business name
 * - industry: industry name (or 'Industry: To be added' if pending)
 * - services: array of services provided
 * - shortDescription: single neutral, factual sentence
 * - challenge: (optional) initial business problem or hurdle
 * - solution: (optional) strategic execution and creative approach
 * - results: (optional) array of { label, value } factual metrics
 * - testimonial: (optional) { quote, name, role } verified client quote
 * - image: (optional) path or URL to project showcase visual
 * - websiteUrl: (optional) live client website link
 * 
 * NOTE: Where optional fields are left undefined or empty, the UI cleanly
 * omits those blocks with zero empty headings or layout breaks.
 */

export interface ProjectResult {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  clientName: string;
  industry: string;
  services: string[];
  shortDescription: string;
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  testimonial?: ProjectTestimonial;
  image?: string;
  websiteUrl?: string;
}

export const INDUSTRY_PLACEHOLDER = 'Industry: To be added';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'screen-fixer',
    clientName: 'Screen Fixer',
    industry: INDUSTRY_PLACEHOLDER,
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Screen Fixer.',
  },
  {
    id: 'primex-laboratories',
    clientName: 'Primex Laboratories',
    industry: INDUSTRY_PLACEHOLDER,
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Primex Laboratories.',
  },
  {
    id: 'kumbh-camp-om',
    clientName: 'Kumbh Camp Om',
    industry: INDUSTRY_PLACEHOLDER,
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Kumbh Camp Om.',
  },
  {
    id: 'anantraj-consultancy',
    clientName: 'Anantraj Consultancy',
    industry: INDUSTRY_PLACEHOLDER,
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Anantraj Consultancy.',
  },
  {
    id: 'axma-international',
    clientName: 'Axma International Event Hub Pvt Ltd',
    industry: INDUSTRY_PLACEHOLDER,
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Axma International Event Hub Pvt Ltd.',
  },
  {
    id: 'urban-viraasat',
    clientName: 'Urban Viraasat',
    industry: 'Real Estate',
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Urban Viraasat.',
  },
  {
    id: 'aidue-holidays',
    clientName: 'Aidue Holidays',
    industry: 'Travel',
    services: ['Website Design', 'Social Media Marketing', 'Meta Ads', 'Google Ads'],
    shortDescription:
      'Website design, social media marketing, and Meta and Google Ads campaigns for Aidue Holidays.',
  },
];
