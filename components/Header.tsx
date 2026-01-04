
import React from 'react';
import { CONTACTS } from '../config.ts';

const Header: React.FC = () => {
  const companyTitle = CONTACTS?.COMPANY_NAME ? CONTACTS.COMPANY_NAME.replace('ООО ', '') : 'Евро-Заборы';

  return (
    <header className="fixed w-full z-50 glass border-b border-gold-500/20 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* Логотип и слоган */}
        <div className="flex items-center gap-4 group cursor-pointer h-full">
          <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-2xl flex items-center justify-center font-black text-metal-900 text-2xl shadow-lg shadow-gold-600/30 transform group-hover:rotate-6 transition-transform flex-shrink-0">
            E
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white leading-none">
              {companyTitle}<span className="text-gold-500">.</span>
            </h1>
            <span className="text-[10px] text-gold-500/80 font-bold uppercase tracking-[0.15em] mt-1 hidden sm:block">
              {CONTACTS.SLOGAN || 'Завод систем ограждений'}
            </span>
          </div>
        </div>

        {/* Навигация */}
        <nav className="hidden lg:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest text-gray-300 h-full">
          <a href="#services" className="hover:text-gold-500 transition-all relative group py-1">
            Услуги
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#portfolio" className="hover:text-gold-500 transition-all relative group py-1">
            Каталог
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#pricing" className="hover:text-gold-500 transition-all relative group py-1">
            Цены
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-gold-500 transition-all relative group py-1">
            Контакты
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
          </a>
        </nav>

        {/* Контакты и кнопка */}
        <div className="flex items-center gap-4 md:gap-8 h-full">
          <div className="hidden md:flex flex-col items-end">
            <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="text-base font-black text-white hover:text-gold-500 transition-colors tracking-tight">
              {CONTACTS.MANAGER_PHONE_DISPLAY}
            </a>
            <span className="text-[8px] uppercase font-black text-gray-500 tracking-widest">Менеджер на связи</span>
          </div>
          
          <a href="#contact" className="relative group px-6 py-4 bg-gold-600 hover:bg-gold-500 text-metal-900 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-gold-600/20 active:scale-95 overflow-hidden flex-shrink-0">
            <span className="relative z-10">Замер бесплатно</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
          </a>
        </div>
        
      </div>
    </header>
  );
};

export default Header;

