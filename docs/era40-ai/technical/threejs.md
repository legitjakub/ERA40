# Three.js / React Three Fiber

**Stav:** ERA40 three.js ani R3F **nemá**. Nepřidávat bez schváleného 3D momentu (DESIGN §7 P2) a souhlasu s novou závislostí.

## Kdy uvažovat o 3D
Jen pokud 3D nese význam, který 2D nedokáže říct (např. Evropa jako prostor, ve kterém se trasy rozbíhají), a existuje plnohodnotný SVG/DOM fallback. Jinak SVG + GSAP.

## Vzory (z přečtených zdrojů)
- **Proxy kamera:** GSAP timeline tweenuje `{x,y,z}` a target, `useFrame` / rAF jen nastaví `camera.position` + `lookAt` (Codrops Cinematic 3D).
- **Kamera po křivce:** `CatmullRomCurve3` z exportovaných bodů, `getPoint(t)`, `getTangent(t)`, `t` vyhlazené `quickTo` (Codrops Blender path).
- **DOM↔mesh sync:** velikost viewportu ve world units = 2·z·tan(fov/2). Mesh kopíruje `getBoundingClientRect`. Render v `gsap.ticker` (Codrops WebGL gallery).
- **R3F výkon** ([docs](https://r3f.docs.pmnd.rs/advanced/scaling-performance)):
  - `frameloop="demand"` + `invalidate()`,
  - sdílet geometrie a materiály, `useLoader` cache,
  - `<instancedMesh>` (draw calls ideálně stovky),
  - drei `<Detailed>` (LOD), `PerformanceMonitor` (adaptivní DPR),
  - `startTransition` pro těžkou práci.
- **Úklid:** odebrání ze scény nestačí. `geometry.dispose()`, `material.dispose()`, `texture.dispose()`, render targety (Codrops gallery, animaxxing-webgl).

## Alternativa: OGL
`animaxxing-webgl` uvádí OGL 1.0.11 ≈ 14,5 KB gz vs three r186 ≈ 133 KB gz pro rovinné image efekty. OGL ale neobnovuje ztracený kontext sám. Pro ERA40 platí: obrazové efekty → rozšířit vlastní `distortion.ts`, nebo OGL. Skutečné 3D → R3F.

## Nedostupné zdroje
Manuál three.js (stránka o dispose vrátila 404 na zkoušené URL) a threejs-journey (paywall). Před implementací ověřit aktuální API přes Context7 nebo threejs.org/docs.
