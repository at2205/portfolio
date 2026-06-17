import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./animations";
import { profile, education, certifications } from "@/lib/data";
import { GraduationCap, Award, MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="About me" />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="glass h-full rounded-2xl p-7">
              <p className="text-lg leading-relaxed text-white/75">
                I&apos;m a {profile.role.toLowerCase()} focused on the parts of
                software people rely on but rarely see — secure APIs, resilient
                data layers, and systems that stay fast under real production
                load.
              </p>
              <p className="mt-4 leading-relaxed text-white/60">
                At FINDI Bankit I ship Spring Boot services that move 10K+
                transactions a day, modernize legacy Struts modules, and tune
                SQL until it&apos;s quick. I also enjoy the frontend craft —
                building responsive React &amp; Next.js interfaces that make
                those backends feel effortless.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/60">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
                  <MapPin size={14} className="text-accent-glow" />
                  {profile.location}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <div className="mb-3 flex items-center gap-2 text-accent-glow">
                  <GraduationCap size={18} />
                  <h3 className="font-display text-lg font-semibold text-white">
                    Education
                  </h3>
                </div>
                <p className="font-medium text-white/90">{education.school}</p>
                <p className="text-sm text-white/60">{education.degree}</p>
                <p className="mt-1 font-mono text-xs text-white/45">
                  {education.detail} · {education.period}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-6">
                <div className="mb-3 flex items-center gap-2 text-accent-glow">
                  <Award size={18} />
                  <h3 className="font-display text-lg font-semibold text-white">
                    Highlights
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-white/60">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
