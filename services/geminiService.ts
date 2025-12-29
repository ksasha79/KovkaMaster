
/**
 * Клиентский сервис теперь работает только через защищенные API-роуты.
 * Это скрывает API_KEY от конечного пользователя.
 */

export interface ChatMessage {
  role: string;
  parts: { text: string }[];
}

export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptDetails })
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return data.image || null;
  } catch (error) {
    console.error("Concept generation error:", error);
    return null;
  }
};

export const chatWithSupport = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.text || "Извините, я не смог получить ответ. Попробуйте позже.";
  } catch (error) {
    console.error("Chat support error:", error);
    return "Мастер сейчас на объекте. Пожалуйста, оставьте заявку в форме обратной связи или позвоните менеджеру: +7 (992) 059-52-53.";
  }
};

