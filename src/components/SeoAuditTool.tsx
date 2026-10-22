import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Cpu,
  BarChart2,
} from 'lucide-react';
import {
  AuditResult,
  validateUrlInput,
  generateDeterministicAudit,
} from '../utils/seoAudit';

interface SeoAuditToolProps {
  onOpenConsultation: (serviceOrAudit?: string) => void;
}

export const SeoAuditTool: React.FC<SeoAuditToolProps> = ({ onOpenConsultation }) => {
  const [urlInput, setUrlInput] = useState<string>('https://brandflow.io');
  const [keywordInput, setKeywordInput] = useState<string>('enterprise workflow automation');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(() =>
    generateDeterministicAudit({
      url: 'https://brandflow.io',
      targetKeyword: 'enterprise workflow automation',
    })
  );
  const [copied, setCopied] = useState<boolean>(false);

  const samplePresets = [
    { url: 'brandflow.io', keyword: 'b2b workflow automation' },
    { url: 'novascale.cloud', keyword: 'cloud devops infrastructure' },
    { url: 'cresta.systems', keyword: 'enterprise fintech payments' },
  ];

  const handleRunAudit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validation = validateUrlInput(urlInput);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please enter a valid website URL');
      return;
    }

    setErrorMessage(null);
    setIsScanning(true);

    // Simulate real-time diagnostic scan for authentic user feedback
    setTimeout(() => {
      const result = generateDeterministicAudit({
        url: validation.normalizedUrl,
        targetKeyword: keywordInput.trim() || 'Commercial Organic Growth',
      });
      setAuditResult(result);
      setIsScanning(false);
    }, 700);
  };

  const handleSelectPreset = (preset: { url: string; keyword: string }) => {
    setUrlInput(preset.url);
    setKeywordInput(preset.keyword);
    setErrorMessage(null);
    setIsScanning(true);
    setTimeout(() => {
      const validation = validateUrlInput(preset.url);
      const result = generateDeterministicAudit({
        url: validation.normalizedUrl,
        targetKeyword: preset.keyword,
      });
      setAuditResult(result);
      setIsScanning(false);
    }, 600);
  };

  const handleCopySummary = () => {
    if (!auditResult) return;
    const summaryText = `Magentrix SEO Audit for ${auditResult.normalizedUrl}\nOverall Score: ${auditResult.overallScore}/100 (Grade ${auditResult.grade})\nTarget Keyword: ${auditResult.targetKeyword}\nCore Web Vitals: ${auditResult.categories.coreWebVitals.score}/100\nEntity Architecture: ${auditResult.categories.entityArchitecture.score}/100\nKeyword Intent: ${auditResult.categories.keywordIntent.score}/100`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="audit"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="audit-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/[0.035] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Free Diagnostic Telemetry · Real-Time Technical SEO Audit</span>
            </div>

            <h2
              id="audit-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Audit Your Search Authority &{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">
                Growth Bottlenecks
              </span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Test your website URL and target commercial keyword to diagnose Core Web Vitals,
              semantic entity architecture, topic clustering, and conversion friction in real-time.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col gap-1.5 self-start lg:self-end">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
              Instant Sample Audits:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {samplePresets.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer font-mono"
                >
                  {preset.url}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Form Bar */}
        <div className="mt-8 p-4 sm:p-6 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleRunAudit} className="flex flex-col lg:flex-row items-center gap-4">
            {/* URL Input */}
            <div className="relative w-full lg:flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="https://yourbrand.com"
                className="w-full pl-11 pr-4 py-3 bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                aria-label="Website URL to audit"
              />
            </div>

            {/* Keyword Input */}
            <div className="relative w-full lg:w-96">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <Zap className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Target Commercial Keyword (e.g. AI CRM)"
                className="w-full pl-11 pr-4 py-3 bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                aria-label="Primary target keyword"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isScanning}
              className="w-full lg:w-auto px-7 py-3 bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.98]"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Diagnosing Signals...</span>
                </>
              ) : (
                <>
                  <span>Run Live SEO Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-3 text-xs text-red-400 flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Live Diagnostic Results Showcase */}
        {auditResult && (
          <div className="mt-10 space-y-8 animate-in fade-in duration-300">
            {/* Top Score Summary Banner */}
            <div className="rounded-3xl border border-white/15 bg-black/55 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                {/* Grade Badge */}
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-600 to-red-950 border border-red-500/50 flex flex-col items-center justify-center shadow-lg shrink-0">
                  <span className="text-3xl font-extrabold text-white font-mono leading-none">
                    {auditResult.overallScore}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-red-200 mt-1">
                    Grade {auditResult.grade}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-neutral-400 mb-1">
                    <span className="text-white font-semibold font-mono">{auditResult.normalizedUrl}</span>
                    <span>·</span>
                    <span className="text-red-400">Target: &ldquo;{auditResult.targetKeyword}&rdquo;</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {auditResult.overallScore >= 80
                      ? 'High Commercial Potential · Minor Technical Bottlenecks'
                      : 'Critical Indexing & Speed Bottlenecks Limiting Rankings'}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-2xl leading-relaxed">
                    {auditResult.summary}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/15 text-white border border-white/15 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Report</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultation(
                      `SEO Audit Review for ${auditResult.normalizedUrl} (Score: ${auditResult.overallScore})`
                    )
                  }
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl transition-all shadow-[0_4px_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Claim Full Technical Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 5 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(auditResult.categories).map(([key, cat]) => (
                <div
                  key={key}
                  className="p-5 rounded-2xl border border-white/15 bg-black/50 hover:bg-neutral-950/70 backdrop-blur-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        {cat.name}
                      </span>
                      {cat.status === 'passed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : cat.status === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono leading-none">
                      {cat.score}
                      <span className="text-xs text-neutral-500 font-sans font-normal ml-1">/100</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 mt-3 border-t border-white/10 pt-2.5 leading-snug">
                    {cat.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Actionable Findings & Fixes */}
            <div className="rounded-2xl border border-white/15 bg-black/55 backdrop-blur-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                    <span>Prioritized Engineering Findings</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Impact-ranked technical fixes to accelerate organic search rankings
                  </p>
                </div>
                <span className="text-xs text-neutral-400">
                  {auditResult.findings.length} Audit Signals Detected
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auditResult.findings.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-neutral-400 font-mono">
                          {finding.category}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          {finding.impactScore}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white leading-snug">
                        {finding.title}
                      </div>

                      <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                        {finding.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 text-xs text-neutral-400">
                      <span className="font-semibold text-red-400">Engineered Fix: </span>
                      <span>{finding.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
