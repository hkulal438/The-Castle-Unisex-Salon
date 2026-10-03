import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CONTACT, IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    text: 'This is a placeholder review. Real customer testimonials will appear here once connected to your Google Reviews or review system.',
    author: 'Google Review',
    source: 'Verified Google Review',
  },
  {
    text: 'This is a placeholder review. Replace this with actual customer feedback to build trust with potential clients.',
    author: 'Google Review',
    source: 'Verified Google Review',
  },
  {
    text: 'This is a placeholder review. Connect your review feed to display authentic testimonials from your clients.',
    author: 'Google Review',
    source: 'Verified Google Review',
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, bgRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      // Background parallax
      gsap.to(imgRef.current, {
        yPercent: 10,
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

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const goNext = () => setCurrent((prev) => (prev + 1) % REVIEWS.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  useEffect(() => {
    if (!reviewRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    gsap.fromTo(reviewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }, [current]);

  return (
    <section ref={sectionRef} id="reviews" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-ink-900">
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={IMAGES.reviewBg1}
          alt=""
          className="w-full h-full object-cover opacity-15"
          style={{ height: '120%' }}
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/90 to-ink-900" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold" />
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
              Reviews
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-cream font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] mb-10">
            What People Say
          </h2>

          {/* Rating display */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-ink-800/50 backdrop-blur-sm border border-white/10 px-8 py-6 sm:px-12 sm:py-8">
            <div className="flex items-center gap-4">
              <span className="font-display text-gold text-5xl md:text-6xl font-light">
                {CONTACT.rating}
              </span>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < 4 ? 'fill-gold text-gold' : i === 4 ? 'fill-gold/60 text-gold/60' : 'text-gold/40'}
                    />
                  ))}
                </div>
                <span className="text-cream/50 text-[10px] tracking-[0.2em] uppercase font-body mt-1">
                  {CONTACT.reviewCount} Reviews
                </span>
              </div>
            </div>
            <div className="h-px sm:h-12 w-12 sm:w-px bg-white/15" />
            <div className="text-center sm:text-left">
              <p className="text-cream/80 text-sm font-body font-light">Rated on Google</p>
              <p className="text-cream/40 text-[10px] tracking-[0.15em] uppercase font-body mt-1">
                Verified Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial slider */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote size={48} className="text-gold/20 mx-auto mb-8" />

          <div ref={reviewRef} className="text-center min-h-[200px]">
            <p className="font-display text-cream text-xl md:text-2xl lg:text-3xl font-light italic leading-[1.5] mb-8 text-balance">
              "{REVIEWS[current].text}"
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-gold text-sm tracking-[0.15em] uppercase font-body">
                {REVIEWS[current].author}
              </span>
              <span className="text-cream/40 text-[10px] tracking-[0.15em] uppercase font-body">
                {REVIEWS[current].source}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={goPrev}
              className="p-2 text-cream/50 hover:text-gold transition-colors duration-300"
              aria-label="Previous review"
              data-cursor="link"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === current ? 'w-8 bg-gold' : 'w-1.5 bg-cream/20'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="p-2 text-cream/50 hover:text-gold transition-colors duration-300"
              aria-label="Next review"
              data-cursor="link"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
