"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/setup";
import styles from "./PeopleIntro.module.css";

const frameWidth = 768;
const frameHeight = 432;
const columns = 4;
const sheetSize = 8;
const frameCount = 88;
const base = "/media/train-sequence";

export function TrainSequence({ reduced }: { reduced: boolean }) {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (reduced || !figure.current || !canvas.current) return;
      const target = figure.current;
      const surface = canvas.current;
      const ctx = surface.getContext("2d");
      if (!ctx) return;
      const media = gsap.matchMedia(target);
      media.add(
        {
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const sheets = new Map<number, HTMLImageElement>();
          let current = 0;
          let near = false;
          let alive = true;

          function draw() {
            const sprite = sheets.get(Math.floor(current / sheetSize));
            if (!sprite?.naturalWidth || !sprite.complete) return;
            const slot = current % sheetSize;
            ctx!.drawImage(
              sprite,
              (slot % columns) * frameWidth,
              Math.floor(slot / columns) * frameHeight,
              frameWidth,
              frameHeight,
              0,
              0,
              frameWidth,
              frameHeight,
            );
          }

          function preload() {
            if (!near) return;
            const center = Math.floor(current / sheetSize);
            for (const [i, sheet] of sheets) {
              if (Math.abs(i - center) > 1) {
                sheet.onload = null;
                sheets.delete(i);
              }
            }
            for (const index of [center, center + 1, center - 1]) {
              if (
                index < 0 ||
                index >= frameCount / sheetSize ||
                sheets.has(index)
              )
                continue;
              const image = new window.Image();
              image.decoding = "async";
              image.onload = () => {
                if (alive && near) draw();
              };
              sheets.set(index, image);
              image.src = base + "/sheet-" + index + ".webp";
            }
            draw();
          }

          const observer = new IntersectionObserver(
            ([entry]) => {
              near = entry.isIntersecting;
              if (near) preload();
              else sheets.clear();
            },
            { rootMargin: "320px 0px" },
          );
          observer.observe(target);
          ScrollTrigger.create({
            trigger: target,
            start: "top bottom",
            end: "bottom top",
            onUpdate: ({ progress }) => {
              const step = context.conditions?.mobile ? 2 : 1;
              const next = Math.min(
                frameCount - 1,
                Math.round((progress * (frameCount - 1)) / step) * step,
              );
              if (next === current) return;
              current = next;
              preload();
            },
          });
          return () => {
            alive = false;
            observer.disconnect();
            sheets.clear();
            ctx.clearRect(0, 0, frameWidth, frameHeight);
          };
        },
      );
      return () => media.revert();
    },
    { scope: figure, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <figure ref={figure} className={styles.sequence}>
      <div className={styles.window} data-grain>
        <Image
          src={base + "/poster.webp"}
          alt="Pohled z okna jedoucího vlaku"
          fill
          sizes="(max-width: 1023px) 100vw, 90vw"
        />
        <canvas
          ref={canvas}
          width={frameWidth}
          height={frameHeight}
          aria-hidden="true"
        />
      </div>
      <figcaption>Ilustrační video</figcaption>
    </figure>
  );
}
