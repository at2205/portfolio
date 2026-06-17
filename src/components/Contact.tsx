import { Reveal } from "./animations";
import { profile } from "@/lib/data";
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-glow">
            07 — Contact
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-gradient">great</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/60">
            I&apos;m open to backend, frontend, and full-stack roles. Have a
            project or an opportunity in mind? My inbox is always open.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition-transform hover:scale-105"
            >
              <Mail size={18} />
              {profile.email}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Github, href: profile.socials.github, label: "GitHub" },
              {
                icon: Linkedin,
                href: profile.socials.linkedin,
                label: "LinkedIn",
              },
              { icon: Phone, href: `tel:${profile.phone}`, label: profile.phone },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-colors hover:border-accent hover:text-white"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
