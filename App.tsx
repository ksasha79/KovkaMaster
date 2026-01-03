
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Steps from './components/Steps';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import About from './components/About';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingBot from './components/FloatingBot';

function App() {
  const [prefillMessage, setPrefillMessage] = useState('');

  const handleOrderSpecific = (title: string) => {
    setPrefillMessage(`Здравствуйте! Меня заинтересовал проект "${title}". Хочу обсудить детали и заказать расчет.`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-gold-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Steps />
        <Portfolio onOrderClick={handleOrderSpecific} />
        <Pricing />
        <Reviews />
        <FAQ />
        <Contact prefillMessage={prefillMessage} />
      </main>
      <Footer />
      <FloatingBot />
      
      {/* Sticky Mobile Call Button */}
      <div className="fixed bottom-6 left-6 z-40 md:hidden">
        <a 
          href="tel:+79591878949"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all active:scale-95 animate-pulse"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;

