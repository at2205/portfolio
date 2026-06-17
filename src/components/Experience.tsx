import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./animations";
import { experiences } from "@/lib/data";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          title="Experience"
          subtitle="Where I've been building and shipping production software."
        />

        <div className="relative border-l border-white/10 pl-8">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full border border-accent/40 bg-ink text-accent-glow">
                  <Briefcase size={14} />
                </span>

                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-accent-glow">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    {exp.company} · {exp.location}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-white/70"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
