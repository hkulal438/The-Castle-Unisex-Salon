import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 400 && y < lastY.current);
      lastY.current = y;
    };
    const lastY = { current: 0 };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-ink-800/90 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="group flex flex-col leading-none text-left"
            data-cursor="link"
          >
            <span
              className={`font-display text-xl sm:text-2xl tracking-[0.12em] transition-colors duration-500 ${
                scrolled ? 'text-cream' : 'text-white'
              }`}
            >
              THE CASTLE
            </span>
            <span
              className={`text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-500 ${
                scrolled ? 'text-gold' : 'text-gold-light'
              }`}
            >
              Unisex Salon
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="group relative text-[11px] tracking-[0.2em] uppercase font-body transition-colors duration-300"
                  data-cursor="link"
                  style={{
                    color: scrolled ? '#DDD4C6' : 'rgba(255,255,255,0.85)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C6A66B')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = scrolled ? '#DDD4C6' : 'rgba(255,255,255,0.85)')
                  }
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold transition-all duration-400 ease-out group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#appointment')}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 border border-gold/50 text-gold text-[10px] tracking-[0.2em] uppercase font-body transition-all duration-400 hover:bg-gold hover:text-ink-800"
              data-cursor="link"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-1"
              aria-label="Open menu"
              data-cursor="link"
            >
              <Menu
                size={24}
                color={scrolled ? '#F5F1EA' : '#FFFFFF'}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollTo}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        menuRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.6, ease: 'power4.out' }
      );
      gsap.fromTo(
        '.mobile-nav-item',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: 0.2 }
      );
    });
    document.body.style.overflow = 'hidden';
    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={menuRef}
        className="fixed top-0 right-0 z-[1002] w-full sm:w-[420px] h-full bg-ink-900 flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <span className="font-display text-cream text-lg tracking-[0.12em]">THE CASTLE</span>
          <button onClick={onClose} aria-label="Close menu" className="p-1">
            <X size={24} color="#F5F1EA" strokeWidth={1.5} />
          </button>
        </div>
        <ul className="flex-1 flex flex-col justify-center px-6 gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="mobile-nav-item overflow-hidden">
              <button
                onClick={() => onNavigate(link.href)}
                className="group flex items-baseline gap-3 py-3 w-full text-left"
              >
                <span className="text-gold/40 text-xs font-body">
                  0{NAV_LINKS.indexOf(link) + 1}
                </span>
                <span className="font-display text-cream text-3xl font-light group-hover:text-gold transition-colors duration-300">
                  {link.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="px-6 py-8 border-t border-white/5 mobile-nav-item">
          <button
            onClick={() => onNavigate('#appointment')}
            className="w-full py-4 bg-gold text-ink-900 text-[11px] tracking-[0.2em] uppercase font-body font-medium transition-colors duration-300 hover:bg-gold-light"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}
