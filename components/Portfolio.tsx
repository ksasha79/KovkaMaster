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

        {/* Фильтры по категориям */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto">
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
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat.id ? 'bg-gold-600 border-gold-600 text-white shadow-xl' : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={() => openModal(item)} className="group bg-metal-900 rounded-[2.5rem] overflow-hidden border border-gray-800 hover:border-gold-600/50 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col h-full">
              <div className="relative h-72 overflow-hidden">
                <img src={item.gallery[0].url} alt={item.title} onError={handleImageError} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 bg-gold-600/90 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">{item.location}</div>
              </div>
              <div className="p-10 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-black mb-3 group-hover:text-gold-500 transition-colors uppercase leading-tight">{item.title}</h4>
                  <div className="text-gold-500 font-black text-lg mb-6">{item.priceStart}</div>
                </div>
                <div className="flex items-center text-[10px] text-gray-500 group-hover:text-gold-600 font-black uppercase tracking-[0.2em] border-t border-gray-800 pt-6 transition-colors">
                  СМОТРЕТЬ ДЕТАЛИ →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4" onClick={closeModal}>
          <div className="relative max-w-7xl w-full h-[90vh] flex flex-col md:flex-row gap-8 bg-metal-900 rounded-[3rem] overflow-hidden border border-gray-800 shadow-[0_0_100px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
            <div className="md:w-2/3 relative h-full bg-black group">
               <img src={selectedItem.gallery[currentImageIndex].url} className="w-full h-full object-contain p-4" />
               <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-md p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-gold-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
               <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-md p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-gold-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
            <div className="md:w-1/3 p-12 flex flex-col justify-between overflow-y-auto">
               <div>
                  <div className="inline-block px-3 py-1 bg-gold-600/10 rounded-md mb-6">
                    <span className="text-gold-500 text-[10px] font-black uppercase tracking-widest">Категория: {selectedItem.category}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-8 leading-none uppercase">{selectedItem.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10">{selectedItem.description}</p>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between items-center py-4 border-b border-gray-800">
                        <span className="text-xs uppercase text-gray-500 font-bold">Ориентировочно</span>
                        <span className="text-gold-500 font-black">{selectedItem.priceStart}</span>
                     </div>
                     <div className="flex justify-between items-center py-4 border-b border-gray-800">
                        <span className="text-xs uppercase text-gray-500 font-bold">Срок готовности</span>
                        <span className="text-white font-bold">от 3-х дней</span>
                     </div>
                  </div>
               </div>
               <div className="mt-12 space-y-4">
                  <button onClick={() => { onOrderClick(selectedItem.title); closeModal(); }} className="w-full bg-gold-600 hover:bg-gold-500 text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95">Заказать расчет</button>
                  <button onClick={closeModal} className="w-full text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Вернуться к списку</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
