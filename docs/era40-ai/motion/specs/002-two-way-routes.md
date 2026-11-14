# 002: Obousměrné trasy na mapě
Kapitola: 05 Mapa (`map/EuropeMap.tsx`) · **Stav: návrh**
Účel: spojuje / vysvětluje · Frekvence: jednou za návštěvu · Reference: Paper Planes (propojení), `creative-language.md`

## Koncept
Erasmus není jen odjezd. Z Česka vyjelo 411 400 lidí a do Česka jich přijelo cca 450 000 (DZS, výzvy 1998–2023, k 31. 12. 2023). Mapa po nakreslení výjezdů z Prahy **odpoví**: z destinací se tenčí linkou vrátí trasy zpět do Prahy. Tím se připraví čísla v kapitole 07.

## Stavy
- INITIAL: SSR, trasy ven nakreslené, zpětné skryté (bez JS vidět jen výjezdy, žádná ztráta informace, data jsou v textu a v 07).
- INTRO: stávající kreslení tras ven (beze změny).
- AMBIENT: žádný.
- OUTRO: ve druhé polovině scrubu se z destinací kreslí zpětné trasy do Prahy (světlejší modrá, 1 px, DrawSVG 0→100 %, nerovnoměrný stagger 0,04–0,1). Popisek „Cesty k nám“ se objeví s poslední trasou.
- REVERSE: scrub.
- MOBILE: bez pinu. Zpětné trasy se nakreslí při vstupu do obrazu jednorázově (play once, DUR.l).
- REDUCED: obě sady tras nakreslené staticky.

## Technika
Stávající `routeDraw` / DrawSVG, druhá sada `<path>` se stejnými body v opačném pořadí a s jiným obloukem (aby se linky nepřekrývaly). Text „Cesty ven. Cesty k nám.“ už v sekci je. Nové závislosti: NE.

## Dotčené soubory
`map/EuropeMap.tsx`, `map/EuropeMap.module.css`, případně `content/europe-map.json` (výpočet zpětných oblouků).

## Přístupnost a výkon
Linky jsou `aria-hidden`. Seznam destinací beze změny. Přibude asi 9 SVG cest, zanedbatelné.

## Riziko
Hustota linek kolem Prahy. Řešit vyšším obloukem zpětných tras. Posoudit na 390 px.
