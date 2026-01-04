
import React from 'react';
import { CONTACTS } from '../config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="lg:col-span-1">
            <span className="font-black text-2xl tracking-tighter text-white flex items-center mb-8">
              <span className="bg-gold-500 text-metal-900 px-2 mr-1 rounded-sm uppercase">E</span>
              {CONTACTS.COMPANY_NAME.toUpperCase()}
            </span>
            <p className="text-xs leading-relaxed mb-8 uppercase tracking-widest">
              ПРОИЗВОДСТВО СИСТЕМ ОГРАЖДЕНИЙ. <br/>
              ИНДУСТРИАЛЬНЫЙ ПОДХОД.
            </p>
            <div className="mt-4 text-[9px] text-gray-800 uppercase tracking-tighter">
              Ключевые слова: еврозаборы, бетонные заборы, установка ворот, навесы для авто в Ростове, Донецке и Луганске.
            </div>
          </div>

          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Регионы монтажа</h3>
            <ul className="space-y-3 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">
              <li>Ростов-на-Дону и область</li>
              <li>ДНР (Донецк, Мариуполь, Макеевка)</li>
              <li>ЛНР (Луганск, Алчевск)</li>
              <li>Воронеж и область</li>
              <li>Белгород, Курск, Липецк</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Контакты</h3>
            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase font-black text-gray-700 block mb-1">Завод</span>
                <a href={`tel:+${CONTACTS.FACTORY_PHONE}`} className="block text-xl font-black text-white hover:text-gold-500 transition-colors tracking-tighter">{CONTACTS.FACTORY_PHONE_DISPLAY}</a>
              </div>
              <div>
                <span className="text-[9px] uppercase font-black text-gray-700 block mb-1">Менеджер</span>
                <a href={`tel:+${CONTACTS.MANAGER_PHONE}`} className="block text-xl font-black text-white hover:text-gold-500 transition-colors tracking-tighter">{CONTACTS.MANAGER_PHONE_DISPLAY}</a>
              </div>
              <div className="flex gap-4">
                <a 
                  href={`https://t.me/${CONTACTS.TELEGRAM_USER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-600 transition-colors text-[10px] font-black"
                >
                  TG
                </a>
                <a 
                  href={`https://wa.me/${CONTACTS.WHATSAPP_LINK}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-600 transition-colors text-[10px] font-black"
                >
                  WA
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Юридически</h3>
            <p className="text-[9px] uppercase leading-loose font-bold tracking-widest text-gray-800">
              {CONTACTS.COMPANY_NAME} <br/>
              Завод Ограждений и Ворот. <br/>
              Все права защищены © {new Date().getFullYear()} <br/>
              Официальный сайт: {CONTACTS.WEBSITE_URL}
            </p>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gray-900">
            INDUSTRIAL PROTECTION • SOUTH-CENTER CLUSTER
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

