
import React, { useState } from 'react';

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
                <span className="font-black text-xl tracking-tight text-white uppercase group-hover:text-gold-500 transition-colors leading-none">Евро-Заборы</span>
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
                  href="tel:+79591878949" 
                  className="text-[11px] font-black text-white hover:text-gold-500 transition-colors"
                >
                  Завод: +7 (959) 187-89-49
                </a>
                <a 
                  href="tel:+79920595253" 
                  className="text-[11px] font-black text-gold-500 hover:text-white transition-colors"
                >
                  Менеджер: +7 (992) 059-52-53
                </a>
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
              <a href="tel:+79591878949" className="block text-center bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                Завод: +7 (959) 187-89-49
              </a>
              <a href="tel:+79920595253" className="block text-center bg-gold-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                Менеджер: +7 (992) 059-52-53
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
