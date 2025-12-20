import { GoogleGenAI } from "@google/genai";

/**
 * Используем напрямую Google GenAI SDK для генерации концептов.
 * Ключ берется из окружения process.env.API_KEY.
 */
export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is not defined");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const fullPrompt = `Photorealistic architectural visualization of a modern EuroZabor (sectional concrete or mesh fence) with matching gates. 
    Design request: ${promptDetails}. 
    Environment: Suburban house facade, clean landscape, daylight. 
    Materials: Decorative concrete texture (stone/brick), premium metal pillars, high quality finish. 8k resolution, cinematic lighting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData?.data);

    if (imagePart?.inlineData?.data) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }

    return null;
  } catch (error) {
    console.error("Error generating fence concept with Gemini:", error);
    return null;
  }
};

export const chatWithSupport = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const model = 'gemini-3-flash-preview';
    
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: `Вы — интеллектуальный ассистент компании ООО "ЕвроЗаборы" (Макс). 
        Ваша цель: помогать клиентам с вопросами о заборах, воротах, навесах и беседках. 
        Информация о компании:
        - Работаем в Ростове-на-Дону, Ростовской области, ДНР (Донецк, Макеевка) и ЛНР (Луганск).
        - Производим еврозаборы (бетонные секции), 3D сетку Gitter, откатные и распашные ворота, навесы для авто, беседки Loft, стеллажи.
        - Преимущества: собственное производство, работа по договору ООО, гарантия 2 года, бесплатный замер при заказе.
        - Цены: от 2500 руб за погонный метр еврозабора "под ключ".
        - Телефон: +7 (959) 187-89-49.
        Отвечайте вежливо, кратко и профессионально на русском языке. Если не знаете ответа, предлагайте вызвать мастера на замер.`,
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "Извините, сейчас я не могу ответить. Пожалуйста, позвоните нам по телефону +7 (959) 187-89-49.";
  }
};
