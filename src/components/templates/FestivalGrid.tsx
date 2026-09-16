'use client';

import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: festival-grid (z. B. "Gården Festival 2026")
 * Grobkörniger, dokumentarischer Look: Hero mit Grain-Overlay, danach ein
 * unregelmäßiges Masonry-Grid aus Fotos/Clips in unterschiedlichen Formaten.
 */
export default function FestivalGrid({ project }: { project: Project }) {
  return (
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <div className="relative overflow-hidden rounded-card">
          <LazyMedia media={project.cover} />
          <div className="grain-overlay rounded-card" />
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <h1 className="font-bold text-2xl md:text-3xl mt-6">{project.title}</h1>
      </FadeIn>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mt-10 [column-fill:_balance]">
        {project.gallery.map((item, i) => (
          <FadeIn key={i} direction="up" delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
            <div className="relative overflow-hidden rounded-card">
              <LazyMedia media={item} />
              {item.type === 'image' && <div className="grain-overlay rounded-card opacity-70" />}
            </div>
          </FadeIn>
        ))}
      </div>

      <ProjectHeading project={project} align="left" className="mt-14 md:mt-20" />
    </div>
  );
}
