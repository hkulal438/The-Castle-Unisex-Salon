import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCategory {
  num: string;
  name: string;
  description: string;
  items: string[];
  image: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    num: '01',
    name: 'Hair',
    description: 'Precision cuts, styling, coloring and treatments crafted to your features and lifestyle.',
    items: ['Haircut', 'Hair Styling', 'Hair Coloring', 'Hair Treatments', 'Hair Spa'],
    image: IMAGES.hair,
  },
  {
    num: '02',
    name: 'Beauty',
    description: 'Facials, skincare, makeup and grooming services that enhance your natural radiance.',
    items: ['Facial', 'Skin Care', 'Makeup', 'Threading', 'Waxing'],
    image: IMAGES.beauty,
  },
  {
    num: '03',
    name: 'Grooming',
    description: "Beard styling, shaving and comprehensive men's grooming with meticulous attention.",
    items: ['Beard Styling', 'Beard Trim', 'Shaving', "Men's Grooming"],
    image: IMAGES.grooming,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, panelsRef.current?.children || []], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      const panels = panelsRef.current?.querySelectorAll('.service-panel');
      if (panels) {
        gsap.fromTo(panels, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: panelsRef.current, start: 'top 80%', once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToAppointment = () => {
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="services" className="bg-ink-800 py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 lg:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
                What We Offer
              </span>
            </div>
            <h2 className="font-display text-cream font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1]">
              Our Services
            </h2>
          </div>
          <p className="mt-6 md:mt-0 max-w-sm text-cream/50 text-base font-body font-light leading-relaxed">
            Refined beauty and grooming, tailored to you.
          </p>
        </div>

        {/* Panels */}
        <div ref={panelsRef} className="flex flex-col gap-px bg-white/5">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.num}
              className="service-panel group relative overflow-hidden bg-ink-700 cursor-pointer transition-all duration-700 ease-out"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={scrollToAppointment}
              data-cursor="link"
              style={{
                opacity: active !== null && active !== i ? 0.4 : 1,
              }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 overflow-hidden transition-all duration-700 ease-out"
                style={{
                  opacity: active === i ? 0.25 : 0,
                  transform: active === i ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} services at The Castle Unisex Salon`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Gold accent line */}
              <div
                className="absolute left-0 top-0 h-full w-px bg-gold origin-top transition-all duration-700 ease-out"
                style={{ transform: active === i ? 'scaleY(1)' : 'scaleY(0)' }}
              />

              <div className="relative z-10 grid grid-cols-12 gap-4 px-6 sm:px-8 lg:px-12 py-10 md:py-12 lg:py-14 items-center transition-transform duration-500"
                style={{ transform: active === i ? 'translateX(12px)' : 'translateX(0)' }}
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="font-display text-gold/60 text-2xl md:text-3xl lg:text-4xl font-light transition-colors duration-500"
                    style={{ color: active === i ? '#C6A66B' : 'rgba(198,166,107,0.5)' }}
                  >
                    {cat.num}
                  </span>
                </div>

                {/* Category name */}
                <div className="col-span-10 md:col-span-3">
                  <h3 className="font-display text-cream text-3xl sm:text-4xl lg:text-5xl font-light leading-none transition-transform duration-500"
                    style={{ transform: active === i ? 'translateX(4px)' : 'translateX(0)' }}
                  >
                    {cat.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                  <p className="text-cream/60 text-sm md:text-base font-body font-light leading-relaxed max-w-md">
                    {cat.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="col-span-12 md:col-span-3 mt-4 md:mt-0 flex md:justify-end items-center gap-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 md:flex-1 md:justify-end">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-cream/40 text-[10px] tracking-[0.15em] uppercase font-body"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={28}
                    className="text-gold shrink-0 transition-all duration-500"
                    style={{
                      transform: active === i ? 'translate(4px, -4px)' : 'translate(0, 0)',
                      opacity: active === i ? 1 : 0.4,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
