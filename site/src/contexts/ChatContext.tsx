/// <reference types="vite/client" />
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { projects } from '@baodk-site/data/projects';
import { Project } from '@baodk-site/types';
import { sendChatMessages } from '@baodk-site/services/chatApi';

export interface Message {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  messages: Message[];
  isProcessing: boolean;
  activeProjectFromChat: Project | null;
  setActiveProjectFromChat: (project: Project | null) => void;
  handleSendMessage: (content: string) => Promise<void>;
  handleChatAction: (action: string, payload?: string) => void;
  handleSelectTopic: (topic: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeProjectFromChat, setActiveProjectFromChat] = useState<Project | null>(null);

  const handleChatAction = useCallback((action: string, payload?: string) => {
    if (action === 'CONTACT') {
      setIsChatOpen(false);
      setTimeout(() => {
        window.location.hash = '#contact';
      }, 300);
    } else if (action === 'PROJECT' && payload) {
      const foundProject = projects.find((p) =>
        p.title.toLowerCase().includes(payload.toLowerCase()),
      );
      if (foundProject) {
        setActiveProjectFromChat(foundProject);
      }
    }
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      setMessages((prev) => [...prev, { role: 'user', content }]);
      setIsProcessing(true);

      try {
        const payloadMessages: Message[] = [...messages, { role: 'user', content }];
        const { status, reply, error } = await sendChatMessages(payloadMessages);

        if (status === 200 && reply) {
          setMessages((prev) => [...prev, { role: 'ai', content: reply }]);
        } else if (status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'ai',
              content: 'The system is currently handling too many requests. Please try again in a few moments.',
            },
          ]);
        } else {
          setMessages((prev) => [...prev, { role: 'ai', content: `Error: ${error || 'Unknown error'}` }]);
        }
      } catch (err) {
        setMessages((prev) => [...prev, { role: 'ai', content: 'Connection failed to AI core.' }]);
      } finally {
        setIsProcessing(false);
      }
    },
    [messages],
  );

  const handleSelectTopic = useCallback(
    (topic: string) => {
      if (topic === 'contact') {
        setIsChatOpen(false);
        setTimeout(() => {
          window.location.hash = '#contact';
        }, 300);
        return;
      }

      if (!isChatOpen) {
        setIsChatOpen(true);
      }

      setTimeout(() => {
        handleSendMessage(`Tell me about ${topic}...`);
      }, 100);
    },
    [isChatOpen, handleSendMessage],
  );

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        messages,
        isProcessing,
        activeProjectFromChat,
        setActiveProjectFromChat,
        handleSendMessage,
        handleChatAction,
        handleSelectTopic,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
