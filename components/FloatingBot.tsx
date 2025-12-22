
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
    // Gemini ожидает массив объектов с role ('user' или 'model') и parts
    let contents = [];
    
    if (history && Array.isArray(history)) {
      contents = [...history];
    }
    
    // Добавляем текущее сообщение пользователя, если оно еще не в истории
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
        
        ТЕХНИЧЕСКИЕ ДАННЫЕ ДЛЯ КОНСУЛЬТАЦИИ:
        - Еврозаборы: Бетон М350, армирование стальной сеткой ВР-1 (диаметр 4мм). Высота секции 0.5м, стандартный забор 2м (4 секции).
        - Сетка Gitter: 3D-панели, пруток 4мм или 5мм, оцинковка + полимерное покрытие (RAL 6005, 7016, 8017).
        - Ворота: Откатные и распашные. Используем только усиленную балку. Автоматика DoorHan, NICE, R-Tech.
        
        БИЗНЕС-ПРАВИЛА:
        - Работаем с НДС (для юрлиц) и без НДС.
        - Официальный договор, гарантия по паспорту изделия — 24 месяца.
        - Замер бесплатный при условии заключения договора.
        - География: Ростов-на-Дону и область, Воронеж, Луганск (ЛНР), Донецк (ДНР), Мариуполь.
        
        СТИЛЬ ОБЩЕНИЯ:
        Профессиональный, технически грамотный, сдержанный. Не используй лишних эпитетов. 
        Если клиент спрашивает цену, дай ориентир из прайса (от 2500 до 7500 руб за м.п.) и предложи замер для точного расчета.
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
