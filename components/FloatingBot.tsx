import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport, ChatMessage } from '../services/geminiService.ts';

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Хо-хо-хо! Я новогодний помощник Евро-Заборов. С чем помочь в этот праздничный вечер?' }
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
    <div className="fixed bottom-10 right-10 z-[100]">
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[380px] h-[550px] winter-glass rounded-[2rem] flex flex-col shadow-2xl overflow-hidden animate-fade-up border-brand-gold/20">
          <div className="p-6 bg-gradient-to-r from-red-700 to-red-900 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎅</div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/90">Помощник Санты</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[8px] text-green-100 uppercase font-black">Снежит</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-winter-blue/90">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-brand-gold text-black rounded-tr-none font-bold' : 'bg-white/5 text-blue-100 rounded-tl-none border border-white/10'}`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-2">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          <div className="p-4 bg-winter-dark border-t border-white/10 flex gap-3">
            <input 
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-all text-white text-xs"
              placeholder="Спросить о новогодних скидках..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-red-700 text-white px-4 rounded-xl hover:bg-red-600 transition-all">
              ❄️
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-3xl shadow-[0_10px_40px_rgba(196,30,58,0.5)] hover:scale-110 transition-all active:scale-95 z-50 border-4 border-white/20"
      >
        <span className="relative z-10">🎁</span>
        <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
      </button>
    </div>
  );
};

export default FloatingBot;
