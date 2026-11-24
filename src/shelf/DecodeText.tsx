"use client";
import { useEffect, useRef, useState } from "react";
/** DecodeText — resolves out of cycling glyphs, left to right. Re-runs on hover. React only. */
const G = "!<>-_\\/[]{}—=+*^?#%&";
export default function DecodeText({ text = "Decode the signal" }: { text?: string }) {
  const [out, setOut] = useState(text);
  const t = useRef<ReturnType<typeof setInterval>>();
  const run = () => {
    clearInterval(t.current);
    let f = 0;
    t.current = setInterval(() => {
      f++;
      setOut([...text].map((c, i) => (c === " " ? " " : i < f / 2 ? c : G[Math.floor(Math.random() * G.length)])).join(""));
      if (f > text.length * 2) clearInterval(t.current);
    }, 32);
  };
  useEffect(() => {
    run();
    return () => clearInterval(t.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <p onPointerEnter={run} aria-label={text} style={{ margin: 0, fontFamily: "var(--f-mono,monospace)", fontSize: "clamp(20px,2.6vw,34px)", letterSpacing: ".02em", color: "#ff630f", minHeight: "1.2em" }}>
      {out}
    </p>
  );
}
