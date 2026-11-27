"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useScene } from "@/lib/gsap/useScene";
import { gsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./Future.module.css";
import { siteName } from "@/components/layout/SiteFooter";
import { getStory, storyPhoto } from "@/content/stories";

// P2 bod 7: the ending is a hush before the call to action — one person's
// sentence about what came home with her, over a slow photograph.
const voice = getStory("ucitelka")!;

export function Future() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const maskId = useId().replace(/:/g, "");

  useScene(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (context) => {
      const variant = context.conditions?.desktop ? "desktop" : "mobile";
      const route = root.current?.querySelector(`[data-route="${variant}"]`);
      if (!route) return;
      // Animate a mask so DrawSVG never replaces the future stroke's dotted pattern.
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "future-continuation", trigger: root.current,
          start: "top 70%", end: "top 10%", scrub: 0.5,
        },
      })
        .fromTo(route.querySelector("[data-final-route]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.55 })
        .fromTo(route.querySelector("[data-final-open]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 })
        .fromTo(route.querySelector("[data-future-mask]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.35 });
    });
    const hush = root.current?.querySelector("[data-hush]");
    if (hush) {
      gsap.fromTo(hush.querySelector("img"), { scale: 1.16 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: hush, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(hush.querySelectorAll("[data-hush-line]"), {
        opacity: 0, y: 24, duration: 1.4, ease: "power2.out", stagger: 0.35,
        scrollTrigger: { trigger: hush, start: "top 45%", once: true },
      });
    }
    return () => mm.revert();
  }, { scope: root, dependencies: [reduced] });

  async function share() {
    const url = location.origin + location.pathname;
    if (navigator.share) {
      try {
        await navigator.share({ title: siteName, url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch { setCopied(false); }
  }

  return (
    <section ref={root} id="budoucnost" data-section="budoucnost" aria-labelledby="future-title" className={s.section}>
      <figure className={s.hush} data-hush>
        <div className={s.print}><Image src={storyPhoto(voice).file} alt="" fill sizes="(min-width: 768px) 46vw, 100vw" /></div>
        <figcaption className={s.hushText}>
          <blockquote data-hush-line>„{voice.quote}“</blockquote>
          <p data-hush-line>
            {voice.name} · {voice.from} – {voice.to}<br />Modelový příběh učitelky základní školy.
          </p>
        </figcaption>
      </figure>
      <div className={s.inner}>

        <h2 id="future-title" className={s.title}>
          <span>Co přinesla</span><span>tvoje cesta?</span>
        </h2>
        <p className={s.lead}>Vzpomeneš si na okamžik z Erasmu, který tě provází dodnes? Zapiš ho do výroční sbírky.</p>
        <div className={s.journey} aria-hidden="true">
          <svg className={s.desktopRoute} data-route="desktop">
            <defs><mask id={`${maskId}-desktop`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <line data-future-mask x1="46%" y1="40" x2="101%" y2="40" stroke="white" strokeWidth="8" fill="none" />
            </mask></defs>
            <line data-final-route x1="-10" y1="40" x2="46%" y2="40" />
            <line className={s.dotted} x1="46%" y1="40" x2="101%" y2="40" mask={`url(#${maskId}-desktop)`} />
            <g data-final-open><circle className={s.station} cx="46%" cy="40" r="7" /><text x="46%" y="82" textAnchor="middle">Tvoje cesta</text></g>
          </svg>
          <svg className={s.mobileRoute} data-route="mobile" viewBox="0 0 340 96">
            <defs><mask id={`${maskId}-mobile`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <path data-future-mask d="M112 28H352" stroke="white" strokeWidth="8" fill="none" />
            </mask></defs>
            <path data-final-route d="M-12 28H112" />
            <path className={s.dotted} d="M112 28H352" mask={`url(#${maskId}-mobile)`} />
            <g data-final-open><circle className={s.station} cx="112" cy="28" r="7" /><text x="112" y="72" textAnchor="middle">Tvoje cesta</text></g>
          </svg>
        </div>
        <div className={s.actions}>
          <Link className={s.primary} href="/zapojte-se#pribeh">Zapsat svůj příběh</Link>
        </div>
        <div className={s.links}>
          <Link href="/tvoje-era">Jaké je tvoje ERA?</Link>
          <a href="https://www.dzs.cz/program/erasmus">Vyrazit s&nbsp;Erasmus+</a>
          <a href="https://erasmus-plus.ec.europa.eu/">O&nbsp;programu Erasmus+</a>
          <button type="button" onClick={share}>{copied ? "Odkaz zkopírován" : "Sdílet"}</button>
        </div>
        <span className="visually-hidden" role="status">{copied ? "Odkaz zkopírován do schránky." : ""}</span>
      </div>
    </section>
  );
}
