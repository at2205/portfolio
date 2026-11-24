import { HomeHero } from "@/components/HomeHero";
import { Marquee } from "@/components/Marquee";
import { Pill, Reveal, SecHead, Split } from "@/components/ui";
import ScrollRows from "@/resources/ScrollRows";
import DepthStack from "@/resources/DepthStack";
import RotaryCardDeck from "@/resources/RotaryCardDeck";
import DashedRing from "@/resources/DashedRing";
import { backendProjects, frontendDemos, profile, stats } from "@/lib/data";
import { capabilities, marqueeWords, steps } from "@/lib/site";

const tones = [
  "linear-gradient(160deg,#ea4f16,#f6af60 70%)",
  "linear-gradient(160deg,#1a1a1a,#ff630f 120%)",
  "linear-gradient(160deg,#b4460a,#000 90%)",
  "linear-gradient(160deg,#f6af60,#ea4f16 60%,#000)",
];

export default function Home() {
  const all = [...backendProjects, ...frontendDemos];

  return (
    <>
      <HomeHero />

      {/* 01 — statement */}
      <section className="sec wrap">
        <SecHead index="01" kicker="What I do" aside={profile.location} />
        <div className="stmt">
          <Reveal>
            <p className="lead">
              Strategy, architecture and build in one pair of hands. {" "}
              <em>
                The schema, the services, the pipelines and the screens are the same person — so nothing is lost
                in a handover.
              </em>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="stmt-side">
            <p className="body">{profile.summary.split(". ").slice(0, 2).join(". ")}.</p>
            <div className="stmt-chips">
              {["Backend", "LLM systems", "APIs", "Full-stack"].map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <button className="pill ghost" data-open-about style={{ marginTop: 24 }}>
              About me <span aria-hidden="true">↗</span>
            </button>
          </Reveal>
        </div>
        <dl className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="stat">
              <dt className="display">{s.value}</dt>
              <dd className="label">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* 02 — what I ship */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <SecHead index="02" kicker="What I ship" aside="Available for work // '26" />
        <div className="grid3">
          {[
            ["Backend systems", "Secure REST APIs, service layers and migrations on Spring Boot.", ["APIs", "Auth", "Migrations", "SQL"], "/projects"],
            ["LLM automation", "Pipelines that scrape, score and act — observable, resumable, hands-off.", ["Agents", "Playwright", "ATS", "Workflows"], "/contact"],
            ["Full-stack apps", "React and Next.js front ends built against the APIs I design.", ["React", "Next.js", "Real-time", "UX"], "/projects"],
          ].map(([t, d, tags, href], i) => (
            <Reveal key={t as string} delay={i * 0.08}>
              <a className="card ship" href={href as string} data-cursor="Open">
                <span className="label">[0{i + 1}]</span>
                <h3 className="display h-md">{t as string}</h3>
                <p className="body">{d as string}</p>
                <span className="ship-tags">
                  {(tags as string[]).map((x) => (
                    <span key={x} className="chip">{x}</span>
                  ))}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee words={marqueeWords} />

      {/* 03 — capabilities */}
      <section className="sec wrap">
        <SecHead index="03" kicker="Capabilities" />
        <Split text="Designed, built, shipped" className="h-lg" />
        <div style={{ marginTop: "clamp(32px,5vw,72px)" }}>
          <ScrollRows rows={capabilities} />
        </div>
      </section>

      {/* 04 — process */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <SecHead index="04" kicker="Process" aside="Four steps" />
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} className="step">
              <span className="label"><b>{s.step}</b></span>
              <h3 className="display h-md">{s.title}</h3>
              <p className="body">{s.detail}</p>
              <Pill href="/contact" label="Get in touch" variant="ghost" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 — toolkit */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <SecHead index="05" kicker="The toolkit" aside="Free · no sign-up" />
        <div className="tk">
          <Split text="A growing toolkit for people who ship" className="h-lg" />
          <DepthStack
            cards={[
              { kicker: "Free · no sign-up", title: "Resources", body: "Nine components from this site, with the traps and a rebuild prompt.", href: "/resources", tone: tones[0] },
              { kicker: "Everything shipped", title: "Projects", body: "Backend platforms and front-end builds, with stacks and live links.", href: "/projects", tone: tones[1] },
              { kicker: "Who you'd work with", title: "About", body: "Experience, skills and education in one place.", href: "/about", tone: tones[2] },
              { kicker: "Download", title: "Resume", body: "The one-page CV, always current.", href: "/Aryan_Tomar_Resume.doc", tone: tones[3] },
            ]}
          />
        </div>
      </section>

      {/* 06 — shipped */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecHead index="06" kicker="Shipped" aside={`${all.length} projects`} />
          <Split text="Shipped by Aryan" className="h-lg" />
          <p className="body" style={{ margin: "20px 0 12px" }}>Drag, flick or use the arrow keys.</p>
        </div>
        <RotaryCardDeck
          cards={all.map((p, i) => ({
            title: p.title,
            kicker: p.category === "backend" ? "Backend" : "Frontend",
            meta: p.stack.slice(0, 3).join(" · "),
            href: "/projects",
            tone: tones[i % tones.length],
          }))}
        />
        <div className="wrap" style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <Pill href="/projects" label="Explore showcase" />
        </div>
      </section>

      {/* closing */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <DashedRing>
          <p className="label" style={{ marginBottom: 18 }}>{"// No attribution needed"}</p>
          <Split text="Built something with one of these?" as="h2" className="h-md" />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <Pill href="/contact" label="Get in touch" />
          </div>
        </DashedRing>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .stmt{display:grid;grid-template-columns:1.7fr 1fr;gap:clamp(24px,5vw,96px);align-items:start}
        .stmt-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:clamp(48px,7vw,112px) 0 0;padding-top:24px;border-top:1px solid var(--rule)}
        .stat dt{font-size:clamp(40px,6vw,104px)}
        .stat dd{margin:6px 0 0}
        .ship{display:flex;flex-direction:column;gap:18px;min-height:clamp(320px,28vw,440px);height:100%}
        .ship .body{flex:1}
        .ship-tags{display:flex;flex-wrap:wrap;gap:8px}
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(16px,2vw,32px)}
        .step{display:flex;flex-direction:column;gap:16px;align-items:flex-start;padding-top:20px;border-top:1px solid var(--rule)}
        .step .h-md{font-size:clamp(34px,4vw,60px)}
        .tk{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(24px,5vw,80px);align-items:center}
        @media (max-width:900px){
          .stmt,.tk{grid-template-columns:1fr}
          .stats,.steps{grid-template-columns:1fr 1fr}
        }
        @media (max-width:560px){.steps{grid-template-columns:1fr}}
      ` }} />
    </>
  );
}
