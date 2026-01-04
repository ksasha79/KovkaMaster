
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
  if (!apiKey) throw new Error("API_KEY is missing");
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_PROMPT = `Вы — ведущий инженер-консультант ООО «Евро-Заборы».
МЫ — ЗАВОД. Промышленное производство полного цикла.
ЛОКАЦИИ: Ростовская обл., ДНР (Мариуполь, Донецк), ЛНР.
ТЕХНОЛОГИЯ: Бетон М350, стальное армирование ГОСТ.
ЦЕЛЬ: Консультировать клиентов по выбору заборов, ворот, навесов и стеллажей.
Направляйте клиентов на бесплатный замер или к менеджеру по номеру ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Стиль общения: Профессиональный, технически подкованный, вежливый и уверенный.`;

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
    return response.text || "Связь с производственным цехом прервана. Пожалуйста, оставьте заявку.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Инженеры сейчас на замере. Пожалуйста, позвоните нам напрямую для консультации.";
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const fullPrompt = `High-end professional architectural visualization of bespoke perimeter fencing and gates. 
    Category and Style: ${promptDetails}. 
    Details: Photorealistic, 8k resolution, cinematic lighting, luxury residential property context. 
    Materials: Reinforced concrete or high-quality wrought iron. No text or watermarks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: fullPrompt }] },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image gen error:", error);
    return null;
  }
};
