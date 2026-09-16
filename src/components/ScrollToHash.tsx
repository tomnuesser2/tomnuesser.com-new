'use client';

import { useEffect } from 'react';

/**
 * Scrollt beim Laden der Startseite zu einem vorhandenen Hash in der URL
 * (z. B. wenn man von einer Projektseite über "contact" -> /#contact kommt).
 */
export default function ScrollToHash() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    // Kurzer Timeout, damit erst das Layout (inkl. Landing-Overlay-Check) steht.
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return null;
}
