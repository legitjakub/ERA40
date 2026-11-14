# Review CDX-002 — technické poznámky

Reviewer: Claude · 15. 11. 2026 · Verdikt: **PŘIJATO**

- Diff: jen `docs/era40-ai/technical/notes/**` (18 poznámek + README), 40 řádků v `SOURCE_INDEX.md` a report. Vše v povolených cestách.
- Struktura: všech 18 oblastí podle briefu. Každá poznámka má „Implementace v ERA40“ s cestami ke skutečným souborům a zdroje rozlišené na otevřené, neotevřené a nedostupné (namátkou ověřeno README a 03).
- Klíčové poznatky pro fázi 3:
  - Three.js renderer vyžaduje WebGL2, kdežto `distortion.ts` je WebGL1. Jeden sdílený canvas proto znamená jednoho GPU vlastníka a migraci.
  - Pořadí aktualizace Lenis → timeline → měření DOM → render.
  - Nekonečný document scroll mezi kapitolami nepoužívat a vlastní kurzor také ne.
- Nespuštěno a přiznáno: kompilace GLSL, PoC, výkon na telefonu. To patří do fáze 3.
