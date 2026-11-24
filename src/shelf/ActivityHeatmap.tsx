"use client";
import { useMemo, useState } from "react";
/** ActivityHeatmap — a contribution-style grid, intensity in four steps, with a readout on hover. Pass your own counts. React only. */
export default function ActivityHeatmap({ weeks = 22 }: { weeks?: number }) {
  const data = useMemo(() => {
    let s = 7;
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: weeks * 7 }, () => (r() < 0.25 ? 0 : Math.floor(r() * r() * 12)));
  }, [weeks]);
  const [hover, setHover] = useState<number | null>(null);
  const lvl = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 6 ? 2 : n < 9 ? 3 : 4);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="hm" role="img" aria-label="Activity heatmap">
        {data.map((n, i) => (<i key={i} data-l={lvl(n)} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} />))}
      </div>
      <small style={{ fontFamily: "var(--f-mono,monospace)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.6, minHeight: 16 }}>
        {hover === null ? "Hover a day" : `${data[hover]} contributions · day ${hover + 1}`}
      </small>
      <style dangerouslySetInnerHTML={{ __html: `.hm{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,11px);gap:3px}.hm i{width:11px;height:11px;border-radius:3px;background:#1a1a1a;transition:transform .2s cubic-bezier(.34,1.56,.64,1)}.hm i:hover{transform:scale(1.7)}.hm i[data-l="1"]{background:#4a2410}.hm i[data-l="2"]{background:#8f3f12}.hm i[data-l="3"]{background:#d9560f}.hm i[data-l="4"]{background:#ff8a3d}` }} />
    </div>
  );
}
