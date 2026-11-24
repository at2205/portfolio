"use client";
import { useState } from "react";
import type { Project } from "@/lib/data";
import { Reveal } from "@/components/ui";

const tones = [
  "linear-gradient(135deg,#ea4f16,#f6af60)",
  "linear-gradient(135deg,#111,#ff630f 140%)",
  "linear-gradient(135deg,#b4460a,#000)",
  "linear-gradient(135deg,#f6af60,#ea4f16 60%,#222)",
];

export function ProjectsList({ projects }: { projects: Project[] }) {
  const [f, setF] = useState<"all" | "backend" | "frontend">("all");
  const shown = projects.filter((p) => f === "all" || p.category === f);
  const n = (c: string) => projects.filter((p) => p.category === c).length;

  return (
    <div className="wrap">
      <div className="pl-bar">
        <span className="label">Kind</span>
        {(["all", "backend", "frontend"] as const).map((k) => (
          <button key={k} className={`chip ${f === k ? "on" : ""}`} onClick={() => setF(k)}>
            {k} {k === "all" ? projects.length : n(k)}
          </button>
        ))}
      </div>
      <ul className="pl">
        {shown.map((p) => {
          const i = projects.indexOf(p);
          return (
            <Reveal as="li" key={p.title} className="pl-item">
              <div className="pl-thumb" style={{ background: tones[i % tones.length] }} aria-hidden="true">
                <span className="display">{String(i + 1).padStart(2, "0")}</span>
                <span className="label" style={{ color: "#000" }}>{p.category}</span>
              </div>
              <div className="pl-main">
                <h2 className="display h-md">{p.title}</h2>
                <p className="body">{p.blurb}</p>
                <div className="pl-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                <details>
                  <summary data-cursor="Open">What I built</summary>
                  <ul>
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </details>
                <div className="pl-links">
                  {p.liveUrl && (
                    <a className="pill" href={p.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>
                  )}
                  {p.apiDocsUrl && p.apiDocsUrl !== p.liveUrl && (
                    <a className="pill ghost" href={p.apiDocsUrl} target="_blank" rel="noreferrer">API docs ↗</a>
                  )}
                  {p.repoUrl && (
                    <a className="pill ghost" href={p.repoUrl} target="_blank" rel="noreferrer">Source ↗</a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
      <style dangerouslySetInnerHTML={{ __html: `
        .pl-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:18px 0;border-block:1px solid var(--rule)}
        .pl-bar .chip{text-transform:uppercase}
        .pl{display:flex;flex-direction:column}
        .pl-item{display:grid;grid-template-columns:minmax(220px,.8fr) 2fr;gap:clamp(20px,4vw,72px);padding:clamp(32px,5vw,72px) 0;border-bottom:1px solid var(--rule)}
        .pl-thumb{aspect-ratio:4/3;border-radius:20px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;color:#000;position:sticky;top:96px;align-self:start}
        .pl-thumb .display{font-size:clamp(48px,6vw,96px)}
        .pl-main{display:flex;flex-direction:column;gap:18px;align-items:flex-start}
        .pl-stack{display:flex;flex-wrap:wrap;gap:8px}
        .pl-main details{width:100%;border-block:1px solid var(--rule);padding:14px 0}
        .pl-main summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;font-family:var(--f-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft)}
        .pl-main summary::after{content:"+";color:var(--accent)}
        .pl-main details[open] summary::after{content:"–"}
        .pl-main details ul{margin-top:14px;display:grid;gap:10px}
        .pl-main details li{color:var(--soft);padding-left:18px;position:relative;max-width:70ch}
        .pl-main details li::before{content:"✦";position:absolute;left:0;top:5px;font-size:11px;color:var(--accent)}
        .pl-links{display:flex;gap:10px;flex-wrap:wrap}
        @media (max-width:800px){.pl-item{grid-template-columns:1fr}.pl-thumb{position:static;aspect-ratio:16/9}}
      ` }} />
    </div>
  );
}
