import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Инженерный аудит',
    description: 'Мастер выезжает на объект с лазерным нивелиром. Проверяем перепады высот, тип грунта и наличие скрытых коммуникаций.'
  },
  {
    number: '02',
    title: 'Проектирование',
    description: 'Рассчитываем точное количество секций и «ступенек» забора. Формируем схему установки, чтобы линия забора была идеальной.'
  },
  {
    number: '03',
    title: 'Комплектация',
    description: 'Подбираем готовые армированные плиты и столбы из складской программы. Проверяем каждую секцию на отсутствие микротрещин.'
  },
  {
    number: '04',
    title: 'Разметка и Лункование',
    description: 'Выносим оси в натуру. Бурим отверстия ниже точки промерзания грунта. Подготавливаем подушку для каждого столба.'
  },
  {
    number: '05',
    title: 'Сборка и Нивелировка',
    description: 'Финальный монтаж готовых элементов по проекту. Бетонирование столбов и герметизация стыков для защиты от влаги.'
  }
];

const Steps: React.FC = () => {
  return (
    <section id="steps" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-metal-900 uppercase tracking-widest">
            Технология <span className="text-gold-600">Грамотной</span> Установки
          </h2>
          <div className="h-1.5 w-20 bg-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            ЕвроЗабор — это тяжелая конструкция. Мы не просто привозим плиты, мы проектируем надежное ограждение с учетом особенностей вашего участка.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-100"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-metal-900 text-gold-500 text-3xl font-black mb-8 border-4 border-white shadow-2xl group-hover:bg-gold-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    {step.number}
                    {/* Decorative mark for engineering precision */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-gold-500 rounded-sm rotate-45 border border-white"></div>
                  </div>
                  
                  <h3 className="text-lg font-black text-metal-900 mb-4 uppercase tracking-tight group-hover:text-gold-600 transition-colors">
                    {step.title}
                  </h3>
                  
                  <div className="relative px-4">
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    <div className="mt-4 h-0.5 w-0 bg-gold-500 mx-auto group-hover:w-full transition-all duration-500 opacity-50"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 p-8 bg-metal-900 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gold-600/20 rounded-2xl flex items-center justify-center text-3xl border border-gold-600/30">📐</div>
              <div>
                <div className="font-bold text-white uppercase text-sm tracking-widest">Точность до миллиметра</div>
                <div className="text-xs text-gray-400 mt-1">Используем лазерное оборудование Bosch и Leica для идеального горизонта</div>
              </div>
           </div>
           <div className="flex gap-4">
              <a href="#contact" className="px-10 py-4 bg-gold-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-gold-500 transition-all shadow-lg active:scale-95">
                Заказать проект
              </a>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
