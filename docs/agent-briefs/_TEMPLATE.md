# CDX-NNN — <název úkolu>

Zadal: Claude · Datum: · Režim: read-only | workspace-write | worktree · Specifikace: `docs/era40-ai/motion/specs/NNN-…md`
Základní commit: `<SHA>` · Checkout: hlavní | worktree `<cesta>` · Vlastník buildu a QA serveru: · Testovaná URL/revize:

## Kontext
Proč úkol existuje. Odkaz na schválenou specifikaci / Jakubův pokyn.

## Cíl
Jedna věta: co má být po úkolu pravda.

## Co přesně vytvořit
1. …

## Nejdřív prostuduj
- `AGENTS.md`, `web/AGENTS.md`, `web/docs/DESIGN.md`, `docs/era40-ai/motion/MOTION.md`
- …

## Smíš měnit (a nic jiného)
- `web/src/…`

## Nesmíš měnit
- `web/data/**`, `docs/private/**`, soubory přidělené jinému agentovi v `web/docs/CLAUDE-COORDINATION.md`
- osm kapitol a jejich kotvy, identita (modrá, žlutá střídmě, Roboto Flex, Trasa), modelová označení
- žádné nové runtime závislosti bez výslovného povolení v tomto briefu
- build/restart :3000: vlastník = ______ (Claude | Codex). Kdo není vlastník, build nespouští.

## Technické požadavky
- GSAP jen z `src/lib/gsap/setup.ts`, scény přes `useScene`, jeden Lenis
- …

## Vizuální požadavky
- …

## Akceptační kritéria (ověřitelná)
- [ ] …

## Povinné testy
- `npm run typecheck` (v read-only: `npm run typecheck -- --incremental false`), `npm run lint`
- prohlížeč podle jednotné QA matice (`docs/orchestration/ORCHESTRATION.md` §7)
- …

## Report
Podle `docs/agent-reports/_TEMPLATE.md`.
