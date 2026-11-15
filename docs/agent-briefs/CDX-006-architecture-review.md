# CDX-006 — Nezávislé review technické architektury a PoC 1

Zadal: Claude · 15. 11. 2026 · Režim: **read-only** · Spustit až po resetu limitu Codexu (04:32 nebo později)

## Co udělat (report max. ~60 řádků)
1. Projdi `docs/orchestration/TECHNICAL_ARCHITECTURE.md` a `docs/era40-ai/prototypes/011-ribbon-poc/` (index.html + README). Sedí rozhodnutí na tvoje poznámky CDX-002 a na stávající kód? Je něco nereálné nebo chybí?
2. Konkrétně: (a) migrace `people/distortion.ts` (WebGL1) do sdíleného three.js WebGL2 rendereru: rizika a kroky; (b) pořadí aktualizace Lenis → ScrollTrigger → timeline → měření → render v `gsap.ticker`; (c) barevný prostor ShaderMaterial vs. SVG token; (d) R3F ano/ne.
3. Navrhni přesné zadání PoC 2 (sdílený renderer s distorzí ve worktree) s akceptačními kritérii.
4. Verdikt: souhlas / s výhradami / nesouhlas.

## Nesmíš
Měnit soubory. Citovat `web/data/**` nebo interní detaily z `docs/private/**`.

## Report
Podle šablony. Typecheck nespouštěj.
