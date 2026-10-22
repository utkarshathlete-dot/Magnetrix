import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServicesPage } from './components/ServicesPage';
import { AgencyRoadmapSection } from './components/AgencyRoadmapSection';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { OurWorkPage } from './components/OurWorkPage';
import { SeoAuditTool } from './components/SeoAuditTool';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ClientSuccessStories } from './components/ClientSuccessStories';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/GetStartedModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Theme, getInitialTheme, getNextTheme, THEME_STORAGE_KEY } from './utils/theme';
import {
  Language,
  getInitialLanguage,
  getNextLanguage,
  LANGUAGE_STORAGE_KEY,
} from './utils/translations';
import { createViewTransitionVariants } from './utils/animations';
import { LoadingSkeleton } from './components/LoadingSkeleton';

const viewVariants = createViewTransitionVariants();

export default function App() {
  const [isInitializing, setIsInitializing] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('skeleton') === 'true') return true;
    }
    return true;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'blog' | 'contact' | 'about' | 'work'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (view === 'home' || view === 'services' || view === 'blog' || view === 'contact' || view === 'about' || view === 'work') {
        return view;
      }
    }
    return 'about';
  });
  const [theme, setTheme] = useState<Theme>(() =>
    getInitialTheme(typeof window !== 'undefined' ? localStorage.getItem(THEME_STORAGE_KEY) : null)
  );
  const [language, setLanguage] = useState<Language>(() =>
    getInitialLanguage(typeof window !== 'undefined' ? localStorage.getItem(LANGUAGE_STORAGE_KEY) : null)
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('skeleton') === 'true') return; // Stay in skeleton mode for visual testing
    }
    // Smooth initial boot: display loading skeleton while preloading telemetry and fonts
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = getNextTheme(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      }
      return next;
    });
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next = getNextLanguage(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      }
      return next;
    });
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    }
  };

  const handleOpenGetStarted = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleNavigateToServices = () => {
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBlog = () => {
    setCurrentView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAbout = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToWork = () => {
    setCurrentView('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (currentView === 'about') {
        document.title = 'About Magnetrix Digital | Full-Service Digital Marketing Agency in New Delhi';
      } else if (currentView === 'work') {
        document.title = 'Our Work | Magnetrix Digital - Digital Marketing Portfolio, New Delhi';
      } else {
        document.title = 'Magentrix - Digital Marketing Agency';
      }
    }
  }, [currentView]);

  return (
    <div
      className={`relative min-h-screen selection:bg-red-500 selection:text-white flex flex-col justify-between overflow-x-hidden transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#f4f5f8] text-slate-900' : 'bg-black text-white'
      }`}
    >
      {/* Application Initialization Loading Skeleton */}
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            key="app-init-skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 overflow-y-auto pointer-events-auto"
          >
            <LoadingSkeleton view={currentView} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar at very top of screen */}
      <ScrollProgressBar />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`fixed inset-0 w-full h-full object-cover z-0 pointer-events-none ${
          currentView === 'contact' ? 'hidden' : 'block'
        }`}
      >
        <source
          src="https://res.cloudinary.com/yanhvsao/video/upload/v1792324328/Make_infinity_loop_1080p_20261018154948_gwr_video_mvp.mp4"
          type="video/mp4"
        />
      </video>

      {/* Vignette scrim to ensure WCAG AA text contrast while keeping video completely visible */}
      <div
        className={`fixed inset-0 pointer-events-none z-[1] transition-colors duration-300 ${
          theme === 'light' ? 'bg-white/85 backdrop-blur-[2px]' : 'bg-black/35'
        }`}
        aria-hidden="true"
      />

      {/* Foreground UI content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div>
          <Navbar
            onOpenGetStarted={() => handleOpenGetStarted()}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onSelectLanguage={handleSelectLanguage}
            onNavigateToServices={handleNavigateToServices}
            onNavigateToAbout={handleNavigateToAbout}
            onNavigateToWork={handleNavigateToWork}
            onNavigateToBlog={handleNavigateToBlog}
            onNavigateToContact={handleNavigateToContact}
            onNavigateHome={handleNavigateHome}
            currentView={currentView}
          />
          <main>
            <AnimatePresence mode="wait">
              {currentView === 'services' && (
                <motion.div
                  key="services"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ServicesPage
                    onNavigateHome={handleNavigateHome}
                    onOpenConsultation={(topic) => handleOpenGetStarted(topic)}
                  />
                </motion.div>
              )}
              {currentView === 'blog' && (
                <motion.div
                  key="blog"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <BlogPage
                    onNavigateHome={handleNavigateHome}
                    onOpenConsultation={(topic) => handleOpenGetStarted(topic)}
                    onNavigateToServices={handleNavigateToServices}
                  />
                </motion.div>
              )}
              {currentView === 'contact' && (
                <motion.div
                  key="contact"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ContactPage
                    onNavigateHome={handleNavigateHome}
                    onOpenConsultation={(topic) => handleOpenGetStarted(topic)}
                    language={language}
                  />
                </motion.div>
              )}
              {currentView === 'work' && (
                <motion.div
                  key="work"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <OurWorkPage
                    onOpenConsultationModal={(topic) => handleOpenGetStarted(topic)}
                    onNavigateToServices={handleNavigateToServices}
                    onNavigateToContact={handleNavigateToContact}
                  />
                </motion.div>
              )}
              {currentView === 'about' && (
                <motion.div
                  key="about"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <AboutPage
                    onNavigateHome={handleNavigateHome}
                    onNavigateToServices={handleNavigateToServices}
                    onNavigateToContact={handleNavigateToContact}
                  />
                </motion.div>
              )}
              {currentView === 'home' && (
                <motion.div
                  key="home"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Hero
                    onOpenGetStarted={() => handleOpenGetStarted()}
                    language={language}
                  />
                  <ServicesSection
                    onSelectService={(service) => handleOpenGetStarted(service)}
                    onNavigateToServices={handleNavigateToServices}
                  />
                  <AgencyRoadmapSection onOpenConsultation={(topic) => handleOpenGetStarted(topic)} />
                  <SeoAuditTool onOpenConsultation={(audit) => handleOpenGetStarted(audit)} />
                  <RoiCalculatorSection onOpenConsultation={(details) => handleOpenGetStarted(details)} />
                  <CaseStudiesSection onOpenConsultation={(client) => handleOpenGetStarted(client)} />
                  <ClientSuccessStories onOpenConsultation={(client) => handleOpenGetStarted(client)} />
                  <BlogSection
                    onOpenConsultation={(topic) => handleOpenGetStarted(topic)}
                    onNavigateToBlog={handleNavigateToBlog}
                  />
                  <AboutSection onOpenConsultation={(topic) => handleOpenGetStarted(topic)} />
                  <FaqSection onOpenConsultation={() => handleOpenGetStarted('Custom Retainer Strategy')} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
        <Footer
          onNavigateToServices={handleNavigateToServices}
          onNavigateToAbout={handleNavigateToAbout}
          onNavigateToWork={handleNavigateToWork}
          onNavigateToBlog={handleNavigateToBlog}
          onNavigateToContact={handleNavigateToContact}
        />
      </div>

      <GetStartedModal
        isOpen={isModalOpen}
        initialService={selectedService}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(undefined);
        }}
      />

      <LiveChatWidget onOpenConsultationModal={(topic) => handleOpenGetStarted(topic)} />
    </div>
  );
}
