
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
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-metal-900">
      {/* 3D Background Video Container */}
      <div className="absolute inset-0 z-0 bg-metal-900">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="https://images.unsplash.com/photo-1584943964297-7f99966b446c?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-30 grayscale contrast-125 scale-105"
        >
          <source src={CONTACTS.HERO_VIDEO_URL} type="video/mp4" />
        </video>
        
        {/* HUD Elements Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]"></div>
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent animate-[scan_6s_ease-in-out_infinite]"></div>
          
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold-500/40 md:w-16 md:h-16 md:top-12 md:left-12"></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold-500/40 md:w-16 md:h-16 md:top-12 md:right-12"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold-500/40 md:w-16 md:h-16 md:bottom-12 md:left-12"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold-500/40 md:w-16 md:h-16 md:bottom-12 md:right-12"></div>

          <div className="hidden md:flex absolute bottom-12 right-12 text-[10px] font-mono text-gold-500/40 flex-col items-end uppercase tracking-widest space-y-1">
            <span>MOD: ARCH_VIS_v2.6</span>
            <span>COORDS: {coords.x} / {coords.y}</span>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-metal-900 via-transparent to-metal-900"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-gold-500/20 rounded-full bg-metal-900/60 backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse"></span>
          <span className="text-gold-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">{CONTACTS.SLOGAN} 2026</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-4 uppercase leading-[0.95] md:leading-[0.9]">
          ИДЕАЛЬНАЯ <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-white to-gold-600">ФИКСАЦИЯ</span>
        </h1>
        
        <p className="text-sm sm:text-lg md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed font-light mx-auto uppercase tracking-widest px-4">
          Архитектурные ограждения <br className="hidden sm:block" />
          <span className="text-white font-black">нового поколения</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-5 md:px-12 md:py-6 bg-xmas-red text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-metal-900 transition-all shadow-xl flex justify-center items-center gap-3 active:scale-95"
          >
            Рассчитать забор 🎁
          </a>
          <a 
            href="#portfolio" 
            className="w-full sm:w-auto px-8 py-5 md:px-12 md:py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-gold-500 hover:text-metal-900 transition-all flex justify-center items-center"
          >
            Каталог работ
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
