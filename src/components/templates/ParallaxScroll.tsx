'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: parallax-scroll (z. B. "Working with LEONA")
 * Großer Video-Hero mit sanftem Parallax-Effekt, darunter zentrierter
 * Titel/Beschreibungsblock, danach eine ruhige, groß skalierte Bildstrecke.
 */
export default function ParallaxScroll({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className="max-w-6xl mx-auto">
      <div ref={heroRef} className="overflow-hidden rounded-card">
        <motion.div style={{ y, scale }}>
          <LazyMedia media={project.cover} rounded={false} />
        </motion.div>
      </div>

      <ProjectHeading project={project} align="center" className="mt-12 md:mt-16" />

      <div className="mt-16 md:mt-20 space-y-8 md:space-y-12">
        {project.gallery.map((item, i) => (
          <FadeIn key={i} direction="up">
            <LazyMedia media={item} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
