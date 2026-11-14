# 14 — Three.js performance optimization

CDX-002 · 15. 11. 2026 · **Použít při 3D** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Řídí náklady CPU/GPU a životní cyklus místo odhadování výkonu podle velikosti JS balíčku. Nutné pro jakýkoli budoucí Three.js PoC; pro dnešní jednu image rovinu není přidání engine optimalizací.

## Jak funguje a knihovny
Měřit renderer.info, frame time a alokace. Znovupoužívat geometrii/materiály, dávkovat opakované objekty a nedělat React state update každý frame. Demand render musí obdržet invalidaci při externí změně kamery/uniformu.

**Knihovny/verze:** Three.js r186; R3F 9.8.1 volitelně, GSAP 3.15.1, Lenis 1.3.27. Verze jsou referenční, bez instalace.

## Implementace v ERA40
GPU owner by převzal odpovědnost `web/src/components/people/distortion.ts`. `useScene` uklidí GSAP, nikoli automaticky textury či renderer. `lib/gsap/setup.ts` zůstává vstupem animací a `SmoothScroll.tsx` jediným Lenisem. Jeden sdílený canvas dle DESIGN §7; nesmí se sdílet jen HTML element mezi dvěma engine.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Pomocník vlastníka zdrojů, pouze pro unikátní vlastněné prostředky.
function disposeOwned(geometries, materials, textures) {
  new Set(geometries).forEach(g => g.dispose());
  new Set(materials).forEach(m => m.dispose());
  new Set(textures).forEach(t => t.dispose());
}
// Nejdřív odpojit frame callbacky a listenery, pak uvolnit zdroje.
```

## Limity a rizika
Sdílenou texturu nedisposovat při odchodu jediného konzumenta. Instancing pomáhá draw calls, ne automaticky fill rate. renderer.info není měřič všech bajtů VRAM. Skryté/offscreen scény pozastavit. U dnešní distorze měnit drawing buffer jen při změně rozměrů; nevyměňovat jej slepě každý aktivní frame.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) — WebGL2, info, velikost rendereru.
- **Otevřeno** 15. 11. 2026, relevantní část: [R3F Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) — demand/invalidate a sdílení zdrojů.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html) — morphAttributes, GPU geometrie a dispose.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js Material](https://threejs.org/docs/pages/Material.html) — dispose a průhlednost.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js Texture](https://threejs.org/docs/pages/Texture.html) — vlastnictví textury, rozměry a dispose.
- **Interní, přečteno:** [Three.js](../threejs.md), [CDX-000](../../../agent-reports/CDX-000-orchestration-check.md) §4.3.
- **❌ Nedostupné:** [cleanup.html](https://threejs.org/manual/en/cleanup.html) a [how-to-dispose-of-objects.html](https://threejs.org/manual/en/how-to-dispose-of-objects.html) vrátily 404; postup dispose ověřen přes API výše, ne přes neotevřený manuál.
