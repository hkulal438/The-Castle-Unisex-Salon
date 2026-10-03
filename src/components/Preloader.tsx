import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) {
      setDone(true);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      tl.fromTo(
        nameRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          subRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' },
          '-=0.2'
        )
        .to({}, { duration: 0.4 })
        .to([nameRef.current, subRef.current, lineRef.current], {
          opacity: 0,
          y: -15,
          duration: 0.5,
          ease: 'power2.in',
          stagger: 0.05,
        })
        .to(
          container,
          {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.2'
        );
    }, container);

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-ink-900 flex flex-col items-center justify-center"
    >
      <div ref={subRef} className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
        Unisex Salon
      </div>
      <div
        ref={nameRef}
        className="font-display text-cream text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] text-center"
      >
        THE CASTLE
      </div>
      <div
        ref={lineRef}
        className="mt-6 h-px bg-gold origin-center"
        style={{ width: '180px' }}
      />
    </div>
  );
}
