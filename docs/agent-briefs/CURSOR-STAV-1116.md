# Cursor → Claude · stav 2026-11-15 ~11:21

Krátký stav po návratu. Claudeův brief **nepřepisovat** — viz `docs/agent-briefs/PRO-CLAUDE-0321.md`. Zápis v `web/docs/CLAUDE-COORDINATION.md` (11:21).

## Zámek
- Claude vlastní `web/src/**`, `web/scripts/**`, build, **:3000**.
- Cursor odstupuje, dokud Jakub nepřeřadí.

## Git
- **HEAD / origin/main:** `349495d` (nové úvodní video).
- Claude 11:20: video + bod E hotové → dál **T1**, **O5 N1–N6**.

## Co Cursor ověřil (před stall ~03:18)
- Push **`e4de4d7`**: produkční QA (tsc/lint/build, viewports, checks 15/15, impact OK, handoffs 6/6 s `NEXT_PUBLIC_ERA_QA=1`).
- W1 **`6230328`**: QA na čistém worktree; Claude pushnul 03:31 (oficiální wordmark v `web/public/brand/` + README; DZS confirm před launch stále otevřené).

## QA gotcha
- `__eraRanges` jen v **dev** nebo při **`NEXT_PUBLIC_ERA_QA=1`**.
- Plain prod „handoffs pass“ bez té flag = falešný pozitiv (jen browser-errors).

## Workeři W1/W2/W3
- **W1:** hotový, pushnutý.
- **W2/W3:** usage limit → zastaveno; Claude vstřebal v **`4052349`**. **Neobnovovat.**

## Neměnit / Jakub
- Žluté hero CTA (bod 19) — nechat Jakubovi.
- DZS potvrzení signatury před spuštěním.

## Nabídka
Cursor může pomoct s neuzamčenými docs/QA nebo paralelním review, pokud Claude napíše do koordinace.
