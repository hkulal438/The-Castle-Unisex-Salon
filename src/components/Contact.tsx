import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Navigation } from 'lucide-react';
import { CONTACT } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([leftRef.current, mapRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      gsap.fromTo(mapRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      // Marker pulse
      gsap.to(markerRef.current, {
        scale: 1.4,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=The+Castle+Unisex+Salon+Bejai+Kapikad+Mangaluru`;

  return (
    <section ref={sectionRef} id="contact" className="bg-cream py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — info */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
                Contact
              </span>
            </div>
            <h2 className="font-display text-ink-800 font-light text-4xl sm:text-5xl md:text-6xl leading-[1] mb-10">
              The Castle<br />Unisex Salon
            </h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-body text-ink-600/60 mb-1">Phone</p>
                  <a
                    href={CONTACT.phoneHref}
                    className="text-ink-800 text-lg font-body font-light hover:text-gold transition-colors duration-300"
                    data-cursor="link"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-body text-ink-600/60 mb-1">Address</p>
                  <p className="text-ink-800 text-base font-body font-light leading-relaxed max-w-xs">
                    {CONTACT.address.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={CONTACT.phoneHref}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-ink-800 text-cream text-[11px] tracking-[0.2em] uppercase font-body transition-all duration-400 hover:bg-ink-700 hover:scale-[1.02]"
                data-cursor="link"
              >
                Call Now
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 border border-ink-800/20 text-ink-800 text-[11px] tracking-[0.2em] uppercase font-body transition-all duration-400 hover:border-gold hover:text-gold"
                data-cursor="link"
              >
                <Navigation size={14} className="transition-transform duration-400 group-hover:translate-x-1" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right — map panel */}
          <div ref={mapRef} className="relative min-h-[400px] lg:min-h-[500px] bg-ink-800 overflow-hidden">
            {/* Stylized map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(198,166,107,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(198,166,107,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Decorative roads */}
            <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 400" preserveAspectRatio="none">
              <path d="M 0 200 Q 100 150 200 200 T 400 180" stroke="#C6A66B" strokeWidth="1.5" fill="none" />
              <path d="M 200 0 Q 180 100 220 200 T 200 400" stroke="#C6A66B" strokeWidth="1.5" fill="none" />
              <path d="M 0 300 Q 150 280 250 320 T 400 300" stroke="#C6A66B" strokeWidth="1" fill="none" />
              <path d="M 100 0 Q 120 100 80 200 T 120 400" stroke="#C6A66B" strokeWidth="1" fill="none" />
            </svg>

            {/* Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div ref={markerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gold/20" />
              <div className="relative w-4 h-4 rounded-full bg-gold border-2 border-cream shadow-lg" />
            </div>

            {/* Label */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-ink-900/80 backdrop-blur-sm px-6 py-3 text-center">
              <p className="text-gold text-[9px] tracking-[0.3em] uppercase font-body mb-1">Find Us</p>
              <p className="text-cream text-sm font-body font-light">Bejai - Kapikad Rd, Mangaluru</p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
