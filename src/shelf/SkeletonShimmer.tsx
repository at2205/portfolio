"use client";
import { useState } from "react";
/** SkeletonShimmer — placeholder blocks with a travelling highlight, cross-fading to content. Layout is identical in both states so nothing jumps. React only. */
export default function SkeletonShimmer() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start", width: "min(340px,100%)" }}>
      <div className="sk" data-loaded={loaded}>
        <div className="sk-av"><span>A</span></div>
        <div className="sk-lines">
          <p className="sk-l" style={{ width: "70%" }}><span>Aryan Tomar</span></p>
          <p className="sk-l" style={{ width: "100%" }}><span>Backend and LLM systems.</span></p>
          <p className="sk-l" style={{ width: "55%" }}><span>Delhi, India</span></p>
        </div>
      </div>
      <button className="chip" onClick={() => setLoaded((l) => !l)}>{loaded ? "Show skeleton" : "Load content"}</button>
      <style dangerouslySetInnerHTML={{ __html: `.sk{display:flex;gap:14px;width:100%}.sk-av{width:56px;height:56px;border-radius:50%;flex:none}.sk-lines{flex:1;display:grid;gap:8px;align-content:center}.sk-l{margin:0;height:16px;border-radius:6px;font-size:14px;line-height:16px}.sk-av,.sk-l{background:linear-gradient(100deg,#1a1a1a 30%,#2e2e2e 50%,#1a1a1a 70%) 0 0/250% 100%;animation:sk-s 1.4s linear infinite}.sk-av span,.sk-l span{opacity:0;transition:opacity .5s}.sk-av{display:grid;place-items:center;font:500 22px var(--f-display,system-ui)}.sk[data-loaded="true"] .sk-av,.sk[data-loaded="true"] .sk-l{animation:none;background:none}.sk[data-loaded="true"] .sk-av{background:#ff630f;color:#000}.sk[data-loaded="true"] span{opacity:1}@keyframes sk-s{to{background-position:-150% 0}}` }} />
    </div>
  );
}
