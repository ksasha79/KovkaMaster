
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  try {
    const { message, history } = req.body;

    if (!process.env.API_KEY) {
      return res.status(500).json({ error: 'Конфигурация сервера не завершена' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let contents = [];
    if (history && Array.isArray(history)) {
      contents = [...history];
    }
    
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({ 
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `Вы — ведущий инженер-консультант ООО «Евро-Заборы». 
        Наш официальный сайт: евро-заборы.рф (https://xn----8sbdboo1cemg5j.xn--p1ai).
        
        МЫ — ЗАВОД. У нас промышленное производство полного цикла.
        ЛОКАЦИИ: Ростовская обл., Воронежская обл., ДНР (Донецк, Мариуполь), ЛНР (Луганск).
        
        ТЕХНИЧЕСКИЕ ДАННЫЕ:
        - Евро-заборы: Бетон М350, стальное армирование.
        - Сетка Gitter: 3D-панели с полимерным покрытием.
        - Ворота: Откатные и распашные, автоматика DoorHan/NICE.
        
        ОБЯЗАТЕЛЬНО: Если клиент спрашивает цену или хочет заказать — направляйте его к форме "Вызвать замерщика" на сайте или предложите позвонить по номеру +7 (959) 187-89-49.`,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ error: 'Ошибка связи с заводом' });
  }
}
