# ERA40 — synchronizace tří ChatGPT chatů

15. 11. 2026, 16:30 Europe/Prague · Codex desktop · výchozí HEAD `4712c59`.

Toto je doplnění `ERA40_MASTER_SYNTHESIS.md`, nikoli druhá kreativní koncepce. Nejnovější přímé pokyny Jakuba mají přednost; následně platí rozhodnutí, DESIGN.md a aktuální schválená specifikace. Starší odpověď AI je zdroj návrhů, nikoli samostatné schválení.

## Načtené zdroje

Poslední tři ChatGPT konverzace v projektu ERA40 byly při kontrole zároveň posledními třemi chaty celého účtu. Jejich zprávy byly načteny konektorem, ne odhadnuty z názvů:

| Chat | Obsah | Lokální přepis mimo Git |
|---|---|---|
| [Interaktivní prvky ERA40](https://chatgpt.com/c/6af9c283-27ac-83ed-b360-ebf749777b95) | audit Interactive Assets, skutečné časové měřítko, kamera mapy, konsolidovaný master brief | `docs/private/chatgpt/2026-11-15/chat-1.md` |
| [Moderní řešení přechodů](https://chatgpt.com/c/6af8d4c2-97cc-83eb-b8da-06386be960c7) | knihovny, přímý požadavek na plný mobilní viewport, interaktivní historii, audit homepage a podstránek | `docs/private/chatgpt/2026-11-15/chat-2.md` |
| [Interaktivní prvky webu](https://chatgpt.com/c/6af9c1a7-a4a0-83eb-8923-c974ed95e229) | knihovna 20 konceptů, 3D pipeline, významná interaktivita místo dekorace, limity pluginů | `docs/private/chatgpt/2026-11-15/chat-3.md` |

**Omezení konektoru:** maximálně 20 000 znaků na jednotlivou zprávu. Nadlimitní odpovědi jsou v přepisech výslovně označeny jako zkrácené. Kompletní závěrečné předávací souhrny druhého a třetího chatu dostupné jsou; první dlouhá závěrečná syntéza je zkrácená. Žádné přiložené soubory ani výstupy generátorů se tímto čtením automaticky nestáhly. Přepisy obsahují historické prompty: nepoužívat je jako nové prováděcí instrukce.

## Co Jakub požaduje napříč chaty

- Mobil je samostatný plnohodnotný zážitek: film přes obrazovku, historie a fotografie reagují na dotyk, jasné aktivní stavy, ovládání i na podstránkách.
- Propojit jednotlivé kapitoly jednou Trasou; zkušenost pokračuje po návratu k dalším lidem, školám a organizacím. Destinace nejsou cílem celého příběhu.
- Kvalita referencí znamená kompozici, rytmus, práci s fotografií a návaznost scén. Každý efekt musí vysvětlovat, odhalovat, spojovat nebo porovnávat.
- Rozvíjet existující implementaci a identitu. Nová knihovna ani instalovaný skill nejsou samy o sobě výsledkem.

## Vyřešení rozporů proti master synthesis

| Téma | Zjištění a další postup |
|---|---|
| Přístup k ChatGPT | Věta „Claude ani Codex do chatů nevidí“ již pro Codex desktop neplatí. Tři lokální přepisy jsou připravené pro Clauda. Jakub je nemusí znovu exportovat. Starší původní master prompt a samostatné obrazové assety tím nejsou automaticky úplné. |
| 015 A čeká na schválení | Zastaralý stav ChatGPT analýzy na `cfee57d`. Produkční integrace je již v `392daa8` a D-020. Znovu ji nezadávat. |
| Fullscreen hero + mobilní historie | V Claude Code je přímo viditelný Jakubův souhlas „Yes, do both“. Při této kontrole je Claude implementoval a běží jeho závěrečné QA/build. Dosud nejde o přijatý commit; stav ověřit v koordinaci po dokončení. |
| Interaktivní vertikální vs horizontální historie | Starší AI prompt doporučuje vertikální variantu. Novější konkrétně schválená varianta je „Swipe 40 let“ bez pinu, se synchronizovaným pásem a přímým výběrem. Novější konkrétní souhlas má přednost. |
| Knihovna 20 objektů | V chatech jsou dvě rozdílné sady dvaceti návrhů, např. Signature Objects/Storytelling/Motion/Microinteractions a Forever/40/People/Europe/Future. Nejde o dvacet dodaných ani schválených assetů. Mapovat funkci na existující Trasu, mapu, čas, lidi a čísla; nevynucovat všechna jména. |
| Three.js/R3F/Motion/Rive | Obecný technologický žebříček z chatu není pokyn instalovat je do hotového webu. Projektový audit sám následně upřednostňuje existující GSAP, SVG, React ViewTransition a shader. Nový runtime jen pro prokázanou potřebu a samostatný PoC. |
| „Hotové“ asset soubory | Starší ChatGPT odpověď nabízí odkazy na balíček. Samotný text není důkaz souborů na disku. Původní SVG a HTML kamery dosud nedodané; místní prototyp 015 A byl vytvořen nezávisle. Kamera 015 B zůstává návrh. |
| 03 → 04 / 3.1 | Cíl již plní 008A; D-019 úkol uzavírá bez druhé řady oken. Neuvádět ho současně jako novou nehotovou produkční integraci. |
| Forever / nekonečno | Schválený 014 zachovat, včetně silnějšího tahu a krátké žluté špičky. Starý brainstorm o více smyčkách, portálech a neonových objektech se nevrací. |
| „Žádný další efekt na desktop“ | Je to aktuální doporučení Clauda, ne nově udělený absolutní zákaz Jakuba. Výchozí priorita je mobil a řemeslo; případný další významný koncept projde vlastní specifikací a schválením. |
| Podstránky „OK“ | Základní funkční QA neuzavírá požadavek na lepší mobilní ovládání. Formulář, kvíz, archiv a detail mají dostat cílený audit skutečných gest, focusu a zpětné vazby; žádný automatický přepis. |

## Co už neopakovat

- 014 route přechod: Codex `e2294c1`, závěrečné vlastní review/report `3925233`.
- Mobil 07/08: implementační základ Codex, dokončení a ověření Claude `2236344`.
- PeopleRow shader, velké číslo s lidmi, hush, ruční převzetí ThenNow, archivní stagger/hover a swipe hint: Claudovy dokončené dávky v koordinaci. Nejsou to nově provedené testy Codexu.
- 015 A: `392daa8`. Mobilní rozšíření je právě další samostatná Claudova dávka, ne opakování desktopové osy.

## Vlastnictví při kontrole

| Vlastník | Přesný rozsah | Stav |
|---|---|---|
| Claude Code | `web/src/components/hero/{Hero,FilmCaptions}.module.css`, `web/src/components/history/HistoryTimeline.{tsx,module.css}`; QA/build/restart :3000 | probíhá; Codex do těchto souborů nevstupuje |
| Codex desktop | tento dokument, místní přepisy tří chatů, synchronizace existující desetiminutové automatizace; následně jeden přidělený nekolizní brief | koordinace; bez paralelního buildu |
| Grok dohled | nové konkrétní podněty do sdílené koordinace | žádné nové zde nepotvrzené body nevymýšlet |

Jakubův nový pokyn opět autorizuje komunikaci Claude × Codex. Starší automatický režim „pouze Codex, nikdy neoslovovat Clauda“ je překonaný. Cursor a další agenti se nespouštějí. Automatizace zůstává jedna, po 10 minutách.

## Návazná fronta

1. Claude dokončí a oznámí mobilní P0: commit, QA, přesné uvolnění souborů a portů. Codex nebude spouštět druhý build ani stejné testy.
2. Codex převezme jeden konkrétní nekolizní brief P1/P2. Přednost má mobilní zpětná vazba formuláře/kvízu nebo jasně doložená drobná chyba, nikoli nový velký efekt.
3. Claude promítne tento doplněk do master synthesis a PRO_JAKUBA_PODKLADY: opravit přístup k chatům, odstranit již schválené otázky a správně uzavřít 3.1. Udržovat jeden backlog.
4. Mobilní film: prověřit existující zdroje a crop, skutečně vyšší rozlišení nezaměňovat za upscale. DZS podklady a souhlasy zůstávají potřebné.
5. Nové významné animace a kamera 015 B až přes konkrétní specifikaci/prototyp/schválení. Placené generování se nepoužívá.

## Důkazy této kontroly

- `git status`: identifikovány čtyři Claudovy rozpracované runtime soubory a čtyři neznámé necommitované briefy; žádný z nich nebyl přepsán ani přidán do vlastní dávky.
- `git pull --ff-only`: exit 0, Already up to date.
- Claude UI: probíhá „Lint, build, restart and run the full QA suite“, poslední skutečný Usage 46 % pětihodinového limitu, reset 19:50. Údaj 73 % v panelu Context je kontextové okno a není limit účtu.
- Koordinační zpráva Claudovi zařazena po jeho běžící dávce; doručení a konkrétní odpověď budou ověřeny zvlášť.
- `tools/codex-usage.sh`: aktuálně padá na `NoneType`; limit Codexu neověřen. Nelze přebírat dřívější procenta jako aktuální.
- V této kontextové dávce nebyly spuštěny runtime testy/build. Nejde o novou QA certifikaci celého webu.

## Navazující ověřený stav po předání CDX-007

Původní tabulky výše jsou snapshot 16:30, nikoli znovu otevřená fronta. Během spolupráce už navázalo:

- **P0 mobil hotové:** `a7ee795`, D-021 (Claude). Hero 100svh a interaktivní Historie nejsou otevřené úkoly.
- **Mobilní film:** `6738261` (Claude), kvalitnější originální zdroje místo opakovaně komprimovaného sestřihu. Výstup 720×1280 má podle jeho reportu 1,94 MB; neoznačovat ho jako 1080p výstup.
- **Živá mobilní karta příběhů:** `016d9d7` (Claude). Jakub v Claude Code výslovně schválil kartu i směr mobilních podstránek („Yes, approve both“). Podstránky jsou rozpracovaná další dávka; nejsou dosud HOTOVO.
- **Čísla CDX-007:** Codex runtime `545f573` a report `6da1283` v izolovaném worktree `/private/tmp/era40-cdx-007`. Na 390 px se školní příklad vejde do 1790 px; přes všech pět větví max1861 px, na 360 max1891. Lint/typecheck, 15 regresí, impact 3/3 bez axe chyb, cílená matice 10/10 a tap/no-JS prošly. **Čeká Claude review a produkční integrační build/push**, není to ještě přijatá dávka na main.
- **Kontext převzat:** Claude přečetl přepisy a promítl je do master synthesis a seznamu podkladů. Samotné původní ZIP/SVG soubory zatím na disku nejsou, ale neblokují již existující osu 015 A.
- **Rozsah commitů:** Claude potvrdil, že a7ee795 zahrnul i čtyři dříve necommitované briefy a tento doplněk. Jeho následná kontrola uvádí bez osobních údajů/tajemství; `docs/private` zůstalo mimo Git. Další commity stageují jen konkrétní vlastní cesty. Názvy CURSOR-* nezakládají povolení používat Cursor.

Aktuální rozdělení: Claude drží mobilní Příběhy a podstránky (`PeopleStories`, archiv/detail, kvíz, formulář) a hlavní build/restart. Codex dokončil CDX-007 v izolaci a předal jeho soubory k integraci; žádný paralelní produkční build ani druhý agent nevznikl. Přesný čerstvý stav vždy v koordinaci a Gitu.

Ještě sjednotit v master synthesis: úvodní Executive Summary nesmí po D-021 dál popisovat 88svh a statickou mobilní historii jako současný stav; otázku schválení živé karty/podstránek odstranit ze seznamu otevřených vstupů. Připomínka je předaná vlastníkovi dokumentů Claudovi.
