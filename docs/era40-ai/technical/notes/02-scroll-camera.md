# 02 — Scroll-controlled camera animation

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Pohyb kamery odhaluje prostorovou souvislost. Použít jen pro schválenou mapu/Trasu, pokud prostor přidává význam. Pro orientaci po mapě nejprve porovnat SVG viewBox; nepřebírat dlouhý let galerií ani řízení kolečkem přes Observer.

## Jak funguje a knihovny
Proxy u ∈ [0,1] určuje místo na křivce a samostatný target určuje pohled. getPointAt respektuje délku křivky; samotné getPoint nedává rovnoměrnou vzdálenost. Kontrolovat up vector a zatáčky.

**Knihovny/verze:** GSAP 3.15.1, @gsap/react 2.1.2, Lenis 1.3.27; WebGL1/GLSL ES 1.00 nyní; Three.js r186 a R3F 9.8.1 pouze kandidáti (viz verze v README).

## Implementace v ERA40
Proxy tween v `web/src/lib/gsap/useScene.ts`, importy přes `web/src/lib/gsap/setup.ts`; progres sdílet s existující DOM scénou. `SmoothScroll.tsx` zůstává jediným vlastníkem Lenisu. Kamera by žila ve společném rendereru nahrazujícím/rozšiřujícím `people/distortion.ts`, bez dalšího canvasu (§7 DESIGN).

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// path a aim jsou předem sestavené křivky Three.js.
function pose(u: number) {
  const p = Math.max(0, Math.min(1, u));
  path.getPointAt(p, camera.position);
  aim.getPointAt(p, target);
  camera.lookAt(target);
}
// Volat z výsledného průběhu hlavní timeline, bez druhého quickTo.
pose(progress);
```

## Limity a rizika
Zachovat čitelnost popisků, near/far a správný aspect po resize; zkontrolovat reverse, rychlý skok a přímou kotvu. Let kamery může vyvolat nevolnost. Mobil = zjednodušená mapa, reduced motion = statický přehled. PoC má měřit soulad kamery s DOM, ne jen hezký záběr.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js Curve](https://threejs.org/docs/pages/Curve.html) — getPointAt a parametrizace křivky.
- **Interní, přečteno:** [Three.js](../threejs.md), [Blender camera path](../../tutorials/implementation-notes/blender-camera-path-gallery.md), [cinematic 3D](../../tutorials/implementation-notes/cinematic-3d-scroll.md).
