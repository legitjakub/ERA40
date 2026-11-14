# 18 — WebGL fallback strategies

CDX-002 · 15. 11. 2026 · **Použít** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Udrží obsah a ovládání i bez GPU, při jeho ztrátě, chybě obrázku či volbě omezeného pohybu. Povinná součást současné distorze i každého P2; fallback nesmí být prázdné plátno nebo loader bez konce.

## Jak funguje a knihovny
DOM/SVG je výchozí zobrazení. GPU overlay se ukáže až po úspěšném snímku. Při context loss ihned schovat canvas a zastavit loop; obnova invaliduje staré GPU resources a vyžaduje nové sestavení. Obnova není zaručená.

**Knihovny/verze:** WebGL1 nyní; Three.js r186/WebGL2 a R3F 9.8.1 pouze kandidáti. GSAP 3.15.1, Lenis 1.3.27; Context Events bez balíčkové verze.

## Implementace v ERA40
`web/src/components/people/distortion.ts` má no-op fallback při chybě shaderu, ale explicitní lost/restored obsluhu zatím neobsahuje. `StoryDistortion.tsx` potřebuje i kontrolu aktuální viditelnosti po await importu. `useScene` uklidí GSAP, GPU owner musí uklidit své handlery. Import přes `lib/gsap/setup.ts`, jediný Lenis v `SmoothScroll.tsx`, jediný canvas dle DESIGN §7.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Návrh pro vlastní WebGL owner; neparalelizovat s interní obnovou engine.
const lost = (e: Event) => {
  e.preventDefault(); // umožnit obnovu kontextu
  canvas.style.opacity = "0"; stopLoop();
};
const restored = () => {
  if (live && eligible && visible) rebuildResourcesAndDraw();
};
canvas.addEventListener("webglcontextlost", lost);
canvas.addEventListener("webglcontextrestored", restored);
// Cleanup: live=false; stopLoop(); odstranit oba listenery i zdroje.
```

## Limity a rizika
Vlastní rebuild není existující API projektu. Při Three.js respektovat i jeho interní lifecycle, neprovádět druhou nekontrolovanou obnovu. Testovat WEBGL_lose_context, chybu shaderu/assetu, rychlý odchod během importu a změnu reduced motion. DOM alt/linky, caption i fokus zůstávají dostupné; nečekat na restored pro zobrazení fallbacku.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN webglcontextlost](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event) — událost ztráty kontextu.
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN webglcontextrestored](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextrestored_event) — neplatnost starých GPU prostředků.
- **Otevřeno** 15. 11. 2026, relevantní část: [MDN WEBGL_lose_context](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context) — simulace ztráty a obnovy v WebGL1/2.
- **Interní, přečteno:** [WebGL kontrakt](../webgl.md), [CDX-000](../../../agent-reports/CDX-000-orchestration-check.md) §4.2.
