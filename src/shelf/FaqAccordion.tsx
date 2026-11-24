"use client";
import { useState } from "react";
/** FaqAccordion — animates its own height (grid-template-rows 0fr→1fr), one panel open at a time, chevron on the same curve. React only. */
const QA = [
  ["How fast can you start?", "Usually within two weeks. A short call decides scope first."],
  ["Do you work with existing codebases?", "Yes — migrating legacy modules is a large part of the work."],
  ["What does a project cost?", "Fixed scope, fixed price, agreed after the call."],
];
export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="fq">
      {QA.map(([q, a], i) => (
        <div key={q} className="fq-i" data-open={open === i}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span>{q}</span><i aria-hidden="true">+</i>
          </button>
          <div className="fq-b"><div><p>{a}</p></div></div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.fq{width:min(460px,100%);border-top:1px solid rgba(255,255,255,.14)}.fq-i{border-bottom:1px solid rgba(255,255,255,.14)}.fq-i button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 0;text-align:left;font-size:17px}.fq-i i{font-style:normal;font-size:22px;color:#ff630f;transition:transform .5s cubic-bezier(.22,1,.36,1)}.fq-i[data-open="true"] i{transform:rotate(135deg)}.fq-b{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.22,1,.36,1)}.fq-i[data-open="true"] .fq-b{grid-template-rows:1fr}.fq-b>div{overflow:hidden}.fq-b p{margin:0 0 16px;color:rgba(255,255,255,.7);font-size:14px}` }} />
    </div>
  );
}
