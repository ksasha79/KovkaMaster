
import React, { useState } from 'react';

const faqs = [
  {
    question: "Почему в Воронежской области важно бетонировать столбы ниже 1.2 метра?",
    answer: "Воронежская область характеризуется глубоким промерзанием чернозема и глинистых почв. Если установить забор выше уровня промерзания (обычно это 1.1-1.2м), силы морозного пучения просто «выдавят» столбы весной. Мы производим монтаж с учетом этих особенностей, гарантируя, что ваш забор останется идеально ровным десятилетиями."
  },
  {
    question: "В чем преимущество 3D-сетки перед обычным профлистом для участков в Черноземье?",
    answer: "3D-сетка (Gitter) обеспечивает отличную проветриваемость участка. На открытых пространствах Воронежской степи часто бывают сильные ветровые нагрузки — сетка не имеет парусности, в отличие от сплошного профлиста. Кроме того, она не затеняет посадки, что критично для плодородного чернозема."
  },
  {
    question: "Сколько времени занимает строительство забора с кирпичными колоннами и лентой?",
    answer: "Это капитальное строительство. Первый этап — копка траншеи и заливка армированной ленты (3-5 дней на набор прочности бетона). Затем — возведение колонн и монтаж пролетов. В среднем, объект длиной 20-30 метров в Новой Усмани или Рамони мы сдаем за 14-18 рабочих дней."
  },
  {
    question: "Работаете ли вы по области (Семилуки, Лиски, Борисоглебск)?",
    answer: "Да, мы работаем по всей Воронежской области. У нас налажена логистика по трассе М-4 и региональным дорогам. Стоимость доставки рассчитывается индивидуально, но благодаря собственному автопарку она остается минимальной для заказчика."
  },
  {
    question: "Можно ли заказать только материалы без монтажа?",
    answer: "Да, как завод-изготовитель, мы отгружаем комплекты для самостоятельной сборки со склада в Воронеже. Вы получаете все необходимые комплектующие, схемы сборки и заводскую гарантию на металл и окраску."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-brand-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">База знаний</span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            ОТВЕТЫ <span className="text-gold">ИНЖЕНЕРА</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-[2rem] transition-all duration-500 overflow-hidden ${
                openIndex === index 
                ? 'bg-brand-grey border-brand-gold/50 shadow-2xl' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-8 text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${openIndex === index ? 'text-brand-gold' : 'text-white'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  openIndex === index ? 'bg-brand-gold border-brand-gold text-black rotate-180' : 'border-white/20 text-white group-hover:border-brand-gold'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="px-8 pb-8 text-gray-400 leading-relaxed font-light text-base md:text-lg border-t border-white/5 pt-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 glass-card rounded-[3rem] text-center border-dashed border-2 border-brand-gold/20">
           <p className="text-gray-400 mb-6 uppercase tracking-widest text-[10px] font-black">Остались специфические вопросы?</p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#contact" className="btn-gold px-10 py-5 rounded-2xl text-[10px]">
                Получить консультацию
              </a>
              <a href="https://t.me/8201704520" target="_blank" className="px-10 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Написать в Telegram
              </a>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
