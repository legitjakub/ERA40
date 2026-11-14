# 16 — 3D asset optimization: GLB, Draco, Meshopt, KTX2

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Zmenšuje přenos, dekódování i GPU zátěž skutečného modelu. Potřebné až pro schválený P2 asset; pro jednu fotografii nezavádět GLB pipeline.

## Jak funguje a knihovny
GLB je binární balení glTF, samo negarantuje malý asset. Draco/Meshopt řeší geometrii/buffery; KTX2 s Basis řeší textury pro GPU. Nejsou to tři zaměnitelné komprese. Porovnat výsledky stejného modelu včetně dekodérů.

**Knihovny/verze:** Three.js r186 + shodné addons GLTFLoader/DRACOLoader/KTX2Loader; Meshopt decoder připnout při PoC (verze zde nezvolena); R3F 9.8.1 volitelně. GSAP 3.15.1, Lenis 1.3.27.

## Implementace v ERA40
Asset načítat lazy až k viditelné scéně a pozdní výsledek po unmount odmítnout/uvolnit. Vlastník rendereru musí nahradit nebo sjednotit `web/src/components/people/distortion.ts`, jeden canvas dle DESIGN §7. Animace přes `useScene` / `lib/gsap/setup.ts`, bez druhého Lenisu vedle `SmoothScroll.tsx`. Žádný loader zatím v ERA40 není.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// PoC fragment: draco/ktx2/meshopt jsou již nastavené sdílené dekodéry.
ktx2.detectSupport(renderer);
loader.setDRACOLoader(draco);
loader.setMeshoptDecoder(meshopt);
loader.setKTX2Loader(ktx2);
const model = await loader.loadAsync(modelUrl);
// Model může používat jen vybrané komprese; pozdní výsledek uklidí owner.
```

## Limity a rizika
Draco přidává čas CPU dekódování, nesnižuje velikost textur. KTX2 transkóduje podle podpory GPU; účinek ověřit i vizuálně. Decoder JS/WASM musí být stejné schválené verze a dostupný lokálně, s korektním CSP/MIME. Prověřit licence modelu/textur a případné ImageBitmap.close; nebrat odstranění scene jako kompletní dispose.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) — glTF 2.0, připojení dekodérů.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js DRACOLoader](https://threejs.org/docs/pages/DRACOLoader.html) — komprese geometrie a cena dekódování.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js KTX2Loader](https://threejs.org/docs/pages/KTX2Loader.html) — Basis transkódování a detectSupport.
- **Interní, přečteno:** [Three.js](../threejs.md), [cinematic 3D](../../tutorials/implementation-notes/cinematic-3d-scroll.md).
