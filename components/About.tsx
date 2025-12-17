import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-metal-900">
              <span className="text-gold-600 uppercase">ЕвроЗаборы</span> в Ростовской области, ДНР и ЛНР
            </h2>
            <div className="h-1 w-20 bg-gold-500"></div>
            
            <p className="text-lg text-gray-700">
              Я — профессиональный строитель и сварщик со стажем более 15 лет. 
              Специализируюсь на установке современных ЕвроЗаборов и ворот любой сложности.
            </p>

            <ul className="space-y-4">
              {[
                'Бесплатный выезд на замер в пределах региона',
                'Гарантия 2 года на все виды работ',
                'Работаем с вашим материалом или закупаем сами',
                'Доступные цены на ЕвроЗаборы для жителей ДНР и ЛНР'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-gold-600 mr-2">✓</span>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white border-l-4 border-gold-500 shadow-sm rounded-r">
              <p className="italic text-gray-600">
                "Качественный забор — это не просто ограда, а безопасность и стиль вашего дома. Мы делаем ЕвроЗаборы, которые служат десятилетиями."
              </p>
              <p className="mt-2 font-bold text-metal-900">— Мастер производства</p>
            </div>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl group">
             <img 
               src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
               alt="Welder at work" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute bottom-0 left-0 right-0 bg-metal-900/90 p-6 text-white backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-gold-500">География работ</h3>
                <p className="text-sm text-gray-300">Ростов-на-Дону • Таганрог • Донецк • Луганск • Мариуполь • Макеевка</p>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
