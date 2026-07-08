import React, { useState } from 'react';

import { Message } from '@baodk-site/contexts/ChatContext';

interface ChatAssistantProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  onClose: () => void;
  onAction?: (action: string, payload?: string) => void;
  isProcessing?: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({
  messages,
  onSendMessage,
  onClose,
  onAction,
  isProcessing,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const renderMessageContent = (msg: Message, i: number) => {
    let content = msg.content;
    const actions: { type: string; payload?: string }[] = [];

    const actionRegex = /\[ACTION:(CONTACT|PROJECT)(?::([^\]]*))?\]/g;
    let match;
    while ((match = actionRegex.exec(content)) !== null) {
      actions.push({ type: match[1], payload: match[2] });
    }
    
    if (actions.length > 0) {
      content = content.replace(/\[ACTION:.*?\]/g, '').trim();
    }

    return (
      <div
        key={i}
        className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-8 duration-700`}
      >
        <div
          className={`max-w-[90%] md:max-w-[85%] rounded-2xl md:rounded-3xl p-4 md:p-7 text-sm md:text-lg leading-relaxed relative ${
            msg.role === 'user'
              ? 'bg-gradient-to-br from-[var(--color-primary)] to-[#c41551] text-white rounded-tr-none shadow-[0_10px_30px_rgba(233,30,96,0.2)] font-bold'
              : 'bg-white/[0.03] text-white/90 border border-white/10 rounded-tl-none font-medium backdrop-blur-md shadow-xl'
          }`}
        >
          {msg.role === 'ai' && (
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] rounded-2xl md:rounded-3xl overflow-hidden bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_3px)]' />
          )}

          <div className='relative z-10'>
            {content}
            
            {actions.length > 0 && onAction && (
              <div className='mt-4 flex flex-wrap gap-2'>
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAction(action.type, action.payload)}
                    className='px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-lg flex items-center gap-2'
                  >
                    {action.type === 'CONTACT' ? 'Contact Bao' : `View ${action.payload}`}
                    <span className='material-symbols-outlined text-sm'>arrow_forward</span>
                  </button>
                ))}
              </div>
            )}

            {msg.role === 'ai' && actions.length === 0 && (
              <div className='flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6'>
                {['Architecture', 'MLOps', 'Systems engineering'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => onSendMessage(chip)}
                    className='px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-white/5 border border-white/5 text-[var(--color-primary)] text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-lg cursor-pointer'
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='h-full w-full flex flex-col bg-white/[0.01] overflow-hidden relative'>
      {/* Technical Status Bar */}
      <div className='h-4 bg-white/[0.03] border-b border-white/5 flex items-center justify-between px-6 md:px-10 pointer-events-none select-none shrink-0'>
        <div className='flex gap-4 md:gap-8'>
          <span className='text-[5px] md:text-[7px] font-black text-white/10 uppercase tracking-[0.3em]'>
            Session://BAO-NTEL-V4.1
          </span>
          <span className='text-[5px] md:text-[7px] font-black text-white/10 uppercase tracking-[0.3em] hidden sm:inline'>
            Protocol: Neural-TLS 1.3
          </span>
        </div>
        <div className='flex gap-4 md:gap-8'>
          <span className='text-[5px] md:text-[7px] font-black text-[var(--color-primary)]/30 uppercase tracking-[0.3em]'>
            Secure_Channel: Active
          </span>
          <span className='text-[5px] md:text-[7px] font-black text-white/10 uppercase tracking-[0.3em]'>
            Latency: 14ms
          </span>
        </div>
      </div>

      {/* Header */}
      <div className='p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] relative z-20 shrink-0'>
        <div className='flex items-center gap-4 md:gap-6'>
          <button
            onClick={onClose}
            className='w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-all group border border-white/10 shadow-lg'
            title='Back to Portfolio'
          >
            <span className='material-symbols-outlined text-sm md:text-md text-white/40 group-hover:text-white transition-colors'>
              arrow_back
            </span>
          </button>
          <div className='flex items-center gap-4 md:gap-5'>
            <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border-2 border-[var(--color-primary)]/30 shadow-[0_0_20px_rgba(233,30,96,0.15)] ring-1 ring-white/10'>
              <img
                src='/avatar/bao_ai_avatar.webp'
                alt='Bao AI'
                className='w-full h-full object-cover'
                width={48}
                height={48}
              />
            </div>
            <div>
              <h3 className='text-lg md:text-xl font-black text-white tracking-tighter uppercase italic leading-none'>
                Bao <span className='text-[var(--color-primary)]'>Intelligence</span>
              </h3>
              <div className='flex items-center gap-2 mt-1.5'>
                <div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' />
                <span className='text-[7px] md:text-[9px] text-white/40 uppercase tracking-[0.3em] font-black'>
                  Neural Core Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className='flex-1 overflow-y-auto p-4 md:p-10 space-y-4 md:space-y-6 custom-scrollbar pb-32 relative z-10'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-center p-8 opacity-20'>
            <div className='w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 rotate-6 shadow-2xl'>
              <span className='material-symbols-outlined text-4xl text-[var(--color-primary)]'>
                terminal
              </span>
            </div>
            <h4 className='text-xl font-black text-white mb-3 tracking-tighter uppercase italic'>
              System Initialized
            </h4>
            <p className='text-white/60 text-[10px] md:text-xs max-w-sm font-medium leading-relaxed uppercase tracking-widest'>
              Neural link established. Query the engineering ecosystem for deep insights.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => renderMessageContent(msg, i))
        )}
        {isProcessing && (
          <div className='flex justify-start animate-in fade-in duration-300'>
            <div className='bg-white/5 text-[var(--color-primary)] px-5 py-2.5 rounded-xl border border-[var(--color-primary)]/20 text-[9px] font-black uppercase tracking-[0.4em] animate-pulse shadow-lg'>
              Processing Neural Stream...
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Integrated */}
      <div className='p-4 md:p-8 bg-white/[0.02] border-t border-white/5 backdrop-blur-2xl relative z-20 shrink-0'>
        <form onSubmit={handleSubmit} className='max-w-5xl mx-auto relative group'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Query the engineering ecosystem...'
            className='w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-primary)]/50 transition-all pr-20 md:pr-36 text-sm md:text-xl font-medium shadow-inner'
          />
          <button
            type='submit'
            disabled={isProcessing || !inputValue.trim()}
            className='absolute right-2 md:right-3 top-1/2 -translate-y-1/2 px-5 md:px-10 py-2 md:py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-black text-[9px] md:text-[12px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-[var(--color-primary)]/40 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 md:gap-3 pointer-events-auto'
          >
            Transmit
            <span className='material-symbols-outlined text-lg md:text-xl'>bolt</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;
