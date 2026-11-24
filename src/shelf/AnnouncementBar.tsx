"use client";
import { useState } from "react";
/** AnnouncementBar — a dismissible top bar with a scrolling message that pauses on hover; collapsing animates height rather than popping. React only. */
export default function AnnouncementBar() {
  const [shown, setShown] = useState(true);
  return (
    <div style={{ width: "min(520px,100%)", display: "grid", gap: 14, justifyItems: "start" }}>
      <div className="ab2" data-shown={shown}><div>
        <div className="ab2-m"><div>{[0, 1].map((k) => (<span key={k}>✦ New: nine free components on /resources &nbsp; ✦ Taking projects for Q1 &nbsp; </span>))}</div></div>
        <button aria-label="Dismiss announcement" onClick={() => setShown(false)}>×</button>
      </div></div>
      {!shown && <button className="chip" onClick={() => setShown(true)}>Bring it back</button>}
      <style dangerouslySetInnerHTML={{ __html: `.ab2{width:100%;display:grid;grid-template-rows:1fr;transition:grid-template-rows .5s cubic-bezier(.22,1,.36,1),opacity .4s}.ab2[data-shown="false"]{grid-template-rows:0fr;opacity:0}.ab2>div{overflow:hidden;display:flex;align-items:center;background:#ff630f;color:#000;border-radius:12px}.ab2-m{flex:1;overflow:hidden;white-space:nowrap;padding:11px 14px;font-size:13px;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}.ab2-m>div{display:inline-block;animation:ab2 16s linear infinite}.ab2-m:hover>div{animation-play-state:paused}.ab2>div>button{padding:0 14px;font-size:20px}@keyframes ab2{to{transform:translateX(-50%)}}` }} />
    </div>
  );
}
