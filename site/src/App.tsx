import React, { Suspense } from 'react';

import ChatAssistant from '@baodk-site/components/chat/ChatAssistant';
import ChatHero from '@baodk-site/components/ChatHero';
import LandingHero from '@baodk-site/components/LandingHero';
import ChatLayout from '@baodk-site/layouts/ChatLayout';
import LandingLayout from '@baodk-site/layouts/LandingLayout';
import { LiquidGrid } from '@mrbaodk/ui';
import { GenericModal } from '@mrbaodk/ui';
import ProjectCaseStudyModal from '@baodk-site/components/ProjectCaseStudyModal';

import { ChatProvider, useChatContext } from '@baodk-site/contexts/ChatContext';
import { useHashRouting } from '@baodk-site/hooks/useHashRouting';

import '@baodk-site/styles/globals.css';

// Lazy load section components
const Capabilities = React.lazy(() => import('@baodk-site/components/Capabilities'));
const Projects = React.lazy(() => import('@baodk-site/components/Projects'));
const Timeline = React.lazy(() => import('@baodk-site/components/Timeline'));
const Testimonials = React.lazy(() => import('@baodk-site/components/Testimonials'));
const Contact = React.lazy(() => import('@baodk-site/components/Contact'));

const SectionLoader: React.FC = () => (
  <div className='h-40 flex items-center justify-center opacity-50'>
    <div className='w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin' />
  </div>
);

const AppContent: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    messages,
    isProcessing,
    activeProjectFromChat,
    setActiveProjectFromChat,
    handleSendMessage,
    handleChatAction,
    handleSelectTopic,
  } = useChatContext();

  useHashRouting(isChatOpen, setIsChatOpen);

  const renderLandingContent = () => (
    <div className='landing-page-content'>
      <div id='about'>
        <LandingHero onStartChat={() => setIsChatOpen(true)} />
      </div>
      <div id='capabilities' className='reveal'>
        <Suspense fallback={<SectionLoader />}>
          <Capabilities />
        </Suspense>
      </div>
      <div id='projects' className='reveal'>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
      </div>
      <div id='experience' className='reveal'>
        <Suspense fallback={<SectionLoader />}>
          <Timeline />
        </Suspense>
      </div>
      <div id='testimonials' className='reveal'>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </div>
      <div id='contact' className='reveal'>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>
    </div>
  );

  const isRootPath = window.location.pathname === '/' || window.location.pathname === '/index.html';

  if (!isRootPath) {
    return null;
  }

  return (
    <div className='min-h-screen bg-[var(--color-dark)] relative'>
      <LiquidGrid />

      <LandingLayout onOpenChat={() => setIsChatOpen(true)}>{renderLandingContent()}</LandingLayout>

      {/* Chat Modal */}
      <GenericModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        className='max-w-5xl h-[85vh]'
      >
        <ChatLayout onSelectTopic={handleSelectTopic}>
          {messages.length === 0 ? (
            <ChatHero onSendMessage={handleSendMessage} onClose={() => setIsChatOpen(false)} />
          ) : (
            <ChatAssistant
              messages={messages}
              onSendMessage={handleSendMessage}
              onClose={() => setIsChatOpen(false)}
              onAction={handleChatAction}
              isProcessing={isProcessing}
            />
          )}
        </ChatLayout>
      </GenericModal>

      {/* Action Modals from Chat */}
      {activeProjectFromChat && (
        <ProjectCaseStudyModal
          project={activeProjectFromChat}
          onClose={() => setActiveProjectFromChat(null)}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
};

export default App;
