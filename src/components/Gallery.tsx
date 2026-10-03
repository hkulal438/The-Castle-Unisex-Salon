import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  span: string;
  aspect: string;
}

const GALLERY: GalleryImage[] = [
  { src: IMAGES.gallery1, alt: 'Woman with stylish haircut at The Castle Salon', span: 'lg:row-span-2', aspect: 'aspect-[3/4]' },
  { src: IMAGES.gallery2, alt: 'Facial treatment at The Castle Salon', span: '', aspect: 'aspect-[4/3]' },
  { src: IMAGES.gallery3, alt: 'Beard trim at The Castle Salon', span: '', aspect: 'aspect-square' },
  { src: IMAGES.gallery4, alt: 'Hair coloring at The Castle Salon', span: 'lg:col-span-2', aspect: 'aspect-[16/9]' },
  { src: IMAGES.gallery5, alt: 'Skincare with facial roller at The Castle Salon', span: '', aspect: 'aspect-square' },
  { src: IMAGES.gallery6, alt: 'Barber preparing a client at The Castle Salon', span: 'lg:row-span-2', aspect: 'aspect-[3/4]' },
  { src: IMAGES.gallery7, alt: 'Hair color application at The Castle Salon', span: '', aspect: 'aspect-[4/3]' },
  { src: IMAGES.gallery8, alt: 'Elegant portrait from The Castle Salon', span: '', aspect: 'aspect-[3/4]' },
  { src: IMAGES.gallery9, alt: 'Facial mask treatment at The Castle Salon', span: '', aspect: 'aspect-[4/3]' },
  { src: IMAGES.gallery11, alt: 'Vibrant hair coloring at The Castle Salon', span: 'lg:col-span-2', aspect: 'aspect-[16/9]' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(gridRef.current?.children || [], { opacity: 1, clipPath: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.gallery-item');
      items?.forEach((item, i) => {
        const img = item.querySelector('img');
        gsap.set(item, { clipPath: 'inset(0 100% 0 0)' });
        if (img) gsap.set(img, { scale: 1.15 });

        gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
          .to(item, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'power4.out',
            delay: (i % 3) * 0.08,
          })
          .to(img, {
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
          }, 0);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY.length));
  }, []);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section ref={sectionRef} id="gallery" className="bg-ink-800 py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
                Gallery
              </span>
            </div>
            <h2 className="font-display text-cream font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1]">
              Moments of Style
            </h2>
          </div>
          <p className="mt-6 md:mt-0 max-w-sm text-cream/50 text-base font-body font-light leading-relaxed">
            A glimpse into the transformations and craft at The Castle.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-auto"
        >
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`gallery-item group relative overflow-hidden cursor-pointer ${img.span} ${img.aspect}`}
              onClick={() => openLightbox(i)}
              data-cursor="view"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/50 transition-all duration-500 flex items-center justify-center">
                <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-body opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([overlayRef.current, imgRef.current], { opacity: 1, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(imgRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0.3, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, [index]);

  const current = images[index];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] bg-ink-900/95 backdrop-blur-md flex items-center justify-center px-4 sm:px-12 py-16"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-cream/70 hover:text-gold transition-colors duration-300"
        aria-label="Close"
        data-cursor="link"
      >
        <X size={28} strokeWidth={1.5} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 text-cream/70 hover:text-gold transition-colors duration-300"
        aria-label="Previous"
        data-cursor="link"
      >
        <ChevronLeft size={36} strokeWidth={1.5} />
      </button>
      <img
        ref={imgRef}
        src={current.src}
        alt={current.alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 text-cream/70 hover:text-gold transition-colors duration-300"
        aria-label="Next"
        data-cursor="link"
      >
        <ChevronRight size={36} strokeWidth={1.5} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/40 text-[10px] tracking-[0.2em] uppercase font-body">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
