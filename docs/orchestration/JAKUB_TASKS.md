# Jakubovy pokyny — závazný checklist (od 15. 11. 2026)

Každý pokyn od Master Orchestration Promptu dál. Claude ho aktualizuje po každém kroku. Nic se neodškrtne bez důkazu (commit, report, review).

## Způsob práce
- [x] **Autonomně:** „vše co budeš mít na mě si vyhodnoť sám a dělej vše autonomně bez mé asistence“. Claude rozhoduje sám, rozhodnutí zdůvodní a zapíše do decision logu. Kreativní směr vybere Claude.
- [ ] **Koordinovat Codex** (hlavní úkol) a pomáhat mu, ať je práce rychlejší. Běží průběžně.
- [ ] **Do 99 % využití Claude:** pokračovat, dokud se kapacita Claude neblíží limitu. Pak předat stav Codexu (`web/docs/CLAUDE-COORDINATION.md` + brief). Pokud Codex nereaguje, **pushnout hotovou ověřenou práci do `main`**.
- [x] **Kontrolovat Codex každých 5 minut** a koordinovat (session cron, každých 5 min v 00:00–01:55). **Běží do 02:00 15. 11.** („ať běží až do 2 do rána“). V 02:00 závěrečné předání: review, push ověřené práce do main, stav pro Codex, zastavení kontrol.
- [x] **Když Codex dosáhne posledních 10 % využití** (00:54 dosaženo 93 %, Claude převzal práci) (`tools/codex-usage.sh`: limit 5 h nebo týdenní ≥ 90 %): Claude převezme jeho práci, dokončí ji sám a pushne do `main`. Kontroluje se každých 5 minut.
- [x] **Nezapomenout na žádný pokyn:** tento soubor + paměť `era40-jakub-tasks`.

## Úklid
- [ ] **Pročistit šablonu od nesmyslných prvků, „čisté a hezké“.** Zadat Codexu spolu s dalšími úkoly.
  - [x] CDX-001 dávka A: patička, osiřelá linka v prologu, časový kód titulků, tabule na O projektu, QA PNG v `public/` (review PŘIJATO). Varování DrawSVG je v hero, přesunuto do dávky B.
  - [x] Dávka B (Claude po převzetí): filtry archivu na 390 px jako jeden posuvný řádek na skupinu. Sjednocení štítků „Ilustrační snímek“ do tichého stylu **zrušeno**: Jakub tiché popisky v kole „jízdenka“ vrátil a tmavé chipy jsou záměr. Varování DrawSVG v hero ponecháno (jen warning, `preserveAspectRatio="none"` + `non-scaling-stroke`; oprava by měnila schválený hero bez důkazu stejného vzhledu).
  - [ ] Závěrečný průchod celého webu na 8 šířkách: nic samoúčelného, nic vývojářského.

## Spodní sekce homepage
- [x] **Přepracovat spodní sekce hlavní stránky** (hotovo 15. 11., review `docs/qa/009-review.md`) (06 Tehdy a teď, 07 Čísla, 08 Budoucnost): „nelíbí se mi, klidně ať se změní, nemusíme pracovat s tím, co máme, můžeme to úplně přeměnit dle plánu“. Spec 009 je napsaná a brief `CDX-004-lower-chapters.md` je připravený. Spustí se po předání 008, nebo při limitu Codexu udělá práci Claude.

## Master Orchestration Prompt — fáze
- [x] Fáze 0: audit, skilly, ověření Codex CLI, struktura dokumentace, chybějící podklady, začátek rešerše (`d8183aa`).
- [x] **Fáze 1 („Continue Phase 1“)** hotová 15. 11. (`b9c0d89`):
  - [x] Reference library: 28 živě ověřených webů 2025–26 (`REFERENCE_LIBRARY_2026.md`).
  - [x] TOP 10.
  - [x] Motion inspirace a analýza technik (knihovna + technické poznámky).
  - [ ] Referenční poznámky k 18 technickým oblastem: co, kdy, jak, knihovny, implementace, limity, odkaz, licence.
  - [x] `CREATIVE_DIRECTIONS.md`: 3 směry, vybrán A (D-016). Každý má art direction, vizuální princip, barevnost, typografii, motiv nekonečna, hero, průběh sekcí, přechody, storyboard, WebGL koncept a mobil. Doporučení vybere Claude (autonomie).
  - [x] Nezávislé review směrů Codexem (CDX-003, výhrady zapracovány).
- [x] **Fáze 2:** MOTION_BIBLE, EXPERIENCE_DESIGN, COMPONENT_SYSTEM, ASSET_PLAN hotové 15. 11. `EXPERIENCE_DESIGN.md`, `MOTION_BIBLE.md`, `COMPONENT_SYSTEM.md`, `ASSET_PLAN.md`. Motion Bible: název, účel, popis, výchozí a konečný stav, spouštěč, scroll rozsah, easing, kamera, shader/DOM, interakce, reverse, mobil, reduced motion.
- [ ] **Fáze 3:** `TECHNICAL_ARCHITECTURE.md` (Claude) + nezávislé review Codexu + PoC nejrizikovějšího efektu (scroll ↔ kamera ↔ WebGL přechod). Rizika z CDX-000.
- [ ] **Fáze 4:** implementace v malých milnících přes briefy CDX-NNN, každý s review.
- [ ] **Fáze 5:** visual polish.
- [ ] **Fáze 6:** `FINAL_QA_REPORT.md`.
- [ ] Skilly: `era40-webgl-development` a `era40-performance-accessibility` až po PoC. Rozšířit `era40-motion-director` o art direction.
- [ ] Mobil jako samostatný pohybový koncept, žádné hover-only interakce, možnost animaci přeskočit.

## Trvalá pravidla
- Nevymýšlet statistiky, příběhy, ocenění, partnery ani místa. Pracovní návrh není schválené rozhodnutí. Modelová označení zůstávají.
- `web/data/` a `docs/private/` nikdy do Gitu.
- Push ověřených dávek do `main` je povolený: Jakubův pokyn průběžně pushovat ověřené dávky (Codex) + tento pokyn při předání.
