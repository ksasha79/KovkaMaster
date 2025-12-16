import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge', // Optional: Makes it faster on Vercel
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { promptDetails } = await request.json();

    if (!process.env.API_KEY) {
      return new Response(JSON.stringify({ error: 'Server API Key missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
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
      return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ image: imageUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Server API Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}