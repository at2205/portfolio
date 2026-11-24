"use client";
import { useState } from "react";

/** A one-line command with a copy button. */
export function CopyLine({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch { const t = document.createElement("textarea"); t.value = text; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <div className="cl">
      <code>{text}</code>
      <button onClick={copy}>{done ? "COPIED ✓" : "COPY ⧉"}</button>
      <style dangerouslySetInnerHTML={{ __html: `.cl{display:flex;align-items:center;gap:12px;padding:10px 10px 10px 16px;border:1px solid var(--rule);border-radius:12px;background:#070707}.cl code{flex:1;min-width:0;overflow-x:auto;white-space:nowrap;font:12.5px var(--f-mono);color:#f0e6d2;scrollbar-width:none}.cl button{flex:none;padding:8px 12px;border:1px solid var(--rule);border-radius:999px;font:11px var(--f-mono);letter-spacing:.06em;transition:border-color .2s,color .2s}.cl button:hover{border-color:var(--accent);color:var(--accent)}` }} />
    </div>
  );
}
