'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Eigene "ScrollPortal"-ähnliche Übergangs-Animation zwischen Seiten
 * (Startseite <-> Projekt-Unterseiten): sanftes Fade/Scale des Contents,
 * kombiniert mit einem kurzen Portal-Wipe (schwarzer Kreis), der beim
 * Seitenwechsel kurz aufblitzt. Läuft rein clientseitig, keine externe
 * Abhängigkeit nötig.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showWipe, setShowWipe] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setShowWipe(true);
    const t = setTimeout(() => setShowWipe(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <AnimatePresence>
        {showWipe && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 100%)' }}
            animate={{ clipPath: 'circle(140% at 50% 100%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[90] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
