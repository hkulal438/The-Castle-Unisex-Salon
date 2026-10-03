import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_OPTIONS = ['Haircut', 'Hair Styling', 'Hair Coloring', 'Hair Treatments', 'Hair Spa', 'Facial', 'Skin Care', 'Makeup', 'Threading', 'Waxing', 'Beard Styling', 'Beard Trim', 'Shaving', "Men's Grooming"];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Appointment() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, formRef.current, imgRef.current], { opacity: 1, y: 0, scale: 1, clipPath: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.set(bgRef.current, { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(imgRef.current, { scale: 1.12 });

      gsap.timeline({ scrollTrigger: { trigger: bgRef.current, start: 'top 85%', once: true } })
        .to(bgRef.current, { clipPath: 'inset(0 0 0 0)', duration: 1.2, ease: 'power4.out' })
        .to(imgRef.current, { scale: 1, duration: 1.5, ease: 'power3.out' }, 0);

      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields) {
        gsap.fromTo(fields, { y: 25, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    try {
      const { error } = await supabase.from('appointment_requests').insert({
        name: form.name,
        phone: form.phone,
        service: form.service,
        preferred_date: form.preferred_date || null,
        preferred_time: form.preferred_time || null,
        message: form.message || null,
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', phone: '', service: '', preferred_date: '', preferred_time: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section ref={sectionRef} id="appointment" className="relative bg-ink-900 py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background image — subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <img
          ref={imgRef}
          src={IMAGES.salonInterior1}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/80 to-ink-900" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — heading */}
          <div ref={headingRef}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-body">
                Appointment
              </span>
            </div>
            <h2 className="font-display text-cream font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8">
              Ready for Your<br />Next Look?
            </h2>
            <p className="text-cream/50 text-base font-body font-light leading-relaxed max-w-md mb-8">
              Book your appointment and let our team craft an experience tailored to you.
              We'll confirm your booking via phone.
            </p>
            <div className="h-px w-24 bg-gold/40" />
          </div>

          {/* Right — form */}
          <div ref={bgRef} className="bg-ink-800/60 backdrop-blur-sm p-8 md:p-10 lg:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-1">
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                <FormField label="Name" name="name" value={form.name} onChange={handleChange} required type="text" />
                <FormField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required type="tel" />
              </div>

              <div className="form-field mt-4">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className={form.service ? 'has-value' : ''}
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <label>Service</label>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 mt-4">
                <FormField label="Preferred Date" name="preferred_date" value={form.preferred_date} onChange={handleChange} type="date" />
                <FormField label="Preferred Time" name="preferred_time" value={form.preferred_time} onChange={handleChange} type="time" />
              </div>

              <div className="form-field mt-4">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder=" "
                />
                <label>Message</label>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="group flex items-center justify-center gap-3 w-full mt-8 py-4 bg-gold text-ink-900 text-[11px] tracking-[0.2em] uppercase font-body font-medium transition-all duration-400 hover:bg-gold-light disabled:opacity-70"
                data-cursor="link"
              >
                {status === 'loading' && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <Check size={16} />
                    Request Sent
                  </>
                )}
                {status === 'error' && 'Try Again'}
                {status === 'idle' && (
                  <>
                    Request Appointment
                    <ArrowRight size={16} className="transition-transform duration-400 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="mt-4 text-gold text-sm font-body text-center">
                  Thank you! We'll call you to confirm your appointment.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-red-400 text-sm font-body text-center">
                  Something went wrong. Please call us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  required,
  type,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type: string;
}) {
  return (
    <div className="form-field">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
      />
      <label>{label}</label>
    </div>
  );
}
