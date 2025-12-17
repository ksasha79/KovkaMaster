import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-metal-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ЕВРОЗАБОРЫ</h3>
            <p className="text-sm leading-relaxed">
              Изготовление и монтаж ЕвроЗаборов, ворот и ограждений любой сложности. 
              Качественно, надежно, в срок. Более 15 лет опыта.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li>Тел: +7 (900) 000-00-00</li>
              <li>Email: info@eurozabor-rostov.ru</li>
              <li>Режим: Пн-Вс 08:00 - 20:00</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Мы в соцсетях</h3>
            <div className="flex space-x-4">
               <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition">VK</a>
               <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition">OK</a>
               <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition">TG</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} ЕвроЗаборы. Все права защищены. Работаем по Ростовской области, ДНР и ЛНР.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

