
import React, { useState } from 'react';
import { CONTACTS } from '../config';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: '3D Проекты', href: '#portfolio' },
    { name: 'Услуги', href: '#services' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-metal-900/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex-shrink-0">
            <a href="#hero" className="flex items-center gap-3 group">
              <span className="bg-gold-500 text-metal-900 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg text-2xl md:text-3xl font-black transition-transform group-hover:rotate-12 shadow-lg">
                E
              </span>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-2xl tracking-tighter text-white uppercase group-hover:text-gold-500 transition-colors leading-none">{CONTACTS.COMPANY_NAME}</span>
                <span className="text-[7px] md:text-[9px] text-gold-600 font-black uppercase tracking-[0.3em] mt-1 hidden sm:block">{CONTACTS.SLOGAN}</span>
              </div>
            </a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-6 pl-6 border-l border-white/10">
              <div className="flex flex-col items-end">
                <a 
                  href={`tel:+${CONTACTS.MANAGER_PHONE}`} 
                  className="text-sm font-black text-white hover:text-gold-500 transition-colors"
                >
                  {CONTACTS.MANAGER_PHONE_DISPLAY}
                </a>
              </div>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-xmas-red text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-metal-900 transition-all"
              >
                Замер 0 ₽
              </a>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="p-2 text-gold-500">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth={2}/></svg>
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5}/> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2.5}/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-metal-900/98 backdrop-blur-xl z-[100] animate-in fade-in slide-in-from-top-5">
          <div className="flex flex-col h-full p-8 gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-3xl font-black uppercase tracking-widest text-white border-b border-white/5 pb-4"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-auto pb-12 flex flex-col gap-4">
              <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="bg-gold-600 text-white py-6 rounded-2xl text-center text-xl font-black uppercase tracking-widest shadow-xl">
                Позвонить
              </a>
              <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-black">
                {CONTACTS.COMPANY_NAME} • ЗАВОД 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


