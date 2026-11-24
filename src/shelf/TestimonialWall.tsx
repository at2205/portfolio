"use client";
/** TestimonialWall — three columns of quotes drifting in alternating directions, fading at the edges and pausing on hover. CSS animation only. React only. */
const Q = [
  ["Cut our retrieval time by a third.", "Priya, Eng lead"], ["The migration just worked.", "Karan, CTO"], ["Clear contracts, no surprises.", "Meera, PM"],
  ["Shipped the pipeline in two weeks.", "Dev, Founder"], ["Calm under pressure.", "Anika, Ops"], ["Would hire again.", "Sam, Director"],
];
export default function TestimonialWall() {
  return (
    <div className="tw" aria-label="Testimonials">
      {[0, 1, 2].map((c) => (
        <div key={c} className="tw-c"><div style={{ animationDirection: c === 1 ? "reverse" : "normal", animationDuration: `${18 + c * 4}s` }}>
          {[...Q, ...Q].map(([q, w], i) => (<figure key={i}><blockquote>“{Q[(i + c * 2) % Q.length][0]}”</blockquote><figcaption>{Q[(i + c * 2) % Q.length][1]}</figcaption></figure>))}
        </div></div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.tw{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:min(520px,100%);height:260px;overflow:hidden;mask-image:linear-gradient(transparent,#000 18%,#000 82%,transparent)}.tw-c>div{display:grid;gap:10px;animation:tw-s 18s linear infinite}.tw:hover .tw-c>div{animation-play-state:paused}.tw figure{margin:0;padding:14px;border-radius:14px;background:#141414;border:1px solid rgba(255,255,255,.1)}.tw blockquote{margin:0 0 8px;font-size:13px;line-height:1.35}.tw figcaption{font:10px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.05em;color:#ff630f}@keyframes tw-s{to{transform:translateY(-50%)}}@media(max-width:480px){.tw{grid-template-columns:1fr 1fr}.tw-c:nth-child(3){display:none}}` }} />
    </div>
  );
}
