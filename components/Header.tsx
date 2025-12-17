import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Главная', href: '#hero' },
    { name: 'Услуги', href: '#services' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Регионы', href: '#about' },
    { name: 'Вопросы', href: '#faq' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-metal-900/95 text-white backdrop-blur-sm border-b border-gold-600/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-black text-2xl tracking-tighter text-gold-500 flex items-center">
              <span className="bg-gold-500 text-metal-900 px-2 mr-1 rounded-sm text-xl">E</span>
              ЕВРО<span className="text-white font-light">ЗАБОРЫ</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-gold-500 transition-colors px-2 py-2 rounded-md text-xs font-bold uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:+79000000000" 
                className="ml-4 bg-gold-600 hover:bg-gold-500 text-white px-5 py-2.5 rounded-sm text-sm font-black shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                +7 (900) 000-00-00
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gold-500 hover:text-white transition-colors"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-metal-900 border-t border-gray-800">
          <div className="px-2 pt-4 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-gold-500 block px-4 py-3 border-b border-gray-800/50 text-base font-bold uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 py-4">
               <a href="tel:+79000000000" className="block text-center bg-gold-600 text-white py-4 rounded font-bold">
                 Позвонить мастеру
               </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
