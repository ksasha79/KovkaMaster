import React, { useState } from 'react';
import { generateGateConcept } from '../services/geminiService';
import { catalogData, CatalogItem } from '../data/catalog';

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
    const result = await generateGateConcept(`${selectedItem.title} in the style of ${selectedItem.category}`);
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
    <section id="portfolio" className="py-24 bg-metal-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest">
            Наши <span className="text-gold-500">Работы и Каталог</span>
          </h2>
          <div className="h-1 w-24 bg-gold-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {[
            { id: 'all', label: 'Все' },
            { id: 'concrete', label: 'Еврозаборы' },
            { id: 'gates', label: 'Ворота' },
            { id: 'canopies', label: 'Навесы' },
            { id: 'gazebos', label: 'Беседки' },
            { id: 'shelving', label: 'Стеллажи' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat.id ? 'bg-gold-600 border-gold-600 text-white shadow-xl' : 'border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={() => openModal(item)} className="group bg-metal-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-gold-600/50 transition-all cursor-pointer shadow-2xl flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img src={item.gallery[0].url} alt={item.title} onError={handleImageError} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-gold-600/90 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">{item.location}</div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-black mb-2 group-hover:text-gold-500 transition-colors uppercase">{item.title}</h4>
                  <div className="text-gold-500 font-black text-base mb-4">{item.priceStart}</div>
                </div>
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest border-t border-gray-800 pt-4">
                  ПОДРОБНЕЕ →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10" onClick={closeModal}>
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row bg-metal-900 rounded-3xl overflow-hidden border border-gray-800" onClick={e => e.stopPropagation()}>
            <div className="md:w-3/5 relative min-h-[300px] bg-black group flex items-center justify-center">
               <img src={generatedImg || selectedItem.gallery[currentImageIndex].url} className="w-full h-full object-contain" />
               <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/5 p-3 rounded-full hover:bg-gold-600 transition-all">←</button>
               <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/5 p-3 rounded-full hover:bg-gold-600 transition-all">→</button>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="bg-gold-600 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-gold-500 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    {isGenerating ? "Генерация..." : "✨ ИИ Концепт"}
                  </button>
               </div>
            </div>
            
            <div className="md:w-2/5 p-8 overflow-y-auto">
               <div className="mb-6">
                  <span className="text-gold-500 text-[9px] font-black uppercase tracking-widest block mb-2">{selectedItem.category}</span>
                  <h3 className="text-2xl font-black text-white uppercase mb-4">{selectedItem.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedItem.description}</p>
               </div>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-2 border-b border-gray-800 text-sm">
                    <span className="text-gray-500 uppercase font-bold">Цена</span>
                    <span className="text-gold-500 font-black">{selectedItem.priceStart}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800 text-sm">
                    <span className="text-gray-500 uppercase font-bold">Монтаж</span>
                    <span className="text-white font-bold">от 3 дней</span>
                  </div>
               </div>
               <button onClick={() => { onOrderClick(selectedItem.title); closeModal(); }} className="w-full bg-gold-600 hover:bg-gold-500 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all">Заказать расчет</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
