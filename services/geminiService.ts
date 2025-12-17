import { GoogleGenAI } from "@google/genai";

/**
 * Используем напрямую Google GenAI SDK для генерации концептов.
 * Ключ берется из окружения process.env.API_KEY.
 */
export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

    // Ищем часть с изображением (inlineData)
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating gate concept with Gemini:", error);
    return null;
  }
};
