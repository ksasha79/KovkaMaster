
import React from 'react';

const services = [
  {
    title: "Металлические системы",
    desc: "Жалюзи, штакетник и профнастил премиум-класса с гарантией на покрытие 10 лет.",
    id: "01",
    tag: "ПОПУЛЯРНО"
  },
  {
    title: "Капитальный фундамент",
    desc: "Проектирование и заливка ленточных фундаментов под кирпичные колонны с учетом воронежского грунта.",
    id: "02",
    tag: "ПОД КЛЮЧ"
  },
  {
    title: "Сетчатые ограждения",
    desc: "Монтаж 3D-сетки и рабицы для частных участков и промышленных объектов.",
    id: "03",
    tag: "БЫСТРЫЙ МОНТАЖ"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <span className="text-brand-gold font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Наши направления</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            ЧТО МЫ <span className="text-gold">ПРЕДЛАГАЕМ</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="glass-card p-12 rounded-[2.5rem] group hover:border-brand-gold/50 transition-all duration-500">
               <div className="text-brand-gold text-4xl mb-8">🛠️</div>
               <div className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black mb-6 border border-brand-gold/20">
                  {s.tag}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-base mb-8">
                  {s.desc}
                </p>
                <a href="#contact" className="text-brand-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                   Узнать подробнее
                   <span className="w-8 h-[1px] bg-brand-gold/30"></span>
                </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
