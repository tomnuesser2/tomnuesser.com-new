'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/data/types';
import LazyMedia from './LazyMedia';
import FadeIn from './FadeIn';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={Math.min(index * 0.08, 0.4)} direction="up">
      <Link href={`/work/${project.slug}/`} className="group block">
        <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <div className="overflow-hidden rounded-card">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <LazyMedia media={project.cover} />
            </motion.div>
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-base md:text-lg">{project.title}</h3>
              <p className="text-sm text-black/60 mt-1">{project.summary}</p>
            </div>
            <span className="shrink-0 text-xs text-black/40 mt-1">{project.year}</span>
          </div>
        </motion.div>
      </Link>
    </FadeIn>
  );
}
