# CDX-005 — Spec 009, kapitola 08 „Pokračování“ (`#budoucnost`)

Zadal: Claude · 15. 11. 2026 · Režim: **workspace-write** (hlavní checkout) · Základ: `cc3f6d1`
Spec: `docs/era40-ai/motion/specs/009-lower-chapters-redesign.md` (sekce 08 + upřesnění) · Motion: `docs/orchestration/MOTION_BIBLE.md` M09
**Souběh:** Claude současně přestavuje `then-now/*` a `numbers/*`. Ty smíš měnit **jen `web/src/components/future/**`**. Žádný build ani restart :3000 (dělá Claude). QA proti dev :3040.

## Co vytvořit
Kapitolu 08 přestav od základu podle spec 009:
- Krátký kicker a velký nadpis „Cesta končí. Zkušenost pokračuje.“ Nahradí dnešní „Další cesta začíná teď.“ a lead nad ním (už ne dvakrát totéž).
- Jedna věta pod nadpisem: zkušenost pokračuje k dalším lidem, i k těm, kteří nikdy nevyjeli. Česky, lidsky, bez sebeoslavy.
- Linka bez osmi měst: přijíždí zleva (navazuje na rozvětvení z Čísel), plná → žlutý bod „Vaše cesta“ → tečkovaná za pravý okraj (gramatika spec 001). DrawSVG scrub, reverse = inverze.
- Akce: primární **Zapsat svůj příběh** (`/zapojte-se#pribeh`), sekundární **Jaké je tvoje ERA?** (`/tvoje-era`). Pod tím jeden klidný řádek odkazů: Vyrazit s Erasmus+ (`https://www.dzs.cz/program/erasmus`), O programu Erasmus+, Sdílet (stávající funkce sdílení zachovat).
- Méně prvků než dnes. Žádné karty, žádné magnetické efekty navíc. Světlá plocha (sky), patička navazuje.
- Mobil: linka svisle u levého okraje → bod → tečky dolů, tlačítka pod sebou na plnou šířku, cíle ≥ 44 px.
- Reduced motion: linka hned nakreslená.

## Nesmíš
Měnit cokoli mimo `web/src/components/future/**`. Nové závislosti, piny, canvas, commit, build.

## Akceptační kritéria
- [ ] Přímá kotva `#budoucnost` funguje. Chapter id a `data-section` zachované.
- [ ] Klávesnice: obě akce a řádek odkazů v logickém pořadí, viditelný focus.
- [ ] 1440 a 390: žádné přetečení, linka nezasahuje do textu.
- [ ] Konzole bez chyb. Typecheck a lint OK.

## Testy
`npm run typecheck`, `npm run lint`. Playwright proti :3040: `/#budoucnost` na 1440 × 900, 390 × 844 a 360 × 780, normal + reduced. Screenshoty do `/private/tmp/era40-cdx005/`.

## Report
Podle šablony, se screenshoty.
