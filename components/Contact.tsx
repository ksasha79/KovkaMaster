
import React, { useState, useEffect } from 'react';

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

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', message: '', length: '' });
      } else {
        throw new Error(result.error || 'Ошибка при отправке');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorText(err.message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-metal-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Левая часть: Форма */}
          <div className="bg-metal-800 p-8 md:p-12 rounded-[2.5rem] border border-gray-800 shadow-2xl">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">Вызвать замерщика</h2>
            <p className="text-gray-400 mb-10">Оставьте заявку, и наш инженер свяжется с вами для согласования времени бесплатного замера.</p>

            {status === 'success' ? (
              <div className="bg-gold-600/10 border border-gold-500/30 p-10 rounded-3xl text-center animate-fade-in">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gold-500 uppercase mb-2">Заявка отправлена!</h3>
                <p className="text-gray-300 mb-6">Бот уже передал ваш заказ в отдел продаж. Ожидайте звонка.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-xs font-black uppercase tracking-widest text-gold-500 border-b border-gold-600 pb-1"
                >
                  Отправить еще одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Ваше имя</label>
                    <input 
                      required
                      className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 transition-all text-white"
                      placeholder="Иван"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Телефон</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 transition-all text-white"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Примерная длина (метров)</label>
                  <input 
                    type="number"
                    className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 transition-all text-white"
                    placeholder="40"
                    value={formData.length}
                    onChange={e => setFormData({...formData, length: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Комментарий к заказу</label>
                  <textarea 
                    className="w-full bg-metal-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-gold-500 transition-all h-32 resize-none text-white"
                    placeholder="Какой забор вас интересует?"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    ❌ Ошибка: {errorText || 'Не удалось отправить. Попробуйте позвонить.'}
                  </p>
                )}

                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-black uppercase tracking-[0.3em] py-5 rounded-xl transition-all active:scale-95 shadow-lg shadow-gold-600/20"
                >
                  {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>

          {/* Правая часть: Контакты */}
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h3 className="text-gold-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Прямая связь (Завод)</h3>
              <a href="tel:+79591878949" className="text-4xl md:text-5xl font-black hover:text-gold-500 transition-colors tracking-tighter block mb-8">
                +7 (959) 187-89-49
              </a>
              
              <h3 className="text-gold-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Отдел продаж (Менеджер)</h3>
              <a href="tel:+79920595253" className="text-4xl md:text-5xl font-black hover:text-gold-500 transition-colors tracking-tighter block">
                +7 (992) 059-52-53
              </a>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 bg-metal-800 rounded-3xl border border-gray-800">
                <div className="text-3xl mb-4">📩</div>
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-500 mb-2">Email отдела</h4>
                <p className="font-bold">evrozabory6@gmail.com</p>
              </div>
              <div className="p-8 bg-metal-800 rounded-3xl border border-gray-800">
                <div className="text-3xl mb-4">📍</div>
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-500 mb-2">Регион работы</h4>
                <p className="font-bold">Ростов, ЛНР, ДНР, Воронеж</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
