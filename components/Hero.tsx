
import React from 'react';
import { CONTACTS } from '../config';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      {/* Background Video Implementation */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-40 grayscale"
        >
          <source src={CONTACTS.HERO_VIDEO_URL} type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img 
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop" 
            alt="Зимний завод" 
            className="w-full h-full object-cover"
          />
        </video>
        {/* Advanced Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-metal-900/60 to-metal-900"></div>
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.8)_100%)"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center lg:text-left">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-10 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-xmas-red animate-pulse"></span>
            <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">❄️ 3D-ВИЗУАЛИЗАЦИЯ И МОНТАЖ В ПОДАРОК ❄️</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] font-black text-white tracking-tighter mb-10 uppercase leading-[0.8] drop-shadow-2xl">
            НОВОГОДНИЕ <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-white to-gold-500 animate-gradient-x">СКИДКИ НА</span> <br/>
            ЗАБОРЫ
          </h1>
          
          <div className="lg:pl-2 border-l-4 border-gold-600/30">
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-14 leading-relaxed font-light mx-auto lg:mx-0">
              Зафиксируйте цену до <span className="text-gold-500 font-bold">15 января</span>. 
              Заводское производство {CONTACTS.COMPANY_NAME}. 
              3D-проект вашего участка — <span className="text-white border-b border-gold-600">бесплатно</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
            <a 
              href="#contact" 
              className="group relative px-12 py-6 bg-xmas-red text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl overflow-hidden transition-all shadow-2xl active:scale-95 text-center w-full sm:w-auto"
            >
              <span className="relative z-10">Получить расчет 🎁</span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-10"></div>
            </a>
            <a 
              href="#portfolio" 
              className="px-12 py-6 bg-white/5 backdrop-blur-md border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-metal-900 transition-all text-center w-full sm:w-auto"
            >
              Смотреть 3D-проекты
            </a>
          </div>
        </div>
      </div>

      {/* Decorative vertical badge */}
      <div className="absolute bottom-20 left-12 hidden xl:block">
        <div className="flex items-center gap-6 rotate-180 [writing-mode:vertical-rl]">
           <span className="h-20 w-px bg-gold-600/50"></span>
           <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.8em]">
             FACTORY INNOVATION • EST. 2009
           </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
