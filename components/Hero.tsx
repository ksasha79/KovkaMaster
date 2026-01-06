import React from 'react';
import { CONTACTS } from '../config.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 overflow-hidden bg-brand-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-gold/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-gold/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-gold/20 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold">
            Заводское производство • 2026
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[1.1] tracking-tighter mb-8">
          СТРОИМ <span className="text-gold">НА ВЕКА</span> <br/>
          <span className="text-white text-2xl sm:text-4xl md:text-7xl block mt-2">{CONTACTS.COMPANY_NAME}</span>
        </h1>
        
        <p className="text-gray-400 text-sm sm:text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          Профессиональное изготовление и монтаж систем ограждений. 
          Собственное производство ЖБИ и металлоконструкций.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <a href="#contact" className="btn-gold px-10 py-4 rounded-xl text-sm shadow-xl active:scale-95 transition-transform">
            Заказать расчет
          </a>
          <a href="#portfolio" className="px-10 py-4 bg-white/5 border border-white/10 font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all text-[10px] backdrop-blur-sm active:scale-95">
            Смотреть работы
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
