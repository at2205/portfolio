"use client";
import { useId, useState } from "react";
/** FloatInput — a label that floats up on focus or when filled, with a line that draws under the field. Works with autofill. React only. */
export default function FloatInput({ label = "Email address" }: { label?: string }) {
  const id = useId();
  const [v, setV] = useState("");
  return (
    <div className="fi" data-filled={v !== ""}>
      <input id={id} value={v} onChange={(e) => setV(e.target.value)} placeholder=" " autoComplete="email" />
      <label htmlFor={id}>{label}</label>
      <i />
      <style dangerouslySetInnerHTML={{ __html: `.fi{position:relative;width:min(320px,100%);padding-top:18px}.fi input{width:100%;padding:10px 0;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.25);color:#fff;font-size:20px;outline:none}.fi label{position:absolute;left:0;top:30px;color:rgba(255,255,255,.5);font-size:18px;pointer-events:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.22,1,.36,1),color .2s}.fi input:focus+label,.fi input:not(:placeholder-shown)+label,.fi[data-filled="true"] label{transform:translateY(-24px) scale(.7);color:#ff630f}.fi i{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#ff630f;transform:scaleX(0);transform-origin:0 50%;transition:transform .5s cubic-bezier(.22,1,.36,1)}.fi input:focus~i{transform:scaleX(1)}` }} />
    </div>
  );
}
