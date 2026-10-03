import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  clip?: 'horizontal' | 'bottom' | 'none';
  scale?: boolean;
  y?: number;
  opacity?: boolean;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

/**
 * Image reveal hook — animates clip-path and optional scale when element enters viewport.
 * Usage: const ref = useRevealImage({ clip: 'horizontal', scale: true });
 *        <div ref={ref} className="overflow-hidden">...</div>
 */
export function useRevealImage({
  clip = 'horizontal',
  scale = true,
  duration = 1.2,
  delay = 0,
  start = 'top 85%',
  once = true,
}: RevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(el, { clipPath: 'none', scale: 1, opacity: 1 });
      return;
    }

    const img = el.querySelector('img');
    const clipFrom =
      clip === 'horizontal'
        ? 'inset(0 100% 0 0)'
        : clip === 'bottom'
        ? 'inset(100% 0 0 0)'
        : 'none';

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: clipFrom });
      if (scale && img) gsap.set(img, { scale: 1.12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      });

      tl.to(el, {
        clipPath: 'inset(0 0% 0 0)',
        duration,
        ease: 'power4.out',
        delay,
      });

      if (scale && img) {
        tl.to(
          img,
          {
            scale: 1,
            duration: duration + 0.3,
            ease: 'power3.out',
            delay,
          },
          0
        );
      }
    }, el);

    return () => ctx.revert();
  }, [clip, scale, duration, delay, start, once]);

  return ref;
}

/**
 * Fade-up reveal for text/elements.
 * Usage: const ref = useFadeUp();
 *        <h2 ref={ref}>Heading</h2>
 */
export function useFadeUp<T extends HTMLElement = HTMLDivElement>({
  y = 40,
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
  once = true,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start, once]);

  return ref;
}

/**
 * Staggered reveal — animates children with stagger.
 * Usage: const ref = useStagger();
 *        <div ref={ref}>
 *          <div className="stagger-child">...</div>
 *          <div className="stagger-child">...</div>
 *        </div>
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>({
  selector,
  y = 40,
  opacity = 0,
  duration = 0.7,
  stagger = 0.12,
  delay = 0,
  start = 'top 85%',
  once = true,
}: {
  selector?: string;
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const children = selector ? el.querySelectorAll(selector) : el.children;
      gsap.set(children, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = selector ? el.querySelectorAll(selector) : el.children;
      gsap.fromTo(
        targets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, y, opacity, duration, stagger, delay, start, once]);

  return ref;
}

/**
 * Line expand — animates a line from 0 width to full width.
 */
export function useLineExpand<T extends HTMLElement = HTMLDivElement>({
  duration = 1,
  delay = 0,
  start = 'top 85%',
  once = true,
}: {
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [duration, delay, start, once]);

  return ref;
}
