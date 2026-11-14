# ERA40 — pracovní kontext pro Codex

Tento projekt je filmová digitální výstava ke 40 letům evropského programu Erasmus (1987–2027), Česko se připojilo v roce 1998. Aplikace je ve `web/`. Před úpravami přečti `web/AGENTS.md` a závazný `web/docs/DESIGN.md`.

## Co Jakub chce

Úvod a základní směr se mu líbí. Chce další řemeslné zlepšování, čistší a modernější provedení, ne restart. Nelíbila se mu dodatečná odjezdová tabule přes film ani první generická podoba podstránek. Tabule je odstraněna. Podstránky se mají vizuálně propojit s homepage. Web zahrnuje také získávání kontaktů a příběhů přes `/zapojte-se`.

Reference a jejich význam: `docs/04-top-10-references.md`, `web/docs/REFERENCE-NOTES.md` a `web/MOTION-REFERENCE-ANALYSIS.md`. Getty Tracing Art = orientace a redakční rytmus; Persepolis = filmový vstup a kapitoly; Inkwell = návaznost scén; Paper Planes = propojení lidí a míst. Přebírej principy a řemeslo, ne cizí vizuální identitu.

## Nové podklady zadavatele (14. 11. 2026)

Před další prací načti lokální `docs/private/codex-2026-11-14/CONTEXT.md` a `docs/private/2026-11-14-podklady-DZS.md`, pokud jsou přítomné. Obsahují úplné čtení tří PDF, čtyř PPTX a jednoho DOCX. Originály a extrakce jsou v `docs/private/codex-2026-11-14/`; nic z `docs/private/` necommituj. Realizační výtah a další interakce: `docs/era40-ai/motion/specs/007-interactive-impact.md`.

Klíč: zkušenost pokračuje k dalším lidem, školám, organizacím i lidem, kteří nikdy nevyjeli. Web má ukázat tento dopad, nejen destinace a studentský zážitek. Moodboardy jsou směry, nikoli schválená změna identity; neobnovovat odmítnuté dekorace. Pracovní „500 000“, místa akcí a příklady dopadových počtů nepřebírat jako ověřené údaje.

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
- Nenasazuj ani nepublikuj web bez Jakubova pokynu. Push ověřených dávek do `main` je povolený (Jakub 15. 11. 2026: „Yes, allow pushes“), až po review podle `docs/orchestration/ORCHESTRATION.md`. Neověřenou práci nepushuj.


## Fáze 11 — platný postup od 14. 11. 2026

Při počátečním studiu, auditu a nastavování neměň produkční komponenty ani runtime závislosti. Vstupní bod: `docs/era40-ai/README.md`; ověřovací dodatek Codexu: `docs/era40-ai/SETUP-VERIFICATION.md`. Projektové skilly jsou sdílené: Claude je načítá z `.claude/skills`, Codex z `.agents/skills` (odkazy na stejné soubory).

Nová významná animace jde přes skutečně prohlédnutou referenci → technický rozbor → původní ERA40 choreografii → izolovaný prototyp → vizuální revizi → výslovné schválení konkrétní specifikace → úpravu existujícího webu → prohlížečové QA → poučení. Schválení prototypu není schválení produkční integrace. Instalovaný skill ani přečtený tutoriál nejsou důkazem zvládnutého a ověřeného 3D efektu.

Číslo 40 a „navždy“ smějí podporovat příběh. Dosavadní odmítnutí dekorativního ∞ není zákaz nového smysluplného konceptu navždy; významná změna motivu ale vyžaduje nový schválený návrh. Odkaz na koordinaci: `web/docs/CLAUDE-COORDINATION.md` (alias `Codex-COORDINATION.md`).

## Orchestrace Claude × Codex (od 15. 11. 2026)

Claude je kreativní ředitel a orchestrátor, Codex hlavní implementační inženýr. Úkoly přicházejí jako brief z `docs/agent-briefs/` (spuštění `tools/codex-task.sh`). Co dělat:
- měň jen soubory, které brief povoluje,
- vrať report podle `docs/agent-reports/_TEMPLATE.md`: příkazy, exit kódy, testovaná revize, poctivé „nespuštěno / blokováno“,
- měnit schválenou kreativní koncepci nesmíš. Lepší technické řešení navrhni v reportu.

Claudovo review v `docs/qa/` rozhoduje o přijetí. Pravidla souběhu (desktop session × `codex exec` × Claude), worktree a QA matice: `docs/orchestration/ORCHESTRATION.md` §7–8.
