"use client";
import { useEffect, useState } from "react";
/** AgentSteps — a run of agent steps that stream in, each expanding to show its tool call and collapsing when it succeeds; failures stay open. React only. */
type S = { t: string; tool: string; ok: boolean };
const STEPS: S[] = [
  { t: "Read the job description", tool: "scrape(url) → 4.2 KB", ok: true },
  { t: "Score against profile", tool: "ats.score() → 73.7%", ok: true },
  { t: "Update headline", tool: "playwright.fill() → selector not found", ok: false },
];
export default function AgentSteps() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setN((x) => (x >= STEPS.length + 1 ? 0 : x + 1));
    }, 1400);
    return () => clearInterval(t);
  }, []);
  useEffect(() => setDone(Math.max(0, n - 1)), [n]);
  return (
    <ol className="ag">
      {STEPS.slice(0, n).map((s, i) => {
        const finished = i < done, open = !finished || !s.ok;
        return (
          <li key={s.t} data-state={!finished ? "run" : s.ok ? "ok" : "fail"}>
            <div className="ag-h"><i />{s.t}</div>
            <div className="ag-b" data-open={open}><div><code>{s.tool}</code></div></div>
          </li>
        );
      })}
      <style dangerouslySetInnerHTML={{ __html: `.ag{list-style:none;margin:0;padding:0;display:grid;gap:8px;width:min(380px,100%);min-height:190px;align-content:start}.ag li{padding:12px 14px;border-radius:12px;background:#141414;border:1px solid rgba(255,255,255,.1);animation:ag-in .5s cubic-bezier(.34,1.56,.64,1)}.ag-h{display:flex;align-items:center;gap:10px;font-size:14px}.ag-h i{width:10px;height:10px;border-radius:50%;background:#ff630f;flex:none}li[data-state="run"] .ag-h i{animation:ag-p 1s infinite}li[data-state="ok"] .ag-h i{background:#8bd17c}li[data-state="fail"]{border-color:#d0795a}li[data-state="fail"] .ag-h i{background:#d0795a}.ag-b{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1)}.ag-b[data-open="true"]{grid-template-rows:1fr}.ag-b>div{overflow:hidden}.ag code{display:block;margin-top:10px;font:12px var(--f-mono,monospace);color:rgba(255,255,255,.6)}@keyframes ag-in{from{opacity:0;transform:translateY(12px) scale(.96)}}@keyframes ag-p{50%{opacity:.3}}` }} />
    </ol>
  );
}
