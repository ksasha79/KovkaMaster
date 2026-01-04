
import React, { useState, useEffect } from 'react';
import { CONTACTS } from '../config.ts';

interface ContactProps {
  prefillMessage?: string;
}

const Contact: React.FC<ContactProps> = ({ prefillMessage }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    message: '',
    length: '' 
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (prefillMessage) {
      setFormData(prev => ({ ...prev, message: prefillMessage }));
    }
  }, [prefillMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorText('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', message: '', length: '' });
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Ошибка при отправке');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorText(err.message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-metal-800 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white">НУЖЕН <span className="text-gold-500">ЗАМЕР?</span></h2>
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Оставьте заявку, и наш инженер приедет к вам бесплатно</p>
        </div>
        
        {status === 'success' ? (
          <div className="p-16 rounded-[3rem] bg-gold-600/10 border border-gold-500/30 text-center animate-in zoom-in duration-500">
            <div className="text-6xl mb-6">🤝</div>
            <h3 className="text-3xl font-black text-gold-500 mb-4 uppercase">ЗАЯВКА ПРИНЯТА!</h3>
            <p className="text-gray-300 font-medium">Менеджер перезвонит вам в течение 15 минут для уточнения адреса замера.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-xs font-black uppercase tracking-widest text-gold-500 border-b border-gold-600 pb-1"
            >
              Отправить еще одну
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Ваше имя</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Иван Петров" 
                  className="w-full px-8 py-5 rounded-2xl bg-metal-900 border border-white/10 outline-none focus:border-gold-500 text-white transition-all font-bold" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Номер телефона</label>
                <input 
                  required 
                  type="tel" 
                  placeholder="+7 (___) ___-__-__" 
                  className="w-full px-8 py-5 rounded-2xl bg-metal-900 border border-white/10 outline-none focus:border-gold-500 text-white transition-all font-bold" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Примерная длина (метров)</label>
              <input 
                type="number" 
                placeholder="40" 
                className="w-full px-8 py-5 rounded-2xl bg-metal-900 border border-white/10 outline-none focus:border-gold-500 text-white transition-all font-bold" 
                value={formData.length}
                onChange={e => setFormData({...formData, length: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Что вас интересует?</label>
              <textarea 
                placeholder="Например: Еврозабор 40 метров и откатные ворота..." 
                className="w-full px-8 py-5 rounded-2xl bg-metal-900 border border-white/10 outline-none focus:border-gold-500 text-white transition-all h-40 resize-none font-bold"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-500/10 p-4 rounded-lg border border-red-500/20 text-center">
                ❌ Ошибка: {errorText || 'Не удалось отправить. Попробуйте позвонить.'}
              </p>
            )}

            <button 
              disabled={status === 'sending'}
              className="w-full py-6 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-metal-900 font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-gold-600/20 active:scale-95"
            >
              {status === 'sending' ? 'Отправка...' : 'Записаться на бесплатный замер'}
            </button>
            <p className="text-center text-[9px] text-gray-600 uppercase font-bold tracking-widest mt-6">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;


