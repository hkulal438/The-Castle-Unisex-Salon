import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram as InstagramIcon, ArrowRight, Heart } from 'lucide-react';
import { IMAGES, CONTACT } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const INSTA_IMAGES = [
  { src: IMAGES.insta1, alt: 'Client with styled hair at The Castle Unisex Salon' },
  { src: IMAGES.insta2, alt: 'Hair coloring session at The Castle Unisex Salon' },
  { src: IMAGES.insta3, alt: 'Beard trim at The Castle Unisex Salon' },
  { src: IMAGES.insta4, alt: 'Facial treatment at The Castle Unisex Salon' },
  { src: IMAGES.insta5, alt: 'Elegant makeup look from The Castle Unisex Salon' },
  { src: IMAGES.insta6, alt: 'Hair styling with curling iron at The Castle Unisex Salon' },
];

export default function Instagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, gridRef.current?.children || []], { opacity: 1, y: 0, clipPath: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      const items = gridRef.current?.querySelectorAll('.insta-item');
      items?.forEach((item, i) => {
        gsap.set(item, { clipPath: 'inset(0 100% 0 0)' });
        gsap.to(item, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power4.out',
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
                Instagram
              </span>
            </div>
            <h2 className="font-display text-ink-800 font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1]">
              Follow The Castle
            </h2>
          </div>
          <p className="text-ink-600 text-base font-body font-light max-w-sm">
            Style, transformations and salon moments — captured and shared.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-12">
          {INSTA_IMAGES.map((img, i) => (
            <a
              key={i}
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-item group relative overflow-hidden aspect-square block"
              data-cursor="link"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/60 transition-all duration-500 flex flex-col items-center justify-center gap-2">
                <InstagramIcon
                  size={24}
                  className="text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  strokeWidth={1.5}
                />
                <span className="text-cream/80 text-[9px] tracking-[0.15em] uppercase font-body opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
                  View Post
                </span>
              </div>
              {/* Top-right heart icon — like Instagram */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart size={14} className="text-cream/80" fill="currentColor" />
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-800 text-sm tracking-[0.15em] font-body hover:text-gold transition-colors duration-300"
            data-cursor="link"
          >
            {CONTACT.instagramHandle}
          </a>
          <span className="hidden sm:block w-px h-4 bg-ink-800/20" />
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 border border-ink-800/20 text-ink-800 text-[11px] tracking-[0.2em] uppercase font-body transition-all duration-400 hover:border-gold hover:text-gold hover:scale-[1.02]"
            data-cursor="link"
          >
            Follow on Instagram
            <ArrowRight size={16} className="transition-transform duration-400 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
