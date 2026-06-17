import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./animations";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          title="Skills & Tooling"
          subtitle="The technologies I reach for when building and shipping software."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-glow">
                  {group.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75 transition-colors hover:border-accent/40 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
