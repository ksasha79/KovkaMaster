import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Steps from './components/Steps';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingBot from './components/FloatingBot';

const App: React.FC = () => {
  const [prefill, setPrefill] = useState('');

  const handleOrder = (title: string) => {
    setPrefill(`Интересует проект: ${title}. Нужен расчет стоимости.`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-black min-h-screen text-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio onOrderClick={handleOrder} />
        <About />
        <Steps />
        <Pricing />
        <Reviews />
        <FAQ />
        <Contact prefillMessage={prefill} />
      </main>
      <Footer />
      <FloatingBot />
    </div>
  );
};

export default App;
