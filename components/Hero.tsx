
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop" 
          alt="Зимний завод" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-transparent to-metal-900"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center lg:text-left">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-xmas-red animate-pulse"></span>
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">❄️ ЗИМНЯЯ АКЦИЯ: ЗАМЕР + ПОДАРОК ❄️</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter mb-10 uppercase leading-[0.85]">
            НОВОГОДНИЕ <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-white">СКИДКИ НА</span> <br/>
            ЗАБОРЫ
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-14 leading-relaxed font-light mx-auto lg:mx-0">
            Зафиксируйте прошлогоднюю цену до <span className="text-white font-bold">15 января</span>. Заводское качество, 
            монтаж в зимний период по спец-технологии. Ростов, ЛНР, ДНР и Воронеж.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <a 
              href="#contact" 
              className="px-12 py-6 bg-xmas-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-metal-900 transition-all shadow-2xl active:scale-95 text-center"
            >
              Забрать скидку 🎁
            </a>
            <a 
              href="#portfolio" 
              className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white/5 transition-all text-center"
            >
              Каталог 2024
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-12 hidden lg:block">
        <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">
          HAPPY NEW YEAR • FACTORY SALE
        </div>
      </div>
    </section>
  );
};

export default Hero;
