import React from 'react';
import { CONTACTS } from '../config.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-winter-dark">
      {/* Aurora Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[60%] bg-brand-gold/10 blur-[150px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full winter-glass border-brand-gold/30 mb-8">
          <span className="text-xl">🎄</span>
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-gold">
            ИП, верни мне мой новогодний сайт!
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter mb-8">
          ЗИМНЯЯ <br/> <span className="text-gold">СКАЗКА</span> <br/>
          <span className="text-4xl md:text-6xl festive-font text-white lowercase">от Евро-Заборов</span>
        </h1>
        
        <p className="text-blue-100/70 text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          Дарим праздничное настроение и надежную защиту вашего дома. <br/>
          Уникальные скидки на зимний монтаж и подарки каждому клиенту до конца января!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#contact" className="btn-new-year px-12 py-6 text-sm flex items-center gap-3">
             Забрать подарок 🎁
          </a>
          <a href="#portfolio" className="px-12 py-6 winter-glass font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all text-[10px] flex items-center gap-3">
             Наши работы ❄️
          </a>
        </div>

        <div className="mt-20 flex justify-center gap-8 opacity-60">
           <img src="https://www.svgrepo.com/show/295475/christmas-tree.svg" className="w-12 h-12 grayscale invert" alt="tree" />
           <img src="https://www.svgrepo.com/show/295477/santa-claus.svg" className="w-12 h-12 grayscale invert" alt="santa" />
           <img src="https://www.svgrepo.com/show/295471/reindeer.svg" className="w-12 h-12 grayscale invert" alt="reindeer" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
