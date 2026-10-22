import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Compass,
  Eye,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
  Repeat,
  HeartHandshake,
  User,
  ExternalLink,
  ChevronRight,
  Monitor,
  Share2,
  Target,
  Search,
  FileText,
  Palette,
  Video,
  BarChart2,
  Send,
  Building2,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import {
  ABOUT_PAGE_CONTENT,
  validateConsultationForm,
  CONSULTATION_SERVICES_OPTIONS,
  ConsultationFormData,
  ValidationErrors,
} from '../utils/aboutPageContent';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateToServices?: () => void;
  onNavigateToContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateToServices,
  onNavigateToContact,
}) => {
  const content = ABOUT_PAGE_CONTENT;
  const formRef = useRef<HTMLDivElement>(null);

  // Consultation Form state
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceInterestedIn: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToConsultationForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateConsultationForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-indigo-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-violet-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-red-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-sky-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-amber-400" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-rose-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-pink-400" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5 text-cyan-400" />;
      default:
        return <Zap className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="w-full relative z-20 pb-24 text-neutral-100 overflow-hidden font-sans">
      {/* Magnetic Flux Ambient Field Lines (SVG vector backdrop) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40"
        aria-hidden="true"
      >
        <svg
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1400px] h-[1000px]"
          viewBox="0 0 1400 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved Magnetic Field Lines */}
          <path
            d="M200,900 C350,400 1050,400 1200,900"
            stroke="url(#fieldGrad1)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M300,900 C450,480 950,480 1100,900"
            stroke="url(#fieldGrad1)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <path
            d="M400,900 C520,560 880,560 1000,900"
            stroke="url(#fieldGrad2)"
            strokeWidth="1.2"
          />
          <ellipse cx="700" cy="380" rx="360" ry="140" stroke="url(#fieldGrad2)" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="700" cy="380" rx="200" ry="80" stroke="url(#fieldGrad1)" strokeWidth="0.8" opacity="0.5" />
          <defs>
            <linearGradient id="fieldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="fieldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Soft Radial Magnetic Glows */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.08] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-red-600/[0.07] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-violet-600/[0.06] rounded-full blur-[150px]" />
      </div>

      {/* SECTION 0: Semantic Sub-Navbar / Breadcrumbs Bar */}
      <nav
        aria-label="Breadcrumb and quick navigation"
        className="pt-6 sm:pt-8 px-6 sm:px-10 lg:px-16 border-b border-white/10 pb-4 relative z-20 backdrop-blur-md bg-black/20"
      >
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
            <span>Magnetrix</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white">About Magnetrix Digital</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="#mission"
              className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-md"
            >
              Mission
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href="#services"
              className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-md"
            >
              What We Do
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href="#founder"
              className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-md"
            >
              Founder
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href="#brands"
              className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-md"
            >
              Brands
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href="#process"
              className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-md"
            >
              How We Work
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN SEMANTIC BODY */}
      <main className="relative z-10">
        {/* SECTION 1: HERO */}
        <section
          id="hero"
          aria-labelledby="about-hero-title"
          className="pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Magnetic Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-semibold tracking-wide mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>{content.hero.badge}</span>
            </div>

            {/* Exactly One Semantic H1 Heading */}
            <h1
              id="about-hero-title"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-[-0.035em] leading-[1] max-w-5xl mb-7 select-none font-sans"
            >
              <span>Be the brand people </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-red-400 underline decoration-indigo-500/40 underline-offset-8">
                can&apos;t ignore.
              </span>
            </h1>

            {/* Exact Intro Paragraph */}
            <p className="text-neutral-200 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mb-5 font-normal">
              {content.hero.intro}
            </p>

            {/* Exact Supporting Line */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-10">
              {content.hero.supportingLine}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={scrollToConsultationForm}
                className="group relative flex items-center bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-full pl-6 sm:pl-7 pr-2 py-2 shadow-[0_4px_25px_rgba(239,68,68,0.4)] transition-all cursor-pointer active:scale-95"
              >
                <span className="mr-3 tracking-tight">{content.hero.primaryCta}</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <a
                href={content.hero.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-300 hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_2px_15px_rgba(16,185,129,0.15)] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{content.hero.secondaryCta}</span>
              </a>

              <a
                href={content.hero.phoneTel}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors px-3 py-2"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>{content.hero.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: MISSION AND VISION (Side-by-side cards) */}
        <section
          id="mission"
          aria-label="Mission and Vision"
          className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission Card */}
            <div className="group rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/25 to-black/60 backdrop-blur-xl p-8 sm:p-10 shadow-xl transition-all duration-300 hover:border-indigo-400/60 hover:shadow-[0_0_35px_rgba(99,102,241,0.2)] relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/25 transition-all"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4">
                <Compass className="w-4 h-4" />
                <span>{content.missionVision.mission.tag}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                &ldquo;{content.missionVision.mission.statement}&rdquo;
              </p>
            </div>

            {/* Vision Card */}
            <div className="group rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-950/20 to-black/60 backdrop-blur-xl p-8 sm:p-10 shadow-xl transition-all duration-300 hover:border-red-400/60 hover:shadow-[0_0_35px_rgba(239,68,68,0.2)] relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-36 h-36 bg-red-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/25 transition-all"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-red-400 mb-4">
                <Eye className="w-4 h-4" />
                <span>{content.missionVision.vision.tag}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                &ldquo;{content.missionVision.vision.statement}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE DO (9 Services Responsive Grid) */}
        <section
          id="services"
          aria-labelledby="what-we-do-heading"
          className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-12">
              <div className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full-Stack Capabilities</span>
              </div>
              <h2
                id="what-we-do-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
              >
                {content.whatWeDo.heading}
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-2">
                {content.whatWeDo.subheading}
              </p>
            </div>

            {/* 9 Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.whatWeDo.services.map((service, index) => (
                <article
                  key={service.id}
                  className="rounded-3xl border border-white/10 bg-neutral-950/70 hover:bg-neutral-900/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/40 transition-all duration-200">
                        {getServiceIcon(service.icon)}
                      </div>
                      <span className="font-mono text-xs text-neutral-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors mb-2.5">
                      {service.title}
                    </h3>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      Magnetic Engine
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, serviceInterestedIn: service.title }));
                        scrollToConsultationForm();
                      }}
                      className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: MEET THE FOUNDER */}
        <section
          id="founder"
          aria-labelledby="meet-founder-heading"
          className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-950/20 via-neutral-950/80 to-black/80 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient Red/Violet Backlight */}
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Leadership & Vision</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Founder Photo / Avatar Placeholder */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
                <div className="relative group">
                  {/* Magnetic Halo Glow */}
                  <div
                    className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-red-500 opacity-30 blur-lg group-hover:opacity-60 transition duration-500"
                    aria-hidden="true"
                  />

                  {/* Photo / Portrait Placeholder Container */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border border-white/20 bg-gradient-to-b from-neutral-900 to-black overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                    {/* SVG Geometric Portrait Graphic (clean placeholder, no stock photo) */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-red-500 p-1 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                      <div className="w-full h-full rounded-full bg-[#0a0b12] flex items-center justify-center font-bold text-2xl text-white tracking-tight">
                        UG
                      </div>
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">
                      {content.founder.name}
                    </div>
                    <div className="text-xs text-indigo-300 font-mono mt-0.5">
                      {content.founder.title}
                    </div>
                    <div className="mt-3 text-[11px] text-neutral-400 leading-tight border-t border-white/10 pt-2.5 max-w-[200px]">
                      New Delhi · Delhi University Alumnus
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-[11px] text-neutral-500 font-mono text-center sm:text-left">
                  Photo placeholder ready for official portrait update
                </div>
              </div>

              {/* Founder Copy & Credentials */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h2
                    id="meet-founder-heading"
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2"
                  >
                    {content.founder.heading}
                  </h2>
                  <div className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-red-400">
                    {content.founder.name}, {content.founder.title}
                  </div>
                </div>

                {/* Academic & Economics Credential Pill */}
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-neutral-300">
                  <span className="font-semibold text-white block mb-0.5">
                    Academic Background:
                  </span>
                  {content.founder.credentials}
                </div>

                {/* Paragraphs with exact copy */}
                {content.founder.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-neutral-200 text-sm sm:text-base leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

                {/* Direct Founder Access Links */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={content.founder.contactActions.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp with Utkarsh</span>
                  </a>

                  <a
                    href={content.founder.contactActions.call}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Call +91 92113 74014</span>
                  </a>

                  <a
                    href={content.founder.contactActions.email}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Email Founder</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BRANDS WE'VE WORKED WITH */}
        <section
          id="brands"
          aria-labelledby="brands-worked-heading"
          className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Track Record</span>
              </div>
              <h2
                id="brands-worked-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Brands We&apos;ve Worked With
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base mt-2">
                {content.brands.intro}
              </p>
            </div>

            {/* Elegant Grid of Text-Based Name Cards (No stock/fake logos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
              {content.brands.clientNames.map((brandName, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-neutral-950/60 hover:bg-neutral-900/90 backdrop-blur-md p-5 flex items-center justify-between transition-all duration-300 hover:border-indigo-400/40 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(99,102,241,0.12)] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-500/60 group-hover:bg-red-500 transition-colors" />
                    <span className="font-semibold text-white text-sm sm:text-base tracking-tight">
                      {brandName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            {/* Closing Line */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] text-xs sm:text-sm text-neutral-300 max-w-3xl">
              {content.brands.closingLine}
            </div>
          </div>
        </section>

        {/* SECTION 6: WHAT MAKES US DIFFERENT (5 Feature Cards) */}
        <section
          id="difference"
          aria-labelledby="different-heading"
          className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-12">
              <div className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The Magnetrix Advantage</span>
              </div>
              <h2
                id="different-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
              >
                {content.differentiators.heading}
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-2">
                {content.differentiators.subheading}
              </p>
            </div>

            {/* 5 Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.differentiators.items.map((diff, index) => (
                <div
                  key={diff.id}
                  className={`rounded-3xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl p-7 transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] flex flex-col justify-between ${
                    index === 0
                      ? 'md:col-span-2 lg:col-span-2 border-indigo-500/30 bg-gradient-to-r from-indigo-950/20 via-neutral-950/80 to-black/80'
                      : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-red-400">
                        {index === 0 ? <Zap className="w-5 h-5 text-indigo-400" /> : <CheckCircle2 className="w-5 h-5 text-red-400" />}
                      </div>
                      <span className="font-mono text-xs text-neutral-500">
                        ADV-0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      {diff.title}
                    </h3>

                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {diff.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] text-[11px] font-mono text-neutral-500">
                    Guaranteed Operating Principle
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: HOW WE WORK (4-Step Timeline) */}
        <section
          id="process"
          aria-labelledby="how-we-work-heading"
          className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-14">
              <div className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                <Repeat className="w-3.5 h-3.5" />
                <span>Our Framework</span>
              </div>
              <h2
                id="how-we-work-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
              >
                {content.howWeWork.heading}
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-2">
                {content.howWeWork.subheading}
              </p>
            </div>

            {/* Horizontal Timeline on Desktop / Vertical on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connecting field line on desktop */}
              <div
                className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-red-500 -translate-y-8 z-0 opacity-40"
                aria-hidden="true"
              />

              {content.howWeWork.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-7 relative z-10 transition-all duration-300 hover:border-indigo-400/50 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Magnetic Step Number Node */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white font-mono font-bold text-lg flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                      0{step.stepNumber}
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      {step.title}
                    </h3>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    Stage {step.stepNumber} of 4
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: OUR VALUES (4 Compact Cards) */}
        <section
          id="values"
          aria-labelledby="values-heading"
          className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-12">
              <div className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Our DNA</span>
              </div>
              <h2
                id="values-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
              >
                {content.values.heading}
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-2">
                {content.values.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.values.items.map((val, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-violet-400 mb-4">
                      <Flame className="w-5 h-5 text-violet-400" />
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      {val.title}
                    </h3>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-neutral-500">
                    Non-negotiable
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CALL TO ACTION (Full-width, High-Contrast with Consultation Form) */}
        <section
          id="contact"
          ref={formRef}
          aria-labelledby="cta-heading"
          className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto rounded-3xl border border-red-500/40 bg-gradient-to-br from-red-950/40 via-neutral-950/90 to-black backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden">
            {/* Ambient Radial Flare */}
            <div
              className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[140px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              {/* Left Column: Heading, Copy & Direct Communication Buttons */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/40 text-red-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Start Your Magnetic Growth</span>
                </div>

                <h2
                  id="cta-heading"
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
                >
                  {content.ctaSection.heading}
                </h2>

                <p className="text-neutral-200 text-base sm:text-lg leading-relaxed">
                  {content.ctaSection.text}
                </p>

                {/* Direct Action Channels */}
                <div className="space-y-3 pt-2">
                  <a
                    href={content.ctaSection.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                      <span>{content.ctaSection.whatsappBtn}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={content.ctaSection.callUrl}
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-neutral-300" />
                      <span>{content.ctaSection.callBtn}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={`mailto:${content.ctaSection.agencyEmail}`}
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white font-semibold text-xs sm:text-sm transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-neutral-400" />
                      <span>Email: {content.ctaSection.agencyEmail}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400" />
                  </a>
                </div>
              </div>

              {/* Right Column: Book a Free Consultation Form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-white/15 bg-black/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        Book a Free Consultation
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        No obligations, no jargon. Utkarsh personally reviews each inquiry.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-neutral-300">
                      Response &lt; 2 hrs
                    </span>
                  </div>

                  {isSubmitted ? (
                    <div className="p-8 text-center rounded-2xl border border-emerald-500/40 bg-emerald-950/20 text-neutral-100 animate-in fade-in zoom-in-95 duration-300">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        Inquiry Received!
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
                        Thank you, <strong className="text-white">{formData.fullName}</strong>. We have logged your request for <strong className="text-white">{formData.serviceInterestedIn}</strong>. Utkarsh Giri will connect with you shortly via phone/WhatsApp.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={content.ctaSection.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Fast-Track on WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData({
                              fullName: '',
                              phone: '',
                              email: '',
                              serviceInterestedIn: '',
                              message: '',
                            });
                          }}
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Send Another Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-xs font-medium text-neutral-300 mb-1.5"
                          >
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            placeholder="e.g. Rahul Sharma"
                            className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors ${
                              errors.fullName
                                ? 'border-red-500 focus:border-red-400'
                                : 'border-white/10 focus:border-indigo-400'
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-medium text-neutral-300 mb-1.5"
                          >
                            Phone / WhatsApp Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="e.g. +91 98765 43210"
                            className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors ${
                              errors.phone
                                ? 'border-red-500 focus:border-red-400'
                                : 'border-white/10 focus:border-indigo-400'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Email & Service Interested In */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-medium text-neutral-300 mb-1.5"
                          >
                            Business Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="e.g. rahul@company.com"
                            className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors ${
                              errors.email
                                ? 'border-red-500 focus:border-red-400'
                                : 'border-white/10 focus:border-indigo-400'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="serviceInterestedIn"
                            className="block text-xs font-medium text-neutral-300 mb-1.5"
                          >
                            Service Interested In <span className="text-red-400">*</span>
                          </label>
                          <select
                            id="serviceInterestedIn"
                            value={formData.serviceInterestedIn}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                serviceInterestedIn: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-2.5 rounded-xl bg-[#111218] border text-xs sm:text-sm text-white outline-none transition-colors cursor-pointer ${
                              errors.serviceInterestedIn
                                ? 'border-red-500 focus:border-red-400'
                                : 'border-white/10 focus:border-indigo-400'
                            }`}
                          >
                            <option value="">Select a Capability...</option>
                            {CONSULTATION_SERVICES_OPTIONS.map((srv, idx) => (
                              <option key={idx} value={srv}>
                                {srv}
                              </option>
                            ))}
                          </select>
                          {errors.serviceInterestedIn && (
                            <p className="text-[11px] text-red-400 mt-1">
                              {errors.serviceInterestedIn}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-medium text-neutral-300 mb-1.5"
                        >
                          Project Details or Goals <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Tell us what you are looking to achieve, current website, or target monthly spend..."
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors resize-none ${
                            errors.message
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-white/10 focus:border-indigo-400'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-[0.99] text-white font-bold text-sm tracking-tight transition-all shadow-[0_4px_25px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Booking Consultation...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Request Free Consultation</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                        <span>🔒 100% Confidential · Direct Founder Review</span>
                        <a
                          href={content.ctaSection.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>Prefer WhatsApp?</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 10: SEMANTIC FOOTER */}
      <footer
        role="contentinfo"
        className="pt-12 pb-8 border-t border-white/10 px-6 sm:px-10 lg:px-16 relative z-10 bg-black/40"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-bold text-white text-lg tracking-tight">
              {content.footer.companyName}
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">{content.footer.location}</span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <a
              href={content.footer.phoneTel}
              className="text-xs text-neutral-300 hover:text-white transition-colors"
            >
              {content.footer.phone}
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs text-neutral-400">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-white font-semibold cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={onNavigateToServices}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <a
              href={content.footer.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="text-xs text-neutral-500 font-mono text-center md:text-right">
            {content.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};
