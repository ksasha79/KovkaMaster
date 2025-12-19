import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-20 -right-20 text-[200px] font-black text-gray-50 select-none leading-none pointer-events-none uppercase">
        Quality
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <div className="relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] aspect-[4/5] lg:aspect-auto lg:h-[700px]">
              <img 
                src="/images/install.jpg" 
                alt="Процесс монтажа" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-metal-900/60 to-transparent"></div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -right-10 bg-gold-600 text-white p-10 rounded-[2rem] shadow-3xl hidden md:block animate-pulse">
               <div className="text-5xl font-black mb-1">15</div>
               <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80 leading-tight">Лет личного <br/>опыта в стройке</div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-gold-500 rounded-tl-[2rem]"></div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-black text-gold-600 uppercase tracking-[0.4em] mb-4">О Компании</h2>
              <h3 className="text-4xl md:text-6xl font-black text-metal-900 uppercase leading-[0.95] mb-8">
                Почему работают <br/>
                <span className="text-gold-500">напрямую со мной?</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Я работаю как ИП, а это значит, что я отвечаю за результат своим именем. Вы не общаетесь с менеджерами, которые «не в курсе дела». Мы обсуждаем проект лично.
              </p>
            </div>

            <div className="grid gap-8">
              {[
                { 
                  title: 'Честная цена', 
                  desc: 'Никаких скрытых платежей. Смета фиксируется в договоре и не меняется.',
                  icon: '💰'
                },
                { 
                  title: 'Свой инструмент и база', 
                  desc: 'Использую только профессиональное оборудование и проверенные армированные плиты.',
                  icon: '🛠️'
                },
                { 
                  title: 'Личный контроль', 
                  desc: 'Я лично присутствую на разметке и финальной приемке каждого объекта.',
                  icon: '🤝'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-gold-500 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-metal-900 uppercase mb-2 group-hover:text-gold-600 transition-colors">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10">
               <a href="#contact" className="inline-flex items-center gap-4 text-metal-900 font-black uppercase tracking-widest text-sm border-b-2 border-gold-500 pb-2 hover:text-gold-600 transition-all">
                  Обсудить ваш проект лично <span className="text-2xl">→</span>
               </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
