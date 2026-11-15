# Vizuální opakování v AI webech: podklady a audit ERA40

15. 11. 2026 · Codex desktop. Stažený katalog je analytický podklad, nikoli automaticky aplikovaný skill nebo nové projektové instrukce. Žádný jeho scanner, instalační příkaz ani hook nebyl spuštěn.

## Stažený seznam

`ai-tells-catalog.upstream.md`: 67 vzorců z [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), kopie s MIT licencí v `LICENSE.upstream.txt`. Přesné URL, velikosti a SHA-256 jsou v `sources.json`.

Katalog popisuje opakování kompozice, barev, ikon, štítků, animací i textů. Jeho doporučení je potřeba vztáhnout ke konkrétnímu briefu; podobný vzhled nedokazuje autorství určitého modelu.

## Co bylo skutečně přečteno

- [Diskuse r/UI_Design](https://www.reddit.com/r/UI_Design/comments/1tvb91q/ai_fatigue_from_seeing_same_designs/): uživatelé kritizují zaměnitelnost karet, odznaků a UI sad; jako nápravu popisují vlastní obsah, obrazy a kreativní brief. Jde o zkušenosti diskutujících, ne měření kvality jednotlivých AI.
- [Diskuse r/Frontend](https://www.reddit.com/r/Frontend/comments/1opi3h3/is_anyone_else_tired_of_every_tailwindshadcn_app/): stejnorodý výsledek při nezměněných komponentových sadách.
- [vibecoded-design-tells](https://github.com/JCarterJohnson/vibecoded-design-tells): komunitní analýza opakovaných výtek z Redditu, autor sám uvádí omezení výběru a heuristik. Nepřebíráme její procenta jako obecný důkaz.
- [Oficiální frontend-design Anthropic](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md): doporučuje odvozovat typografii a kompozici od tématu a hodnotit, zda animace odpovídá akci člověka. Upozorňuje i na nové šablony typu krémová/terakota a přemíru dekorativních popisků.

Claude, ChatGPT/Codex a generátory jako v0/Lovable mohou produkovat podobné komponentové výchozí vzory. Z konkrétní barvy či radiusu nelze poctivě určit použitý model. Audit proto hledá viditelné problémy ERA40, nikoli domnělé otisky jednotlivých AI.

## Nálezy v ERA40 → zásah

| Nález ve zdrojích | Rozhodnutí |
|---|---|
| „Ilustrační snímek/video“ opakované přes obrázky a dokonce pohybující se s přechodovým rámem | Odstranit skutečné overlay uzly v JSX i jejich vlastní JS výpočty. Původ fotografie zůstane v metadatech a kreditech. |
| Stejné „Modelový příběh – ilustrační“ pod každou kartou | Jedna redakční poznámka v přehledu, vysvětlení v detailu/dialogu. Skutečné příběhy si ponechají odkaz na zdroj. |
| „Tohle jsou lidé, ne doprava.“ | Interní konverzační zbytek přepsat na „Každý přiveze něco jiného.“ |
| Magnetická CTA reagující na kurzor bez vazby na příběh | Odstranit z hera; film, kinetická typografie a Trasa dál zajišťují jeho hlavní pohyb. |
| Všechny archivní karty se zvedají o 48 px se stejným zpožděním | Odstranit jednotný nájezd celých karet. Zachovat reakci fotografií a uživatelem vyvolané přechody filtrů/SharedPhoto. |
| Citace po slovech s opacity0,14 a rozmazané odstavce detailu | Odstranit: skutečné axe měření ukázalo kontrast1,27:1 před dočtením scény. Fotografie, vykreslovaná trasa a směrový přechod dalšího příběhu zůstávají. |
| Stejný nájezd minifotografií archivu | Odstranit CSS stripIn i delay; jména a cíle jsou čitelné ihned. |
| Šipka ↗ připojená i k interním výzvám | Odstranit z interních CTA. Geografické směry, předchozí/další, stažení a externí zdroje zůstávají významové. |
| Mapa se barevně ztrácí ve světlé ploše a z telefonu se hůř zkoušejí jednotlivé trasy | Samostatná Erasmus+ modrá plocha, tmavší geografické pole a srozumitelné předchozí/další trasy s existující animací linky. |

## Záměrně zachovat

Roboto Flex, Erasmus+ modrou, osm očíslovaných kapitol, skutečné statistiky se zdroji, časově věrných 40 značek a schválený přechod 014. Jsou odůvodněné tématem a briefem. Plošně je odstranit podle obecného seznamu by znamenalo ztratit identitu projektu.

Screenshoty a ověření se uvádějí v reportu CDX-008. Samotný výskyt slova nebo CSS pravidla se nevydává za vizuálně ověřený nález.
