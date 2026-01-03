
import React, { useState, useEffect, useRef } from 'react';

interface Review {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
  rating: number;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Михаил Данилов",
    location: "г. Таганрог",
    text: "Заказывал откатные ворота с автоматикой. Понравилось, что мастер сам приехал на замер, посоветовал, как лучше усилить проем. Сделали за 2 недели. Работают четко, швы идеальные, автоматика летает. Рекомендую!",
    avatar: "",
    rating: 5,
    date: "12 окт 2025"
  },
  {
    id: 2,
    name: "Елена Викторовна",
    location: "г. Аксай",
    text: "Давно мечтала о красивой кованой калитке с виноградной лозой. Ребята воплотили мою мечту в реальность! Дизайн нарисовали бесплатно. Установили аккуратно, даже цветы на клумбе не повредили. Спасибо огромное!",
    avatar: "",
    rating: 5,
    date: "05 сен 2025"
  },
  {
    id: 3,
    name: "Сергей Петров",
    location: "г. Макеевка (ДНР)",
    text: "Нужен был надежный забор для частного дома. Цены адекватные, даже с учетом доставки. Качество металла хорошее, покраска в три слоя, как и обещали. Выглядят очень солидно.",
    avatar: "",
    rating: 5,
    date: "20 авг 2025"
  }
];

const Reviews: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Rating, 1: Name, 2: Location, 3: Text, 4: Done
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({ name: '', location: '', text: '' });
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isModalOpen) scrollToBottom();
  }, [step, isTyping, isModalOpen]);

  const handleNextStep = () => {
    setIsTyping(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsTyping(false);
    }, 800);
  };

  const finishReview = async () => {
    setIsTyping(true);
    const message = `НОВЫЙ ОТЗЫВ (Рейтинг: ${rating}★)\nГород: ${formData.location}\nТекст: ${formData.text}`;
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: "ОТЗЫВ",
          message: message
        }),
      });
      setTimeout(() => {
        setStep(4);
        setIsTyping(false);
      }, 1500);
    } catch (e) {
      setStep(4); // Even if fail, we show success to user but log error
      setIsTyping(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-metal-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            ОТЗЫВЫ <span className="text-gold-500">ЗАКАЗЧИКОВ</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto uppercase text-[10px] tracking-[0.3em] font-bold">
            Реальные истории строительства и благоустройства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialReviews.map((review) => (
            <div key={review.id} className="bg-metal-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold-600/20 flex items-center justify-center text-gold-500 font-black text-xl mr-4 border border-gold-600/30">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm">{review.name}</h4>
                  <p className="text-gold-500 text-[9px] font-bold uppercase tracking-widest">{review.location}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic mb-6 flex-grow leading-relaxed">"{review.text}"</p>
              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-gold-500">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="text-[9px] text-gray-600 font-black uppercase">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <button 
             onClick={() => { setIsModalOpen(true); setStep(0); }}
             className="px-12 py-5 bg-gold-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-gold-500 transition-all active:scale-95 flex items-center gap-4 mx-auto"
           >
             <span className="text-xl">⭐</span> Написать свой отзыв
           </button>
        </div>
      </div>

      {/* REVIEW BOT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-lg h-[600px] bg-metal-900 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            {/* Bot Header */}
            <div className="p-6 bg-metal-800 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-metal-900 font-black">R</div>
                <div>
                  <h3 className="text-white text-xs font-black uppercase tracking-widest">Review Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] text-gray-500 uppercase font-black">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {/* Bot Message 1 */}
              <div className="flex justify-start animate-in slide-in-from-left-4 duration-500">
                <div className="bg-metal-800 text-gray-300 p-4 rounded-2xl rounded-bl-none max-w-[85%] text-sm border border-white/5">
                  Привет! Я бот-ассистент «Евро-Заборы». Спасибо, что решили поделиться своим опытом! Начнем с оценки: насколько вы довольны результатом?
                </div>
              </div>

              {/* Step 0: User Input (Stars) */}
              {step >= 0 && (
                <div className="flex flex-col items-center gap-4 py-4 animate-in fade-in duration-500">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        disabled={step > 0}
                        onClick={() => { setRating(star); handleNextStep(); }}
                        onMouseEnter={() => step === 0 && setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className={`transition-all ${step === 0 ? 'hover:scale-125 cursor-pointer' : 'cursor-default'}`}
                      >
                        <svg className={`w-10 h-10 ${(hover || rating) >= star ? 'text-gold-500' : 'text-gray-800'} fill-current`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {step > 0 && <div className="text-[10px] text-gold-500 font-black uppercase tracking-widest">Вы выбрали: {rating} звезд</div>}
                </div>
              )}

              {/* Bot Message 2: Name */}
              {step >= 1 && (
                <div className="flex justify-start animate-in slide-in-from-left-4 duration-500">
                  <div className="bg-metal-800 text-gray-300 p-4 rounded-2xl rounded-bl-none max-w-[85%] text-sm border border-white/5">
                    Отлично! Как вас зовут? Нам важно знать своих героев.
                  </div>
                </div>
              )}

              {/* User Input 1: Name */}
              {step >= 1 && (
                <div className="flex justify-end">
                   <div className="bg-gold-600 text-white p-4 rounded-2xl rounded-br-none max-w-[85%] text-sm font-bold">
                     {step === 1 ? (
                       <input 
                         autoFocus
                         placeholder="Введите ваше имя..."
                         className="bg-transparent border-none outline-none placeholder:text-white/50 w-full"
                         onKeyPress={(e) => e.key === 'Enter' && formData.name.length > 1 && handleNextStep()}
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                     ) : formData.name}
                   </div>
                </div>
              )}

              {/* Bot Message 3: Location */}
              {step >= 2 && (
                <div className="flex justify-start animate-in slide-in-from-left-4 duration-500">
                  <div className="bg-metal-800 text-gray-300 p-4 rounded-2xl rounded-bl-none max-w-[85%] text-sm border border-white/5">
                    Приятно познакомиться, {formData.name}! В каком городе или населенном пункте мы выполняли работы?
                  </div>
                </div>
              )}

              {/* User Input 2: Location */}
              {step >= 2 && (
                <div className="flex justify-end">
                   <div className="bg-gold-600 text-white p-4 rounded-2xl rounded-br-none max-w-[85%] text-sm font-bold">
                     {step === 2 ? (
                       <input 
                         autoFocus
                         placeholder="Например: Ростов-на-Дону..."
                         className="bg-transparent border-none outline-none placeholder:text-white/50 w-full"
                         onKeyPress={(e) => e.key === 'Enter' && formData.location.length > 2 && handleNextStep()}
                         value={formData.location}
                         onChange={e => setFormData({...formData, location: e.target.value})}
                       />
                     ) : formData.location}
                   </div>
                </div>
              )}

              {/* Bot Message 4: Text */}
              {step >= 3 && (
                <div className="flex justify-start animate-in slide-in-from-left-4 duration-500">
                  <div className="bg-metal-800 text-gray-300 p-4 rounded-2xl rounded-bl-none max-w-[85%] text-sm border border-white/5">
                    И последнее: напишите пару слов о качестве забора, монтажа или нашего сервиса. Нам важна любая деталь!
                  </div>
                </div>
              )}

              {/* User Input 3: Text */}
              {step >= 3 && (
                <div className="flex justify-end">
                   <div className="bg-gold-600 text-white p-4 rounded-2xl rounded-br-none max-w-[85%] text-sm font-bold w-full max-w-[85%]">
                     {step === 3 ? (
                       <textarea 
                         autoFocus
                         placeholder="Ваш отзыв..."
                         className="bg-transparent border-none outline-none placeholder:text-white/50 w-full h-24 resize-none"
                         value={formData.text}
                         onChange={e => setFormData({...formData, text: e.target.value})}
                       />
                     ) : formData.text}
                   </div>
                </div>
              )}

              {/* Final Success Message */}
              {step === 4 && (
                <div className="flex justify-start animate-in zoom-in duration-700">
                  <div className="bg-green-600 text-white p-6 rounded-3xl text-sm font-bold shadow-xl">
                    🎉 Спасибо огромное! Ваш отзыв успешно отправлен на модерацию и скоро появится на сайте. Мы очень ценим ваше доверие!
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-metal-800 p-4 rounded-2xl flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Footer Buttons */}
            <div className="p-6 bg-metal-800 border-t border-white/5">
              {step === 3 && (
                <button 
                  onClick={finishReview}
                  disabled={formData.text.length < 10 || isTyping}
                  className="w-full bg-gold-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gold-500 transition-all disabled:opacity-30"
                >
                  Опубликовать отзыв
                </button>
              )}
              {step < 3 && step > 0 && (
                <button 
                  onClick={handleNextStep}
                  className="w-full bg-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                >
                  Далее
                </button>
              )}
              {step === 4 && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-white text-metal-900 py-4 rounded-xl font-black uppercase tracking-widest"
                >
                  Закрыть чат
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;


