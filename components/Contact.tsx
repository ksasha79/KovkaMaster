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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-metal-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
          <div className="text-center mb-10">
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

          <div className="mt-10 pt-10 border-t border-gray-700 text-center">
            <p className="text-gray-400 mb-4">Или напишите нам напрямую:</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
                <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-2">TG</span>
                Telegram
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
                <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-2">WA</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;