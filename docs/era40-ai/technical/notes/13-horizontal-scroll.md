# 13 — Horizontal scroll

CDX-002 · 15. 11. 2026 · **Použít** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Na desktopu převádí vertikální postup na pohyb příběhů. Zachovat současnou dramaturgii osmi příběhů; mobil = nativní swipe/snap, reduced motion = vertikální seznam. Pro obyčejný archiv volit běžný tok.

## Jak funguje a knihovny
Posun railu je rozdíl scrollWidth a clientWidth rámu. Vnitřní reveals používají containerAnimation s lineárním hlavním tweenem; jeho child triggery neumějí vlastní pin/snap.

**Knihovny/verze:** GSAP/ScrollTrigger 3.15.1, Lenis 1.3.27; bez Three.js/R3F (volitelné verze r186/9.8.1 mění jen renderer).

## Implementace v ERA40
`web/src/components/people/PeopleStories.tsx` již vlastní movement a scrub 0.55. Doplňky čtou tentýž animovaný stav, nikoli raw scrollY. `useScene` a `lib/gsap/setup.ts` drží lifecycle; `SmoothScroll.tsx` jediný Lenis. `people/distortion.ts` sleduje transformované fotky v jediném canvasu dle DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Schéma pro již existující desktopovou scénu, nepřidávat druhý pin.
const distance = () => Math.max(0, track.scrollWidth - frame.clientWidth);
const movement = gsap.to(track, {
  x: () => -distance(), ease: "none",
  scrollTrigger: { trigger: frame, pin: true, scrub: 0.55,
    end: () => "+=" + distance(), invalidateOnRefresh: true },
});
```

## Limity a rizika
Vzorec kopíruje dnešní princip, sám negarantuje limit 250 vh; nový rozsah nutno schválit a změřit. Čistě horizontální DOM mimo viewport nesmí pohltit Tab fokus. Po resize obnovit správný příběh a kotvy. Swipe nezachytávat do JS smyčky; nespojovat CSS scroll-snap se smooth scroll nad týmž scrollerem.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scrub, pin a containerAnimation.
- **Interní, přečteno:** [ScrollTrigger](../scrolltrigger.md), [SETUP-VERIFICATION](../../SETUP-VERIFICATION.md).
