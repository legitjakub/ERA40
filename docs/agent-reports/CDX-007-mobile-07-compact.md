# Report CDX-007 — mobilní Rozvětvení

## Výchozí stav

Základ `8e8686b`, worktree `/private/tmp/era40-cdx-007`, větev `codex/cdx-007-mobile-07`. Runtime kandidát **`545f573`**. Claude souběžně vlastní film, Příběhy/podstránky, hlavní build a restart :3000. Testováno na izolovaném **http://127.0.0.1:3041**, žádné změny jeho runtime souborů.

## Změněné soubory

- `web/src/components/numbers/Numbers.tsx`: jeden sdílený příklad se na <768 px vykresluje přímo pod vybranou větví. Tap/Enter/Space přepíná výběr, opakované použití aktivního tlačítka příklad zavře. `aria-expanded` a `aria-controls`; focus zůstává na tlačítku. Desktop zachovává umístění příkladu pod stromem.
- `web/src/components/numbers/Numbers.module.css`: kompaktní obrazový záhlaví příkladu, menší mezery, stejné dva sloupce sekundárních čísel. Poslední statistika využije celý řádek jako dva sloupce (číslo / popis a zdroj), ne prázdnou pravou polovinu. Zdroje mají 44px plochu a úplný popis v `title`; období zůstávají viditelná. Dlouhá metodická věta u 86 % je na mobilu zkrácena na „Šetření DZS a STEM/MARK, 2022.“, úplné znění je v `title` zdroje.
- `web/src/components/numbers/BigCount.module.css`: jen mobilní rozestupy a menší ilustrační tváře. Dominantní číslo a všechny texty zachované.

## Technická rozhodnutí

- `useSyncExternalStore` sleduje jediný breakpoint. SSR má čitelný původní příklad, po hydrataci se přesune; žádná druhá kopie dat/panelu ani duplicitní `#sector-example`.
- Rozbalení nemá animaci. Jednotlivé větve a jejich počítadla, DrawSVG choreografie, škála a statistická data se nemění. Existující měření geometrie se přizpůsobí rozbalené větvi.
- Při >767 px zůstává příklad vždy otevřený pod stromem a tlačítka nemají `aria-expanded`. Nativní breakpoint subscription se uklízí při unmount.
- Žádná nová závislost, pin, framework ani produkční build.

## Testy a výsledky

Testovaná runtime revize **545f573** (cílená matice proběhla na totožném patchi těsně před jeho lokálním commitem; následující kontroly už na commitu). Chromium desktop/touch emulace, nikoli fyzický iPhone.

| Příkaz / ověření | Exit | Výsledek |
|---|---|---|
| `npm run lint && npm run typecheck` | 0 | čisté |
| `node scripts/qa-checks.mjs --url http://127.0.0.1:3041 --out /private/tmp/era40-cdx-007-qa/checks` | 0 | 15/15 |
| `AXE_SCRIPT=/private/tmp/era40-qa-tools/node_modules/axe-core/axe.min.js node scripts/qa-impact.mjs --url http://127.0.0.1:3041 --out /private/tmp/era40-cdx-007-qa/impact` | 0 | 1440/390/360: všech 5 příkladů, focus, filtry a návrat; 0 axe violations a 0 pageerror |
| Cílený Playwright průchod (dočasný skript, `targeted.json`) | 0 | 360/390/430 nejdřív, pak 768/1440; normal + reduced = **10/10**, všech 5 větví; Enter/Space, otevření/zavření, správný panel pod větví, jeden ID, nulové přetečení a chyby |
| Dotykový a SSR průchod (`tap-nojs.json`) | 0 | skutečné `tap()` na 360/390/430: výběr/zavření/znovuotevření a focus OK; bez JS 390: 5 tlačítek, čitelný příklad a přetečení 0 |
| `git diff --check` | 0 | čisté |
| Build / restart :3000 | — | **nespuštěno podle briefu**, vlastní Claude; integrační build a QA až po jeho review |

`PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers` u všech browser příkazů. `/api/kontakty` blokováno nebo mockováno podle existujících QA skriptů; skutečné kontakty se neukládaly.

Výška kapitoly v pixelech (vždy **s otevřeným příkladem**, min–max přes všech pět oblastí; normal/reduced totožné):

| Šířka | Výška 07 | Výchozí školní příklad |
|---|---|---|
| 360 | 1785–1891 | 1820 |
| 390 | 1734–1861 | 1790 |
| 430 | 1706–1862 | 1791 |

Výchozí stav podle briefu přibližně 2600 px. Všechny tři mobily nyní splňují ≤1900 px. Zdroje sekundárních statistik mají naměřeno 44 px.

## Screenshoty a vlastní vizuální kontrola

Adresář `/private/tmp/era40-cdx-007-qa/` (mimo Git):

- `390-viewport.png` — přesně 390×844, otevřený odborný příklad, dotykový průchod.
- `1440-viewport.png` — přesně 1440×900, původní desktopové umístění příkladu.
- `{360,390,430,768,1440}-{normal,reduced}.png` — celé kapitoly.
- `targeted.json`, `tap-nojs.json`, `checks/`, `impact/report.json` — důkazy testů.

Skutečně prohlédnuté: 390 normal, 390 reduced, 1440 normal, oba výše uvedené viewport snímky. Čísla, názvy a diakritika jsou čitelné, fotografie a modelový štítek zůstaly, výsledný panel přímo navazuje na vybranou větev.

Pozor na artefakt `element.screenshot()` celé dlouhé sekce: během snímání se do stitched snímku promítne fixed hlavička/skip link. Běžný viewport je čistý. Ověřený skip link při blur má `top=-66.15`, `:focus=false`; nejde o odhalenou chybu webu.

## Známé nedostatky / další krok

- Desktop zachovává původní délku kapitoly. Záměrem briefu jsou pouze telefony <768 px.
- Nebyl změřen výkon na fyzickém telefonu ani integrační produkční build; žádná nová animační vrstva ale nevznikla.
- **Prosím Claude o skutečné review 545f573**, následný cherry-pick do main, jeden integrační build/QA a push ověřené dávky. Tento report je vlastní implementační kontrola Codexu, ne nezávislé review.
