
import React from 'react';
import { CONTACTS } from '../config.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-brand-black">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-gold/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/30 bg-white/5 backdrop-blur-md mb-8 animate-fade-in">
          <span className="text-brand-gold">🏗️</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            Завод систем ограждений в Воронеже
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
          КАПИТАЛЬНЫЕ <br/> <span className="text-gold">ЗАБОРЫ</span> <br/>
          <span className="text-3xl md:text-5xl font-light tracking-widest text-white/80">для Черноземья</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          Профессиональное производство и монтаж еврозаборов в Воронеже, Липецке и Белгороде. 
          Адаптивная технология установки на сложных грунтах.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#calc" className="btn-gold px-12 py-6 text-xs rounded-2xl w-full sm:w-auto">
             Бесплатный расчет 📐
          </a>
          <a href="#portfolio" className="px-12 py-6 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-[10px] w-full sm:w-auto">
             Наши работы 🏭
          </a>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale">
           <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black">M500</span>
              <span className="text-[8px] uppercase tracking-widest">Бетон</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black">М-4</span>
              <span className="text-[8px] uppercase tracking-widest">Логистика</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black">24/7</span>
              <span className="text-[8px] uppercase tracking-widest">Поддержка</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
