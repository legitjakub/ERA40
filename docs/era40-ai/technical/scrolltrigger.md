# ScrollTrigger

Zdroj: [oficiální dokumentace](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), čteno 14. 11. 2026. Skill `gsap-scrolltrigger`.

## Konfigurace (co používáme)
- `trigger`, `start` / `end` (`"top top"`, `"+=" + innerHeight*1.5`, funkce kvůli resize), `clamp()` 3.12+.
- `scrub: true | číslo` (sekundy dojezdu). Hero má 0,45.
- `pin: true`, pinovaný prvek neanimovat (animovat děti). `anticipatePin: 1` proti probliknutí. `pinSpacing` ve flexu default false.
- `invalidateOnRefresh: true` u hodnot měřených z layoutu. `refreshPriority` (hero 3): vyšší se přepočítá dřív.
- `toggleActions`: `"play none none none"` default, `"play reset restart reset"` pro opakovaný reveal.
- `containerAnimation`: inner triggery v horizontálním railu, kontejnerový tween musí mít `ease: "none"`, bez pinu a snapu.
- `snap`: labels / pole / objekt (`snapTo`, `duration {min,max}`, `ease`). Ruší se, když uživatel scrolluje.
- `fastScrollEnd`, `preventOverlaps` pro rychlé průlety.

## Statické metody
`refresh()`, `sort()`, `batch()` (staggerované vstupy skupiny), `getVelocity()` (px/s), `normalizeScroll()` (mobilní address bar, ale bere scroll na JS vlákno, opatrně), `clearScrollMemory()`, `isInViewport()`. `ScrollTrigger.matchMedia` je deprecated, místo něj `gsap.matchMedia()`.

## Pravidla ERA40
- Vytvářet shora dolů. ERA40 volá `ScrollTrigger.sort()` + `refresh()` po `fonts.ready`.
- Navigace měří pozice kapitol ze **spacerů pinů**, ne z transformovaných sekcí (SiteNav, `lib/motion/scroll.ts`).
- QA: `window.__eraRanges()` v dev/QA vrací rozsahy pinů pro screenshoty v konkrétním progresu.
- Max pin 250 vh desktop, 100 vh mobil (DESIGN §4).
- Předek pinu bez transform/will-change/content-visibility.
