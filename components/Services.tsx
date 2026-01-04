import React from 'react';

const services = [
  {
    title: "Производство Еврозаборов",
    desc: "Изготовление секций из бетона марки М350 с обязательным стальным армированием. Более 50 видов текстур.",
    icon: "🧱"
  },
  {
    title: "Ворота и Автоматика",
    desc: "Распашные и откатные ворота любой сложности. Установка профессиональной автоматики DoorHan и NICE.",
    icon: "⚙️"
  },
  {
    title: "Металлоконструкции",
    desc: "Проектирование и монтаж навесов для авто, беседок и усиленных стеллажных систем для складов.",
    icon: "🏗️"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-brand-gold uppercase tracking-[0.5em] mb-4">Направления</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Что мы <span className="text-gold">производим</span></h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="glass-card p-12 rounded-2xl">
              <div className="text-5xl mb-8">{s.icon}</div>
              <h4 className="text-2xl font-black uppercase mb-4 tracking-tight">{s.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
