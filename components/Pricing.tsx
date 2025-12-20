import React from 'react';

const plans = [
  {
    name: 'Эконом',
    price: 'от 2 500 ₽',
    features: [
      'Высота секции до 1.5м',
      'Стандартная 3D сетка или бетон',
      'Установка на металлические столбы',
      'Базовое бетонирование (60см)',
      'Гарантия 12 месяцев'
    ],
    popular: false
  },
  {
    name: 'Стандарт',
    price: 'от 4 200 ₽',
    features: [
      'Высота секции до 2.0м',
      'Усиленное армирование плит',
      'Текстурный рисунок (камень/дерево)',
      'Полимерная покраска столбов',
      'Гарантия 2 года',
      'Бесплатный выезд на замер'
    ],
    popular: true
  },
  {
    name: 'Премиум',
    price: 'от 6 900 ₽',
    features: [
      'Индивидуальный дизайн-проект',
      'Двустороннее окрашивание секций',
      'Комбинированные материалы (металл+бетон)',
      'Усиленный фундамент (ростверк)',
      'Гарантия 3 года по договору',
      'Приоритетные сроки монтажа'
    ],
    popular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-metal-900 uppercase tracking-wide">
            Стоимость <span className="text-gold-600">ЕвроЗаборов</span>
          </h2>
          <div className="h-1 w-24 bg-gold-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Финальная стоимость рассчитывается за погонный метр и включает в себя производство, доставку и установку «под ключ» напрямую от завода ООО «ЕвроЗаборы».
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative p-8 rounded-2xl border transition-all duration-500 flex flex-col ${
                plan.popular 
                ? 'border-gold-500 shadow-[0_20px_50px_rgba(197,160,89,0.2)] lg:scale-105 z-10 bg-metal-900 text-white' 
                : 'border-gray-200 bg-gray-50 text-metal-900'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Оптимальный выбор
                </span>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-gold-500' : 'text-metal-900'}`}>{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black">{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>/ за п.м.</span>
                </div>
                <div className={`text-[10px] mt-2 uppercase font-bold tracking-widest ${plan.popular ? 'text-gold-600' : 'text-gray-400'}`}>
                  Материалы + Работа + Монтаж
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-sm">
                    <span className="text-gold-500 mr-3 mt-0.5 text-lg leading-none">✓</span>
                    <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact"
                className={`block text-center py-4 rounded-xl font-black uppercase tracking-widest transition-all transform active:scale-95 ${
                  plan.popular 
                  ? 'bg-gold-600 hover:bg-gold-500 text-white shadow-lg shadow-gold-600/20' 
                  : 'bg-metal-900 hover:bg-metal-800 text-white'
                }`}
              >
                РАССЧИТАТЬ СМЕТУ
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-metal-800/5 rounded-2xl border border-dashed border-gray-300 text-center">
          <p className="text-sm text-gray-500">
            * Указанные цены являются актуальными на текущий сезон. Точная стоимость фиксируется в официальном договоре с ООО после замера и анализа грунта.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
