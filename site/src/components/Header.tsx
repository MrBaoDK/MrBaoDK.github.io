import React, { useEffect, useState } from 'react';

import { NAV_ITEMS } from '@baodk-site/data/navigation';
import { handleNavClick } from '@baodk-site/utils/navigation';
import { GenericIcon } from '@mrbaodk/ui';

interface HeaderProps {
  onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'projects', 'experience', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerNavItems = NAV_ITEMS.filter((item) => item.whereUsed?.includes('header'));

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id === 'ask-ai') {
      e.preventDefault();
      onOpenChat();
      setIsMenuOpen(false);
      return;
    }

    handleNavClick(e, id, (id) => {
      setActiveSection(id);
      setIsMenuOpen(false);
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? 'bg-black/80 backdrop-blur-xl py-1 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-8'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          {/* Logo/Brand */}
          <a
            href='/'
            aria-label='Bao DK - Home'
            className='flex items-center gap-2 md:gap-4 no-underline relative'
          >
            {/* Main logo: large, slight overlap */}
            <span className='inline-flex items-center justify-center shadow-2xl w-14 h-14 -mb-3.5 group'>
              <img
                src='/logo/logo_head.svg'
                alt='Bao DK logo'
                width={84}
                height={84}
                loading='eager'
                decoding='async'
                className='block transition-transform duration-500 group-hover:scale-110'
              />
            </span>

            {/* Logo Text: Replaced logo_sign.svg with text for better coherence */}
            <span className='hidden md:inline-flex items-baseline ml-3 lg:ml-4'>
              <span className='text-white font-black text-2xl tracking-tighter uppercase'>Bao</span>
              <span className='text-[var(--color-primary)] font-black text-2xl tracking-tighter uppercase ml-1'>
                DK
              </span>
            </span>

            {/* Screen-reader-only brand text */}
            <span className='sr-only'>Bao DK</span>
          </a>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6 lg:space-x-8'>
            {headerNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => onNavClick(e, item.id)}
                className={`text-sm font-bold transition-all duration-300 no-underline uppercase tracking-widest hover:text-[var(--color-primary)] ${
                  activeSection === item.id ? 'text-[var(--color-primary)]' : 'text-white/70'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Professional CTA */}
          <a
            href='#contact'
            onClick={(e) => onNavClick(e, 'contact')}
            className='hidden md:flex items-center gap-2 px-8 py-2 rounded-full bg-[var(--color-primary)] text-white font-black text-md uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-[var(--color-primary)]/20 no-underline group -mb-3.5'
          >
            Hire Me
            <GenericIcon
              icon='work'
              className='group-hover:rotate-19 transition-all duration-300'
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-2xl bg-transparent border-0 text-white cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className='md:hidden pb-10 border-t border-white/10 mt-6 animate-in fade-in slide-in-from-top-4 duration-300'>
            {headerNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  onNavClick(e, item.id);
                }}
                className='block py-3 text-white hover:text-[var(--color-dark)] transition-colors no-underline'
              >
                {item.label}
              </a>
            ))}
            <a
              href='#contact'
              onClick={(e) => {
                onNavClick(e, 'contact');
              }}
              className='btn-primary btn-lg mt-4 w-full no-underline text-center flex items-center justify-center py-3'
            >
              Contact Me
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
