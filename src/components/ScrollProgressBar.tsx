import React, { useEffect, useState } from 'react';
import { calculateScrollProgress } from '../utils/scrollProgress';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;
          const progress = calculateScrollProgress(scrollTop, scrollHeight, clientHeight);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate initial progress on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-black/20"
    >
      <div
        className="h-full bg-gradient-to-r from-red-600 via-[#ff2e2e] to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.85)] transition-[width] duration-150 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing tip indicator */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff] -mr-0.5" />
        )}
      </div>
    </div>
  );
};
