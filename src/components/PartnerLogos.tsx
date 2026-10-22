import React from 'react';

export interface Partner {
  id: string;
  name: string;
  logo: React.ReactNode;
}

export const BrandFlowLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
      {/* Dynamic 4-petal continuous flow knot */}
      <path
        d="M14 3C17.5 3 20 6.5 18 10C22 8 25 10.5 25 14C25 17.5 21.5 20 18 18C20 22 17.5 25 14 25C10.5 25 8 21.5 10 18C6 20 3 17.5 3 14C3 10.5 6.5 8 10 10C8 6 10.5 3 14 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <circle cx="14" cy="14" r="3.5" fill="#000000" />
    </svg>
    <span className="text-white font-semibold tracking-tight text-lg">BrandFlow</span>
  </div>
);

export const NovaScaleLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
      {/* Bold faceted geometric folded N */}
      <path
        d="M6 5H11.5L17.5 18V5H22V23H16.5L10.5 10V23H6V5Z"
        fill="currentColor"
      />
    </svg>
    <span className="text-white font-semibold tracking-tight text-lg">NovaScale</span>
  </div>
);

export const CrestaLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
      {/* Chevron / Delta apex crest with center opening */}
      <path
        d="M14 4L24 23H17.5L14 15.5L10.5 23H4L14 4Z"
        fill="currentColor"
      />
      <polygon points="14,10 16.5,15.5 11.5,15.5" fill="#000000" />
    </svg>
    <span className="text-white font-semibold tracking-tight text-lg">Cresta</span>
  </div>
);

export const PulseMediaLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
      {/* Infinity loop with pulse frequency center */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 8C5.46 8 3 10.46 3 13.5C3 16.54 5.46 19 8.5 19C10.74 19 12.67 17.66 13.5 15.74C14.33 17.66 16.26 19 18.5 19C21.54 19 24 16.54 24 13.5C24 10.46 21.54 8 18.5 8C16.26 8 14.33 9.34 13.5 11.26C12.67 9.34 10.74 8 8.5 8ZM8.5 11C7.12 11 6 12.12 6 13.5C6 14.88 7.12 16 8.5 16C9.88 16 11 14.88 11 13.5C11 12.12 9.88 11 8.5 11ZM18.5 11C17.12 11 16 12.12 16 13.5C16 14.88 17.12 16 18.5 16C19.88 16 21 14.88 21 13.5C21 12.12 19.88 11 18.5 11Z"
        fill="currentColor"
      />
    </svg>
    <span className="text-white font-semibold tracking-tight text-lg">PulseMedia</span>
  </div>
);

export const NextGenLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric 3D faceted cube */}
      {/* Top face */}
      <polygon points="14,4 23,9 14,14 5,9" fill="currentColor" opacity="0.9" />
      {/* Left face */}
      <polygon points="5,10.5 13,15 13,24 5,19.5" fill="currentColor" opacity="0.6" />
      {/* Right face */}
      <polygon points="15,15 23,10.5 23,19.5 15,24" fill="currentColor" opacity="0.8" />
    </svg>
    <span className="text-white font-semibold tracking-tight text-lg">NextGen</span>
  </div>
);

export const PARTNERS_LIST = [
  { id: 'brandflow', name: 'BrandFlow', Component: BrandFlowLogo },
  { id: 'novascale', name: 'NovaScale', Component: NovaScaleLogo },
  { id: 'cresta', name: 'Cresta', Component: CrestaLogo },
  { id: 'pulsemedia', name: 'PulseMedia', Component: PulseMediaLogo },
  { id: 'nextgen', name: 'NextGen', Component: NextGenLogo },
];
