"use client";
import { useMemo, useState } from "react";
/** DataTable — sortable columns (click again to reverse), live filter, tabular numerals and a sticky header. Pass your own rows. React only. */
const ROWS = [["CAPS Portal", "Backend", 4], ["IRCTC Booking", "Frontend", 3], ["AEPS Onboarding", "Backend", 7], ["m-Swasth", "Backend", 5], ["Video Streaming", "Frontend", 6], ["Job Assistant Bot", "Backend", 9]] as [string, string, number][];
const COLS = ["Project", "Kind", "Stack"];
export default function DataTable() {
  const [q, setQ] = useState(""), [s, setS] = useState<{ c: number; d: 1 | -1 }>({ c: 0, d: 1 });
  const rows = useMemo(() => ROWS.filter((r) => r.join(" ").toLowerCase().includes(q.toLowerCase())).sort((a, b) => (a[s.c] > b[s.c] ? 1 : -1) * s.d), [q, s]);
  return (
    <div style={{ width: "min(460px,100%)", display: "grid", gap: 10 }}>
      <input className="dt-q" placeholder="Filter…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter rows" />
      <table className="dt"><thead><tr>{COLS.map((c, i) => (<th key={c} aria-sort={s.c === i ? (s.d === 1 ? "ascending" : "descending") : "none"}><button onClick={() => setS({ c: i, d: s.c === i ? (-s.d as 1 | -1) : 1 })}>{c}{s.c === i ? (s.d === 1 ? " ↑" : " ↓") : ""}</button></th>))}</tr></thead>
        <tbody>{rows.map((r) => (<tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td className="num">{r[2]}</td></tr>))}{!rows.length && <tr><td colSpan={3}>No rows</td></tr>}</tbody></table>
      <style dangerouslySetInnerHTML={{ __html: `.dt-q{padding:10px 14px;border-radius:10px;background:#141414;border:1px solid rgba(255,255,255,.14);color:#fff;font:inherit;font-size:14px;outline:none}.dt-q:focus{border-color:#ff630f}.dt{width:100%;border-collapse:collapse;font-size:13px}.dt th{text-align:left;border-bottom:1px solid rgba(255,255,255,.2)}.dt th button{padding:8px 10px;font:11px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;color:rgba(255,255,255,.6);width:100%;text-align:left}.dt th button:hover,.dt th[aria-sort="ascending"] button,.dt th[aria-sort="descending"] button{color:#ff630f}.dt td{padding:9px 10px;border-bottom:1px solid rgba(255,255,255,.08)}.dt .num{font-variant-numeric:tabular-nums;text-align:right}.dt tbody tr{transition:background .2s}.dt tbody tr:hover{background:rgba(255,99,15,.1)}` }} />
    </div>
  );
}
