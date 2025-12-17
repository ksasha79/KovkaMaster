import React from 'react';

const plans = [
  {
    name: 'Эконом',
    price: 'от 45 000 ₽',
    features: ['Профильная труба', 'Профнастил (С8/С20)', 'Базовая сварка', 'Грунт-эмаль 3-в-1', 'Гарантия 2 года'],
    popular: false
  },
  {
    name: 'Стандарт',
    price: 'от 85 000 ₽',
    features: ['Элементы холодной ковки', 'Усиленный каркас', 'Полимерная покраска', 'Гарантия 2 года', 'Выезд мастера-дизайнера'],
    popular: true
  },
  {
    name: 'Премиум',
    price: 'от 150 000 ₽',
    features: ['Художественная горячая ковка', 'Индивидуальный эскиз ИИ', 'Патинирование (золото/медь)', 'Автоматика в комплекте', 'Гарантия 2 года'],
    popular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-metal-900 uppercase tracking-wide">
            Стоимость <span className="text-gold-600">Работ</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Цены зависят от сложности узора, веса конструкции и выбранных материалов. Точный расчет — после замера.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative p-8 rounded-2xl border transition-all duration-500 hover:translate-y-[-8px] ${
                plan.popular 
                ? 'border-gold-500 shadow-[0_20px_50px_rgba(197,160,89,0.2)] scale-105 z-10 bg-metal-900 text-white' 
                : 'border-gray-200 bg-gray-50 text-metal-900'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Популярный выбор
                </span>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-gold-500' : ''}`}>{plan.name}</h3>
              <div className="text-3xl font-black mb-6 flex items-baseline">
                {plan.price}
                <span className="text-sm font-normal text-gray-500 ml-2">/изделие</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-sm">
                    <span className="text-gold-500 mr-3 mt-1 text-lg">✓</span>
                    <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#contact"
                className={`block text-center py-4 rounded-lg font-black transition-all transform active:scale-95 ${
                  plan.popular 
                  ? 'bg-gold-600 hover:bg-gold-500 text-white shadow-lg shadow-gold-600/20' 
                  : 'bg-metal-900 hover:bg-metal-800 text-white'
                }`}
              >
                ЗАКАЗАТЬ РАСЧЕТ
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

