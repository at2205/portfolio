import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, Split } from "@/components/ui";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="wrap pageHead">
        <div className="secHead">
          <p className="label"><b>{"//"}</b> Start a conversation</p>
          <p className="label badge">Taking work now</p>
        </div>
        <Split text="Let's talk" as="h1" className="h-xl" />
      </section>
      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="ct">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="ct-dl">
              <dt className="label">E-mail</dt>
              <dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
              <dt className="label">Phone</dt>
              <dd><a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a></dd>
              <dt className="label">Based in</dt>
              <dd>{profile.location}</dd>
              <dt className="label">Elsewhere</dt>
              <dd>
                <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a><br />
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </dd>
            </dl>
          </Reveal>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: `
        .ct{display:grid;grid-template-columns:1.3fr 1fr;gap:clamp(32px,6vw,120px)}
        .ct-dl{display:grid;gap:6px;margin:0}
        .ct-dl dt{margin-top:22px}
        .ct-dl dd{margin:0;font-family:var(--f-display);font-stretch:87.5%;font-size:clamp(22px,2.4vw,36px);letter-spacing:-.035em}
        .ct-dl a:hover{color:var(--accent)}
        @media (max-width:900px){.ct{grid-template-columns:1fr}}
      ` }} />
    </>
  );
}
