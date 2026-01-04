import React from 'react';
import { CONTACTS } from '../config';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center font-black text-black">E</div>
          <span className="font-bold text-xl tracking-tight uppercase">{CONTACTS.COMPANY_NAME}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors">Услуги</a>
          <a href="#portfolio" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors">Каталог</a>
          <a href="#about" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors">О заводе</a>
          <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors">Связаться</a>
        </nav>

        <a 
          href={`tel:+${CONTACTS.PHONE}`}
          className="px-6 py-2.5 bg-brand-gold text-black text-xs font-black uppercase tracking-widest rounded hover:bg-white transition-all"
        >
          {CONTACTS.PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
};

export default Header;
