# Animation recipes (ERA40, ověřené v kódu)

Recepty, které **už v projektu existují**. Nejdřív sáhni po nich.

| Recept | Kde | Signatura / poznámka |
|---|---|---|
| `splitReveal(el, scrollTrigger?)` | `lib/gsap/presets.ts` | SplitText lines + mask, yPercent 100→0, stagger .08, DUR.m. Vrací split, revert při cleanupu. |
| `maskReveal(el, st?)` | presets | clip-path inset(100% 0 0 0) → inset(0), obraz scale 1.15→1, DUR.l, expo. |
| `routeDraw(path, st?)` | presets | DrawSVG 0→100 %, scrub = ease none. |
| `counter(el, to, st?)` | presets | snap 1, české tisíce (nbsp), DUR.l. |
| `flexAxes(el, from, to, vars)` | presets | Tween os wdth/wght Roboto Flex. Jen na nezalamovaném textu. |
| Magnetické CTA | `hero/Hero.tsx` (`data-magnetic`) | quickTo x/y, faktor 0,08/0,15, jen `(pointer:fine)`. |
| Velocity skew | `layout/SmoothScroll.tsx` (`data-velocity-type`) | Lenis velocity → quickTo skewX, clamp ±3°. |
| Flip foto → detail | `people/StoryDialog.tsx` | loadFlip, getState/from, focus trap. |
| WebGL distorze | `people/distortion.ts`, `StoryDistortion.tsx` | WebGL1, jeden canvas, sinusový posun UV podle síly. |
| Pin + film do rámu | `hero/Hero.tsx` | timeline scrub .45, pin, scale .86 + clip-path, DrawSVG trail. |
| Navigační skok přes piny | `lib/motion/scroll.ts` `scrollToPosition` | Respektuje reduced motion. Pozice se měří ze spacerů pinů. |

## Recepty k adaptaci (zatím neimplementované)

| Recept | Zdroj | Poznámka pro ERA40 |
|---|---|---|
| SVG maska „žaluzie/pražce“ | Codrops SVG Mask Transitions | `attr` tween na `<rect>` v `<mask>`, přesah +0,01, crispEdges |
| Kamera po křivce | Codrops Blender path | 2D: SVG path `getPointAtLength` + viewBox; řídit ScrollTriggerem |
| Uniform reveal | Codrops WebGL gallery, `animaxxing-webgl` | Tween `uProgress` přes GSAP, render v `gsap.ticker` |
| Šířkový hover bez posunu | `animaxxing/references/recipes/hover-effects.md` | Rezervovat šířku předem, nezaokrouhlovat |
| Count-up / odometr | `animaxxing/references/recipes/counters-and-marquees.md` | ERA40 má `counter`. Odometr jen pokud dává smysl. |
