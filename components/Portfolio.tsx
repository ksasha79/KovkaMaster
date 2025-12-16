import React, { useState } from 'react';
import { generateGateConcept } from '../services/geminiService';
import { catalogData, CatalogItem } from '../data/catalog';

const Portfolio: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'gates' | 'fences' | 'decor' | 'welding'>('all');

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

  // Fallback image in case user provides a wrong path
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80"; // Generic metal texture
    e.currentTarget.alt = "Изображение недоступно";
  };

  return (
    <section id="portfolio" className="py-20 bg-metal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
            Каталог <span className="text-gold-500">Наших Работ</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Выберите категорию, чтобы посмотреть примеры
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
            <div key={item.id} className="group bg-metal-900 rounded-lg overflow-hidden shadow-xl border border-gray-700 hover:border-gold-500/50 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={handleImageError}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                <button className="text-sm font-bold text-gold-500 hover:text-white transition uppercase tracking-wider flex items-center">
                  Хочу такие <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Generator Section */}
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
    </section>
  );
};

export default Portfolio;
