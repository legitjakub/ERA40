# 12 — Pinned storytelling

CDX-002 · 15. 11. 2026 · **Použít** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Zastaví rám a mění scénu, aby čtenář srovnával obsah v jednom místě. Pro Historii a existující schválené kapitoly; nepoužívat pin jako výplň mezi nedostatkem obsahu.

## Jak funguje a knihovny
ScrollTrigger rezervuje místo a drží rám; mění se jeho děti. Hlavní timeline má čitelné klidové úseky a vratné přechody. Funkční end se přepočítá při refresh.

**Knihovny/verze:** GSAP/ScrollTrigger 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; Three.js r186 / R3F 9.8.1 pro pin nejsou potřebné.

## Implementace v ERA40
Navázat na `web/src/components/history/HistoryTimeline.tsx`; přes `useScene`, GSAP z `lib/gsap/setup.ts`. `SmoothScroll.tsx` již řadí/refreshuje po fonts.ready a řeší kotvy. Nevytvářet nový Lenis. Pokud obraz využije `people/distortion.ts`, musí zůstat jediný společný canvas dle DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Uvnitř desktop větve useScene; reduced motion má statický seznam.
const tl = gsap.timeline({ scrollTrigger: {
  trigger: section, pin: frame, start: "top top",
  end: () => "+=" + innerHeight * 2.5, scrub: true,
  invalidateOnRefresh: true,
}});
tl.to(photo, { xPercent: -8, ease: "none" });
```

## Limity a rizika
DESIGN: desktop max 250 vh, mobil max 100 vh; pro historii zvolit na mobilu seznam bez pinu. Dlouhý osmipanelový rail je známý nesoulad, nikoli precedent. Pinovaný předek bez transform/content-visibility; fokusované odkazy musí být vidět. Nevolat globální killAll při unmount jednotlivé kapitoly.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scrub, pin a containerAnimation.
- **Interní, přečteno:** [ScrollTrigger](../scrolltrigger.md), [SETUP-VERIFICATION](../../SETUP-VERIFICATION.md), [cinematic 3D](../../tutorials/implementation-notes/cinematic-3d-scroll.md).
