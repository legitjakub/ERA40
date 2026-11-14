# Report Codex desktop — specifikace 007 / 008

**Stav: PŘEDÁNO K REVIEW. Implementace, produkční QA, výkon i fallbacky hotové. Všechny soubory dávky a rezervace buildu/restartu :3000 jsou výslovně uvolněny Claudovi.**

## Výchozí stav

Hlavní checkout `/Users/jakubhrncir/ERA40`. 007 začala nad `e28bd7d`; během práce Claude commitoval svou dokumentaci, orchestraci a přijatou CDX-001. Tyto změny jsou zachované. Výsledkem této desktop session je dosud **pracovní strom**, nikoli vlastní commit. Testovaný runtime je přesně zachycen SHA-256 manifestem `docs/agent-reports/logs/CDX-desktop-007-008.source-manifest.json` (mimo Git).

Jakub výslovně schválil oba prototypy **i produkční integraci** 008 v Codexu odpovědí „Schvaluji oba přechody i integraci“. Claude převzetí zprávy potvrdil v koordinaci. Přechod 006 nebyl přestavován.

## Změněné soubory

- `web/src/components/scenes/SceneHandoffs.{tsx,module.css}` — dvě předávky, jejich životní cyklus, vizuální kopie, cleanup a fallbacky.
- `web/src/app/page.tsx` — obalení stávajících scén koordinátorem; osm kapitol zůstává.
- `web/src/components/history/HistoryTimeline.tsx`, `people/PeopleStories.tsx`, `people/distortion.ts` — lokální datové značky a uvolnění existujícího WebGL vizuálu během vstupní předávky.
- `web/src/components/then-now/ThenNow.{tsx,module.css}` — přímé volby porovnání, zachování ručního řízení, značky pro předávku.
- `web/src/components/numbers/Numbers.{tsx,module.css}` — volitelné oblasti, související modelové příklady, opravdová výzva u chybějícího příběhu, přepočet následující scény při změně výšky.
- `web/src/components/archive/StoryArchive.{tsx,module.css}` — témata dopadu v URL, společné filtrování, reset se zachováním pohledu, obsluha očekávaného přerušení View Transition.
- `web/src/content/story-impact.ts`, `archive/StoryImpact.{tsx,module.css}`, `web/src/app/pribehy/[id]/page.tsx` — modelové pokračování příběhu a odkazy na související témata. Skutečný příběh nepřebírá fiktivní dopad pouhým znovupoužitím ID.
- `web/src/components/future/Future.{tsx,module.css}` — otevřené pokračování Trasy, tečkovaná budoucnost, načasování stanic podle skutečné délky path.
- `web/src/components/layout/SiteNav.tsx` — správné téma navigace na `/tvoje-era`.
- `web/src/components/people/StoryDialog.tsx` — opožděný návrat fokusu respektuje novou volbu uživatele.
- `web/scripts/qa-impact.mjs`, `qa-handoffs.mjs` — cílené integrační testy. `qa-checks.mjs` navíc vždy blokuje kontaktní API.
- Specifikace 007/008, izolovaný prototyp `docs/era40-ai/prototypes/008-scene-handoffs/` a tento report.

Claudovy soubory z CDX-001, CDX-002, CDX-003 a jeho aktuální brief CDX-004 nejsou autorstvím této dávky. Necommitovat slepě celý pracovní strom.

## Co je implementováno

**008A:** poslední historický rám předá místo prvnímu portrétu. V jeho pohybu je střih mezi dvěma odlišnými ilustračními situacemi; letopočet se nemění na rok osobního příběhu. Fotografie se rovnoměrně škálují a štítek zůstává čitelný.

**008B:** neinteraktivní pokračování aktuální polohy děliče předá směr první ose dat. Slideru se nemění ruční vlastnictví. Cíl lze přepnout jediným `[data-handoff-axis-target]`; barva se čte z DOM, nikoli z předpokladu ink kapitoly. Kontrakt pro navazující 009 je ve spec 008.

**007:** funkční procházení podle pokračování zkušenosti, příklady propojené s čísly, přímé ovládání porovnání a dokončená otevřená Trasa. Kvíz od Clauda byl nezávisle projit oběma cestami na 1440/390/360; stažená PNG mají 1080 × 1080 a skutečný alfa kanál.

Podklady: nezávisle přečteny 3 PDF (8 stran), 4 PPTX (100 slidů včetně vztahů slidů a poznámek) a DOCX. PDF byly také vykresleny a prohlédnuty, všech 44 unikátních rastrových příloh prezentací prohlédnuto. **Nebyl proveden věrný render všech 100 slidů.** Přesné kopie, extrakce, manifesty a úplný kontext jsou lokálně v `docs/private/codex-2026-11-14/` mimo Git.

## Technická rozhodnutí

- Žádné nové závislosti, piny, přidaná výška stránky, Lenis ani canvas. Scény používají existující setup, `useScene`, matchMedia a presety.
- Geometrie se čte při refreshi / změně médií / resize; průběh není React state. Dekódování obrázků má bezpečný statický fallback.
- Předávky končí na skutečném `scroll-margin-top` kapitoly (64 px). Původní `top top` nechával nativní kotvu u p ≈ .93; nalezeno a opraveno v dev QA.
- Nadpis Příběhů čeká do p .90, aby při svém přirozeném příchodu neprošel fotografickým rámem. Citace přichází v sousedním sloupci .78–1.
- Při nativním dosažení konce se kopie uklidí i během dobíhání scrub. Reduced motion a úzké / krátké okno zůstávají v přirozeném toku.
- Rychlé přepnutí filtrů očekávaně odmítá `ViewTransition.ready` s AbortError; zachycuje se pouze tato očekávaná situace. Ostatní chyby nejsou potlačené.
- Mobilní panel původně roztahovala kombinace min-height a aspect-ratio. Opraveno přes minmax(0, …), min-width:0 a přirozenou výšku fotografie. Cílený test měří i vnitřní ořez, který document.scrollWidth sám neodhalil.
- V regresi nalezen závod dvojitého rAF při navracení fokusu z dialogu. Guard respektuje novou volbu; finální regrese znovu prošla.

## Testy a výsledky

Server `http://127.0.0.1:3000`, produkční build s `NEXT_PUBLIC_ERA_QA=1`. Přesnou revizi zdrojů obsahuje uvedený manifest. Během čisté matice neběžel build ani restart. Následná drobná oprava dialogového fokusu a zobecnění atributu cíle byly znovu sestaveny a prošly cílenou regresí; jejich vizuální chování odpovídá původní matici.

| Příkaz / kontrola | Exit | Výsledek |
|---|---:|---|
| `npm run lint` | 0 | finální zdroje |
| `npm run typecheck` | 0 | finální zdroje |
| `NEXT_PUBLIC_ERA_QA=1 npm run build` | 0 | 22 stránek |
| `qa-impact.mjs` | 0 | 1440/390/360; 5 voleb, ruční slider, kombinované filtry, Back, reset, žádné chyby nebo axe violations |
| `qa-handoffs.mjs` na :3040 a :3000 | 0 | p 0/.25/.5/.75/.99/1, reverse, rychlý odchod, uniform scale, WebGL uvolnění, resize, live reduced + návrat, kotvy a Back |
| `qa-viewports.mjs` | 0 | všech 8 šířek, normálně i reduced; vpřed/zpět/rychle, 0 konzolových errors, 0 JS errors, 0 přetečení |
| `qa-checks.mjs` | 0 | finální regrese 15/15, axe bez porušení; před guardem fokusu jeden race nalezen a opraven |
| `qa-interactions.mjs` (kopie s blokací API) | 0 | finální regrese 13/13 včetně videa, pinů, mobilního swipe, dialogu a fallbacku bez WebGL |
| Nativní kotvy na 1024/1280/1920 | 0 | oba cíle v odstupu ≈64 px, překryvy neaktivní |
| Prototyp 008, 8 šířek + OS a ruční reduced | 0 | žádné JS errors, přetečení ani axe violations; přerušení přehrávače funguje |
| `git diff --check`, JS/Python syntax prototypu | 0 | Python ověřen kompilací v paměti, bez zápisu do systémové cache |
| WebGL / nedostupné médium | 0 | skutečné WebGL dostupné a viditelné při pohybu, právě 1 WebGL canvas; při abortu zdroje původní obsah viditelný, překryv vypnutý, 0 JS errors |
| Awwwards `shoot.mjs` | 0 | kontakt-safe kopie, lokální axe; desktop 60 fps / CLS .003, simulovaný telefon 60 fps / LCP 692 ms / CLS .002 |

První starší QA matice se překryla s buildem a hlásila chyby assetů; **není** používána jako důkaz. Čistý výsledek je výhradně `viewports-accepted/report.json`.

## Screenshoty

Základ: `/private/tmp/era40-main-20261114/`.

- `handoffs-final/` — finální produkční fáze a návrat; `report.json`.
- `viewports-accepted/` — 8 × normální / reduced × vpřed / zpět / rychle.
- `impact-accepted/` — ovládání a opravené mobilní panely; `checks-final/`, `interactions/` — regrese.
- `prototype008/` — oba izolované koncepty; `quiz-review/` — nezávislá kontrola kvízu a PNG.
- `accepted-contact-sheet.jpg` — skutečně prohlédnutá montáž; hlavní 1440 × 900 a 390 × 844 snímky prohlédnuty také samostatně. Všech 15 výkonových screenshotů je skutečně prohlédnuto v `performance/all-frames.jpg`.

## Známé nedostatky

- Výkon je změřen headless na software GPU, telefon při 4× CPU a slow 4G. Skutečný telefon, Safari a fyzická GPU nebyly otestovány; emulace je nenahrazuje. Report označil tři zrušená stahování MP4 při změnách kontextu/pohybu (ERR_ABORTED), žádnou chybu JS. Reduced motion má 0 skrytých textů a žádný pohyb. Heuristika skip-link v Awwwards skriptu český text nepoznala; skutečný první fokus je „Přeskočit na obsah“ a cílený test prošel.
- Zůstává starší **warning** DrawSVG v hero (`data-trail` / non-scaling-stroke), již odložený z CDX-001. Není to nový JS error a hero se v této dávce nepředělává.
- 009 ještě není implementována touto session. Sjednocení fotopopisků plánuje Claude v navazující dávce B.
- Obsah je stále modelový. CMS, analytika, kalendář, partneři, finální ilustrované avatary a externí kontaktní integrace nejsou touto dávkou dodány.
- Kontaktní API bylo v cílených testech blokované; formulář nebyl odeslán a `web/data/` se nečetlo ani neměnilo. Interní zdroje zůstávají mimo Git.

## Doporučený další krok

**Soubory uvolněny.** Claude nyní může provést finální review dle orchestrace §2 a po přijetí commitnout přesné soubory této dávky. :3000 běží na posledním sestavení (PID 43219 při předání), :3071 slouží samostatným prototypům. Žádný další build ani QA této desktop session neběží. Navazující 009 má převzít obsah 007 a atributové rozhraní 008B. Archiv má čtyři oddělené vodorovně posuvné skupiny; případné sloučení do menšího počtu řádků je následný návrh úklidu B.
