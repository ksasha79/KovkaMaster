
import React, { useEffect, useState } from 'react';
import { CONTACTS } from '../config';

const Hero: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: Math.floor((e.clientX / window.innerWidth) * 100),
        y: Math.floor((e.clientY / window.innerHeight) * 100),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      {/* 3D Background Video Container */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-40 grayscale contrast-150 scale-110"
        >
          <source src={CONTACTS.HERO_VIDEO_URL} type="video/mp4" />
        </video>
        
        {/* HUD Elements Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Grid Layer */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent animate-[scan_4s_ease-in-out_infinite]"></div>
          
          {/* Corner HUD Brackets */}
          <div className="absolute top-4 left-4 md:top-10 md:left-10 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-gold-500/30"></div>
          <div className="absolute top-4 right-4 md:top-10 md:right-10 w-12 h-12 md:w-20 md:h-20 border-t-2 border-r-2 border-gold-500/30"></div>
          <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-12 h-12 md:w-20 md:h-20 border-b-2 border-l-2 border-gold-500/30"></div>
          <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-gold-500/30"></div>

          {/* Dynamic Coordinates (Hidden on mobile for better UX) */}
          <div className="hidden md:flex absolute bottom-20 right-20 text-[10px] font-mono text-gold-500/50 flex-col items-end uppercase tracking-widest space-y-1">
            <span>SEC_ID: FIX_8829</span>
            <span>LAT: 47.2357° N</span>
            <span>LNG: 39.7015° E</span>
            <span className="text-gold-500 font-black">POS_X: {coords.x} / POS_Y: {coords.y}</span>
          </div>

          {/* Center Target */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-gold-500/10 rounded-full flex items-center justify-center">
             <div className="w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#d4af37]"></div>
             <div className="absolute inset-0 border-t-2 border-gold-500/20 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Darkening Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-transparent to-metal-900"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2 mb-8 md:mb-12 border border-gold-500/30 rounded-full bg-metal-900/50 backdrop-blur-3xl animate-pulse">
          <span className="flex h-2 w-2 rounded-full bg-gold-500"></span>
          <span className="text-gold-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">{CONTACTS.SLOGAN} 2026</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter mb-6 md:mb-8 uppercase leading-[0.9] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] px-2">
          ИДЕАЛЬНАЯ <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-white to-gold-600">ФИКСАЦИЯ</span>
        </h1>
        
        <p className="text-base sm:text-xl md:text-3xl text-gray-300 max-w-3xl mb-10 md:mb-14 leading-relaxed font-light mx-auto uppercase tracking-[0.15em] px-4">
          Архитектурные решения <br/>
          <span className="text-white font-black">нового поколения</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
          <a 
            href="#contact" 
            className="w-full sm:w-auto group relative px-8 py-5 md:px-14 md:py-7 bg-xmas-red text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl overflow-hidden transition-all shadow-[0_20px_50px_rgba(204,0,0,0.3)] active:scale-95 flex justify-center items-center gap-4"
          >
            <span className="relative z-10">Рассчитать проект 🎁</span>
            <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2.5}/></svg>
          </a>
          <a 
            href="#portfolio" 
            className="w-full sm:w-auto px-8 py-5 md:px-14 md:py-7 bg-white/5 backdrop-blur-2xl border border-white/10 text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-gold-500 hover:text-metal-900 transition-all shadow-2xl flex justify-center items-center"
          >
            Инженерный каталог
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
