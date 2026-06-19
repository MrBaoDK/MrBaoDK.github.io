import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../constants/prompts';
import { Bindings } from '../types';

export class GeminiService {
  private ai: GoogleGenAI;

  // List of models to rotate through for quota optimization
  private availableModels = [
    'gemini-2.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemma-4-26b-a4b-it',
    'gemma-4-31b-it',
    'gemini-2.5-flash',
    'gemini-3.1-flash',
    'gemini-3-flash',
  ];

  constructor(env: Bindings) {
    this.ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  }

  async generateChatResponse(userPrompt: string, history: any[]) {
    // Randomize the order to distribute requests (pseudo round-robin)
    const modelsToTry = this.availableModels.sort(() => Math.random() - 0.5);
    
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await this.ai.models.generateContent({
          model: modelName,
          contents: [
            ...history,
            { role: 'user', parts: [{ text: userPrompt }] }
          ],
          config: {
            systemInstruction: { role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
            maxOutputTokens: 150,
            temperature: 0.2,
          }
        });

        const reply = response.text;
        if (reply) {
          return { reply };
        }
        
      } catch (error: any) {
        console.error(`Gemini API Error with model ${modelName}:`, error.message);
        lastError = error;
        
        // If it's a quota/rate limit error (429) or model not found (404), continue to the next model
        if (error.status === 429 || error.status === 404 || (error.message && (error.message.includes('429') || error.message.includes('404')))) {
          continue;
        }
        
        // For other errors (like 400 bad request), break and return error
        break;
      }
    }

    // If all models failed
    if (lastError) {
      if (lastError.status === 429 || (lastError.message && lastError.message.includes('429'))) {
        if (lastError.message && lastError.message.toLowerCase().includes('quota')) {
          throw new Error('All API models have exhausted their daily quota. Please try again tomorrow.');
        }
        throw new Error('System overloaded across all models (429). Please wait a moment and try again.');
      }
    }
    
    throw new Error('Internal server error processing the chat request.');
  }
}
