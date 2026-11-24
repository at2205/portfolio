import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyLine } from "@/components/CopyLine";
import { extractProps, extractTokens } from "@/lib/extract";
import { installCommand, SITE_IS_PLACEHOLDER } from "@/lib/registry";
import { ShelfDemo } from "@/components/ShelfDemo";
import { Pill, Reveal, Split } from "@/components/ui";
import { shelf, slugOf } from "@/lib/shelf";

export const dynamicParams = false;
export function generateStaticParams() {
  return shelf.map((s) => ({ slug: slugOf(s.file) }));
}

const find = (slug: string) => shelf.findIndex((s) => slugOf(s.file) === slug);

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = shelf[find(params.slug)];
  return s ? { title: s.title, description: s.blurb } : {};
}

export default function ComponentPage({ params }: { params: { slug: string } }) {
  const i = find(params.slug);
  if (i < 0) notFound();
  const it = shelf[i];
  const next = shelf[(i + 1) % shelf.length];
  const read = (f: string) => fs.readFileSync(path.join(process.cwd(), "src", "shelf", f), "utf8");
  const files = [{ name: `${it.file}.tsx`, code: read(`${it.file}.tsx`) }];
  if (it.helper) files.push({ name: `${it.helper}.tsx`, code: read(`${it.helper}.tsx`) });
  const props = extractProps(files[0].code);
  const tokens = extractTokens(files[0].code);
  const slug = slugOf(it.file);
  const needs = it.helper === "_three" ? "three.js + the _three.tsx helper" : it.helper === "_gl" ? "the _gl.tsx helper (no packages)" : "nothing but React";

  return (
    <>
      <section className="wrap pageHead" style={{ paddingBottom: 24 }}>
        <div className="secHead">
          <p className="label"><b>{"//"}</b> {it.kind}</p>
          <p className="label">{String(i + 1).padStart(3, "0")} / {shelf.length}</p>
        </div>
        <Split text={it.title} as="h1" className="h-lg" />
        <Reveal delay={0.15}><p className="body" style={{ marginTop: 22 }}>{it.blurb}</p></Reveal>
      </section>

      <div className="wrap cp-layout">
        <div className="cp-main">
          <div className="frame cp-demo"><div className="cp-stage"><ShelfDemo file={it.file} /></div></div>

          <section id="code" style={{ marginTop: 48 }}>
            <p className="label" style={{ marginBottom: 10 }}>The code</p>
            <p className="body" style={{ marginBottom: 18 }}>
              All of it, in {files.length === 1 ? "one file" : `${files.length} files`}: the component above, restyle included.
              {it.helper ? " The second tab is the small helper it shares with the other WebGL pieces — save both side by side." : " Nothing imported but React."}
            </p>
            <CodeBlock files={files} />
          </section>

          {props.length > 0 && (
            <section style={{ marginTop: 48 }}>
              <p className="label" style={{ marginBottom: 14 }}>Props</p>
              <table className="cp-t"><thead><tr><th>Prop</th><th>Default</th></tr></thead>
                <tbody>{props.map((p) => (<tr key={p.name}><td><code>{p.name}</code></td><td>{p.def ? <code>{p.def}</code> : <span className="label">required</span>}</td></tr>))}</tbody></table>
            </section>
          )}

          {tokens.length > 0 && (
            <section style={{ marginTop: 48 }}>
              <p className="label" style={{ marginBottom: 14 }}>Theme tokens it reads</p>
              <p className="body" style={{ marginBottom: 14 }}>Set these on <code>:root</code> to re-skin it. Each has a fallback, so it also works with none of them defined.</p>
              <table className="cp-t"><thead><tr><th>Variable</th><th>Fallback</th><th>What it does</th></tr></thead>
                <tbody>{tokens.map((t) => (<tr key={t.name}><td><code>{t.name}</code></td><td>{t.fallback ? <code>{t.fallback}</code> : "—"}</td><td>{t.meaning}</td></tr>))}</tbody></table>
            </section>
          )}

          <section style={{ marginTop: 48 }}>
            <p className="label" style={{ marginBottom: 14 }}>Or install it</p>
            <p className="body" style={{ marginBottom: 14 }}>
              Published to a shadcn-style registry, so one command fetches {files.length === 1 ? "the file" : "the files"} straight into your project{it.helper === "_three" ? ", and adds three.js" : ""}.
            </p>
            <CopyLine text={installCommand(slug)} />
            {SITE_IS_PLACEHOLDER && <p className="label" style={{ marginTop: 10 }}>Placeholder domain — set NEXT_PUBLIC_SITE_URL to your deployed origin and the command updates.</p>}
          </section>
        </div>

        <aside className="cp-side">
          <a className="pill" href="#code" style={{ justifyContent: "center" }}>Jump to the code ↓</a>
          <p>One self-contained component. Needs <b>{needs}</b>.</p>
          {it.helper === "_three" && <p className="cp-code">npm i three @types/three</p>}
          <p><b>Free to use.</b> Take it, change it, ship it — no attribution needed.</p>
          <a href="/components">← All {shelf.length} components</a>
          <a href={`/components/${slugOf(next.file)}`}>Next: {next.title} →</a>
          <a href="/resources">My nine deep dives →</a>
        </aside>
      </div>

      <section className="sec wrap" style={{ textAlign: "center" }}>
        <p className="label" style={{ marginBottom: 18 }}>{"// Next up"}</p>
        <Split text={next.title} className="h-lg" />
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Pill href={`/components/${slugOf(next.file)}`} label="Open it" />
          <Pill href="/contact" label="Get in touch" variant="ghost" />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .cp-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:clamp(24px,4vw,64px);align-items:start;padding-bottom:clamp(40px,6vw,96px)}
        .cp-demo{min-height:380px}
        .cp-stage{min-height:380px;display:grid;place-items:center;padding:32px 16px;overflow:hidden;background:radial-gradient(120% 90% at 50% 130%,rgba(255,99,15,.16),transparent 60%),#050505}
        .cp-side{position:sticky;top:96px;display:grid;gap:14px;padding:20px;border:1px solid var(--rule);border-radius:18px;font-size:14px;color:var(--soft)}
        .cp-side p{margin:0}.cp-side b{color:#fff;font-weight:500}
        .cp-side a:not(.pill){transition:color .2s}.cp-side a:not(.pill):hover{color:var(--accent)}
        .cp-t{width:100%;border-collapse:collapse;font-size:14px}.cp-t th{text-align:left;padding:10px 14px;font:11px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--rule)}.cp-t td{padding:12px 14px;border-bottom:1px solid var(--rule);vertical-align:top;color:var(--soft)}.cp-t code,.cp-main p code{font:12.5px var(--f-mono);color:#fff}.cp-t td:first-child code{color:var(--accent)}
        .cp-code{font:12px var(--f-mono);padding:10px 12px;border-radius:10px;background:#0b0b0b;border:1px solid var(--rule);color:#fff}
        @media (max-width:900px){.cp-layout{grid-template-columns:1fr}.cp-side{position:static}}
      ` }} />
    </>
  );
}
