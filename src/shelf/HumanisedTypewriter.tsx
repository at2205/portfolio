"use client";
import { useEffect, useState } from "react";
/** HumanisedTypewriter — uneven rhythm, longer pauses on punctuation, and the occasional typo it backs out of. React only. */
export default function HumanisedTypewriter({ text = "Typed by something that occasionally hesitates, then carries on." }: { text?: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let alive = true;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        let s = "", i = 0;
        setOut("");
        while (alive && i < text.length) {
          const c = text[i];
          if (Math.random() < 0.05 && /[a-z]/.test(c)) {
            s += String.fromCharCode(c.charCodeAt(0) + (Math.random() < 0.5 ? 1 : -1));
            setOut(s); await wait(160); s = s.slice(0, -1); setOut(s); await wait(120);
          }
          s += c; i++; setOut(s);
          await wait(35 + Math.random() * 90 + (/[,.]/.test(c) ? 280 : 0));
        }
        await wait(2400);
      }
    })();
    return () => { alive = false; };
  }, [text]);
  return (
    <p style={{ margin: 0, maxWidth: "26ch", minHeight: "3.6em", fontFamily: "var(--f-mono,monospace)", fontSize: "clamp(16px,1.8vw,22px)", lineHeight: 1.5 }}>
      {out}<span style={{ display: "inline-block", width: ".55em", height: "1.1em", background: "#ff630f", verticalAlign: "text-bottom", marginLeft: 2, animation: "ht-b 1s steps(1) infinite" }} />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes ht-b{50%{opacity:0}}` }} />
    </p>
  );
}
