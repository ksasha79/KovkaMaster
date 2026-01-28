
const express = require('express');
const path = require('path');
const cors = require('cors');
const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Лог для проверки путей при запуске в виртуалке
const distPath = path.join(__dirname, 'dist');
console.log(`[Server] Serving static files from: ${distPath}`);

// Раздача статических файлов
app.use(express.static(distPath));

// API Chat Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!process.env.API_KEY) {
      console.error("[API] API_KEY missing in .env");
      return res.status(500).json({ error: 'API Key missing' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history ? [...history] : [];
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "Вы — ведущий инженер завода ООО «Евро-Заборы». Отвечайте технически грамотно и вежливо.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("[API] Gemini Error:", error);
    res.status(500).json({ error: 'Ошибка ИИ' });
  }
});

// API Контакты (Telegram)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, length, message } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram configuration missing' });
    }

    const text = `🚀 *Новая заявка с сайта*\n\n👤 Имя: ${name}\n📞 Тел: ${phone}\n📏 Длина: ${length || '-'}\n💬 Сообщение: ${message || '-'}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const tgResult = await tgRes.json();
    if (!tgResult.ok) throw new Error(tgResult.description);

    res.json({ success: true });
  } catch (error) {
    console.error("[API] TG Error:", error);
    res.status(500).json({ error: 'Ошибка отправки в Telegram' });
  }
});

// SPA Routing: все остальные запросы отдают index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[OK] Server running on http://localhost:${PORT}`);
});
