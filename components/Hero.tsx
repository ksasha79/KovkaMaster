import React from 'react';
import { CONTACTS } from '../config.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-black">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-gold/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-brand-gold/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-brand-gold/20 mb-12 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">
            Собственное производство в Ростове, ДНР и ЛНР
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-10">
          СТРОИМ <br/> <span className="text-gold">НА ВЕКА</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl font-light mb-16 max-w-3xl mx-auto leading-relaxed">
          Профессиональное изготовление и монтаж систем ограждений любой сложности. 
          От армированного бетона до дизайнерских воротных систем.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#contact" className="btn-gold px-12 py-6 rounded-2xl text-[10px] shadow-2xl">
            Заказать бесплатный расчет
          </a>
          <a href="#portfolio" className="px-12 py-6 bg-white/5 border border-white/10 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all text-[10px] backdrop-blur-md">
            Смотреть каталог работ
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
