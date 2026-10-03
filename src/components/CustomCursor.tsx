import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'view' | 'link'>('default');

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || prefersReducedMotion) return;

    setEnabled(true);
    document.body.classList.add('cursor-active');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (target.closest('a, button, [data-cursor="link"]')) {
        setVariant('link');
      } else {
        setVariant('default');
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: variant === 'view' ? '80px' : variant === 'link' ? '50px' : '32px',
          height: variant === 'view' ? '80px' : variant === 'link' ? '50px' : '32px',
          marginLeft: variant === 'view' ? '-40px' : variant === 'link' ? '-25px' : '-16px',
          marginTop: variant === 'view' ? '-40px' : variant === 'link' ? '-25px' : '-16px',
        }}
      >
        <div
          className={`rounded-full border border-gold/60 flex items-center justify-center transition-opacity duration-200 ${
            variant === 'view' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%' }}
        >
          {variant === 'view' && (
            <span className="text-gold text-[9px] tracking-[0.2em] uppercase font-body">View</span>
          )}
        </div>
      </div>
    </>
  );
}
