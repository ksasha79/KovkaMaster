import React, { useState } from 'react';

const faqs = [
  {
    question: "Почему нельзя просто привезти и установить забор без замера и проекта?",
    answer: "ЕвроЗабор — это массивная конструкция весом в несколько тонн. Без предварительной нивелировки участка (определения перепадов высот) и анализа типа грунта забор может «поплыть» или наклониться уже после первой зимы из-за пучения почвы. Проектирование позволяет нам рассчитать точную глубину бетонирования, создать правильные «ступеньки» на уклонах и гарантировать идеальную геометрию ограждения на десятилетия."
  },
  {
    question: "Сколько стоит выезд мастера на замер?",
    answer: "Выезд инженера в пределах Ростова-на-Дону, а также в крупные города ДНР и ЛНР (Донецк, Макеевка, Луганск) при заключении договора осуществляется бесплатно. Специалист привозит с собой образцы текстур и лазерное оборудование для точного расчета сметы на месте."
  },
  {
    question: "Какую гарантию вы даете на монтаж?",
    answer: "Мы предоставляем официальную гарантию 2 года на устойчивость конструкции и сохранность геометрии. Это возможно благодаря нашей технологии глубокого бетонирования и строгому соблюдению проектных отметок."
  },
  {
    question: "Как осуществляется доставка тяжелых секций в ДНР и ЛНР?",
    answer: "У нас есть собственный парк грузовых автомобилей с манипуляторами. Мы берем на себя все вопросы логистики и проезда через пункты пропуска. Вы получаете готовое изделие и профессиональную монтажную бригаду прямо у себя на участке."
  },
  {
    question: "Можно ли заказать ворота по индивидуальному размеру?",
    answer: "Да, хотя у нас есть складская программа стандартных размеров, мы изготавливаем воротные группы и калитки под конкретный проем, заложенный в проекте вашего забора. Это гарантирует отсутствие щелей и идеальную работу автоматики."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-metal-900 uppercase tracking-tight">
            Ответы на <span className="text-gold-600">Важные</span> Вопросы
          </h2>
          <div className="h-1.5 w-20 bg-gold-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                className="w-full flex justify-between items-center p-6 text-left font-bold text-metal-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="pr-8">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 text-gold-600 flex-shrink-0 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gold-600/5 border border-gold-500/20 rounded-3xl text-center">
           <p className="text-sm text-gray-500 mb-4">Не нашли ответ на свой вопрос?</p>
           <a href="#contact" className="text-gold-600 font-black uppercase tracking-widest text-xs border-b-2 border-gold-600 pb-1 hover:text-gold-500 hover:border-gold-500 transition-all">
             Спросить инженера в чате
           </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
