
/**
 * Серверный обработчик для отправки заявок в Telegram.
 * Использует HTML разметку, так как она более устойчива к спецсимволам.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { name, phone, length, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Если ключи отсутствуют, выводим ошибку в консоль сервера
  if (!token || !chatId) {
    console.error("❌ ОШИБКА КОНФИГУРАЦИИ: Переменные TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не установлены.");
    return res.status(200).json({ 
      success: true, 
      isDemo: true, 
      warning: 'Ключи Telegram не настроены в окружении .env' 
    });
  }

  // Экранируем спецсимволы для HTML, чтобы сообщение не "ломалось"
  const safeName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeMessage = (message || 'Без комментария').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const htmlText = `
<b>🆕 НОВЫЙ ЗАКАЗ: ЗАМЕР</b>
──────────────────
<b>👤 Имя:</b> ${safeName}
<b>📞 Телефон:</b> <code>${phone}</code>
<b>📏 Длина:</b> ${length ? length + ' м.п.' : 'не указана'}
<b>💬 Коммент:</b> ${safeMessage}
──────────────────
🏭 <i>Система уведомлений "ЕвроЗаборы"</i>
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlText,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      return res.status(200).json({ success: true });
    } else {
      // Если Telegram вернул ошибку (например, бот не запущен или ID неверный)
      console.error("❌ Telegram API Error:", result);
      return res.status(500).json({ 
        error: 'Telegram API Error', 
        details: result.description || 'Unknown error' 
      });
    }
  } catch (error) {
    console.error("❌ Critical Server Error:", error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

