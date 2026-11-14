"use client";

import { useEffect, useState } from "react";
import { event } from "@/content/event";

/** A quiet text countdown; before a date exists it says when it will. */
export function Countdown({ className }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!event.start) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!event.start) return <p className={className}>{event.dateLabel}</p>;
  if (now === null) return <p className={className}>&nbsp;</p>;
  const start = Date.parse(event.start);
  const end = event.end ? Date.parse(event.end) : start + 8 * 3600_000;
  if (now >= end)
    return <p className={className}>Děkujeme. Oslava proběhla.</p>;
  if (now >= start) return <p className={className}>Oslava právě probíhá.</p>;
  const left = start - now;
  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor((left % 86_400_000) / 3_600_000);
  return (
    <p className={className}>
      Do oslavy zbývá {days}&nbsp;d {hours}&nbsp;h
    </p>
  );
}
