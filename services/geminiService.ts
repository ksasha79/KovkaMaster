
/**
 * Клиентский сервис теперь работает только через защищенные API-роуты.
 * Это скрывает API_KEY от конечного пользователя.
 */

import { GoogleGenAI } from "@google/genai";
import { CONTACTS } from '../config.ts';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is missing");
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `Вы — ИИ-инженер завода ООО «Евро-Заборы» (евро-заборы.рф).
Ваша задача: профессионально консультировать по заборам, воротам и навесам.
МЫ ПРОИЗВОДИТЕЛИ (ЗАВОД), а не перекупы.
ЛОКАЦИИ: Ростовская область, ДНР (Донецк, Мариуполь), ЛНР, Воронежская область.
ХАРАКТЕРИСТИКИ: Бетон М350, ГОСТ-армирование, порошковая покраска.
КОНТАКТЫ: Менеджер ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Если клиент хочет расчет или замер — просите его проскроллить вниз к форме или звонить.`;

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
    return response.text || "Связь с производством временно ограничена. Позвоните нам: " + CONTACTS.MANAGER_PHONE_DISPLAY;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Наши инженеры сейчас на замере. Пожалуйста, оставьте ваш номер в форме внизу страницы.";
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `Architectural visualization: ${promptDetails}, high-end luxury fence and gate, modern house background, golden hour lighting, 8k photorealistic.` }] 
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};

