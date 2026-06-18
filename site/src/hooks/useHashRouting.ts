import { useEffect } from 'react';
import { scrollToSection } from '@baodk-site/utils/navigation';

export const useHashRouting = (isChatOpen: boolean, setIsChatOpen: (open: boolean) => void) => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#about';

      // Support legacy #/about paths and #/chat
      if (hash.startsWith('#/about')) {
        const cleanHash = hash.replace('#/about', '') || '#about';
        window.history.replaceState(null, '', cleanHash);
        return;
      }

      if (hash === '#chat') {
        setIsChatOpen(true);
        // Don't change current route for chat modal, just open it
        // and optionally clear the hash to keep it clean, or keep it for deep links
        return;
      }

      const anchorId = hash.replace('#', '');
      if (anchorId) {
        // Use setTimeout to ensure lazy elements are rendered or layout is stable
        setTimeout(() => {
          scrollToSection(anchorId);
        }, 150);
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    const isRootPath =
      window.location.pathname === '/' || window.location.pathname === '/index.html';
    if (isRootPath && !window.location.hash) {
      window.location.hash = '#about';
    }

    window.addEventListener('hashchange', handleHashChange);

    // Initial check for hash on load
    handleHashChange();

    // Reveal animations & Hash synchronization on scroll
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '-100px 0px -20% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Update hash as user scrolls through sections
          const id = entry.target.id;
          if (id && id !== 'hero' && !isChatOpen) {
            window.history.replaceState(null, '', `#${id}`);
          } else if ((id === 'hero' || id === 'about') && !isChatOpen) {
            window.history.replaceState(null, '', `#about`);
          }
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Also observe the #about wrapper specifically for scroll tracking
    const aboutElement = document.getElementById('about');
    if (aboutElement && !Array.from(revealElements).includes(aboutElement)) {
      observer.observe(aboutElement);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [isChatOpen, setIsChatOpen]); // Re-run when chat closes to resume scroll tracking
};
