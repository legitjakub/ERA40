# Doporučený technologický stack — ERA40

**Cíl:** documentation-ready rozhodnutí pro budoucí implementaci  
**Kontext:** editorial microsite s scroll choreografií; ne plný app produkt  
**Doporučený kreativní směr:** A (Human Stories) s vybranými scénami z B/C

---

## Evaluace technologií

| Technologie | Role | Verdikt | Poznámka |
| --- | --- | --- | --- |
| **React** | UI kompozice | **ANO** | komponenty příběhů, mapy, a11y |
| **Next.js** | framework | **ANO (App Router)** | SSG/SSR, image opt, routing, i18n ready |
| **GSAP + ScrollTrigger** | scroll choreografie | **ANO — primární** | pin, scrub, timelines |
| **Three.js / R3F** | 3D | **ANO — selektivně** | max 1–2 scény (mapa/future); ne celý web |
| **WebGL / GLSL** | shadery | **Omezeně** | jen pokud scéna vyžaduje; jinak SVG/CSS |
| **Lenis** | smooth scroll | **Volitelně** | vypnout na reduced-motion / low-end |
| **Rive** | mikrointerakce | **Volitelně** | CTA / ikony; ne narativ |
| **Lottie** | mikro / fallback | **Volitelně** | hero fallback na mobilu pro B |
| **SVG** | mapa, timeline, ikony | **ANO — silně** | primární pro mapu v A |
| **CSS** | layout, theming, fallback | **ANO** | custom properties, container queries |

### Co nebrat jako základ
- Čisté WebGL-first (příliš těžké, špatný a11y default)
- Framer Motion jako jediný scroll engine (slabší pin/scrub než GSAP)
- Heavy CMS od dne 1 (stačí MDX/JSON dokud není redakce)
- Separate mobile app

---

## Finální doporučený stack (ONE)

```
Next.js (App Router) + React + TypeScript
GSAP + ScrollTrigger          ← scroll choreography source of truth
SVG (+ CSS)                   ← timeline, map (směr A default)
Lenis (optional, progressive) ← smooth scroll
@react-three/fiber + drei     ← ONLY map/future scene if approved
next/image + AVIF/WebP        ← media
MDX or JSON content modules   ← příběhy, fakta
Vitest + Playwright           ← unit + e2e a11y smoke
```

### Proč tato kombinace
1. **GSAP** nejlépe řídí pinned/horizontal editorial scény.  
2. **Next.js** dává výkon, SEO, image pipeline pro portréty.  
3. **SVG mapa** pokryje směr A bez WebGL nákladů.  
4. **Three.js** zůstává „special guest“ pro wow scénu, ne architektura.  
5. **TypeScript** snižuje riziko v handoffu AI coding agentovi.

### Alternativa, pokud by vyhrál směr B
Stejný stack, ale R3F mapa v kritické cestě + Lottie fallback; přísnější performance budget a feature detection.

---

## Performance & mobile

| Budget (návrh) | Cíl |
| --- | --- |
| LCP | ≤ 2.5 s (4G mid) |
| TBT | ≤ 200 ms |
| JS initial (gz) | ≤ 180 KB bez 3D; 3D lazy |
| Images hero | ≤ 250 KB AVIF; srcset |
| FPS scroll | ≥ 50 desktop; ≥ 40 mid mobile |
| WebGL | load on intersection + `renderer.dispose()` on leave |

### Mobile art direction
- Oddělené motion presets (`motion.desktop.ts` / `motion.mobile.ts`)
- Žádné dlouhé piny (>1.2× vh) na mobilu
- Horizontal → swipe carousel
- 3D default off (`matchMedia` + GPU tier heuristic)

---

## Content & i18n
- Primární lokalizace: **cs**
- EN jako budoucí locale route `/en/...` (nepřekládat fakta bez review)
- Fakta centralizovat v `content/facts/*.ts` s polem `status: 'verified' | 'unverified'`

---

## Hosting (budoucí, ne nyní)
Dokumentace only — **nespouštět deploy v této fázi**. Až později: Vercel nebo ekvivalent edge host kompatibilní s Next.js.

---

## Rozhodnutí „locked“

**Locked stack:** Next.js + React + TS + GSAP/ScrollTrigger + SVG-first + optional R3F + optional Lenis.  
**Locked motion lead:** GSAP.  
**Locked 3D policy:** selected key scenes only.
