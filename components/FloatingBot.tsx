import React from 'react';

const FloatingBot: React.FC = () => {
  return (
    <div className="fixed bottom-24 right-6 z-50 group">
      <div className="absolute -top-12 right-0 bg-white text-metal-900 px-3 py-1 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold-500">
        Чат-бот Max (скоро)
      </div>
      <button 
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl text-white transform hover:rotate-12 transition-all hover:scale-110 relative"
        title="Мессенджер Max"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-20"></div>
        <span className="font-black text-xl tracking-tighter">M</span>
      </button>
    </div>
  );
};

export default FloatingBot;