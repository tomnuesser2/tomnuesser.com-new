'use client';

import type { Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: split-showcase (z. B. "Behind the Scenes")
 * Links bleibt der Text beim Scrollen stehen (sticky), rechts zieht die
 * Bilderstrecke vorbei – gut geeignet, um Set-Fotos & finale Aufnahmen
 * paarweise gegenüberzustellen.
 */
export default function SplitShowcase({ project }: { project: Project }) {
  return (
    <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
      <div className="md:sticky md:top-28 md:self-start">
        <ProjectHeading project={project} align="left" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {project.gallery.map((item, i) => (
          <FadeIn
            key={i}
            direction="up"
            delay={(i % 2) * 0.1}
            className={i % 4 === 0 || i % 4 === 3 ? 'col-span-2' : ''}
          >
            <LazyMedia media={item} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
