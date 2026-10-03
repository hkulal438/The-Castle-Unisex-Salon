import { useState } from 'react';
import { useSmoothScroll } from '@/lib/useSmoothScroll';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Marquee from '@/components/Marquee';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Instagram from '@/components/Instagram';
import Appointment from '@/components/Appointment';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  useSmoothScroll();

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero ready={preloaderDone} />
        <About />
        <Services />
        <Experience />
        <Marquee />
        <WhyChooseUs />
        <Gallery />
        <Reviews />
        <Instagram />
        <Appointment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
