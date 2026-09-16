'use client';

import { useRef, useState } from 'react';
import type { MediaItem, Project } from '@/data/types';
import LazyMedia from '../LazyMedia';
import ProjectHeading from '../ProjectHeading';
import FadeIn from '../FadeIn';

/**
 * Template: comparison-slider (z. B. "Farblook Test Reel")
 * Eigene Vorher/Nachher-Slider-Implementierung: Ein Griff lässt sich per
 * Maus/Touch ziehen und blendet über clip-path zwischen zwei Bildern um.
 */
export default function ComparisonSlider({ project }: { project: Project }) {
  const pairs = project.comparisons ?? [];

  return (
    <div className="max-w-4xl mx-auto">
      <ProjectHeading project={project} align="center" />

      <div className="mt-14 space-y-16">
        {pairs.map((pair, i) => (
          <FadeIn key={i} direction="up">
            <Comparison before={pair.before} after={pair.after} caption={pair.label} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function Comparison({
  before,
  after,
  caption,
}: {
  before: MediaItem;
  after: MediaItem;
  caption?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, p)));
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-card select-none cursor-ew-resize"
        style={{ aspectRatio: '16 / 9' }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <div className="absolute inset-0">
          <LazyMedia media={after} rounded={false} />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          <LazyMedia media={before} rounded={false} />
        </div>

        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
          style={{ left: `${percent}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white flex items-center justify-center text-[10px] font-bold shadow-md">
            ⇔
          </div>
        </div>

        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide bg-black/70 text-white px-2 py-1 rounded-full">
          Vorher
        </span>
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wide bg-black/70 text-white px-2 py-1 rounded-full">
          Nachher
        </span>
      </div>
      {caption && <p className="mt-3 text-xs text-black/50 text-center">{caption}</p>}
    </div>
  );
}
