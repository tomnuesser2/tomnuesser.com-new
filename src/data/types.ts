/**
 * Datenmodell für Projekte.
 *
 * WICHTIG FÜR TOM:
 * Alle echten Inhalte (Texte, Bilder, Videos) trägst du in
 * `src/data/projects.json` ein – an dieser Datei hier musst du nichts ändern.
 *
 * Jedes Projekt bekommt ein "template" zugewiesen. Das template bestimmt,
 * welche Animation/welches Layout auf der Projektseite verwendet wird
 * (siehe src/components/templates/*).
 */

export type MediaRatio = '16/9' | '9/16' | '4/5' | '1/1' | '3/2';

export interface MediaItem {
  /** 'image' für Fotos/Standbilder, 'video' für bewegtes Material (Vimeo). */
  type: 'image' | 'video';
  /** Sichtbares Label im Platzhalter-Zustand + alt-Text, sobald echtes Medium da ist. */
  label: string;
  /** Seitenverhältnis für den Platzhalter-Rahmen. */
  ratio?: MediaRatio;
  /** Pfad zu einem echten Bild, z. B. "/media/leona/01.jpg". Leer lassen = Platzhalter. */
  src?: string;
  /** Vimeo-Video-ID (nur Ziffern, aus der Vimeo-URL). Leer lassen = Platzhalter. */
  vimeoId?: string;
  /** Optionales Poster-/Vorschaubild für Videos, bevor der Embed lädt. */
  poster?: string;
  /** Kurze Bildunterschrift, optional. */
  caption?: string;
}

export type ProjectTemplate =
  | 'parallax-scroll'
  | 'festival-grid'
  | 'device-mockup'
  | 'comparison-slider'
  | 'scroll-stack'
  | 'cinematic-hero'
  | 'split-showcase'
  | 'timeline-story';

export interface ComparisonPair {
  label?: string;
  before: MediaItem;
  after: MediaItem;
}

export interface TimelineStep {
  label: string;
  text: string;
  media?: MediaItem;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string[];
  client?: string;
  /** Kurzer Teaser-Satz für die Projektkachel auf der Startseite. */
  summary: string;
  /** Fließtext-Absätze für die Projektseite (jeder String = ein Absatz). */
  description: string[];
  template: ProjectTemplate;
  cover: MediaItem;
  gallery: MediaItem[];
  comparisons?: ComparisonPair[];
  timeline?: TimelineStep[];
  links?: ProjectLink[];
  /** Auf der Startseite anzeigen? Praktisch, um Platzhalter erstmal zu verstecken. */
  published?: boolean;
}
