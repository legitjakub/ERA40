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

// The desktop edit opens and closes on a station departure board, a motif
// Jakub rejected (D-004). Until a new film exists, the loop plays only the
// window between those two shots; captions are retimed to it.
const desktopWindow: [start: number, end: number] = [3, 32.2];

const desktop: Cue[] = [
  [3, 7, "Do kufru se vejde semestr."],
  [7, 9.5, "Nádraží plné lidí, kteří taky někam jedou."],
  [9.5, 14.5, "Známá krajina zůstává za oknem."],
  [14.5, 19.5, "Nové město. První adresa."],
  [19.5, 23.5, "Přednáška v jiném jazyce."],
  [23.5, 28.5, "Večeře v pěti jazycích."],
  [28.5, 36, "Domů se vrací někdo trochu jiný."],
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

export function FilmCaptions({
  video,
  portrait,
}: {
  video: RefObject<HTMLVideoElement | null>;
  portrait: boolean;
}) {
  const cues = portrait ? mobile : desktop;
  const range = portrait ? null : desktopWindow;
  const [index, setIndex] = useState(0);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    let currentCue = -1;
    const read = () => {
      // Keep playback inside the window (skips the departure-board shots).
      if (range && Number.isFinite(player.duration) && player.duration > range[1]) {
        if (player.currentTime < range[0] || player.currentTime >= range[1])
          player.currentTime = range[0];
      }
      const t = player.currentTime;
      const at = cues.findIndex(([start, end]) => t >= start && t < end);
      if (at >= 0 && at !== currentCue) {
        currentCue = at;
        setIndex(at);
      }
      const [from, to] = range ?? [0, player.duration];
      const fraction = Number.isFinite(to) && to > from
        ? Math.min(1, Math.max(0, (t - from) / (to - from)))
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
  }, [video, cues, range]);

  const [, , text] = cues[index] ?? cues[0];
  return (
    <div className={s.captions} data-controls aria-hidden="true">
      <p className={s.line} key={text}>
        <span>{text}</span>
      </p>
      <span className={s.progress}>
        <span ref={progress} />
      </span>
    </div>
  );
}
