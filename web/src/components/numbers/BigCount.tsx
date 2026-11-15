"use client";

import Image from "next/image";
import { useRef } from "react";
import { stories, storyPhoto } from "@/content/stories";
import { participationPeriod, stats } from "@/content/stats";
import { gsap } from "@/lib/gsap/setup";
import { useScene } from "@/lib/gsap/useScene";
import s from "./BigCount.module.css";

const format = new Intl.NumberFormat("cs-CZ");
const outgoing = stats.find((stat) => stat.id === "outgoing-cz")!;

/*
 * P2 bod 6 (Jakub 11:36): the numbers must not be dry. One figure across the
 * full width, counted with the scroll, and right under it the people the site
 * tells about, so the number reads as people. The faces are model stories
 * (labelled), never presented as part of the statistic.
 * Reduced motion and no-JS: the final value, static.
 */
export function BigCount({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useScene(
    () => {
      const el = root.current;
      const value = el?.querySelector<HTMLElement>("[data-big-count]");
      if (reduced || !el || !value) return;
      const state = { n: 0 };
      gsap.to(state, {
        n: outgoing.value,
        ease: "none",
        onUpdate: () => {
          value.textContent = format.format(Math.round(state.n / 100) * 100);
        },
        onComplete: () => {
          value.textContent = format.format(outgoing.value);
        },
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 25%", scrub: 0.5 },
      });
      gsap.from(el.querySelectorAll("[data-face]"), {
        scale: 0.6,
        autoAlpha: 0,
        stagger: 0.06,
        ease: "back.out(1.6)",
        duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className={s.big}>
      <p className={s.value}>
        <span data-big-count>{format.format(outgoing.value)}</span>
      </p>
      <p className={s.label}>
        lidí z&nbsp;Česka vyjelo s&nbsp;Erasmem. <span>{participationPeriod}</span>
      </p>
      <div className={s.people}>
        <ul className={s.faces} aria-hidden="true">
          {stories.map((story) => (
            <li key={story.id} data-face>
              <Image src={storyPhoto(story).file} alt="" fill sizes="56px" />
            </li>
          ))}
        </ul>
        <p className={s.caption}>
          Za každým číslem je člověk. Třeba takový jako Tereza, Jakub nebo Mgr. Jana.
        </p>
      </div>
    </div>
  );
}
