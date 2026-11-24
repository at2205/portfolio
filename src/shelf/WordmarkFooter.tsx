"use client";
/** WordmarkFooter — a footer with a huge outlined wordmark whose letters fill with the accent one at a time as the pointer passes. Links stay real links. React only. */
export default function WordmarkFooter({ word = "ARYAN" }: { word?: string }) {
  return (
    <footer className="wm">
      <div className="wm-l"><a href="#top">Projects</a><a href="#top">Resources</a><a href="#top">Contact</a></div>
      <p aria-label={word}>{[...word].map((c, i) => (<span key={i} aria-hidden="true">{c}</span>))}</p>
      <style dangerouslySetInnerHTML={{ __html: `.wm{width:min(480px,100%);overflow:hidden;padding-top:10px}.wm-l{display:flex;gap:18px;font-size:14px;color:rgba(255,255,255,.65)}.wm-l a:hover{color:#ff630f}.wm p{margin:6px 0 0;display:flex;justify-content:space-between;font:600 clamp(80px,19vw,130px)/.82 var(--f-display,system-ui);font-stretch:87.5%;letter-spacing:-.05em}.wm span{color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.3);transition:color .9s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.34,1.56,.64,1),-webkit-text-stroke-color .9s;cursor:default}.wm span:hover{color:#ff630f;-webkit-text-stroke-color:#ff630f;transform:translateY(-8px);transition-duration:.12s}` }} />
    </footer>
  );
}
