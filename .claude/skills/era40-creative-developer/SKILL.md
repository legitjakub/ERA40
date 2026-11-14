---
name: era40-creative-developer
description: Implement an APPROVED ERA40 motion specification inside the existing Next.js 16 + GSAP 3.15 + Lenis architecture. Use only after Jakub approved a spec from era40-motion-director (or explicitly asked for a specific change). Builds modular, cleaned-up, reduced-motion-aware scenes without new dependencies unless approved.
---

# ERA40 Creative Developer

You implement exactly the approved scope. If the spec is missing or unapproved, stop and route to `era40-motion-director`.

## Before coding
1. Read the spec, `docs/era40-ai/PROJECT_ARCHITECTURE.md` §4 and §8, `technical/gsap.md`, `technical/scrolltrigger.md`, and the target component.
2. Check `web/docs/CLAUDE-COORDINATION.md`. Do not edit files Codex owns, and claim yours there.
3. Next 16 differs from training data: read `web/node_modules/next/dist/docs/` for anything route-related. Under `cacheComponents`, `params`-dependent content goes inside `<Suspense>` and route handlers export no `runtime`.
4. Load skills as needed: `gsap-react`, `gsap-scrolltrigger`, `gsap-performance`, `gsap-nextjs` (lifecycle), `animaxxing` (recipes; adapt them to `useScene`, never the full treatment), `animaxxing-webgl` (only for approved WebGL).

## Implementation rules
- Import from `@/lib/gsap/setup`; scenes in `useScene(fn, { scope, dependencies: [reduced] })`; `gsap.matchMedia()` for breakpoints; return cleanup (`mm.revert()`, `split.revert()`, listeners).
- Reduced motion: read `usePrefersReducedMotion()` (OS + in-menu toggle) and render the settled end state with no movement.
- Compose presets from `lib/gsap/presets.ts`. New eases or durations become tokens in presets and `styles/tokens.css`, never inline magic numbers.
- Animate transform/opacity/clip-path only. No React state per frame. Use `quickTo` / `quickSetter` / refs.
- Do not animate the pinned element itself; create triggers top to bottom; no transform or will-change on pin ancestors.
- Text: split after `document.fonts.ready`, `mask: "lines"`; never animate width or weight on wrapping text without reserved width; display line-height ≥ 1.0 with diacritics.
- CSS Modules: every selector contains a local class.
- WebGL: one shared canvas, pause off-screen, dispose on unmount, DOM image stays the content.
- Keep `data-section`, chapter IDs, deep links, the visible "modelový příběh" / "ilustrační" labels.
- Never touch `web/data/`; never submit the contact form in tests.

## Done means
`npm run typecheck && npm run lint && npm run build` pass, then hand to `era40-visual-qa`. Do not restart :3000 if Codex is building; restart by PID (`lsof -tiTCP:3000 -sTCP:LISTEN`), never `pkill -f`. Do not push or deploy.
