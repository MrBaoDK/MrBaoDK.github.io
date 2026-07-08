import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  children,
  className = 'max-w-md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const portalRoot = document.getElementById('portal-root');

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements || focusableElements.length === 0) return;
      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleFocusTrap);

    const firstFocusable = modalRef.current?.querySelector(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    ) as HTMLElement;
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      modalRef.current?.focus();
    }

    // Scroll lock with scrollbar-width compensation (prevents layout shift)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const origOverflow = document.body.style.overflow;
    const origPaddingRight = document.body.style.paddingRight;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleFocusTrap);
      document.body.style.overflow = origOverflow;
      document.body.style.paddingRight = origPaddingRight;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans'
      role='dialog'
      aria-modal='true'
    >
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-xl'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Modal Shell */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${className} bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 focus:outline-none`}
      >
        {/* Ambient glow */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 blur-3xl pointer-events-none' />
        {children}
      </div>
    </div>
  );

  return createPortal(content, portalRoot || document.body);
};

export default GenericModal;
