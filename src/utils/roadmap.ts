/**
 * Data and pure calculation helpers for the Agency Client Onboarding Roadmap
 */

export interface RoadmapStage {
  id: string;
  stepNumber: string;
  phase: string;
  timeframe: string;
  title: string;
  description: string;
  tag: string;
  deliverables: string[];
  milestone: string;
  kpiTarget: string;
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: 'stage-1',
    stepNumber: '01',
    phase: 'Phase 01',
    timeframe: 'Days 1 – 14',
    title: 'Telemetry & Diagnostic Audit',
    tag: 'Onboarding & Auditing',
    description:
      'Deep forensic analysis of Core Web Vitals, server-side CAPI event match quality, ad auction query wastage, and competitive entity positioning.',
    deliverables: [
      'Server-Side Attribution Health Scorecard',
      'Cannibalization & Negative Keyword Audit',
      'Entity Graph & Semantic SEO Blueprint',
      'Funnel Drop-Off Session Heatmap Matrix',
    ],
    milestone: 'Attribution Baseline & Wastage Elimination',
    kpiTarget: '-25% ad spend leakage identified',
  },
  {
    id: 'stage-2',
    stepNumber: '02',
    phase: 'Phase 02',
    timeframe: 'Days 15 – 30',
    title: 'Infrastructure & Sprint 1 Deployment',
    tag: 'Rapid Architecture',
    description:
      'Deploying programmatic schema hierarchies, modular motion ad variants, custom automated bidding scripts, and server-side tracking pipelines.',
    deliverables: [
      '27 High-Velocity Modular Video Variants',
      'Automated Dayparting & Bid Capping Scripts',
      'Structured Data (Schema.org) Graph Rollout',
      'Lead Auto-Routing & CRM Webhook Sync',
    ],
    milestone: 'Live Multi-Channel Growth Architecture',
    kpiTarget: 'First documented CPA drop in 14 days',
  },
  {
    id: 'stage-3',
    stepNumber: '03',
    phase: 'Phase 03',
    timeframe: 'Days 31 – 60',
    title: 'Multivariate Scaling & Funnel Compression',
    tag: 'Scale Acceleration',
    description:
      'Continuous iterative testing across checkout friction, multi-step progressive form profiling, and bottom-funnel comparison guides.',
    deliverables: [
      'Fortnightly A/B Split Testing Cadence',
      'High-Conviction BOFU Product Comparison Pages',
      'Automated Lead Scoring & Slack Notifications',
      'Retargeting Frequency Capping Matrix',
    ],
    milestone: 'Unit Economics Expansion & CAC Compression',
    kpiTarget: '+45% visit-to-qualified-lead conversion',
  },
  {
    id: 'stage-4',
    stepNumber: '04',
    phase: 'Phase 04',
    timeframe: 'Days 61 – 90+',
    title: 'Autonomous Compounding & Moat Building',
    tag: 'Compounding Moat',
    description:
      'Transitioning to continuous predictive attribution modeling, offline CRM conversion streaming, and organic entity market benchmark dominance.',
    deliverables: [
      'Executive Board Bi-Weekly Pipeline Dashboard',
      'First-Party Offline Conversion Feedback Loops',
      'Programmatic Organic Category Domination',
      'Scalable In-House Playbook Hand-Off Protocols',
    ],
    milestone: 'Predictable, Self-Sustaining Commercial Inbound',
    kpiTarget: '3.5x+ Blended Pipeline ROAS',
  },
];

export function calculateTimelineProgress(currentStageIndex: number, totalStages: number): number {
  if (totalStages <= 1) return 100;
  const clamped = Math.max(0, Math.min(currentStageIndex, totalStages - 1));
  return Math.round((clamped / (totalStages - 1)) * 100);
}

export function getNextRoadmapIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return current >= total - 1 ? 0 : current + 1;
}

export function getPrevRoadmapIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return current <= 0 ? total - 1 : current - 1;
}
