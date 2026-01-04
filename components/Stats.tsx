
import React from 'react';

const stats = [
  { label: 'Лет на рынке', value: '15+', icon: '🏗️' },
  { label: 'Заборов в год', value: '2500+', icon: '📏' },
  { label: 'Тонн бетона', value: '5000+', icon: '🧱' },
  { label: 'Гарантия', value: '2 года', icon: '🛡️' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-metal-900 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group flex flex-col items-center">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0">
                <span>{stat.icon}</span>
              </div>
              
              <div className="text-5xl md:text-6xl font-black mb-3 tracking-tighter">
                <span className="text-white">
                  {stat.value}
                </span>
              </div>
              
              <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold-500 font-black mb-4 opacity-70">
                {stat.label}
              </div>
              
              <div className="h-0.5 w-8 bg-gold-600/20 group-hover:w-16 group-hover:bg-gold-500 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;


