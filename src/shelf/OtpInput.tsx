"use client";
import { useRef, useState } from "react";
/** OtpInput — six boxes with auto-advance, backspace-to-previous, arrow keys and paste support. React only. */
export default function OtpInput({ length = 6 }: { length?: number }) {
  const [v, setV] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, c: string) => setV((a) => a.map((x, j) => (j === i ? c : x)));
  return (
    <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
      <div className="otp" onPaste={(e) => {
        const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!t) return; e.preventDefault();
        setV(Array.from({ length }, (_, i) => t[i] ?? ""));
        refs.current[Math.min(t.length, length - 1)]?.focus();
      }}>
        {v.map((c, i) => (
          <input key={i} ref={(el) => { refs.current[i] = el; }} value={c} inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`} autoComplete={i === 0 ? "one-time-code" : "off"}
            onChange={(e) => { const d = e.target.value.replace(/\D/g, ""); set(i, d); if (d && i < length - 1) refs.current[i + 1]?.focus(); }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus();
              if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
              if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
            }} />
        ))}
      </div>
      <small style={{ fontFamily: "var(--f-mono,monospace)", fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: ".06em" }}>
        {v.every(Boolean) ? "Code entered ✓" : "Type or paste a code"}
      </small>
      <style dangerouslySetInnerHTML={{ __html: `.otp{display:flex;gap:8px}.otp input{width:44px;height:56px;text-align:center;font:500 24px var(--f-mono,monospace);color:#fff;background:#141414;border:1px solid rgba(255,255,255,.16);border-radius:12px;outline:none;transition:border-color .2s,transform .3s cubic-bezier(.34,1.56,.64,1)}.otp input:focus{border-color:#ff630f;transform:translateY(-3px)}` }} />
    </div>
  );
}
