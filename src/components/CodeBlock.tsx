"use client";
import { useState } from "react";
import { highlight } from "@/lib/highlight";

export type CodeFile = { name: string; code: string };

/** Tabbed code viewer: file tabs with sizes, line/KB readout, copy and download for the active tab. */
export function CodeBlock({ files, maxHeight = 460 }: { files: CodeFile[]; maxHeight?: number }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const f = files[i];
  const kb = (n: number) => (n / 1024 < 1 ? `${n}B` : `${(n / 1024).toFixed(n > 10240 ? 0 : 1)}K`);
  const lines = f.code.split("\n").length;

  const copy = async () => {
    try { await navigator.clipboard.writeText(f.code); }
    catch { const t = document.createElement("textarea"); t.value = f.code; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([f.code], { type: "text/plain" }));
    Object.assign(document.createElement("a"), { href: url, download: f.name }).click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cb3">
      <div className="cb3-bar">
        <div role="tablist" className="cb3-tabs">
          {files.map((x, k) => (
            <button key={x.name} role="tab" aria-selected={i === k} onClick={() => setI(k)}>
              {x.name} <small>{kb(x.code.length)}</small>
            </button>
          ))}
        </div>
        <div className="cb3-act">
          <button onClick={download} aria-label={`Download ${f.name}`}>↓</button>
          <button onClick={copy}>{done ? "COPIED ✓" : "COPY ⧉"}</button>
        </div>
      </div>
      <pre tabIndex={0} style={{ maxHeight }} aria-label={`${f.name} source`}><code>{highlight(f.code)}</code></pre>
      <p className="cb3-meta">{lines} lines · {kb(f.code.length)} · {f.name}</p>
      <style dangerouslySetInnerHTML={{ __html: `.cb3{border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:#070707}.cb3-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:8px 10px;border-bottom:1px solid var(--rule)}.cb3-tabs{display:flex;gap:4px;flex-wrap:wrap}.cb3-tabs button{padding:8px 12px;border-radius:8px;font:12px var(--f-mono);letter-spacing:.04em;color:var(--muted);transition:background .2s,color .2s}.cb3-tabs button small{color:var(--accent);margin-left:4px;font-size:10px}.cb3-tabs button[aria-selected="true"]{background:#1a1a1a;color:#fff}.cb3-act{display:flex;gap:6px}.cb3-act button{padding:8px 12px;border:1px solid var(--rule);border-radius:999px;font:11px var(--f-mono);letter-spacing:.06em;transition:border-color .2s,color .2s}.cb3-act button:hover{border-color:var(--accent);color:var(--accent)}.cb3 pre{margin:0;padding:18px 20px;overflow:auto;font:12.5px/1.65 var(--f-mono);color:#d8d2c6;tab-size:2;scrollbar-width:thin}.cb3 pre:focus-visible{outline-offset:-2px}.tk-c{color:#6f6a60;font-style:italic}.tk-s{color:#f6af60}.tk-k{color:#ff630f}.tk-n{color:#9ad6a0}.tk-t{color:#f0e6d2}.cb3-meta{margin:0;padding:8px 14px;border-top:1px solid var(--rule);font:11px var(--f-mono);letter-spacing:.04em;color:var(--muted)}` }} />
    </div>
  );
}
