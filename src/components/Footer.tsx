import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateToServices?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToWork?: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToServices,
  onNavigateToAbout,
  onNavigateToWork,
  onNavigateToBlog,
  onNavigateToContact,
}) => {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/80 backdrop-blur-lg pt-12 pb-10 px-6 sm:px-10 lg:px-16 mt-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="text-lg font-bold text-white tracking-tight">Magentrix</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span>Digital Marketing crafted for real business growth</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onNavigateToServices}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Services Catalog
          </button>
          <a href="#audit" className="text-red-400 hover:text-white transition-colors">
            Free Audit
          </a>
          <a href="#calculator" className="hover:text-white transition-colors">
            ROI Calculator
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <button
            type="button"
            onClick={onNavigateToWork}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Our Work
          </button>
          <a href="#stories" className="hover:text-white transition-colors">
            Stories
          </a>
          <button
            type="button"
            onClick={onNavigateToBlog}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Blog
          </button>
          <button
            type="button"
            onClick={onNavigateToAbout}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            type="button"
            onClick={onNavigateToContact}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
          <span className="text-neutral-500">© 2026 Magentrix. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
