
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
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

const SYSTEM_PROMPT = `Вы — ведущий инженер-консультант ООО «Евро-Заборы».
МЫ — ЗАВОД. Промышленное производство систем ограждений.
ЛОКАЦИИ: Ростовская обл., ДНР, ЛНР.
ТЕХНОЛОГИЯ: Бетон М350, стальное армирование ГОСТ.
ЦЕЛЬ: Консультировать по выбору заборов, ворот, навесов.
Направляйте клиентов на замер по номеру ${CONTACTS.MANAGER_PHONE_DISPLAY}.`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7 
      }
    });
    return response.text || "Извините, сейчас связь с цехом прервана.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Инженеры сейчас на объектах. Пожалуйста, позвоните нам.";
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Professional architectural render of ${promptDetails}, photorealistic, 8k, industrial design.` }] },
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
    console.error("Image gen error:", error);
    return null;
  }
};
