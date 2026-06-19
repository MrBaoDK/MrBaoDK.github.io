import { Hono } from 'hono';
import { Bindings } from '../types';
import { GeminiService } from '../services/gemini.service';

const chatRoute = new Hono<{ Bindings: Bindings }>();

chatRoute.post('/', async (c) => {
  try {
    const { messages } = await c.req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: 'Invalid input' }, 400);
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return c.json({ error: 'Expected last message to be from user' }, 400);
    }

    const userPrompt = lastMessage.content;
    
    // Token optimization & Security: limit input length
    if (userPrompt.length > 300) {
      return c.json({ error: 'Message too long. Please keep it under 300 characters.' }, 400);
    }

    // Format history for Gemini (only send last 2 turns if available, ignoring system prompt)
    const history = messages
      .slice(-3, -1) // get previous messages, max 2
      .filter((m: any) => m.role === 'user' || m.role === 'model')
      .map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

    const geminiService = new GeminiService(c.env);
    
    const result = await geminiService.generateChatResponse(userPrompt, history);
    return c.json(result);

  } catch (error: any) {
    if (error.message && (error.message.includes('quota') || error.message.includes('overloaded'))) {
      return c.json({ error: error.message }, 429);
    }
    console.error('Unhandled Gemini API Error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default chatRoute;
