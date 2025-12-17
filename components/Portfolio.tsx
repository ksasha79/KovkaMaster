import React, { useState } from 'react';
import { generateGateConcept } from '../services/geminiService';
import { catalogData, CatalogItem } from '../data/catalog';

interface PortfolioProps {
  onOrderClick: (title: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOrderClick }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'gates' | 'fences' | 'decor' | 'welding'>('all');

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
    if (selectedItem) setCurrentImageIndex((prev) => (prev + 1) % selectedItem.gallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) setCurrentImageIndex((prev) => (prev - 1 + selectedItem.gallery.length) % selectedItem.gallery.length);
  };

  const handleGenerate = async () => {
    if (!customPrompt) return;
    setIsGenerating(true);
    setError(null);
    try {
        const image = await generateGateConcept(customPrompt);
        if (image) setGeneratedImage(image);
        else setError('Сервис временно недоступен.');
    } catch (e) { setError('Ошибка генерации.'); }
    finally { setIsGenerating(false); }
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
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['all', 'gates', 'fences', 'decor', 'welding'].map((id) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id as any)}
              className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === id ? 'bg-gold-600 border-gold-600' : 'border-gray-700 text-gray-500'
              }`}
            >
              {id === 'all' ? 'Все работы' : id === 'gates' ? 'Ворота' : id === 'fences' ? 'Заборы' : id === 'decor' ? 'Ковка' : 'Сварка'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={() => openModal(item)} className="group bg-metal-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gold-600/50 transition-all duration-500 cursor-pointer shadow-2xl">
              <div className="relative h-72 overflow-hidden">
                <img src={item.gallery[0].url} alt={item.title} onError={handleImageError} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 left-4 bg-gold-600/90 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{item.location}</div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">{item.title}</h4>
                <div className="text-gold-500 font-black text-lg mb-4">{item.priceStart}</div>
                <div className="flex items-center text-[10px] text-gold-600 font-black uppercase tracking-[0.2em] border-t border-gray-800 pt-6">ПОДРОБНЕЕ →</div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Concept Section */}
        <div className="relative bg-metal-900 rounded-3xl p-10 md:p-16 border border-gold-600/20 overflow-hidden shadow-2xl">
           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase">Ваш проект — <span className="text-gold-500">Ваши правила</span></h3>
                <p className="text-gray-400 mb-8">Опишите, какие ворота вы хотите, и наш ИИ предложит концепт.</p>
                <div className="space-y-4">
                  <textarea
                    className="w-full p-6 bg-metal-800 border border-gray-700 rounded-2xl text-white focus:border-gold-500 outline-none h-40 resize-none text-sm"
                    placeholder="Пример: Ворота в стиле лофт, черные с золотыми вставками..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                  />
                  <button onClick={handleGenerate} disabled={isGenerating || !customPrompt} className="w-full py-5 rounded-xl font-black uppercase tracking-widest bg-gold-600 hover:bg-gold-500 text-white transition-all shadow-lg">
                    {isGenerating ? 'Создаем шедевр...' : 'Сгенерировать эскиз'}
                  </button>
                </div>
              </div>
              <div className="aspect-square bg-metal-800 rounded-2xl border border-dashed border-gray-700 flex items-center justify-center overflow-hidden">
                 {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover" /> : <p className="text-gray-500 text-sm">Результат будет здесь</p>}
              </div>
           </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4" onClick={closeModal}>
          <div className="relative max-w-7xl w-full h-[90vh] flex flex-col md:flex-row gap-8 bg-metal-900 rounded-3xl overflow-hidden border border-gray-800" onClick={e => e.stopPropagation()}>
            <div className="md:w-2/3 relative h-full bg-black group">
               <img src={selectedItem.gallery[currentImageIndex].url} className="w-full h-full object-contain p-4" />
               <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-gold-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
               <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-gold-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
            <div className="md:w-1/3 p-10 flex flex-col justify-between">
               <div>
                  <h3 className="text-3xl font-black text-white mb-6 leading-tight">{selectedItem.title}</h3>
                  <div className="flex gap-4 mb-8">
                     <div className="bg-metal-800 px-4 py-2 rounded-lg border border-gray-700">
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Гарантия</div>
                        <div className="text-gold-500 font-black">2 года</div>
                     </div>
                     <div className="bg-metal-800 px-4 py-2 rounded-lg border border-gray-700">
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Цена от</div>
                        <div className="text-gold-500 font-black">{selectedItem.priceStart}</div>
                     </div>
                  </div>
                  <p className="text-gray-400 italic">"{selectedItem.description}"</p>
               </div>
               <button onClick={() => { onOrderClick(selectedItem.title); closeModal(); }} className="w-full bg-gold-600 hover:bg-gold-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all">ХОЧУ ТАКИЕ ЖЕ</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
