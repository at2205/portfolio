"use client";
/** BentoGrid — tiles lift and re-light under the pointer; the grid re-flows at each breakpoint. React only. */
const TILES = [
  ["API", "10K+ daily", "span 2"], ["LLM", "152 jobs", "span 1"],
  ["SQL", "−35% latency", "span 1"], ["UI", "React + Next", "span 2"],
];
export default function BentoGrid() {
  return (
    <div className="bg">
      {TILES.map(([t, s, span]) => (
        <div key={t} className="bg-t" style={{ gridColumn: span }}
          onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`); }}>
          <b>{t}</b><span>{s}</span>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.bg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:min(460px,100%)}.bg-t{position:relative;min-height:110px;padding:16px;border-radius:18px;background:#141414;border:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;transition:transform .4s cubic-bezier(.22,1,.36,1),border-color .3s}.bg-t::before{content:"";position:absolute;inset:0;background:radial-gradient(180px circle at var(--mx,50%) var(--my,50%),rgba(255,99,15,.32),transparent 65%);opacity:0;transition:opacity .3s}.bg-t:hover{transform:translateY(-4px);border-color:#ff630f}.bg-t:hover::before{opacity:1}.bg-t>*{position:relative}.bg-t b{font:500 28px var(--f-display,system-ui);font-stretch:87.5%}.bg-t span{font:11px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;opacity:.7}@media(max-width:480px){.bg{grid-template-columns:1fr 1fr}.bg-t{grid-column:span 1!important}}` }} />
    </div>
  );
}
