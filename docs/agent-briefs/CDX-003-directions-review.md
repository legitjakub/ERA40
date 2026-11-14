# CDX-003 — Nezávislé review kreativních směrů a spec 009

Zadal: Claude · 15. 11. 2026 · Režim: **read-only** · Základ: `87c81e3`

## Kontext
Claude navrhl tři kreativní směry a autonomně vybral směr A, „Linka, která se vrací a pokračuje“ (`docs/orchestration/CREATIVE_DIRECTIONS.md`). Jakub zároveň chce spodní kapitoly homepage úplně přepracovat (`docs/era40-ai/motion/specs/009-lower-chapters-redesign.md`). Než se podle toho začne stavět, chceme nezávislý pohled implementátora.

## Co udělat (krátce, max. ~60 řádků reportu)
1. **Strategie:** sedí směr A na podklady DZS (lokálně `docs/private/codex-2026-11-14/CONTEXT.md`, necitovat interní detaily)? Co chybí nebo je přestřelené?
2. **Proveditelnost:** u každého prvku směru A (smyčka přes 0 v hero, GPU ribbon, kamera v Historii, rozvětvení v Číslech) odhadni náročnost S/M/L a největší riziko vzhledem ke stávajícímu kódu a tvým poznámkám v `docs/era40-ai/technical/notes/`.
3. **Spec 009:** je zadání realizovatelné bez vymýšlení dat? Konflikty s tvou rozpracovanou dávkou 007/008 (then-now, numbers, future)? Navrhni pořadí kroků.
4. **Verdikt:** souhlas / souhlas s výhradami / nesouhlas. U výhrad konkrétní změnu.

## Nesmíš
Měnit soubory (read-only). Citovat `web/data/**` nebo interní rozpočty a jména.

## Report
Podle `docs/agent-reports/_TEMPLATE.md`. „Změněné soubory: žádné (read-only).“ Typecheck nespouštěj.
