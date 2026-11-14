# Finální kreativní doporučení — ERA40

**Datum:** 2026-11-11  
**Status:** recommendation ready for stakeholder sign-off  
**Vývoj:** **NEZAČÍNAT** — teprve po výběru směru a dodání materiálů

---

## 1. Best creative direction

### **A — Human Stories (score 8.73/10)**

**Proč vyhrává**
1. Sedí na pracovní název *Příběhy, které překračují hranice*.  
2. Nejvyšší emocionální dopad a škálovatelnost obsahu.  
3. Nejlepší realizovatelnost + mobil + a11y oproti B.  
4. Anniversary framing zvládá poctivě (bez falešných „20 let“), pokud absorbuje kázeň z C.

**Hybrid (povinný)**
- Z **C:** timeline Then/Now/Next kapitola (historie + split).  
- Z **B:** jedna scéna Evropa — **SVG routes**, ne full WebGL world.  
- Z **D (optional):** citáty jako „dopis domů“ typografický motiv.

**Proč ne B jako celek:** tech-demo riziko, slabší příběhy, horší mobil/a11y (6.68).  
**Proč ne C jako celek:** správný čas, slabší emoce než A (7.58).

### Primární live reference trinity (z `docs/04`)
Po dokončení live rešerše (≥14 siteů) je doporučený craft model:

1. **Tracing Art** (Getty × Resn) — struktura kapitol + data→příběh + progress  
2. **Inkwell / Persepolis** — scrollytelling pacing; guided vs free explore; a11y controls  
3. **Paper Planes + 100 Lost Species** — metafora spojení / času (restraint, ne copy UX destructions)

Craft ceiling (ne vizuální DNA): Lando Norris, Messenger.  
Detail ranking: [04-top-10-references.md](./04-top-10-references.md) · knihovna: [03-reference-library.md](./03-reference-library.md)

---

## 2. Specifické animace (ship list)

| Priorita | Technika | Kde |
|----------|----------|-----|
| P0 | Kinetic typography + text split | Hero, citáty |
| P0 | Pinned storytelling | People chapters |
| P0 | Scroll-scrub timeline | History |
| P0 | Image masking / soft wipe | Then & Now |
| P0 | Animated SVG routes | Europe Map |
| P1 | Sticky photo + copy | People / History |
| P1 | Number scrub (verified only) | Numbers |
| P1 | Seamless section color transitions | Whole page |
| P2 | Contained horizontal story rail | Desktop People |
| P2 | Magnetic CTA (desktop) | Closing |
| P2 | Subtle parallax (≤12%) | Hero background |
| Optional | 3D camera / R3F | Only if budget + GPU OK |
| **No** | Full WebGL transitions, scroll-jack, disappearing content, face distortion |

Systém: [05-motion-design-bible.md](./05-motion-design-bible.md) · Storyboardy: [13-motion-storyboards.md](./13-motion-storyboards.md)

---

## 3. Technologie

```
Next.js (App Router) + React + TypeScript
GSAP + ScrollTrigger     ← motion source of truth
SVG + CSS                ← map, timeline
Lenis (optional)
R3F/Three.js             ← max 1 scene, lazy
next/image (AVIF/WebP)
MDX/JSON content modules
Vitest + Playwright
```

Detail: [14-recommended-technology-stack.md](./14-recommended-technology-stack.md) · Handoff: [15-ai-developer-handoff.md](./15-ai-developer-handoff.md)

---

## 4. Jak vypadá obsah

- **Tón:** lidský, teplý, současný; ne úřední EU brochure.  
- **Hero:** full-bleed portrét + pracovní název + 1 věta + CTA (bez stats).  
- **Příběhy:** editorial chapters; model stories jasně označené, dokud nepřijdou reálné.  
- **Historie:** 1987 → 1998 → 1998/99 → 2004 (odděleně) → 2014 → 2021–27.  
- **Čísla:** 411 400+ (DZS 1998–2023) + ~450k incoming + zdroje ve footnote.  
- **EN:** secondary proposal — *Erasmus in Czechia — Stories That Cross Borders*.

Copy: [06](./06-content-strategy.md) · Stories: [07](./07-model-stories-placeholder-copy.md)

---

## 5. Visitor journey

```
1. HERO          — člověk + název „příběhy…“
2. PEOPLE peek   — 1 citát / jméno (zvídavost)
3. HISTORY       — jak Česko vstoupilo (1998), ne „20 let“
4. PEOPLE deep   — 3–5 příběhů (odchod → pobyt → návrat)
5. EUROPE MAP    — trasy (SVG), reciprocita
6. THEN & NOW    — osobní / vizuální kontrast
7. NUMBERS       — ověřená data jako most k lidem
8. FUTURE / CTA  — jak vyrazit / Erasmus+ odkazy (DZS)
```

Natural scroll celou cestou; pin jen v kapitolách; mobile = stack, kratší piny.

---

## 6. Art direction snapshot (A)

| Token | Hodnota |
|-------|---------|
| Paper | `#F3EDE4` |
| Ink | `#1A2330` |
| Teal | `#2F6F6A` |
| Amber | `#C9854A` |
| Display | Fraunces / Source Serif 4 |
| UI | IBM Plex Sans / Geist |
| Photo | documentary warm; AI jen ILLUSTRATIVE |

Moodboards: [12](./12-visual-moodboards.md) · `assets/moodboards/direction-a/`  
Live screenshots: `assets/ref-tracing-art.png`, `ref-inkwell.png`, `ref-persepolis.png`, `ref-100-lost-species.png`, `ref-paper-planes.png` (+ další v `assets/ref-*.png`)

---

## 7. Rozhodnutí před vývojem (gate)

| # | Decision | Owner |
|---|----------|-------|
| 1 | Schválit pracovní název (bez 20 let) | Stakeholder / DZS |
| 2 | Schválit Direction A + hybrid | Creative + client |
| 3 | Reálné příběhy + model release / GDPR | DZS / univerzity |
| 4 | Update statistik 2024–2026 | DZS |
| 5 | Foto licence (DZS/EC/uni/stock) | Production |
| 6 | EN locale scope | Content |
| 7 | Hosting / domain later | Tech — **not now** |
| 8 | Spustit coding agenta teprve po gate | PM |

Open list: [19-open-questions-required-materials.md](./19-open-questions-required-materials.md)

---

## 8. Success criteria (po budoucím buildu)

- Návštěvník pochopí, že Erasmus v ČR běží **od 1998**, ne od vstupu do EU.  
- Zapamatuje si **alespoň 1 lidský příběh**.  
- Lighthouse / a11y smoke OK; reduced-motion funguje.  
- Žádné AI fotky prezentované jako archiv.  
- Žádný claim „20 let Erasmu“ v UI 2027.

---

## 9. English secondary (proposal)

- Title: *Erasmus in Czechia — Stories That Cross Borders*  
- Avoid: *20 Years of Experiences*  
- Optional: *Since 1998* / *Nearly three decades of Czech participation* (confirm year with DZS)

---

*Toto je finální recommendation dokumentace. Implementace čeká na explicitní zelenou.*
