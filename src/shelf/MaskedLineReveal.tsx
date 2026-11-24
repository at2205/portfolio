"use client";
import { useEffect, useRef, useState } from "react";
/** MaskedLineReveal — lines climb out from behind their own mask as they enter view, each a beat behind the last. React only. */
export default function MaskedLineReveal({ lines = ["Every line gets", "its own mask,", "and its own beat."] }: { lines?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.6 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: `.ml{overflow:hidden;padding-bottom:.08em}.ml span{display:block;transform:translateY(105%);transition:transform .9s cubic-bezier(.22,1,.36,1)}.ml[data-on="true"] span{transform:none}` }} />
      {lines.map((l, i) => (
        <div key={i} className="ml" data-on={on} style={{ fontFamily: "var(--f-display,system-ui)", fontStretch: "87.5%", fontSize: "clamp(30px,4.4vw,60px)", letterSpacing: "-.04em", lineHeight: 1, textTransform: "uppercase" }}>
          <span style={{ transitionDelay: `${i * 0.12}s` }}>{l}</span>
        </div>
      ))}
    </div>
  );
}
