
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558442086-8ea19a79cd4d?q=80&w=2000&auto=format&fit=crop" 
          alt="Завод Евро-Заборы" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-transparent to-metal-900"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center lg:text-left">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse"></span>
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">ООО «Евро-Заборы» — Завод Ограждений</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter mb-10 uppercase leading-[0.85]">
            ПРОМЫШЛЕННОЕ <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-white">ПРОИЗВОДСТВО</span> <br/>
            СИСТЕМ
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-14 leading-relaxed font-light mx-auto lg:mx-0">
            Собственный завод в Ростове. Поставки и монтаж в <span className="text-white font-bold">ЛНР, ДНР, Воронеже</span> и Черноземье. 
            Качество по ГОСТ, работа с НДС, официальный договор.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <a 
              href="#contact" 
              className="px-12 py-6 bg-gold-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-metal-900 transition-all shadow-2xl active:scale-95 text-center"
            >
              Заказать расчет
            </a>
            <a 
              href="#portfolio" 
              className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white/5 transition-all text-center"
            >
              Каталог изделий
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-12 hidden lg:block">
        <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">
          FACTORY STANDARD • SINCE 2008
        </div>
      </div>
    </section>
  );
};

export default Hero;
