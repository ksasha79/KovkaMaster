import React from 'react';

const stats = [
  { label: 'Лет опыта', value: '15+', icon: '🏗️' },
  { label: 'Объектов сдано', value: '2540', icon: '🏠' },
  { label: 'Тонн металла', value: '1900+', icon: '⚙️' },
  { label: 'Гарантия', value: '2 года', icon: '🛡️' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-metal-900 border-y border-gold-600/30 relative overflow-hidden">
      {/* Фоновый паттерн с более яркими точками */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:30px_30px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group flex flex-col items-center">
              {/* Иконка с анимацией */}
              <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">
                {stat.icon}
              </div>
              
              {/* Число с градиентом и свечением */}
              <div className="text-5xl md:text-6xl font-black mb-3 tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-gold-500 to-gold-600 filter drop-shadow-[0_2px_10px_rgba(197,160,89,0.5)]">
                  {stat.value}
                </span>
              </div>
              
              {/* Подпись с увеличенным трекингом */}
              <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold-500/80 font-black mb-4">
                {stat.label}
              </div>
              
              {/* Декоративная линия */}
              <div className="h-1 w-8 bg-gold-600/30 group-hover:w-16 group-hover:bg-gold-500 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Боковой блик для объема */}
      <div className="absolute -left-20 top-0 w-40 h-full bg-gold-600/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute -right-20 top-0 w-40 h-full bg-gold-600/5 blur-3xl rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Stats;
