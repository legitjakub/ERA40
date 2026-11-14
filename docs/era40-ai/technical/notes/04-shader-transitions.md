# 04 — Shader image transitions

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Plynule přechází mezi dvěma fotografiemi přes mix nebo prostorové odhalení. Pro ERA40 jen v již schváleném obrazovém přechodu; texty a označení modelového příběhu se nedeformují. Jednoduchý wipe často stačí v CSS.

## Jak funguje a knihovny
Fragment shader vzorkuje dva obrazy s vlastními cover UV a míchá je uniformem p. Výsledný obraz má být při p=0 a p=1 přesně zdroj/cíl. Distorzi lze násobit obálkou, která v krajích zanikne.

**Knihovny/verze:** GSAP 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; WebGL1/GLSL ES 1.00 nyní; Three.js r186 a R3F 9.8.1 pouze kandidáti (viz verze v README).

## Implementace v ERA40
Rozšíření `web/src/components/people/distortion.ts` by potřebovalo druhou texturu a bezpečnou přednačítací větev; dnešní shader vzorkuje pouze jeden obraz. Uniform z hlavní timeline přes `useScene` a `lib/gsap/setup.ts`; nepřidat další Lenis vedle `SmoothScroll.tsx` ani canvas nad limit DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```glsl
// Fragment GLSL ES 1.00; uvA/uvB už obsahují vlastní cover crop.
float p = clamp(uProgress, 0.0, 1.0);
vec4 before = texture2D(uBefore, uvA);
vec4 after = texture2D(uAfter, uvB);
gl_FragColor = mix(before, after, p);
```

## Limity a rizika
Dvě dekódované fotografie zvyšují VRAM; chyba načtení cíle nesmí skrýt zdroj. Sjednotit sRGB/linear workflow při případném přechodu na Three.js. U ShaderMaterial ověřit výstupní barevný převod; srovnat screenshot s DOM. Reverzibilní uniform, žádný nový upload textury při každém framu.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html) — uniformy a vlastní shadery.
- **Otevřeno** 15. 11. 2026, relevantní část: [WebGL Fundamentals: Image Processing](https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html) — UV a texturování roviny.
- **Interní, přečteno:** [Shadery](../shaders.md), [gallery](../../tutorials/implementation-notes/scroll-revealed-webgl-gallery.md).
