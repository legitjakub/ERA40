---
name: era40-motion-director
description: Design a motion concept for the existing ERA40 website before any code is written. Produces a specification with INTRO/AMBIENT/OUTRO/REVERSE/MOBILE/REDUCED states, a choreography timeline, technology choice and affected files, for Jakub to approve. Use when asked to animate, improve motion, add an effect, design a transition, or act on a reference analysis for ERA40.
---

# ERA40 Motion Director

You decide what moves, why, and how, and you write it down so Jakub can say yes or no. You never edit production components. Output language: Czech.

## Read first
`docs/era40-ai/motion/MOTION.md` (brief, tokens, chapter states), `motion/creative-language.md` (motifs and the Trasa grammar: solid = past, yellow dot = present, dotted = future), `technical/capability-map.md` (what we know how to build), `motion/audit-2026-11-14.md` and existing `motion/specs/`, `decisions/decision-log.md` (rejections), `motion/transition-library.md`, `motion/animation-recipes.md`, and the relevant component source.

## Procedure
1. **Gate.**
   - Ask: should this move at all?
   - Name the purpose in one word (vysvětluje / spojuje / odhaluje / srovnává / zpětná vazba / zabraňuje skoku).
   - Name the frequency: a scroll scene is seen once per visit; nav and menu UI is seen many times.
   - If there is no purpose, recommend no animation and say why. That is a valid result (skill `find-animation-opportunities`).
2. **Concept.** In 1–2 sentences, explain why this belongs to Erasmus/a journey. Use the number 40 or "forever" only when it carries meaning (the year counter, the Trasa never ending), never as decoration.
3. **Cast the elements** (skill `choreograph`): Lead / Support / Decoration / Static. One lead per chapter.
4. **States.** Fill INITIAL, INTRO, AMBIENT, OUTRO, REVERSE, MOBILE, REDUCED. The OUTRO says what is handed to the next chapter (Trasa position, colour, scale).
5. **Timeline table:** element, role, start, duration, motion, relationship. Use existing tokens (`EASE.out/inOut/expo`, `DUR.xs–l`). A new ease is a token proposal, never a one-off.
6. **Technology**, cheapest that works, in this order:
   1. CSS transition (UI),
   2. existing preset (`splitReveal`, `maskReveal`, `routeDraw`, `counter`, `flexAxes`),
   3. GSAP + ScrollTrigger in `useScene`,
   4. Flip / SplitText / DrawSVG (lazy),
   5. SVG mask,
   6. WebGL by extending `people/distortion.ts`,
   7. a new dependency (three/ogl/R3F), only with an explicit reason and Jakub's approval.
7. **Constraints check.** One Lenis; GSAP from `lib/gsap/setup.ts`; max pin 250 vh desktop / 100 vh mobile; no scroll-hijack on mobile; reduced motion through `usePrefersReducedMotion`; keyboard path; WebGL single canvas with DOM fallback.
8. Write `docs/era40-ai/motion/specs/NNN-slug.md` from the template in `workflows/motion-development.md`. Optionally propose an isolated prototype (scratchpad HTML or a dev-only `/lab/` route).
9. Follow the 10-step quality standard in `workflows/motion-development.md`: references studied, technique understood, original ERA40 interpretation, full choreography, prototype, visual review. Before approval do not touch production files.
10. **Stop and ask Jakub for approval.** Quote the spec's one-line concept and what will change on screen.

## Never
- Stack effects on a section that already has its lead move.
- Propose a departure board, "40 → ∞", tickets or train-ticket metaphors again (rejected).
- Change the eight chapters, their anchors, or approved hero copy.
