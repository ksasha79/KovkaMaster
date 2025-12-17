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
    document.body.style.overflow = 'hidden';
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

  const handleGenerate = async () => {
    if (!customPrompt) return;
    setIsGenerating(true);
    setError(null);
    try {
        const image = await generateGateConcept(customPrompt);
        if (image) {
            setGeneratedImage(image);
        } else {
            setError('Сервис временно недоступен. Пожалуйста, попробуйте позже.');
        }
    } catch (e) {
        setError('Ошибка генерации.');
    } finally {
        setIsGenerating(false);
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? catalogData 
    : catalogData.filter(item => item.category === activeCategory);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80"; 
  };

  return (
    <section id="portfolio" className="py-24 bg-metal-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest">
            Каталог <span className="text-gold-500 text-shadow-glow">Проектов</span>
          </h2>
          <div className="h-1 w-24 bg-gold-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto italic">
            "От классических узоров до современного минимализма — каждая деталь имеет значение."
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['all', 'gates', 'fences', 'decor', 'welding'].map((id) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id as any)}
              className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === id
                  ? 'bg-gold-600 border-gold-600 text-white shadow-xl scale-105'
                  : 'border-gray-700 text-gray-500 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              {id === 'all' ? 'Все работы' : id === 'gates' ? 'Ворота' : id === 'fences' ? 'Заборы' : id === 'decor' ? 'Ковка' : 'Сварка'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openModal(item)}
              className="group bg-metal-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gold-600/50 transition-all duration-500 cursor-pointer shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.gallery[0].url} 
                  alt={item.title} 
                  onError={handleImageError}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 bg-gold-600/90 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {item.location}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors tracking-tight">{item.title}</h4>
                </div>
                <div className="text-gold-500 font-black text-lg mb-4">
                  {item.priceStart}
                </div>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2 italic">"{item.description}"</p>
                <div className="flex items-center text-[10px] text-gold-600 font-black uppercase tracking-[0.2em] border-t border-gray-800 pt-6 group-hover:text-white transition-colors">
                   ПОСМОТРЕТЬ ЭТАПЫ РАБОТ <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Concept Section - Enhanced */}
        <div className="relative bg-metal-900 rounded-3xl p-10 md:p-16 border border-gold-600/20 overflow-hidden shadow-[0_0_80px_rgba(197,160,89,0.05)]">
           <div className="absolute top-0 right-0 p-4">
              <span className="text-gold-600/20 font-black text-8xl select-none">AI</span>
           </div>
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
                  Ваш проект — <br/><span className="text-gold-500">Ваши правила</span>
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Не ограничивайтесь готовыми каталогами. Наш ИИ-дизайнер Max создаст уникальный концепт специально для вашего участка. Просто опишите, что вы хотите видеть.
                </p>
                <div className="space-y-4">
                  <textarea
                    className="w-full p-6 bg-metal-800 border border-gray-700 rounded-2xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition h-40 resize-none shadow-inner text-sm"
                    placeholder="Пример: Современные ворота в стиле лофт, вертикальные ламели, черная матовая сталь, золотая вставка по центру..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !customPrompt}
                    className={`w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                      isGenerating 
                        ? 'bg-gray-800 cursor-not-allowed text-gray-500' 
                        : 'bg-gold-600 hover:bg-gold-500 text-white shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:-translate-y-1'
                    }`}
                  >
                    {isGenerating ? 'Создаем шедевр...' : 'Сгенерировать эскиз'}
                  </button>
                </div>
              </div>

              <div className="aspect-square bg-metal-800 rounded-2xl border border-dashed border-gray-700 flex items-center justify-center overflow-hidden relative group shadow-2xl">
                 {generatedImage ? (
                   <img src={generatedImage} alt="AI Concept" className="w-full h-full object-cover animate-fade-in" />
                 ) : (
                   <div className="text-center px-10">
                      <div className="w-20 h-20 bg-metal-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
                         <span className="text-3xl">🎨</span>
                      </div>
                      <p className="text-gray-500 text-sm font-medium">Введите описание слева, чтобы увидеть визуализацию вашего будущего заказа</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* FULL SCREEN MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 animate-fade-in" onClick={closeModal}>
          <button onClick={closeModal} className="absolute top-6 right-6 text-white/50 hover:text-gold-500 transition-colors z-[110]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="relative max-w-7xl w-full h-[90vh] flex flex-col md:flex-row gap-8 bg-metal-900 rounded-3xl overflow-hidden border border-gray-800" onClick={e => e.stopPropagation()}>
            {/* Gallery Side */}
            <div className="md:w-2/3 relative h-full bg-black group">
               <img 
                 src={selectedItem.gallery[currentImageIndex].url} 
                 className="w-full h-full object-contain p-4"
               />
               <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-gold-600 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
               <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-gold-600 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
               
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                  {selectedItem.gallery.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${currentImageIndex === i ? 'w-8 bg-gold-600' : 'w-2 bg-white/30'}`}></div>
                  ))}
               </div>
            </div>

            {/* Info Side */}
            <div className="md:w-1/3 p-10 flex flex-col justify-between border-l border-gray-800">
               <div>
                  <div className="text-gold-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Детали проекта</div>
                  <h3 className="text-3xl font-black text-white mb-6 leading-tight">{selectedItem.title}</h3>
                  <div className="flex items-center gap-4 mb-8">
                     <div className="bg-metal-800 px-4 py-2 rounded-lg border border-gray-700">
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Стоимость</div>
                        <div className="text-gold-500 font-black">{selectedItem.priceStart}</div>
                     </div>
                     <div className="bg-metal-800 px-4 py-2 rounded-lg border border-gray-700">
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Город</div>
                        <div className="text-white font-bold">{selectedItem.location}</div>
                     </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed italic">"{selectedItem.description}"</p>
                  
                  <div className="mt-10 space-y-4">
                     <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Этап на фото:</div>
                     <div className="text-xl font-bold text-white border-l-2 border-gold-600 pl-4">
                        {selectedItem.gallery[currentImageIndex].label}
                     </div>
                  </div>
               </div>

               <a 
                 href="#contact" 
                 onClick={closeModal}
                 className="w-full bg-gold-600 hover:bg-gold-500 text-white text-center py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-gold-600/20 active:scale-95"
               >
                 ХОЧУ ТАКИЕ ЖЕ
               </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
