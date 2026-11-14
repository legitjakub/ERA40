# Workflow: od nápadu k produkci

Každý krok má vlastníka (skill) a výstup. **Do produkčních komponent se nesahá před krokem 4.**

| # | Krok | Skill | Výstup |
|---|---|---|---|
| 0 | Příprava | — | Přečíst CLAUDE.md, `MOTION.md`, relevantní `technical/*`, `decisions/decision-log.md`. Ověřit, že Codex nedrží soubory (`web/docs/CLAUDE-COORDINATION.md`). |
| 1 | Reference / zadání | `era40-reference-analyst` | `references/reference-analysis/<slug>.md` |
| 2 | Specifikace | `era40-motion-director` | `motion/specs/<NNN-slug>.md` (šablona níže) |
| 3 | Prototyp (volitelný) | `era40-creative-developer` | Izolovaný prototyp: samostatný HTML soubor ve scratchpadu nebo route `/lab/<slug>` jen v dev, nikdy v produkčních komponentách |
| 4 | **Schválení** | Jakub | Výslovné „ano“ ke konkrétní specifikaci |
| 5 | Implementace | `era40-creative-developer` | Změna jen ve schváleném rozsahu |
| 6 | QA | `era40-visual-qa` | `qa-viewports.mjs` + `qa-checks.mjs` + axe + prohlédnuté screenshoty |
| 7 | Refinement | `era40-creative-refinement` | Seznam vylepšení, opravené časování |
| 8 | Learn | všechny | Zápis do `decision-log.md`, `motion/*`, skillů |

## Šablona specifikace

```md
# NNN — <název>
Kapitola / komponenta: · Stav: návrh | schváleno | hotovo
Účel (jedno slovo z MOTION.md): · Frekvence: · Reference:
## Koncept (1–2 věty, proč to patří k Erasmu / cestě)
## Stavy
INITIAL / INTRO / AMBIENT / OUTRO / REVERSE / MOBILE / REDUCED
## Choreografie (tabulka: prvek, role, start, délka, pohyb, vztah)
## Technika (nástroj podle preferencí v MOTION.md §6, pluginy, nové závislosti ANO/NE)
## Dotčené soubory
## Přístupnost (klávesnice, čtečka, pauza smyček)
## Výkon (vlastnosti, budget, pauza mimo obraz)
## Riziko a co nevíme (feel-check)
```
