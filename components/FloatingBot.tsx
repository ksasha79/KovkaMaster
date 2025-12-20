import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Здравствуйте! Я Макс, ваш помощник в ООО "ЕвроЗаборы". Какой проект вас интересует?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    const botResponse = await chatWithSupport(userMessage, []);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || 'Произошла ошибка, попробуйте позже.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-metal-900 border border-gold-600/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 bg-metal-800 border-b border-gold-600/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-600 rounded-full flex items-center justify-center font-black text-white">M</div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Ассистент Макс</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Онлайн</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold-600">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-gold-600 text-white rounded-tr-none' 
                  : 'bg-metal-800 text-gray-200 rounded-tl-none border border-gray-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-metal-800 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-700 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-metal-800 border-t border-gold-600/20">
            <div className="relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ваш вопрос..."
                className="w-full bg-metal-900 border border-gray-700 text-white text-sm rounded-xl py-4 pl-4 pr-12 outline-none focus:border-gold-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold-600 text-white rounded-lg flex items-center justify-center hover:bg-gold-500 transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[9px] text-gray-500 mt-2 text-center uppercase font-bold tracking-widest">ИИ Макс может ошибаться, уточняйте детали у менеджера</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group ${
          isOpen ? 'bg-metal-900 border border-gold-600 rotate-90' : 'bg-gold-600 text-white'
        }`}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
             <span className="font-black text-2xl tracking-tighter">M</span>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gold-600 rounded-full"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingBot;
