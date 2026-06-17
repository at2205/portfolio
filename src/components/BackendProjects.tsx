import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { backendProjects } from "@/lib/data";

export function BackendProjects() {
  return (
    <section id="backend" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title="Backend Projects"
          subtitle="Production-grade, API-driven systems built with Java & Spring Boot. Each links to its live service / API documentation."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {backendProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
