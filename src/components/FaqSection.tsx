import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Search,
  Code2,
  Copy,
  Check,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  FaqItem,
  toggleAccordionId,
  filterFaqs,
  generateFaqSchema,
  getFaqJsonLdString,
} from '../utils/faq';

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'pricing-model',
    category: 'pricing',
    question: 'What is your pricing model, and what is the typical monthly investment?',
    answer:
      'Our engagements are structured as dedicated monthly growth retainers. Single-channel partnerships (such as Technical SEO or Google Ads PMax management) start at $4,500/month, while full-funnel multi-channel growth architectures typically range between $7,500 and $14,000/month. We never charge arbitrary onboarding fees or take hidden percentage markups on your media spend.',
    keyTakeaway: 'Predictable monthly retainers with 100% transparent fee structures.',
  },
  {
    id: 'ad-spend-billing',
    category: 'pricing',
    question: 'Is advertising media spend included in your retainer fee?',
    answer:
      'No. All media spend is billed directly by the respective platforms (Google Ads, Meta, LinkedIn, TikTok) to your corporate credit line. This guarantees that your company retains complete legal ownership of all advertising accounts, historical conversion pixels, audience lists, and billing credits.',
    keyTakeaway: 'You own all platform accounts and credit lines directly.',
  },
  {
    id: 'contract-duration',
    category: 'pricing',
    question: 'What is the contract commitment, and do you lock clients into long-term contracts?',
    answer:
      'We begin with an initial 90-day diagnostic and acceleration sprint. This timeline allows us to audit tracking infrastructure, deploy baseline creative variants, and achieve statistical significance on initial growth loops. Following the initial 90 days, all agreements convert to rolling month-to-month retainers requiring 30 days notice.',
    keyTakeaway: '90-day initial acceleration sprint, followed by rolling 30-day terms.',
  },
  {
    id: 'internal-collaboration',
    category: 'services',
    question: 'Can your team collaborate with our in-house marketing and development teams?',
    answer:
      'Yes. Over 60% of our enterprise partners maintain internal teams. We embed directly into your corporate Slack or Microsoft Teams channels and synchronize with your project management stacks (Linear, Asana, Jira). We can either operate as a fully autonomous growth unit or as a specialized technical strike team.',
    keyTakeaway: 'Direct Slack integration and collaborative sprint execution.',
  },
  {
    id: 'reporting-telemetry',
    category: 'reporting',
    question: 'How often do you report on performance, and what metrics are prioritized?',
    answer:
      'You receive 24/7 access to a custom first-party BI dashboard tracking multi-touch attribution, blended customer acquisition cost (CAC), pipeline velocity, and return on ad spend (ROAS). In addition, we conduct bi-weekly strategic executive syncs and provide weekly asynchronous telemetry video breakdowns.',
    keyTakeaway: 'Real-time BI telemetry, weekly async briefings, and bi-weekly executive calls.',
  },
  {
    id: 'timeline-results',
    category: 'services',
    question: 'How quickly will we see measurable pipeline growth?',
    answer:
      'Paid acquisition campaigns (Search, Meta, LinkedIn) typically generate validated leads and initial attribution data within the first 10–14 days after tracking deployment. Organic compounding frameworks—such as technical SEO, semantic keyword clusters, and programmatic pages—typically gain search ranking authority between days 45 and 90.',
    keyTakeaway: 'Paid traction within 14 days; compounding organic momentum in 45–90 days.',
  },
  {
    id: 'budget-allocation',
    category: 'services',
    question: 'How do you decide budget distribution across SEO, PPC, and Content?',
    answer:
      'We run an initial Unit Economics Diagnostic evaluating your average deal size, sales cycle length, and current cash efficiency. If immediate pipeline velocity is required to feed an active sales team, we weight initial allocations 65% toward bottom-funnel paid search while simultaneously deploying authority SEO clusters to lower blended CAC over time.',
    keyTakeaway: 'Custom allocation based on payback period and sales cycle duration.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [openId, setOpenId] = useState<string | null>('pricing-model');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSchemaModal, setShowSchemaModal] = useState<boolean>(false);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const filteredFaqs = filterFaqs(FAQ_DATA, activeCategory, searchQuery);
  const faqSchemaJsonString = getFaqJsonLdString(FAQ_DATA);

  // Dynamically attach Schema.org FAQPage JSON-LD to document.head for search crawlers
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let scriptTag = document.head.querySelector<HTMLScriptElement>('script#faq-json-ld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-json-ld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = faqSchemaJsonString;

    return () => {
      const existing = document.head.querySelector('script#faq-json-ld');
      if (existing) {
        existing.remove();
      }
    };
  }, [faqSchemaJsonString]);

  const handleCopySchema = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(faqSchemaJsonString);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    }
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'pricing', label: 'Pricing & Billing' },
    { id: 'services', label: 'Services & Scope' },
    { id: 'reporting', label: 'Reporting & Telemetry' },
  ];

  const handleToggle = (id: string) => {
    setOpenId((prev) => toggleAccordionId(prev, id));
  };

  return (
    <section
      id="faq"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="faq-heading"
    >
      {/* Schema.org FAQPage JSON-LD Structured Data embedded in body */}
      <script
        type="application/ld+json"
        id="faq-body-jsonld"
        dangerouslySetInnerHTML={{
          __html: faqSchemaJsonString,
        }}
      />

      {/* Background ambient red glow */}
      <div
        className="absolute bottom-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/[0.035] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-2xl">
            {/* Editorial Kicker & Schema.org Badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span>Client Intelligence & FAQs</span>
              </div>
              <span className="text-neutral-600">·</span>
              <button
                type="button"
                onClick={() => setShowSchemaModal(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
                title="View Schema.org FAQPage structured data JSON-LD"
              >
                <Code2 className="w-3 h-3 text-emerald-400" />
                <span>Schema.org FAQPage (JSON-LD) Active</span>
              </button>
            </div>

            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Frequently Asked{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">Questions</span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Clear answers regarding our retainer models, platform account governance,
              attribution telemetry, and working relationships.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full sm:w-60 pl-10 pr-4 py-2 bg-black/60 border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors backdrop-blur-md"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-black/60 border border-white/15 rounded-xl backdrop-blur-md">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-red-600 text-white shadow-[0_2px_10px_rgba(220,38,38,0.35)]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-10 max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md p-6">
              <HelpCircle className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
              <p className="text-neutral-300 text-sm font-medium">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 text-xs text-red-400 hover:text-red-300 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                    isOpen
                      ? 'border-red-500/60 bg-neutral-950/85 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
                      : 'border-white/10 bg-black/45 hover:border-white/25 hover:bg-neutral-950/60'
                  }`}
                >
                  {/* Collapsible Header Button */}
                  <button
                    type="button"
                    onClick={() => handleToggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left px-6 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                      {faq.question}
                    </span>

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'border-red-500 bg-red-600 text-white rotate-180'
                          : 'border-white/15 bg-white/[0.05] text-neutral-300 hover:text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Collapsible Body */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-[15px] text-neutral-300 leading-relaxed border-t border-white/[0.06] animate-in fade-in slide-in-from-top-1 duration-200"
                    >
                      <p>{faq.answer}</p>

                      {faq.keyTakeaway && (
                        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-neutral-400">
                          <span className="text-red-400 font-semibold uppercase tracking-wider text-[11px]">
                            Key Takeaway:
                          </span>
                          <span>{faq.keyTakeaway}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Conversion Prompt Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-white/15 bg-gradient-to-r from-black/80 via-neutral-950/90 to-red-950/30 backdrop-blur-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Have specific economics or technical requirements?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Speak directly with a senior growth director to evaluate your unit economics and
              channel opportunities.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] cursor-pointer shrink-0 active:scale-[0.98]"
          >
            <span>Ask a Growth Director</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Schema.org FAQPage JSON-LD Modal */}
      {showSchemaModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schema-modal-title"
        >
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col text-neutral-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 mb-2">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Google Rich Results & SERP Visibility</span>
                </div>
                <h3
                  id="schema-modal-title"
                  className="text-lg sm:text-xl font-bold text-white tracking-tight"
                >
                  FAQPage Schema.org Structured Data (JSON-LD)
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Embedded in <code>&lt;head&gt;</code> and DOM body to enable rich expandable FAQ snippets on Google Search.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSchemaModal(false)}
                className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close schema modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2 py-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                @type: <strong>FAQPage</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                Questions: <strong>{FAQ_DATA.length} Entities</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                ✓ Valid Schema.org
              </span>
            </div>

            {/* Code Box */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-neutral-300">
              <div className="overflow-y-auto max-h-[45vh] pr-2 scrollbar-thin">
                <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300/90">
                  {faqSchemaJsonString}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-4 border-t border-white/10">
              <a
                href="https://developers.google.com/search/docs/appearance/structured-data/faqpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Google Search Central FAQ Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopySchema}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  {copiedSchema ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied JSON-LD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON-LD</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSchemaModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
