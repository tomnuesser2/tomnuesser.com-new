'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from '@/lib/useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

const TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
} as const;

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  as = 'div',
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof TAGS;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const offset = OFFSETS[direction];
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      // MotionTag ist ein Union-Typ (div | span | li | section), daher
      // verlangt TypeScript einen ref, der auf ALLE Varianten gleichzeitig
      // passt. Zur Laufzeit wird aber immer nur ein Tag gerendert, daher
      // ist der Cast hier sicher.
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
