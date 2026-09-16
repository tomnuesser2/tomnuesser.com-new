import rawProjects from './projects.json';
import type { Project } from './types';

// JSON wird hier nur einmal typisiert – Bearbeitung passiert ausschließlich in projects.json.
const projects = rawProjects as Project[];

export function getAllProjects(): Project[] {
  return projects.filter((p) => p.published !== false);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
