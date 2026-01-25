import React, { useState } from 'react';

const faqs = [
  {
    question: "Какой забор лучше выбрать для защиты от шума и посторонних глаз?",
    answer: "Для максимальной приватности и звукоизоляции идеально подходит забор из проф листа. В Воронеже мы используем сталь НЛМК толщиной 0.45-0.5 мм, что обеспечивает жесткость конструкции. Если же вам важна эстетика и вентиляция при сохранении приватности, рекомендуем забор из жалюзи — его ламели расположены так, что вы видите улицу, а прохожие не видят вас."
  },
  {
    question: "Строите ли вы навесы для машин и террасы?",
    answer: "Да, это одно из наших новых направлений. Мы проектируем и устанавливаем навесы любой сложности: от простых односкатных до сложных ферменных конструкций. Используем усиленный металлопрокат, покрываем его антикоррозийной краской и предлагаем различные варианты кровли (поликарбонат, металлочерепица, профлист). Цена начинается от 8000 руб. за кв.м."
  },
  {
    question: "В чем разница между 3Д штакетом и обычным деревянным забором?",
    answer: "Металлический 3Д штакетник не гниет, не выцветает и не требует ежегодной покраски. 3D-рез (полукруглый верх) придает забору классический вид. Мы предлагаем установку 'в шахматку' для полной непрозрачности или с зазором для лучшей проветриваемости участка, что критично для чернозема в Рамони или Новой Усмани."
  },
  {
    question: "Почему 3Д сетка (Gitter) считается самым надежным решением для больших участков?",
    answer: "3Д сетка имеет ребра жесткости (изгибы прутка), которые не дают секции деформироваться. Она пропускает 100% солнечного света, что важно для садоводов Воронежской области. Пруток оцинкован и покрыт полимером в заводских условиях, поэтому срок службы такого ограждения превышает 30 лет."
  },
  {
    question: "На какую глубину вы устанавливаете столбы в нашем регионе?",
    answer: "Это ключевой вопрос. Глубина промерзания почвы в Воронеже — около 1.2 метра. Чтобы забор не 'выдавило' весной силами морозного пучения, мы устанавливаем столбы ниже этой отметки (на 1.3 - 1.5 метра) с обязательным бутованием щебнем или бетонированием, в зависимости от типа грунта на вашем объекте."
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
