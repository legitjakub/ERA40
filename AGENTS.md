# ERA40 — pracovní kontext pro Codex

Tento projekt je filmová digitální výstava ke 40 letům evropského programu Erasmus (1987–2027), Česko se připojilo v roce 1998. Aplikace je ve `web/`. Před úpravami přečti `web/AGENTS.md` a závazný `web/docs/DESIGN.md`.

## Co Jakub chce

Úvod a základní směr se mu líbí. Chce další řemeslné zlepšování, čistší a modernější provedení, ne restart. Nelíbila se mu dodatečná odjezdová tabule přes film ani první generická podoba podstránek. Tabule je odstraněna. Podstránky se mají vizuálně propojit s homepage. Web zahrnuje také získávání kontaktů a příběhů přes `/zapojte-se`.

Reference a jejich význam: `docs/04-top-10-references.md`, `web/docs/REFERENCE-NOTES.md` a `web/MOTION-REFERENCE-ANALYSIS.md`. Getty Tracing Art = orientace a redakční rytmus; Persepolis = filmový vstup a kapitoly; Inkwell = návaznost scén; Paper Planes = propojení lidí a míst. Přebírej principy a řemeslo, ne cizí vizuální identitu.

## Skilly používané pro tento typ práce

Pro filmové/immersive weby nejprve načti `~/.Codex/skills/cinematic-websites/SKILL.md`. Podle konkrétní úpravy použij nainstalované `awwwards`, `frontend-design`, oficiální `gsap-scrolltrigger`, `gsap-react`, `gsap-performance`, `react-best-practices` a `web-design-guidelines`. Výběr, zdroje a použití jsou v `web/docs/CREATIVE-SKILLS.md`.

Skilly pomáhají provedení. Nemění schválený brief ani identitu: Erasmus+ modrá, žlutá střídmě, lokální Roboto Flex, motiv Trasa, české texty a označené modelové příběhy. Nepřidávej efekty jen proto, že je skill umí.

## Koordinace a ověřování

- Aktuální rozdělení práce je v `web/docs/Codex-COORDINATION.md`. Při souběhu s Codexem nepřepisuj jeho přidělené soubory a nespouštěj souběžný build/restart.
- Dev náhled je obvykle `http://127.0.0.1:3040`. Port 3000 je produkční sestava a bez buildu/restartu nemusí odpovídat zdrojům.
- Před předáním: build, lint, typecheck a prohlížečový průchod změněného chování. Podívej se na skutečné screenshoty při 1440 × 900 i 390 × 844. Ověř omezený pohyb a klávesnici.
- Jedna instance Lenisu, GSAP z `src/lib/gsap/setup.ts`, scény přes `useScene`. Zachovej osm kapitol, kotvy a přímé odkazy.
- `web/data/` obsahuje osobní údaje. Nic z něj necommituj ani nemaž. Při QA používej oddělené testovací úložiště nebo mock.
- Lokální ukládání kontaktů není CRM ani rozesílka. Neprezentuj neimplementované externí služby jako funkční.
- Bez nového pokynu nepublikuj, nenasazuj ani nepushuj projekt.


## Fáze 11 — platný postup od 14. 11. 2026

Při počátečním studiu, auditu a nastavování neměň produkční komponenty ani runtime závislosti. Vstupní bod: `docs/era40-ai/README.md`; ověřovací dodatek Codexu: `docs/era40-ai/SETUP-VERIFICATION.md`. Projektové skilly jsou sdílené: Claude je načítá z `.claude/skills`, Codex z `.agents/skills` (odkazy na stejné soubory).

Nová významná animace jde přes skutečně prohlédnutou referenci → technický rozbor → původní ERA40 choreografii → izolovaný prototyp → vizuální revizi → výslovné schválení konkrétní specifikace → úpravu existujícího webu → prohlížečové QA → poučení. Schválení prototypu není schválení produkční integrace. Instalovaný skill ani přečtený tutoriál nejsou důkazem zvládnutého a ověřeného 3D efektu.

Číslo 40 a „navždy“ smějí podporovat příběh. Dosavadní odmítnutí dekorativního ∞ není zákaz nového smysluplného konceptu navždy; významná změna motivu ale vyžaduje nový schválený návrh. Odkaz na koordinaci: `web/docs/CLAUDE-COORDINATION.md` (alias `Codex-COORDINATION.md`).
