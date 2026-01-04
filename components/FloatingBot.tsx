import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport, ChatMessage } from '../services/geminiService';

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Здравствуйте! Я ИИ-инженер ООО «Евро-Заборы». Готов рассчитать стоимость или проконсультировать по материалам. Какой проект вас интересует?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

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
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] glass-card rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          <div className="p-6 bg-brand-gold text-black flex justify-between items-center">
            <span className="font-black uppercase text-xs tracking-widest">Инженер-Консультант (ИИ)</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-xl text-sm ${m.role === 'user' ? 'bg-brand-gold text-black' : 'bg-brand-grey text-gray-300'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-500 animate-pulse">Думаю над ответом...</div>}
          </div>

          <div className="p-6 border-t border-white/5 flex gap-2">
            <input 
              className="flex-grow bg-transparent border-none outline-none text-sm"
              placeholder="Спросить про бетон М350..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="text-brand-gold">➜</button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-black text-2xl shadow-2xl hover:scale-110 transition-transform"
      >
        {isOpen ? '✕' : '🏗️'}
      </button>
    </div>
  );
};

export default FloatingBot;
