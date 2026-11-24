"use client";
/** NotFound404 — a 404 whose zeros are a ring of ticks that rotate against each other, with one clear way home. CSS only. React only. */
export default function NotFound404() {
  return (
    <div className="nf">
      <div className="nf-n"><span>4</span><span className="nf-z"><i /><i /></span><span>4</span></div>
      <p>This page took a wrong turn.</p>
      <a className="pill" href="/">Back home</a>
      <style dangerouslySetInnerHTML={{ __html: `.nf{display:grid;justify-items:center;gap:14px;text-align:center}.nf-n{display:flex;align-items:center;font:600 clamp(80px,12vw,130px)/1 var(--f-display,system-ui);font-stretch:87.5%;letter-spacing:-.05em}.nf-z{position:relative;width:.8em;height:.8em;margin:0 .04em}.nf-z i{position:absolute;inset:0;border-radius:50%;background:repeating-conic-gradient(#ff630f 0 4deg,transparent 4deg 12deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 14px),#000 calc(100% - 13px));mask:radial-gradient(farthest-side,transparent calc(100% - 14px),#000 calc(100% - 13px));animation:nf-r 14s linear infinite}.nf-z i+i{inset:12%;opacity:.6;animation-direction:reverse;animation-duration:9s}.nf p{margin:0;color:rgba(255,255,255,.65)}@keyframes nf-r{to{transform:rotate(1turn)}}` }} />
    </div>
  );
}
