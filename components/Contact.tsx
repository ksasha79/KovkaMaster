import React, { useState, useEffect } from 'react';
import { CONTACTS } from '../config';

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', message: '', length: '' });
      } else {
        throw new Error(result.error || 'Ошибка при отправке');
      }
    } catch (err: any) {
      console.error('Contact error:', err);
      setStatus('error');
      setErrorText(err.message || 'Ошибка сети. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-metal-900 text-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-metal-800 p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Вызвать замерщика</h2>
            {status === 'success' ? (
              <div className="bg-gold-600/10 border border-gold-500/30 p-8 rounded-2xl text-center animate-fade-in">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gold-500 uppercase mb-2">Заявка принята!</h3>
                <p className="text-gray-400 text-sm mb-6">Наш менеджер свяжется с вами в течение 15 минут.</p>
                <button onClick={() => setStatus('idle')} className="text-xs font-black uppercase text-gold-500 border-b border-gold-600 pb-1">Отправить еще одну</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-500 text-xs font-bold uppercase tracking-wider">
                    ⚠️ {errorText}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    required
                    className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 text-white text-sm"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required
                    type="tel"
                    className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 text-white text-sm"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <textarea 
                  className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 h-32 resize-none text-white text-sm"
                  placeholder="Какой проект вас интересует?"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-gold-600 hover:bg-gold-500 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-gold-600/20 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-gold-500 font-black uppercase tracking-widest text-xs mb-4">Контакты Завода</h3>
              <a href={`tel:+${CONTACTS.PHONE}`} className="text-3xl md:text-5xl font-black hover:text-gold-500 transition-colors block mb-4">
                {CONTACTS.PHONE_DISPLAY}
              </a>
              <p className="text-gray-400 text-sm">{CONTACTS.FACTORY_ADDRESS}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-metal-800 rounded-2xl border border-gray-800">
                <h4 className="font-black uppercase text-[10px] text-gray-500 mb-2">Менеджер (TG/WA)</h4>
                <p className="font-bold text-sm">{CONTACTS.MANAGER_PHONE_DISPLAY}</p>
              </div>
              <div className="p-6 bg-metal-800 rounded-2xl border border-gray-800">
                <h4 className="font-black uppercase text-[10px] text-gray-500 mb-2">Email</h4>
                <p className="font-bold text-sm">{CONTACTS.EMAIL}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
