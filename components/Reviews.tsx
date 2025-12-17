import React from 'react';

interface Review {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Михаил Данилов",
    location: "г. Таганрог",
    text: "Заказывал откатные ворота с автоматикой. Понравилось, что мастер сам приехал на замер, посоветовал, как лучше усилить проем. Сделали за 2 недели. Работают четко, швы идеальные, автоматика летает. Рекомендую!",
    avatar: "/images/review1.jpg",
    rating: 5,
    date: "12 окт 2023"
  },
  {
    id: 2,
    name: "Елена Викторовна",
    location: "г. Аксай",
    text: "Давно мечтала о красивой кованой калитке с виноградной лозой. Ребята воплотили мою мечту в реальность! Дизайн нарисовали бесплатно. Установили аккуратно, даже цветы на клумбе не повредили. Спасибо огромное!",
    avatar: "/images/review2.jpg",
    rating: 5,
    date: "05 сен 2023"
  },
  {
    id: 3,
    name: "Сергей Петров",
    location: "г. Макеевка (ДНР)",
    text: "Нужен был надежный забор для частного дома. Цены адекватные, даже с учетом доставки. Качество металла хорошее, покраска в три слоя, как и обещали. Выглядят очень солидно.",
    avatar: "/images/review3.jpg",
    rating: 5,
    date: "20 авг 2023"
  }
];

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-metal-800 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold-600/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
            Отзывы <span className="text-gold-500">Наших Клиентов</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Мы гордимся своей репутацией. Более 500 установленных ворот и довольных заказчиков.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-metal-900 p-8 rounded-2xl border border-gray-700 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2 shadow-xl flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold-600 mr-4"
                  onError={(e) => {
                    // Если фото в папке нет, создаем стильную заглушку с инициалами
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=c5a059&color=fff&size=150`;
                  }}
                />
                <div>
                  <h4 className="text-white font-bold text-lg">{review.name}</h4>
                  <p className="text-gold-500 text-sm">{review.location}</p>
                </div>
                <div className="ml-auto flex text-gold-500">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                </div>
              </div>

              <div className="relative mb-6 flex-grow">
                <svg className="absolute -top-2 -left-2 w-8 h-8 text-gray-700 transform -scale-x-100 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v8h6v10h-10v-10h4v-8h-4zm14 0v8h6v10h-10v-10h4v-8h-4z"></path>
                </svg>
                <p className="text-gray-300 italic relative z-10 pl-2">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500">{review.date}</span>
                <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Подтвержденный заказ</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <a href="#contact" className="inline-block px-8 py-3 border border-gold-600 text-gold-500 rounded hover:bg-gold-600 hover:text-white transition-colors font-bold uppercase text-sm tracking-wider">
             Оставить свой отзыв
           </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
