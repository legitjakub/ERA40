"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import s from "./FilmCaptions.module.css";

/*
 * Documentary captions for the hero film, timed to the cuts in
 * docs/HERO-VIDEO-SHOTLIST.md (desktop 36 s, mobile 30 s). They narrate the
 * journey the site tells, without naming places the footage does not show.
 * A thin line under them follows the film's progress.
 */
type Cue = [start: number, end: number, text: string];

const desktop: Cue[] = [
  [0, 3, "Den odjezdu."],
  [3, 7, "Do kufru se vejde semestr."],
  [7, 9.5, "Nádraží plné lidí, kteří taky někam jedou."],
  [9.5, 14.5, "Známá krajina zůstává za oknem."],
  [14.5, 19.5, "Nové město. První adresa."],
  [19.5, 23.5, "Přednáška v jiném jazyce."],
  [23.5, 28.5, "Večeře v pěti jazycích."],
  [28.5, 32.5, "Cesta domů je jiná než cesta tam."],
  [32.5, 36, "Domů se vrací někdo trochu jiný."],
];

const mobile: Cue[] = [
  [0, 3, "Den odjezdu."],
  [3, 7, "Do kufru se vejde semestr."],
  [7, 12, "Známá krajina zůstává za oknem."],
  [12, 16.5, "Nové město. První adresa."],
  [16.5, 21.5, "Lidé, které ráno ještě neznáš."],
  [21.5, 26.5, "Cesta domů je jiná než cesta tam."],
  [26.5, 30, "Domů se vrací někdo trochu jiný."],
];

const stamp = (seconds: number) =>
  "00:" + String(Math.floor(seconds)).padStart(2, "0");

export function FilmCaptions({
  video,
  portrait,
}: {
  video: RefObject<HTMLVideoElement | null>;
  portrait: boolean;
}) {
  const cues = portrait ? mobile : desktop;
  const [index, setIndex] = useState(0);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    let currentCue = -1;
    const read = () => {
      const t = player.currentTime;
      const at = cues.findIndex(([start, end]) => t >= start && t < end);
      if (at >= 0 && at !== currentCue) {
        currentCue = at;
        setIndex(at);
      }
      const fraction = Number.isFinite(player.duration) && player.duration > 0
        ? Math.min(1, Math.max(0, t / player.duration))
        : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${fraction})`;
    };
    // Native media events keep cues in sync without a second animation loop
    // or a React render on every video frame. The progress is a DOM-only
    // transform; React updates only when the actual caption changes.
    const events = ["timeupdate", "seeked", "loadedmetadata", "emptied"];
    events.forEach((event) => player.addEventListener(event, read));
    const initial = requestAnimationFrame(read);
    return () => {
      cancelAnimationFrame(initial);
      events.forEach((event) => player.removeEventListener(event, read));
    };
  }, [video, cues]);

  const [start, , text] = cues[index] ?? cues[0];
  return (
    <div className={s.captions} data-controls aria-hidden="true">
      <p className={s.stamp}>{stamp(start)}</p>
      <p className={s.line} key={text}>
        <span>{text}</span>
      </p>
      <span className={s.progress}>
        <span ref={progress} />
      </span>
    </div>
  );
}
