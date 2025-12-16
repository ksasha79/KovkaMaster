import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Список фоновых изображений (файлы должны лежать в public/images/)
  const backgroundImages = [
    '/images/master1.jpg',
    '/images/master2.jpg'
  ];

  useEffect(() => {
    // Меняем картинку каждые 6 секунд
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-metal-900">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt="Forged gates background" 
              className="w-full h-full object-cover"
              // Добавляем запасную картинку, если master1/2 еще не загружены
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1622372658604-0373df45f22e?q=80&w=1920&auto=format&fit=crop";
              }}
            />
          </div>
        ))}
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-metal-900/60 to-metal-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl">
          Кованые Ворота и Заборы <br/>
          <span className="text-gold-500">Любой Сложности</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light drop-shadow-md">
          Профессиональное изготовление, сварка и монтаж. 
          Работаем по <span className="text-white font-semibold border-b border-gold-500">Ростовской области</span>, 
          <span className="text-white font-semibold border-b border-gold-500 ml-1">ДНР</span> и 
          <span className="text-white font-semibold border-b border-gold-500 ml-1">ЛНР</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-white text-lg font-bold rounded shadow-lg shadow-gold-600/20 transform hover:scale-105 transition-all duration-300"
          >
            Рассчитать стоимость
          </a>
          <a 
            href="#portfolio" 
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-metal-900 text-white text-lg font-bold rounded shadow-lg transition-all duration-300"
          >
            Смотреть работы
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
