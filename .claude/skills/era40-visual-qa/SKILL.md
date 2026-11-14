---
name: era40-visual-qa
description: "Verify ERA40 motion and UI changes in a real browser: six widths (1440, 1280, 1024, 390, 375, 360), forward/reverse/fast scroll, reduced motion, keyboard, console errors, overflow, accessibility (axe) and performance, with screenshots that are actually looked at. Use after any change to animation, layout or interaction on the ERA40 site, or when asked to test or check the site."
---

# ERA40 Visual QA

An animation is not finished because it compiles. Follow `docs/era40-ai/workflows/visual-qa.md`.

## Run
```bash
cd web
export PLAYWRIGHT_BROWSERS_PATH=/private/tmp/era40-qa-browsers   # see technical/playwright.md if missing
node scripts/qa-viewports.mjs --url http://127.0.0.1:3000 --path / --out <scratchpad>/vp
AXE_SCRIPT=/private/tmp/era40-qa-tools/node_modules/axe-core/axe.min.js node scripts/qa-checks.mjs --url http://127.0.0.1:3000 --out <scratchpad>/checks
```
- Test the production server (:3000) after a build. If the browsers folder is gone, say so and ask before installing anything globally.
- For a specific animation phase, read `window.__eraRanges()` (dev/QA builds) and scroll to `start + p*(end-start)` for p = 0, .25, .5, .75, 1, forwards and back.
- Add targeted checks for the change: repeated interaction, refresh mid-scroll, navigation to a subpage and back, slow network (route delay), menu jump to the chapter.
- Always `page.route('**/api/kontakty', r => r.abort())`. For keyboard tests use `focus()` + key presses; clicks during Lenis scrolling are flaky.

## Look at the screenshots
Build a montage and read it. Check:
- layout shift, clipped or overlapping text, Czech diacritics touching the line above,
- final state flashing before the intro, elements stuck mid-animation after a fast scroll,
- Trasa continuity between chapters,
- touch targets ≥ 44 px, nothing off-screen at 360,
- reduced-motion end states complete and readable.

## Performance
On large changes run `node ~/.claude/skills/awwwards/scripts/shoot.mjs` against :3000. Targets: ≥ 55 fps desktop scroll, mobile LCP < 2.5 s, CLS < 0.05. Name what cannot be verified (real phone, GPU thermals) and ask Jakub to check on his phone.

## Report
Pass/fail per check, screenshot paths for every failure, and what was not verified. Append new findings to `docs/era40-ai/decisions/decision-log.md` under "QA nálezy". Report faithfully: never call something verified that was not run.
