import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Готовые ЕвроЗаборы и Ворота" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1622372658604-0373df45f22e?q=80&w=1920&auto=format&fit=crop";
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-metal-900/70 via-metal-900/40 to-metal-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
        <div className="inline-block px-4 py-1.5 mb-6 border border-gold-500/50 rounded-full bg-gold-600/10 backdrop-blur-md">
          <span className="text-gold-500 text-[10px] font-black uppercase tracking-[0.3em]">Инженерный подход к ограждениям</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase leading-none">
          Проектируем <span className="text-gold-500">Заборы</span><br/>и Устанавливаем
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light drop-shadow-md">
          Профессиональный монтаж готовых ЕвроЗаборов «под ключ». 
          Учитываем рельеф участка и грунт. <span className="text-white font-bold underline decoration-gold-500 underline-offset-8">Гарантия на монтаж — 2 года</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href="#portfolio" 
            className="px-10 py-5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-2xl shadow-gold-600/30 transition-all active:scale-95"
          >
            Смотреть каталог
          </a>
          <a 
            href="#contact" 
            className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white text-sm font-black uppercase tracking-widest rounded-xl transition-all active:scale-95"
          >
            Вызвать инженера
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

