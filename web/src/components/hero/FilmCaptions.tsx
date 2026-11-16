"use client";

import { useEffect, useState, type RefObject } from "react";
import s from "./FilmCaptions.module.css";

/*
 * Documentary captions for the hero film, timed to the cuts in
 * scripts/build-hero.sh (desktop 28.9 s, mobile 28.1 s; shotlist in
 * docs/orchestration/HERO_VIDEO_PLAN.md). They narrate the journey the site
 * tells — packing, studying, friends, return, passing it on — without naming
 * places the footage does not show. Shown only after the film first plays
 * (spec 016); the former progress line is gone, the Trasa is the only line.
 */
type Cue = [start: number, end: number, text: string];

const desktop: Cue[] = [
  [0, 3.8, "Do kufru se vejde semestr."],
  [3.8, 7.8, "Nová škola, noví lidé."],
  [7.8, 11.3, "Přednáška v jiném jazyce."],
  [11.3, 15.8, "Večeře v pěti jazycích."],
  [15.8, 20.4, "Lidé, které ráno ještě neznáš."],
  [20.4, 24.4, "Svět se ti trochu zvětšil."],
  [24.4, 40, "A předává to dál."],
];

const mobile: Cue[] = [
  [0, 3.8, "Do kufru se vejde semestr."],
  [3.8, 7.6, "Nové město. První adresa."],
  [7.6, 11.1, "Přednáška v jiném jazyce."],
  [11.1, 15.6, "Večeře v pěti jazycích."],
  [15.6, 19.6, "Lidé, které ráno ještě neznáš."],
  [19.6, 23.6, "Svět se ti trochu zvětšil."],
  [23.6, 40, "A předává to dál."],
];

export function FilmCaptions({
  video,
  portrait,
  shown,
}: {
  video: RefObject<HTMLVideoElement | null>;
  portrait: boolean;
  shown: boolean;
}) {
  const cues = portrait ? mobile : desktop;
  const [index, setIndex] = useState(0);

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
    };
    // Native media events keep cues in sync without a second animation loop;
    // React updates only when the actual caption changes.
    const events = ["timeupdate", "seeked", "loadedmetadata", "emptied"];
    events.forEach((event) => player.addEventListener(event, read));
    const initial = requestAnimationFrame(read);
    return () => {
      cancelAnimationFrame(initial);
      events.forEach((event) => player.removeEventListener(event, read));
    };
  }, [video, cues]);

  const [, , text] = cues[index] ?? cues[0];
  return (
    <div className={s.captions} data-shown={shown} aria-hidden="true">
      <p className={s.line} key={text}>
        <span>{text}</span>
      </p>
    </div>
  );
}
