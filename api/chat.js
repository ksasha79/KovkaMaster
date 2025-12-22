
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
    
    // Формируем содержимое для модели: история + текущее сообщение
    let contents = [];
    
    if (history && Array.isArray(history)) {
      contents = [...history];
    }
    
    // Добавляем текущее сообщение пользователя
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `Вы — ведущий инженер-консультант ООО «ЕвроЗаборы — Завод Ограждений и Ворот». 
        МЫ — ЗАВОД. У нас промышленное производство полного цикла.
        
        ТЕХНИЧЕСКИЕ ДАННЫЕ:
        - Еврозаборы: Бетон М350, армирование стальной сеткой ВР-1.
        - Сетка Gitter: 3D-панели, пруток 4мм или 5мм, полимерное покрытие.
        - Ворота: Откатные и распашные. Автоматика DoorHan, NICE, R-Tech.
        
        БИЗНЕС-ПРАВИЛА:
        - Работаем с НДС и без НДС.
        - Официальный договор, гарантия 24 месяца.
        - География: Ростовская обл, Воронежская обл, ЛНР, ДНР, Мариуполь.
        
        ЗАДАЧА: Отвечать профессионально и сдержанно. При вопросах о замере — направлять к форме заказа. 
        Телефон завода: +7 (959) 187-89-49.`,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ error: 'Ошибка связи с заводом' });
  }
}
