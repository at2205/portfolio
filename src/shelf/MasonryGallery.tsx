"use client";
/** MasonryGallery — CSS columns with varied tile heights that fade up in sequence and lift on hover. No JS layout. Swap tiles for images. React only. */
const H = [150, 210, 120, 180, 230, 140, 190, 130, 170];
const T = ["#ea4f16", "#ff630f", "#f6af60", "#b4460a", "#c9531b", "#ff8a3d", "#8f3f12", "#d9560f", "#f08a3c"];
export default function MasonryGallery() {
  return (
    <div className="mg2">
      {H.map((h, i) => (<figure key={i} style={{ height: h, background: `linear-gradient(${150 + i * 20}deg,${T[i]},#111 140%)`, animationDelay: `${i * 70}ms` }}><figcaption>{String(i + 1).padStart(2, "0")}</figcaption></figure>))}
      <style dangerouslySetInnerHTML={{ __html: `.mg2{columns:3;column-gap:8px;width:min(440px,100%)}.mg2 figure{margin:0 0 8px;break-inside:avoid;border-radius:12px;position:relative;overflow:hidden;animation:mg2-i .7s cubic-bezier(.22,1,.36,1) both;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}.mg2 figure:hover{transform:scale(1.04) rotate(-.6deg);z-index:2}.mg2 figcaption{position:absolute;left:8px;bottom:6px;font:10px var(--f-mono,monospace);color:#000}@keyframes mg2-i{from{opacity:0;transform:translateY(24px)}}` }} />
    </div>
  );
}
