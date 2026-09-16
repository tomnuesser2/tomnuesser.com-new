import type { ComponentType } from 'react';
import type { Project, ProjectTemplate } from '@/data/types';
import ParallaxScroll from './ParallaxScroll';
import FestivalGrid from './FestivalGrid';
import DeviceMockup from './DeviceMockup';
import ComparisonSlider from './ComparisonSlider';
import ScrollStack from './ScrollStack';
import CinematicHero from './CinematicHero';
import SplitShowcase from './SplitShowcase';
import TimelineStory from './TimelineStory';

export const TEMPLATES: Record<ProjectTemplate, ComponentType<{ project: Project }>> = {
  'parallax-scroll': ParallaxScroll,
  'festival-grid': FestivalGrid,
  'device-mockup': DeviceMockup,
  'comparison-slider': ComparisonSlider,
  'scroll-stack': ScrollStack,
  'cinematic-hero': CinematicHero,
  'split-showcase': SplitShowcase,
  'timeline-story': TimelineStory,
};
