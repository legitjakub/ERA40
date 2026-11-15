# CDX-011 — polish mapy 05: odlišení focusu a předávka fotografie

Zadal: Claude · Datum: 15. 11. 2026 · Režim: workspace-write · Schválená specifikace: D-023, `web/docs/DESIGN.md` §2 a §05  
Základní commit: `64b77e4` · Checkout: hlavní `main` · Vlastník buildu a QA serverů: Codex · Testovaná URL/revize: zapsat skutečnou revizi a URL

## Kontext

Jakub schválil noční směr mapy 05 („Yes, update DESIGN.md“). Rozhodnutí D-023 a závazná specifikace jsou aktualizované v commitu `64b77e4`. Zachovat schválený ink/noční vzhled: ink plocha, silueta `--map-land`, Česko Erasmus+ modrou, bílé trasy, žlutá aktivní stanice, ořez Lisabon–Tampere, bez boxu a generické karty.

Vizuální review už proběhlo a balíček osmi snímků byl předán Jakubovi. **Neopakuj celé review jako nový úkol.** Zůstaly dva konkrétní polish body:
1. Fokus klávesnice a aktivní výběr používají žlutou a vizuálně se pletou.
2. Fotografická předávka z kapitoly 04 do 05 při přechodu zakrývá nadpis mapové kapitoly.

Jde o cílené řemeslné opravy, nikoli o redesign nebo novou motion scénu.

## Cíl

Zachovat D-023 a opravit pouze dvě věci: jasně odlišit keyboard focus od žlutého aktivního výběru a zajistit, aby předávka fotografie nikdy nezakryla/neznečitelnila nadpis „Blíž, než se zdá.“

## Nejdřív prostuduj

- `AGENTS.md`, `web/AGENTS.md`, `web/docs/DESIGN.md` §2 a §05
- `docs/orchestration/ORCHESTRATION.md` §2–4 a §7–8
- `docs/era40-ai/decisions/decision-log.md` — D-023
- `web/src/components/map/EuropeMap.tsx`
- `web/src/components/map/EuropeMap.module.css`
- `web/src/components/people/JourneySequence.tsx`
- `web/src/components/people/JourneySequence.module.css`

## Smíš měnit (a nic jiného)

- `web/src/components/map/EuropeMap.tsx`
- `web/src/components/map/EuropeMap.module.css`
- `web/src/components/people/JourneySequence.tsx`
- `web/src/components/people/JourneySequence.module.css`
- nový cílený test `web/scripts/qa-map-handoff.mjs`, pouze pokud je potřeba pro reprodukovatelnou kontrolu obou oprav
- `docs/agent-reports/CDX-011-map-05-polish.md` přes standardní report workflow

Pokud se ukáže, že oprava vyžaduje jiný produkční soubor, nejprve to zdůvodni v reportu a požádej o rozšíření briefu. Neobcházej omezení rozsahem „drobná související úprava“.

## Nesmíš měnit

- `web/docs/DESIGN.md`, rozhodnutí D-023, barvy identity, mapový SVG, geografická data, texty, obsah a statistiky
- žádné jiné kapitoly ani podstránky
- `web/data/**`, `docs/private/**`
- žádné nové runtime závislosti, knihovny, efekty, WebGL ani nové scroll piny
- žádné veřejné nasazení ani placené služby

## Technické a vizuální požadavky

### A. Focus vs. aktivní stanice

- Aktivní/selected stanice a vybraná trasa zůstávají žluté podle D-023.
- Keyboard focus musí mít jasně odlišný, vysoce kontrastní vizuální stav. Použij odlišnou ne-žlutou indikaci (preferovaně bílý focus ring / obrys), která je viditelná na ink i modré siluetě.
- Ošetři jak SVG destinace `.city`, tak seznam stanic `.selection button`.
- Fokus nesmí být odstraněn, nahrazen pouze změnou barvy textu ani zaměněn za aktivní výběr.
- Zachovej minimálně 44 × 44 CSS px ovládací cíle a současnou sémantiku ovládání. Pokud fokus současně mění aktivní trasu, zachovej tuto funkčnost; odliš vzhled focusu od žlutého selected markeru.
- Předchozí/další tlačítka ponech přístupná a jejich fokus jasně viditelný.

### B. Předávka Příběhy 04 → Evropa 05

- Zachovej fotografickou předávku, její geometrii, plynulost, reverzní průchod a správné obnovení zdrojového/cílového obrazu.
- Během celého přechodu musí zůstat nadpis mapové kapitoly „Blíž, než se zdá.“ čitelný a nesmí jej zakrývat pohybující se fotografie.
- Prohlédni skutečné vrstvení overlaye a nadpisu. Zvol nejmenší spolehlivou opravu (např. správné pořadí vrstev nebo úprava časování/oblasti průchodu); nevypínej předávku a neskrývej nadpis po celou dobu přechodu.
- Ověř průchod vpřed, zpět a přerušení scrollu uprostřed; po dokončení/přerušení nesmí zůstat skrytý zdroj, cíl ani nadpis.
- Mobilní fallback bez této desktopové předávky musí zůstat beze změny a plně čitelný.

## Akceptační kritéria

- [ ] Aktivní stanice zůstává žlutá; keyboard focus je okamžitě rozeznatelný a není žlutý.
- [ ] Rozlišení focus/selected funguje na SVG mapě i v seznamu destinací, při klávesnici i pointer interakci.
- [ ] Fokus je viditelný na ink i na modré siluetě; cíle zůstávají nejméně 44 × 44 px.
- [ ] Nadpis mapy zůstává čitelný ve fázích předávky 0 / 25 / 50 / 75 / 99 / 100 % a při reverzním scrollu.
- [ ] Předávka stále končí přesně na fotografii vybraného příběhu v mapě; žádné bliknutí, ztráta fotografie nebo zaseknutý overlay.
- [ ] Přerušení scrollu a návrat zpět obnoví správné vrstvy a viditelnost.
- [ ] Mobil 360/390/430 px nemá regresi ani horizontální přetok; mobilní obsah zůstává plně čitelný.
- [ ] Reduced motion ponechává obsah a ovládání funkční bez automatické předávky.
- [ ] Žádné pageerror, console error ani nové axe nálezy.

## Povinné testy

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `qa-checks` 15/15, `qa-impact` 0, `qa-handoffs` 6/6 (nebo vysvětlit přesně, proč konkrétní existující kontrola není relevantní)
- `qa-viewports`: osm šířek podle `docs/orchestration/ORCHESTRATION.md` §7, normal + reduced
- cílený průchod mapou: 1440×900, 1024×768, 390×844, 360×780
- klávesnice: Tab, Shift+Tab, Enter, Space; focus i active route
- předávka 04 → 05: vpřed, zpět, přerušení a snímky v šesti fázích uvedených výše
- skutečně prohlédnuté screenshoty před/po při 1440×900 a 390×844; screenshoty patří do lokální QA složky mimo Git a jejich cesty do reportu

Build, dev preview a případný restart :3000 vlastní výhradně Codex. Před spuštěním ověř Codex Usage podle orchestrace. Žádný další agent nesmí současně měnit uvedené soubory ani spouštět build.

## Report

Použij `docs/agent-reports/_TEMPLATE.md`. Uveď přesnou testovanou revizi, příkazy a exit kódy, screenshoty před/po, všechna selhání i omezení měření. Po dokončení výslovně uvolni soubory a build/porty. Neprováděj push, dokud dávku nezkontroluje Claude podle orchestrace.
