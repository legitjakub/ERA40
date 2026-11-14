# CDX-000 — Ověření orchestrace a nezávislé review

Zadal: Claude · Datum: 15. 11. 2026 · Režim: **read-only** · Specifikace: Jakubův Master Orchestration Prompt (15. 11. 2026)

## Kontext
Jakub nastavil spolupráci: Claude je kreativní ředitel a orchestrátor, Codex hlavní implementační inženýr. Úkoly dostáváš přes `codex exec` s briefem a vracíš report. Tohle je první, zkušební úkol. Nic neimplementuješ a nic nezapisuješ (sandbox je read-only).

Pozor: v desktop aplikaci Codexu může souběžně běžet jiná tvoje session (spec 007). Její rozpracované soubory jen čti.

## Cíl
Potvrdit, že tenhle kanál funguje, a nezávisle zkontrolovat návrh orchestrace dřív, než podle něj začneme pracovat.

## Co přesně udělat
1. **Prostředí:** napiš, které instrukce a skilly v tomto běhu skutečně vidíš (AGENTS.md, `.agents/skills/*`, uživatelské skilly). Uveď, zda je `.agents/skills/era40-visual-qa/SKILL.md` čitelný přes symlink.
2. **Review dokumentů** v `docs/orchestration/` (ORCHESTRATION.md, PROJECT_AUDIT.md, SKILLS_INVENTORY.md, MISSING_INPUTS.md), skriptu `tools/codex-task.sh` a šablon v `docs/agent-briefs/`, `docs/agent-reports/`, `docs/qa/`:
   - Jsou fakta pravdivá vůči repozitáři? Uveď konkrétní chyby s cestou a řádkem.
   - Co v procesu chybí nebo co je nepraktické z pohledu implementátora?
   - Je pravidlo souběhu (Codex app + `codex exec` + Claude) dostatečné? Navrhni zlepšení.
3. **Rozpracovaná spec 007:** jen stav. Které soubory jsou změněné (`git status`), zda jsou typecheck a lint čisté (spusť `npm run typecheck` a `npm run lint` ve `web/`, pokud to sandbox dovolí). Nic neopravuj.
4. **Riziko pro fázi 3 (WebGL):** podle stávajícího kódu (`web/src/components/people/distortion.ts`, `StoryDistortion.tsx`, `lib/gsap/*`, `layout/SmoothScroll.tsx`) napiš tři největší technická rizika, kdyby se přidávala Three.js scéna synchronizovaná se scrollem. Ke každému uveď, jak ho ověřit malým PoC.

## Nejdřív prostuduj
- `AGENTS.md`, `web/AGENTS.md`, `docs/orchestration/*`, `web/docs/CLAUDE-COORDINATION.md` (konec souboru)

## Smíš měnit
- **nic** (read-only)

## Nesmíš
- číst nebo citovat obsah `web/data/**` (osobní údaje),
- citovat interní podrobnosti z `docs/private/**` (rozpočty, jména). Odkaz na existenci souboru stačí.

## Akceptační kritéria
- [ ] Report má všechny čtyři části.
- [ ] Každý nález má cestu k souboru (a řádek, kde to jde).
- [ ] Odlišuješ ověřené (spuštěno, přečteno) od domněnek.

## Report
Česky, podle `docs/agent-reports/_TEMPLATE.md`. Sekci „Změněné soubory“ vyplň „žádné (read-only)“.
