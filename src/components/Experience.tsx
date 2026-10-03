import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([imgRef.current, headingRef.current], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Parallax — image moves slower than content
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Heading word-by-word reveal on scroll
      const words = headingRef.current?.querySelectorAll('.exp-word');
      if (words) {
        gsap.fromTo(words, { yPercent: 100, opacity: 0 }, {
          yPercent: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 75%', once: true },
        });
      }

      // Overlay subtle change
      gsap.fromTo(overlayRef.current, { opacity: 0.5 }, {
        opacity: 0.75,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const words = ['MORE', 'THAN', 'A', 'SALON.'];
  const words2 = ['AN', 'EXPERIENCE.'];

  return (
    <section ref={sectionRef} id="experience" className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-ink-900">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={IMAGES.cinematic}
          alt="Cinematic view of The Castle Unisex Salon"
          className="w-full h-full object-cover"
          style={{ height: '120%' }}
          loading="lazy"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-ink-900/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h2
          ref={headingRef}
          className="font-display text-white font-light leading-[1.05] text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.15em] align-bottom">
              <span className="exp-word inline-block">{word}</span>
            </span>
          ))}
          <br />
          {words2.map((word, i) => (
            <span key={`b-${i}`} className="inline-block overflow-hidden mr-[0.15em] align-bottom">
              <span className="exp-word inline-block">{word}</span>
            </span>
          ))}
        </h2>
        <p className="mt-8 text-cream/60 text-base sm:text-lg font-body font-light max-w-xl mx-auto">
          Step into a space designed for transformation — where every detail is considered and every visit is an experience worth returning to.
        </p>
      </div>
    </section>
  );
}
