# Registr skillů ERA40

Projektové skilly leží v `ERA40/.claude/skills/` a Claude Code je načte, když session běží v kořeni `ERA40`. Globální skilly jsou v `~/.claude/skills/`. Instalace proběhla 14. 11. 2026 **kopírováním složek** z naklonovaných repozitářů. Před kopírováním byly přečteny README, licence a celé SKILL.md. Žádné instalační skripty se nespouštěly a žádné globální balíčky se neinstalovaly.

Reprodukce (stejné commity):

```bash
git clone https://github.com/johnpolacek/animaxxing-skills /tmp/ax && git -C /tmp/ax checkout 8ddf542
git clone https://github.com/emilkowalski/skills /tmp/ek && git -C /tmp/ek checkout 0f2e23b
cp -R /tmp/ax/skills/{animaxxing,animaxxing-webgl,gsap-nextjs} .claude/skills/
cp -R /tmp/ek/skills/{animate,choreograph,find-animation-opportunities,review-animations,improve-animations,animation-performance,animation-vocabulary} .claude/skills/
```

## Pořadí autority

1. Jakubovy aktuální pokyny.
2. `CLAUDE.md`, `web/AGENTS.md`, `web/docs/DESIGN.md`.
3. `docs/era40-ai/motion/MOTION.md` a vlastní skilly `era40-*`.
4. Převzaté skilly. Řeší řemeslo, ne identitu ani rozsah.

Konflikty, které je třeba znát:
- **Emil Kowalski:** pravidla „UI pod 300 ms“ a „nestaggerovat“ platí pro produktové UI (navigace, menu, formulář, filtry). Výjimkou jsou filmové scroll scény. Ty mají vlastní tempo podle MOTION.md, které skill sám označuje jako „marketing / explanatory: can be longer“. Jeho příklady počítají s knihovnou Motion (motion.dev), ERA40 ale používá GSAP + CSS. Přebíráme rozhodovací logiku, ne knihovnu.
- **Animaxxing:** režim „full treatment“ (vše animuje dovnitř i ven) **neplatí**. ERA40 má jeden hlavní pohyb na kapitolu (DESIGN §4). `style-animaxxing` se záměrně neinstaluje, protože nese cizí art direction (Rethink Sans, monochrom).
- **gsap-nextjs** předpokládá page transitions s outrem. ERA40 je dnes nemá. Skill slouží k řízení životního cyklu, pokud se schválí.

## Projektové skilly — vlastní (ERA40)

| Skill | Účel | Kdy použít |
|---|---|---|
| `era40-reference-analyst` | Rozbor referenčního webu v prohlížeči, ověřená pozorování a překlad do ERA40 | Jakub pošle URL nebo zmíní referenci |
| `era40-motion-director` | Koncept, storyboard, stavy INTRO/AMBIENT/OUTRO, výběr technologie | Před jakoukoli novou animací. Výstupem je specifikace ke schválení |
| `era40-creative-developer` | Implementace **schválené** specifikace v existující architektuře | Až po Jakubově souhlasu |
| `era40-visual-qa` | Prohlížečová kontrola na 6 šířkách, reduced motion, klávesnice, konzole, výkon | Po každé změně pohybu |
| `era40-creative-refinement` | Kritika hotového výsledku proti referencím a MOTION.md | Po QA, před předáním |

Verze: v1, 14. 11. 2026, autor Claude. Zdroj pravdy je `docs/era40-ai/`.

## Projektové skilly — převzaté

| Název | Zdroj | Verze | Účel | Kdy použít | Omezení |
|---|---|---|---|---|---|
| `animaxxing` | [johnpolacek/animaxxing-skills](https://github.com/johnpolacek/animaxxing-skills) `skills/animaxxing` | 8ddf542 (28. 10. 2026), MIT | Recepty GSAP efektů (split text, scroll, pointer, Flip, SVG, média, countery). Text stability a verifikace. | Hledání konkrétního receptu, kontrola stability textu (variable font osy bez posunu řádků) | Vanilla TS recepty, nutno adaptovat na `useScene`. Full treatment nepoužívat. |
| `animaxxing-webgl` | tamtéž `skills/animaxxing-webgl` | 8ddf542, MIT | WebGL efekty obrázků na jednom sdíleném rendereru (OGL), DOM fallback, context loss, dispose | Jen když motion director schválí WebGL moment | Vyžaduje `ogl` (nová závislost, potřebuje souhlas). Pro ERA40 nejdřív zvážit rozšíření `distortion.ts`. |
| `gsap-nextjs` | tamtéž `skills/gsap-nextjs` | 8ddf542, MIT | Životní cyklus animací v App Routeru, `cacheComponents`, init bez probliknutí, back/forward | Úpravy hero intra, přechody mezi stránkami, problikávání při načtení | Popisuje i React `<ViewTransition>` (Next 16.2+). ERA40 má 16.4.6. |
| `animate` | [emilkowalski/skills](https://github.com/emilkowalski/skills) `skills/animate` | 0f2e23b (13. 11. 2026), MIT | Postup stavby animace: zda vůbec animovat → účel → nástroj → vlastnosti → easing → přerušení → reduced motion | UI mikrointerakce (tlačítka, dialogy, filtry, formulář) | Hodnoty pro produktové UI, ne pro scroll film. |
| `choreograph` | tamtéž | 0f2e23b, MIT | Vztahy mezi více pohyby: lead/support/decoration, překryv vs. sekvence | Vstup hero, sekvence v pinu, přechody kapitol | — |
| `find-animation-opportunities` | tamtéž | 0f2e23b, MIT | Hledání míst, kde pohyb chybí, a odmítání ostatních (read-only) | Audit podstránek a UI | Nemění kód. |
| `review-animations` | tamtéž | 0f2e23b, MIT | Přísná revize pohybového kódu (10 standardů) | Revize diffu před předáním | Spouští se jen ručně (`disable-model-invocation`). |
| `improve-animations` | tamtéž | 0f2e23b, MIT | Audit celé motion vrstvy a plány oprav | Periodický audit | Zapisuje jen do `plans/`. |
| `animation-performance` | tamtéž | 0f2e23b, MIT | Diagnostika ztracených snímků, kompozitní vlastnosti, will-change | Jank, FPS pod 55 | — |
| `animation-vocabulary` | tamtéž | 0f2e23b, MIT | Slovník názvů efektů | Když Jakub popisuje efekt slovy | — |

Licence jsou v `.claude/skills/LICENSE-animaxxing` a `LICENSE-emilkowalski`.

## Globální skilly (už nainstalované, neduplikovat)

| Název | Zdroj | Poznámka |
|---|---|---|
| `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-plugins`, `gsap-utils`, `gsap-performance` | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | Obsah shodný s aed9cfd (21. 4. 2026), ověřeno diffem. `gsap-frameworks` (Vue/Svelte) se nenainstaloval, ERA40 ho nepotřebuje. |
| `cinematic-websites` | lokální workflow (viz `web/docs/CREATIVE-SKILLS.md`) | Hlavní vstupní skill pro filmové weby |
| `awwwards` | juliobsz/skills | Laťka kvality, `references/motion.md`, `patterns.md`, `webgl.md`, skripty `shoot.mjs` |
| `frontend-design` | anthropics/skills | Typografie, kompozice. Stejný obsah nese oficiální plugin `frontend-design` v anthropics/claude-code. Druhá instalace by byla duplicita. |
| `react-best-practices`, `web-design-guidelines` | vercel-labs/agent-skills | Výkon Reactu, přístupnost a formuláře |

## Zvážené a neinstalované

| Kandidát | Důvod |
|---|---|
| `style-animaxxing` | Cizí vizuální identita |
| Emil: `apple-design`, `ask-sonner`, `write-swift`, `mobile-native`, `animate-expo`, `pick-ui-library`, `gestures`, `learn-taste`, `break-ui`, `prototype`, `remove-animations`, `emil-design-eng` | Mimo stack (Swift, Expo, React Native), knihovna Sonner, nebo překryv s vybranými skilly. `remove-animations` může přijít později jako nástroj na zeštíhlení. |
| Animaxxing framework skilly pro Astro, Nuxt, SvelteKit, React Router, TanStack, vanilla | Jiný framework |
| Three.js / R3F skilly (emalorenzo/three-agent-skills, freshtechbro/claudedesignskills, noklip-io) | ERA40 nemá three.js. Instalovat až po schváleném 3D momentu (DESIGN §7, P2), a to po přečtení SKILL.md. Kandidát č. 1: `emalorenzo/three-agent-skills`. |
| Playwright MCP (`microsoft/playwright-mcp`) | Prohlížečová automatizace už funguje (Claude in Chrome, vestavěný prohlížeč, `playwright-core` skripty). Přidání MCP je změna konfigurace, která čeká na Jakubův souhlas. Viz `technical/playwright.md`. |


## Codex: lokální zpřístupnění, 14. 11. 2026

Codex vytvořil 15 relativních adresářových odkazů `.agents/skills/<name>` → `../../.claude/skills/<name>`. Sdílejí přesně stejné projektové skilly a jejich reference; nevznikla další neudržovaná kopie ani nová globální instalace. Existující cíle se nepřepisují. Licence zůstávají u kanonické instalace `.claude/skills/`.

Reprodukce v kořeni projektu (po výše uvedené instalaci):

```python
from pathlib import Path
dest = Path('.agents/skills')
dest.mkdir(parents=True, exist_ok=True)
for source in Path('.claude/skills').iterdir():
    target = dest / source.name
    if (source / 'SKILL.md').is_file() and not target.exists() and not target.is_symlink():
        target.symlink_to('../../.claude/skills/' + source.name, target_is_directory=True)
```

Pět vlastních skillů je přečteno Codexem celé. Jejich schvalovací hranice platí nad převzatými skilly, které by jinak rovnou implementovaly animaci. Reference analyst nyní používá dostupné nástroje daného agenta, nikoli nepřenositelné názvy nástrojů Claude.
