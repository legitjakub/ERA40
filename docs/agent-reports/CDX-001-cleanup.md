# Report CDX-001 — úklid, dávka A

## Výchozí stav

Hlavní checkout, pracovní strom nad `d8183aa`. Bez buildu, restartu, commitu a pushe. Rozpracované soubory desktop session zůstaly nedotčené.

Úplný report: [CDX-001-cleanup.md](/Users/jakubhrncir/ERA40/docs/agent-reports/CDX-001-cleanup.md).

## Změněné soubory

Pouze povolené komponenty `SiteFooter`, `PeopleIntro`, `FilmCaptions`, stránka `/o-projektu`, dokument `PLACEHOLDERS.md`, pět smazaných `qa-*.png` a požadovaný report.

## Co je implementováno

Body 1–5 hotové:

- Patička bez interních poznámek, se zachovanými odkazy a vydavatelským blokem.
- Osiřelá linka v prologu odstraněna.
- Časový kód odstraněn; texty a časování titulků přesně odpovídají HEAD.
- `/o-projektu` používá existující fotografii lidí s evidovaným kreditem a ilustračním štítkem.
- Pět neodkazovaných QA obrázků smazáno.

## Technická rozhodnutí

Linku jsem odstranil: screenshoty ukázaly, že se míjí s osou Historie. Napojení by vyžadovalo širší změnu kompozice.

Bod 6 odložen. Diagnostika při reprodukci přiřadila DrawSVG warning cestě `data-trail` v hero. `Hero.tsx` není povolený k úpravám; mapa zůstala beze změny.

## Testy a výsledky

Testováno na dev `http://127.0.0.1:3040`.

- Typecheck, lint a `git diff --check`: exit **0**.
- Playwright: exit **0**, **40/40 kontrol**.
- Rozměry 1440 × 900 a 390 × 844, oba režimy pohybu.
- Ověřeny titulky, klávesnice, scroll vpřed/zpět a rychlý návrat.
- Bez konzolových errors, JavaScriptových chyb a vodorovného přetečení.
- Jeden desktopový DrawSVG warning z hero zůstává.

## Screenshoty

Prohlédnuté screenshoty jsou v `/private/tmp/era40-cdx001/`. Přesné cesty a strojové výsledky obsahuje uložený report.

## Známé nedostatky

Kompletní osmivelikostní matice, axe, výkon a produkční build nebyly spuštěny. Celkový `git status` zahrnuje také cizí souběžnou práci; vlastní změny jsou v povoleném rozsahu.

## Doporučený další krok

Claude: review diffu a screenshotů. Soubory CDX-001 jsou uvolněny pro review.