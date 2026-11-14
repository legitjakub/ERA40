# 07 — Organic shape morphing: SVG vs. GPU

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Mění tvar při zachování rozpoznatelné návaznosti. Trasa měnící roli je vhodný kandidát; dekorativní blob nebo automatický návrat ∞ není schválený motiv. Preferovat SVG pro jednu čáru, GPU až pro prostorovou transformaci s významem.

## Jak funguje a knihovny
MorphSVG interpoluje SVG path a pomáhá s rozdílnými body. GPU morf interpoluje korespondující vertex atributy; potřebuje stejný počet i pořadí vzorků. Libovolné dva modely nelze smysluplně morfovat pouhým mix.

**Knihovny/verze:** GSAP/MorphSVG 3.15.1 (plugin nyní nenačten); Three.js r186, R3F 9.8.1 pouze kandidáti; Lenis 1.3.27 beze změny.

## Implementace v ERA40
Pro SVG by až schválená implementace doplnila lazy loader do `web/src/lib/gsap/setup.ts` (dnes existují loadFlip/loadSplitText). Vlastník `useScene`; nedělat lokální druhou registraci. GPU varianta musí sjednotit renderer s `people/distortion.ts`, jeden canvas (§7 DESIGN), žádný další Lenis vedle `SmoothScroll.tsx`.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```glsl
// Vertex shader: předem připravená korespondence bodů A/B.
vec3 transformed = mix(position, aTarget, clamp(uMorph, 0.0, 1.0));
gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
```

## Limity a rizika
SVG: optimalizovat body a ověřit shapeIndex na výsledném tvaru. GPU: řešit bounding volumes, normály i hit testing deformace; morph atributy po prvním renderu nelze libovolně vyměnit. První PoC 2D, reduced motion = finální srozumitelná Trasa, mobil bez částic.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [GSAP MorphSVG](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/) — morfování SVG cest.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html) — morphAttributes, GPU geometrie a dispose.
- **Interní, přečteno:** [Capability map](../capability-map.md), [GSAP](../gsap.md) — již popisují plán lazy MorphSVG.
