"use client";
import { useRef, useState } from "react";
/** ChatComposer — grows with its content up to a cap, Enter sends, Shift-Enter breaks the line, and the send button stays aligned to the last line. React only. */
export default function ChatComposer() {
  const [v, setV] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const ta = useRef<HTMLTextAreaElement>(null);
  const fit = () => { const t = ta.current!; t.style.height = "auto"; t.style.height = `${Math.min(t.scrollHeight, 140)}px`; };
  const send = () => { if (!v.trim()) return; setSent((s) => [...s, v.trim()].slice(-2)); setV(""); requestAnimationFrame(fit); };
  return (
    <div style={{ width: "min(380px,100%)", display: "grid", gap: 10 }}>
      {sent.map((m, i) => (<p key={i} style={{ margin: 0, justifySelf: "end", maxWidth: "85%", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", background: "#ff630f", color: "#000", fontSize: 14, whiteSpace: "pre-wrap" }}>{m}</p>))}
      <div className="cc">
        <textarea ref={ta} rows={1} value={v} placeholder="Message…" aria-label="Message" onChange={(e) => { setV(e.target.value); fit(); }} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <button aria-label="Send" onClick={send} disabled={!v.trim()}>↑</button>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.cc{display:flex;align-items:flex-end;gap:8px;padding:8px 8px 8px 16px;border-radius:22px;background:#141414;border:1px solid rgba(255,255,255,.14);transition:border-color .2s}.cc:focus-within{border-color:#ff630f}.cc textarea{flex:1;resize:none;background:none;border:0;outline:none;color:#fff;font:inherit;padding:8px 0;max-height:140px}.cc button{width:36px;height:36px;border-radius:50%;background:#ff630f;color:#000;font-size:18px;flex:none;transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .2s}.cc button:disabled{opacity:.3}.cc button:not(:disabled):hover{transform:scale(1.12)}` }} />
    </div>
  );
}
