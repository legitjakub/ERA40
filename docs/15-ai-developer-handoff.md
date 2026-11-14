# AI Developer Handoff — ERA40

**Status:** připraveno pro budoucí coding agenta  
**NEZAČÍNAT vývoj v tomto dokumentu / této fázi** — jen architektura a pravidla  
**Směr:** A Human Stories (viz `docs/18`)  
**Stack:** viz `docs/14`

---

## 1. Architektura (návrh)

```
apps/web/  (nebo root Next app — rozhodnout při kickoff)
  app/
    [locale]/page.tsx          # single-page editorial sections
    layout.tsx
  components/
    hero/
    stories/
    history/
    map/
    then-now/
    numbers/
    future/
    ui/                      # button, scrim, footnote, badge-fiction
  content/
    stories/*.mdx
    facts/verified.ts
    facts/unverified.ts
  lib/
    gsap/setup.ts
    gsap/matchesReducedMotion.ts
    media/loaders.ts
  motion/
    desktop/*.ts
    mobile/*.ts
  public/media/
```

Monorepo není nutný. Preferovat jednoduchost.

---

## 2. Komponenty (povinné)

| Komponenta | Odpovědnost |
| --- | --- |
| `HeroPortrait` | full-bleed, scrim, title, CTA |
| `StoryChapter` | pin quote, portrait, fiction badge |
| `TimelineRail` | SVG history |
| `EuropeMapSvg` | default mapa |
| `EuropeMap3D` | lazy, optional |
| `ThenNowCompare` | range slider + images |
| `StatCounter` | count-up + source footnote |
| `FictionBadge` | **MODEL STORY – FICTIONAL PLACEHOLDER** |
| `UnverifiedNote` | UNVERIFIED callout |
| `MotionGate` | wraps animated scenes; respects reduced motion |

Každá faktická číslovka musí číst z `content/facts` — ne hardcode ve JSX.

---

## 3. Animation system

- **Source of truth:** GSAP timelines registrované přes ScrollTrigger.
- Jedna `useGSAP` (nebo ekvivalent) per section; cleanup `ctx.revert()`.
- Centrální `prefers-reduced-motion` listener → kill triggers / static end states.
- Pojmenované label stavy podle `docs/13` (A1–A7).
- Žádné animace layoutu přes `top/left` — transform/opacity.

### GSAP / ScrollTrigger rules
1. `scrub: true` nebo `scrub: 0.6` pro narativní scény; short UI bez scrub.  
2. `pin: true` jen s explicit `pinSpacing` a max délce.  
3. `invalidateOnRefresh: true` pro responsive.  
4. `fastScrollEnd: true` kde dává smysl.  
5. Batch refresh po načtení fontů/obrázků (`ScrollTrigger.refresh()`).  
6. Nekombinovat Lenis + ScrollTrigger bez oficiálního sync patternu.  
7. Žádný `wheel` event hijack.

### Pinned / horizontal
- Desktop People: horizontal pin OK.  
- Mobile: zakázat horizontal pin; použít CSS scroll-snap.  
- History horizontal scrub jen ≥768 px.

---

## 4. 3D management

```
if (sceneNeeds3D && desktop && !reducedMotion && gpuOk) lazyImport R3F
else render SVG/static
```

- Jeden renderer max.  
- `frameroute` pause když offscreen.  
- `dispose` geometries/materials/textures on unmount.  
- DPR cap `Math.min(devicePixelRatio, 1.5)`.

---

## 5. Media optimization

- `next/image` všude.  
- Portraits: dominant LCP candidate s `priority` jen hero.  
- Srcset 640/1080/1600.  
- AVIF → WebP → JPEG.  
- Alt text česky, popisný; ILLUSTRATIVE u placeholderů.  
- Žádné autoplay sound.

---

## 6. Responsive

Breakpoints návrh: `640 / 768 / 1024 / 1440`.  
Art direction mobile ≠ scaled desktop (viz `docs/16`).  
Touch targets ≥ 44×44 px.

---

## 7. Mobile animation policy

| Feature | Mobile |
| --- | --- |
| Parallax | off / ≤3 % |
| Pin > 1.2vh | avoid |
| Horizontal story | snap carousel |
| WebGL | off by default |
| Lenis | off |
| Count-up | shorter (0.6s) |

---

## 8. Accessibility

- Semantika: `main`, `section` s `aria-labelledby`.  
- Focus visible rings.  
- Map interactions keyboard (tab + enter).  
- Then&Now: native range input.  
- Fiction/Unverified vždy textem, nejen barvou.  
- Kontrast WCAG AA minimum.

---

## 9. Reduced motion

```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

Pokud `reduce`: žádný scrub pin; sekce jako statický editorial; zachovat obsah 1:1.

---

## 10. Keyboard

- Skip link na `#main`.  
- Escape zavírá panely mapy.  
- Carousel: šipky.  
- Žádná past ve scroll pin (focus nesmí zmizet).

---

## 11. WebGL fallback

1. No WebGL API → SVG.  
2. Context lost → SVG.  
3. Low memory signal → SVG.  
4. User toggle „Zjednodušená grafika“.

---

## 12. Performance budget

Viz `docs/14`. Enforcement:
- bundle analyzer v CI  
- Lighthouse CI thresholds  
- image size lint (max bytes)

---

## 13. Testing

| Vrstva | Nástroj | Co |
| --- | --- | --- |
| Unit | Vitest | facts status, formatters |
| Component | Testing Library | badges, counter a11y |
| E2E | Playwright | section order, keyboard map, reduced-motion |
| Visual | volitelně Chromatic | hero + story |

---

## 14. Content rules for agents

- Czech primary copy.  
- Never invent awards/stats.  
- Mark UNVERIFIED.  
- Mark fictional stories exactly: **MODEL STORY – FICTIONAL PLACEHOLDER**.  
- Anniversary: ne „20 let Erasmu v CZ“ pro 2027.

---

## 15. Explicit non-goals now

- Žádný production deploy  
- Žádný plný CMS  
- Žádná autentizace  
- Žádný marketing pixel dump bez souhlasu
