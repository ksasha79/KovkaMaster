/**
 * Серверный обработчик для отправки заявок.
 * Поддерживает Telegram Bot API.
 */
export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Метод ${req.method} не разрешен` });
  }

  try {
    const { name, phone, length, message } = req.body;

    // Валидация входных данных
    if (!name || !phone) {
      return res.status(400).json({ error: 'Пожалуйста, укажите имя и номер телефона' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Если ключи не настроены
    if (!token || !chatId) {
      console.warn('⚠️ ОШИБКА: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены в переменных окружения.');
      return res.status(500).json({ 
        error: 'Сервер не настроен для отправки сообщений. Пожалуйста, свяжитесь с администратором.',
        debug: 'Missing environment variables'
      });
    }

    // Формируем текст сообщения
    const telegramMessage = `
🆕 *НОВАЯ ЗАЯВКА: ООО ЕВРО-ЗАБОРЫ*
──────────────────
👤 *Клиент:* ${name}
📞 *Телефон:* \`${phone}\`
📏 *Длина:* ${length || '—'} м.п.
💬 *Вопрос:* ${message || 'Без комментария'}
──────────────────
🌐 _Источник: евро-заборы.рф_
    `.trim();

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Telegram API Error:', data);
      return res.status(500).json({ 
        error: 'Ошибка при отправке сообщения в Telegram',
        details: data.description 
      });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}