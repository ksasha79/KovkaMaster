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
