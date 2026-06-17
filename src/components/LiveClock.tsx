"use client";

import { useEffect, useState } from "react";

/** Live clock showing local time + location, like an editorial status bar. */
export function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-white/50">
      <span className="tabular-nums">{time || "--:--:--"}</span>
      <span className="text-white/25">·</span>
      <span>GMT+5:30</span>
      <span className="text-white/25">·</span>
      <span>DELHI, IN</span>
    </div>
  );
}
