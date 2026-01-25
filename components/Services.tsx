import React from 'react';

const services = [
  {
    title: "Профлист и Жалюзи",
    desc: "Капитальные сплошные ограждения из стали НЛМК. Максимальная приватность и долговечность.",
    id: "01",
    tag: "ХИТ ПРОДАЖ"
  },
  {
    title: "3D Штакетник",
    desc: "Эстетичные заборы с эффектом проветривания. Идеально для коттеджных поселков и дач.",
    id: "02",
    tag: "ТРЕНД 2025"
  },
  {
    title: "Сетчатые системы",
    desc: "3D Gitter и Рабица для бюджетного ограждения территорий. Монтаж за 1 рабочий день.",
    id: "03",
    tag: "ЭКОНОМ"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 bg-brand-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <span className="text-brand-gold font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Наши направления</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            ЧТО МЫ <span className="text-gold">СТРОИМ</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-brand-grey/50 border border-white/5 p-12 rounded-[2.5rem] group hover:border-brand-gold/50 transition-all duration-500">
               <div className="text-brand-gold text-4xl mb-8">🛠️</div>
               <div className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black mb-6 border border-brand-gold/20">
                  {s.tag}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-base mb-8">
                  {s.desc}
                </p>
                <a href="#contact" className="text-brand-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                   Рассчитать проект
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
