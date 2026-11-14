# 08 — Infinite scroll systems

CDX-002 · 15. 11. 2026 · **Nepoužívat** · referenční poznámka, bez produkční integrace.

## Co dělá a kdy použít
Rozlišit cyklickou galerii (wrap), postupné načítání výsledků a virtualizaci seznamu. Pro osm kapitol ERA40 necyklit document scroll; závěr, patička, kotvy a kontakty musí být dosažitelné. Pro budoucí archiv spíše stránkování nebo tlačítko „Načíst další“.

## Jak funguje a knihovny
Vizuální smyčka odděluje neomezený logický offset od zabalené pozice. Lenis má infinite režim, ale tím neřeší DOM pořadí, fokus, URL ani oznámení nových položek.

**Knihovny/verze:** Lenis 1.3.27, GSAP 3.15.1; Three.js r186 / R3F 9.8.1 by jen zobrazovaly cyklické položky, nejsou potřeba.

## Implementace v ERA40
`web/src/components/layout/SmoothScroll.tsx` ponechat v konečném režimu. `useScene` / `lib/gsap/setup.ts` nevytvářejí druhého scroll ownera. `people/distortion.ts` nepřevádět na nekonečnou galerii; sdílený canvas z DESIGN §7 není důvod ke změně informační architektury. Pro případný archiv řešit stabilní ID a obnovu polohy po návratu.

## Krátký vzor kódu
Vlastní schematický fragment; kontext a neimplementované adaptéry vymezuje [README](README.md).

```ts
// Pouze matematika izolovaného prototypu; nepřepisuje window.scrollY.
function wrapDistance(offset: number, span: number) {
  if (span <= 0) return 0;
  return ((offset % span) + span) % span;
}
const displayOffset = wrapDistance(logicalOffset, galleryWidth);
```

## Limity a rizika
DOM klony vytvářejí duplicitní ID a opakované focus cíle. Virtualizace může odstranit právě fokusovaný prvek. Lenis README pro infinite na touch vyžaduje syncTouch, což není důvod měnit nativní mobilní scroll ERA40. Žádná smyčka v reduced motion; nejdřív konečný seznam.

## Zdroje a návaznost
- **Otevřeno** 15. 11. 2026, relevantní část: [Lenis README](https://github.com/darkroomengineering/lenis) — ticker integrace a infinite režim.
- **Interní, přečteno:** [Blender path](../../tutorials/implementation-notes/blender-camera-path-gallery.md), [Capability map](../capability-map.md).
- **Neotevřeno v CDX-002:** Codrops Infinite GSAP Gallery (30. 7. 2026), uvedený v [SOURCE_INDEX](../../SOURCE_INDEX.md); žádné tvrzení o novém čtení.
