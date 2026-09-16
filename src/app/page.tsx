import { getAllProjects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import ImpressumSection from '@/components/ImpressumSection';
import ScrollToHash from '@/components/ScrollToHash';
import FadeIn from '@/components/FadeIn';

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen px-6 md:px-10 pt-28 pb-40 max-w-6xl mx-auto">
      <ScrollToHash />

      <section id="work" className="scroll-mt-28">
        <FadeIn direction="up">
          <p className="text-xs md:text-sm text-black/50 mb-10 md:mb-14">
            Video · Kamera · Postproduktion — Flensburg &amp; unterwegs
          </p>
        </FadeIn>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <div className="h-24 md:h-32" />

      <ContactSection />

      <div className="h-24 md:h-32" />

      <ImpressumSection />

      <FadeIn direction="up" className="mt-24 md:mt-32">
        <p className="text-xs text-black/40">© tomnuesser. All rights reserved.</p>
      </FadeIn>
    </div>
  );
}
