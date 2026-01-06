import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport, ChatMessage } from '../services/geminiService.ts';

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Здравствуйте! Я инженер-консультант ООО «Евро-Заборы». Помогу с расчетом или выбором конструкции. Что вас интересует?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history: ChatMessage[] = messages.map(m => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const response = await chatWithSupport(userMsg, history);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] md:w-[400px] h-[70vh] md:h-[550px] glass-card rounded-2xl flex flex-col overflow-hidden border-brand-gold/30 shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="p-4 md:p-6 bg-brand-gold text-black flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-brand-gold font-bold text-xs">EZ</div>
               <span className="font-black uppercase text-[10px] tracking-widest">Консультация ИИ</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-brand-dark">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 md:p-4 rounded-xl text-sm ${m.role === 'user' ? 'bg-brand-gold text-black font-semibold' : 'bg-brand-grey text-gray-300 border border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-3 bg-brand-grey/50 rounded-xl w-fit">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          <div className="p-4 md:p-6 border-t border-white/5 flex gap-2 bg-brand-dark shrink-0">
            <input 
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold text-sm text-white"
              placeholder="Задать вопрос..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-brand-gold text-black w-10 h-10 rounded-xl flex items-center justify-center hover:scale-105 transition-transform shrink-0 font-bold">➜</button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-brand-gold rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform border-4 border-black"
        aria-label="Открыть чат"
      >
        <span className="text-xl md:text-2xl font-bold">{isOpen ? '✕' : '⚙️'}</span>
      </button>
    </div>
  );
};

export default FloatingBot;
