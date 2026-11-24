"use client";
import { useState } from "react";
/** PromptChips — suggested prompts as chips that wrap, scroll sideways when they overflow, and drop their text into the field. React only. */
const P = ["Summarise this PR", "Explain the schema", "Find slow queries", "Draft release notes", "Review auth flow"];
export default function PromptChips() {
  const [v, setV] = useState("");
  return (
    <div style={{ display: "grid", gap: 12, width: "min(420px,100%)" }}>
      <div className="pc-r">{P.map((p) => (<button key={p} className="chip" onClick={() => setV(p)}>{p}</button>))}</div>
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Ask anything…" aria-label="Prompt" className="pc-i" />
      <style dangerouslySetInnerHTML={{ __html: `.pc-r{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;mask-image:linear-gradient(90deg,#000 88%,transparent)}.pc-r .chip{flex:none;height:36px;transition:transform .3s cubic-bezier(.34,1.56,.64,1),border-color .2s,color .2s}.pc-r .chip:hover{transform:translateY(-3px);border-color:#ff630f;color:#ff630f}.pc-i{padding:14px 18px;border-radius:14px;background:#141414;border:1px solid rgba(255,255,255,.14);color:#fff;font:inherit;outline:none;transition:border-color .2s}.pc-i:focus{border-color:#ff630f}` }} />
    </div>
  );
}
