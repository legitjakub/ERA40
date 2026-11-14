# Review CDX-000 — ověření orchestrace

Reviewer: Claude · Datum: 15. 11. 2026 · Verdikt: **PŘIJATO**

## Diff
- Režim read-only: Codex soubory neměnil. Jeho report uložilo CLI přes `--output-last-message`.
- Mezitím přibyly v checkoutu změny jiné Codex session (spec 007, spec 008 a prototyp 008). Nepatří k CDX-000. Toto pozorování potvrzuje nález A.

## Akceptační kritéria
| Kritérium | Stav | Důkaz |
|---|---|---|
| Report má čtyři části | prošlo | `docs/agent-reports/CDX-000-orchestration-check.md` |
| Nálezy s cestou a řádkem | prošlo | nálezy A–G odkazují na soubory a řádky |
| Ověřené odlišeno od domněnek | prošlo | worktree a PoC výslovně „neověřeno“, typecheck s exit kódy |

## Ověření nálezů Claudem

| Nález | Ověřeno | Akce |
|---|---|---|
| F: 5 QA PNG / 3,4 MB, ne 3 / 2,7 MB | ano (`ls`, `du`) | opraveno v `PROJECT_AUDIT.md` |
| F: `docs/PLACEHOLDERS.md` neexistuje | ano, správně `web/docs/PLACEHOLDERS.md` | opraveno |
| F: inventář = disk, ne session | souhlasím | doplněno v `SKILLS_INVENTORY.md` |
| D: QA matice si odporují | ano (skill 6 šířek vs. orchestrace 5) | jednotná matice 8 šířek: `ORCHESTRATION.md` §7, `qa-viewports.mjs`, skill `era40-visual-qa`, `workflows/visual-qa.md` |
| E: runner přepisuje důkazy | ano | `tools/codex-task.sh`: číslování pokusů, diagnostika při selhání |
| A, C: chybí identifikace sessions a snapshot | souhlasím | `ORCHESTRATION.md` §8 (pole přidělení), runner ukládá `logs/<ID>.baseline` |
| B: worktree bez popsaného vstupu a předání | souhlasím | §8: do worktree jen commitnuté vstupy, report uvádí SHA, cestu a commit |
| G: šablony bez příkazu, exit kódu a revize | souhlasím | šablony briefu, reportu a review doplněny |

## Poučení
- Nezávislé read-only review od Codexu našlo skutečné chyby v Claudově auditu. Každý zásadní dokument orchestrace dávat nejdřív Codexu ke kontrole (fáze 3: `TECHNICAL_ARCHITECTURE.md`).
- `npm run typecheck` v read-only sandboxu selže kvůli zápisu `tsbuildinfo`. V read-only briefech používat `npm run typecheck -- --incremental false`.

## Otevřené (z reportu, pro fázi 3)
Tři rizika Three.js: synchronizace kamery, DOM a scrubu; životní cyklus GPU a context loss; druhý canvas proti pravidlu jednoho canvasu (DESIGN §7). Každé má navržený malý PoC. Použít je jako vstup do `TECHNICAL_ARCHITECTURE.md`.
