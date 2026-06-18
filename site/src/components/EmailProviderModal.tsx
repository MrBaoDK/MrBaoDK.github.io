import React from 'react';

import { SOCIALS } from '@baodk-site/data/socials';
import { GenericModal } from '@mrbaodk/ui';

interface EmailProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    company: string;
    message: string;
  };
}

const EmailProviderModal: React.FC<EmailProviderModalProps> = ({ isOpen, onClose, formData }) => {
  const recipient = SOCIALS.EMAIL.label;
  const subject = encodeURIComponent(
    `Inquiry from ${formData.name} (${formData.company || 'Individual'})`,
  );
  const body = encodeURIComponent(
    `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n\n` +
      `Message:\n${formData.message}`,
  );

  const providers = [
    {
      name: 'Gmail',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`,
      color: 'hover:bg-red-500/10 hover:border-red-500/50',
    },
    {
      name: 'Outlook',
      icon: 'https://outlook.live.com/favicon.ico',
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`,
      color: 'hover:bg-blue-500/10 hover:border-blue-500/50',
    },
    {
      name: 'Default Mail App',
      icon: 'mail', // Material symbol
      href: `mailto:${recipient}?subject=${subject}&body=${body}`,
      color: 'hover:bg-emerald-500/10 hover:border-emerald-500/50',
      isMaterial: true,
    },
  ];

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center text-center p-8'>
        {/* Header */}
        <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg'>
          <span className='material-symbols-outlined text-[var(--color-primary)] text-3xl'>
            mark_as_unread
          </span>
        </div>
        <h3 className='text-2xl font-black text-white mb-2 tracking-tight uppercase italic'>
          Choose Your Provider
        </h3>
        <p className='text-white/40 font-medium mb-8 text-sm uppercase tracking-widest leading-relaxed'>
          Select how you'd like to send your inquiry. Your message is ready for review.
        </p>

        {/* Provider list */}
        <div className='w-full space-y-3'>
          {providers.map((provider) => (
            <a
              key={provider.name}
              href={provider.href}
              target='_blank'
              rel='noopener noreferrer'
              onClick={onClose}
              className={`flex items-center gap-4 w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 transition-all duration-300 group ${provider.color}`}
            >
              <div className='w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform'>
                {provider.isMaterial ? (
                  <span className='material-symbols-outlined text-white/60 group-hover:text-white'>
                    {provider.icon}
                  </span>
                ) : (
                  <img
                    src={provider.icon}
                    alt={provider.name}
                    className='w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all'
                  />
                )}
              </div>
              <span className='text-white font-bold tracking-tight'>{provider.name}</span>
              <span className='material-symbols-outlined text-white/10 ml-auto group-hover:text-white/40 transition-colors'>
                open_in_new
              </span>
            </a>
          ))}
        </div>

        {/* Dismiss */}
        <button
          onClick={onClose}
          className='mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors'
        >
          Cancel and Return
        </button>
      </div>
    </GenericModal>
  );
};

export default EmailProviderModal;
