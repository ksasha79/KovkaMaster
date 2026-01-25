import React from 'react';

const plans = [
  {
    name: 'Бюджет',
    price: 'от 850 ₽',
    desc: 'Сетка рабица или 3D Gitter',
    features: ['Секции 3D (4мм) / Рабица', 'Столбы 60х40мм', 'Полимерное покрытие', 'Монтаж в грунт'],
    popular: false
  },
  {
    name: 'Стандарт',
    price: 'от 2 200 ₽',
    desc: 'Забор из профлиста или штакета',
    features: ['Лист НЛМК 0.45мм', 'Штакетник 3D рез', 'Каркас в 2 лаги', 'Бетонирование столбов', 'Гарантия 2 года'],
    popular: true
  },
  {
    name: 'Премиум',
    price: 'от 3 800 ₽',
    desc: 'Забор Жалюзи или Ранчо',
    features: ['Ламели премиум-класса', 'Скрытый крепеж', 'Покрытие Soft-touch', 'Усиленный каркас', 'VIP-монтаж'],
    popular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-black text-gold-600 uppercase tracking-[0.6em] mb-4">Прайс-лист 2025</h2>
          <h3 className="text-5xl md:text-7xl font-black text-metal-900 uppercase tracking-tighter leading-none">
            ЗАВОДСКИЕ ЦЕНЫ <br/> <span className="text-gold-500">ЗА МЕТР ПОГОННЫЙ</span>
          </h3>
          <div className="h-1.5 w-32 bg-gold-500 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col p-1 bg-white rounded-[2rem] transition-all duration-500 hover:translate-y-[-10px] ${
                plan.popular 
                ? 'shadow-[0_40px_100px_rgba(212,175,55,0.2)] ring-2 ring-gold-500 scale-105 z-10' 
                : 'shadow-2xl shadow-gray-200 border border-gray-100'
              }`}
            >
              <div className={`flex-grow p-10 rounded-[1.8rem] ${plan.popular ? 'bg-metal-900 text-white' : 'bg-white text-metal-900'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-white px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                    Лучшее предложение
                  </div>
                )}
                
                <h3 className={`text-xs font-black uppercase tracking-[0.3em] mb-2 ${plan.popular ? 'text-gold-500' : 'text-gray-400'}`}>
                   {plan.name}
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
                  href="#calculator"
                  className={`block text-center py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] transition-all ${
                    plan.popular 
                    ? 'bg-gold-500 text-white hover:bg-white hover:text-metal-900 shadow-lg shadow-gold-500/20' 
                    : 'bg-metal-900 text-white hover:bg-gold-600'
                  }`}
                >
                  Перейти к расчету
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
