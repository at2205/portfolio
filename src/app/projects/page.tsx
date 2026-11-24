import type { Metadata } from "next";
import { ProjectsList } from "@/components/ProjectsList";
import { Split, Reveal } from "@/components/ui";
import { backendProjects, frontendDemos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Backend platforms, LLM automation and front-end builds — everything shipped.",
};

export default function ProjectsPage() {
  const all = [...backendProjects, ...frontendDemos];
  return (
    <>
      <section className="wrap pageHead">
        <div className="secHead">
          <p className="label"><b>{"//"}</b> Everything shipped</p>
          <p className="label">{all.length} projects</p>
        </div>
        <Split text="Projects" as="h1" className="h-xl" />
        <Reveal delay={0.2}>
          <p className="body" style={{ marginTop: 28 }}>
            Production backends, automation pipelines and the interfaces on top of them — with stacks, what I built
            and live links where they exist.
          </p>
        </Reveal>
      </section>
      <ProjectsList projects={all} />
    </>
  );
}
