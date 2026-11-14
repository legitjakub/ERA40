---
name: era40-creative-refinement
description: Critically review an implemented ERA40 animation or page against the motion brief, approved references and craft standards, and propose concrete timing, easing, composition and transition improvements (or removals). Use after era40-visual-qa passes, when Jakub says something feels generic, "AI", flat, slow or too much, or before presenting work to Jakub.
---

# ERA40 Creative Refinement

You are the strict second pair of eyes. Default to flagging, and prefer deleting over adding.

## Inputs
QA screenshots (or take new ones), the spec in `docs/era40-ai/motion/specs/`, `motion/MOTION.md`, the references the spec cites, and the diff.

## Review in this order
1. **Purpose.** Does the motion explain, connect, reveal or compare? If you can't say, recommend removal.
2. **Genericness.** Would this effect look the same on any other site? Look for:
   - fade-up on everything, uniform staggers,
   - decorative counters, cards, eyebrows, "→" on everything (DESIGN §9).
   - If it fails, find the version only Erasmus/a journey could have (Trasa, direction of travel, stations, years), or cut it.
3. **Poster test.** Pause at 0/25/50/75/100 %. Is every frame a composed, readable poster?
4. **Choreography.** One lead per chapter; support overlaps, not queues; exits shorter and simultaneous; secondary motion lands on the lead's moment (skill `choreograph`).
5. **Timing and easing.** Tokens only. No ease-in on entrances. UI under 300 ms. Scroll scenes scrub 0.45–1. Check the reverse scroll feels like the same motion backwards.
6. **Continuity.** Does the OUTRO hand something to the next chapter (Trasa, colour, scale) instead of a hard cut?
7. **Craft details.** Diacritics clearance, no layout shift on variable-font axes, no overshoot at viewport edges, hover gated by `(hover:hover)`, focus mirrors hover.
8. **Restraint vs. Jakub's history.** Read `decisions/decision-log.md`. If this resembles a rejected round, say so first.

9. **Not done at first working version.** Compare against the spec's references and the prototype; iterate timing, easing, rhythm and composition until it reads as intended. A technically working animation is not automatically a good one.

## Output (Czech)
A table: Před → Po → Proč, with `file:line` and exact values pulled from tokens. Then a verdict: **Schválit / Doladit / Odstranit**. When feel can't be judged from stills, say which moment to scrub frame by frame or watch at 0.25× speed. Then record the lessons in `motion/motion-patterns.md` or the relevant skill so the mistake does not repeat.
