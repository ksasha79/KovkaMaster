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
Базовая цена: от 2500 руб/м.п. за бетонные заборы.
Если клиент спрашивает про заказ или расчет, направляй его к форме на сайте или предлагай вызвать замерщика.`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    // Инициализируем прямо перед вызовом согласно правилам
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Очищаем историю: Gemini API требует, чтобы история начиналась с 'user' 
    // и строго чередовалась 'user' -> 'model'
    const cleanHistory = history.filter(h => h.parts && h.parts[0]?.text);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...cleanHistory, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    return responseText;
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    // Если ошибка связана с отсутствием ресурса (ключ/проект)
    if (error?.message?.includes("entity was not found")) {
       return `Ошибка конфигурации API. Пожалуйста, обратитесь в поддержку или попробуйте позже. Контакт: ${CONTACTS.PHONE_DISPLAY}`;
    }
    
    return `Извините, сейчас я не могу обработать ваш запрос технически. Пожалуйста, позвоните нашему менеджеру напрямую: ${CONTACTS.PHONE_DISPLAY}`;
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ 
          text: `Photorealistic modern architectural shot of high-end fence and gates, brand style 'Euro-Zabory', professional photography, 8k: ${promptDetails}` 
        }] 
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
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
    console.error("Image Generation Error:", error);
    return null;
  }
};
