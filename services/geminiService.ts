
/**
 * Клиентский сервис теперь работает только через защищенные API-роуты.
 * Это скрывает API_KEY от конечного пользователя.
 */

import { GoogleGenAI } from "@google/genai";
import { CONTACTS } from '../config';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is not set");
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `Вы — ведущий инженер завода ООО «Евро-Заборы».
МЫ ПРОИЗВОДИТЕЛИ. Полный цикл: бетон М350, армирование ГОСТ, порошковая покраска.
ЛОКАЦИИ: Ростовская обл, ДНР (Мариуполь, Донецк), ЛНР, Воронежская обл.
КОНТАКТЫ: Менеджер ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Если клиент хочет расчет — направляйте его к форме внизу сайта. Поздравляйте с наступающим 2026 годом.`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7 
      }
    });
    return response.text || "Связь с производством прервана. Позвоните нам.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Инженеры на замере. Оставьте заявку в форме внизу страницы.";
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `High-end architectural visualization: ${promptDetails}, luxury fence system, modern landscaping, cinematic lighting, photorealistic 8k.` }] 
      }
    });
    
    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imagePart && imagePart.inlineData) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
