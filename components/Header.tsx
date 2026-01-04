
import React from 'react';
import { CONTACTS } from '../config.ts';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full z-50 glass border-b border-gold-500/20 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* Логотип и слоган */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-2xl flex items-center justify-center font-black text-metal-900 text-2xl shadow-lg shadow-gold-600/30 transform group-hover:rotate-6 transition-transform">
            E
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white leading-none">
              {CONTACTS.COMPANY_NAME.replace('ООО ', '')}<span className="text-gold-500">.</span>
            </h1>
            <span className="text-[11px] text-gold-500/80 font-bold uppercase tracking-[0.15em] mt-1.5 hidden sm:block">
              {CONTACTS.SLOGAN}
            </span>
          </div>
        </div>

        {/* Навигация */}
        <nav className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-gray-300">
          <a href="#services" className="hover:text-gold-500 transition-all relative group py-2">
            Услуги
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#portfolio" className="hover:text-gold-500 transition-all relative group py-2">
            Каталог
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#pricing" className="hover:text-gold-500 transition-all relative group py-2">
            Цены
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-gold-500 transition-all relative group py-2">
            Контакты
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
        </nav>

        {/* Контакты и кнопка */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="text-lg font-black text-white hover:text-gold-500 transition-colors tracking-tight">
              {CONTACTS.MANAGER_PHONE_DISPLAY}
            </a>
            <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest">Менеджер на связи</span>
          </div>
          
          <a href="#contact" className="relative group px-8 py-4 bg-gold-600 hover:bg-gold-500 text-metal-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-gold-600/20 active:scale-95 overflow-hidden">
            <span className="relative z-10">Замер бесплатно</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
          </a>
        </div>
        
      </div>
    </header>
  );
};

export default Header;

