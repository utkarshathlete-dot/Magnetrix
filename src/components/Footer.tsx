import React from 'react';

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
}: FooterProps) => {
  const linkClassName = 'hover:text-white transition-colors';
  const buttonClassName = `${linkClassName} cursor-pointer`;
  const button = (label: string, onClick?: () => void) =>
    React.createElement('button', { type: 'button', onClick, className: buttonClassName }, label);
  const anchor = (label: string, href: string, className = linkClassName) =>
    React.createElement('a', { href, className }, label);

  return React.createElement(
    'footer',
    {
      className:
        'relative z-20 border-t border-white/10 bg-black/80 backdrop-blur-lg pt-12 pb-10 px-6 sm:px-10 lg:px-16 mt-20',
    },
    React.createElement(
      'div',
      {
        className:
          'max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400',
      },
      React.createElement(
        'div',
        {
          className:
            'flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left',
        },
        React.createElement(
          'span',
          { className: 'text-lg font-bold text-white tracking-tight' },
          'Magentrix',
        ),
        React.createElement('span', { className: 'hidden sm:inline text-neutral-600' }, '|'),
        React.createElement('span', null, 'Digital Marketing crafted for real business growth'),
      ),
      React.createElement(
        'div',
        { className: 'flex items-center gap-6' },
        button('Services Catalog', onNavigateToServices),
        anchor('Free Audit', '#audit', 'text-red-400 hover:text-white transition-colors'),
        anchor('ROI Calculator', '#calculator'),
        anchor('FAQ', '#faq'),
        button('Our Work', onNavigateToWork),
        anchor('Stories', '#stories'),
        button('Blog', onNavigateToBlog),
        button('About Us', onNavigateToAbout),
        button('Contact', onNavigateToContact),
        React.createElement(
          'span',
          { className: 'text-neutral-500' },
          '© 2026 Magentrix. All rights reserved.',
        ),
      ),
    ),
  );
};
