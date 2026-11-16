# CDX-018 — ERA kvíz: zrušit odložené potvrzení odpovědi

Zadal: Claude · 16. 11. 2026 · Režim: Codex desktop (hlavní checkout) · Základ: `e87ab26`
Podklad: tvůj read-only audit `/private/tmp/era40-living-route-prototype-016-2026-11-16/NEXT-PAGES-AUDIT.md`.

## Cíl
`EraQuiz.tsx` (~ř. 94) plánuje 320 ms timeout potvrzení odpovědi, ale neuchovává ho a neruší. Po Zpět, restartu nebo unmountu proto může stará odpověď přeskočit první otázku nového průchodu.

## Co udělat
1. Nejdřív chybu reprodukuj cíleným QA (rychlá odpověď → okamžitě Zpět / restart).
2. Timeout ukládej do refu a ruš ho při Zpět, restartu, změně cesty a unmountu.
3. Zachovej vizuální feedback, timing 320 ms i scoring.

## Smíš měnit
`web/src/components/**/EraQuiz*` a nový `web/scripts/qa-era-quiz.mjs`. Nic jiného.

## Akceptace
- Reprodukce před opravou selže, po opravě projde.
- `typecheck`, `lint`, `build` a restart :3000 (rezervace je tvoje po uvolnění Claudem).
- Kvíz při 1440 a 390, reduced, klávesnice. Konzole bez chyb.

## Report
`docs/agent-reports/CDX-018-era-quiz-timeout.md`. Commit a push až po review podle ORCHESTRATION.md.
