
import React from 'react';
import { CONTACTS } from '../config.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden flex items-center justify-center min-h-screen">
      {/* Background Video/Overlay */}
      <div className="absolute inset-0 z-0 bg-metal-900">
        <div className="absolute inset-0 bg-gradient-to-b from-metal-900/70 via-metal-900/40 to-metal-900 z-10"></div>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30 grayscale">
          <source src={CONTACTS.HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-20">
        {/* Акционный бейдж - возврат рабочего формата */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold-500/50 bg-gold-600/10 text-gold-500 text-[11px] font-black uppercase tracking-[0.2em] mb-10 backdrop-blur-md animate-bounce shadow-[0_0_30px_rgba(197,160,89,0.2)]">
          <span className="flex h-3 w-3 rounded-full bg-gold-500 animate-pulse"></span>
          ❄️ ЗИМНЯЯ ВЫГОДА: -15% НА МОНТАЖ ДО 28 ФЕВРАЛЯ
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-10 leading-[0.85] uppercase">
          КРЕПКИЕ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-white to-gold-600">ЗАБОРЫ</span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-2xl mb-14 leading-relaxed font-medium uppercase tracking-wide">
          Прямые поставки от завода {CONTACTS.COMPANY_NAME}. <br className="hidden md:block" />
          ГОСТовское армирование, честная марка бетона и монтаж "под ключ".
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#contact" className="w-full sm:w-auto px-12 py-6 bg-gold-600 text-metal-900 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(197,160,89,0.4)]">
            Хочу скидку 15%
          </a>
          <a href="#portfolio" className="w-full sm:w-auto px-12 py-6 glass text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all border border-white/10">
            Каталог работ
          </a>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-60">
           <div className="flex flex-col items-center gap-2">
             <span className="text-gold-500 text-xl font-black">ОТ ЗАВОДА</span>
             <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Без посредников</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <span className="text-gold-500 text-xl font-black">АРМИРОВАНИЕ</span>
             <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">По всей секции</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <span className="text-gold-500 text-xl font-black">ЛЮБОЙ ЦВЕТ</span>
             <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">И текстура</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <span className="text-gold-500 text-xl font-black">БЫСТРО</span>
             <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Монтаж за 1 день</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

