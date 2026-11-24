import type { Metadata } from "next";
import { Pill, Reveal, SecHead, Split } from "@/components/ui";
import { certifications, education, experiences, profile, skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: profile.tagline,
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap pageHead">
        <div className="secHead">
          <p className="label"><b>{"//"}</b> Who you would be working with</p>
          <p className="label badge">Taking work now</p>
        </div>
        <Split text="A studio of one" as="h1" className="h-xl" />
        <Reveal delay={0.2}>
          <p className="lead" style={{ marginTop: 32, maxWidth: "30ch" }}>
            {profile.role}. <em>{profile.tagline}</em>
          </p>
        </Reveal>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="ab-grid">
          <Reveal><p className="body" style={{ maxWidth: "62ch" }}>{profile.summary}</p></Reveal>
          <Reveal delay={0.1}>
            <dl className="ab-dl">
              <dt className="label">Based in</dt><dd>{profile.location}</dd>
              <dt className="label">E-mail</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
              <dt className="label">Phone</dt><dd>{profile.phone}</dd>
              <dt className="label">Elsewhere</dt>
              <dd>
                <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>{" · "}
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </dd>
            </dl>
            <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
              <Pill href={profile.resumeUrl} label="Download resume" />
              <Pill href="/contact" label="Start a project" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <SecHead index="01" kicker="Experience" />
        {experiences.map((e) => (
          <Reveal key={e.company} className="ab-job">
            <div>
              <p className="label">{e.period}</p>
              <h2 className="display h-md" style={{ marginTop: 10 }}>{e.company}</h2>
              <p className="body">{e.role} · {e.location}</p>
            </div>
            <ul className="ab-list">
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <SecHead index="02" kicker="Skills" />
        <div className="ab-skills">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <p className="label" style={{ marginBottom: 14 }}>{g.group}</p>
              <div className="ab-chips">
                {g.items.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <SecHead index="03" kicker="Education & notes" />
        <Reveal className="ab-job">
          <div>
            <p className="label">{education.period}</p>
            <h2 className="display h-md" style={{ marginTop: 10 }}>{education.school}</h2>
            <p className="body">{education.degree} · {education.detail}</p>
          </div>
          <ul className="ab-list">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .ab-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(24px,5vw,96px)}
        .ab-dl{display:grid;grid-template-columns:100px 1fr;gap:14px 16px;margin:0}
        .ab-dl dd{margin:0;color:var(--soft)}
        .ab-dl a:hover{color:var(--accent)}
        .ab-job{display:grid;grid-template-columns:1fr 1.5fr;gap:clamp(20px,4vw,80px)}
        .ab-list{display:grid;gap:12px}
        .ab-list li{color:var(--soft);padding-left:18px;position:relative;max-width:70ch}
        .ab-list li::before{content:"✦";position:absolute;left:0;top:5px;font-size:11px;color:var(--accent)}
        .ab-skills{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,3vw,48px)}
        .ab-chips{display:flex;flex-wrap:wrap;gap:8px}
        @media (max-width:900px){.ab-grid,.ab-job{grid-template-columns:1fr}.ab-skills{grid-template-columns:1fr 1fr}}
        @media (max-width:560px){.ab-skills{grid-template-columns:1fr}}
      ` }} />
    </>
  );
}
