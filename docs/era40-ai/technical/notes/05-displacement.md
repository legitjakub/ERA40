# 05 — Displacement mapping

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Rozlišit dva efekty: UV displacement zvlní fotografii, vertex displacement mění skutečný povrch. ERA40 má první variantu v malé intenzitě. Geometrickou deformaci nepřidávat bez příběhového důvodu a schváleného P2.

## Jak funguje a knihovny
Datová mapa posouvá UV nebo vrcholy podél normály. Vertex varianta vyžaduje hustší mesh; normal/bump mapa sama siluetu nemění. Displacement mapu v Three.js označit jako data bez sRGB převodu.

**Knihovny/verze:** GSAP 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; WebGL1/GLSL ES 1.00 nyní; Three.js r186 a R3F 9.8.1 pouze kandidáti (viz verze v README).

## Implementace v ERA40
`web/src/components/people/distortion.ts` používá sinusový UV offset, nikoli výškovou texturu. Pro jeho náhradu mapou zachovat crop i CLAMP_TO_EDGE. Sílu odvodit z jednotného animovaného stavu přes `useScene` / `lib/gsap/setup.ts`, vedle jediného Lenisu v `SmoothScroll.tsx`; stále jeden canvas dle DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```glsl
// UV varianta, GLSL ES 1.00; uAmount je malé číslo v UV jednotkách.
float h = texture2D(uDisplacement, uv).r * 2.0 - 1.0;
vec2 shifted = clamp(uv + vec2(h * uAmount, 0.0), 0.0, 1.0);
gl_FragColor = texture2D(uPhoto, shifted);
```

## Limity a rizika
Neplést přenosovou velikost mapy s pamětí GPU. Silný posun roztahuje kraje a mění tváře; na mobilu je současná P1 distorze dle DESIGN vypnutá, reduced motion také. U geometrie nevzniknou správné normály automaticky jen nastavením displacementMap.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html) — vertex displacement, datové mapy.
- **Interní, přečteno:** [Shadery](../shaders.md), [WebGL](../webgl.md).
