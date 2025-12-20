
/**
 * Серверный обработчик для отправки заявок.
 * Поддерживает Telegram Bot API и консольное логирование для тестов.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { name, phone, length, message } = req.body;

  // Валидация входных данных
  if (!name || !phone) {
    return res.status(400).json({ error: 'Пожалуйста, заполните имя и телефон' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Формируем текст сообщения (Markdown)
  const text = `
🆕 *НОВАЯ ЗАЯВКА: ЗАМЕР*
──────────────────
👤 *Клиент:* ${name}
📞 *Телефон:* \`${phone}\`
📏 *Длина:* ${length || '—'} м.п.
💬 *Комментарий:* ${message || 'Без комментария'}
──────────────────
🌐 _Отправлено с сайта ООО ЕвроЗаборы_
  `.trim();

  // Если ключи не настроены, работаем в ДЕМО-режиме (для тестов пользователя)
  if (!token || !chatId) {
    console.log('--- DEMO MODE: ЗАЯВКА ПРИНЯТА ---');
    console.log('Данные:', { name, phone, length, message });
    console.log('---------------------------------');
    
    return res.status(200).json({ 
      success: true, 
      isDemo: true,
      message: 'Заявка имитирована (настройте TELEGRAM_BOT_TOKEN для реальной отправки)' 
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

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorData = await response.json();
      return res.status(500).json({ error: 'Ошибка Telegram API: ' + (errorData.description || 'Неизвестно') });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка сервера при отправке' });
  }
}
