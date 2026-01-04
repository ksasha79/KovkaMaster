
import React from 'react';
import { CONTACTS } from '../config.ts';

const Header: React.FC = () => {
  const companyTitle = CONTACTS?.COMPANY_NAME ? CONTACTS.COMPANY_NAME.replace('ООО ', '') : 'Евро-Заборы';

  return (
    <header className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Лого и Бренд */}
        <div className="flex items-center gap-3 h-full">
          <div className="w-10 h-10 bg-gold-600 rounded-xl flex items-center justify-center font-black text-metal-900 text-xl shadow-lg flex-shrink-0">
            E
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter text-white">
              {companyTitle}<span className="text-gold-500">.</span>
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">
              Завод систем ограждений
            </span>
          </div>
        </div>

        {/* Навигация (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {['Услуги', 'Каталог', 'Цены', 'Контакты'].map((item, idx) => (
            <a 
              key={idx}
              href={`#${['services', 'portfolio', 'pricing', 'contact'][idx]}`}
              className="text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Контакты и Кнопка */}
        <div className="flex items-center gap-4 md:gap-6 h-full">
          <div className="hidden md:flex flex-col items-end">
            <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="text-sm font-black text-white hover:text-gold-500 transition-colors">
              {CONTACTS.MANAGER_PHONE_DISPLAY}
            </a>
            <span className="text-[8px] uppercase font-black text-gold-600 tracking-widest">Отдел продаж</span>
          </div>
          
          <a 
            href="#contact" 
            className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-metal-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            Замер бесплатно
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
