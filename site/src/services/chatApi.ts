/// <reference types="vite/client" />
import { Message } from '@baodk-site/contexts/ChatContext';

export interface ChatApiResponse {
  status: number;
  reply?: string;
  error?: string;
}

export const sendChatMessages = async (messages: Message[]): Promise<ChatApiResponse> => {
  let response;
  let retryCount = 0;
  const maxRetries = 1;

  const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL as string;

  while (retryCount <= maxRetries) {
    response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (response.status === 429 && retryCount < maxRetries) {
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      continue;
    }
    break;
  }

  const data = await response!.json();
  
  return {
    status: response!.status,
    reply: data.reply,
    error: data.error
  };
};
