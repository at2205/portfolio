"use client";
/** SheenHeadline — metallic fill with a band of light. Follows the pointer; sweeps on its own when idle. React only. */
export default function SheenHeadline({ text = "Sheen headline" }: { text?: string }) {
  return (
    <h3
      className="sh"
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${((e.clientX - b.left) / b.width) * 100}%`);
        e.currentTarget.dataset.on = "1";
      }}
      onPointerLeave={(e) => delete e.currentTarget.dataset.on}
    >
      {text}
      <style dangerouslySetInnerHTML={{ __html: `
@property --x{syntax:'<percentage>';inherits:true;initial-value:-30%}
.sh{margin:0;font-family:var(--f-display,system-ui);font-stretch:87.5%;font-weight:600;font-size:clamp(36px,5vw,68px);letter-spacing:-.04em;line-height:1;text-transform:uppercase;color:transparent;-webkit-background-clip:text;background-clip:text;background-image:linear-gradient(100deg,#6b6b6b calc(var(--x) - 22%),#fff var(--x),#6b6b6b calc(var(--x) + 22%));animation:sh-sweep 3.6s ease-in-out infinite}
.sh[data-on]{animation:none}
@keyframes sh-sweep{0%{--x:-30%}100%{--x:130%}}` }} />
    </h3>
  );
}
