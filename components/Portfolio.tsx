import React, { useState } from 'react';
import { generateGateConcept } from '../services/geminiService.ts';
import { catalogData, CatalogItem } from '../data/catalog.ts';

interface PortfolioProps {
  onOrderClick: (title: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOrderClick }) => {
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CatalogItem['category'] | 'all'>('all');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const openModal = (item: CatalogItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setGeneratedImg(null);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const handleAiGenerate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem || isGenerating) return;
    
    setIsGenerating(true);
    const result = await generateGateConcept(`${selectedItem.title} в стиле ${selectedItem.category}`);
    if (result) {
      setGeneratedImg(result);
    }
    setIsGenerating(false);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) setCurrentImageIndex((prev) => (prev + 1) % selectedItem.gallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) setCurrentImageIndex((prev) => (prev - 1 + selectedItem.gallery.length) % selectedItem.gallery.length);
  };

  const filteredItems = activeCategory === 'all' 
    ? catalogData 
    : catalogData.filter(item => item.category === activeCategory);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80"; 
  };

  return (
    <section id="portfolio" className="py-20 bg-brand-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Наши <span className="text-gold">Работы</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-12 pb-4 justify-start md:justify-center px-4">
          {[
            { id: 'all', label: 'Все' },
            { id: 'concrete', label: 'Бетон' },
            { id: 'gates', label: 'Ворота' },
            { id: 'canopies', label: 'Навесы' },
            { id: 'gazebos', label: 'Беседки' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat.id ? 'bg-brand-gold border-brand-gold text-black shadow-xl' : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={() => openModal(item)} className="group bg-brand-grey/30 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all cursor-pointer flex flex-col h-full shadow-lg">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={item.gallery[0].url} alt={item.title} onError={handleImageError} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-brand-gold text-black text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{item.location}</div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-black mb-1 group-hover:text-brand-gold transition-colors uppercase leading-tight">{item.title}</h4>
                  <div className="text-brand-gold font-black text-base mb-4">{item.priceStart}</div>
                </div>
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest border-t border-white/5 pt-4 flex justify-between items-center">
                  <span>Детали проекта</span>
                  <span className="text-brand-gold text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 overflow-y-auto overflow-x-hidden" onClick={closeModal}>
          <div className="relative max-w-5xl w-full flex flex-col lg:flex-row bg-brand-dark rounded-2xl overflow-hidden border border-white/10 my-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="lg:w-3/5 relative min-h-[300px] sm:min-h-[400px] bg-black flex items-center justify-center shrink-0">
               <img src={generatedImg || selectedItem.gallery[currentImageIndex].url} className="w-full h-full object-contain" />
               <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-brand-gold hover:text-black transition-all">←</button>
               <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-brand-gold hover:text-black transition-all">→</button>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
                  <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="bg-brand-gold text-black px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                  >
                    {isGenerating ? "ИИ Думает..." : "✨ ИИ Дизайн"}
                  </button>
               </div>
            </div>
            
            <div className="lg:w-2/5 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto max-h-[50vh] lg:max-h-full">
               <div className="mb-6">
                  <span className="text-brand-gold text-[9px] font-black uppercase tracking-[0.2em] block mb-2">{selectedItem.category}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase mb-3 leading-tight">{selectedItem.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">{selectedItem.description}</p>
               </div>
               <div className="space-y-3 mb-8">
                  <div className="flex justify-between py-2 border-b border-white/5 text-[10px]">
                    <span className="text-gray-500 uppercase font-bold tracking-widest">Цена</span>
                    <span className="text-brand-gold font-black">{selectedItem.priceStart}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5 text-[10px]">
                    <span className="text-gray-500 uppercase font-bold tracking-widest">Срок</span>
                    <span className="text-white font-bold">от 3 дней</span>
                  </div>
               </div>
               <button onClick={() => { onOrderClick(selectedItem.title); closeModal(); }} className="w-full btn-gold py-4 rounded-xl font-black text-[10px] active:scale-95 transition-transform">Заказать расчет</button>
               <button onClick={closeModal} className="w-full mt-4 text-gray-500 uppercase text-[9px] font-black tracking-widest">Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
