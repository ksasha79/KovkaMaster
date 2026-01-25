import React, { useState } from 'react';
import { generateGateConcept } from '../services/geminiService.ts';
import { catalogData, CatalogItem, CategoryType } from '../data/catalog.ts';

interface PortfolioProps {
  onOrderClick: (title: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOrderClick }) => {
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const openModal = (item: CatalogItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setGeneratedImg(null);
  };

  const closeModal = () => setSelectedItem(null);

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

  const categoryLabels: Record<CategoryType | 'all', string> = {
    all: 'Все работы',
    'prof-sheet': 'Забор из проф листа',
    'picket-3d': 'Забор из 3Д штакета',
    'mesh-3d': 'Забор из 3Д сетки',
    'chain-link': 'Забор из сетки рабицы',
    'jalousie': 'Забор из жалюзи',
    'canopies-terraces': 'Навесы и террасы'
  };

  return (
    <section id="portfolio" className="py-32 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] mb-4">Наше портфолио</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            ВЫПОЛНЕННЫЕ <span className="text-gold">ПРОЕКТЫ</span>
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {(['all', 'prof-sheet', 'picket-3d', 'mesh-3d', 'chain-link', 'jalousie', 'canopies-terraces'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat ? 'bg-brand-gold border-brand-gold text-black shadow-xl' : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openModal(item)}
              className="group bg-brand-grey/30 rounded-[2rem] overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-72 overflow-hidden bg-brand-grey">
                <img 
                  src={item.gallery[0].url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1510511459019-5dee997d7db4?q=80&w=1000&auto=format&fit=crop"; 
                  }}
                />
                <div className="absolute top-6 left-6 bg-brand-gold text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {item.location}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-4 block opacity-60">
                  {categoryLabels[item.category]}
                </span>
                <h4 className="text-2xl font-black mb-4 group-hover:text-brand-gold transition-colors uppercase leading-tight">
                  {item.title}
                </h4>
                <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                  <span className="text-white font-black">{item.priceStart}</span>
                  <span className="text-brand-gold text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6" onClick={closeModal}>
          <div className="relative max-w-6xl w-full flex flex-col md:flex-row bg-brand-black rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="md:w-3/5 relative min-h-[400px] bg-black group/modal">
               <img 
                 src={generatedImg || selectedItem.gallery[currentImageIndex].url} 
                 alt={selectedItem.title}
                 className="w-full h-full object-contain"
                 onError={(e) => { 
                   (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1510511459019-5dee997d7db4?q=80&w=1000&auto=format&fit=crop"; 
                 }}
               />
               
               <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover/modal:opacity-100 transition-opacity">
                  <button onClick={prevImage} className="w-12 h-12 bg-black/50 hover:bg-brand-gold hover:text-black rounded-full flex items-center justify-center transition-all">←</button>
                  <button onClick={nextImage} className="w-12 h-12 bg-black/50 hover:bg-brand-gold hover:text-black rounded-full flex items-center justify-center transition-all">→</button>
               </div>

               <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="bg-brand-gold text-black px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    {isGenerating ? 'Генерация...' : '✨ Визуализировать ИИ'}
                  </button>
               </div>
            </div>
            
            <div className="md:w-2/5 p-12 flex flex-col justify-center">
               <div className="mb-8">
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] block mb-4">{categoryLabels[selectedItem.category]}</span>
                  <h3 className="text-3xl font-black text-white uppercase mb-6">{selectedItem.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{selectedItem.description}</p>
               </div>
               
               <div className="space-y-4 mb-10">
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-gray-500 uppercase text-[10px] font-bold">Цена</span>
                    <span className="text-brand-gold font-black">{selectedItem.priceStart}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-gray-500 uppercase text-[10px] font-bold">Город</span>
                    <span className="text-white font-bold text-xs">{selectedItem.location}</span>
                  </div>
               </div>

               <button 
                 onClick={() => { onOrderClick(selectedItem.title); closeModal(); }}
                 className="w-full btn-gold py-5 rounded-xl font-black text-[10px] tracking-widest"
               >
                 Заказать расчет
               </button>
               <button onClick={closeModal} className="w-full mt-4 text-gray-500 hover:text-white uppercase text-[9px] font-black tracking-widest transition-colors">
                 Закрыть
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
