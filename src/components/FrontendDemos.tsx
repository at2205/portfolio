import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { frontendDemos } from "@/lib/data";

export function FrontendDemos() {
  return (
    <section id="frontend" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          title="Frontend Demos"
          subtitle="Interactive, client-side experiences built with React, Next.js, and real-time web technologies."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {frontendDemos.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
