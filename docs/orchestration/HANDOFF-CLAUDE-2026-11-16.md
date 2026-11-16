# Předání Claude → Codex · 16. 11. 2026 ~21:10

Jakub: „předej info Codexu, kde jsi skončil“. Claude nedrží žádné soubory ani porty. **Vlastníkem dalšího postupu je Codex.**

## Stav repozitáře

- `main` = `origin/main`, HEAD `93ba1e0`.
- Dirty v pracovním stromu jsou jen soubory Codexu z CDX-018:
  - `web/src/components/era/EraQuiz.tsx`;
  - `web/scripts/qa-era-quiz.mjs`;
  - `docs/agent-reports/CDX-018-era-quiz-timeout.md`;
  - `docs/qa/CDX-018-review.md` (Claudův verdikt **PŘIJATO**);
  - zápisy v `web/docs/CLAUDE-COORDINATION.md`.

  → Commitni a pushni je jako CDX-018.
- Porty:
  - :3000 `next start` (PID 83006, build Codexu s opravou kvízu; hero média se servírují přímo z `public/`);
  - :3040 dev (PID 23764);
  - :3075 prototyp 016 (Python, PID 71225; už se nepoužívá, smíš vypnout).

## Hotovo dnes (Claude, vše pushnuto)

| Commit | Obsah | Review |
|---|---|---|
| `2665e08` | Living Route: hero C2, předávka 01 → 02 (spec 016), hlavička | `docs/qa/CDX-016-review.md` |
| `e87ab26` | Blueprint dávka 2: S04, S07, copy C6–C11, 404, `error.tsx` | `docs/qa/LR-B2-blueprint-batch2-review.md` |
| `21b46fd` | Hero film ve vyšší kvalitě (CRF 19, mobil 1080 × 1920) | D-028 |
| `93ba1e0` | Ostřejší mastery (campus-walk 4K, dinner-home 1080p); oprava licencí v katalogu | D-029 |

Rozhodnutí D-024 až D-029 jsou v `docs/era40-ai/decisions/decision-log.md`. Cílené QA: `web/scripts/qa-living-route.mjs` (46 kontrol), `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers`.

## Otevřené body (podle priority)

1. **Blokátor spuštění: licence.** `x-lecture`, `x-dinner-garden`, `x-lab` a `x-meadow` jsou na Mixkitu Restricted (jen osobní použití). Viz `docs/orchestration/MISSING_INPUTS.md`.
   - Možnosti: licencovat, nahradit volnými záběry (Pexels) se stejným významem, nebo vlastní záběry DZS.
   - **Čeká na Jakubovo rozhodnutí, nic nenahrazovat bez něj.**
   - Přegenerování: `FFMPEG=/private/tmp/ffbin/ffmpeg bash web/scripts/build-hero.sh` (~5 min). Surové zdroje jsou v `web/node_modules/.cache/era40-media/` (720p zálohy v `720-backup/`).
2. **Mobilní laboratorní ořez** (gesto předávání mizí): mediální úkol, souvisí s bodem 1.
3. **Další podstránky:** Jakub chce zlepšovat i ostatní podstránky a sekce. Navázat na tvůj audit `/private/tmp/era40-living-route-prototype-016-2026-11-16/NEXT-PAGES-AUDIT.md`: Archiv a ERA kvíz, malé dávky s review.
4. **Před spuštěním (externí):**
   - správce údajů a `<Todo>` v ochraně osobních údajů;
   - `/o-projektu` slibuje čtení redakcí;
   - globální `noindex`;
   - stock fotky S04/S07 jsou náhledy 1600 px.
5. **Neověřeno:** Safari/iOS, skutečný telefon (výkon nového 20MB filmu), VoiceOver.

## Pravidla, která dál platí

- Nenasazovat bez Jakuba.
- Nečíst a necommitovat `web/data/` ani `docs/private/`.
- Žádné placené služby ani další agenti.
- Push jen ověřených dávek po review.
