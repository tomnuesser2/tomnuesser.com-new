import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getProjectBySlug } from '@/data/projects';
import { TEMPLATES } from '@/components/templates';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — tom nuesser`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const Template = TEMPLATES[project.template];

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-36 px-4 sm:px-6 md:px-10">
      <Template project={project} />
    </div>
  );
}
