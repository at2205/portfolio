"use client";
import { useState } from "react";
/** BlurRevealHeadline — rises out of a blur, line by line then letter by letter. Click to replay. React only. */
export default function BlurRevealHeadline({ lines = ["Rises out", "of a blur"] }: { lines?: string[] }) {
  const [k, setK] = useState(0);
  let n = 0;
  return (
    <button key={k} onClick={() => setK((x) => x + 1)} aria-label={lines.join(" ")} style={{ textAlign: "left" }}>
      <style dangerouslySetInnerHTML={{ __html: `.br{display:block;font-family:var(--f-display,system-ui);font-stretch:87.5%;font-size:clamp(36px,5.4vw,72px);letter-spacing:-.045em;line-height:.95;text-transform:uppercase}.br i{font-style:normal;display:inline-block;opacity:0;animation:br-in .9s cubic-bezier(.22,1,.36,1) both}@keyframes br-in{from{opacity:0;filter:blur(18px);transform:translateY(40%)}to{opacity:1;filter:none;transform:none}}` }} />
      {lines.map((l, li) => (
        <span key={li} className="br" aria-hidden="true">
          {[...l].map((c, i) => (
            <i key={i} style={{ animationDelay: `${li * 0.25 + n++ * 0.03}s` }}>{c === " " ? " " : c}</i>
          ))}
        </span>
      ))}
      <span style={{ display: "block", marginTop: 14, fontFamily: "var(--f-mono,monospace)", fontSize: 11, opacity: 0.5, letterSpacing: ".06em", textTransform: "uppercase" }}>Click to replay</span>
    </button>
  );
}
