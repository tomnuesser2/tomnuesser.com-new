'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MediaItem } from '@/data/types';
import PlaceholderMedia from './PlaceholderMedia';
import { useInView } from '@/lib/useInView';

/**
 * Rendert ein einzelnes Medium schnellstmöglich:
 * - Bilder: natives lazy-loading + sanftes Fade-in nach dem Laden.
 * - Videos: Vimeo wird als "Facade" dargestellt (Poster + Play-Button).
 *   Der eigentliche iframe-Embed wird erst geladen, wenn das Element
 *   sichtbar UND angeklickt wurde – so bleibt die Seite beim Scrollen schnell.
 * - Ohne echte Quelle (src/vimeoId) wird ein Platzhalter angezeigt, den
 *   Tom später einfach in projects.json ersetzt.
 */
export default function LazyMedia({
  media,
  className = '',
  rounded = true,
}: {
  media: MediaItem;
  className?: string;
  rounded?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px' });
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const radius = rounded ? 'rounded-card' : '';

  if (media.type === 'image') {
    if (!media.src) {
      return (
        <div ref={ref} className={className}>
          <PlaceholderMedia label={media.label} ratio={media.ratio} kind="image" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`relative w-full overflow-hidden ${radius} ${className}`}
        style={{ aspectRatio: (media.ratio ?? '16/9').replace('/', ' / ') }}
      >
        {!loaded && <div className="absolute inset-0 media-skeleton" />}
        {inView && (
          <motion.img
            src={media.src}
            alt={media.label}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    );
  }

  // type === 'video'
  const canPlay = Boolean(media.vimeoId);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${radius} bg-black ${className}`}
      style={{ aspectRatio: (media.ratio ?? '16/9').replace('/', ' / ') }}
    >
      {playing && canPlay ? (
        <iframe
          src={`https://player.vimeo.com/video/${media.vimeoId}?autoplay=1&muted=0&dnt=1`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          title={media.label}
        />
      ) : (
        <button
          type="button"
          onClick={() => canPlay && setPlaying(true)}
          className="absolute inset-0 h-full w-full group"
          aria-label={canPlay ? `${media.label} abspielen` : media.label}
        >
          {media.poster ? (
            <img
              src={media.poster}
              alt={media.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <PlaceholderMedia label={media.label} ratio={media.ratio} kind="video" />
          )}
          {media.poster && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="ml-1 h-0 w-0 border-y-8 border-y-transparent border-l-[14px] border-l-black" />
              </span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}
