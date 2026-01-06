import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Stats from './components/Stats.tsx';
import Services from './components/Services.tsx';
import Portfolio from './components/Portfolio.tsx';
import About from './components/About.tsx';
import Steps from './components/Steps.tsx';
import Pricing from './components/Pricing.tsx';
import Reviews from './components/Reviews.tsx';
import FAQ from './components/FAQ.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import FloatingBot from './components/FloatingBot.tsx';

const App: React.FC = () => {
  const [prefill, setPrefill] = useState('');

  const handleOrder = (title: string) => {
    setPrefill(`Запрос на расчет проекта: ${title}`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-black min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-grow">
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
