import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Forged gates background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-metal-900/70 to-metal-900/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          Кованые Ворота и Заборы <br/>
          <span className="text-gold-500">Любой Сложности</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light">
          Профессиональное изготовление, сварка и монтаж. 
          Работаем по <span className="text-white font-semibold">Ростовской области</span>, 
          <span className="text-white font-semibold"> ДНР</span> и 
          <span className="text-white font-semibold"> ЛНР</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-white text-lg font-bold rounded shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Рассчитать стоимость
          </a>
          <a 
            href="#portfolio" 
            className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-metal-900 text-white text-lg font-bold rounded shadow-lg transition-all duration-300"
          >
            Смотреть работы
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;