'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';

/**
 * Template: scroll-stack (z. B. "Studio Live Session")
 * Eigene ScrollStack-Umsetzung: Die Bilder liegen gestapelt übereinander;
 * beim Scrollen durch den Abschnitt schiebt sich jeweils das nächste Bild
 * nach vorn, während das vorherige verkleinert und nach hinten verschoben
 * wird (reines CSS/Framer-Motion, ohne externe Stack-Library).
 */
export default function ScrollStack({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = project.gallery.length > 0 ? project.gallery : [project.cover];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectHeading project={project} align="center" />

      <div ref={containerRef} style={{ height: `${items.length * 70}vh` }} className="relative mt-16">
        <div className="sticky top-24 h-[60vh] flex items-center justify-center">
          {items.map((item, i) => (
            <StackCard
              key={i}
              index={i}
              total={items.length}
              progress={scrollYProgress}
              media={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StackCard({
  index,
  total,
  progress,
  media,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  media: Project['gallery'][number];
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(progress, [start, end], [1, 0.88]);
  const y = useTransform(progress, [start, end], [0, -40]);
  const rotate = useTransform(progress, [start, end], [0, index % 2 === 0 ? -3 : 3]);
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.12), start, end, Math.min(1, end + 0.12)],
    [0, 1, 1, index === total - 1 ? 1 : 0.4]
  );

  return (
    <motion.div
      style={{
        scale,
        y,
        rotate,
        opacity,
        zIndex: index,
      }}
      className="absolute w-[80%] sm:w-[60%] max-w-md"
    >
      <LazyMedia media={media} />
    </motion.div>
  );
}
