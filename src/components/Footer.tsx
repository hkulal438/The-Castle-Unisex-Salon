import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Phone, MapPin, ArrowRight } from 'lucide-react';
import { CONTACT } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=The+Castle+Unisex+Salon+Bejai+Kapikad+Mangaluru`;

  return (
    <footer ref={sectionRef} className="bg-ink-900 pt-20 md:pt-24 lg:pt-32 pb-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Large CTA */}
        <div ref={ctaRef} className="text-center mb-20 lg:mb-28">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase font-body mb-6">
            Begin Your Journey
          </p>
          <button
            onClick={() => scrollTo('#appointment')}
            className="group inline-flex items-center gap-4 font-display text-cream font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] transition-colors duration-300 hover:text-gold"
            data-cursor="link"
          >
            Book Your Appointment
            <ArrowRight
              size={48}
              className="text-gold transition-transform duration-500 group-hover:translate-x-3"
              strokeWidth={1}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-16" />

        {/* Footer content */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-cream text-3xl font-light tracking-[0.1em] mb-2">
              THE CASTLE
            </h3>
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body mb-6">
              Unisex Salon
            </p>
            <p className="text-cream/40 text-sm font-body font-light leading-relaxed max-w-xs">
              Where modern beauty, personal style and professional grooming come together in Mangaluru.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-cream/40 text-[10px] tracking-[0.25em] uppercase font-body mb-6">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group relative text-cream/70 text-sm font-body font-light hover:text-gold transition-colors duration-300"
                    data-cursor="link"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-400 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-cream/40 text-[10px] tracking-[0.25em] uppercase font-body mb-6">
              Get in Touch
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-cream/70 text-sm font-body font-light hover:text-gold transition-colors duration-300"
                  data-cursor="link"
                >
                  <Instagram size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                  {CONTACT.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-center gap-3 text-cream/70 text-sm font-body font-light hover:text-gold transition-colors duration-300"
                  data-cursor="link"
                >
                  <Phone size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-cream/70 text-sm font-body font-light hover:text-gold transition-colors duration-300"
                  data-cursor="link"
                >
                  <MapPin size={16} className="text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>Bejai - Kapikad Rd, Mangaluru, Karnataka 575004</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px w-full bg-white/10 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-[10px] tracking-[0.15em] uppercase font-body">
            © {new Date().getFullYear()} The Castle Unisex Salon. All rights reserved.
          </p>
          <p className="text-cream/30 text-[10px] tracking-[0.15em] uppercase font-body">
            Mangaluru, Karnataka
          </p>
        </div>
      </div>
    </footer>
  );
}
