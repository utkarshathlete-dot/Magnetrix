/**
 * Pure business logic and types for the dedicated Services Page
 */

export interface DetailedService {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'acquisition' | 'optimization' | 'creative' | 'telemetry';
  categoryLabel: string;
  headline: string;
  description: string;
  tools: string[];
  deliverables: string[];
  slaTimeline: string;
  impactMetric: {
    value: string;
    label: string;
  };
  recommendedFor: string;
  weeklyHours: number;
}

export const DETAILED_SERVICES_CATALOG: DetailedService[] = [
  {
    id: 'seo',
    number: '01.',
    title: 'Technical SEO & Entity Architecture',
    shortTitle: 'Technical SEO',
    category: 'acquisition',
    categoryLabel: 'Customer Acquisition',
    headline: 'High-Intent Organic Revenue Engine & Topic Clustering',
    description:
      'We engineer organic search visibility that compounds qualified pipeline. Beyond basic keyword matching, we optimize knowledge graphs, programmatic URL hierarchies, server render latency, and authoritative editorial backlinks.',
    tools: ['Screaming Frog', 'Ahrefs Enterprise', 'Google Search Console API', 'Next.js SSR', 'Schema.org'],
    deliverables: [
      'Comprehensive Core Web Vitals & Hydration Audits',
      'Entity Graph & Semantic Topic Architecture Mapping',
      'Programmatic Landing Page Generation Frameworks',
      'High-Tier Digital PR & Tier-1 Industry Editorial Placement',
      'Cannibalization Cleanup & Crawl Budget Streamlining',
    ],
    slaTimeline: '14-Day Sprint Deploy',
    impactMetric: {
      value: '+240%',
      label: 'Average organic pipeline expansion over 6 months',
    },
    recommendedFor: 'B2B SaaS and scaleups with underperforming organic channels',
    weeklyHours: 18,
  },
  {
    id: 'ppc',
    number: '02.',
    title: 'Algorithmic Paid Search & Social Performance',
    shortTitle: 'PPC & Paid Media',
    category: 'acquisition',
    categoryLabel: 'Customer Acquisition',
    headline: 'Full-Funnel Campaign Orchestration & Bid Caps',
    description:
      'We eliminate wasted ad spend with daily negative query scrubbing, predictive bidding scripts, and hyper-targeted LinkedIn account lists. Every advertising dollar is calibrated against pipeline revenue, not superficial vanity impressions.',
    tools: ['Google Ads Scripts', 'LinkedIn Campaign Manager', 'Meta Ads Graph API', 'HubSpot Offline Conversions'],
    deliverables: [
      'Google Search & PMax Machine Learning Asset Optimization',
      'Daily Negative Search Term Scrubbing Scripts',
      'LinkedIn ABM Account-Level Retargeting Sequences',
      'Margin-Based Real-Time Target ROAS & Bid Dayparting',
      'Cross-Channel Frequency Capping & Creative Rotations',
    ],
    slaTimeline: '7-Day Onboarding & Audit',
    impactMetric: {
      value: '-34%',
      label: 'Average blended CAC reduction across ad accounts',
    },
    recommendedFor: 'Companies spending $15K-$250K/mo on Google & LinkedIn ads',
    weeklyHours: 20,
  },
  {
    id: 'content',
    number: '03.',
    title: 'High-Conviction Content Strategy & Editorial',
    shortTitle: 'Content & Thought Leadership',
    category: 'creative',
    categoryLabel: 'Creative & Editorial',
    headline: 'ICP-Targeted Research, Comparison Guides & Tooling',
    description:
      'Deep-dive industry research, buyer comparison guides, whitepapers, and interactive diagnostic tools structured to compress complex enterprise sales cycles and position your executives as authoritative category benchmarks.',
    tools: ['Clearscope', 'MarketMuse', 'Figma', 'Notion Editorial Engine', 'Loom Diagnostic Workflows'],
    deliverables: [
      'Bottom-Funnel "Vs" & Alternative Product Comparison Matrix',
      'Proprietary Industry Benchmark Research & Whitepapers',
      'Executive Ghostwriting & LinkedIn Thought Leadership',
      'Interactive ROI Calculator & Diagnostic Tool Frameworks',
      'Multi-Format Repurposing (Video Snippets & Carousel Decks)',
    ],
    slaTimeline: 'Weekly Editorial Drop Cadence',
    impactMetric: {
      value: '3.8x',
      label: 'Average dwell time increase on technical long-form assets',
    },
    recommendedFor: 'Companies with high average contract values (> $10K ACV)',
    weeklyHours: 16,
  },
  {
    id: 'cro',
    number: '04.',
    title: 'Scientific Conversion Rate Optimization',
    shortTitle: 'CRO & Experimentation',
    category: 'optimization',
    categoryLabel: 'Conversion & CRO',
    headline: 'Multivariate Testing & Frictionless User Journeys',
    description:
      'Double your lead velocity without spending a dollar more on ad clicks. We analyze micro-conversion drop-off points, overhaul high-friction form structures, and conduct rigorous A/B split tests with statistical significance safeguards.',
    tools: ['PostHog', 'FullStory', 'Optimizely', 'Hotjar Heatmaps', 'Google Optimize Alternatives'],
    deliverables: [
      'Heatmap & User Session Drop-Off Diagnostic Reports',
      'Multivariate Value Proposition & Headline Split Testing',
      'Single-Click Progressive Form & Calendar Scheduling Flows',
      'Social Proof, Logo Walls & Security Badge Placement Optimization',
      'Mobile Checkout & CTA Sticky Navigation Ergonomics',
    ],
    slaTimeline: 'Continuous 14-Day Test Sprints',
    impactMetric: {
      value: '+58%',
      label: 'Average visit-to-lead conversion rate improvement',
    },
    recommendedFor: 'Websites with > 15,000 monthly unique visitors',
    weeklyHours: 15,
  },
  {
    id: 'creative',
    number: '05.',
    title: 'Performance Creative & Motion Production',
    shortTitle: 'Creative & Motion',
    category: 'creative',
    categoryLabel: 'Creative & Editorial',
    headline: 'High-Velocity Video, Dynamic Typography & Modular Ads',
    description:
      'Creative that stops the scroll and communicates differentiated value props in seconds. We produce high-fidelity 2D/3D motion graphics, product walkthroughs, static ad variations, and founder-led video assets designed for performance.',
    tools: ['After Effects', 'Premiere Pro', 'Figma', 'Blender 3D', 'Lottie Animations'],
    deliverables: [
      'High-Resolution Modular 9:16 and 16:9 Video Ad Variations',
      'Interactive Product Demo Screen Recordings & Callouts',
      'High-Contrast Static Ad Decks with Modular Headline Testing',
      'SVG Micro-Animations & Interactive Brand Illustration Sets',
      'Ad Creative Fatigue Replacement Queue',
    ],
    slaTimeline: '10 Business Days Production Turnaround',
    impactMetric: {
      value: '2.4x',
      label: 'Higher CTR compared to stock creative benchmarks',
    },
    recommendedFor: 'Brands looking to scale visual paid social campaigns',
    weeklyHours: 18,
  },
  {
    id: 'telemetry',
    number: '06.',
    title: 'Marketing Automation & Telemetry Architecture',
    shortTitle: 'Telemetry & Attribution',
    category: 'telemetry',
    categoryLabel: 'Telemetry & Architecture',
    headline: 'Multi-Touch Attribution & Offline Conversion Sync',
    description:
      'Eliminate black-box attribution. We bridge web analytics, CRM pipeline stages, and server-side conversion APIs so your executive leadership has real-time visibility into exact customer acquisition cost and customer lifetime value.',
    tools: ['Google BigQuery', 'Segment', 'HubSpot Enterprise', 'Salesforce Marketing Cloud', 'Server-Side GTM'],
    deliverables: [
      'Server-Side Google Tag Manager & Meta CAPI Configuration',
      'First-Party CRM Lifecycle Stage Tracking & Lead Scoring',
      'Automated Executive Pipeline Health & ROAS Dashboards',
      'Cold Inbound Lead Auto-Routing & Instant Slack Alerts',
      'Cohort Payback Velocity & Churn Prediction Telemetry',
    ],
    slaTimeline: '21-Day Full Infrastructure Deployment',
    impactMetric: {
      value: '100%',
      label: 'Direct server-side attribution visibility across pipeline',
    },
    recommendedFor: 'Complex sales cycles with multiple stakeholder touchpoints',
    weeklyHours: 14,
  },
];

export function filterDetailedServices(
  services: DetailedService[],
  category: string,
  searchQuery: string
): DetailedService[] {
  const query = searchQuery.trim().toLowerCase();

  return services.filter((service) => {
    const matchesCategory = category === 'all' || service.category === category;
    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.headline.toLowerCase().includes(query) ||
      service.tools.some((t) => t.toLowerCase().includes(query)) ||
      service.deliverables.some((d) => d.toLowerCase().includes(query))
    );
  });
}

export interface SquadEstimate {
  selectedCount: number;
  totalWeeklyHours: number;
  recommendedEngineers: number;
  estimatedSprintDuration: string;
}

export function calculateSquadEstimate(selectedIds: string[]): SquadEstimate {
  const selectedServices = DETAILED_SERVICES_CATALOG.filter((s) => selectedIds.includes(s.id));
  const totalWeeklyHours = selectedServices.reduce((sum, s) => sum + s.weeklyHours, 0);

  let recommendedEngineers = 1;
  if (totalWeeklyHours > 45) {
    recommendedEngineers = 3;
  } else if (totalWeeklyHours > 20) {
    recommendedEngineers = 2;
  }

  let estimatedSprintDuration = '60-Day Sprint';
  if (selectedServices.length >= 4) {
    estimatedSprintDuration = '90-Day Comprehensive Growth Sprint';
  } else if (selectedServices.length <= 1) {
    estimatedSprintDuration = '30-Day Quick-Strike Sprint';
  }

  return {
    selectedCount: selectedServices.length,
    totalWeeklyHours,
    recommendedEngineers,
    estimatedSprintDuration,
  };
}
