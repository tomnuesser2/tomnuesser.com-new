'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShouldShowLanding } from '@/lib/useShouldShowLanding';

type Phase = 'arriving' | 'ready' | 'exiting';

/**
 * Landing-Overlay mit eigener "ScrollExpand"-Ankunftsanimation:
 * Der Schriftzug "tom nuesser" startet groß/zentriert (skaliert) und
 * "settled" beim ersten Scroll/Touch/Tastendruck (oder nach kurzer Zeit)
 * in seine finale Größe, während der enter-Button und die Copyright-Zeile
 * eingeblendet werden. Beim Klick auf "enter" öffnet sich ein kreisförmiger
 * Portal-Wipe (eigene Umsetzung, angelehnt an den ScrollPortal-Effekt), der
 * zur eigentlichen Seite überleitet.
 */
export default function LandingOverlay() {
  const { shouldShow, ready, markEntered } = useShouldShowLanding();
  const [phase, setPhase] = useState<Phase>('arriving');

  // Erste kleine Scroll-/Touch-Geste ODER ein kurzer Timeout lässt den
  // Schriftzug "expandieren" (schrumpfen) und den Button erscheinen.
  useEffect(() => {
    if (!shouldShow || phase !== 'arriving') return;

    const expand = () => setPhase('ready');
    const timeout = setTimeout(expand, 900);

    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener('wheel', expand, opts);
    window.addEventListener('touchmove', expand, opts);
    window.addEventListener('keydown', expand);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('wheel', expand);
      window.removeEventListener('touchmove', expand);
      window.removeEventListener('keydown', expand);
    };
  }, [shouldShow, phase]);

  if (!ready || !shouldShow) return null;

  const handleEnter = () => {
    setPhase('exiting');
    setTimeout(markEntered, 750);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="font-bold tracking-tight text-center select-none text-5xl sm:text-6xl md:text-7xl"
          animate={{ scale: phase === 'arriving' ? 1.35 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          tom nuesser
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            phase === 'ready' ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          style={{ pointerEvents: phase === 'ready' ? 'auto' : 'none' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={handleEnter}
            className="rounded-pill bg-black text-white text-sm md:text-base font-bold px-8 py-3 hover:opacity-85 active:scale-95 transition-all"
          >
            enter
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'ready' ? 0.6 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed bottom-6 text-[11px] md:text-xs"
        >
          © tomnuesser. All rights reserved.
        </motion.p>

        {phase === 'exiting' && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 85%)' }}
            animate={{ clipPath: 'circle(150% at 50% 85%)' }}
            transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 bg-black"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
