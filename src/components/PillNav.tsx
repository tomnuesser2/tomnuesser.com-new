'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/lib/useActiveSection';

const SECTIONS = [
  { id: 'work', label: 'work' },
  { id: 'contact', label: 'contact' },
  { id: 'impressum', label: 'impressum' },
];

/**
 * Unten angedockte Pill-Navigation (angelehnt an reactbits.dev/components/pill-nav),
 * eigene Implementierung ohne externe Abhängigkeit.
 * Auf der Startseite: scrollt zu den jeweiligen Sections + markiert die aktive.
 * Auf Projektseiten: navigiert per Link zurück zur Startseite + Anker,
 * zusätzlich gibt es eine "← work" Pille, um schnell zur Übersicht zu kommen.
 */
export default function PillNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const active = useActiveSection(isHome ? SECTIONS.map((s) => s.id) : []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    if (!isHome) return; // normaler Link-Navigate übernimmt das Scrollen via Hash
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 md:bottom-8"
      aria-label="Hauptnavigation"
    >
      <ul className="flex items-center gap-1 rounded-pill border border-black/10 bg-white/90 backdrop-blur px-1.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {!isHome && (
          <li>
            <Link
              href="/"
              className="block rounded-pill px-3 py-2 text-xs md:text-sm text-black/60 hover:text-black transition-colors"
            >
              ← work
            </Link>
          </li>
        )}
        {SECTIONS.map((section) => {
          const isActive = isHome && active === section.id;
          return (
            <li key={section.id} className="relative">
              <Link
                href={`/#${section.id}`}
                onClick={handleClick(section.id)}
                className="relative block rounded-pill px-4 py-2 text-xs md:text-sm transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="pill-active"
                    className="absolute inset-0 rounded-pill bg-black"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-black hover:opacity-60'}`}>
                  {section.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
