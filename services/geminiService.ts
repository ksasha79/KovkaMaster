
import { GoogleGenAI } from "@google/genai";
import { CONTACTS } from '../config.ts';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SYSTEM_PROMPT = `Вы — ведущий инженер завода ООО «Евро-Заборы» в Воронеже.
Ваша миссия: консультировать клиентов из Воронежской, Липецкой и Белгородской областей по выбору ограждений. 
Тон: профессиональный, экспертный, вежливый.

МЫ — ЗАВОД. У нас собственное производство в Ростовской области и складской хаб в Воронеже.
Локации приоритетные: Воронеж, Липецк, Белгород, Курск.
Также работаем: ДНР, ЛНР, Ростовская обл.
Преимущество: Мы знаем, как ставить заборы на черноземе и глине, чтобы они не кренились.

Контакты: ${CONTACTS.MANAGER_PHONE_DISPLAY}.
Цена: от 2500 руб/м.п.
Если клиент хочет точный расчет — проси оставить заявку в форме «Бесплатный расчет».`;

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const validHistory = history.filter(h => h.parts && h.parts[0]?.text);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...validHistory, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || "Связь с инженерным отделом в Воронеже прервана. Позвоните нам.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return `Извините, сейчас я не могу ответить. Пожалуйста, свяжитесь с менеджером в Воронеже: ${CONTACTS.PHONE_DISPLAY}`;
  }
};

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ 
          text: `Photorealistic high-end architectural visualization of ${promptDetails}. 
          Context: Premium private house in Voronezh, summer day, green landscaping, 
          8k resolution, cinematic lighting.` 
        }] 
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
