import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Кованые ворота',
    description: 'Изготовление распашных и откатных ворот с элементами художественной ковки по индивидуальному дизайну.',
    icon: '🏰'
  },
  {
    id: '2',
    title: 'Заборы под ключ',
    description: 'Установка заборов из профнастила, 3D сетки, кирпича и кованых секций любой сложности.',
    icon: '🚧'
  },
  {
    id: '3',
    title: 'Профессиональная сварка',
    description: 'Высококачественные сварочные работы, сборка металлоконструкций, навесов и беседок.',
    icon: '⚡'
  },
  {
    id: '4',
    title: 'Монтаж автоматики',
    description: 'Установка и настройка автоматических систем открывания для всех типов ворот.',
    icon: '⚙️'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-metal-900 uppercase tracking-wide">
            Наши <span className="text-gold-600">Услуги</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Полный цикл работ от эскиза до установки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-gold-500">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-metal-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;