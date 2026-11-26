# MotionSites → ERA40: controlled research workflow

**Status:** research-only adapter; no production implementation.

## Purpose

Study live design/motion references and turn a *single, justified* interaction mechanism into an original ERA40 concept. This workflow supplements, but does not replace, the existing era40-reference-analyst and era40-motion-director.

## Reference intake

Record URL, title, access date, source category (live / case study / interactive demo / prompt-only), license, and whether it was actually observed in a browser. An AI-generated or supplied prompt is a hypothesis about appearance, **not** proof of the implementation used by a live site.

If MotionSites MCP is available, use its read/search functions only, honoring access and licensing. If unavailable, work from publicly accessible reference URLs and explicitly report the limitation. No scraping around access controls and no automatic bulk download.

## Capture matrix

| Moment | Desktop 1440×900 | Mobile 390×844 | Evidence |
|---|---|---|---|
| Initial / 0% | composition and visual hierarchy | viewport-native alternative | screenshot / none |
| 25% | entry, mask, typography | touch/scroll mapping | screenshot / estimate |
| 50% | lead motion, layers, geometry | gesture and control | screenshot / estimate |
| 75% | handoff preparation | mobile continuation | screenshot / estimate |
| 100% | resting composition | resting composition | screenshot / none |
| Reverse / fast scroll | deterministic recovery | no scroll hijack | video / observed / unknown |
| Interactive state | click/hover/drag/focus | tap/swipe/keyboard | observed / unknown |
| Reduced motion | still understandable | still understandable | observed / unknown |

Do not invent measurements. Record timings as estimates unless measured. Separate screenshots, visible behavior, technical inference and confirmed source code.

## Motion fingerprint

For each interesting movement include:
- Visual role: lead / support / static
- Narrative purpose: explains / connects / reveals / compares / feedback
- Trigger and progress range
- State A → state B: position, dimensions, clipping, opacity, font axes, z-order, media
- GSAP/SVG/CSS/WebGL hypothesis with evidence confidence
- Scroll reversibility, fast-scroll cancellation, touch/keyboard/reduced fallback
- Performance bottlenecks and a simpler option

## ERA40 creative translation

Map to a real chapter or subpage (never a generic homepage template). Identify existing components from the current repository revision; current approved motion/handoffs take priority. Preserve correct Erasmus history, authentic/provisional content labels, blue/Roboto Flex/Route, accessible controls, and independent mobile choreography.

Write **one primary recommendation** and an alternative only if materially distinct. State what to reject from the reference (brand, typography, visual decoration, unsupported tech).

## Review rubric

Pass only if:
1. Visitor can explain the interaction's meaning in one sentence.
2. No duplication of a previously approved signature movement.
3. All final resting frames are editorially readable.
4. The mobile experience works without hover and does not trap scroll.
5. Reduced-motion, keyboard and semantic alternatives are defined.
6. Content/imagery claims are explicitly verified or marked conceptual.
7. A lighter-weight existing-architecture solution was evaluated.
8. Sources, uncertainty, screenshots, reference URL and dates are traceable.

End with **ADOPT / ADAPT / REJECT**, risk L/M/H, assets needed, and a storyboard proposal. Do not implement before approval.

## Recommended next experiment

Section 04 Příběhy: audit the existing PeopleStories component and one actually inspectable image-transition reference. Deliver a 6-state storyboard, 1440 and 390 layouts, and interaction specification. No production changes.
