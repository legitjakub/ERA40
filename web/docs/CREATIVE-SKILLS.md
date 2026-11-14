# Skilly pro filmové a interaktivní weby

Instalováno 13. 11. 2026 na výslovnou žádost Jakuba. Stejná sada je v `~/.claude/skills/` a `~/.codex/skills/`. Existující skilly nebyly přepsány. Claude Code i Codex je mohou načíst přímou cestou; automatická nabídka nových skillů se obnoví v následujícím tahu nebo nové session podle klienta.

## Výběr

| Skill | Zdroj | Použití |
|---|---|---|
| `cinematic-websites` | Lokální společný workflow | Propojení referencí, art direction, GSAP, responzivního chování a vizuálního ověření; české i anglické spouštěcí fráze |
| `awwwards` | https://github.com/juliobsz/skills/tree/main/awwwards | Koncept a řemeslo kreativních webů, návaznost scén, typografie, práce s obrazem a vlastní kontrola skutečného výsledku |
| `frontend-design` | https://github.com/anthropics/skills/tree/main/skills/frontend-design | Soudržná vizuální identita a redakční kompozice; stávající Claude skill ponechán |
| `gsap-core` | https://github.com/greensock/gsap-skills | Tweens, easing, responzivní animace |
| `gsap-timeline` | https://github.com/greensock/gsap-skills | Dramaturgie a časování scén |
| `gsap-scrolltrigger` | https://github.com/greensock/gsap-skills | Pinning, scrub, horizontální kapitoly, refresh a úklid |
| `gsap-react` | https://github.com/greensock/gsap-skills | Scope, useGSAP, contextSafe a cleanup při navigaci |
| `gsap-plugins` | https://github.com/greensock/gsap-skills | SplitText, DrawSVG, Flip a další pluginy podle skutečné potřeby |
| `gsap-utils` | https://github.com/greensock/gsap-skills | Interpolace, mapování průběhu, selektory |
| `gsap-performance` | https://github.com/greensock/gsap-skills | Transformace, méně layout práce, pozastavení práce mimo obraz |
| `react-best-practices` | https://github.com/vercel-labs/agent-skills | React a Next.js výkon; název ve frontmatteru je `vercel-react-best-practices` |
| `web-design-guidelines` | https://github.com/vercel-labs/agent-skills | Přístupnost, formuláře, ovládací prvky a responzivní kontrola |

Veřejné zdroje byly vyhledány přes skills.sh a oficiální repozitáře. Skillhu byl zkontrolován, ale neposkytl čitelný použitelný výsledek pro tuto kombinaci. Oficiální GSAP a Vercel dokumentace má přednost před přebalenými kopiemi stejných skillů. Komunitní Awwwards skill je doplněk, ne důkaz ocenění nebo záruka kvality.

## Jak je vyvolat

Například: „Použij cinematic-websites a vylepši tenhle web podle referencí Getty, Inkwell a Paper Planes. Zachovej schválenou identitu, dotáhni návaznost scén a ověř výsledek na mobilu i desktopu.“

V Claude Code lze začít i `/cinematic-websites`. V tomto projektu čte Claude root `CLAUDE.md`, který odkazuje na tento workflow a závazný `web/docs/DESIGN.md`.

## Co má při ERA40 přednost

1. Jakubovy aktuální pokyny a skutečné schválené reference.
2. `web/AGENTS.md` a `web/docs/DESIGN.md` v rozsahu, kde neodporují zadání.
3. Vybrané skilly pro řemeslné provedení. Nevynucují nový font, přepsání frameworku, další efekty ani nasazení webu.

Pro ERA40 zůstává Next.js, lokální Roboto Flex, identita Erasmus+, motiv Trasa, osm kapitol a ověřitelný obsah. Souběžná práce je rozdělena v `CLAUDE-COORDINATION.md`. Žádný skill nepředstavuje důvod přidat odjezdovou tabuli zpět, zavádět další animační smyčku, mazat kontakty nebo se spokojit s neprohlédnutým screenshotem.
