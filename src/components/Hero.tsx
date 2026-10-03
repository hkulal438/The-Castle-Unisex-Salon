import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Star } from 'lucide-react';
import { IMAGES, CONTACT } from '@/lib/images';

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set([bgRef.current, imgRef.current], { scale: 1, opacity: 1 });
      gsap.set(
        [eyebrowRef.current, headingRef.current, subRef.current, btnRef.current, ratingRef.current, navRef.current],
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.set(bgRef.current, { scale: 1.12, opacity: 0 });
      gsap.set(imgRef.current, { scale: 1.12 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(bgRef.current, { opacity: 1, duration: 0.4 })
        .to(
          bgRef.current,
          { scale: 1, duration: 2, ease: 'power2.out' },
          '-=0.2'
        )
        .to(
          imgRef.current,
          { scale: 1, duration: 2.2, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=1.4'
        )
        .add(() => animateHeading(), '-=0.3')
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          btnRef.current?.children || [],
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          ratingRef.current,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          navRef.current,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        );

      // Subtle continuous parallax on the image
      gsap.to(imgRef.current, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [ready]);

  const animateHeading = () => {
    const heading = headingRef.current;
    if (!heading) return;
    const words = heading.querySelectorAll('.hero-word');
    gsap.fromTo(
      words,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
    );
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const headingLine1 = ['YOUR', 'STYLE.'];
  const headingLine2 = ['YOUR', 'SIGNATURE.'];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink-900"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={IMAGES.heroBg}
          alt="The Castle Unisex Salon interior"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/30 to-ink-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top spacer for nav */}
        <div ref={navRef} className="h-20" />

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 mb-6 opacity-0"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-body">
              The Castle — Unisex Salon
            </span>
          </div>

          <h1
            ref={headingRef}
            className="font-display text-white font-light leading-[1.05] text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            {headingLine1.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.2em] align-bottom">
                <span className="hero-word inline-block opacity-0">
                  {word}
                </span>
              </span>
            ))}
            <br />
            {headingLine2.map((word, i) => (
              <span key={`b-${i}`} className="inline-block overflow-hidden mr-[0.2em] align-bottom">
                <span className="hero-word inline-block opacity-0">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-md text-cream/70 text-base sm:text-lg font-body font-light leading-relaxed opacity-0"
          >
            Where modern beauty, personal style and professional grooming come together.
          </p>

          <div ref={btnRef} className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0">
            <button
              onClick={() => scrollTo('#appointment')}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-gold text-ink-900 text-[11px] tracking-[0.2em] uppercase font-body font-medium transition-all duration-400 hover:bg-gold-light hover:scale-[1.02]"
              data-cursor="link"
            >
              Book an Appointment
              <ArrowRight
                size={16}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo('#services')}
              className="group flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-body transition-all duration-400 hover:border-gold hover:text-gold"
              data-cursor="link"
            >
              Explore Services
              <ArrowRight
                size={16}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div ref={ratingRef} className="mt-12 flex items-center gap-4 opacity-0">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < 4 ? 'fill-gold text-gold' : i === 4 ? 'fill-gold/60 text-gold/60' : 'text-gold/40'}
                />
              ))}
            </div>
            <span className="text-white font-display text-2xl font-light">{CONTACT.rating}</span>
            <span className="text-cream/50 text-[11px] tracking-[0.15em] uppercase font-body">
              {CONTACT.reviewCount}+ Reviews
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pb-8 flex flex-col items-center gap-3">
          <span className="text-cream/40 text-[9px] tracking-[0.3em] uppercase font-body">
            Scroll to Explore
          </span>
          <div className="relative h-12 w-px bg-white/15 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gold animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
