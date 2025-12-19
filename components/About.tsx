import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Декоративный фоновый текст */}
      <div className="absolute top-10 -right-20 text-[180px] font-black text-gray-50 select-none leading-none pointer-events-none uppercase hidden lg:block">
        Expert
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Блок с изображением */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-[3/4] border-8 border-gray-50">
              <img 
                src="/images/install.jpg" 
                alt="Процесс монтажа" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-metal-900/40 to-transparent"></div>
            </div>
            
            {/* Плашка с опытом */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-gold-600 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl z-20">
               <div className="text-4xl md:text-6xl font-black mb-1 leading-none">15</div>
               <div className="text-[10px] md:text-[11px] uppercase font-bold tracking-[0.2em] opacity-90 leading-tight">
                 Лет личного <br/>опыта в стройке
               </div>
            </div>

            {/* Декоративные элементы */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-50 rounded-full -z-10"></div>
          </div>

          {/* Текстовый блок */}
          <div className="space-y-10 order-1 lg:order-2">
            <div>
              <div className="inline-block px-3 py-1 bg-gold-100 rounded-md mb-4">
                <span className="text-xs font-black text-gold-700 uppercase tracking-widest">Гарантия результата</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-metal-900 uppercase leading-[0.95] mb-8">
                Почему работают <br/>
                <span className="text-gold-500">напрямую со мной?</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light border-l-4 border-gold-500 pl-6">
                Я работаю как индивидуальный предприниматель. Это значит, что я лично отвечаю за каждый установленный столб и каждую секцию вашего забора.
              </p>
            </div>

            <div className="grid gap-10">
              {[
                { 
                  title: 'Честная цена', 
                  desc: 'Никаких скрытых платежей за «сложный грунт». Смета фиксируется в договоре.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Собственный цех', 
                  desc: 'Прямые поставки армированных плит без торговых наценок посредников.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },
                { 
                  title: 'Личный контроль', 
                  desc: 'Я лично принимаю объект и проверяю уровень каждой секции перед сдачей.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gray-900 text-gold-500 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-gold-600 group-hover:text-white shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-metal-900 uppercase mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
               <a 
                 href="#contact" 
                 className="inline-flex items-center justify-center px-10 py-5 bg-metal-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-gold-600 transition-all shadow-xl group"
               >
                  Обсудить ваш проект лично
                  <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
               </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
