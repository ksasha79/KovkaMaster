import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Заявка и расчет',
    description: 'Вы оставляете заявку или звоните. Мы делаем предварительный расчет стоимости по вашим размерам.'
  },
  {
    number: '02',
    title: 'Выезд на замер',
    description: 'Мастер приезжает на объект, делает точные замеры, показывает образцы металла и вариантов покраски.'
  },
  {
    number: '03',
    title: 'Договор и эскиз',
    description: 'Согласовываем финальный дизайн (или делаем индивидуальный эскиз) и фиксируем сроки и цену.'
  },
  {
    number: '04',
    title: 'Производство',
    description: 'Ковка, сварка и многослойная покраска в цеху. Мы контролируем качество каждого шва.'
  },
  {
    number: '05',
    title: 'Монтаж',
    description: 'Доставляем изделие своим транспортом и устанавливаем «под ключ» за один день.'
  }
];

const Steps: React.FC = () => {
  return (
    <section id="steps" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-metal-900 uppercase tracking-wide">
            Как мы <span className="text-gold-600">Работаем</span>
          </h2>
          <p className="mt-4 text-gray-600">Простой и понятный процесс реализации вашего проекта</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-metal-900 text-gold-500 text-2xl font-bold mb-6 border-4 border-white shadow-xl group-hover:bg-gold-600 group-hover:text-white transition-all duration-300 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-metal-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;