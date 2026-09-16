'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: cinematic-hero (z. B. "Kurzfilm – Prolog")
 * Eigene, umgekehrte ScrollExpand-Umsetzung: Der Hero startet größer als
 * der Viewport und "settled" beim Scrollen sanft auf seine finale Größe,
 * während Titel & Text erscheinen.
 */
export default function CinematicHero({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.3, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <div>
      <div ref={heroRef} className="h-[90vh] flex items-center justify-center overflow-hidden -mx-4 sm:-mx-6 md:-mx-10">
        <motion.div style={{ scale, borderRadius: radius }} className="h-full w-full overflow-hidden">
          <LazyMedia media={project.cover} rounded={false} className="h-full" />
        </motion.div>
      </div>

      <motion.div style={{ opacity: textOpacity, y: textY }}>
        <ProjectHeading project={project} align="center" className="mt-14 md:mt-20" />
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
        {project.gallery.map((item, i) => (
          <FadeIn key={i} direction="up" delay={i * 0.08}>
            <LazyMedia media={item} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
