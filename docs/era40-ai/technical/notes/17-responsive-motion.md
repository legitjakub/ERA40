# 17 — Responsive motion design

CDX-002 · 15. 11. 2026 · **Použít** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Mění způsob vyprávění podle prostoru, vstupu a preference, nikoli jen délku stejné animace. ERA40: desktop pin/rail, mobil čitelné bloky a nativní swipe, reduced motion úplný statický obsah.

## Jak funguje a knihovny
matchMedia vytváří odpovídající GSAP větev a revertuje ji při změně. OS preference nestačí: ERA40 má i lokální přepínač a server snapshot bezpečně začíná reduced=true.

**Knihovny/verze:** GSAP 3.15.1 matchMedia, @gsap/react 2.1.2, Lenis 1.3.27; Three.js r186 / R3F 9.8.1 pouze při samostatně schváleném 3D.

## Implementace v ERA40
`web/src/hooks/usePrefersReducedMotion.ts` dodá sjednocenou volbu. `web/src/lib/gsap/useScene.ts` potřebuje reduced v dependencies; `lib/gsap/setup.ts` drží importy. `SmoothScroll.tsx` už tvoří jen jeden desktop Lenis. `people/StoryDistortion.tsx` musí sdílet stejnou volbu, `distortion.ts` zůstává v jednom canvasu dle DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// reduced pochází z usePrefersReducedMotion(), základní CSS je statické.
useScene(() => {
  if (reduced) return;
  const mm = gsap.matchMedia();
  mm.add("(min-width:1024px) and (pointer:fine)", () => {
    gsap.to(photo, { yPercent: -8, duration: 0.9 });
  });
  return () => mm.revert();
}, { scope: root, dependencies: [reduced] });
```

## Limity a rizika
Breakpoint 1024 není spolehlivý test GPU. Otočení telefonu a změna preference za běhu musí odpojit RAF/listenery, obnovit obsah i fokus. Desktop max pin 250 vh, mobil 100 vh a bez scroll hijacku. Ověřovat osm šířek z orchestrace, OS i místní přepínač; údaje o výkonu font axes ze starších dokumentů znovu měřit.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) — responzivní sestavení a revert.
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — preference omezeného pohybu.
- **Interní, přečteno:** [GSAP](../gsap.md), [ScrollTrigger](../scrolltrigger.md), [orchestrace §7](../../../orchestration/ORCHESTRATION.md).
