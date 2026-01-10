import React from 'react';

const services = [
  {
    title: "Зимний Монтаж",
    desc: "Специальные технологии установки при отрицательных температурах. Используем антифриз-добавки для бетона.",
    id: "01",
    tag: "СЕЗОННО"
  },
  {
    title: "Теплые Ворота",
    desc: "Сэндвич-панели повышенной толщины и усиленная автоматика, работающая до -40°C.",
    id: "02",
    tag: "ГАРНТИЯ"
  },
  {
    title: "Снежные Навесы",
    desc: "Усиленные фермы, рассчитанные на экстремальные снеговые нагрузки Юга России и Новороссии.",
    id: "03",
    tag: "НАДЕЖНОСТЬ"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 bg-winter-blue relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-winter-dark to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <span className="text-brand-gold font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Праздничные предложения</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            ЗИМНИЕ <span className="text-gold">РЕШЕНИЯ</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="winter-glass p-12 rounded-[2.5rem] group hover:border-brand-gold/50 transition-all duration-500">
               <div className="text-brand-gold text-4xl mb-8 group-hover:animate-bounce">❄️</div>
               <div className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black mb-6 border border-brand-gold/20">
                  {s.tag}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{s.title}</h3>
                <p className="text-blue-100/50 leading-relaxed font-light text-base mb-8">
                  {s.desc}
                </p>
                <a href="#contact" className="text-brand-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                   Узнать стоимость
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
