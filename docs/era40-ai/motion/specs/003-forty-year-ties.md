# 003: Osa 40 let (pražce)
Kapitola: 03 Historie (`history/HistoryTimeline.tsx`) · **Stav: uzavřeno 15. 11. 2026, nahrazeno spec 015 A (D-020).**
Účel: vysvětluje (měřítko času) · Frekvence: jednou za návštěvu · Reference: `creative-language.md` (číslo 40)

## Koncept
Pod linkou EU leží 40 krátkých svislých značek, jedna za každý rok 1987–2026 (pražce koleje). Při scrubu se „rozsvěcují“ za čelem linky. Značka roku 1998 je delší, protože se tam připojuje česká linka. Číslo 40 tak není nápis, ale **měřítko cesty**.

## Stavy
- INITIAL: 40 značek v barvě `--c-line` (tlumené).
- INTRO / scrub: značky za čelem linky přejdou na modrou (EU) a od roku 1998 i na žlutou (CZ). Je to jen změna barvy nebo opacity, žádný pohyb.
- AMBIENT: žádný.
- OUTRO: v roce 2027 jsou všechny značky „ujeté“ a s textem „Čtyřicet let Erasmu“ (už existuje).
- REVERSE: scrub.
- MOBILE: vertikální osa vlevo, 40 vodorovných značek, rozsvěcují se při průchodu (IntersectionObserver nebo scrub bez pinu).
- REDUCED: všechny značky ve finálním stavu.

## Technika
Jedno SVG `<g>` se 40 `<line>` generované z geometrie, kterou už komponenta počítá. Barvy přes `stagger` ve stávající timeline (scrub). Nové závislosti: NE.

## Dotčené soubory
`history/HistoryTimeline.tsx`, `HistoryTimeline.module.css`.

## Přístupnost a výkon
`aria-hidden`. 40 elementů, mění se jen `stroke`/`opacity`.

## Riziko
Vizuální šum pod osou. Značky musí být jemné (4–6 px, 1 px tloušťka). Posoudit na screenshotu dřív, než se napojí scrub.
