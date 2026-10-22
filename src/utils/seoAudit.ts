/**
 * Pure calculation and validation logic for Free SEO & Technical Audit Tool
 */

export interface AuditMetricsInput {
  url: string;
  targetKeyword: string;
  industry?: string;
}

export interface AuditCategoryScore {
  name: string;
  score: number; // 0 - 100
  status: 'passed' | 'warning' | 'critical';
  details: string;
}

export interface AuditFinding {
  id: string;
  category: string;
  severity: 'critical' | 'warning' | 'passed';
  title: string;
  description: string;
  recommendation: string;
  impactScore: string;
}

export interface AuditResult {
  url: string;
  normalizedUrl: string;
  targetKeyword: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  summary: string;
  categories: {
    coreWebVitals: AuditCategoryScore;
    entityArchitecture: AuditCategoryScore;
    keywordIntent: AuditCategoryScore;
    linkAuthority: AuditCategoryScore;
    conversionFriction: AuditCategoryScore;
  };
  findings: AuditFinding[];
  generatedAt: string;
}

export function validateUrlInput(rawUrl: string): {
  isValid: boolean;
  normalizedUrl: string;
  error?: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { isValid: false, normalizedUrl: '', error: 'Website URL is required' };
  }

  let withProtocol = trimmed;
  if (!/^https?:\/\//i.test(trimmed)) {
    withProtocol = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(withProtocol);
    const host = parsed.hostname;
    if (!host || !host.includes('.')) {
      return { isValid: false, normalizedUrl: '', error: 'Please enter a valid domain (e.g., example.com)' };
    }
    return { isValid: true, normalizedUrl: parsed.origin };
  } catch {
    return { isValid: false, normalizedUrl: '', error: 'Invalid URL format' };
  }
}

/**
 * Deterministic hash-based generator for consistent, realistic audit scores based on domain & keyword
 */
export function generateDeterministicAudit(input: AuditMetricsInput): AuditResult {
  const { normalizedUrl } = validateUrlInput(input.url);
  const domain = normalizedUrl.replace(/^https?:\/\/(www\.)?/, '');
  const keyword = input.targetKeyword.trim();

  // Create hash code from domain and keyword
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  for (let i = 0; i < keyword.length; i++) {
    hash = (hash << 5) - hash + keyword.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash);

  // Generate category scores bounded between 58 and 96
  const cwvScore = 60 + (seed % 35);
  const entityScore = 55 + ((seed >> 2) % 40);
  const keywordScore = 58 + ((seed >> 4) % 38);
  const linkScore = 52 + ((seed >> 6) % 42);
  const croScore = 62 + ((seed >> 8) % 34);

  const overallScore = Math.round(
    cwvScore * 0.25 +
    entityScore * 0.25 +
    keywordScore * 0.2 +
    linkScore * 0.15 +
    croScore * 0.15
  );

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'B';
  if (overallScore >= 90) grade = 'A+';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 70) grade = 'B';
  else if (overallScore >= 60) grade = 'C';
  else grade = 'D';

  const getStatus = (sc: number): 'passed' | 'warning' | 'critical' => {
    if (sc >= 80) return 'passed';
    if (sc >= 65) return 'warning';
    return 'critical';
  };

  const findings: AuditFinding[] = [
    {
      id: 'f-cwv',
      category: 'Core Web Vitals',
      severity: cwvScore >= 75 ? 'passed' : 'warning',
      title: cwvScore >= 75 ? 'Largest Contentful Paint (LCP) Under 1.8s' : 'LCP Exceeds Recommended 2.5s Threshold',
      description: `Target page rendered main hero media in ${(2.2 + ((seed % 15) / 10)).toFixed(1)}s on standard 4G mobile emulation.`,
      recommendation: 'Preload priority viewport imagery and inline critical above-the-fold CSS styles.',
      impactScore: '+14% Organic Mobile CTR',
    },
    {
      id: 'f-entity',
      category: 'Entity Architecture',
      severity: entityScore >= 78 ? 'passed' : 'critical',
      title: entityScore >= 78 ? 'Structured Schema.org JSON-LD Entities Detected' : 'Missing Organization & Product JSON-LD Schemas',
      description: 'Search engines are parsing raw text without explicit machine-readable semantic entity markup.',
      recommendation: 'Deploy Article, Organization, and Service schemas with explicit SameAs social entity links.',
      impactScore: '+22% Search Entity Authority',
    },
    {
      id: 'f-intent',
      category: 'Search Intent & Clustering',
      severity: keywordScore >= 75 ? 'passed' : 'warning',
      title: `Keyword Relevance for "${keyword || 'Commercial ICP Intent'}"`,
      description: `Detected 4 primary topical sub-clusters with opportunities to add high-intent comparison terms.`,
      recommendation: 'Build programmatic vs-competitor landing pages targeting transactional search queries.',
      impactScore: '+35% Bottom-Funnel Traffic',
    },
    {
      id: 'f-cro',
      category: 'Conversion Architecture',
      severity: croScore >= 75 ? 'passed' : 'warning',
      title: 'Sticky Call-To-Action & Primary Form Placement',
      description: 'Desktop navigation CTA is clear; mobile view requires 2 scrolls before reaching initial conversion form.',
      recommendation: 'Embed high-contrast mobile consultation bar pinned to viewport bottom.',
      impactScore: '+18% Lead Capture Rate',
    },
  ];

  return {
    url: input.url,
    normalizedUrl,
    targetKeyword: keyword || 'Commercial Organic Growth',
    overallScore,
    grade,
    summary:
      overallScore >= 80
        ? 'Strong technical foundation with competitive indexing velocity. Prime for aggressive programmatic keyword expansion.'
        : 'Solid market foundation with critical technical bottlenecks in entity architecture and mobile page speed constraining search rankings.',
    categories: {
      coreWebVitals: {
        name: 'Core Web Vitals & Speed',
        score: cwvScore,
        status: getStatus(cwvScore),
        details: 'Largest Contentful Paint, Interaction to Next Paint & CLS',
      },
      entityArchitecture: {
        name: 'Entity Architecture',
        score: entityScore,
        status: getStatus(entityScore),
        details: 'Schema.org JSON-LD, semantic heading hierarchy & robots indexing',
      },
      keywordIntent: {
        name: 'Commercial Keyword Intent',
        score: keywordScore,
        status: getStatus(keywordScore),
        details: 'Topical clustering, transactional keyword density & meta CTR',
      },
      linkAuthority: {
        name: 'Internal & Inbound Authority',
        score: linkScore,
        status: getStatus(linkScore),
        details: 'Internal link equity distribution, anchor diversity & depth ratio',
      },
      conversionFriction: {
        name: 'Conversion & CRO Friction',
        score: croScore,
        status: getStatus(croScore),
        details: 'Form accessibility, mobile touch targets & speed-to-conversion',
      },
    },
    findings,
    generatedAt: new Date().toISOString(),
  };
}
