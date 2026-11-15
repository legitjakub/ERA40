"use client";

import { useRef } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { TrainSequence } from "./TrainSequence";
import styles from "./PeopleIntro.module.css";

const opening =
  "Od roku 1998 vyjelo s\u00a0Erasmem do zahraničí přes 411\u00a0000 lidí z\u00a0Česka. Domů se vraceli";
const ending = "trochu jiní.";
const source =
  "https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf";

function words(text: string) {
  return text.split(" ").map((word, index) => (
    <span key={index}>
      <span data-word>{word}</span>{" "}
    </span>
  ));
}

export function PeopleIntro() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || reduced) return;
      const section = root.current;
      const media = gsap.matchMedia(section);
      media.add(
        {
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const mobile = context.conditions?.mobile;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section.querySelector("h2"),
              start: mobile ? "top 88%" : "top 84%",
              end: mobile ? "bottom 60%" : "bottom 42%",
              scrub: true,
            },
          });
          timeline
            .fromTo(
              "[data-word]",
              { opacity: 0.58 },
              { opacity: 1, stagger: 0.085, duration: 0.22 },
            )
            .fromTo(
              "[data-underline]",
              { scaleX: 0 },
              { scaleX: 1, duration: 0.18 },
              "-=0.2",
            )
            .fromTo(
              "[data-note]",
              { opacity: 0 },
              { opacity: 1, duration: 0.18 },
              "-=0.1",
            );
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="pribehy-intro"
      data-section="prolog"
      data-chapter="02"
      className={styles.prolog}
      aria-labelledby="people-intro-title"
    >
      <div className={styles.body}>
        <h2 id="people-intro-title" aria-label={opening + " " + ending}>
          <span aria-hidden="true">
            {words(opening)}
            <span className={styles.ending}>
              {words(ending)}
              <i data-underline />
            </span>
          </span>
        </h2>
        <p className={styles.reach} data-note>
          A&nbsp;s&nbsp;nimi se zkušenost dostala i&nbsp;k&nbsp;lidem, kteří nikdy
          nevyjeli: k&nbsp;jejich studentům, kolegům a&nbsp;rodinám.
        </p>
        <p className={styles.note} data-note>
          DZS eviduje 411&nbsp;400 účastníků z&nbsp;Česka za výzvy 1998–&#8288;2023. Stav k&nbsp;31.&nbsp;12.&nbsp;2023. <a href={source}>Infografika DZS (PDF)</a>
        </p>
      </div>
      <div className={styles.transition}>
        <TrainSequence reduced={reduced} />
      </div>
    </section>
  );
}
