# Fáze 11 — ověření a doplnění Codexem

Datum: 14. 11. 2026. Navazuje na již vytvořenou přípravu Claude Code; neoznačuje ji za nově vytvořenou Codexem. Produkční integrace žádné ze specifikací 001–004 tímto není schválena.

## Audit skutečného stavu

Zkontrolováno: package.json, instrukce obou agentů, DESIGN.md, useScene, SmoothScroll, WebGL distorze, znalostní báze, pět vlastních skillů, registr převzatých skillů, existující QA skript a prototyp 001. Stack je Next 16.4.6 / React 19.3 / TypeScript / CSS Modules / GSAP 3.15.1 / @gsap/react 2.1.2 / Lenis 1.3.27. Three.js, R3F ani OGL v runtime závislostech nejsou. Vlastní WebGL image efekt již existuje; nové knihovny se neinstalovaly.

`ChapterProgress`, `Pathfinder` a `SectionPortal` v inventáři souborů neznamenají, že jsou namontované v aktuální homepage. Zdroj pravdy pro aktivní kompozici je `web/src/app/page.tsx` a `layout.tsx`.

Otevřený nesoulad k budoucímu řešení: DESIGN omezuje pin na 250 vh, ale horizontální Příběhy používají vzdálenost celého osmipanelového railu. To je vlastnost dnešní implementace, nikoli nový doporučený vzor. V další schválené práci změřit skutečný rozsah, ne automaticky přidávat další dlouhý pin. Před opravou vyjasnit dramaturgii této konkrétní sekce.

## Co bylo opraveno v přípravě

- Codex má 15 projektových skillů dostupných v `.agents/skills` jako relativní odkazy na kanonické `.claude/skills`. Bez druhé kopie a bez globálních změn.
- YAML vlastního `era40-visual-qa` byl neplatný kvůli dvojtečce v neuzavřeném popisu. Popis je nyní uvozený a všech 15 hlaviček prošlo parserem YAML.
- Reference analyst již nevyžaduje nástroje dostupné jen v Claude. Použije dokumentované prohlížečové rozhraní aktuálního agenta. Samotný canvas není důkaz WebGL; nevolat getContext na cizím webu jen kvůli detekci.
- Creative developer respektuje aktuální přidělení souborů, nikoli trvalé vlastnictví souborů jedním agentem.
- AGENTS.md a CLAUDE.md obsahují hranici mezi studiem, prototypem, schválením a produkcí. Alias `web/docs/Codex-COORDINATION.md` odkazuje na jedinou sdílenou koordinaci.
- Izolovanému prototypu 001 chyběl standardní mobilní viewport. Bez něj mohl emulovaný telefon zobrazovat zmenšenou desktopovou stránku a falešně projít kontrolou přetékání. Doplněna jen meta viewport v prototypu; žádný produkční komponent se nezměnil.

## Výzkum a jeho skutečné limity

Nově otevřené zdroje: oficiální ScrollTrigger dokumentace, R3F Scaling performance, Playwright Emulation, Lenis README a repozitáře Animaxxing / Emil Kowalski. Zjištění jsou použitelná jako technická vodítka, nikoli důkaz, že byl efekt implementován a odladěn.

Codrops nabídnul při vyhledávání čitelný obsah článků Animating with Agents, Scroll-Revealed WebGL Gallery a SVG Mask Transitions. Přímé otevření všech tří URL ale při této kontrole vrátilo 403. Codex tedy ověřil dostupné výňatky a existující interní rozbory; netvrdí vlastní nové úplné přečtení článků ani živé vizuální ověření jejich dem. Starší záznamy Claude o jeho čtení přes Chrome zůstávají označené jako původní evidence Claude.

Poučení: Animaxxing řeší také životní cyklus, fonty a obnovu efektů; nepřebírat automaticky veškerou animovanost. Emilovy krátké UI odezvy neaplikovat mechanicky na délku scrollového příběhu. U SVG masek hlídat poměr stran a švy; u WebGL DOM synchronizaci, sdílení renderu a dispose. Do ERA40 nepřidávat druhý router ani další smooth-scroll systém z tutoriálu.

Three.js cleanup URL při opětovném otevření vrátila 404. API a disposal postup ověřit před skutečnou 3D implementací. Placený Three.js Journey nebyl přečten. Žádná znalostní mezera se nepřepisuje na „zvládnuto“ pouhou instalací skillu.

## Nástroje podle aktuálního agenta

Codex: lokální shell/soubory, Playwright z projektu a existující Chromium; nástroje computer-use, web a katalog MCP konektorů včetně Context7, Figma a služeb vývoje. Přítomnost nástroje v katalogu není ověření autentizace ani použitelnosti konkrétního účtu. Pro setup se žádné účty ani oprávnění neměnily a další MCP server se neinstaloval. Původní seznam Claude v PROJECT_ARCHITECTURE je inventář jeho session, nikoli společná záruka pro oba agenty.

## Ověřovací rozsah

Izolovaný prototyp 001: Chromium, šířky 1440 / 1280 / 1024 / 390 / 375 / 360, každá normálně a při OS reduced motion. Průchod 0 → 50 → 100 → 50 → 0 %. Kontrola JavaScriptových chyb a horizontálního přetoku. Screenshoty 1440 a 390 jsou vizuálně posouzené.

Harness nevyžaduje CDN: požadavky prototypu na GSAP 3.12.5 přesměroval na lokální GSAP 3.15.1 z projektu. To prokazuje pouze tento testovaný režim; samostatný soubor prototypu nadále uvádí CDN 3.12.5. Před další iterací sjednotit distribuci a vyhnout se síťové závislosti. Screenshoty ani automatický průchod samy nedokazují plynulost, skutečnou nehybnost všech prvků v reduced motion či návaznost všech předávek.

Další přejímka prototypu: ovládání přepínačů, klávesnice, jednotlivé švy kapitol, záznam v pohybu, skutečný telefon a ruční posouzení dramaturgie. Výsledky setupu nejsou souhlas s nasazením.

Před a po práci se porovnávají SHA-256 všech 87 produkčních source/config souborů. Build/restart se v této fázi nespouští, protože produkční kód neměníme. Kontakty ani jejich úložiště se nepoužívají.

## Další krok

Nejdřív Jakubovo posouzení izolovaného prototypu 001 a potvrzení konkrétního rozsahu případné integrace. Ani čtyři sepsané specifikace ani schválení prototypování neznamenají schválení produkce. Vertexové deformace, částicové morfy, GLTF animační mixer a kamera řízená scrollem zatím vyžadují samostatný laboratorní důkaz, měření a SVG/DOM alternativu. Nenavrhují se všechny najednou.

## Výsledek této kontroly

- 15/15 projektových skillů: platná YAML hlavička a funkční lokální odkaz.
- Prototyp: 12/12 kombinací bez JS chyby a vodorovného přetoku po opravě viewportu. Nejde o úplnou vizuální certifikaci.
- Produkční source/config: 0 změn z 87 porovnaných souborů.
- Místní důkazy: `/private/tmp/era40-phase11/prototype-check.json`, `prototype-1440.png`, `prototype-390.png`.
