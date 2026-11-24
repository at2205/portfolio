"use client";
import { useEffect, useState } from "react";
/** ThinkingText — a "thinking" label with a travelling shimmer and rotating verbs. Respects reduced motion. React only. */
const V = ["Thinking", "Reading the schema", "Planning the query", "Checking edge cases", "Drafting"];
export default function ThinkingText() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % V.length), 1800); return () => clearInterval(t); }, []);
  return (
    <p className="tk-t" key={i} aria-live="polite">{V[i]}…
      <style dangerouslySetInnerHTML={{ __html: `.tk-t{margin:0;font:500 clamp(22px,3vw,34px) var(--f-display,system-ui);font-stretch:90%;letter-spacing:-.03em;color:transparent;background:linear-gradient(100deg,#555 30%,#fff 50%,#555 70%) 0 0/250% 100%;-webkit-background-clip:text;background-clip:text;animation:tk-s 1.6s linear infinite,tk-in .5s cubic-bezier(.22,1,.36,1)}@keyframes tk-s{to{background-position:-150% 0}}@keyframes tk-in{from{opacity:0;transform:translateY(10px);filter:blur(6px)}}@media(prefers-reduced-motion:reduce){.tk-t{animation:none;color:#aaa}}` }} />
    </p>
  );
}
