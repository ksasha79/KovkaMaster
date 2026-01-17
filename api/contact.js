
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

  try {
    const { name, phone, length, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Уведомления не настроены' });
    }

    const clean = (str) => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const htmlText = `
<b>🏗 НОВАЯ ЗАЯВКА: ЕВРО-ЗАБОРЫ</b>
──────────────────
<b>👤 Клиент:</b> ${clean(name)}
<b>📞 Тел:</b> <code>${clean(phone)}</code>
<b>📏 Длина:</b> ${length ? length + ' м.п.' : 'не указана'}
<b>💬 Коммент:</b> ${clean(message || 'Без комментария')}
──────────────────
🏭 <i>Система уведомлений завода евро-заборы.рф (Регион: Воронеж/М-4)</i>
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlText,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}
