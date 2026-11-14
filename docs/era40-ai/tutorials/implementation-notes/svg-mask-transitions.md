# SVG Mask Transitions on Scroll

- **URL:** https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/
- **Autor / datum:** Hiroki Watanabe, 11. 3. 2026. Typ: tutoriál. Přečteno celé.
- **Technologie:** GSAP, ScrollTrigger, Lenis, SVG `<mask>`.

## Technika
- Každá vrstva je `<svg viewBox="0 0 100 100" preserveAspectRatio="none">` s `<image preserveAspectRatio="xMidYMid slice">` (ekvivalent `object-fit: cover`) a vlastní `<mask>`: černý obdélník jako základ a prázdná `<g>`, do které JS generuje bílé obdélníky.
- Viewbox se přepočítává podle poměru stran (výška 100, šířka = poměr × 100). Při resize se timeline zabije a postaví znovu.
- Čtyři vzory:
  1. horizontální žaluzie: pár obdélníků na středové linii roste nahoru/dolů, stagger 0,02, odspodu,
  2. náhodná mřížka: `gsap.utils.shuffle` + opacity, stagger 0,02, sloupce 14/10/6 podle zařízení,
  3. vertikální žaluzie: 12 pruhů zleva doprava,
  4. sloupcová náhodná mřížka: pořadí po sloupcích, uvnitř sloupce náhodně, což dává vlnu zleva doprava s organickým detailem.
- Scrub 2,0–2,5 dává dojezd po zastavení scrollu.
- Proti mezerám: `shape-rendering="crispEdges"` a přesah +0,01 až +0,1 jednotky.
- Atributy se animují přes `attr` (y, height, x, width). Index páru je `Math.floor(i/2)`.

## Chyby a výkon
- 1px mezery z subpixelů (řeší přesah).
- Mnoho `<rect>` v masce = repaint celé SVG vrstvy každý frame. Na mobilu snížit počet buněk (autor používá 6 sloupců).
- Scrub s velkým lagem může působit „opožděně“ u pinu s textem.

## Pro ERA40
- **Kandidát:** přechod mezi fotkami v Historii (03) nebo mezi páry Tehdy/Teď (06), místo prostého clip-path. Žaluzie jsou příbuzné „oknu vlaku“, tedy motivu cesty.
- **Úprava pro identitu:** pruhy jako koleje/pražce (vertikální žaluzie), žádná náhodná mřížka (digitální look nepatří k dokumentárnímu tónu).
- Mobil: 6 pruhů, bez pinu. Reduced motion: statický snímek.
- Pozor: `<image>` v SVG obchází `next/image`. Nutno řešit AVIF/velikost ručně.
