import { GoogleGenAI } from "@google/genai";
import { CONTACTS } from '../config.ts';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SYSTEM_PROMPT = `Вы — ведущий инженер завода ООО «Евро-Заборы».
Ваша миссия: консультировать клиентов по выбору заборов, ворот и навесов. 
Тон: профессиональный, дружелюбный, экспертный.
Важно: Отвечай кратко и по делу. Не используй сложные термины без пояснения.
Контакты для связи: ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Базовая цена: от 2500 руб/м.п. за бетонные заборы.`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Используем gemini-flash-latest для лучшей совместимости
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });

    return response.text || "Прошу прощения, я задумался. Можете повторить вопрос?";
  } catch (error) {
    console.error("AI Service Error:", error);
    // Более информативное сообщение об ошибке в консоль поможет при отладке
    return `Извините, сейчас я не могу ответить. Пожалуйста, позвоните нашему менеджеру: ${CONTACTS.PHONE_DISPLAY}`;
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ 
          text: `Photorealistic modern architectural shot of high-end fence and gates, brand style 'Euro-Zabory', professional photography, 8k: ${promptDetails}` 
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
