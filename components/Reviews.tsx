
import React, { useState } from 'react';

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
    avatar: "/images/review1.jpg",
    rating: 5,
    date: "12 окт 2025"
  },
  {
    id: 2,
    name: "Елена Викторовна",
    location: "г. Аксай",
    text: "Давно мечтала о красивой кованой калитке с виноградной лозой. Ребята воплотили мою мечту в реальность! Дизайн нарисовали бесплатно. Установили аккуратно, даже цветы на клумбе не повредили. Спасибо огромное!",
    avatar: "/images/review2.jpg",
    rating: 5,
    date: "05 сен 2025"
  },
  {
    id: 3,
    name: "Сергей Петров",
    location: "г. Макеевка (ДНР)",
    text: "Нужен был надежный забор для частного дома. Цены адекватные, даже с учетом доставки. Качество металла хорошее, покраска в три слоя, как и обещали. Выглядят очень солидно.",
    avatar: "/images/review3.jpg",
    rating: 5,
    date: "20 авг 2025"
  }
];

const Reviews: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Формируем сообщение для Telegram/Email через существующий API
    const message = `НОВЫЙ ОТЗЫВ (Рейтинг: ${rating}★)\nОткуда: ${formData.location}\nТекст: ${formData.text}`;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: "ОТЗЫВ",
          message: message
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSuccess(false);
          setFormData({ name: '', location: '', text: '' });
          setRating(5);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-metal-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            ОТЗЫВЫ <span className="text-gold-500">ЭЛИТНОГО УРОВНЯ</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto uppercase text-[10px] tracking-[0.3em] font-bold">
            Безупречная репутация в каждой установленной секции
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialReviews.map((review) => (
            <div 
              key={review.id}
              className="bg-metal-900 p-8 rounded-[2rem] border border-white/5 hover:border-gold-500/30 transition-all duration-500 shadow-2xl flex flex-col h-full group"
            >
              <div className="flex items-center mb-8">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-2xl object-cover border border-gold-600/20 mr-4 group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=c5a059&color=fff&size=150&bold=true`;
                  }}
                />
                <div>
                  <h4 className="text-white font-black uppercase text-sm tracking-tight">{review.name}</h4>
                  <p className="text-gold-500 text-[10px] font-bold uppercase tracking-widest">{review.location}</p>
                </div>
              </div>

              <div className="relative mb-8 flex-grow">
                <p className="text-gray-400 text-sm leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex text-gold-500 gap-1">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                </div>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="inline-flex items-center gap-4 px-12 py-5 bg-transparent border-2 border-gold-600 text-gold-500 rounded-2xl hover:bg-gold-600 hover:text-metal-900 transition-all font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-gold-600/10 active:scale-95"
           >
             <span className="text-xl">✍️</span> Оставить свой отзыв
           </button>
        </div>
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-lg bg-metal-900 rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(197,160,89,0.1)] overflow-hidden animate-in zoom-in-95 duration-300">
            {isSuccess ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold-500/20 animate-bounce">
                  <svg className="w-10 h-10 text-metal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Отзыв принят!</h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest leading-loose">
                  Ваше мнение очень важно для <br/> улучшения нашего завода
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-10 md:p-12">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Ваш отзыв</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="flex justify-center gap-2 mb-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-all duration-200 transform hover:scale-125"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <svg 
                        className={`w-10 h-10 ${(hover || rating) >= star ? 'text-gold-500' : 'text-gray-800'} fill-current`} 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      placeholder="Имя"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-gold-500 transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                      required
                      placeholder="Город"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-gold-500 transition-all"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="Ваши впечатления от работы с нами..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-gold-500 transition-all h-32 resize-none"
                    value={formData.text}
                    onChange={e => setFormData({...formData, text: e.target.value})}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-gold-600 hover:bg-gold-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl shadow-gold-600/20 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'ОТПРАВЛЯЕМ...' : 'ОПУБЛИКОВАТЬ ОТЗЫВ'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;

