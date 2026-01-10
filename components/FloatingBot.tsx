import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport, ChatMessage, generateGateConcept } from '../services/geminiService.ts';
import { CONTACTS } from '../config.ts';

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string, image?: string}[]>([
    { role: 'bot', text: `Приветствуем! На связи ведущий инженер ${CONTACTS.COMPANY_NAME}. Готов проконсультировать вас по техническим характеристикам, замеру и расчету стоимости.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async (forcedText?: string) => {
    const userMsg = forcedText || input;
    if (!userMsg.trim() || isLoading) return;
    
    if (!forcedText) setInput('');
    
    // Создаем копию текущей истории ПЕРЕД добавлением нового сообщения
    // Gemini API ожидает историю ДО текущего сообщения в параметре contents
    const currentHistory: ChatMessage[] = messages
      .filter(m => m.role !== 'bot' || messages.indexOf(m) !== 0) // Исключаем только самое первое приветствие
      .map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Специальная команда для генерации OG-Image
    if (userMsg.toLowerCase().includes('og-image') || userMsg.toLowerCase().includes('обложк')) {
      const img = await generateGateConcept("Cinematic architectural wide shot of modern fences and gates, luxury design, brand style 'Euro-Zabory', golden sunset lighting, 1200x630 professional photography");
      if (img) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: 'Я подготовил для вас вариант обложки (OG-Image). Вы можете скачать её, переименовать в "og-image.jpg" и разместить в корневом каталоге сайта для корректного отображения в соцсетях.',
          image: img 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: 'К сожалению, генерация изображения временно недоступна. Попробуйте еще раз позже.' }]);
      }
      setIsLoading(false);
      return;
    }

    try {
      const response = await chatWithSupport(userMsg, currentHistory);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Произошла ошибка при получении ответа. Пожалуйста, попробуйте позже." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[calc(100vw-3rem)] md:w-[420px] h-[650px] glass-card rounded-[3rem] flex flex-col shadow-2xl overflow-hidden border border-brand-gold/30 animate-fade-in bg-brand-black">
          <div className="p-8 bg-brand-gold text-black flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center font-black text-brand-gold text-sm shadow-xl">EZ</div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 leading-none">Техническая поддержка</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                  <span className="text-[9px] uppercase font-black opacity-60">Инженер на линии</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black/40 hover:text-black transition-colors p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-brand-gold text-black rounded-tr-none font-bold' : 'bg-brand-grey text-gray-300 rounded-tl-none border border-white/5'}`}>
                  {m.text}
                </div>
                {m.image && (
                  <div className="mt-4 max-w-[85%] rounded-2xl overflow-hidden border border-brand-gold/30 shadow-xl bg-brand-grey">
                    <img src={m.image} alt="OG Image Concept" className="w-full h-auto" />
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = m.image!;
                        link.download = 'og-image.jpg';
                        link.click();
                      }}
                      className="w-full bg-brand-gold text-black text-[10px] font-black py-4 uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>💾</span> Скачать OG-Image
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-3 bg-brand-grey/50 rounded-xl w-fit">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          <div className="p-7 bg-brand-black border-t border-white/5 flex flex-col gap-4">
            <div className="flex gap-4">
              <input 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-all text-white text-xs"
                placeholder="Задайте вопрос инженеру..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button onClick={() => handleSend()} className="bg-brand-gold text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg font-black text-2xl">
                ➜
              </button>
            </div>
            <button 
              onClick={() => handleSend("Сгенерируй og-image обложку для моего сайта")}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold/40 hover:text-brand-gold transition-colors text-center py-1"
            >
              ✨ Сгенерировать обложку сайта (OG-Image)
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-black shadow-[0_15px_50px_rgba(212,175,55,0.4)] hover:scale-110 transition-all border-4 border-brand-black"
        aria-label="Задать вопрос инженеру"
      >
        <span className="text-2xl font-black">{isOpen ? '✕' : '💬'}</span>
      </button>
    </div>
  );
};

export default FloatingBot;
