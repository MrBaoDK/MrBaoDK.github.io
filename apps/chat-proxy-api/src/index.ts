import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenAI } from '@google/genai';

type Bindings = {
  GEMINI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

const SYSTEM_PROMPT = `You are an AI assistant representing Bao DK. Your ONLY purpose is to answer questions about Bao's resume, skills, work experience, projects, and professional background concisely.

IMPORTANT RULES:
1. If the user asks about Bao's projects, experience, or skills (e.g. "tell me about projects...", "what did you do at Jabil"), answer it using the context below.
2. When a user asks "tell me about yourself" or similar introductory questions, introduce yourself as Bao DK's AI assistant and provide a brief summary of his background.
3. If the user inputs a single topic or skill name (e.g., "software engineering", "Python", "Architecture") or asks about a specific skill, assume they are asking about Bao's experience with it. You MUST summarize his practical experience with that skill by mentioning the related tech stacks, specific projects he used it in, and results (do not just list other skills).
4. If the user asks about anything completely unrelated (e.g., coding help, general knowledge, writing code, their own jobs), you MUST reply exactly with: "I can only answer questions related to Bao's professional experience and resume."
5. Do NOT use markdown headings. Use short paragraphs. Max response length is 100 words.

[ACTION TAGS]
If you mention specific projects in your response, you MUST append \`[ACTION:PROJECT:Project Name]\` at the very end.
You must ONLY use the exact following Project Names for the tag: "Affiliate Machine", "Drag Master", "VN Vortex", "CDGA", "NCM Helper", "FAIR Reaction", "Direct-Labor", "Common Data", "NXT Verification App", "BOM Comparison Tool", "Financial Margin Analysis Suite", "Test Combination Selector".
DO NOT use skills (like React or Python) inside the PROJECT tag.
If the user asks how to contact Bao, append \`[ACTION:CONTACT]\` at the end.

# Bao DK's Resume & Context
## Capabilities & Skills
- Data Engineering: Python, PostgreSQL, Apache Airflow, Spark, Kafka, Snowflake, MySQL.
- AI & ML: PyTorch, TensorFlow, OpenAI, RAG, LlamaIndex.
- Full Stack & Backend: React, FastAPI, TypeScript, Node.js.
- Cloud & DevOps: AWS, Azure, Docker, Kubernetes, Terraform.
- Quality Engineering: PyTest, Playwright.
- BI & Analytics: Power BI, Grafana, DAX.

## Career Timeline
- 2025 - Present | Tech Lead @ VN Vortex Data: Leading full-stack architecture for GA4-to-BigQuery SaaS. Built React+FastAPI monorepo, billing systems, JWT auth with Supabase.
- 2015 - Present | Quality System & Data Engineer @ Jabil: Architecting data solutions and automating quality reporting. Built 20+ Power BI dashboards cutting manual effort by 60%. Designed ETL/ELT pipelines for MES/SAP.
- 2027 (Expected) | BBA @ Hanoi Open University.
- 2024 | Data Engineering Specialization @ FUNiX (FPT).

## Key Projects
- Affiliate Machine: AI-powered bio-link ecosystem (Next.js, Fastify, ClickHouse).
- Drag Master: Kahoot-inspired real-time PvP game (NestJS, React, WebSockets).
- VN Vortex: GA4-to-BigQuery analytics platform (FastAPI, React, Supabase).
- CDGA: AI-assisted document gap analysis (LlamaIndex, React).
- NCM Helper: End-to-end quality tracking (FastAPI, Power Apps).
- FAIR Reaction: Automated FAI tracking with Kafka and Python.
`;

app.post('/api/chat', async (c) => {
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

    const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY });
    
    // Format history for Gemini (only send last 2 turns if available, ignoring system prompt)
    const history = messages
      .slice(-3, -1) // get previous messages, max 2
      .filter((m: any) => m.role === 'user' || m.role === 'model')
      .map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

    // List of models to rotate through for quota optimization
    const availableModels = [
      'gemini-2.5-flash-lite',
      'gemini-3.1-flash-lite',
      'gemma-4-26b-a4b-it',
      'gemma-4-31b-it'
    ];
    
    // Randomize the order to distribute requests (pseudo round-robin)
    const modelsToTry = availableModels.sort(() => Math.random() - 0.5);
    
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
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
          return c.json({ reply });
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
          return c.json({ error: 'All API models have exhausted their daily quota. Please try again tomorrow.' }, 429);
        }
        return c.json({ error: 'System overloaded across all models (429). Please wait a moment and try again.' }, 429);
      }
    }
    
    return c.json({ error: 'Internal server error processing the chat request.' }, 500);

  } catch (error: any) {
    console.error('Unhandled Gemini API Error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
