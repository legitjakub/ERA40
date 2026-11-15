> **SUPERSEDED — NEPROVÁDĚT.** Toto read-only review už není aktuální: vizuální balíček osmi screenshotů byl připraven a předán Jakubovi; Jakub následně schválil noční směr D-023 a `web/docs/DESIGN.md` byl aktualizován v commitu `64b77e4`. Zbývající konkrétní opravy jsou nově zadány v `docs/agent-briefs/CDX-011-map-05-polish.md`. Tento brief ponechán pouze jako auditní stopa.

---

# CDX-009 — vizuální review mapy 05 „Blíž, než se zdá“

Zadal: Claude · Datum: 15. 11. 2026 · Režim: read-only · Specifikace: vizuální review dokončené implementace, bez nové produkční specifikace  
Základní commit: `2308c19` · Checkout: hlavní `main` · Vlastník buildu a QA serveru: nikdo (build/restart zakázán) · Testovaná URL/revize: `http://127.0.0.1:3000`, pouze pokud běžící sestava odpovídá mapě z `95f4fc9`

## Kontext

Claude dokončil přepracování kapitoly 05 „Blíž, než se zdá“ jako noční mapy v commitu `95f4fc9`. Výchozí aplikační revize pro toto review je `2308c19` (před následnými dokumentačními commity); mapová implementace je již pushnutá a soubory jsou uvolněné.

Toto zadání je pouze nezávislé vizuální a interakční review skutečné běžící implementace. Nejde o další redesign ani o souhlas s automatickou změnou vizuálního směru.

## Cíl

Dodat skutečné screenshoty a stručný, důkazní review mapy na desktopu i mobilu, včetně návaznosti Příběhy → Evropa, bez změny produkčního kódu.

## Nejdřív prostuduj

- `AGENTS.md`, `web/AGENTS.md`, `web/docs/DESIGN.md`
- `docs/orchestration/ORCHESTRATION.md` §7–8
- poslední předání mapy v `web/docs/CLAUDE-COORDINATION.md`
- `web/src/components/map/EuropeMap.tsx`
- `web/src/components/map/EuropeMap.module.css`
- `web/src/components/map/MapLand.tsx`
- `web/public/media/europe-land-night.svg`

## Smíš dělat

- Číst zdrojové soubory a ověřit aktuální Git HEAD / stav checkoutu.
- Použít již běžící lokální preview, pokud je dostupné a odpovídá mapové implementaci z `95f4fc9`.
- Pořídit screenshoty do lokální QA složky `web/qa/map-05-visual-review/` (mimo commit).
- Provést vizuální a ruční interakční kontrolu popsanou níže.
- Odevzdat report `docs/agent-reports/CDX-009-map-visual-review.md` podle `docs/agent-reports/_TEMPLATE.md` (přes standardní výstup task runneru).

## Nesmíš dělat

- Neměň žádné produkční soubory, CSS, SVG, komponenty, data, design dokumenty ani koordinaci.
- Nevytvářej další animace, efekty, varianty mapy ani nový prototyp.
- Nespouštěj build, lint, typecheck ani restart serveru; pro tento read-only úkol nejsou potřeba.
- Nespouštěj nový server a nepřebírej porty :3000 / :3040.
- Nepushuj žádnou změnu produkčního kódu ani screenshoty do Gitu.
- Neopravuj rozpor s `web/docs/DESIGN.md` sám. Pouze ho přesně popiš a předej k rozhodnutí.

Pokud lokální checkout není na očekávaném commitu, obsahuje cizí necommitované změny nebo není dostupná odpovídající běžící stránka, nic nespouštěj ani neupravuj. Uveď blokaci a dostupné důkazy.

## Co přesně ověřit

1. **Desktop 1440 × 900:** celá kompozice kapitoly, mapa, textový příběh, ovládání tras a proporce.
2. **Mobil 390 × 844:** mapa a obsah pod ní, pořadí, swipe pás stanic, ovládání a čitelnost.
3. **Mobil 360 × 780:** ořez mapy, všechny názvy měst, zejména Tampere, a nulový horizontální přetok.
4. **Přechod Příběhy → Evropa:** skutečná návaznost předané fotografie / SharedPhoto a vizuální kontinuita.
5. **Stavy mapy:** neaktivní a aktivní trasa, výběr destinace, předchozí/další trasa.
6. **Klávesnice:** dosažitelnost destinací a ovládacích prvků, viditelný focus, funkční Enter/Space podle sémantiky ovládání.
7. **Reduced motion:** mapa i její ovládání zůstávají pochopitelné a použitelné bez pohybových efektů.

## Vizuální kontrolní body

- Je silueta Evropy na tmavém pozadí dostatečně čitelná a vizuálně výrazná, nebo příliš splývá?
- Je ořez Lisabon–Tampere vyvážený, bez dojmu náhodně useknuté mapy?
- Rozpouštějí se okraje přirozeně? Neztrácejí se důležité části tras?
- Jsou všechny stanice, názvy a trasy čitelné a geograficky přesvědčivé?
- Je hierarchie mezi mapou a textovým příběhem jasná?
- Působí přepínání tras jako součást příběhu, ne jako generické aplikační ovládání?
- Je mobilní varianta promyšlená, nikoli pouze zmenšený desktop?
- Je předávka fotografie z kapitoly 04 skutečně plynulá?

## Důležitý rozpor k zaznamenání

Aktuální `web/docs/DESIGN.md` popisuje pro kapitolu 05 Erasmus+ modrou plochu a EU modré mapové pole. Implementace `95f4fc9` přešla na ink/noční plochu a modrou siluetu Evropy.

Tento rozdíl pouze zdokumentuj jako rozhodnutí vyžadující aktualizaci zdroje pravdy. Neměň `DESIGN.md` ani vizuální implementaci a nenavrhuj automatickou opravu bez kreativního schválení.

## Akceptační kritéria

- [ ] Skutečné screenshoty 1440 × 900, 390 × 844 a 360 × 780 jsou pořízené a prohlédnuté.
- [ ] Screenshot návaznosti Příběhy → Evropa je pořízený a prohlédnutý.
- [ ] Report uvádí konkrétní nálezy pro každou šířku, ne obecné „vypadá dobře“.
- [ ] Aktivní/neaktivní stav, ovládání, klávesnice a reduced motion jsou ověřené, nebo poctivě označené jako blokované/nespuštěné.
- [ ] Rozpor s `DESIGN.md` je popsán, bez svévolné změny.
- [ ] Produkční zdroje, build, servery a Git stav zůstaly beze změny.

## Povinný výstup

Report `docs/agent-reports/CDX-009-map-visual-review.md` s:
- základním SHA a skutečně testovanou URL/revizí,
- tabulkou šířka → screenshot → konkrétní nález,
- seznamem vizuálních a interakčních problémů se závažností,
- jasným rozlišením „ověřeno / neověřeno / blokováno“,
- doporučením: přijmout současný směr, vrátit konkrétní dílčí problém k opravě, nebo vyžádat kreativní rozhodnutí.

Screenshoty ulož do `web/qa/map-05-visual-review/` (lokálně, mimo Git) a jejich přesné cesty vlož do reportu. Nepřikládej ani necommituj screenshoty do repozitáře.

## Report

Použij `docs/agent-reports/_TEMPLATE.md`. Bez produkčních změn a bez commitu.
