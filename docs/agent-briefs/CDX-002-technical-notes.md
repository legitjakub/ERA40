# CDX-002 — Technické referenční poznámky (18 oblastí)

Zadal: Claude · Datum: 15. 11. 2026 · Režim: **workspace-write + síť** (jen čtení dokumentace) · Pokyn: Master Orchestration Prompt §6
Základní commit: `01c0051` · Checkout: hlavní · Build: žádný · Vlastník buildu :3000: desktop session Codexu

## Kontext
Master prompt požaduje vlastní referenční poznámky k 18 technickým oblastem pro rozhodování ve fázi 3. Řada podkladů už existuje: `docs/era40-ai/technical/*.md`, `docs/era40-ai/tutorials/implementation-notes/*.md` a rizika z tvého review CDX-000. Neopakuj je. Odkaž na ně a doplň, co chybí. Claude mezitím píše kreativní směry. Desktop session Codexu implementuje spec 008 v `web/src`.

## Cíl
Ve složce `docs/era40-ai/technical/notes/` je 18 stručných, ověřených poznámek, které se dají přímo použít v `TECHNICAL_ARCHITECTURE.md`.

## Oblasti (jeden soubor na oblast, `NN-slug.md`)
1. Scroll-driven WebGL
2. Scroll-controlled camera animation
3. DOM ↔ WebGL synchronizace
4. Shader image transitions
5. Displacement mapping
6. GLSL image masking
7. Organic shape morphing (včetně SVG MorphSVG vs. GPU)
8. Infinite scroll systems
9. 3D typography (SDF / troika-three-text, MSDF, extrudovaná geometrie)
10. Interactive cursor effects (přístupnost, touch)
11. Page transitions (Next 16 App Router, React `<ViewTransition>`, GSAP)
12. Pinned storytelling
13. Horizontal scroll
14. Three.js performance optimization
15. Mobile WebGL optimization
16. 3D asset optimization (GLB, Draco, Meshopt, KTX2/Basis)
17. Responsive motion design
18. WebGL fallback strategies (context loss, nedostupný WebGL, reduced motion)

## Struktura každé poznámky (max. ~80 řádků)
- **Co dělá**, **kdy použít** (a kdy ne v ERA40)
- **Jak funguje** (princip), **knihovny** (s verzí; Three.js r1xx, R3F, GSAP 3.15, Lenis 1.3)
- **Implementace v ERA40**: kudy by šla ve stávající architektuře (`lib/gsap/setup.ts`, `useScene`, jeden Lenis, `people/distortion.ts`, pravidlo jednoho sdíleného canvasu z `web/docs/DESIGN.md`)
- **Krátký vzor kódu** (vlastní, ne kopie tutoriálu; u převzatého uveď licenci)
- **Limity a rizika** (výkon, mobil, přístupnost)
- **Zdroje**: oficiální dokumentace na prvním místě (threejs.org/docs, r3f.docs.pmnd.rs, gsap.com/docs, developer.mozilla.org, webglfundamentals.org, lenis), potom tutoriály (Codrops, Three.js Journey jen pokud je obsah veřejný). U každého zdroje napiš, zda jsi ho **skutečně otevřel**, nebo jen znáš jeho existenci. Co nebylo dostupné, označ ❌.

Navíc `docs/era40-ai/technical/notes/README.md`: tabulka 18 oblastí → soubor → doporučení pro ERA40 jednou větou (použít / zvážit / nepoužívat) + odkaz na stávající dokumenty.

## Nejdřív prostuduj
`AGENTS.md`, `web/docs/DESIGN.md` (§7 WebGL), `docs/era40-ai/technical/*`, `docs/era40-ai/tutorials/implementation-notes/*`, `docs/agent-reports/CDX-000-orchestration-check.md` (rizika), `web/src/components/people/distortion.ts`, `web/src/lib/gsap/setup.ts`, `web/src/components/layout/SmoothScroll.tsx`, `web/package.json`.

## Smíš měnit
- nové soubory v `docs/era40-ai/technical/notes/`
- jeden řádek v `docs/era40-ai/SOURCE_INDEX.md` za každý skutečně otevřený zdroj (sekce „Codex — technické poznámky 15. 11.“)

## Nesmíš
- cokoli v `web/` (desktop session), `docs/private/**`, `web/data/**`
- instalovat balíčky, spouštět build, commitovat
- tvrdit, že jsi zdroj přečetl, pokud ses k němu nedostal (Codrops často vrací 403)

## Akceptační kritéria
- [ ] 18 poznámek + README podle struktury
- [ ] Každá poznámka má sekci „Implementace v ERA40“ navázanou na skutečné soubory repozitáře
- [ ] Zdroje rozlišují „otevřeno“ a „neotevřeno / ❌“
- [ ] `git status` ukazuje změny jen v povolených cestách

## Report
Podle `docs/agent-reports/_TEMPLATE.md`. Uveď, které oblasti považuješ pro ERA40 za nejrizikovější a proč.
