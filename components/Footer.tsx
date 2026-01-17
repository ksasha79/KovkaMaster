
import React from 'react';
import { CONTACTS } from '../config.ts';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {CONTACTS.COMPANY_NAME}. Все права защищены.
          </div>
          <div className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
            Заводской номер: 82.11.0.12-2024
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white transition-colors">Оферта</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

