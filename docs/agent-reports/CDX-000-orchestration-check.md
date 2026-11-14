# Report CDX-000

## Změněné soubory

žádné (read-only)

## Co je implementováno

Nic. Kanál funguje: brief byl přijat, soubory jsou čitelné a příkazy lze spouštět v read-only sandboxu. Níže je nezávislé review.

### 1. Prostředí a skutečně dostupné instrukce

**Ověřeno čtením:** `AGENTS.md`, `web/AGENTS.md`, `web/docs/DESIGN.md`, dokumenty v `docs/orchestration/`, konec `web/docs/CLAUDE-COORDINATION.md`, požadované šablony, skript a technické zdroje. Také `docs/era40-ai/README.md` a `SETUP-VERIFICATION.md`.

**Projektové skilly:** `.agents/skills/` obsahuje 15 relativních symlinků do `.claude/skills/`:

- `animate`, `animation-performance`, `animation-vocabulary`;
- `animaxxing`, `animaxxing-webgl`, `choreograph`, `gsap-nextjs`;
- pět `era40-*`;
- `find-animation-opportunities`, `improve-animations`, `review-animations`.

**Ano, `.agents/skills/era40-visual-qa/SKILL.md` je přes symlink čitelný.** Jeho obsah jsem přečetl.

**Uživatelské skilly:** výpis `~/.codex/skills/` potvrzuje sedm `gsap-*`, `awwwards`, `cinematic-websites`, `frontend-design`, `playwright`, `react-best-practices`, `web-design-guidelines` a `.system`. Tento běh navíc dostává katalog z `~/.agents/skills/` a pluginových skillů. Viditelnost v katalogu neznamená přečtení jejich instrukcí. Pro tento audit jsem přečetl `cinematic-websites` a projektový QA skill.

Běh má read-only filesystem, omezenou síť a automatické posuzování eskalací. Žádnou eskalaci ani další agenty jsem nepoužil.

### 2. Review orchestrace a dokumentů

Základ procesu je použitelný: malé briefy, schválené specifikace, nezávislá přejímka a oddělení prototypu od integrace. Před implementačními úkoly doporučuji opravit následující.

**A. Vysoká priorita — chybí identifikace sessions a vynucení souběhu.**

`docs/orchestration/ORCHESTRATION.md:61` označuje obě instance jako „Codex“. Koordinační dokument je dohoda, nikoli technický zámek; `tools/codex-task.sh:19` žádnou rezervaci nekontroluje.

Doplnit pro každé přidělení: ID úkolu a session, vlastníka, checkout/worktree, základní commit, přesné cesty, stav a explicitní předání. Zvlášť rezervovat build, dev server a QA. Během tohoto auditu přibyly necommitované soubory spec 008 — souběžná změna checkoutu je skutečně pozorovaná.

**B. Vysoká priorita — worktree nemá popsaný vstup ani předávku.**

`tools/codex-task.sh:23` pouze přidává `--worktree`. Proces neurčuje, jak dostat do worktree potřebné necommitované změny, jak zaznamenat jeho cestu a základ ani jak předat výsledek k integraci. Aktuálně jsou samotné briefy, orchestrace i spec 007 untracked.

Doplnit kontrolu dostupnosti vstupů v izolovaném checkoutu a do reportu povinně uvádět základní SHA, cestu worktree a commit nebo patch. Konkrétní přenos necommitovaných souborů spravovaným worktree jsem nezkoušel; jde o **neověřenou vlastnost**, na kterou proces nyní spoléhá.

**C. Střední priorita — přejímka nezachytí celý přírůstek změn.**

`docs/orchestration/ORCHESTRATION.md:37` požaduje diff jen souborů z briefu. Tím nelze odhalit změny mimo brief, přestože je vyžaduje zkontrolovat `docs/qa/_TEMPLATE.md:6`. Běžný `git diff` navíc nezahrne untracked soubory.

Před úkolem zaznamenat celý výchozí status, následně porovnat celý přírůstek včetně nových souborů. U sdíleného špinavého checkoutu samotný závěrečný diff neurčí autora změny.

**D. Střední priorita — QA matice si odporují.**

`docs/orchestration/ORCHESTRATION.md:40` a `docs/agent-briefs/_TEMPLATE.md:39` požadují 1440/1920/768/390/360. Projektový skill `.agents/skills/era40-visual-qa/SKILL.md` požaduje 1440/1280/1024/390/375/360.

Nová sada vynechává důležité okolí desktopového breakpointu 1024 px. Použít společnou matici a doplnit zpětný/rychlý scroll, přímé kotvy, návrat z podstránky, chyby konzole, axe a výkon.

**E. Střední priorita — opakované spuštění přepisuje důkazy.**

`tools/codex-task.sh:14–16` odvozuje report a log jen z názvu briefu; `:30` log přesměrováním přepíše. Doplnit ID pokusu nebo odmítnout existující výstup. Při selhání díky `set -e` také chybí závěrečná diagnostika s cestou k zachovanému logu.

**F. Konkrétní faktické chyby.**

- `docs/orchestration/PROJECT_AUDIT.md:51`: uvádí **3 PNG / 2,7 MB**. Na disku je **5 odpovídajících PNG / 3 400 135 bajtů** v `web/public/media/`.
- `docs/orchestration/MISSING_INPUTS.md:10`: odkaz `docs/PLACEHOLDERS.md` neexistuje; správně je `web/docs/PLACEHOLDERS.md`.
- `docs/orchestration/SKILLS_INVENTORY.md:8–11`: inventář není úplným popisem tohoto běhu. Vedle `~/.codex/skills/` jsou zpřístupněné `~/.agents/skills/`, pluginové skilly a širší katalog nástrojů. Oddělit konfiguraci na disku od schopností konkrétní session.

**G. Praktické mezery šablon.**

`docs/agent-briefs/_TEMPLATE.md:25` zakazuje build bez výslovného povolení, ale obecná přejímka jej vyžaduje. Brief by měl jmenovat vlastníka finálního buildu, testovaný server a revizi.

Do `docs/agent-reports/_TEMPLATE.md:11` a `docs/qa/_TEMPLATE.md:8` doplnit přesný příkaz, exit code, testovanou revizi a rozdíl mezi „prošlo“, „blokováno prostředím“ a „nespuštěno“.

Stack uvedený v auditu odpovídá deklaracím `web/package.json:17`. Git potvrzuje `main` sledující `origin/main`, aktuálně o jeden commit napřed. Soukromost repozitáře ani přihlášení jsem v tomto běhu nezávisle neověřoval. Původní Master Orchestration Prompt není součástí zkontrolovaných vstupů; jeho interpretaci v auditu proto nepotvrzuji jako přímý Jakubův výrok.

### 3. Rozpracovaná spec 007 — stav

`git status --short` ukázal tyto změněné produkční soubory:

- `web/src/app/pribehy/[id]/page.tsx`;
- `web/src/components/archive/StoryArchive.{tsx,module.css}`;
- `web/src/components/future/Future.{tsx,module.css}`;
- `web/src/components/layout/SiteNav.tsx`;
- `web/src/components/numbers/Numbers.{tsx,module.css}`;
- `web/src/components/then-now/ThenNow.{tsx,module.css}`.

Nové soubory související se 007:

- `docs/era40-ai/motion/specs/007-interactive-impact.md`;
- `web/scripts/qa-impact.mjs`;
- `web/src/components/archive/StoryImpact.{tsx,module.css}`;
- `web/src/content/story-impact.ts`.

Dále byly změněné `.gitignore`, `AGENTS.md`, `CLAUDE.md`; untracked byly adresáře orchestrace, briefů, reportů, rozhodnutí, QA a nástrojů. Při druhém výpisu přibyly spec 008 a její prototyp. **Status potvrzuje změny, nikoli jejich autora nebo dokončenost.** Rozsah 007 odpovídá přidělení v `web/docs/CLAUDE-COORDINATION.md:197`.

Lint je čistý. Typecheck bez inkrementálního zápisu je čistý; standardní příkaz blokuje sandbox, viz výsledky níže.

### 4. Tři největší technická rizika pro Three.js

**1. Rozjetí kamery, DOM a scrollové choreografie.**

`SmoothScroll.tsx:84–92` propojuje Lenis se ScrollTriggerem a GSAP tickerem. Distorze má samostatný RAF a rychlost odvozuje z `scrollY` (`distortion.ts:69–80`, `:128`). Rail používá vyhlazený scrub `0.55` (`PeopleStories.tsx:104`).

**Riziko:** kamera řízená přímo scrollovým offsetem může předbíhat vyhlazený rail; další renderovací smyčka může číst stav v jiném okamžiku.

**Malý PoC:** jeden fotografický plane synchronizovaný s DOM kartou přes současný rail. Měřit odchylku rohů při pomalém, rychlém a zpětném scrollu, po resize a přímém `#mapa`. Porovnat řízení kamerou z průběhu existující animace s řízením z raw scrollu. Zachovat jeden Lenis a určit pořadí aktualizace/renderu.

**2. Životní cyklus GPU a obnova fallbacku.**

`StoryDistortion.tsx:23–38` asynchronně importuje a montuje efekt podle viditelnosti. Po dokončení importu ověřuje `live` a media query, ale ne aktuální viditelnost. `distortion.ts:134–143` uklízí prostředky, explicitní obsluhu ztráty a obnovy kontextu neobsahuje. `useScene.ts:20–27` uklízí GSAP, nikoli automaticky Three.js prostředky.

**Riziko:** pozdní mount mimo viewport, zbylé listenery/renderování a neobnovený obraz po ztrátě kontextu.

**Malý PoC:** opakovaně přejít homepage → detail → zpět, během načítání opustit sekci, přepnout reduced motion a simulovat ztrátu kontextu. Kontrolovat počet canvasů, ticker callbacků a GPU prostředků; DOM obraz musí zůstat dostupný při každém selhání.

**3. Rozpočet GPU a konflikt druhého canvasu.**

`web/docs/DESIGN.md:205` povoluje jediný sdílený WebGL canvas. Současný efekt už vlastní WebGL1 kontext (`distortion.ts:6`), měří DOM a nastavuje rozměry canvasu při každém aktivním snímku (`:85–100`). DPR omezuje na 1,5 (`:93`).

**Riziko:** prosté přidání Three.js scény vytvoří druhý renderer, zvýší náklady na textury a renderování a poruší současnou architekturu.

**Malý PoC:** izolovaná varianta s jedním rendererem pro distorzi i kamerovou scénu, bez postprocessingu. Porovnat s výchozím stavem frame times, počet draw calls, textury a nečinnost mimo viewport; ověřit DPR 1/1,5 na skutečném telefonu. Rozpočet určit podle výsledků, nikoli desktopové emulace.

## Technická rozhodnutí

- Zachován read-only režim; žádné opravy, buildy, restarty ani instalace.
- Typecheck zopakován s `--incremental false`, aby nevyžadoval zápis cache.
- WebGL rizika jsou závěry ze zdrojového kódu; navržené PoC nebyly realizovány.

## Testy a výsledky

| Test | Výsledek |
|---|---|
| Čtení QA skillu přes symlink | Prošlo |
| `bash -n tools/codex-task.sh` | Prošlo |
| `codex --version` | `0.167.0-alpha.3.2` |
| `codex exec --help` | Uvedené volby jsou podporované |
| `npm run lint` | Prošlo, exit 0 |
| `npm run typecheck` | Exit 2: TS5033, zakázaný zápis `tsconfig.tsbuildinfo` |
| `npm run typecheck -- --incremental false` | Prošlo, exit 0 |
| `git status --short` | Úspěšný výpis; varování kvůli zakázané cache Xcode |
| Build, browser QA, WebGL PoC | Nespuštěno |

## Screenshoty

Žádné. Tento úkol kontroloval dokumenty, kód a stav nástrojů.

## Známé nedostatky

- Checkout se během kontroly měnil; výsledky nejsou certifikací neměnného commitu.
- Funkčnost worktree režimu ani celý wrapper jsem novým agentním během netestoval.
- Obsah `web/data/**` nebyl čten. Interní podrobnosti z `docs/private/**` nejsou součástí reportu.
- Report jsem na disk nezapisoval. Uložení do `docs/agent-reports/CDX-000-orchestration-check.md` zajišťuje volající CLI přes `--output-last-message` (`tools/codex-task.sh:19`).

## Doporučený další krok

Před prvním zapisujícím CDX úkolem doplnit identifikaci sessions, výchozí snapshot, předávku worktree a jednotnou QA matici. Spec 007 převzít až po explicitním předání její desktopové session. Fázi 3 zahájit izolovaným PoC synchronizace DOM a kamery s jedním rendererem.