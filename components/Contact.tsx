
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
  const [isDemo, setIsDemo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (prefillMessage) {
      setFormData(prev => ({ ...prev, message: prefillMessage }));
    }
  }, [prefillMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    setIsDemo(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.isDemo) setIsDemo(true);
        setStatus('success');
        setFormData({ name: '', phone: '', message: '', length: '' });
      } else {
        throw new Error(result.error || 'Ошибка при отправке');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Произошла ошибка. Пожалуйста, позвоните нам напрямую.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-metal-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-600/5 skew-x-12 transform translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="bg-metal-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-700/50">
            <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Вызвать замерщика</h2>
            <p className="text-gray-400 mb-10 text-sm">Бесплатный выезд мастера и точный расчет сметы в день обращения.</p>

            {status === 'success' ? (
              <div className="text-center py-12 px-6 bg-gold-600/5 rounded-3xl border border-gold-600/30 animate-fade-in">
                <div className="w-20 h-20 bg-gold-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold-600/20">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase text-gold-500">Заявка отправлена!</h3>
                <p className="text-gray-300 mb-6">Спасибо за доверие. Мы свяжемся с вами в течение 15 минут для подтверждения времени замера.</p>
                
                {isDemo && (
                  <div className="mb-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl text-blue-300 text-xs italic">
                    ⚠️ Режим теста: Данные успешно обработаны сервером и выведены в консоль. Для получения реальных уведомлений в Telegram настройте токены.
                  </div>
                )}
                
                <button onClick={() => setStatus('idle')} className="text-gold-500 font-bold hover:text-white transition-colors uppercase text-xs tracking-widest border-b border-gold-600/50 pb-1">Отправить ещё одну</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 text-sm mb-4 flex items-center gap-3">
                    <span className="text-xl">⚠️</span> {errorMessage}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-gray-500 ml-1 tracking-widest">Ваше Имя</label>
                     <input type="text" required className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder-gray-600" placeholder="Александр" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-gray-500 ml-1 tracking-widest">Контактный номер</label>
                     <input type="tel" required className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder-gray-600" placeholder="+7 (___) ___-__-__" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1 tracking-widest">Длина участка (примерно)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder-gray-600" 
                      placeholder="Например: 45" 
                      value={formData.length} 
                      onChange={e => setFormData({...formData, length: e.target.value})} 
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-black text-xs uppercase">Метров</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1 tracking-widest">Дополнительная информация</label>
                  <textarea className="w-full px-5 py-4 bg-metal-900 border border-gray-700 rounded-xl text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all h-28 resize-none placeholder-gray-600" placeholder="Напишите выбранную модель или особые условия участка..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'} 
                  className="w-full py-5 bg-gold-600 hover:bg-gold-500 text-white font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-gold-600/20 active:scale-95 disabled:bg-gray-700 disabled:opacity-50 flex justify-center items-center gap-4 text-sm"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Обработка...
                    </>
                  ) : 'Записаться на замер'}
                </button>
                <p className="text-[9px] text-gray-500 text-center uppercase tracking-widest leading-relaxed">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:sticky lg:top-32 space-y-10">
             <div className="bg-metal-800/30 p-10 rounded-3xl border border-gray-700/30">
               <h3 className="text-xl font-black mb-8 uppercase text-gold-500 tracking-tighter">Связаться напрямую</h3>
               <div className="space-y-8">
                  <div className="flex items-start gap-5">
                     <div className="w-12 h-12 bg-metal-900 rounded-2xl flex items-center justify-center text-2xl border border-gray-800 shadow-inner">📞</div>
                     <div>
                        <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Бесплатная консультация</div>
                        <a href="tel:+79591878949" className="text-2xl font-black text-white hover:text-gold-500 transition-colors tracking-tighter">+7 (959) 187-89-49</a>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                           <span className="text-[10px] text-green-500 font-black uppercase">Инженер на линии</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-5">
                     <div className="w-12 h-12 bg-metal-900 rounded-2xl flex items-center justify-center text-2xl border border-gray-800 shadow-inner">✉️</div>
                     <div>
                        <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Для документов и чертежей</div>
                        <a href="mailto:evrozabory6@gmail.com" className="text-lg font-bold text-white hover:text-gold-500 transition-colors">evrozabory6@gmail.com</a>
                     </div>
                  </div>
               </div>

               <div className="mt-12 pt-10 border-t border-gray-800">
                  <div className="text-[10px] text-gray-500 uppercase font-black mb-6 tracking-widest">Пишите нам в мессенджеры</div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#" className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                      <span>Telegram</span>
                    </a>
                    <a href="#" className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#20b356] text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-95">
                      <span>WhatsApp</span>
                    </a>
                  </div>
               </div>
             </div>
             
             <div className="px-6 py-8 bg-gold-600/10 rounded-3xl border border-gold-600/20 flex items-center gap-6">
                <div className="text-4xl">🚚</div>
                <div>
                   <h4 className="font-black uppercase text-gold-500 text-xs mb-1">Своя логистика</h4>
                   <p className="text-gray-400 text-xs">Доставляем заказы манипуляторами по всей области и новым регионам.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
