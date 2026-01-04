
import React from 'react';
import { CONTACTS } from '../config';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-900 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 grayscale brightness-50"
        >
          <source src={CONTACTS.HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-metal-900 via-transparent to-metal-900"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-gold-500/30 rounded-full bg-metal-900/50 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse"></span>
          <span className="text-gold-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">{CONTACTS.SLOGAN} 2026</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-6 uppercase leading-none">
          ИДЕАЛЬНАЯ <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-white to-gold-600">ФИКСАЦИЯ</span>
        </h1>
        
        <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 uppercase tracking-widest leading-relaxed">
          Архитектурные решения <br/>
          <span className="text-white font-black">нового поколения</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-10 py-5 bg-xmas-red text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-metal-900 transition-all shadow-xl active:scale-95"
          >
            Рассчитать проект 🎁
          </a>
          <a 
            href="#portfolio" 
            className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-gold-500 hover:text-metal-900 transition-all shadow-xl"
          >
            Каталог работ
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
