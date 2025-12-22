
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  try {
    const { message } = req.body;

    if (!process.env.API_KEY) {
      return res.status(500).json({ error: 'Конфигурация сервера не завершена' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `Вы — ведущий инженер-консультант ООО «ЕвроЗаборы — Завод Ограждений и Ворот». 
        МЫ — ЗАВОД. У нас промышленное производство, а не кустарная мастерская.
        ТЕХНИЧЕСКИЕ СТАНДАРТЫ: 
        - Бетон марки М350 (морозостойкость F200, водонепроницаемость W6).
        - Армирование: стальная рифленая арматура ВР-1.
        - Сварная сетка Gitter: прут 4мм и 5мм, двойное полимерное покрытие.
        - Ворота: только заводская порошковая покраска в камере.
        УСЛОВИЯ: 
        - Работаем строго по договору.
        - Цены с НДС и без.
        - Гарантия по паспорту изделия — 24 месяца.
        ГЕОГРАФИЯ: Ростовская, Воронежская области, ЛНР, ДНР (в т.ч. Мариуполь). Своя логистика (манипуляторы).
        ЗАДАЧА: Отвечать сухо, профессионально, по делу. При вопросах о замере — сразу направлять к форме заказа. 
        Телефон завода: +7 (959) 187-89-49.`,
      },
    });

    return res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ error: 'Ошибка связи с заводом' });
  }
}
