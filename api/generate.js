import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Check for POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel automatically parses JSON body for Node.js functions
    const { promptDetails } = req.body;

    if (!process.env.API_KEY) {
      console.error("API_KEY is missing in environment variables");
      return res.status(500).json({ error: 'Server API Key missing' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash-image';
    
    const fullPrompt = `Photorealistic professional architectural visualization of wrought iron gates. 
    Style: ${promptDetails}. 
    Context: Installed outdoors on a sunny day, high detail, intricate metalwork patterns, 
    black metal with optional gold patina accents. 8k resolution, cinematic lighting.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    let imageUrl = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    return res.status(200).json({ image: imageUrl });

  } catch (error) {
    console.error("Server API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
