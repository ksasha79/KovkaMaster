import React, { useState, useEffect } from 'react';
import { ContactForm } from '../types';

interface ContactProps {
  prefillMessage?: string;
}

const Contact: React.FC<ContactProps> = ({ prefillMessage }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    message: '',
    length: '' // Новое поле для длины забора
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    if (prefillMessage) {
      setFormData(prev => ({ ...prev, message: prefillMessage }));
    }
  }, [prefillMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Имитация отправки
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', message: '', length: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-metal-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-600/5 skew-x-12 transform translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="bg-metal-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-700/50">
            <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Вызвать замерщика</h2>
            <p className="text-gray-400 mb-10 text-sm">Оставьте данные, и мы подготовим предварительную смету за 15 минут.</p>

            {status === 'success' ? (
              <div className="text-center py-16 px-8 bg-green-900/20 rounded-2xl border border-green-500/50 text-green-400 animate-fade-in">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase">Заявка принята!</h3>
                <p className="mb-8">Мастер уже получил уведомление и свяжется с вами.</p>
                <button onClick={() => setStatus('idle')} className="text-gold-500 font-bold hover:underline">Отправить ещё одну заявку</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-gray-500 ml-1">Как вас зовут?</label>
                     <input type="text" required className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" placeholder="Иван" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-gray-500 ml-1">Телефон</label>
                     <input type="tel" required className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" placeholder="+7 (___) ___-__-__" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">Примерная длина (метров)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" 
                      placeholder="Например: 50" 
                      value={formData.length} 
                      onChange={e => setFormData({...formData, length: e.target.value})} 
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 font-bold">п.м.</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">Комментарий</label>
                  <textarea className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all h-32 resize-none" placeholder="Укажите пожелания или название проекта..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>

                <button type="submit" disabled={status === 'sending'} className="w-full py-5 bg-gold-600 hover:bg-gold-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-gold-600/20 active:scale-95 disabled:bg-gray-700">
                  {status === 'sending' ? 'Обработка...' : 'Получить расчет стоимости'}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col h-full">
             <div className="bg-metal-800/50 p-10 rounded-3xl border border-gray-700/50 flex-grow">
               <h3 className="text-2xl font-black mb-8 uppercase text-gold-500">Прямая связь</h3>
               <div className="space-y-8">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-metal-900 rounded-lg flex items-center justify-center text-xl border border-gray-700">📍</div>
                     <div>
                        <div className="text-xs text-gray-500 uppercase font-black">Наш офис и цех</div>
                        <div className="text-white font-bold">г. Ростов-на-Дону, ул. Сварщиков, 12</div>
                        <div className="text-sm text-gray-400 mt-1">Доставка: вся область + ДНР/ЛНР</div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-metal-900 rounded-lg flex items-center justify-center text-xl border border-gray-700">📞</div>
                     <div>
                        <div className="text-xs text-gray-500 uppercase font-black">Телефон мастера</div>
                        <a href="tel:+79000000000" className="text-2xl font-black text-white hover:text-gold-500 transition-colors">+7 (900) 000-00-00</a>
                        <div className="text-sm text-green-500 font-bold mt-1">● Сейчас в сети (ответит за 1 мин)</div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-metal-900 rounded-lg flex items-center justify-center text-xl border border-gray-700">🛡️</div>
                     <div>
                        <div className="text-xs text-gray-500 uppercase font-black">Юридическая защита</div>
                        <div className="text-white font-bold">Работаем по договору</div>
                        <div className="text-sm text-gray-400 mt-1">Официальная гарантия 2 года на монтаж</div>
                     </div>
                  </div>
               </div>

               <div className="mt-12">
                  <div className="text-[10px] text-gray-500 uppercase font-black mb-4 tracking-widest text-center">Напишите в мессенджеры</div>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center justify-center gap-2 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl font-bold transition-all shadow-lg">
                      <span>Telegram</span>
                    </a>
                    <a href="#" className="flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#20b356] text-white rounded-xl font-bold transition-all shadow-lg">
                      <span>WhatsApp</span>
                    </a>
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

