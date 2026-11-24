"use client";
import { useRef, useState } from "react";
/** Dropzone — drag files onto it (the border animates on dragover) or click to browse; lists name and size, each removable. Reads metadata only — upload in onFiles. React only. */
export default function Dropzone() {
  const [files, setFiles] = useState<File[]>([]), [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const add = (l: FileList | null) => l && setFiles((f) => [...f, ...Array.from(l)].slice(0, 5));
  const size = (n: number) => (n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1e3))} KB`);
  return (
    <div className="dz-w">
      <div className="dz" data-over={over} role="button" tabIndex={0} aria-label="Drop files or press Enter to browse" onClick={() => input.current?.click()} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), input.current?.click())}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}>
        <input ref={input} type="file" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
        <span>⇪</span><p>{over ? "Release to add" : "Drop files here, or click"}</p>
      </div>
      <ul>{files.map((f, i) => (<li key={f.name + i}><span>{f.name}</span><small>{size(f.size)}</small><button aria-label={`Remove ${f.name}`} onClick={() => setFiles((a) => a.filter((_, j) => j !== i))}>×</button></li>))}</ul>
      <style dangerouslySetInnerHTML={{ __html: `.dz-w{width:min(340px,100%);display:grid;gap:10px}.dz{display:grid;justify-items:center;gap:6px;padding:26px 16px;border-radius:18px;cursor:pointer;background:repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 8px,transparent 8px 16px) top/100% 1.5px no-repeat,repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 8px,transparent 8px 16px) bottom/100% 1.5px no-repeat,repeating-linear-gradient(0deg,rgba(255,255,255,.3) 0 8px,transparent 8px 16px) left/1.5px 100% no-repeat,repeating-linear-gradient(0deg,rgba(255,255,255,.3) 0 8px,transparent 8px 16px) right/1.5px 100% no-repeat;transition:background-color .3s,transform .35s cubic-bezier(.34,1.56,.64,1)}.dz[data-over="true"]{background-color:rgba(255,99,15,.12);transform:scale(1.03)}.dz span{font-size:28px;color:#ff630f;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}.dz[data-over="true"] span{transform:translateY(-6px)}.dz p{margin:0;font-size:14px;color:rgba(255,255,255,.7)}.dz-w ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}.dz-w li{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:8px 12px;border-radius:10px;background:#141414;font-size:13px;animation:dz-i .4s cubic-bezier(.34,1.56,.64,1)}.dz-w li span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dz-w li small{opacity:.5;font:11px var(--f-mono,monospace)}.dz-w li button:hover{color:#ff630f}@keyframes dz-i{from{opacity:0;transform:translateY(8px)}}` }} />
    </div>
  );
}
