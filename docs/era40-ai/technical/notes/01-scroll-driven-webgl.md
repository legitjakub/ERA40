# 01 — Scroll-driven WebGL

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Váže grafickou scénu na postup čtenáře. V ERA40 jen jako obrazové rozšíření schválené kapitoly; pro samotné maskování fotografie upřednostnit současný DOM/WebGL efekt. Nový 3D moment je P2, vyžaduje specifikaci a PoC.

## Jak funguje a knihovny
Jedna časová osa zapisuje průběh do proxy/uniformu. Render čte až výsledný animovaný stav, včetně dojezdu scrub; nepřepočítává vlastní progres z raw scrollY.

**Knihovny/verze:** GSAP 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; WebGL1/GLSL ES 1.00 nyní; Three.js r186 a R3F 9.8.1 pouze kandidáti (viz verze v README).

## Implementace v ERA40
`web/src/lib/gsap/setup.ts` dodá GSAP; `web/src/lib/gsap/useScene.ts` vlastní scénu. `web/src/components/layout/SmoothScroll.tsx` už propojuje jediný Lenis s tickerem. Návrh musí sjednotit render s `web/src/components/people/distortion.ts`, který dnes používá samostatný RAF. Jeden sdílený canvas dle `web/docs/DESIGN.md` §7; nekombinovat druhý R3F Canvas se stávajícím.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Uvnitř useScene; uReveal je uniform společného rendereru.
gsap.to(uReveal, {
  value: 1, ease: "none",
  scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.5 },
  onUpdate: () => { dirty = true; },
});
// Renderovací fáze vlastníka canvasu po aktualizaci animací:
if (dirty && visible) { renderShared(); dirty = false; }
```

## Limity a rizika
Dvojí vyhlazování způsobí drift; R3F invalidate jen naplánuje frame, nevykreslí synchronně. Nejprve měřit pořadí update → měření → render. Reduced motion = čitelný DOM bez GPU efektu, nikoli povinný poslední frame. Bez měření nelze slibovat FPS.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) — WebGL2, info, velikost rendereru.
- **Otevřeno** 15. 11. 2026, relevantní část: [R3F Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) — demand/invalidate a sdílení zdrojů.
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN getContext](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) — jeden typ kontextu na canvas.
- **Interní, přečteno:** [WebGL](../webgl.md), [GSAP](../gsap.md), [gallery](../../tutorials/implementation-notes/scroll-revealed-webgl-gallery.md); [CDX-000](../../../agent-reports/CDX-000-orchestration-check.md) §4.
