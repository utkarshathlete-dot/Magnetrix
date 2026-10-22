import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
  TrendingUp,
  Layers,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { Theme } from '../utils/theme';
import { Language, LANGUAGE_OPTIONS, getTranslation } from '../utils/translations';

interface NavbarProps {
  onOpenGetStarted: () => void;
  theme?: Theme;
  onToggleTheme?: () => void;
  language?: Language;
  onToggleLanguage?: () => void;
  onSelectLanguage?: (lang: Language) => void;
  onNavigateToServices?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToWork?: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToContact?: () => void;
  onNavigateHome?: () => void;
  currentView?: 'home' | 'services' | 'blog' | 'contact' | 'about' | 'work';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGetStarted,
  theme = 'dark',
  onToggleTheme,
  language = 'en',
  onToggleLanguage,
  onSelectLanguage,
  onNavigateToServices,
  onNavigateToAbout,
  onNavigateToWork,
  onNavigateToBlog,
  onNavigateToContact,
  onNavigateHome,
  currentView = 'home',
}) => {
  const t = getTranslation(language);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('services');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectLang = (code: Language) => {
    if (onSelectLanguage) {
      onSelectLanguage(code);
    } else if (onToggleLanguage) {
      onToggleLanguage();
    }
    setIsLanguageOpen(false);
  };

  const servicesList = [
    {
      title: 'Performance Marketing',
      desc: 'Paid media campaigns scaled across search, social, and display networks.',
      icon: TrendingUp,
    },
    {
      title: 'SEO & Content Architecture',
      desc: 'High-intent organic traffic engines built on data-backed topic clusters.',
      icon: Target,
    },
    {
      title: 'Conversion Rate Optimization',
      desc: 'Scientific A/B testing and friction-free user journeys.',
      icon: BarChart3,
    },
    {
      title: 'Creative Strategy & Brand Positioning',
      desc: 'Distinctive visual identities and high-converting video creative.',
      icon: Sparkles,
    },
    {
      title: 'Marketing Automation & Telemetry',
      desc: 'Transparent multi-touch attribution and automated CRM flows.',
      icon: Layers,
    },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 py-3.5 px-6 sm:px-10 lg:px-16 transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome?.();
            }}
            className="text-2xl sm:text-[27px] font-bold tracking-tight text-white select-none transition-opacity hover:opacity-90 cursor-pointer"
          >
            Magentrix
          </a>
        </div>

        {/* Center: Desktop Navigation Capsule (Home, About, Services, Work, Contact) */}
        <nav
          className="hidden lg:flex items-center bg-[#0a0a0a]/80 backdrop-blur-md border border-white/20 rounded-full p-1.5 gap-1.5 shadow-2xl"
          aria-label="Main Navigation"
        >
          {/* Home */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              onNavigateHome?.();
            }}
            className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full border transition-all cursor-pointer ${
              currentView === 'home'
                ? 'border-white/30 bg-white/20 text-white shadow-sm'
                : 'border-white/10 bg-white/[0.04] text-neutral-200 hover:text-white hover:border-white/25 hover:bg-white/[0.08]'
            }`}
          >
            Home
          </button>

          {/* About */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('about');
              onNavigateToAbout?.();
            }}
            className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full border transition-all cursor-pointer ${
              currentView === 'about'
                ? 'border-indigo-400/50 bg-indigo-600/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'border-white/10 bg-white/[0.04] text-neutral-200 hover:text-white hover:border-white/25 hover:bg-white/[0.08]'
            }`}
          >
            {t.navAbout}
          </button>

          {/* Services with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full border transition-all cursor-pointer ${
                isServicesOpen
                  ? 'border-white/30 bg-white/15 text-white'
                  : 'border-white/10 bg-white/[0.04] text-neutral-200 hover:text-white hover:border-white/25 hover:bg-white/[0.08]'
              }`}
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-[#0d0d0d]/95 border border-white/15 backdrop-blur-xl rounded-2xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-3 py-1.5">
                  Core Solutions
                </div>
                <div className="space-y-1">
                  {servicesList.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => {
                          setIsServicesOpen(false);
                          if (currentView === 'home') {
                            const el = document.getElementById('services');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              onNavigateToServices?.();
                            }
                          } else {
                            onNavigateToServices?.();
                          }
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 transition-colors group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-red-500/50 group-hover:text-red-400 transition-colors">
                          <Icon className="w-4 h-4 text-neutral-300 group-hover:text-red-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">
                            {service.title}
                          </div>
                          <div className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                            {service.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="pt-2 mt-2 border-t border-white/10 px-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsServicesOpen(false);
                      onNavigateToServices?.();
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-center text-red-400 hover:text-red-300 hover:bg-white/[0.04] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Dedicated Services Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Work */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('work');
              onNavigateToWork?.();
            }}
            className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full border transition-all cursor-pointer ${
              currentView === 'work'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'text-neutral-200 hover:text-white border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]'
            }`}
          >
            {t.navWork || 'Our Work'}
          </button>

          {/* Contact */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('contact');
              if (currentView === 'about') {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              } else {
                onNavigateToContact?.();
              }
            }}
            className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full border transition-all cursor-pointer ${
              currentView === 'contact'
                ? 'border-red-500/50 bg-red-600/30 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'border-white/10 bg-white/[0.04] text-neutral-200 hover:text-white hover:border-white/25 hover:bg-white/[0.08]'
            }`}
          >
            {t.navContact}
          </button>
        </nav>

        {/* Right: Tagline & CTA Button */}
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="text-[13px] sm:text-sm font-normal text-neutral-200 hidden lg:inline-block">
            {t.navPartnerTagline}
          </span>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              aria-label={`Current language: ${language.toUpperCase()}. Click to change`}
              title="Change Language"
              className={`px-2.5 py-1.5 sm:py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm ${
                isLanguageOpen
                  ? 'border-white/30 bg-white/15 text-white'
                  : 'border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>{language.toUpperCase()}</span>
              <ChevronDown
                className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                  isLanguageOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#0d0d0d]/95 border border-white/15 backdrop-blur-xl rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 px-2.5 py-1">
                  Select Language
                </div>
                <div className="space-y-1">
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => handleSelectLang(opt.code)}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        language === opt.code
                          ? 'bg-red-600/20 text-white border border-red-500/30'
                          : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{opt.flag}</span>
                        <div>
                          <div className="font-semibold text-white leading-tight">{opt.nativeLabel}</div>
                          <div className="text-[10px] text-neutral-400 leading-tight">
                            {opt.label} {opt.region ? `(${opt.region})` : ''}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">
                        {opt.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 sm:p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95 shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onOpenGetStarted}
            className="bg-white text-black font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
          >
            {t.navGetStarted}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-neutral-950/95 border border-white/15 backdrop-blur-xl rounded-2xl p-5 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2.5">
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold px-2">
              Navigation
            </div>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateHome?.();
              }}
              className="text-left px-3 py-2 text-neutral-200 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer w-full"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToAbout?.();
              }}
              className="text-left px-3 py-2 text-white text-sm font-medium rounded-lg bg-indigo-600/20 border border-indigo-500/30 transition-colors flex items-center justify-between cursor-pointer w-full"
            >
              <span className="font-semibold text-indigo-300">About Us</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToServices?.();
              }}
              className="text-left px-3 py-2 text-neutral-200 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer w-full"
            >
              <span>Services</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToWork?.();
              }}
              className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between cursor-pointer w-full ${
                currentView === 'work'
                  ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                  : 'text-neutral-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Our Work</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (currentView === 'about') {
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigateToContact?.();
                }
              }}
              className="text-left px-3 py-2 text-neutral-200 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer w-full"
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            {/* Mobile Language Switcher */}
            <div className="pt-2 pb-1 border-t border-white/10 px-1">
              <div className="text-xs text-neutral-300 font-medium mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-red-500" />
                  <span>Language</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono uppercase font-bold">
                  {language}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      handleSelectLang(opt.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-left border text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                      language === opt.code
                        ? 'border-red-500/50 bg-red-600/20 text-white font-semibold'
                        : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-sm">{opt.flag}</span>
                    <div className="truncate">
                      <div className="leading-tight truncate">{opt.nativeLabel}</div>
                      <div className="text-[10px] text-neutral-400 leading-tight truncate">
                        {opt.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            {onToggleTheme && (
              <div className="pt-2 pb-1 border-t border-white/10 flex items-center justify-between px-1">
                <span className="text-xs text-neutral-300">Theme</span>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-xs font-semibold flex items-center gap-1.5 text-white cursor-pointer hover:bg-white/10 transition-colors"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-400">{t.navPartnerTagline}</span>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg"
              >
                {t.navGetStarted}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
