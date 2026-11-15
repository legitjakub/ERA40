# Fronta úkolů pro Codex (stav 15. 11. 2026, 01:10)

Spouští Claude nebo převezme Cursor/Grok podle koordinace. Před každým spuštěním ověř `tools/codex-usage.sh` (< 90 %) a přidělení v `web/docs/CLAUDE-COORDINATION.md` (§8).

| Pořadí | Brief | Režim | Podmínka |
|---|---|---|---|
| 1 | `CDX-006-architecture-review.md` | read-only | po resetu limitu (04:32) |
| 2 | PoC 2: sdílený renderer s distorzí (zadání vyplyne z CDX-006) | worktree | po přijetí CDX-006 |
| 3 | M02 smyčka přes nulu: integrace do hero podle `prototypes/010-hero-loop` | workspace-write | jen po vizuálním přijetí prototypu Claudem a bez kolize s hero |
| 4 | Sjednocení kódu štítků do `MediaLabel` (vzhled beze změny, tmavý chip) | workspace-write | volitelné, nízká priorita |
