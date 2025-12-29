
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="lg:col-span-1">
            <span className="font-black text-2xl tracking-tighter text-white flex items-center mb-8">
              <span className="bg-gold-500 text-metal-900 px-2 mr-1 rounded-sm uppercase">E</span>
              ЕВРО-ЗАБОРЫ
            </span>
            <p className="text-xs leading-relaxed mb-8 uppercase tracking-widest">
              ЗАВОД СИСТЕМ ОГРАЖДЕНИЙ. <br/>
              ПРОМЫШЛЕННЫЙ МАСШТАБ.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Регионы присутствия</h3>
            <ul className="space-y-3 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">
              <li>Ростовская область</li>
              <li>ЛНР / ДНР (Мариуполь)</li>
              <li>Воронежская область</li>
              <li>Белгород / Курск</li>
              <li>Тамбов / Липецк</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Контакты</h3>
            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase font-black text-gray-700 block mb-1">Завод</span>
                <a href="tel:+79591878949" className="block text-xl font-black text-white hover:text-gold-500 transition-colors tracking-tighter">+7 (959) 187-89-49</a>
              </div>
              <div>
                <span className="text-[9px] uppercase font-black text-gray-700 block mb-1">Менеджер</span>
                <a href="tel:+79920595253" className="block text-xl font-black text-white hover:text-gold-500 transition-colors tracking-tighter">+7 (992) 059-52-53</a>
              </div>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-600 transition-colors text-[10px] font-black">TG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-600 transition-colors text-[10px] font-black">WA</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Юридически</h3>
            <p className="text-[9px] uppercase leading-loose font-bold tracking-widest text-gray-800">
              ООО «ЕВРО-ЗАБОРЫ» <br/>
              Завод Ограждений и Ворот. <br/>
              Все права защищены © {new Date().getFullYear()}
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
