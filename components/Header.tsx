import React from 'react';
import { CONTACTS } from '../config.ts';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full z-50 bg-winter-dark/40 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-yellow-600 rounded-xl flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            EZ
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tighter uppercase text-white">
              ЕВРО-ЗАБОРЫ
            </span>
            <span className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.2em]">
              Зимняя коллекция 2026
            </span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          <a href="#services" className="text-[10px] font-black uppercase tracking-widest text-blue-100/60 hover:text-brand-gold transition-colors">Сервисы</a>
          <a href="#portfolio" className="text-[10px] font-black uppercase tracking-widest text-blue-100/60 hover:text-brand-gold transition-colors">Галерея</a>
          <a href="#about" className="text-[10px] font-black uppercase tracking-widest text-blue-100/60 hover:text-brand-gold transition-colors">О нас</a>
          <a href="#contact" className="text-[10px] font-black uppercase tracking-widest text-blue-100/60 hover:text-brand-gold transition-colors">Контакты</a>
        </nav>

        <a 
          href="#contact"
          className="px-6 py-3 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
        >
          Замер бесплатно!
        </a>
      </div>
    </header>
  );
};

export default Header;
