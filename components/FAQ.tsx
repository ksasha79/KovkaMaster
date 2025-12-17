import React, { useState } from 'react';

const faqs = [
  {
    question: "Сколько стоит выезд мастера на замер?",
    answer: "Выезд мастера в пределах Ростова-на-Дону, а также в крупные города ДНР и ЛНР (Донецк, Макеевка, Луганск) при заключении договора осуществляется бесплатно. В остальных случаях стоимость обсуждается индивидуально."
  },
  {
    question: "Работаете ли вы с материалом заказчика?",
    answer: "Да, мы можем изготовить конструкцию из вашего металла. В этом случае вы оплачиваете только стоимость сварочных работ, ковки и монтажа."
  },
  {
    question: "Какую гарантию вы даете?",
    answer: "Мы предоставляем официальную гарантию 2 года на все сварные соединения и лакокрасочное покрытие (при условии использования наших материалов)."
  },
  {
    question: "Как осуществляется доставка в ДНР и ЛНР?",
    answer: "У нас есть собственный грузовой транспорт. Мы берем на себя все вопросы логистики и проезда через пункты пропуска. Вы получаете готовое изделие прямо у себя на участке."
  },
  {
    question: "Можно ли заказать ворота по моему фото из интернета?",
    answer: "Конечно! Присылайте фото или ссылку в любой мессенджер. Наш мастер оценит сложность и рассчитает стоимость реализации именно такого дизайна."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-metal-900">Ответы на <span className="text-gold-600">Вопросы</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center p-5 text-left font-bold text-metal-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-gold-600 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-5 text-gray-600 border-t border-gray-100 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
