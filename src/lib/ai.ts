import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const AI_MODEL = "gpt-4o-mini";

export const SYSTEM_PROMPT = `Eres el asistente virtual de Dallape Solutions, una empresa especializada en soluciones de inteligencia artificial para negocios. Tu rol es ayudar a los visitantes a entender nuestros servicios, responder preguntas sobre IA, y guiarlos hacia una consulta con nuestro equipo.

Sé amigable, profesional y conciso. Responde siempre en español.`;
