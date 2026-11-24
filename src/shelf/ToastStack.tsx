"use client";
import { useRef, useState } from "react";
/** ToastStack — toasts stack into a pile, expand on hover, and are each dismissible and self-timing. React only. */
export default function ToastStack() {
  const [t, setT] = useState<{ id: number; msg: string }[]>([]);
  const id = useRef(0);
  const add = () => {
    const n = ++id.current;
    setT((a) => [{ id: n, msg: `Deployed build #${n}` }, ...a].slice(0, 5));
    setTimeout(() => setT((a) => a.filter((x) => x.id !== n)), 6000);
  };
  return (
    <div style={{ position: "relative", width: 300, height: 220, display: "grid", alignContent: "end", justifyItems: "center" }}>
      <button className="pill" onClick={add} style={{ position: "absolute", left: 0, top: 0 }}>Add toast</button>
      <ul className="ts">
        {t.map((x, i) => (
          <li key={x.id} style={{ "--i": i } as React.CSSProperties}>
            <span>{x.msg}</span>
            <button aria-label="Dismiss" onClick={() => setT((a) => a.filter((y) => y.id !== x.id))}>×</button>
          </li>
        ))}
      </ul>
      <style dangerouslySetInnerHTML={{ __html: `.ts{list-style:none;margin:0;padding:0;position:absolute;right:0;bottom:0;width:260px;height:56px}.ts li{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-radius:14px;background:#1b1b1b;border:1px solid rgba(255,255,255,.14);font-size:14px;transform-origin:50% 100%;transform:translateY(calc(var(--i)*-9px)) scale(calc(1 - var(--i)*.05));opacity:calc(1 - var(--i)*.22);transition:transform .45s cubic-bezier(.34,1.56,.64,1),opacity .3s;animation:ts-in .45s cubic-bezier(.34,1.56,.64,1)}.ts:hover li{transform:translateY(calc(var(--i)*-64px));opacity:1}.ts li button{color:rgba(255,255,255,.5)}.ts li button:hover{color:#ff630f}@keyframes ts-in{from{transform:translateY(40px) scale(.9);opacity:0}}` }} />
    </div>
  );
}
