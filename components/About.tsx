import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-metal-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              {/* ИНСТРУКЦИЯ: Загрузите фото в public/images/ под названием factory-main.jpg */}
              <img 
                src="/images/factory-main.jpg" 
                alt="Производство ООО Евро-Заборы" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Резервный вариант, если фото еще не загружено
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-metal-900/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-black text-gold-500 uppercase tracking-[0.5em] mb-6">О заводе</h2>
              <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-10">
                Статус <br/>
                <span className="text-gold-500 text-3xl md:text-5xl tracking-widest">лидера</span>
              </h3>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                ООО «Евро-Заборы» — это современные производственные мощности. Мы обеспечиваем замкнутый цикл: от проектирования и сварки до покраски и монтажа в Воронеже и области, Ростове, ЛНР, ДНР и Черноземье.
              </p>
            </div>

            <div className="grid gap-10">
              {[
                { title: 'Заводское качество', desc: 'Продукция сертифицирована. Используем только проверенные материалы и армирование по ГОСТ.' },
                { title: 'Логистический хаб', desc: 'Свой парк техники для оперативной доставки в Мариуполь, Донецк, Луганск и соседние области.' },
                { title: 'Официальный статус', desc: 'Работаем с физическими и юридическими лицами. Полный пакет документов, НДС, гарантия 2 года.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="text-2xl font-black text-gold-500/20 group-hover:text-gold-500 transition-colors">0{idx + 1}</div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
