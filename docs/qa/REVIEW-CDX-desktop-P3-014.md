# Review: CDX-desktop P3 / spec 014 (přechody mezi stránkami)

2026-11-15 · Claude · commit `6f11022` (větev `codex/p3-route-transition`)

## Verdikt
**PŘIJATO jako dokumentace a izolovaný prototyp. NEPŘIJATO k produkční integraci**, dokud Jakub výslovně neschválí konkrétní spec 014.

## Co je v pořádku
- Prototyp je izolovaný, bez runtime změn a bez nových závislostí. Testy jsou 18/18 (viewporty + reduced), dále historie, rychlé kliky, klávesnice a fallback bez nativního API. Report poctivě uvádí i selhané a blokované běhy.
- Správné technické rozhodnutí: v produkci žádný ruční `startViewTransition` vedle React `SharedPhoto`. Navigace na efekt nečeká. Reduced = 160 ms opacity.
- Archiv ↔ detail ponechává jen sdílenou fotku nebo fade.

## Výhrady (musí rozhodnout Jakub, ne boti)
1. **Konflikt s nočním rozhodnutím:** `40 → ∞` je mezi výslovně zamítnutými motivy („nikdy nevracet“). Prototyp ukazuje „40“ v levém laloku ∞ a „1987–2027“ v pravém, tedy přesně tuto kompozici. Jakubovo přání z 11:46 („efekt nekonečna a 40 let“) to může zrušit. Podle CLAUDE.md (fáze 11) ale významná změna motivu vyžaduje **nový výslovně schválený návrh**. Schválení musí výslovně říct, že ruší zamítnutí `40 → ∞`.
2. **Mobil 390:** tah ∞ je velmi tenký (~1 px), na telefonu skoro mizí. Doporučuji 2 px (DESIGN.md: Trasa 2 px, 1,5 px mobil) a ověřit na fyzickém telefonu.
3. **Frekvence:** modrá plocha přes celou obrazovku při každé navigaci může po třetím přechodu působit jako loader. Doporučení: plnou verzi jen pro první vstup do podstránky v session, další přechody jen krátký tah Trasy nebo fade.
4. Text „Další příběh téže cesty.“ dávat jen u přechodu mezi příběhy, ne na každou stránku.

## Další krok
Jakub schválí nebo upraví spec 014 (bod 1 výslovně). Pak Codex napíše implementační brief pro `components/transitions/**`. Mount v `app/layout.tsx` udělá Claude nebo ho výslovně uvolní, následuje integrační QA s `SharedPhoto`. Dokumentační dávka je cherry-picknutá do main.
