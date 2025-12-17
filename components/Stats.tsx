import React from 'react';

const stats = [
  { label: 'Лет опыта', value: '15+', icon: '🏗️' },
  { label: 'Объектов сдано', value: '540', icon: '🏠' },
  { label: 'Тонн металла', value: '1200', icon: '⚙️' },
  { label: 'Гарантия', value: '2 года', icon: '🛡️' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-metal-900 border-y border-gold-600/20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group border-r last:border-r-0 border-gray-800 lg:border-r lg:last:border-r-0">
              <div className="text-3xl mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-gold-500 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
