import React, { useState } from 'react';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API/Bot call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      // Here you would connect to your Telegram Bot backend
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-metal-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-metal-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-3xl font-bold mb-4">Записаться на Консультацию</h2>
              <p className="text-gray-400">
                Оставьте заявку, и мы свяжемся с вами в течение 15 минут для расчета стоимости.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center p-10 bg-green-900/30 rounded border border-green-500 text-green-400">
                <h3 className="text-2xl font-bold mb-2">Спасибо!</h3>
                <p>Ваша заявка принята. Мастер скоро свяжется с вами.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm underline">Отправить еще</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-metal-900 border border-gray-600 rounded text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                    placeholder="Иван Петров"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-metal-900 border border-gray-600 rounded text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Комментарий (необязательно)</label>
                  <textarea
                    className="w-full px-4 py-3 bg-metal-900 border border-gray-600 rounded text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                    rows={4}
                    placeholder="Хочу ворота с калиткой..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded shadow-lg transition-all transform hover:scale-[1.01]"
                >
                  {status === 'sending' ? 'Отправка...' : 'Отправить заявку мастеру'}
                </button>
              </form>
            )}
          </div>

          {/* Map & Contacts Info Section */}
          <div className="flex flex-col space-y-8">
            <div className="bg-metal-800 p-8 rounded-2xl border border-gray-700 shadow-xl h-full flex flex-col">
               <h3 className="text-2xl font-bold mb-6 text-white">Где мы работаем</h3>
               
               {/* Embedded Google Map */}
               <div className="w-full h-80 bg-gray-600 rounded-lg overflow-hidden mb-6 relative">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173365.1764266657!2d39.54605910398018!3d47.22129532824637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e3b965805bb50b%3A0x63390c29f603c4f!2z0KDQvtGB0YLQvtCyLdC90LAt0JTQvtC90YMsINCg0L7RgdGC0L7QstGB0LrQsNGPINC-0LHQuy4!5e0!3m2!1sru!2sru!4v1708890000000!5m2!1sru!2sru" 
                   width="100%" 
                   height="100%" 
                   style={{border:0}} 
                   allowFullScreen={true} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="Map of Rostov Region"
                 ></iframe>
                 <div className="absolute top-4 right-4 bg-white/90 text-metal-900 px-3 py-1 rounded text-xs font-bold shadow">
                   Центральный офис
                 </div>
               </div>

               <div className="space-y-4 text-gray-300">
                  <p className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-500 flex items-center justify-center mr-3 text-xl">📍</span>
                    <span>г. Ростов-на-Дону (Выезд по всей области, ДНР, ЛНР)</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-500 flex items-center justify-center mr-3 text-xl">📞</span>
                    <a href="tel:+79000000000" className="hover:text-gold-500 transition">+7 (900) 000-00-00</a>
                  </p>
                  <p className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-500 flex items-center justify-center mr-3 text-xl">✉️</span>
                    <a href="mailto:info@master-gate.ru" className="hover:text-gold-500 transition">info@master-gate.ru</a>
                  </p>
               </div>

               <div className="mt-auto pt-6 border-t border-gray-700">
                 <p className="text-sm text-gray-500 mb-3">Мессенджеры для быстрой связи:</p>
                 <div className="flex space-x-4">
                   <a href="#" className="flex-1 py-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded text-center font-medium transition">Telegram</a>
                   <a href="#" className="flex-1 py-2 bg-[#25D366] hover:bg-[#1fae53] text-white rounded text-center font-medium transition">WhatsApp</a>
                   <a href="#" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-center font-medium transition">Max</a>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
