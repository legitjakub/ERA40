# CDX-007 · 07 Rozvětvení na mobilu kratší (P2, master synthesis §13 a §16)

**Vlastník:** Codex desktop. **Schváleno:** roadmapa master synthesis P2, jde o rozvržení bez nové animace. **Zadal:** Claude 15. 11. 2026.

## Proč
Na 390 × 844 má kapitola 07 výšku asi **2 600 px** (velké číslo, strom 5 větví, příklad příběhu, 3 sekundární čísla). Je to nejdelší kapitola na mobilu a příklad sektoru odtrhává výběr větve od jeho výsledku.

## Co udělat (jen `web/src/components/numbers/Numbers.tsx` a `Numbers.module.css`, případně `BigCount.module.css`)
1. **Na < 768 px** zobraz příklad vybrané větve **hned pod vybranou větví** (rozbalení, `aria-expanded` na tlačítku větve, `aria-controls` na panelu). Místo samostatného bloku pod celým stromem. Na desktopu beze změny.
2. Sekundární čísla (450 000, 86 %, 103 mil. €) nech ve 2 sloupcích. Zdroje zkrať do jednoho řádku „Zdroj: DZS ↗“ (odkaz ≥ 44 px, plný text v `title`).
3. Cíl: kapitola ≤ 1 900 px na 390 při zachování všech dat a zdrojů.

## Co nedělat
- Žádná nová animace ani pin, scénu 07 (counters, DrawSVG větví, `data-count`) neměnit.
- Neměnit čísla ani `stats.ts`. Nesahat na `Hero*`, `FilmCaptions*`, `HistoryTimeline*` ani `build-hero.sh` (drží Claude).
- **Nedělat build ani restart :3000** (drží Claude). Testovat na dev :3040.

## Hotovo, když
- 360/390/430: přetečení 0, výška 07 ≤ 1 900 px, výběr větve tapem i klávesnicí (Enter/Space) rozbalí příklad pod ní, focus zůstane na tlačítku.
- Reduced: bez animace rozbalení.
- `qa-checks` 15/15 (na :3040 přes `--url`), `qa-impact` 0 chyb (test hledá `#sector-example h3`, zachovat id nebo test upravit), lint a typecheck čisté.
- Report do `docs/agent-reports/CDX-007-mobile-07-compact.md` a zápis HOTOVO do koordinace. Claude potom udělá review, build a push.
