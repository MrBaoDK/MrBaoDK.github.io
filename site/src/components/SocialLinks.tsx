import React from 'react';

import { SOCIALS } from '@baodk-site/data/socials';
import { GenericIcon } from '@mrbaodk/ui';

interface SocialLinksProps {
  label: string;
  variant?: 'icon' | 'pill';
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ label, variant = 'icon', className = '' }) => {
  const filteredLinks = Object.values(SOCIALS)
    .filter((social) => social.labels?.includes(label))
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  if (filteredLinks.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {filteredLinks.map((social) => {
        if (variant === 'icon') {
          return (
            <a
              key={social.href}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-[var(--color-primary)]/10 hover:text-white transition-all no-underline group'
              aria-label={social.label}
              title={social.label}
            >
              <GenericIcon
                icon={social.icon}
                className='text-xl transition-transform group-hover:scale-110'
                size='md'
              />
            </a>
          );
        }

        return (
          <a
            key={social.href}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
            className='px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all no-underline'
            title={social.label}
          >
            {social.label}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
