import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  ChevronRight,
  Sparkles,
  Share2,
  Bookmark,
  Mail,
  Flame,
} from 'lucide-react';
import {
  BlogPost,
  filterBlogPosts,
  validateNewsletterEmail,
} from '../utils/blog';
import { BLOG_POSTS } from './BlogSection';
import { CardGridSkeleton } from './LoadingSkeleton';

interface BlogPageProps {
  onNavigateHome: () => void;
  onOpenConsultation: (topic?: string) => void;
  onNavigateToServices?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateHome,
  onOpenConsultation,
  onNavigateToServices,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [newsletterError, setNewsletterError] = useState<string>('');

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 280);
  };

  const filteredPosts = filterBlogPosts(BLOG_POSTS, selectedCategory, searchQuery);
  const featuredPost = BLOG_POSTS[0];

  const categories = [
    { id: 'all', label: 'All Intelligence' },
    { id: 'Paid Acquisition', label: 'Paid Acquisition' },
    { id: 'Technical SEO', label: 'Technical SEO' },
    { id: 'Attribution & BI', label: 'Attribution & BI' },
    { id: 'Performance Creative', label: 'Creative Strategy' },
    { id: 'Conversion CRO', label: 'Conversion' },
    { id: 'Unit Economics', label: 'Unit Economics' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateNewsletterEmail(newsletterEmail)) {
      setNewsletterError('Please provide a valid business email.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
  };

  return (
    <div className="w-full relative z-20 pb-20">
      {/* Top Breadcrumb & Back Bar */}
      <div className="pt-6 sm:pt-8 px-6 sm:px-10 lg:px-16 border-b border-white/10 pb-4">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Overview</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>Magentrix</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white">Growth Intelligence & Playbooks</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="pt-12 sm:pt-16 pb-10 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Quiet Editorial Kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-red-500 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span>Magentrix Intelligence · Growth Engineering Briefings</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.035em] leading-[1.05] max-w-4xl">
            Empirical Growth Analysis &{' '}
            <span className="font-serif-italic font-normal text-[#ff2e2e]">
              Engineering Playbooks
            </span>
          </h1>

          <p className="mt-5 text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-normal">
            Data-backed architectural breakdowns, algorithmic bid post-mortems, and technical blueprints
            written directly by senior operators managing $40M+ in annual commercial client pipeline.
          </p>

          {/* Search & Category Filter Controls */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/10">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-red-600 text-white shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
                        : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search briefings, authors, topics..."
                className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/15 focus:border-red-500 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spotlight Article (shown when viewing all categories with no search) */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="px-6 sm:px-10 lg:px-16 mb-16">
          <div className="max-w-[1400px] mx-auto rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/25 via-neutral-950/80 to-black/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Featured Intelligence Spotlight</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium">
                    {featuredPost.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    {featuredPost.readTime}
                  </span>
                  <span>·</span>
                  <span>{featuredPost.publishDate}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {featuredPost.teaser}
                </p>

                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-neutral-200">
                  <span className="font-bold text-red-400 uppercase tracking-wider text-[11px] block mb-1">
                    Core Operational Takeaway
                  </span>
                  {featuredPost.keyTakeaway}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-black/60 border border-white/10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center font-bold text-white text-sm">
                    {featuredPost.author.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{featuredPost.author.name}</div>
                    <div className="text-xs text-neutral-400">{featuredPost.author.role}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setReadingPost(featuredPost)}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Complete Playbook</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`Article: ${featuredPost.title}`)}
                    className="w-full py-2.5 bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors cursor-pointer"
                  >
                    Deploy This Framework
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Articles Grid */}
      <div className="px-6 sm:px-10 lg:px-16 mb-20">
        <div className="max-w-[1400px] mx-auto">
          {isFetching ? (
            <CardGridSkeleton count={6} />
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 text-center rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md">
              <BookOpen className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No briefings match your search</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Try adjusting your search terms or select &ldquo;All Intelligence&rdquo; to browse our entire editorial library.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-3xl border border-white/15 bg-black/55 hover:bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] group relative"
                >
                  <div>
                    {/* Top Meta Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 px-2.5 py-1 rounded-md bg-red-950/30 border border-red-500/30">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-red-400 transition-colors mb-3">
                      {post.title}
                    </h3>

                    {/* Teaser */}
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5">
                      {post.teaser}
                    </p>

                    {/* Key Takeaway Callout */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 mb-6">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-1">
                        Executive Takeaway
                      </span>
                      {post.keyTakeaway}
                    </div>
                  </div>

                  {/* Bottom: Author & Read Trigger */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-xs">
                        {post.author.initials}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white leading-tight">
                          {post.author.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 leading-tight">
                          {post.publishDate}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReadingPost(post)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-red-600 text-white border border-white/15 hover:border-red-500 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Subscription Box */}
      <div className="px-6 sm:px-10 lg:px-16 mb-20">
        <div className="max-w-[1400px] mx-auto p-8 sm:p-10 rounded-3xl border border-white/15 bg-gradient-to-r from-neutral-950 via-black to-red-950/30 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
              <Mail className="w-4 h-4 text-red-500" />
              <span>Weekly Engineering Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Get raw conversion data & ad scripts delivered weekly
            </h3>
            <p className="mt-2 text-neutral-300 text-xs sm:text-sm leading-relaxed">
              No sponsored guest posts or generic marketing fluff. Strictly empirical pipeline findings,
              negative keyword lists, and CRO experiments.
            </p>
          </div>

          <div className="w-full max-w-md">
            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You are subscribed. Watch your inbox for our next Tuesday technical briefing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterError('');
                    }}
                    placeholder="Enter your work email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 focus:border-red-500 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] shrink-0 cursor-pointer active:scale-[0.98]"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <div className="text-[11px] text-red-400 pl-1">{newsletterError}</div>
                )}
                <div className="text-[11px] text-neutral-400 text-center sm:text-left pl-1">
                  Zero spam. Instant unsubscribe with one click.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Reader Modal / Slide-over Drawer */}
      {readingPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-post-title"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0c0c] border border-white/20 rounded-3xl p-6 sm:p-10 overflow-y-auto shadow-2xl flex flex-col justify-between">
            {/* Top Bar with Close button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <span className="text-red-400 font-bold uppercase">{readingPost.category}</span>
                <span>·</span>
                <span>{readingPost.publishDate}</span>
                <span>·</span>
                <span>{readingPost.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setReadingPost(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close reader"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div>
              <h2
                id="reader-post-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4"
              >
                {readingPost.title}
              </h2>

              {/* Author Row */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center font-bold text-white text-sm">
                  {readingPost.author.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{readingPost.author.name}</div>
                  <div className="text-xs text-neutral-400">{readingPost.author.role}</div>
                </div>
              </div>

              {/* Core Takeaway Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs sm:text-sm text-neutral-200 mb-8">
                <span className="font-bold text-red-400 uppercase tracking-wider text-[11px] block mb-1">
                  Executive Briefing & Key Hypothesis
                </span>
                {readingPost.keyTakeaway}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p className="text-sm sm:text-base font-medium text-white">{readingPost.teaser}</p>
                {readingPost.fullOverview &&
                  readingPost.fullOverview.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                <p>
                  At Magentrix, our operators run these exact diagnostic interventions directly across
                  production ad accounts, search consoles, and attribution layers. Every recommendation
                  is grounded in audited client pipeline data.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  const topic = `Article Discussion: ${readingPost.title}`;
                  setReadingPost(null);
                  onOpenConsultation(topic);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Deploy This Strategy With Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setReadingPost(null)}
                className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer py-2"
              >
                Close Article Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
