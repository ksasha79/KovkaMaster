import React from 'react';
import { ServiceItem } from '../types';

const services: (ServiceItem & { iconSvg: React.ReactNode })[] = [
  {
    id: '1',
    title: 'ЕвроЗаборы',
    description: 'Бетонные секции с армированием: сланец, кирпич, дерево. Установка за 1-2 дня.',
    icon: 'fence',
    iconSvg: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>
  },
  {
    id: '2',
    title: 'Навесы для авто',
    description: 'Сварные навесы из поликарбоната и профлиста. Проектирование под ваш участок.',
    icon: 'canopy',
    iconSvg: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" /></svg>
  },
  {
    id: '3',
    title: 'Беседки и зоны отдыха',
    description: 'Изготовление беседок в стиле Loft и Classic. Металл + дерево. Личный монтаж.',
    icon: 'gazebo',
    iconSvg: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
  },
  {
    id: '4',
    title: 'Стеллажи и Мебель',
    description: 'Системы хранения для гаражей и складов. Сварные и сборные конструкции любой нагрузки.',
    icon: 'shelving',
    iconSvg: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18M3 9h18M3 15h18M3 21h18M5 3v18M19 3v18" /></svg>
  },
  {
    id: '5',
    title: 'Ворота и Калитки',
    description: 'Откатные и распашные системы. Заводская покраска, установка автоматики.',
    icon: 'gate',
    iconSvg: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5" /></svg>
  },
  {
    id: '6',
    title: '3D Сетка Gitter',
    description: 'Быстровозводимые ограждения для дач и промзон. Всегда в наличии на складе.',
    icon: 'mesh',
    iconSvg: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16M7 4v16M11 4v16M15 4v16" /></svg>
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-gold-600 uppercase tracking-[0.4em] mb-4">Наши Услуги</h2>
          <h3 className="text-4xl md:text-5xl font-black text-metal-900 uppercase tracking-tight">
            Комплексное <span className="text-gold-600">Благоустройство</span>
          </h3>
          <div className="h-1.5 w-20 bg-gold-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group p-10 rounded-[40px] bg-gray-50 border border-gray-100 hover:bg-metal-900 transition-all duration-500 shadow-xl hover:shadow-gold-600/20">
              <div className="text-gold-500 mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 bg-white p-4 inline-block rounded-2xl group-hover:bg-gold-500 group-hover:text-white shadow-sm">
                {service.iconSvg}
              </div>
              <h3 className="text-2xl font-black text-metal-900 mb-4 uppercase group-hover:text-white transition-colors leading-tight">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{service.description}</p>
              
              <div className="mt-8 pt-6 border-t border-gray-200 group-hover:border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                <a href="#contact" className="text-gold-500 text-xs font-black uppercase tracking-widest hover:text-white flex items-center gap-2">
                  Заказать расчет <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
