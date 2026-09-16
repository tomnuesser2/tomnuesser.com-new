'use client';

import { MediaRatio } from '@/data/types';

function ratioToStyle(ratio?: MediaRatio): React.CSSProperties {
  if (!ratio) return { aspectRatio: '16 / 9' };
  return { aspectRatio: ratio.replace('/', ' / ') };
}

export default function PlaceholderMedia({
  label,
  ratio,
  kind = 'image',
  className = '',
}: {
  label: string;
  ratio?: MediaRatio;
  kind?: 'image' | 'video';
  className?: string;
}) {
  return (
    <div
      style={ratioToStyle(ratio)}
      className={`relative w-full overflow-hidden rounded-card bg-[repeating-linear-gradient(135deg,#f2f2f2_0px,#f2f2f2_10px,#ffffff_10px,#ffffff_20px)] flex items-center justify-center ${className}`}
    >
      {kind === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-black/80 flex items-center justify-center">
            <div className="ml-1 h-0 w-0 border-y-8 border-y-transparent border-l-[14px] border-l-white" />
          </div>
        </div>
      )}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <span className="text-[11px] leading-tight bg-white/90 px-2 py-1 rounded-full border border-black/10 max-w-[75%] truncate">
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-wide bg-black text-white px-2 py-1 rounded-full shrink-0">
          Platzhalter
        </span>
      </div>
    </div>
  );
}
