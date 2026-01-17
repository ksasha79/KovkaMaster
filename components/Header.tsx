
import React from 'react';
import { CONTACTS } from '../config.ts';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full z-50 bg-brand-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-gold/60 rounded-xl flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            EZ
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tighter uppercase text-white">
              {CONTACTS.BRAND_NAME}
            </span>
            <span className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.2em]">
              Завод систем ограждений
            </span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          <a href="#services" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-brand-gold transition-colors">Услуги</a>
          <a href="#portfolio" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-brand-gold transition-colors">Портфолио</a>
          <a href="#about" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-brand-gold transition-colors">О заводе</a>
          <a href="#contact" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-brand-gold transition-colors">Контакты</a>
        </nav>

        <a 
          href="#contact"
          className="px-6 py-3 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg shadow-brand-gold/20"
        >
          Замер бесплатно
        </a>
      </div>
    </header>
  );
};

export default Header;
