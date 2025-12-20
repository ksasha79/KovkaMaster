import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Еврозаборы и Ворота" 
          className="w-full h-full object-cover transition-transform duration-[20s] scale-110 hover:scale-100"
          onError={(e) => {
            // Если вашего файла hero.jpg еще нет, показываем это временное фото
            e.currentTarget.src = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1920&auto=format&fit=crop";
          }}
        />
        {/* Градиенты для читаемости */}
        <div className="absolute inset-0 bg-gradient-to-r from-metal-900/90 via-metal-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-transparent to-metal-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-gold-500/30 rounded-lg bg-gold-600/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="text-gold-500 text-[10px] font-black uppercase tracking-[0.4em]">Работаем по Ростовской обл, ДНР и ЛНР</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase leading-[0.9]">
            Надежные <br/>
            <span className="text-gold-500 drop-shadow-[0_5px_15px_rgba(197,160,89,0.4)]">Заборы</span> <br/>
            <span className="text-3xl md:text-5xl font-light tracking-normal normal-case opacity-90">без посредников</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-12 leading-relaxed border-l-4 border-gold-600 pl-6">
            Профессиональный монтаж ЕвроЗаборов и ворот. 
            Личный контроль качества на каждом этапе — от замера до финального болта.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a 
              href="#portfolio" 
              className="px-12 py-6 bg-gold-600 hover:bg-gold-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-gold-600/40 transition-all hover:-translate-y-1 active:scale-95"
            >
              Смотреть работы
            </a>
            <a 
              href="#contact" 
              className="px-12 py-6 bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95"
            >
              Вызвать замерщика
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
