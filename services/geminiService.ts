
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
  const apiKey = (window as any).process?.env?.API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is not defined");
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `Вы — ведущий инженер завода ООО «Евро-Заборы».
МЫ ПРОИЗВОДИТЕЛИ. Полный цикл: бетон М350, армирование ГОСТ, порошковая покраска.
ЛОКАЦИИ: Ростовская обл, ДНР (Мариуполь, Донецк), ЛНР, Воронежская обл.
КОНТАКТЫ: Менеджер ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Если клиент хочет расчет — направляйте его к форме внизу сайта. Поздравляйте с 2026 годом.`;

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
    return response.text || "Связь временно недоступна. Пожалуйста, позвоните нам.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Инженеры сейчас на производстве. Оставьте заявку в форме обратной связи.";
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `Architectural visualization: ${promptDetails}, high-end luxury fence system, modern landscaping, cinematic lighting, photorealistic 8k.` }] 
      }
    });
    
    // Ищем часть с данными изображения
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
