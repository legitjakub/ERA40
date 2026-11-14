# Koordinace Claude ↔ Codex — 13. 11. 2026

## Moje část (hotovo, ověřeno na dev :3040)

Soubory, které v této části měním:

- `src/components/pages/PageIntro.tsx` + `.module.css`. Úvod podstránek v jazyce hero homepage: fotografie pod ink závojem (`image` prop) nebo modrá plocha, bílé zúžené písmo, žlutá Trasa na spodní hraně, CSS animace (opona, usazení fotky, nástup titulku). Při omezeném pohybu je statický.
- `src/components/archive/StoryArchive.tsx` + `.module.css`:
  - Panel filtrů už není sticky. Pod skrytou hlavičkou se vznášel a obsah nad ním prosvítal.
  - Rejstřík má místo náhledu u kurzoru pevný fotografický panel vpravo. Reaguje na hover i na fokus klávesnicí a dřív zakrýval trasu a rok.
  - Hover efekty jsou jen pro `(hover: hover)`, na dotyku se zasekávaly.
  - Na mobilu je jeden posuvný řádek na skupinu filtrů.
- `src/app/pribehy/page.tsx`: modrý úvod s kontaktním pásem osmi fotek příběhů jako rychlá navigace.
- `src/app/pribehy/[id]/page.tsx` + `story.module.css`: počítadlo `03 / 08`, gradient na horní hraně fotky kvůli čitelnosti průhledné hlavičky.
- `src/app/zapojte-se/page.tsx` + `join.module.css`: fotografický úvod (cestovní deník), formulář na ploše `--c-sky`.
- `src/app/o-projektu/page.tsx`, `src/components/pages/Prose.module.css`: fotografický úvod (plakát filmu), odsazení obsahu.

Ověření po posledních úpravách:
- typecheck a lint bez chyb a varování,
- axe WCAG 2.2 AA pro `/pribehy`, `/pribehy/lipsko`, `/zapojte-se#pribeh` a `/zapojte-se#organizace` při 1440 i 390 px bez porušení,
- vizuální kontrola při 1440 × 900 a 390 × 844 bez vodorovného přetoku.

## Změny v souborech, které teď vlastní Codex (udělané před koordinační zprávou)

Od příchodu zprávy jsem do nich nesahal:

- `src/components/layout/SiteNav.tsx` + `.module.css`:
  - `darkHeroPages` / `darkTop`: průhledná hlavička nad tmavým úvodem podstránek, `data-other` jen pro dokumentové stránky,
  - tlačítko „Zapojte se“ a odkazy na podstránky v menu Kapitoly,
  - na mobilu je počítadlo kapitol skryté.
- `src/components/hero/Hero.tsx`:
  - odjezdová tabule odstraněna (soubory `DepartureBoard.*` smazané),
  - připojené `FilmCaptions`,
  - rok `2027` nabíhá z 1987 (s úklidem v cleanup),
  - ikona play/pause je v `aria-hidden` spanu. Axe hlásil label-in-name, protože po opravě race ukazovala „Ⅱ“.
- `src/components/hero/FilmCaptions.tsx` + `.module.css`: nový prvek. Titulky podle střihu v `HERO-VIDEO-SHOTLIST.md` a linka postupu. Ví o tom, že rAF volá `setProgress` každý frame (to řešíš ty).
- `src/components/join/JoinForm.tsx`:
  - hash `#pribeh` / `#organizace` resetuje stav „odesláno“,
  - po odeslání se fokus přesune na výsledek se `scroll-margin`,
  - chybové hlášky jsou mimo `<label>`.
- `src/components/join/JoinForm.module.css`: řádky cest na sky ploše, aktivní cesta modrá se žlutou hranou, `.done` má `scroll-margin-top`.
- `src/app/globals.css`: přidaná utilita `.visually-hidden`.
- `scripts/qa-interactions.mjs`: test „Local story download“ nahrazen testem odkazu závěrečného CTA na `/zapojte-se#pribeh`.

## Build, server a data

- Před koordinační zprávou jsem několikrát spustil `next build`, naposledy kolem 21:08. Od té doby jsem build nespouštěl.
- Proces na :3000 jsem spustil já (`npm run start`) ještě před posledními buildy. Odpovídá 200, ale neobsahuje změny z této části. Restart a finální build nechávám na tobě.
- `data/kontakty.ndjson` obsahuje 2 testovací záznamy z mého Playwright testu z 21:06–21:07 (`QA test 1440`, `QA test 390`, doména `example.test`). Podle pokynu jsem je nesmazal. Doporučuji je odstranit před skutečným sběrem.
- Test `Desktop pin order` v `qa-interactions` vyžaduje build s `NEXT_PUBLIC_ERA_QA=1`. To platilo už dřív.
- Nic jsem necommitoval, nepushoval ani nenasadil. Repozitář nemá remote ani commit.


## Integrace Codexu po review

Převzal jsem dokončené podstránky a prošel skutečný stav i všech pět nálezů z `CLAUDE-REVIEW.md`. Hlavička používá odkaz Archiv; filtry a pohled v archivu jsou v URL; Lenis se po odchodu z homepage zcela uklidí; kotvy nepřipnutých sekcí respektují scroll-margin; mobilní menu ukazuje kapitolu a má odpovídající přístupný název.

Dále: filmové titulky bez React renderu na každý frame, společný transport posunu v `src/lib/motion/scroll.ts`, povinná pole a stavy formuláře, oddělení dat jeho větví, validace roku, 400 pro neplatný tvar JSON. Kontakty ponechány beze změny. Root `CLAUDE.md` a `CREATIVE-SKILLS.md` směrují další práci na nainstalované skilly.

Finální produkční sestavu a restart portu 3000 zajišťuje Codex. Při QA nepouštět souběžný build.

## Claude: nové kolo „40 → ∞“ (Jakubem schválený plán, 13. 11. 2026)

Plán je v `~/.claude/plans/nevidim-tam-ale-nejaky-happy-grove.md`.

Přebírám tyto soubory:
- `src/components/hero/Hero.tsx` + `Hero.module.css` (filmový vstup „40“, bez `FilmCaptions`),
- `src/components/people/PeopleIntro.tsx` + `.module.css` (vložení ∞),
- nové `src/components/anniversary/*`,
- `src/lib/gsap/setup.ts` (jen lazy MorphSVG),
- `src/components/future/Future.*` (malá ∞ smyčka v závěrečné Trasě),
- `SiteFooter` (řádek 40 let),
- globální `[data-roll]` hover a `.media-label` v `globals.css`.

Nesahám na `SiteNav`, `SmoothScroll`, `FilmCaptions`, `JoinForm`. Build ani restart :3000 nespouštím. Ověřuji na dev :3040.

### Hotovo: „40 → ∞“ (Claude, ověřeno na dev :3040)

- **Hero:** vstupní vrstva „40“ (SVG maska, film hraje v číslicích). Desktop: pin 2,5 vh, průlet nulou se středem počítaným z metrik písma, potom stávající zmenšení do rámu. Touch: krátké intro ≤ 2,2 s, přeskočitelné. Reduced motion: vrstva se nevykreslí.
- **Prolog:** nová komponenta `src/components/anniversary/InfinityRoute.tsx` (+ `lemniscate.ts`).
  - Bílé „4“ a žlutá „0“ se rozvinou v lemniskátu, kamera se nakloní a 8 fotek příběhů jede po smyčce.
  - Desktop: pin 2 vh, `refreshPriority` 2.5. Klid: GSAP ticker, jen při viditelnosti (IntersectionObserver).
  - Pod scénou je viditelný rejstřík měst s tlačítky (klávesnice), karty jsou `aria-hidden`.
- **Ostatní:**
  - `globals.css`: `.roll` a `.arrow` hover pro primární CTA (hero, závěr). Navrhuji stejné třídy použít i v `SiteNav` a `JoinForm`.
  - Závěrečná Trasa má malou ∞ ozvěnu.
  - Patička: „40 let Erasmu, 1987–2027. Česko je u toho od roku 1998.“
  - Popisky „Ilustrační snímek“ u příběhů a mapy jsou bez tmavého boxu.
- **DESIGN.md:** koncepční karta „40 → ∞“ a výjimka z pravidla o smyčkách.
- **Ověření:**
  - typecheck a lint čisté,
  - `qa-checks` 15/15 na :3040,
  - průchod 1440 a 390 bez chyb konzole,
  - reduced motion: statický stav ověřen.
- **Pro tebe:**
  - `qa-interactions` „Desktop pin order“ počítá s novým pinem v prologu a delším pinem hero, při finálním QA zkontrolovat.
  - Build a restart :3000 jsou na tobě. Jakub teď změny vidí jen na :3040.

## ŽÁDOST PRO CODEX: build a restart :3000 (Jakub schválil 13. 11. 2026)

Jakub chce vidět „40 → ∞“ i na `http://127.0.0.1:3000`. Prosím:

1. Dokonči rozpracované změny v SiteNav, SmoothScroll a FilmCaptions, nebo je ponech v konzistentním stavu.
2. Spusť `npm run build` a restartuj produkční server na :3000.
3. Při QA zkontroluj `qa-interactions` „Desktop pin order“. Přibyl pin v prologu (`refreshPriority` 2.5) a pin hero je delší (2,5 vh).
4. Výsledek zapiš sem.

Já do té doby nic nebuilduji ani nerestartuji.

**Aktualizace:** Jakub dal Claudovi povolení. Build a restart :3000 provedl Claude: typecheck a lint jsou čisté, `next build` prošel (21 stránek) a :3000 vrací 200 s „40 → ∞“. Codex může build zopakovat po dokončení svých změn.

## Claude: hravé spodní sekce a podstránky (Jakub zadal 13. 11. 2026, večer)

Koncept: **jízdenka a vlak**.

Přebírám tyto soubory:
- `src/components/people/PeopleStories.*` (příběhy jako jízdenky, kratší rail),
- `src/components/map/EuropeMap.*` (vlaky jedoucí po trasách),
- `src/components/numbers/Numbers.*` (jednotkový graf 1 čtvereček = 1 000 lidí),
- `src/components/future/Future.*` (jízdenka, která se sama vypisuje),
- `src/components/then-now/ThenNow.*` (roky na děliči),
- `src/components/archive/*` (jízdenky v archivu).

Nesahám na `SiteNav`, `SmoothScroll`, `FilmCaptions`, `JoinForm`.

### Hotovo: hravé spodní sekce a podstránky „jízdenka a vlak“ (Claude)

- **Příběhy:** díly railu jsou jízdenky (Odkud/Kam, cestující, rok, útržek s fotkou, perforace). Rail je užší (64vw) a pin kratší (0,85 × distance). Jízdenky se naklánějí podle rychlosti scrollu (`quickTo` rotation). Třída Trasy pod railem je přejmenovaná z `.route` na `.trasa`, protože `.route` používá dialog. Typografie dialogu je vrácená pod `.detailText`.
- **Mapa:** po každé trase jede vlak (SVG `animateMotion`), Praha pulzuje. Při omezeném pohybu se nevykreslí.
- **Čísla:** jednotkový graf, 1 čtvereček = 1 000 lidí (412 kusů podle sektorů). Odhalení přes IntersectionObserver + CSS zpoždění. Legenda tvoří tlačítka, která zvýrazní sektor.
- **Tehdy a teď:** dělič ukazuje rok 1998–2027 podle polohy.
- **Závěr:** `FutureTicket`, nevyplněná jízdenka „Vy, Česko → …“. Cíl se střídá, odkaz vede na `/zapojte-se#pribeh`.
- **Archiv:** karty mají jízdenkový útržek a naklánějí se za myší.
- **Detail příběhu:** jízdenka postavy v postranním sloupci.
- **Jízdenka (`components/join/Ticket.module.css`):** velikost měst přes container query, bez ořezu „Ostr…“.
- **Ověření:**
  - typecheck a lint čisté,
  - `qa-checks` 15/15,
  - axe bez porušení na `/`, `/pribehy`, detailu a `/zapojte-se`,
  - průchod 1440 a 390 bez chyb.
- Build a restart :3000 proběhly s Jakubovým povolením a :3000 vrací 200. Kontakty jsou netknuté, formulář neodeslán.

### Vráceno (Claude, na Jakubův pokyn)

Jakub nechtěl kolo „40 → ∞“ ani kolo „jízdenka a vlak“. Obojí je ručně vrácené (gitová historie neexistuje). Konkrétně:
- vstup „40“ v hero,
- `components/anniversary/*` (smazáno),
- roll hover v `globals.css`,
- ∞ v závěru, `FutureTicket` (smazáno), řádek „40 let“ v patičce,
- tiché popisky (tmavé chipy jsou zpět),
- jízdenky v Příbězích, archivu i na detailu,
- vlaky na mapě, jednotkový graf (pruhy jsou zpět), rok na děliči,
- container query v `Ticket.module.css`,
- koncepční karta v `DESIGN.md`.

Ponechané opravy, které nejsou vizuální: přejmenování `.route` na `.trasa` v Trase pod railem, protože `.route` používá dialog, a výpočet skoku při fokusu v railu. Typecheck, lint i `qa-checks` 15/15 prošly a build a restart :3000 jsou hotové.

## Codex — návrh propojených scén, 14. 11. 2026

Na Jakubovu žádost o návrh pohybu jsou nové podklady v `docs/era40-ai/motion/specs/005-connected-scenes-direction.md` a `references/reference-analysis/2026-11-14-chatgpt-motion-synthesis.md`. Izolovaná fotografická předávka Příběhy → Evropa je v `docs/era40-ai/prototypes/005-connected-scenes/`, náhled :3070. Produkční `web/src`, závislosti ani kontaktní data se v tomto kole nemění. :3000 nebyl restartován.

**Stav: návrh, nikoli schválená integrace.** Prototyp není oprávnění předělávat hero, přidat další piny nebo obnovit dříve odmítnuté dekorace. Před produkční prací potřebuje konkrétní integrační specifikaci a Jakubovo výslovné schválení dle Fáze 11.

Upřesnění auditu: `EuropeMap` již používá skutečné `coords.from → coords.to` a obsahuje příchozí Lisabon → Praha; nepřidávat domnělé zpáteční cesty. `ThenNow` má vedený scrollový náběh pouze do první ruční interakce. Desktopový rail je výrazně delší než obecný pin budget, proto jeho případné zkrácení musí zachovat čitelnost osmi příběhů a projít samostatným návrhem.

## Codex — realizace a průběžný main, 14. 11. 2026

**Novější pokyn Jakuba autorizuje realizaci návrhu 005 na homepage i doladění podstránek a průběžný push ověřených dávek do `main`.** Předchozí status „bez schválené integrace“ je tím nahrazen v uvedeném rozsahu. Aktuálně Codex přebírá `people/PeopleStories.*`, `people/StoryDistortion.tsx`, `people/distortion.ts`, `map/EuropeMap.*`, nový koordinátor předávky, homepage a společné české statusy / `PageIntro.*`. Žádný druhý agent teď nemá rozpracované změny v těchto souborech. Build a restarty provádí pouze Codex. Kontaktní data zůstávají mimo práci i Git.

## Claude — dokončení pilotu 005A / spec 006, 14. 11. 2026 (22:40)

Jakub schválil dokončení rozpracované předávky Příběhy → Evropa. Claude přebírá od Codexu: `people/JourneySequence.*`, `people/PeopleStories.tsx`, `people/distortion.ts`, `map/EuropeMap.*`, `app/page.tsx`, build a restart :3000. Rozsah: oprava zbytečného přestavování koordinátoru, úklid ladicích atributů, QA (6 šířek, reduced motion, klávesnice, přímé `#mapa`, návrat), commit. Bez pushu bez Jakubova potvrzení. Codex prosím tyto soubory do dokončení neupravuje.

### Hotovo: pilot 005A / spec 006 (Claude, 14. 11. 2026, 23:10)

Podrobnosti a QA v `docs/era40-ai/motion/specs/006-homepage-integration.md`. Navíc upraven `layout/SmoothScroll.tsx` (dorovnání přímých kotev kapitol po refreshi pinů). Build a restart :3000 hotové, commit lokálně, **bez pushe** do Jakubova potvrzení. Soubory jsou opět volné.
