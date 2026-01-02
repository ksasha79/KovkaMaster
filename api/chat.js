
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

    // Важно: Эти данные должны совпадать с config.ts
    const factoryPhone = "+7 (959) 187-89-49";
    const managerPhone = "+7 (992) 059-52-53";

    const result = await ai.models.generateContent({ 
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `Вы — ведущий инженер-консультант ООО «Евро-Заборы». 
        Наш официальный сайт: евро-заборы.рф.
        
        МЫ — ЗАВОД. У нас промышленное производство полного цикла.
        ЛОКАЦИИ: Ростовская обл., Воронежская обл., ДНР (Донецк, Мариуполь), ЛНР (Луганск).
        
        КОНТАКТЫ ДЛЯ СВЯЗИ:
        - Основной телефон Завода: ${factoryPhone}
        - Прямой контакт Менеджера (TG/WA/Звонки): ${managerPhone}
        
        ТЕХНИЧЕСКИЕ ДАННЫЕ:
        - Евро-заборы: Бетон М350, стальное армирование (ГОСТ).
        - Зимний монтаж: Применяем спец-добавки в бетон до -15 градусов.
        
        ПОВЕДЕНИЕ: Если клиент хочет заказать расчет, вызвать замерщика или узнать точную цену — 
        1. Просите его заполнить форму внизу сайта.
        2. Либо предложите написать менеджеру в Telegram/WhatsApp по номеру ${managerPhone}.
        3. Будьте вежливы, используйте профессиональный инженерный сленг.`,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ error: 'Ошибка связи с заводом' });
  }
}
