# Inventář skillů, agentů a nástrojů

Ověřeno 15. 11. 2026 výpisem adresářů. Jde o **konfiguraci na disku**. Konkrétní session vidí víc: Codex v `codex exec` dostává také `~/.agents/skills/` a pluginové skilly (CDX-000), Claude také pluginové skilly a MCP. Viditelnost v katalogu neznamená, že agent skill přečetl. Instalace, verze a licence převzatých skillů jsou v `docs/era40-ai/SKILL_REGISTRY.md`. Tady je jen přehled, kdo co vidí.

| Vrstva | Claude Code | Codex |
|---|---|---|
| Projektové skilly | `.claude/skills/`: 5× `era40-*`, 3× Animaxxing, 7× Emil Kowalski | `.agents/skills/`: relativní odkazy na **stejné** složky v `.claude/skills/` (15) |
| Uživatelské skilly | `~/.claude/skills/`: `gsap-*` (7), `awwwards`, `cinematic-websites`, `frontend-design`, `react-best-practices`, `web-design-guidelines`, `pdf`, `pptx`, `docx`, `deep-research` aj. | `~/.codex/skills/`: `gsap-*` (7), `awwwards`, `cinematic-websites`, `frontend-design`, `react-best-practices`, `web-design-guidelines`, **`playwright`** |
| Subagenti | žádné projektové `.claude/agents/`; vestavění Explore / Plan / general-purpose | — |
| Instrukce | `CLAUDE.md` | `AGENTS.md` (obsahově souběžné) |
| MCP | Claude in Chrome, vestavěný prohlížeč, computer-use, Context7, Figma (přes plugin) aj. | `~/.codex/config.toml`: `node_repl`, `computer-use` |
| Prohlížeč pro QA | Playwright (`playwright-core` z projektu, prohlížeče v `/private/tmp/era40-qa-browsers`), Claude in Chrome | Playwright skill + projektové skripty |

## Mezery a doporučení

Master prompt navrhuje 5 skillů. Stav:

| Navržený skill | Existující pokrytí | Doporučení |
|---|---|---|
| `era40-art-direction` | `era40-reference-analyst` + `era40-motion-director` + `cinematic-websites`/`awwwards` | **Nevytvářet duplicitně.** Rozšířit `era40-motion-director` o art direction checklist po výběru směru. |
| `era40-webgl-development` | `animaxxing-webgl` (OGL), `docs/era40-ai/technical/threejs.md`, `webgl.md`, `shaders.md` | **Vytvořit až po PoC ve fázi 3.** Skill musí stát na ověřeném postupu v našem stacku, ne na teorii. |
| `era40-motion-design` | `era40-motion-director` + `era40-creative-developer` + GSAP skilly | Pokryto |
| `era40-visual-qa` | existuje | Rozšířit o 1920 a 768 px (master prompt) a o kontrolu canvasu WebGL |
| `era40-performance-accessibility` | `animation-performance`, `gsap-performance`, `web-design-guidelines` | Vytvořit spolu s WebGL skillem (fallbacky, context loss, mobilní GPU) |

Nestahovat neověřené skilly. Three.js / R3F skilly z komunity zvážit až po rozhodnutí o Three.js (kandidát `emalorenzo/three-agent-skills`, nutno přečíst celé SKILL.md).
