
import React, { useState } from 'react';
import { CONTACTS } from '../config';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Проекты', href: '#portfolio' },
    { name: 'Услуги', href: '#services' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-metal-900/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <a href="#hero" className="flex items-center gap-3 group">
              <span className="bg-gold-500 text-metal-900 w-10 h-10 flex items-center justify-center rounded-lg text-2xl font-black transition-transform group-hover:scale-110 relative">
                E
                <span className="absolute -top-2 -right-2 text-sm">🎄</span>
              </span>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white uppercase group-hover:text-gold-500 transition-colors leading-none">{CONTACTS.COMPANY_NAME}</span>
                <span className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mt-1">Завод Ограждений</span>
              </div>
            </a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-8 mr-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end mr-2">
                <a 
                  href={`tel:+${CONTACTS.FACTORY_PHONE}`} 
                  className="text-[11px] font-black text-white hover:text-gold-500 transition-colors"
                >
                  Завод: {CONTACTS.FACTORY_PHONE_DISPLAY}
                </a>
                <div className="flex items-center gap-2">
                  <a href={`https://t.me/${CONTACTS.TELEGRAM_USER}`} target="_blank" className="text-gold-600 hover:text-white transition-colors">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 15.581c-.171.496-.472.946-.87 1.287-.762.656-1.804.714-2.507.352-.506-.247-1.173-.751-1.854-1.271-.772-.561-1.583-1.154-2.316-1.597-.456-.275-.845-.487-1.159-.627-.662-.296-1.159-.444-1.159-.444s.434-.178 1.133-.462c.309-.125.7-.281 1.153-.463.719-.289 1.511-.611 2.247-.941.745-.333 1.488-.667 2.107-.945.836-.375 1.742-.648 2.399-.186.35.247.632.551.815.894.241.455.362.919.362 1.383.001.742-.167 1.487-.351 2.02z"/></svg>
                  </a>
                  <a 
                    href={`tel:+${CONTACTS.MANAGER_PHONE}`} 
                    className="text-[11px] font-black text-gold-500 hover:text-white transition-colors"
                  >
                    Менеджер: {CONTACTS.MANAGER_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-xmas-red text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-metal-900 transition-all active:scale-95 shadow-lg shadow-red-600/20"
              >
                Получить подарок 🎁
              </a>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2}/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-metal-900 border-t border-white/5 p-6 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-4 text-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block py-4 text-xl font-black uppercase tracking-widest text-white border-b border-white/5">{link.name}</a>
            ))}
            <div className="grid gap-3 pt-4">
              <a href={`tel:+${CONTACTS.FACTORY_PHONE}`} className="block text-center bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                Завод: {CONTACTS.FACTORY_PHONE_DISPLAY}
              </a>
              <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="block text-center bg-gold-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                Менеджер: {CONTACTS.MANAGER_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

