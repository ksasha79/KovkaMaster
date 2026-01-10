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

  return (
    <section id="portfolio" className="py-32 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] mb-4">Наше портфолио</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            ВЫПОЛНЕННЫЕ <span className="text-gold">ПРОЕКТЫ</span>
          </h3>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {['all', 'concrete', 'gates', 'canopies', 'gazebos'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat ? 'bg-brand-gold border-brand-gold text-black shadow-xl' : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {cat === 'all' ? 'Все' : cat === 'concrete' ? 'Бетон' : cat === 'gates' ? 'Ворота' : cat === 'canopies' ? 'Навесы' : 'Беседки'}
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
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.gallery[0].url} 
                  alt={`${item.title} — ${item.category} от завода Евро-Заборы, ${item.location}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6 bg-brand-gold text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {item.location}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-4 block opacity-60">
                  {item.category === 'concrete' ? 'Бетонный забор' : item.category === 'gates' ? 'Ворота' : 'Конструкция'}
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

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="relative max-w-6xl w-full flex flex-col md:flex-row bg-brand-dark rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Gallery Side */}
            <div className="md:w-3/5 relative min-h-[400px] bg-black group/modal">
               <img 
                 src={generatedImg || selectedItem.gallery[currentImageIndex].url} 
                 alt={`${selectedItem.title} - фото выполненного проекта`}
                 className="w-full h-full object-contain"
               />
               
               <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover/modal:opacity-100 transition-opacity">
                  <button onClick={prevImage} className="w-14 h-14 bg-black/50 hover:bg-brand-gold hover:text-black rounded-full flex items-center justify-center transition-all text-xl" aria-label="Предыдущее фото">←</button>
                  <button onClick={nextImage} className="w-14 h-14 bg-black/50 hover:bg-brand-gold hover:text-black rounded-full flex items-center justify-center transition-all text-xl" aria-label="Следующее фото">→</button>
               </div>

               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-12 flex flex-col items-center gap-4">
                  <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="bg-brand-gold text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-2xl"
                  >
                    {isGenerating ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                        Нейросеть генерирует...
                      </>
                    ) : (
                      <>✨ Создать альтернативу ИИ</>
                    )}
                  </button>
               </div>
            </div>
            
            {/* Content Side */}
            <div className="md:w-2/5 p-16 flex flex-col justify-center">
               <div className="mb-10">
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] block mb-4">{selectedItem.category}</span>
                  <h3 className="text-4xl font-black text-white uppercase mb-6 leading-tight">{selectedItem.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">{selectedItem.description}</p>
               </div>
               
               <div className="space-y-6 mb-12">
                  <div className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Цена проекта</span>
                    <span className="text-brand-gold font-black text-xl">{selectedItem.priceStart}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Локация</span>
                    <span className="text-white font-bold">{selectedItem.location}</span>
                  </div>
               </div>

               <button 
                 onClick={() => { onOrderClick(selectedItem.title); closeModal(); }}
                 className="w-full btn-gold py-6 rounded-2xl font-black text-[10px] tracking-widest"
               >
                 Заказать такой же расчет
               </button>
               
               <button onClick={closeModal} className="w-full mt-6 text-gray-500 hover:text-white uppercase text-[10px] font-black tracking-widest transition-colors">
                 Закрыть просмотр
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
