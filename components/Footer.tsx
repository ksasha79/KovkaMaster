import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-metal-900 text-gray-400 py-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Mark */}
      <div className="absolute bottom-0 right-0 text-[150px] font-black text-white/[0.02] select-none leading-none pointer-events-none">
        EUROZABOR
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="lg:col-span-1">
            <span className="font-black text-2xl tracking-tighter text-gold-500 flex items-center mb-6">
              <span className="bg-gold-500 text-metal-900 px-2 mr-1 rounded-sm text-xl">E</span>
              ЕВРО<span className="text-white font-light">ЗАБОРЫ</span>
            </span>
            <p className="text-sm leading-relaxed mb-8">
              Завод металлоконструкций и бетонных ограждений. 
              Профессиональный подход к безопасности и эстетике вашего участка.
            </p>
            <div className="flex space-x-4">
               {['VK', 'TG', 'WA'].map(social => (
                 <a key={social} href="#" className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-gold-600 hover:text-white hover:border-gold-600 transition-all">
                   {social}
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Навигация</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#hero" className="hover:text-gold-500 transition-colors">Главная</a></li>
              <li><a href="#portfolio" className="hover:text-gold-500 transition-colors">Каталог моделей</a></li>
              <li><a href="#pricing" className="hover:text-gold-500 transition-colors">Цены на установку</a></li>
              <li><a href="#faq" className="hover:text-gold-500 transition-colors">Частые вопросы</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Контакты</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-gold-500">📞</span>
                <a href="tel:+79591878949" className="hover:text-white transition-colors text-lg font-bold">+7 (959) 187-89-49</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-500">📍</span>
                <span>Центральный офис: Ростов-на-Дону / Донецк / Луганск</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-500">✉️</span>
                <a href="mailto:evrozabory6@gmail.com" className="hover:text-white transition-colors">evrozabory6@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Юридическая информация</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-white font-bold uppercase mb-1">ООО «ЕвроЗаборы»</div>
                <div className="text-xs text-gray-500 leading-relaxed italic mb-4">
                  Работаем в соответствии с уставом организации. Гарантийные обязательства по договору закреплены юридически.
                </div>
              </div>
              <ul className="space-y-2 text-[11px] uppercase tracking-widest font-bold text-gray-500">
                <li>ИНН: 6164223344</li>
                <li>ОГРН: 1236100011223</li>
                <li>Производственный цех №1</li>
              </ul>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} ООО ЕвроЗаборы. Официальный сайт завода.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-gold-500 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Реквизиты компании</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
