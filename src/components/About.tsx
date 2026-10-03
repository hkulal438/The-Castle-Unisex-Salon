import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { num: '01', label: 'Personalized' },
  { num: '02', label: 'Professional' },
  { num: '03', label: 'Premium' },
];

const STATS = [
  { value: '4.6', label: 'Google Rating' },
  { value: '311+', label: 'Happy Clients' },
  { value: '15+', label: 'Services' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const img2WrapRef = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([imgWrapRef.current, headingRef.current, paraRef.current, highlightsRef.current, lineRef.current, labelRef.current, img2WrapRef.current, statsRef.current], { opacity: 1, y: 0, clipPath: 'none', scaleX: 1 });
      gsap.set([imgRef.current, img2Ref.current], { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Image clip reveal
      gsap.set(imgWrapRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(imgRef.current, { scale: 1.12 });
      gsap.set(img2WrapRef.current, { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(img2Ref.current, { scale: 1.12 });

      gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 75%', once: true } })
        .to(imgWrapRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.out' })
        .to(imgRef.current, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0);

      gsap.timeline({ scrollTrigger: { trigger: img2WrapRef.current, start: 'top 85%', once: true } })
        .to(img2WrapRef.current, { clipPath: 'inset(0 0 0 0)', duration: 1.1, ease: 'power4.out' })
        .to(img2Ref.current, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0);

      // Label
      gsap.fromTo(labelRef.current, { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      });

      // Heading — word by word
      const words = headingRef.current?.querySelectorAll('.about-word');
      if (words) {
        gsap.fromTo(words, { yPercent: 100, opacity: 0 }, {
          yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
        });
      }

      // Paragraph fade up
      gsap.fromTo(paraRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: paraRef.current, start: 'top 85%', once: true },
      });

      // Line expand
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: lineRef.current, start: 'top 85%', once: true },
      });

      // Highlights stagger
      const items = highlightsRef.current?.querySelectorAll('.highlight-item');
      if (items) {
        gsap.fromTo(items, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: highlightsRef.current, start: 'top 85%', once: true },
        });
      }

      // Stats stagger
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        gsap.fromTo(stats, { y: 25, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = ['WHERE', 'STYLE', 'MEETS', 'EXPERIENCE'];

  return (
    <section ref={sectionRef} id="about" className="bg-cream py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — images */}
          <div className="relative order-2 lg:order-1">
            <div ref={imgWrapRef} className="relative overflow-hidden">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  ref={imgRef}
                  src={IMAGES.aboutPortrait}
                  alt="Stylist working on a client's hair at The Castle Unisex Salon"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-6 left-6 bg-ink-900/80 backdrop-blur-sm px-5 py-3">
                <span className="text-gold text-[9px] tracking-[0.3em] uppercase font-body">Est. Mangaluru</span>
              </div>
            </div>

            {/* Second smaller image — overlapping */}
            <div ref={img2WrapRef} className="absolute -bottom-12 -right-4 sm:right-8 w-32 sm:w-44 md:w-52 lg:w-56 overflow-hidden shadow-2xl hidden sm:block">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  ref={img2Ref}
                  src={IMAGES.aboutPortrait2}
                  alt="Hairdresser cutting hair at The Castle Unisex Salon"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className="order-1 lg:order-2">
            <div ref={labelRef} className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
                The Castle Experience
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-display text-ink-800 font-light leading-[1] text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl mb-8"
            >
              {headingWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.15em] align-bottom">
                  <span className="about-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <div ref={lineRef} className="h-px w-24 bg-gold mb-8 origin-left" />

            <p ref={paraRef} className="text-ink-600 text-base sm:text-lg font-body font-light leading-[1.7] max-w-md mb-10">
              The Castle Unisex Salon is where artistry meets care. Our team brings together
              modern techniques, premium products and a deep understanding of individual style to
              create a salon experience that feels uniquely yours. Every visit is designed to
              leave you feeling confident, refreshed and unmistakably yourself.
            </p>

            <div ref={highlightsRef} className="grid grid-cols-3 gap-4 sm:gap-8 mb-12">
              {HIGHLIGHTS.map((h) => (
                <div key={h.num} className="highlight-item border-t border-ink-800/15 pt-4">
                  <span className="font-display text-gold text-2xl sm:text-3xl font-light">
                    {h.num}
                  </span>
                  <p className="mt-2 text-ink-800 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-body">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-ink-800/15 pt-8">
              {STATS.map((s) => (
                <div key={s.label} className="stat-item">
                  <span className="font-display text-ink-800 text-3xl sm:text-4xl font-light block">
                    {s.value}
                  </span>
                  <p className="mt-1 text-ink-600/60 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-body">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
