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
    
    const fullPrompt = `Photorealistic professional architectural visualization of wrought iron gates. 
    Design details: ${promptDetails}. 
    Environment: High-end residence entrance, sunny day, black steel, intricate ornaments, 8k resolution.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    // Безопасно ищем часть с изображением (inlineData) используя методы массива
    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData?.data);

    if (imagePart?.inlineData?.data) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }

    return null;
  } catch (error) {
    console.error("Error generating gate concept with Gemini:", error);
    return null;
  }
};
