"use client";
import { useEffect, useState } from "react";
/** StreamingMessage — tokens arrive in uneven bursts behind a caret, the way a model streams. Replace the timer with a ReadableStream. React only. */
const TEXT = "Your query scans 30 tables. Add a composite index on (agent_id, created_at) and the retrieval time drops by about a third.";
export default function StreamingMessage() {
  const [out, setOut] = useState("");
  const [k, setK] = useState(0);
  useEffect(() => {
    const tokens = TEXT.match(/\S+\s*/g)!;
    let i = 0, alive = true;
    setOut("");
    const next = () => {
      if (!alive) return;
      if (i >= tokens.length) return;
      setOut((o) => o + tokens[i++]);
      setTimeout(next, 40 + Math.random() * 140);
    };
    next();
    return () => { alive = false; };
  }, [k]);
  const live = out.length < TEXT.length;
  return (
    <div style={{ width: "min(400px,100%)", display: "grid", gap: 14 }}>
      <div className="sm"><p>{out}{live && <i />}</p></div>
      <button className="chip" onClick={() => setK((x) => x + 1)} style={{ justifySelf: "start" }}>Replay</button>
      <style dangerouslySetInnerHTML={{ __html: `.sm{padding:16px 18px;border-radius:16px 16px 16px 4px;background:#171717;border:1px solid rgba(255,255,255,.1);min-height:110px}.sm p{margin:0;font-size:15px;line-height:1.55}.sm i{display:inline-block;width:8px;height:1em;margin-left:2px;vertical-align:text-bottom;background:#ff630f;animation:sm-b 1s steps(1) infinite}@keyframes sm-b{50%{opacity:0}}` }} />
    </div>
  );
}
