
import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Инженер завода приветствует вас. Я готов проконсультировать по техническим вопросам: армирование, марка бетона, сроки производства или стоимость забора под ключ.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await chatWithSupport(userMessage, messages);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Сбой связи. Пожалуйста, обратитесь напрямую в отдел продаж: +7 (959) 187-89-49.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[340px] md:w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-6 bg-metal-900 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-gold-500 rounded-2xl flex items-center justify-center font-black text-metal-900 text-2xl transform rotate-3 shadow-lg">E</div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-metal-900 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight">ЕвроЗаборы</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] text-gold-500 uppercase tracking-[0.2em] font-black">Инженер-технолог online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2.5 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-8 bg-gray-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-metal-900 text-white rounded-br-none' 
                  : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                }`}>
                  <div className={`text-[9px] font-black uppercase tracking-widest mb-1.5 opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.role === 'user' ? 'Заказчик' : 'Завод'}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-3xl border border-gray-100 flex items-center gap-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-4 items-center">
              <div className="flex-grow bg-gray-50 p-2 rounded-2xl border-2 border-transparent focus-within:border-gold-500/30 transition-all flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ваш технический вопрос..."
                  className="flex-grow bg-transparent border-none px-4 py-3 text-[13px] outline-none placeholder:text-gray-400 font-medium"
                />
              </div>
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gold-500 text-metal-900 w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-metal-900 hover:text-white transition-all disabled:opacity-20 shadow-xl shadow-gold-500/10 active:scale-90 flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9-7-9-7v14z" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[8px] text-gray-400 uppercase tracking-[0.2em] mt-4 font-bold">
              Factory Integrated Support System
            </p>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(197,160,89,0.3)] transition-all duration-700 transform hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-metal-900 text-white' : 'bg-gold-500 text-metal-900'
        }`}
      >
        {isOpen ? (
          <svg className="w-10 h-10 animate-in spin-in-90 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-10 h-10 animate-in zoom-in duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-4 border-gold-500 group-hover:animate-ping"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingBot;
