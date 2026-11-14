"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useScene as useGSAP } from "@/lib/gsap/useScene";
import { registerGsap } from "@/lib/gsap/setup";
import { counter, maskReveal, routeDraw } from "@/lib/gsap/presets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Styleguide() {
  const [width, setWidth] = useState(78);
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { contextSafe } = useGSAP(
    () => {
      registerGsap();
    },
    { scope: root },
  );
  const play = () => {
    if (reduced) return;
    const section = root.current;
    if (!section) return;
    maskReveal(
      section.querySelector("[data-mask]")!,
      section.querySelector("[data-mask] img"),
    );
    routeDraw(section.querySelector<SVGPathElement>("[data-route]")!);
    counter(section.querySelector<HTMLElement>("[data-counter]")!, 1987);
  };
  // The specimen keeps real, unsplit Czech text so wrapping is easy to assess.
  return (
    <main ref={root} id="main" className="document-page">
      <h1>Vizuální styl Erasmus v Česku</h1>
      <label>
        Šířka písma Roboto Flex{" "}
        <input
          type="range"
          min="25"
          max="151"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />{" "}
        {width}
      </label>
      <h2
        style={{
          fontSize: "clamp(3.1rem, 8vw, 9rem)",
          lineHeight: 1,
          fontVariationSettings: '"wght" 815, "wdth" ' + width,
          letterSpacing: "-.025em",
        }}
      >
        Některé cesty
        <br />
        změní všechno.
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", marginBlock: 40 }}>
        {[
          ["Evropská modrá", "#004494"],
          ["Erasmus+", "#007fc7"],
          ["Žlutá", "#ffed00"],
          ["Inkoust", "#0b1b33"],
          ["Obloha", "#eaf3fa"],
        ].map(([label, color]) => (
          <div
            key={color}
            style={{
              width: 168,
              padding: 12,
              borderTop: "30px solid " + color,
            }}
          >
            {label}
            <br />
            {color}
          </div>
        ))}
      </div>
      <h2>Pohybové presety</h2>
      <p>Maska fotografie, kreslení trasy a počítání hodnoty.</p>
      <button
        type="button"
        disabled={reduced}
        onClick={() => contextSafe(play)()}
      >
        Přehrát ukázku
      </button>
      {reduced && <p>Je aktivní omezení pohybu.</p>}
      <div
        data-mask
        style={{
          position: "relative",
          aspectRatio: 2,
          overflow: "hidden",
          marginTop: 24,
        }}
      >
        <Image
          src="/media/placeholders/ph-prague-station.jpg"
          alt="Ilustrační fotografie pražského nádraží"
          fill
          sizes="(max-width:1000px) 90vw, 950px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <svg viewBox="0 0 700 90" style={{ width: "100%" }} aria-hidden="true">
        <path
          data-route
          d="M0 20H290C330 20 330 70 380 70H700"
          fill="none"
          stroke="#004494"
          strokeWidth="2"
        />
      </svg>
      <p aria-label="Rok vzniku evropského programu Erasmus 1987">
        <span
          data-counter
          aria-hidden="true"
          style={{ fontSize: 64, fontWeight: 800 }}
        >
          1987
        </span>
      </p>
      <p>
        <Link href="/">Zpět k příběhům</Link>
      </p>
    </main>
  );
}
