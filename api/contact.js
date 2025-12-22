
/**
 * Серверный обработчик для отправки заявок в Telegram.
 * Для работы нужно установить переменные окружения:
 * TELEGRAM_BOT_TOKEN - токен от @BotFather
 * TELEGRAM_CHAT_ID - ваш ID от @userinfobot
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { name, phone, length, message } = req.body;

  // Базовая проверка
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Формируем красивое сообщение для Telegram
  // Используем Markdown для оформления
  const text = `
🆕 *НОВЫЙ ЗАКАЗ: ЗАМЕР*
──────────────────
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
📏 *Длина участка:* ${length ? length + ' м.п.' : 'Не указана'}
💬 *Сообщение:* ${message || 'Клиент не оставил комментарий'}
──────────────────
🏭 _ООО "ЕвроЗаборы" - Система уведомлений_
  `.trim();

  // Если ключи не настроены (локальная разработка)
  if (!token || !chatId) {
    console.warn("⚠️ ВНИМАНИЕ: Telegram API ключи не найдены в process.env");
    console.log("Данные заказа:", { name, phone, length, message });
    
    return res.status(200).json({ 
      success: true, 
      isDemo: true,
      message: 'Режим разработки: заказ напечатан в консоль сервера.' 
    });
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Telegram API Error:", result);
      return res.status(500).json({ error: 'Ошибка Telegram API: ' + (result.description || 'Неизвестно') });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Ошибка сервера при отправке' });
  }
}

