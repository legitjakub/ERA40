# ERA40 — AI Creative Development knowledge base

Trvalá znalostní báze pro vylepšování **existujícího** webu ERA40 (40 let Erasmu 1987–2027, Česko od 1998). Nepřestavujeme web. Zlepšujeme pohyb, přechody a vyprávění v rámci schválené identity.

## Kde začít (každá session)
1. `/CLAUDE.md` a `web/docs/DESIGN.md` (závazné).
2. `motion/MOTION.md`: motion brief, tokeny, stavy, kapitoly.
3. `decisions/decision-log.md`: co Jakub odmítl a poučení.
4. `PROJECT_ARCHITECTURE.md`: stack a tvrdá omezení.
5. Podle úkolu `technical/*` a skilly ze `SKILL_REGISTRY.md`.

## Mapa
| Soubor / složka | Obsah |
|---|---|
| `PROJECT_ARCHITECTURE.md` | Audit: Next 16.4.6, React 19.3, GSAP 3.15.1, Lenis 1.3.27, komponenty, infrastruktura animací, nástroje |
| `SKILL_REGISTRY.md` | Projektové a globální skilly, verze, kdy co použít, konflikty |
| `SOURCE_INDEX.md` | Všechny zdroje se stavem (přečteno / nedostupné) |
| `references/` | Knihovna referencí, analýzy, screenshoty |
| `tutorials/` | Shrnutí tutoriálů a implementační poznámky |
| `motion/` | MOTION.md, vzory, recepty, přechody, výkon |
| `technical/` | GSAP, ScrollTrigger, Three.js, WebGL, shadery, Playwright |
| `workflows/` | Reference → specifikace → schválení → implementace → QA |
| `decisions/` | Rozhodnutí, poučení, QA nálezy |

## Vlastní skilly (`/.claude/skills/era40-*`)
`era40-reference-analyst` → `era40-motion-director` → (Jakub schválí) → `era40-creative-developer` → `era40-visual-qa` → `era40-creative-refinement`.

## Pravidla údržby
- Co se naučíš, shrň vlastními slovy, uveď zdroj, zapiš do správného souboru a do `SOURCE_INDEX.md`.
- Necitovat celé tutoriály. Odkaz + shrnutí + krátké vzory.
- Zastaralé věci označ ⚠️ a před použitím ověř aktuální docs.
- Opakovanou chybu oprav i ve skillu, ne jen v kódu.
