"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useScene } from "@/lib/gsap/useScene";
import { gsap } from "@/lib/gsap/setup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./Future.module.css";

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
    return () => mm.revert();
  }, { scope: root, dependencies: [reduced] });

  async function share() {
    const url = location.origin + location.pathname;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Erasmus v Česku", url });
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
      <div className={s.inner}>
        <p className={s.kicker}>Pokračování</p>
        <h2 id="future-title" className={s.title}>
          <span>Cesta končí.</span><span>Zkušenost pokračuje.</span>
        </h2>
        <p className={s.lead}>Zkušenost z Erasmu se předává dál — k dalším lidem, i k těm, kteří nikdy nevyjeli.</p>
        <div className={s.journey} aria-hidden="true">
          <svg className={s.desktopRoute} data-route="desktop">
            <defs><mask id={`${maskId}-desktop`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <line data-future-mask x1="46%" y1="40" x2="101%" y2="40" stroke="white" strokeWidth="8" fill="none" />
            </mask></defs>
            <line data-final-route x1="-10" y1="40" x2="46%" y2="40" />
            <line className={s.dotted} x1="46%" y1="40" x2="101%" y2="40" mask={`url(#${maskId}-desktop)`} />
            <g data-final-open><circle className={s.station} cx="46%" cy="40" r="7" /><text x="46%" y="82" textAnchor="middle">Tvoje cesta</text></g>
          </svg>
          <svg className={s.mobileRoute} data-route="mobile">
            <defs><mask id={`${maskId}-mobile`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <path data-future-mask d="M12 56V160" stroke="white" strokeWidth="8" fill="none" />
            </mask></defs>
            <path data-final-route d="M12 -10V56" />
            <path className={s.dotted} d="M12 56V160" mask={`url(#${maskId}-mobile)`} />
            <g data-final-open><circle className={s.station} cx="12" cy="56" r="7" /><text x="36" y="62">Tvoje cesta</text></g>
          </svg>
        </div>
        <div className={s.actions}>
          <Link className={s.primary} href="/zapojte-se#pribeh">Zapsat svůj příběh</Link>
        </div>
        <div className={s.links}>
          <Link href="/tvoje-era">Jaké je tvoje ERA?</Link>
          <a href="https://www.dzs.cz/program/erasmus">Vyrazit s Erasmus+</a>
          <a href="https://erasmus-plus.ec.europa.eu/">O programu Erasmus+</a>
          <button type="button" onClick={share}>{copied ? "Odkaz zkopírován" : "Sdílet"}</button>
        </div>
        <span className="visually-hidden" role="status">{copied ? "Odkaz zkopírován do schránky." : ""}</span>
      </div>
    </section>
  );
}
