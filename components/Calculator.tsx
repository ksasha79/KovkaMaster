import React, { useState, useEffect, useMemo } from 'react';
import { CONTACTS } from '../config';

type FenceType = {
  id: string;
  name: string;
  price: number;
  icon: string;
  desc: string;
};

const FENCE_TYPES: FenceType[] = [
  { id: 'mesh', name: '3D Сетка Gitter', price: 1200, icon: '🌐', desc: 'Прозрачность и прочность' },
  { id: 'jalousie', name: 'Забор Жалюзи', price: 3800, icon: '📊', desc: 'Приватность и стиль' },
  { id: 'brick', name: 'Кирпич + Лента', price: 12000, icon: '🧱', desc: 'Капитальное решение' },
  { id: 'rabica', name: 'Сетка Рабица', price: 850, icon: '⛓️', desc: 'Эконом вариант' },
];

const Calculator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('jalousie');
  const [length, setLength] = useState<number>(50);
  const [includeGates, setIncludeGates] = useState<boolean>(false);
  const [includeAutomation, setIncludeAutomation] = useState<boolean>(false);
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const currentType = useMemo(() => 
    FENCE_TYPES.find(t => t.id === selectedType) || FENCE_TYPES[1]
  , [selectedType]);

  const totalPrice = useMemo(() => {
    let total = currentType.price * length;
    if (includeGates) total += 25000;
    if (includeAutomation) total += 35000;
    return total;
  }, [currentType, length, includeGates, includeAutomation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const message = `КАЛЬКУЛЯТОР:
Тип: ${currentType.name}
Длина: ${length} м.п.
Допы: ${includeGates ? 'Ворота (+)' : ''} ${includeAutomation ? 'Автоматика (+)' : ''}
Предварительная цена: ${totalPrice.toLocaleString()} руб.`;

    try {
      await fetch('/api/handler.php?action=contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          length: length.toString(),
          message: message
        }),
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <section id="calculator" className="py-32 bg-brand-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Инженерный расчет</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            УЗНАЙТЕ СТОИМОСТЬ <span className="text-gold">ЗА 1 МИНУТУ</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Левая часть: Выбор параметров */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Тип забора */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">1. Выберите тип ограждения</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {FENCE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center gap-6 p-6 rounded-3xl border transition-all text-left ${
                      selectedType === type.id 
                      ? 'bg-brand-gold border-brand-gold text-black shadow-xl shadow-brand-gold/20' 
                      : 'bg-brand-grey/50 border-white/5 text-white hover:border-white/20'
                    }`}
                  >
                    <span className="text-4xl">{type.icon}</span>
                    <div>
                      <div className="font-black uppercase text-sm">{type.name}</div>
                      <div className={`text-[10px] font-bold ${selectedType === type.id ? 'text-black/60' : 'text-gray-500'}`}>
                        {type.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Длина с ползунком */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">2. Длина участка</h3>
                <div className="text-4xl font-black text-brand-gold">
                  {length} <span className="text-sm font-bold text-gray-600 uppercase">метров</span>
                </div>
              </div>
              <div className="relative pt-6">
                <input 
                  type="range" 
                  min="1" 
                  max="200" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-3 bg-brand-grey rounded-full appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between mt-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">
                  <span>1 м</span>
                  <span>100 м</span>
                  <span>200 м</span>
                </div>
              </div>
            </div>

            {/* Дополнительно */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">3. Дополнительные опции</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIncludeGates(!includeGates)}
                  className={`px-8 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    includeGates ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/40'
                  }`}
                >
                  {includeGates ? '✓ Ворота и калитка' : '+ Добавить ворота'}
                </button>
                <button 
                  onClick={() => setIncludeAutomation(!includeAutomation)}
                  className={`px-8 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    includeAutomation ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/40'
                  }`}
                >
                  {includeAutomation ? '✓ Автоматика' : '+ Добавить автоматику'}
                </button>
              </div>
            </div>

          </div>

          {/* Правая часть: Итого и форма */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-brand-grey/80 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl">
              <div className="mb-10 pb-10 border-b border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 block">Предварительный итог:</span>
                <div className="text-5xl font-black text-white tracking-tighter mb-2">
                  {totalPrice.toLocaleString()} <span className="text-xl text-brand-gold">₽</span>
                </div>
                <p className="text-[9px] text-gray-600 font-black uppercase leading-relaxed">
                  *Включает заводскую цену забора и стандартный монтаж в Воронеже.
                </p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-6 animate-fade-in">
                  <div className="text-4xl mb-4">✨</div>
                  <div className="text-sm font-black uppercase text-brand-gold">Заявка в очереди!</div>
                  <p className="text-[10px] text-gray-500 mt-2">Инженер перезвонит вам с точными цифрами.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required
                    placeholder="Ваше имя"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-all text-xs"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-all text-xs"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                  <button 
                    disabled={status === 'sending'}
                    className="w-full btn-gold py-5 rounded-2xl text-[10px] shadow-2xl shadow-brand-gold/20"
                  >
                    {status === 'sending' ? 'Загрузка...' : 'Закрепить скидку завода'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;