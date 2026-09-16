'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Kleiner IntersectionObserver-Hook für Scroll-Reveal-Animationen und
 * "echtes" Lazy Loading von schwerem Medieninhalt (Video/Vimeo).
 * Feuert standardmäßig nur EINMAL (once=true), danach bleibt der Zustand "true".
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
