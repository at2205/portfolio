"use client";
import { useState } from "react";
/** PasswordMeter — scores length, case, digits and symbols into four segments, with a show/hide toggle and one concrete hint. Not a substitute for server checks. React only. */
export default function PasswordMeter() {
  const [v, setV] = useState("");
  const [show, setShow] = useState(false);
  const checks = [v.length >= 10, /[a-z]/.test(v) && /[A-Z]/.test(v), /\d/.test(v), /[^A-Za-z0-9]/.test(v)];
  const score = v ? checks.filter(Boolean).length : 0;
  const hint = !v ? "Start typing" : !checks[0] ? "Use at least 10 characters" : !checks[1] ? "Mix upper and lower case" : !checks[2] ? "Add a number" : !checks[3] ? "Add a symbol" : "Strong";
  const color = ["#2a2a2a", "#d0795a", "#f6af60", "#ff630f", "#8bd17c"][score];
  return (
    <div style={{ width: "min(320px,100%)", display: "grid", gap: 10 }}>
      <div className="pw"><input type={show ? "text" : "password"} value={v} onChange={(e) => setV(e.target.value)} placeholder="Password" aria-label="Password" autoComplete="new-password" />
        <button onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>{show ? "Hide" : "Show"}</button></div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4].map((n) => (<i key={n} style={{ flex: 1, height: 4, borderRadius: 4, background: n <= score ? color : "#2a2a2a", transition: "background .35s" }} />))}
      </div>
      <small style={{ fontFamily: "var(--f-mono,monospace)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color }} aria-live="polite">{hint}</small>
      <style dangerouslySetInnerHTML={{ __html: `.pw{display:flex;border-radius:12px;background:#141414;border:1px solid rgba(255,255,255,.14);transition:border-color .2s}.pw:focus-within{border-color:#ff630f}.pw input{flex:1;min-width:0;padding:14px 16px;background:none;border:0;color:#fff;font:inherit;outline:none}.pw button{padding:0 16px;font:11px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;opacity:.7}` }} />
    </div>
  );
}
