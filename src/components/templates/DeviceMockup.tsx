'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: device-mockup (z. B. "Vertical Sessions")
 * Eigenes, in CSS gebautes Handy-Gehäuse (kein externes Asset nötig) für
 * Instagram-/TikTok-Hochformat-Videos. Zwischen mehreren Clips kann per
 * Pfeil, Klick auf die kleinen Punkte oder Swipe (Drag) gewechselt werden.
 */
export default function DeviceMockup({ project }: { project: Project }) {
  const clips = project.gallery.length > 0 ? project.gallery : [project.cover];
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + clips.length) % clips.length);

  return (
    <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 md:items-center">
      <ProjectHeading project={project} align="left" />

      <FadeIn direction="up" className="flex flex-col items-center gap-6">
        <div className="relative mx-auto w-[240px] sm:w-[270px]">
          {/* Handy-Gehäuse */}
          <div className="relative rounded-[2.75rem] border-[10px] border-black bg-black shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
            <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
            <div className="relative overflow-hidden rounded-[2rem]" style={{ aspectRatio: '9 / 19.5' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  className="absolute inset-0"
                >
                  <LazyMedia media={{ ...clips[index], ratio: '9/16' }} rounded={false} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            aria-label="Vorheriger Clip"
            onClick={() => go(-1)}
            className="absolute left-[-2.75rem] top-1/2 hidden -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-black/10 sm:flex hover:bg-black hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            aria-label="Nächster Clip"
            onClick={() => go(1)}
            className="absolute right-[-2.75rem] top-1/2 hidden -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-black/10 sm:flex hover:bg-black hover:text-white transition-colors"
          >
            →
          </button>
        </div>

        <div className="flex items-center gap-2">
          {clips.map((_, i) => (
            <button
              key={i}
              aria-label={`Clip ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-pill transition-all ${
                i === index ? 'w-6 bg-black' : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>
        {clips[index].caption && (
          <p className="text-xs text-black/50 -mt-2">{clips[index].caption}</p>
        )}
      </FadeIn>
    </div>
  );
}
