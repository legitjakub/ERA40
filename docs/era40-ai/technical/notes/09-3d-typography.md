# 09 — 3D typography: SDF, MSDF, extruze

CDX-002 · 15. 11. 2026 · **Zvážit** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
SDF/MSDF jsou ostré plošné glyphy v prostoru, extruze má skutečnou hloubku a siluetu. V ERA40 ponechat české nadpisy v DOM a Roboto Flex; prostorový letopočet zvažovat jen ve schválené 3D scéně. Dlouhý text ani UI nepatří do canvasu.

## Jak funguje a knihovny
Troika vytváří SDF atlas z fontu a layout řeší ve workeru. MSDF používá více kanálů pro ostřejší rohy, vyžaduje vlastní atlas i metriky/layout. TextGeometry vytváří extrudovanou geometrii z typeface.json, což zvyšuje počet vrcholů.

**Knihovny/verze:** Three.js r186; troika-three-text 0.53.1 (manifest větve, ne instalace); msdfgen verze nezafixována, jen koncept README; volitelně R3F 9.8.1. GSAP 3.15.1 / Lenis 1.3.27 stávající.

## Implementace v ERA40
`web/src/lib/gsap/useScene.ts` by řídil transformace, `lib/gsap/setup.ts` zůstává zdroj GSAP, `SmoothScroll.tsx` jediný Lenis. Text přidat výhradně do téhož rendereru, který by převzal `people/distortion.ts`, bez nového canvasu (§7 DESIGN). DOM nadpis má zůstat sémantický a GPU duplikát aria-hidden.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Po schváleném přidání Troiky; fontUrl není existující ERA40 asset.
const label = new Text();
label.text = "1998";
label.font = fontUrl; // vlastní schválený TTF/OTF/WOFF, ověřit české znaky
label.fontSize = 0.4;
label.sync(() => { if (!disposed) requestSharedFrame(); });
// Při unmount: disposed=true; scene.remove(label); label.dispose();
```

## Limity a rizika
Ověřit licenci odvozeného fontu, českou diakritiku, shodu wght/wdth a offline chování. Nelze předpokládat podporu současného WOFF2 nebo variabilních os v Troice. Zabránit externím fallback font requestům. Atlas má náklady na přípravu i VRAM, extruze je dražší; mobil/reduced motion = DOM.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Troika Text](https://protectwise.github.io/troika/troika-three-text/) — SDF, fonty, sync a dispose.
- **Otevřeno** 15. 11. 2026, relevantní část: [msdfgen README](https://github.com/Chlumsky/msdfgen) — vícekanálové distance fields.
- **Otevřeno** 15. 11. 2026, relevantní část: [Three.js TextGeometry](https://threejs.org/docs/pages/TextGeometry.html) — extruze a typeface.json.
- **Otevřeno** 15. 11. 2026, relevantní část: [Troika package.json](https://raw.githubusercontent.com/protectwise/troika/main/packages/troika-three-text/package.json) — manifest větve 0.53.1.
- **Interní, přečteno:** [Three.js](../threejs.md), [Capability map](../capability-map.md).
