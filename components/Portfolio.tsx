import React, { useState, useEffect } from 'react';
import { generateGateConcept } from '../services/geminiService';
import { catalogData, CatalogItem } from '../data/catalog';

const Portfolio: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'gates' | 'fences' | 'decor' | 'welding'>('all');

  // Modal State
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (item: CatalogItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.gallery.length) % selectedItem.gallery.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const handleGenerate = async () => {
    if (!customPrompt) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
        const image = await generateGateConcept(customPrompt);
        if (image) {
            setGeneratedImage(image);
        } else {
            setError('Сервис временно перегружен или недоступен. Пожалуйста, попробуйте позже.');
        }
    } catch (e) {
        console.error(e);
        setError('Ошибка соединения. Проверьте интернет.');
    } finally {
        setIsGenerating(false);
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? catalogData 
    : catalogData.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Все работы' },
    { id: 'gates', label: 'Ворота' },
    { id: 'fences', label: 'Заборы' },
    { id: 'decor', label: 'Худ. Ковка' },
    { id: 'welding', label: 'Сварка и Монтаж' },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80"; 
  };

  return (
    <section id="portfolio" className="py-20 bg-metal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
            Каталог <span className="text-gold-500">Наших Работ</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Нажмите на карточку, чтобы посмотреть этапы работ (Эскиз → Процесс → Результат)
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold-600 border-gold-600 text-white shadow-lg shadow-gold-500/20'
                  : 'bg-transparent border-gray-600 text-gray-400 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openModal(item)}
              className="group bg-metal-900 rounded-lg overflow-hidden shadow-xl border border-gray-700 hover:border-gold-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.gallery[0].url} 
                  alt={item.title} 
                  onError={handleImageError}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   {item.gallery.length} фото
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-gold-600 text-white px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold text-sm shadow-lg">
                        Смотреть процесс
                    </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center text-xs text-gold-500 font-bold uppercase tracking-wider">
                   Подробнее <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Generator Section (Unchanged) */}
        <div className="bg-gradient-to-br from-metal-900 to-black rounded-2xl p-8 border border-gold-600/30 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">
              Не нашли то, что искали? <span className="text-gold-500">Спроектируйте сами!</span>
            </h3>
            <p className="text-gray-400 mt-2">
              Опишите идею, и наш ИИ нарисует эскиз ваших будущих ворот за 10 секунд.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
               <label className="block text-sm text-gold-500 font-bold uppercase">Ваша идея</label>
               <textarea
                  className="w-full p-4 bg-metal-800 border border-gray-600 rounded-lg text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition h-40 resize-none"
                  placeholder="Пример: Двустворчатые ворота в готическом стиле, цвет черный графит, пики наверху, посередине герб..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !customPrompt}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center ${
                    isGenerating 
                      ? 'bg-gray-700 cursor-not-allowed' 
                      : 'bg-gold-600 hover:bg-gold-500 text-white shadow-lg hover:shadow-gold-500/20'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Рисуем эскиз...
                    </>
                  ) : 'Сгенерировать'}
                </button>
            </div>

            <div className="flex items-center justify-center bg-metal-800 rounded-lg border-2 border-dashed border-gray-700 min-h-[300px] h-full overflow-hidden relative group">
              {generatedImage ? (
                <div className="relative w-full h-full animate-fade-in">
                    <img src={generatedImage} alt="AI Generated Gate" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <a href={generatedImage} download="my-gate-concept.png" className="text-white underline text-sm hover:text-gold-500">Скачать эскиз</a>
                    </div>
                </div>
              ) : (
                <div className="text-center p-6">
                    {error ? (
                        <div className="text-red-400">
                            <span className="text-4xl block mb-2">⚠️</span>
                            <p className="text-sm">{error}</p>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <span className="text-5xl block mb-4 opacity-30">🎨</span>
                            <p>Здесь появится изображение</p>
                        </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in" onClick={closeModal}>
          
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 z-50 transition"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            
            {/* Main Image Area */}
            <div className="relative w-full h-[60vh] md:h-[70vh] mb-4 group">
               <img 
                 src={selectedItem.gallery[currentImageIndex].url} 
                 alt={selectedItem.gallery[currentImageIndex].label}
                 onError={handleImageError}
                 className="w-full h-full object-contain"
               />
               
               {/* Nav Buttons */}
               <button 
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gold-600 text-white p-3 rounded-full transition transform hover:scale-110"
               >
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
               <button 
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gold-600 text-white p-3 rounded-full transition transform hover:scale-110"
               >
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>

               {/* Caption Label */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-6 py-2 rounded-full border border-gray-600">
                  <span className="text-gold-500 font-bold uppercase tracking-widest text-sm md:text-base">
                    {selectedItem.gallery[currentImageIndex].label}
                  </span>
               </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="w-full overflow-x-auto flex space-x-2 md:space-x-4 pb-2 justify-center px-2">
              {selectedItem.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx ? 'border-gold-500 scale-105 shadow-lg shadow-gold-500/30' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] md:text-[10px] text-white text-center py-1 truncate px-1">
                    {img.label}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center mt-4">
               <h3 className="text-2xl font-bold text-white mb-1">{selectedItem.title}</h3>
               <p className="text-gray-400 text-sm">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
