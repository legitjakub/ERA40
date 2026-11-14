# 06 — GLSL image masking

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Odhaluje část obrazu analytickým tvarem nebo texturou masky. Pro ERA40 zvažovat jen tam, kde CSS/SVG nestačí; pro pár pruhů a srozumitelnou Trasu je SVG levnější integrační cesta.

## Jak funguje a knihovny
Maska je skalár 0–1. Lze ji použít pro mix dvou obrazů bez průhledného canvasu, nebo jako alpha při správném blendingu. Šířku hrany určit vůči rozlišení, ne náhodným konstantním šumem.

**Knihovny/verze:** GSAP 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; WebGL1/GLSL ES 1.00 nyní; Three.js r186 a R3F 9.8.1 pouze kandidáti (viz verze v README).

## Implementace v ERA40
Současný `web/src/components/people/distortion.ts` má alpha:false, proto pro první návrh použít mix textur; pouhý zápis alfa nezajistí prosvítání DOM. Průběh vést přes `useScene` a `lib/gsap/setup.ts`; jediný Lenis v `SmoothScroll.tsx`, jediný sdílený canvas dle DESIGN §7. CSS clipPath stávající fotky je samostatná maska.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```glsl
// Otevření zleva doprava, přesné krajní stavy.
float p = clamp(uProgress, 0.0, 1.0);
float m = 1.0 - smoothstep(p - uEdge, p + uEdge, uv.x);
if (p <= 0.0) m = 0.0;
if (p >= 1.0) m = 1.0;
gl_FragColor = mix(texture2D(uA, uvA), texture2D(uB, uvB), m);
```

## Limity a rizika
uEdge musí být kladné. SDF tvar potřebuje korekci aspect ratio; maska nesmí změnit čitelnost popisků. Derivace fwidth nejsou ve WebGL1 automaticky dostupné bez rozšíření. Reduced motion = rovnou smysluplné uspořádání všech fotografií, ne nečitelná půlmaskovaná vrstva.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html) — uniformy a vlastní shadery.
- **Interní, přečteno:** [SVG masks](../../tutorials/implementation-notes/svg-mask-transitions.md), [Shadery](../shaders.md).
