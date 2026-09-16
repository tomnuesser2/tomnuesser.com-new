import type { Project } from '@/data/types';
import FadeIn from './FadeIn';

export default function ProjectHeading({
  project,
  align = 'center',
  className = '',
}: {
  project: Project;
  align?: 'center' | 'left';
  className?: string;
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      <FadeIn direction="up">
        <h1 className="font-bold text-2xl md:text-4xl leading-tight">{project.title}</h1>
      </FadeIn>
      <FadeIn direction="up" delay={0.08}>
        <p
          className={`mt-3 text-xs md:text-sm text-black/50 flex flex-wrap gap-x-2 gap-y-1 ${
            align === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          <span>{project.year}</span>
          {project.client && (
            <>
              <span aria-hidden>·</span>
              <span>{project.client}</span>
            </>
          )}
          {project.role.map((r) => (
            <span key={r} className="before:content-['·'] before:mr-2">
              {r}
            </span>
          ))}
        </p>
      </FadeIn>
      {project.description.map((paragraph, i) => (
        <FadeIn key={i} direction="up" delay={0.12 + i * 0.06}>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-black/80">{paragraph}</p>
        </FadeIn>
      ))}
    </div>
  );
}
