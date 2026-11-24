"use client";
import { useEffect, useRef, useState } from "react";
/** CheckGroup — checkboxes with a draw-on tick, and a parent "select all" that is correctly indeterminate. Real inputs underneath, so labels, focus and forms just work. React only. */
const O = ["Backend", "Automation", "Frontend", "Data"];
export default function CheckGroup() {
  const [v, setV] = useState<boolean[]>([true, false, true, false]);
  const all = useRef<HTMLInputElement>(null);
  const n = v.filter(Boolean).length;
  useEffect(() => { if (all.current) all.current.indeterminate = n > 0 && n < O.length; }, [n]);
  return (
    <fieldset className="cg">
      <legend className="sr-only" style={{ position: "absolute", clip: "rect(0 0 0 0)" }}>Services</legend>
      <label className="cg-p"><input ref={all} type="checkbox" checked={n === O.length} onChange={(e) => setV(O.map(() => e.target.checked))} /><i><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5" /><path d="M3.5 8h9" className="cg-d" /></svg></i><span>Select all <small>{n}/{O.length}</small></span></label>
      {O.map((o, k) => (<label key={o}><input type="checkbox" checked={v[k]} onChange={() => setV((a) => a.map((x, j) => (j === k ? !x : x)))} /><i><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5" /></svg></i><span>{o}</span></label>))}
      <style dangerouslySetInnerHTML={{ __html: `.cg{border:0;margin:0;padding:0;display:grid;gap:4px;width:220px}.cg label{display:flex;align-items:center;gap:12px;padding:8px 10px;border-radius:10px;cursor:pointer;position:relative;transition:background .2s}.cg label:hover{background:#181818}.cg input{position:absolute;opacity:0}.cg i{width:22px;height:22px;border-radius:7px;border:1.5px solid #555;display:grid;place-items:center;transition:background .25s,border-color .25s,transform .35s cubic-bezier(.34,1.56,.64,1)}.cg svg{width:14px;fill:none;stroke:#000;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.cg svg path{stroke-dasharray:18;stroke-dashoffset:18;transition:stroke-dashoffset .35s ease .05s}.cg .cg-d{display:none}.cg input:checked+i{background:#ff630f;border-color:#ff630f;transform:scale(1.08)}.cg input:checked+i path{stroke-dashoffset:0}.cg input:focus-visible+i{outline:2px solid #ff630f;outline-offset:2px}.cg-p{border-bottom:1px solid rgba(255,255,255,.1);border-radius:10px 10px 0 0!important;margin-bottom:4px}.cg-p small{opacity:.5;font:11px var(--f-mono,monospace);margin-left:6px}.cg-p input:indeterminate+i{background:#ff630f;border-color:#ff630f}.cg-p input:indeterminate+i path:first-child{stroke-dashoffset:18}.cg-p input:indeterminate+i .cg-d{display:block;stroke-dashoffset:0;stroke-dasharray:none}` }} />
    </fieldset>
  );
}
