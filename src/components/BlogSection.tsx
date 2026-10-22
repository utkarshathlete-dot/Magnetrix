import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  X,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  BlogPost,
  calculateMaxSlideIndex,
  getNextSlideIndex,
  getPrevSlideIndex,
} from '../utils/blog';

interface BlogSectionProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateToBlog?: () => void;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'pmax-breakdown',
    category: 'Paid Acquisition',
    title: 'Deconstructing Google PMax: Algorithmic Bid Caps & Negative Scrubbing',
    teaser:
      'How we prevent automated Google campaigns from cannibalizing brand search queries and wasting enterprise media budget on low-intent display impressions.',
    readTime: '8 min read',
    publishDate: 'Oct 14, 2026',
    author: {
      name: 'Alexander Vance',
      role: 'Head of Algorithmic Growth',
      initials: 'AV',
    },
    keyTakeaway: 'Always isolate branded search terms and apply custom script bid capping.',
    fullOverview: [
      'Performance Max algorithms prioritize easy conversions over incremental revenue unless bounded by strict dayparting and bid boundaries.',
      'Our team deploys automated negative keyword scripts via Google Ads Scripts API that dynamically flag brand term cannibalization.',
      'Across 40+ client accounts, this intervention reduced blended CPA by an average of 34% within the first 30 days of implementation.',
    ],
  },
  {
    id: 'entity-seo-2026',
    category: 'Technical SEO',
    title: 'The 2026 Entity SEO Playbook: Machine-Readable Schemas & Semantic Graphs',
    teaser:
      'Search engines have moved beyond isolated keyword strings to entity relationships. Here is our framework for architecting authoritative semantic graph hierarchies.',
    readTime: '11 min read',
    publishDate: 'Oct 08, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Technical SEO Architect',
      initials: 'ER',
    },
    keyTakeaway: 'Build explicit Schema.org JSON-LD SameAs links connecting your brand to industry entities.',
    fullOverview: [
      'Modern LLM search agents parse entities, not mere text frequencies. Sites lacking explicit JSON-LD relational data are systematically bypassed.',
      'We demonstrate how to structure Organization, Service, and TechArticle schemas that establish unequivocal topical authority.',
      'Case study: BrandFlow scaled from 18K to 82K monthly organic visits after implementing nested entity graph structures.',
    ],
  },
  {
    id: 'server-side-telemetry',
    category: 'Attribution & BI',
    title: 'Server-Side Attribution in a Cookieless Era: First-Party Telemetry',
    teaser:
      'Third-party cookies and browser tracking restrictions break attribution. Discover how first-party server-to-server CAPI streams restore 100% pipeline visibility.',
    readTime: '9 min read',
    publishDate: 'Sep 27, 2026',
    author: {
      name: 'David Kalu',
      role: 'Director of Conversion Telemetry',
      initials: 'DK',
    },
    keyTakeaway: 'Direct server-side conversions bypass iOS 14.5+ ad blockers and browser cookie decay.',
    fullOverview: [
      'Client-side tracking pixels now lose up to 35% of conversion events due to browser privacy sandboxes and ad-blocking extensions.',
      'We configure server-side Google Enhanced Conversions and Meta Conversions API (CAPI) streaming directly from your CRM.',
      'Results in real-time attribution accuracy and significantly tighter feedback loops for automated bidding algorithms.',
    ],
  },
  {
    id: 'modular-motion-creative',
    category: 'Performance Creative',
    title: 'High-Velocity Motion Creative: Why Modular Video Beats 10 Static Ads',
    teaser:
      'Ad fatigue is the #1 killer of paid social ROAS. How a modular component system of hooks, visual demos, and CTAs generated $4.2M in pipeline.',
    readTime: '6 min read',
    publishDate: 'Sep 15, 2026',
    author: {
      name: 'Maya Lindqvist',
      role: 'Lead Creative Strategist',
      initials: 'ML',
    },
    keyTakeaway: 'Film 3 hooks, 3 bodies, and 3 CTAs to produce 27 unique performance video variants.',
    fullOverview: [
      'Producing single static ads is too slow to feed modern algorithmic social feeds on Meta, LinkedIn, and YouTube.',
      'Our modular framework tests the first 3 seconds independently from the product demonstration, identifying winners in 48 hours.',
      'Lowers production overhead by 60% while sustaining high click-through rates across 6-month continuous campaigns.',
    ],
  },
  {
    id: 'unit-economics-cac',
    category: 'Unit Economics',
    title: 'The Mathematical Model of Blended CAC: Scaling Spend Without Margin Burn',
    teaser:
      'Why focusing exclusively on paid channel ROAS leads to false scaling plateaus, and how balancing organic topic velocity creates durable payback periods.',
    readTime: '7 min read',
    publishDate: 'Aug 30, 2026',
    author: {
      name: 'Alexander Vance',
      role: 'Head of Algorithmic Growth',
      initials: 'AV',
    },
    keyTakeaway: 'Compounding organic traffic must subsidize paid search to maintain target EBITDA margins.',
    fullOverview: [
      'As ad platform auction density rises, marginal CAC increases non-linearly. Relying solely on paid media creates diminishing returns.',
      'We illustrate the dual-flywheel formula: reinvesting paid channel profits into high-intent programmatic comparison pages.',
      'Keeps blended CAC flat even as total monthly enterprise lead volume doubles.',
    ],
  },
  {
    id: 'cro-friction-diagnostics',
    category: 'Conversion CRO',
    title: 'Friction Diagnostics: 15 Micro-Adjustments That Lifted Demos by 46%',
    teaser:
      'A breakdown of the exact heatmap anomalies, input field reductions, and mobile viewport adaptations tested across 350+ enterprise SaaS landing pages.',
    readTime: '10 min read',
    publishDate: 'Aug 18, 2026',
    author: {
      name: 'David1 Kalu',
      role: 'Director of Conversion Telemetry',
      initials: 'DK',
    },
    keyTakeaway: 'Removing optional company phone and revenue fields increased form completions by 31%.',
    fullOverview: [
      'Every form field added after email reduces conversion probability by an average of 4.2%.',
      'We reveal how two-step progressive profiling captures high-intent prospects before requesting qualification parameters.',
      'Complete checklist with before-and-after session recordings from our FinTech client Cresta.',
    ],
  },
];

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenConsultation,
  onNavigateToBlog,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Responsive slide chunking: 3 items per slide
  const itemsPerSlide = 3;
  const maxSlide = calculateMaxSlideIndex(BLOG_POSTS.length, itemsPerSlide);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => getPrevSlideIndex(prev, maxSlide));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => getNextSlideIndex(prev, maxSlide));
  };

  // Determine posts to render
  const visibleCarouselPosts = BLOG_POSTS.slice(
    currentSlide * itemsPerSlide,
    currentSlide * itemsPerSlide + itemsPerSlide
  );

  const displayedPosts = isExpandedView ? BLOG_POSTS : visibleCarouselPosts;

  return (
    <section
      id="blog"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
      aria-labelledby="blog-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-red-600/[0.035] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-2xl">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Magentrix Intelligence · Growth & Engineering Journal</span>
            </div>

            <h2
              id="blog-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]"
            >
              Empirical Field Notes on{' '}
              <span className="font-serif-italic font-normal text-[#ff2e2e]">
                Modern Acquisition
              </span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              In-depth technical guides, split-testing post-mortems, and attribution telemetry
              frameworks written directly by our senior growth squad.
            </p>
          </div>

          {/* Carousel Slide Icons Controls (Previous & Next) */}
          {!isExpandedView && (
            <div className="flex items-center gap-3 self-start lg:self-end">
              <div className="text-xs font-mono text-neutral-400 mr-2">
                <span className="text-white font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(maxSlide + 1).padStart(2, '0')}</span>
              </div>

              {/* Slide Icon: Previous */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-xl border border-white/15 bg-black/60 hover:bg-white/10 hover:border-white/30 text-neutral-200 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slide Icon: Next */}
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="w-10 h-10 rounded-xl border border-white/15 bg-black/60 hover:bg-red-600 hover:border-red-500 text-neutral-200 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-[0_2px_12px_rgba(220,38,38,0.2)] active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Blog Post Cards Grid / Carousel View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-10">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="group relative rounded-2xl border border-white/15 bg-black/55 hover:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.16)]"
            >
              {/* Ambient hover glow */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 bg-red-600/0 group-hover:bg-red-600/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <span className="text-red-400 font-semibold tracking-wide uppercase text-[11px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{post.publishDate}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-red-300 transition-colors">
                  {post.title}
                </h3>

                {/* Teaser */}
                <p className="mt-3 text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {post.teaser}
                </p>

                {/* Key Takeaway Box */}
                <div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Key Principle:
                  </div>
                  <div className="text-xs text-neutral-200 leading-snug">
                    {post.keyTakeaway}
                  </div>
                </div>
              </div>

              {/* Author Footer & Trigger */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center text-xs font-bold font-mono text-white">
                    {post.author.initials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">
                      {post.author.name}
                    </div>
                    <div className="text-[11px] text-neutral-400 leading-tight">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 text-xs text-neutral-300 hover:text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Read Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View More Buttons under the Blog Section */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {onNavigateToBlog && (
              <button
                type="button"
                onClick={onNavigateToBlog}
                className="px-6 py-3.5 rounded-xl border border-red-500/50 bg-red-950/40 hover:bg-red-600 text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(239,68,68,0.3)] flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-red-300 group-hover:text-white" />
                <span>Open Dedicated Intelligence Library</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsExpandedView((prev) => !prev)}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-black/70 hover:bg-white/10 text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2.5 cursor-pointer backdrop-blur-md active:scale-[0.98]"
            >
              <span>
                {isExpandedView
                  ? 'Show Carousel View (Slide Mode)'
                  : 'View More Articles (All 6 Briefings)'}
              </span>
            </button>
          </div>

          <span className="text-xs text-neutral-400">
            {isExpandedView
              ? 'Showing all 6 peer-reviewed growth frameworks'
              : `Slide ${currentSlide + 1} of ${maxSlide + 1} · Use slide arrows to browse`}
          </span>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close article modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-2">
              {selectedPost.category} · {selectedPost.readTime}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug pr-8">
              {selectedPost.title}
            </h3>

            <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400 pb-5 border-b border-white/10">
              <span className="text-white font-semibold">{selectedPost.author.name}</span>
              <span>·</span>
              <span>{selectedPost.author.role}</span>
              <span>·</span>
              <span>{selectedPost.publishDate}</span>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-4 text-sm text-neutral-200 leading-relaxed">
              <p className="text-base text-white font-medium italic border-l-2 border-red-500 pl-4 py-1">
                &ldquo;{selectedPost.teaser}&rdquo;
              </p>

              {selectedPost.fullOverview?.map((para, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                  <p>{para}</p>
                </div>
              ))}

              <div className="mt-6 p-4 rounded-2xl bg-red-950/30 border border-red-500/30">
                <div className="text-xs uppercase tracking-wider text-red-400 font-bold mb-1">
                  Actionable Executive Takeaway
                </div>
                <div className="text-sm font-semibold text-white">
                  {selectedPost.keyTakeaway}
                </div>
              </div>
            </div>

            {/* Modal Action CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 text-center sm:text-left">
                Want to deploy this exact acquisition framework for your business?
              </div>
              <button
                type="button"
                onClick={() => {
                  const topic = `${selectedPost.title} Framework`;
                  setSelectedPost(null);
                  onOpenConsultation(topic);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_15px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Consult with Author</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
