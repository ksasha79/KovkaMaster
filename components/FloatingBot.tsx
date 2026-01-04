
import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport, ChatMessage } from '../services/geminiService';
import { CONTACTS } from '../config';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Поздравляю с наступившим Новым 2026 годом! 🎄 Январь — лучшее время для планирования. Мы уже вышли с каникул и принимаем заказы на сезон 2026 по фиксированным ценам. Как я могу помочь вам с выбором забора или 3D-проектом сегодня?' }
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

    const userMessageText = inputValue;
    const newMessage: Message = { role: 'user', text: userMessageText };
    
    const chatHistory: ChatMessage[] = messages.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponseText = await chatWithSupport(userMessageText, chatHistory);
      setMessages(prev => [...prev, { role: 'bot', text: botResponseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Сбой связи. Пожалуйста, обратитесь к нашему менеджеру напрямую: ${CONTACTS.MANAGER_PHONE_DISPLAY}.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[calc(100vw-48px)] sm:w-[420px] h-[70vh] sm:h-[600px] bg-white rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-metal-900 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-xmas-red/20 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3 sm:gap-4 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-500 rounded-2xl flex items-center justify-center font-black text-metal-900 text-xl sm:text-2xl transform rotate-3 shadow-lg">E</div>
                <div className="absolute -top-1 -left-1 text-base sm:text-lg">🎅</div>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight">Евро-Заборы ❄️</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-[0.2em] font-black">Инженер-консультант</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-gray-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-4 py-3 sm:px-6 sm:py-4 rounded-3xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-metal-900 text-white rounded-br-none' 
                  : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                }`}>
                  <div className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest mb-1.5 opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.role === 'user' ? 'Заказчик' : 'Завод'}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-3xl border border-gray-100 flex items-center gap-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-xmas-red rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-xmas-red rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
            <div className="flex gap-2 sm:gap-4 items-center">
              <div className="flex-grow bg-gray-50 p-1.5 rounded-2xl border-2 border-transparent focus-within:border-xmas-red/20 transition-all flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Вопрос по замеру..."
                  className="flex-grow bg-transparent border-none px-3 py-2 sm:px-4 sm:py-3 text-[13px] text-metal-900 outline-none placeholder:text-gray-400 font-medium"
                />
              </div>
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-xmas-red text-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center hover:bg-metal-900 transition-all disabled:opacity-20 shadow-xl shadow-red-500/10 active:scale-90 flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9-7-9-7v14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-metal-900 text-white' : 'bg-xmas-red text-white'
        }`}
      >
        {isOpen ? (
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-3 -right-3 text-base sm:text-lg animate-bounce">🎁</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingBot;

