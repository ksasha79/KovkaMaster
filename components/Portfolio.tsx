import React, { useState } from 'react';
import { generateGateConcept } from '../services/geminiService';

const Portfolio: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  // Static placeholders for "Real" work examples (using Picsum for demo)
  const portfolioItems = [
    { id: 1, src: "https://picsum.photos/400/300?random=1", title: "Ворота 'Классика'", type: "Ворота" },
    { id: 2, src: "https://picsum.photos/400/300?random=2", title: "Забор с пиками", type: "Забор" },
    { id: 3, src: "https://picsum.photos/400/300?random=3", title: "Козырек кованый", type: "Навес" },
    { id: 4, src: "https://picsum.photos/400/300?random=4", title: "Откатные ворота", type: "Ворота" },
  ];

  const handleGenerate = async () => {
    if (!customPrompt) return;
    
    setIsGenerating(true);
    try {
        // In a real app, you wouldn't expose this button if API key isn't there, 
        // but for this demo code we assume env var is set or handled.
        const image = await generateGateConcept(customPrompt);
        if (image) {
            setGeneratedImage(image);
        } else {
            alert('Не удалось сгенерировать. Проверьте API ключ (в коде) или попробуйте позже.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-metal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
            Наши <span className="text-gold-500">Работы</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Реальные примеры и возможности индивидуального дизайна
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3">
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-gold-500">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Generator Section */}
        <div className="bg-metal-900 rounded-xl p-8 border border-gold-600/30 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-gold-500">AI</span> Конструктор Дизайна
              </h3>
              <p className="text-gray-400 mb-6">
                Не нашли подходящий вариант? Опишите ворота вашей мечты, и искусственный интеллект создаст эскиз специально для вас прямо сейчас.
              </p>
              
              <div className="space-y-4">
                <textarea
                  className="w-full p-4 bg-metal-800 border border-gray-600 rounded text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition"
                  rows={3}
                  placeholder="Например: Массивные черные ворота с золотыми львами и виноградной лозой, стиль барокко..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !customPrompt}
                  className={`w-full py-3 rounded font-bold text-lg transition-all ${
                    isGenerating 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gold-600 hover:bg-gold-500 text-white shadow-lg hover:shadow-gold-500/20'
                  }`}
                >
                  {isGenerating ? 'Создаем дизайн...' : 'Сгенерировать Образец'}
                </button>
                <p className="text-xs text-gray-500 italic">
                  *Требуется настройка API ключа в коде для работы генерации.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-[300px] bg-metal-800 rounded-lg border-2 border-dashed border-gray-700">
              {generatedImage ? (
                <div className="relative w-full h-full">
                    <img src={generatedImage} alt="AI Generated Gate" className="w-full h-full object-cover rounded shadow-lg" />
                    <span className="absolute top-2 right-2 bg-gold-600 text-xs text-white px-2 py-1 rounded">AI Concept</span>
                </div>
              ) : (
                <div className="text-center p-6">
                    <span className="text-4xl block mb-2">✨</span>
                    <p className="text-gray-500">Здесь появится ваш эскиз</p>
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