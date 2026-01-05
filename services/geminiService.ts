
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

const SYSTEM_PROMPT = `Вы — ведущий инженер-консультант ООО «Евро-Заборы».
МЫ — ЗАВОД. Промышленное производство полного цикла.
ЛОКАЦИИ: Ростовская область, ДНР (Мариуполь, Донецк), ЛНР.
ТЕХНОЛОГИЯ: Бетон М350, стальное армирование ГОСТ.
ЦЕЛЬ: Консультировать клиентов по выбору заборов, ворот, навесов.
Направляйте клиентов на бесплатный замер по номеру ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Стиль общения: Деловой, экспертный, вежливый.`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7 
      }
    });
    return response.text || "Связь с заводом временно прервана. Пожалуйста, позвоните нам напрямую.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Инженеры сейчас на линии производства. Пожалуйста, оставьте заявку, и мы перезвоним.";
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ 
          text: `High-quality architectural visualization of a modern perimeter fence or gate system. Style: ${promptDetails}. Industrial luxury design, 8k resolution, photorealistic.` 
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
    console.error("Generation Error:", error);
    return null;
  }
};
