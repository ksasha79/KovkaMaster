
import React from 'react';

const stats = [
  { label: 'Лет опыта', value: '15+', icon: '🏗️' },
  { label: 'Объектов сдано', value: '2540', icon: '🏠' },
  { label: 'Тонн металла', value: '1900+', icon: '⚙️' },
  { label: 'Гарантия', value: '2 года', icon: '🛡️' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-metal-900 border-y border-gold-600/20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter flex items-center justify-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-gold-400 to-gold-600 drop-shadow-md">
                  {stat.value}
                </span>
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-black">
                {stat.label}
              </div>
              <div className="h-0.5 w-0 group-hover:w-12 bg-gold-600 mx-auto mt-4 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
