import React from 'react';

export const ClientAvatars: React.FC = () => {
  return (
    <div className="flex items-center">
      {/* Overlapping avatar portraits */}
      <div className="flex -space-x-2.5 items-center">
        {/* Avatar 1: Red/Orange duotone portrait */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-black overflow-hidden bg-gradient-to-tr from-amber-600 via-red-600 to-rose-500 shadow-sm flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
            <defs>
              <radialGradient id="grad1" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="45%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
            </defs>
            <rect width="36" height="36" fill="#1c0b0b" />
            <circle cx="18" cy="13" r="7" fill="url(#grad1)" />
            <path
              d="M7 32C7 25.5 12 22 18 22C24 22 29 25.5 29 32"
              fill="url(#grad1)"
            />
          </svg>
        </div>

        {/* Avatar 2: Violet/Magenta duotone portrait */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-black overflow-hidden bg-gradient-to-tr from-purple-800 via-fuchsia-600 to-pink-500 shadow-sm flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
            <defs>
              <radialGradient id="grad2" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fae8ff" />
                <stop offset="45%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#4a044e" />
              </radialGradient>
            </defs>
            <rect width="36" height="36" fill="#14061f" />
            <circle cx="18" cy="13" r="7" fill="url(#grad2)" />
            <path
              d="M7 32C7 25.5 12 22 18 22C24 22 29 25.5 29 32"
              fill="url(#grad2)"
            />
          </svg>
        </div>

        {/* Avatar 3: Cyan/Blue duotone portrait */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-black overflow-hidden bg-gradient-to-tr from-blue-700 via-cyan-500 to-sky-400 shadow-sm flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
            <defs>
              <radialGradient id="grad3" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="45%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#082f49" />
              </radialGradient>
            </defs>
            <rect width="36" height="36" fill="#041322" />
            <circle cx="18" cy="13" r="7" fill="url(#grad3)" />
            <path
              d="M7 32C7 25.5 12 22 18 22C24 22 29 25.5 29 32"
              fill="url(#grad3)"
            />
          </svg>
        </div>
      </div>

      {/* Social proof typography */}
      <div className="ml-3 sm:ml-3.5 flex flex-col justify-center">
        <span className="text-white font-bold text-sm sm:text-[15px] leading-tight tracking-tight">
          50K+ Happy Clients
        </span>
        <span className="text-neutral-400 text-xs sm:text-[13px] leading-tight mt-0.5 font-normal">
          Global community
        </span>
      </div>
    </div>
  );
};
