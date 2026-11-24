"use client";
import { useState } from "react";
import { demos } from "@/components/ResourceDemos";
import { kinds, type Kind, type Resource } from "@/lib/resources";
import { Reveal } from "@/components/ui";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyLine } from "@/components/CopyLine";

type Item = Resource & { source: string };

function useCopy() {
  const [done, setDone] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.append(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(key);
    setTimeout(() => setDone((d) => (d === key ? null : d)), 1600);
  };
  return [done, copy] as const;
}

export function ResourceLibrary({ items }: { items: Item[] }) {
  const [kind, setKind] = useState<Kind | "All">("All");
  const [done, copy] = useCopy();
  const shown = items.filter((i) => kind === "All" || i.kind === kind);
  const count = (k: Kind) => items.filter((i) => i.kind === k).length;

  const download = (it: Item) => {
    const url = URL.createObjectURL(new Blob([it.source], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: it.file });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="wrap">
      <div className="lib-bar">
        <span className="label">Kind</span>
        <div className="lib-chips" role="tablist">
          <button className={`chip ${kind === "All" ? "on" : ""}`} onClick={() => setKind("All")}>
            All {items.length}
          </button>
          {kinds.map((k) => (
            <button key={k} className={`chip ${kind === k ? "on" : ""}`} onClick={() => setKind(k)}>
              {k} {count(k)}
            </button>
          ))}
        </div>
      </div>

      <nav className="lib-toc" aria-label="Contents">
        <p className="label">Contents</p>
        <ol>
          {shown.map((it) => (
            <li key={it.slug}>
              <a href={`#${it.slug}`}>
                <span className="label">{String(items.indexOf(it) + 1).padStart(2, "0")}</span>
                {it.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="lib-list">
        {shown.map((it) => {
          const n = String(items.indexOf(it) + 1).padStart(2, "0");
          return (
            <Reveal key={it.slug}>
              <article id={it.slug} className="res">
                <header className="res-head">
                  <div>
                    <p className="label">
                      <b>{n}</b> &nbsp;{it.kind} · {it.readMin} min read
                    </p>
                    <h2 className="display res-title">{it.title}</h2>
                  </div>
                  <p className="body">{it.blurb}</p>
                </header>

                <div className="frame res-demo">{demos[it.slug]?.()}</div>

                <div className="res-foot">
                  <div className="res-tags">
                    {it.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                  <div className="res-actions">
                    <button className="pill" onClick={() => copy(it.slug, it.source)}>
                      {done === it.slug ? "Copied ✓" : "Copy the component ⧉"}
                    </button>
                    <button className="pill ghost" onClick={() => download(it)} aria-label={`Download ${it.file}`}>
                      {it.file} ↓
                    </button>
                  </div>
                </div>

                <div className="res-more">
                  <details open>
                    <summary data-cursor="Open">The code — all of it, {it.source.split("\n").length} lines</summary>
                    <div style={{ marginTop: 14 }}><CodeBlock files={[{ name: it.file, code: it.source }]} maxHeight={420} /><div style={{ marginTop: 10 }}><CopyLine text={`npx shadcn@latest add ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com"}/r/${it.slug}.json`} /></div></div>
                  </details>
                  <details>
                    <summary data-cursor="Open">The traps — what went wrong building it</summary>
                    <ul>
                      {it.traps.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </details>
                  <details>
                    <summary data-cursor="Open">A prompt that rebuilds it</summary>
                    <p className="res-prompt">{it.prompt}</p>
                    <button className="chip" onClick={() => copy(`${it.slug}-p`, it.prompt)}>
                      {done === `${it.slug}-p` ? "Copied ✓" : "Copy prompt ⧉"}
                    </button>
                  </details>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .lib-bar{display:flex;align-items:center;gap:20px;padding:18px 0;border-block:1px solid var(--rule)}
        .lib-chips{display:flex;gap:8px;flex-wrap:wrap}
        .lib-toc{display:grid;grid-template-columns:140px 1fr;gap:16px;padding:28px 0;border-bottom:1px solid var(--rule)}
        .lib-toc ol{display:grid;grid-template-columns:repeat(3,1fr);gap:4px 24px}
        .lib-toc a{display:flex;gap:14px;align-items:baseline;padding:6px 0;font-family:var(--f-display);font-stretch:87.5%;font-size:clamp(20px,2vw,28px);letter-spacing:-.03em;transition:color .2s}
        .lib-toc a:hover{color:var(--accent)}
        .lib-list{display:flex;flex-direction:column;gap:clamp(56px,8vw,128px);padding-block:clamp(40px,6vw,96px)}
        .res-head{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(16px,4vw,64px);align-items:end;margin-bottom:24px}
        .res-title{font-size:clamp(40px,6.4vw,112px);margin-top:12px}
        .res-demo{min-height:320px}
        .demo-fill{background:radial-gradient(120% 90% at 50% 120%,rgba(255,99,15,.16),transparent 60%),#050505}
        .res-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:20px}
        .res-tags,.res-actions{display:flex;gap:8px;flex-wrap:wrap}
        .res-more{margin-top:24px;border-top:1px solid var(--rule)}
        .res-more details{border-bottom:1px solid var(--rule);padding:16px 0}
        .res-more summary{cursor:pointer;font-family:var(--f-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);list-style:none;display:flex;justify-content:space-between}
        .res-more summary::after{content:"+";color:var(--accent);font-size:18px;line-height:1}
        .res-more details[open] summary::after{content:"–"}
        .res-more ul{margin-top:14px;display:grid;gap:10px;max-width:80ch}
        .res-more li{color:var(--soft);padding-left:18px;position:relative}
        .res-more li::before{content:"✦";position:absolute;left:0;color:var(--accent);font-size:11px;top:5px}
        .res-prompt{margin:14px 0 16px;max-width:80ch;color:var(--soft);font-family:var(--f-mono);font-size:13px;line-height:1.7}
        @media (max-width:900px){
          .res-head,.lib-toc{grid-template-columns:1fr}
          .lib-toc ol{grid-template-columns:1fr 1fr}
        }
      ` }} />
    </div>
  );
}
