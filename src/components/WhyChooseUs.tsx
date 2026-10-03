import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { num: '01', label: 'Personalized Style', desc: 'Every cut, color and treatment is tailored to your features, lifestyle and personality.', image: IMAGES.whyHair },
  { num: '02', label: 'Modern Techniques', desc: 'Our team stays current with the latest trends, tools and methods in beauty and grooming.', image: IMAGES.whyBeauty },
  { num: '03', label: 'Attention to Detail', desc: 'From consultation to finish, we obsess over the finer points that make each result exceptional.', image: IMAGES.whyGrooming },
  { num: '04', label: 'Unisex Experience', desc: 'A welcoming space where everyone feels comfortable, valued and beautifully cared for.', image: IMAGES.whySalon },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, gridRef.current?.children || []], { opacity: 1, y: 0, scaleX: 1, clipPath: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      const items = gridRef.current?.querySelectorAll('.feature-item');
      items?.forEach((item) => {
        const imgWrap = item.querySelector('.feature-img-wrap');
        const img = item.querySelector('.feature-img');
        const num = item.querySelector('.feature-num');
        const line = item.querySelector('.feature-line');
        const label = item.querySelector('.feature-label');
        const desc = item.querySelector('.feature-desc');

        if (imgWrap && img) {
          gsap.set(imgWrap, { clipPath: 'inset(0 100% 0 0)' });
          gsap.set(img, { scale: 1.12 });
          gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%', once: true } })
            .to(imgWrap, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.out' })
            .to(img, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0);
        }

        gsap.fromTo(num, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        });
        gsap.fromTo(line, { scaleX: 0 }, {
          scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        });
        gsap.fromTo(label, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        });
        if (desc) {
          gsap.fromTo(desc, { y: 15, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div ref={headingRef} className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold" />
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
              Why Choose Us
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-ink-800 font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1]">
            Crafted for Your Style
          </h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {FEATURES.map((f) => (
            <div key={f.num} className="feature-item">
              <div className="feature-img-wrap relative overflow-hidden mb-6 aspect-[4/5]">
                <img
                  src={f.image}
                  alt={f.label}
                  className="feature-img w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="feature-num block font-display text-gold text-5xl sm:text-6xl lg:text-7xl font-light leading-none mb-3">
                {f.num}
              </span>
              <div className="feature-line h-px w-full bg-ink-800/15 mb-4 origin-left" />
              <h3 className="feature-label text-ink-800 text-sm tracking-[0.2em] uppercase font-body mb-3">
                {f.label}
              </h3>
              <p className="feature-desc text-ink-600/70 text-sm font-body font-light leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
