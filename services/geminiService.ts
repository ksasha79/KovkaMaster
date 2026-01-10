import { GoogleGenAI } from "@google/genai";
import { CONTACTS } from '../config.ts';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SYSTEM_PROMPT = `Вы — ведущий инженер завода ООО «Евро-Заборы».
Ваша миссия: консультировать клиентов по выбору заборов, ворот и навесов. 
Тон: профессиональный, дружелюбный, экспертный.
Вы должны помогать с выбором материалов (бетон, металл, автоматика) и ориентировать по процессу замера.
Если просят цену — говорите, что точная смета составляется после замера, но базовые цены есть на сайте (от 2500 руб/м.п.).
Контакты для связи: ${CONTACTS.MANAGER_PHONE_DISPLAY}.`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    // Создаем инстанс прямо перед вызовом, чтобы использовать актуальный ключ из окружения
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_PROMPT,
      }
    });
    return response.text || "Извините, возникла ошибка связи. Попробуйте позвонить нам.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Связь прервана. Наш номер: " + CONTACTS.PHONE_DISPLAY;
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ 
          text: `Modern high-quality fence and gate design, professional architectural photography, 8k, sunset lighting, luxury house background: ${promptDetails}` 
        }] 
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
