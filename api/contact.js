
/**
 * Обработчик заявок. 
 * Использует переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
 * 
 * ЧТОБЫ НАСТРОИТЬ БОТА НА ДРУГОЙ ТЕЛЕФОН (АККАУНТ):
 * 1. Откройте Telegram и найдите бота @userinfobot или @myidbot.
 * 2. Напишите ему со своего НОВОГО аккаунта — он выдаст вам числовой ID (например: 12345678).
 * 3. В панели управления вашим хостингом/сервером обновите переменную TELEGRAM_CHAT_ID, 
 *    установив в неё этот новый ID.
 * 4. Все заявки начнут приходить на новый аккаунт.
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

  if (!token || !chatId) {
    console.error("❌ Критическая ошибка: Переменные окружения Telegram не настроены.");
    return res.status(500).json({ 
      error: 'Ошибка конфигурации сервера. Уведомления не настроены.' 
    });
  }

  const safeName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeMessage = (message || 'Без комментария').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const htmlText = `
<b>❄️ НОВЫЙ ЗАКАЗ</b>
──────────────────
<b>👤 Клиент:</b> ${safeName}
<b>📞 Тел:</b> <code>${phone}</code>
<b>📏 Длина:</b> ${length ? length + ' м.п.' : 'не указана'}
<b>💬 Коммент:</b> ${safeMessage}
──────────────────
🏭 <i>Система уведомлений евро-заборы.рф</i>
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
      console.error("❌ Telegram API Error:", result);
      return res.status(502).json({ error: 'Ошибка Telegram API' });
    }
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
