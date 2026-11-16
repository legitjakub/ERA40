# CDX-016 — Integrace Living Route: hero → Prolog

Zadal: Claude · Datum: 16. 11. 2026 · Režim: workspace-write · Specifikace: `docs/era40-ai/motion/specs/016-living-route.md` (Revize 1)
Základní commit: `3bb0f41` · Checkout: hlavní `/Users/jakubhrncir/ERA40` · Vlastník buildu a restartu :3000: **Codex (tento běh)** · Dev: :3040 (běží, nerestartovat bez potřeby)

## Kontext

Jakub 16. 11. 2026:
- schválil Creative Blueprint v0.2 (D-024);
- po revizi izolovaného prototypu 016 výslovně schválil **integraci do produkce** odpovědí „Ano, integrovat“.

Prototyp (zrevidovaný, R1–R8 uzavřeny) je vzor chování a vzhledu: `/private/tmp/era40-living-route-prototype-016-2026-11-16/prototype/` (`index.html`, `prototype.css`, `prototype.js`) a `REVIEW-016.md` tamtéž. **Přenášej chování, ne kód 1:1.** Produkce používá React, `useScene`, `src/lib/gsap/setup.ts` a jediný Lenis.

## Cíl

Homepage má novou kompozici hera C2 a předávku 01 → 02 podle spec 016 ve všech režimech: RICH, COMPACT, MOBILE a REDUCED. Ostatní kapitoly se nemění.

## Co přesně vytvořit

1. **Hero C2** (`Hero.tsx`, `Hero.module.css`), spec §3, §11 a DESIGN.md §6 / 01 („Approved direction“):
   - kontext „1987–2027. V Česku od roku 1998.“ se žlutou stanicí;
   - řádek „40 / let Erasmu+“ (`aria-hidden`) a skrytá věta „40 let Erasmu+, 1987–2027, v Česku od roku 1998.“;
   - h1 = claim (dva předem rozdělené řádky, `line-height` 1,04);
   - **vypustit** odstavec `.intro` (copy C1);
   - CTA beze změny;
   - velikosti podle tabulky §11 včetně kompaktu pod 680 px výšky a mobilů 360 / 390 / 430;
   - scrim jen vlevo (~55 %) a pod titulky.
2. **Copy C3 a C4** (Blueprint §9):
   - video `aria-label` „Ilustrační film: cesta, učení a setkávání.“;
   - poster alt desktop „Ilustrační snímek přátel při večerním setkání.“, mobil „Ilustrační snímek tří lidí při rozhovoru venku.“;
   - skrytý popis C4 přes `aria-describedby`: „Film vypráví modelovou cestu od balení kufru přes učení a setkání až k předávání zkušenosti dalším lidem. Ilustrační záběry z fotobanky ukazují výuku, společnou večeři, přátele, odpočinek na trávníku a ukázku postupu v laboratoři. Nejde o doložený příběh konkrétních účastníků Erasmu+.“
3. **FilmCaptions:**
   - odstranit linku postupu (Blueprint U3);
   - titulky viditelné až po prvním `playing`; při chybě a v reduced bez přehrání skryté;
   - texty beze změny.
4. **Choreografie RICH** podle spec §4 až §6 a Revize 1:
   - pin 150 vh;
   - pauza bez seeku v 0,15, obnovení v 0,10 jen po pauze scénou;
   - copy pryč 0 → 0,15 (`inert` od 0,15 s focus hold), ovládání 0,15 → 0,25 (`inert` od 0,25 s focus hold), scrim 0,15 → 0,40;
   - deska i obrys K 0,25 → 0,55, kresba boků a bod 0,55 → 1;
   - dva shodné path: bílý ořezaný `clipPath` podle desky, modrý pod ním;
   - geometrie se měří jen při refreshi;
   - intro ≤ 1,85 s po `document.fonts.ready` (timeout 1 s), při prvním scrollu `progress(1)`.
5. **COMPACT, MOBILE, REDUCED** podle spec §7 až §9:
   - na mobilu copy odjíždí přirozeně (poučení R1 z prototypu);
   - stanice je v klidu vpravo a linka nad filmem bílá (R3);
   - reduced: IO film nikdy nespustí znovu, změna preference za běhu okamžitě revertuje.
6. **Prolog** (`PeopleIntro.tsx` a `.module.css`):
   - na ≥ 1024 px „trochu jiní.“ na vlastním řádku;
   - S2 Trasa sestupuje v ose `xR` (28 px vlevo od sloupce) a ohne se (r 16) do podtržení;
   - v režimech s Trasou je `<i data-underline>` skrytý;
   - podtržení `bottom −0.075em`;
   - konec S2 = konec dnešního scrubu slov;
   - bod 10 px s prstencem 2 px `--c-eu-blue`;
   - mobil: krátká svislá Trasa končí 12 px nad h2, podtržení zůstává dnešní;
   - text h2 a poznámka ke zdroji beze změny.
7. **Hlavička** (`SiteNav.tsx` a `.module.css`):
   - výroční lockup „40“ je skrytý, dokud je hero v obraze (homepage), pak se vrací; na podstránkách beze změny;
   - stav barvy a pozadí se řídí **polohou** hera, ne pin timeline (R4);
   - během pinu nad bílým paspartem musí být hlavička čitelná.
8. Aktualizovat existující QA skripty, které testují starý hero (např. `qa-interactions.mjs`, `qa-handoffs.mjs`), jen pokud kvůli změně oprávněně selžou. Změnu uveď v reportu.

## Nejdřív prostuduj

- `AGENTS.md`, `web/AGENTS.md`, `web/docs/DESIGN.md` (§2, §6 / 01 a 02 včetně bloků „Approved direction“), `docs/era40-ai/motion/MOTION.md`
- `docs/era40-ai/motion/specs/016-living-route.md` (závazné), decision-log D-024 a „Poučení z prototypu 016“
- prototyp a `REVIEW-016.md` (cesta výše)
- `src/lib/gsap/setup.ts`, `useScene`, `presets.ts` (`EASE`, `DUR`, `flexAxes`), `components/layout/SmoothScroll*` (jediný Lenis)

## Smíš měnit (a nic jiného)

- `web/src/components/hero/Hero.tsx`, `Hero.module.css`, `FilmCaptions.tsx`, `FilmCaptions.module.css`
- `web/src/components/people/PeopleIntro.tsx`, `PeopleIntro.module.css`
- `web/src/components/layout/SiteNav.tsx`, `SiteNav.module.css`
- nové soubory v `web/src/components/hero/` (např. geometrie Trasy)
- `web/scripts/qa-*.mjs` (jen nutné úpravy kvůli novému heru) a nový cílený `web/scripts/qa-living-route.mjs`
- report `docs/agent-reports/`

## Nesmíš měnit

- `web/data/**`, `docs/private/**`, `web/docs/DESIGN.md`, `docs/era40-ai/**` (dokumentaci zapisuje Claude)
- ostatní kapitoly (03–08), `PeopleRow`, 008, 014, `SceneHandoffs.tsx`, `JourneySequence.tsx`, podstránky, formulář
- **mimo tento úkol:** S04, S07, copy C6–C11, 404 a chyba (další dávka)
- osm kapitol a kotvy, identita, modelová označení
- žádné nové runtime závislosti, MorphSVG, WebGL ani canvas
- **necommituj a nepushuj.** Commit dělá Claude po verdiktu PŘIJATO.

## Technické požadavky

- GSAP jen z `src/lib/gsap/setup.ts`, scény přes `useScene`, `gsap.matchMedia` pro režimy, jeden Lenis.
- Žádný vlastní rAF ani scroll listener pro animaci, žádné čtení layoutu ve snímku, žádný React state na snímek.
- Existující `invalidateOnRefresh` a `refreshPriority` hera zachovat, aby se nerozbilo měření kotev v `SiteNav` (pin-spacer).
- Prahy RICH: `(min-width:1024px) and (min-height:680px) and (hover:hover) and (pointer:fine)` bez reduced.
- Reduced přes `usePrefersReducedMotion` (OS i přepínač „Omezit pohyb“).
- SSR / bez JS: poster, C2, CTA a Prolog čitelné, titulky skryté. Rezervované boxy, CLS v hero < 0,02.

## Akceptační kritéria (ověřitelná)

- [ ] Při 1440 × 900 vypadá hero v p 0 / 0,25 / 0,46 / 0,55 / 0,70 / 1 jako prototyp (`qa/final/rich-forward-*` v prototypu); Prolog mid/end také.
- [ ] Pauza v 0,15 nemění `currentTime`; ruční pauza není scénou nikdy obnovena; reduced: IO film nespustí.
- [ ] Šev hero / S2 a roh do podtržení ≤ 1 px.
- [ ] Tab nikdy nestojí na neviditelném prvku. CTA s fokusem zůstane viditelné a po odchodu fokusu zmizí ihned.
- [ ] Mobil 360 / 390 / 430: „40“ a claim neodcházejí do masek, titulek ≥ 16 px pod CTA, bez přetečení.
- [ ] COMPACT 1280 × 640 a REDUCED: stanice vpravo, linka nad filmem bílá, hlavička nad Prologem ve stavu Prologu.
- [ ] Přímé kotvy (`/#pribehy-intro`, `/#historie`, …) a návrat z podstránky fungují. Hlavička ukazuje správnou kapitolu.
- [ ] Konzole bez chyb, žádné přetečení, axe bez nových porušení.

## Povinné testy

- `npm run typecheck`, `npm run lint`, `npm run build` a jeden vlastněný restart :3000 (PID z `lsof -tiTCP:3000 -sTCP:LISTEN`)
- `qa-viewports.mjs` (matice §7 normal + reduced), `qa-handoffs.mjs` (:3040), `qa-checks.mjs`, `qa-interactions.mjs`, nový `qa-living-route.mjs` se snímky výše a měřeními
- Pokud sandbox nedovolí prohlížeč nebo port, napiš to přesně do reportu. Prohlížečové QA pak udělá Claude.

## Report

Podle `docs/agent-reports/_TEMPLATE.md`. Přesný seznam změněných souborů, odchylky od spec s důvodem, cesty ke snímkům, co neověřeno (Safari/iOS, telefon, VoiceOver).
