'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: timeline-story (z. B. "Ein Jahr unterwegs")
 * Vertikale Timeline mit einer Linie, die sich synchron zum Scrollen
 * "auffüllt" (scaleY an scrollYProgress gekoppelt), Stationen blenden
 * abwechselnd von links/rechts ein.
 */
export default function TimelineStory({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const steps = project.timeline ?? [];

  return (
    <div className="max-w-4xl mx-auto">
      <ProjectHeading project={project} align="center" />

      <div ref={containerRef} className="relative mt-16 pl-10 sm:pl-14">
        <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-[2px] bg-black/10" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-3 sm:left-5 top-0 bottom-0 w-[2px] bg-black origin-top"
        />

        <div className="space-y-16">
          {steps.map((step, i) => (
            <FadeIn key={i} direction={i % 2 === 0 ? 'right' : 'left'} className="relative">
              <div className="absolute -left-[2.65rem] sm:-left-[3.65rem] top-1 h-3 w-3 rounded-full bg-black" />
              <span className="text-xs uppercase tracking-wide text-black/40">{step.label}</span>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-black/80 max-w-xl">
                {step.text}
              </p>
              {step.media && (
                <div className="mt-4 max-w-sm">
                  <LazyMedia media={step.media} />
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
