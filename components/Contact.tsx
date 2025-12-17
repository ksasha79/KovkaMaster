import React, { useState, useEffect } from 'react';
import { ContactForm } from '../types';

interface ContactProps {
  prefillMessage?: string;
}

const Contact: React.FC<ContactProps> = ({ prefillMessage }) => {
  const [formData, setFormData] = useState<ContactForm>({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    if (prefillMessage) {
      setFormData(prev => ({ ...prev, message: prefillMessage }));
    }
  }, [prefillMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-metal-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-metal-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-4">Бесплатная Консультация</h2>
            <p className="text-gray-400 mb-10">Выезд замерщика по ДНР, ЛНР и РО бесплатный при заказе.</p>

            {status === 'success' ? (
              <div className="text-center p-10 bg-green-900/30 rounded border border-green-500 text-green-400">
                <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
                <p>Мастер перезвонит вам в ближайшее время.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm underline">Отправить еще</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" required className="w-full px-4 py-3 bg-metal-900 border border-gray-600 rounded text-white focus:border-gold-500 outline-none" placeholder="Ваше имя" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="tel" required className="w-full px-4 py-3 bg-metal-900 border border-gray-600 rounded text-white focus:border-gold-500 outline-none" placeholder="+7 (___) ___-__-__" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <textarea className="w-full px-4 py-3 bg-metal-900 border border-gray-600 rounded text-white focus:border-gold-500 outline-none h-32" placeholder="Комментарий или название проекта..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                <button type="submit" disabled={status === 'sending'} className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded transition-all transform active:scale-95">{status === 'sending' ? 'Отправка...' : 'Отправить мастеру'}</button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-8">
             <div className="bg-metal-800 p-8 rounded-2xl border border-gray-700 h-full flex flex-col">
               <h3 className="text-2xl font-bold mb-6">Контакты</h3>
               <div className="space-y-4 text-gray-300">
                  <p className="flex items-center"><span className="mr-3 text-gold-500">📍</span> г. Ростов-на-Дону (Вся область + ДНР/ЛНР)</p>
                  <p className="flex items-center"><span className="mr-3 text-gold-500">📞</span> <a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
                  <p className="flex items-center"><span className="mr-3 text-gold-500">🛡️</span> Гарантия на работы: 2 года</p>
               </div>
               <div className="mt-10 grid grid-cols-2 gap-4">
                  <a href="#" className="py-3 bg-[#0088cc] text-white rounded text-center font-bold">Telegram</a>
                  <a href="#" className="py-3 bg-[#25D366] text-white rounded text-center font-bold">WhatsApp</a>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
