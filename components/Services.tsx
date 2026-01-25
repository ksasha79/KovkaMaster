import React from 'react';

const services = [
  {
    title: "Забор из проф листа",
    desc: "Капитальное сплошное ограждение из стали НЛМК. Максимальная приватность и защита от шума.",
    id: "01",
    tag: "ХИТ ПРОДАЖ",
    icon: "📄"
  },
  {
    title: "Забор из 3Д штакета",
    desc: "Эстетичные планки с закругленным верхом. Сочетает проветриваемость и классический вид.",
    id: "02",
    tag: "ТРЕНД 2025",
    icon: "📏"
  },
  {
    title: "Забор из 3Д сетки",
    desc: "Секции Gitter с ребрами жесткости. Прозрачное, прочное и долговечное решение для любого участка.",
    id: "03",
    tag: "НАДЕЖНО",
    icon: "🌐"
  },
  {
    title: "Забор из сетки рабицы",
    desc: "Самый экономичный вариант. Быстрый монтаж внатяжку или в рамках. Идеально для дачи.",
    id: "04",
    tag: "ЭКОНОМ",
    icon: "⛓️"
  },
  {
    title: "Забор из жалюзи",
    desc: "Премиальные ламели под углом. Вы видите улицу, а вас — нет. Идеальная циркуляция воздуха.",
    id: "05",
    tag: "ПРЕМИУМ",
    icon: "📊"
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-brand-grey/50 border border-white/5 p-12 rounded-[2.5rem] group hover:border-brand-gold/50 transition-all duration-500 flex flex-col h-full">
               <div className="text-4xl mb-8 transform group-hover:scale-110 transition-transform duration-500 w-fit">
                 {s.icon}
               </div>
               <div className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black mb-6 border border-brand-gold/20 w-fit">
                  {s.tag}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-base mb-8 flex-grow">
                  {s.desc}
                </p>
                <a href="#calculator" className="text-brand-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-3 group/link">
                   Рассчитать проект
                   <span className="w-8 h-[1px] bg-brand-gold/30 group-hover/link:w-12 transition-all"></span>
                </a>
            </div>
          ))}
        </div>
      </div>

      {/* Декоративный элемент фона */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
        <div className="w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
    </section>
  );
};

export default Services;
