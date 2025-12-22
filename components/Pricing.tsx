
import React from 'react';

const plans = [
  {
    name: 'Базовый',
    price: 'от 2 500 ₽',
    desc: 'Оптимально для дачи и временных ограждений',
    features: ['Секция Gitter 3D (4мм)', 'Столбы 60х40мм', 'Полимерное покрытие', 'Монтаж в грунт'],
    popular: false
  },
  {
    name: 'Инженерный',
    price: 'от 4 200 ₽',
    desc: 'Заводской стандарт для частного домовладения',
    features: ['Еврозабор (Армированный)', 'Бетон М350 / ГОСТ', 'Текстура на выбор', 'Глубокое бетонирование', 'Гарантия 24 месяца'],
    popular: true
  },
  {
    name: 'Премиум Системы',
    price: 'от 7 500 ₽',
    desc: 'Индивидуальные решения и автоматизация',
    features: ['Комбинированный дизайн', 'Откатные ворота NICE', 'Дистанционное управление', 'Усиленный фундамент', 'VIP-монтаж'],
    popular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-black text-gold-600 uppercase tracking-[0.6em] mb-4">Price List 2024</h2>
          <h3 className="text-5xl md:text-7xl font-black text-metal-900 uppercase tracking-tighter leading-none">
            ЗАВОДСКИЕ ЦЕНЫ <br/> <span className="text-gold-500">БЕЗ ПОСРЕДНИКОВ</span>
          </h3>
          <div className="h-1.5 w-32 bg-gold-500 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col p-1 bg-white rounded-[2rem] transition-all duration-500 ${
                plan.popular 
                ? 'shadow-[0_40px_100px_rgba(197,160,89,0.15)] ring-1 ring-gold-500/50 scale-105 z-10' 
                : 'shadow-2xl shadow-gray-200 border border-gray-100'
              }`}
            >
              <div className={`flex-grow p-10 rounded-[1.8rem] ${plan.popular ? 'bg-metal-900 text-white' : 'bg-white text-metal-900'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-metal-900 px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                    Выбор клиентов
                  </div>
                )}
                
                <h3 className={`text-xs font-black uppercase tracking-[0.3em] mb-2 ${plan.popular ? 'text-gold-500' : 'text-gray-400'}`}>
                  Тариф: {plan.name}
                </h3>
                <p className="text-[10px] uppercase font-bold tracking-tight opacity-60 mb-8">{plan.desc}</p>
                
                <div className="flex items-baseline mb-10 border-b border-current/10 pb-8">
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-[10px] font-black ml-2 uppercase opacity-40">/ м.п.</span>
                </div>

                <ul className="space-y-5 mb-12">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-[11px] uppercase font-bold tracking-tight">
                      <svg className={`w-4 h-4 mr-3 mt-0.5 ${plan.popular ? 'text-gold-500' : 'text-gold-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a 
                  href="#contact"
                  className={`block text-center py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] transition-all ${
                    plan.popular 
                    ? 'bg-gold-500 text-metal-900 hover:bg-white hover:text-metal-900 shadow-lg shadow-gold-500/20' 
                    : 'bg-metal-900 text-white hover:bg-gold-600'
                  }`}
                >
                  Заказать расчет
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
