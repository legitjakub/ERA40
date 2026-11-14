# Orchestrace Claude × Codex

Platí od 15. 11. 2026 (Jakubův „Master Orchestration Prompt“). **Claude** je kreativní ředitel a hlavní orchestrátor. Rozhoduje, **co** vznikne, **proč** a **jak**, a kontroluje kvalitu. **Codex** je hlavní implementační inženýr. Dostává malé úkoly s ověřitelnými kritérii, implementuje, testuje a reportuje.

Tento soubor popisuje pracovní systém. Strategie, identita a pravidla zůstávají v:
- `CLAUDE.md` / `AGENTS.md` (krátké instrukce obou agentů),
- `web/docs/DESIGN.md` (závazná identita),
- `docs/era40-ai/` (znalostní báze, motion systém, specifikace, decision log),
- `docs/private/` (interní podklady DZS mimo Git).

## 1. Ověřené prostředí (15. 11. 2026)

| Položka | Stav |
|---|---|
| Codex CLI | `codex-cli 0.167.0-alpha.3.2`, binárka v aplikaci ChatGPT: `/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex`. Není v `PATH`; skript ji najde sám. |
| Přihlášení | `codex login status` → „Logged in using ChatGPT“ |
| `codex exec` | funguje. Ověřené volby: `--cd`, `--sandbox read-only|workspace-write`, `--worktree`, `-o/--output-last-message`, `--json`, `--output-schema`. Prompt přes stdin (`-`). |
| Codex desktop aplikace | Běží souběžně a Jakub v ní Codex řídí i přímo. **Dvě Codex instance nad stejnými soubory = konflikt.** Zámek je `web/docs/CLAUDE-COORDINATION.md`. |
| Git | `main` sledující `origin/main` (GitHub, **PRIVATE** podle API). Push jen s Jakubovým pokynem. |
| Skilly | Claude: `.claude/skills/` (projektové) + `~/.claude/skills/`. Codex: `.agents/skills/` (odkazy na stejné projektové skilly) + `~/.codex/skills/` (GSAP, awwwards, cinematic-websites, frontend-design, playwright, react-best-practices, web-design-guidelines). Inventář: `SKILLS_INVENTORY.md`. |

**Zakázáno:** `--dangerously-bypass-approvals-and-sandbox`, `--approve-for-me`, `danger-full-access`. Codex dostává jen oprávnění nutná pro úkol.

## 2. Životní cyklus úkolu

```
Claude: brief (docs/agent-briefs/CDX-NNN-slug.md)
   │  zapíše přidělení souborů do web/docs/CLAUDE-COORDINATION.md
   ▼
tools/codex-task.sh docs/agent-briefs/CDX-NNN-slug.md [read-only|workspace-write|worktree]
   │  Codex implementuje, testuje, píše report
   ▼
docs/agent-reports/CDX-NNN-slug.md   (+ logs/CDX-NNN-slug.jsonl, mimo Git)
   │
Claude: review
   1. přečte report
   2. git diff (jen soubory z briefu, nic navíc)
   3. ověří akceptační kritéria jedno po druhém
   4. typecheck, lint, build (není-li souběžný build)
   5. prohlížeč podle jednotné QA matice (§7)
   6. docs/qa/CDX-NNN-review.md: verdikt + konkrétní připomínky
   ▼
VRÁTIT → nový brief CDX-NNN-r1 (jen připomínky) → znovu
PŘIJMOUT → commit, zápis do decision logu, uvolnit soubory
```

Úkol není hotový jen proto, že ho Codex označil za hotový. Hotový je teprve po verdiktu PŘIJATO v `docs/qa/`.

## 3. Režimy spuštění

| Režim | Kdy | Příkaz |
|---|---|---|
| `read-only` | rešerše, review, audit, nezávislá kontrola Claudova návrhu | `tools/codex-task.sh BRIEF read-only` |
| `workspace-write` | implementace v hlavním checkoutu, jen když **nikdo jiný** (Codex app, Claude) nemá přidělené tytéž soubory a neběží build | `tools/codex-task.sh BRIEF workspace-write` |
| `worktree` | paralelní nebo rizikové práce (WebGL PoC, velké refaktory). Výsledek se integruje po review. | `tools/codex-task.sh BRIEF worktree` |

Skript: `tools/codex-task.sh`. Report jde do `docs/agent-reports/<ID>.md`, JSONL log do `docs/agent-reports/logs/` (mimo Git).

## 4. Pravidla souběhu

1. **Jeden zapisovatel na soubor.** Před briefem zapiš přidělení do koordinace. Codex app i `codex exec` jsou „Codex“; nesmí běžet nad stejnými soubory.
2. **Jeden build/restart :3000 najednou.** Restart vždy podle PID z `lsof -tiTCP:3000 -sTCP:LISTEN`.
3. **Paralelní implementace jen ve worktree.** Integruje Claude po review.
4. `web/data/` (osobní údaje) a `docs/private/` (interní podklady) nikdy do Gitu ani do briefů pro externí služby.
5. Produkční změna jen podle schválené specifikace (`docs/era40-ai/motion/specs/`) nebo výslovného Jakubova pokynu.

## 5. Fáze projektu (z master promptu) a skutečný výchozí stav

ERA40 **není nový projekt.** Web běží (Next 16, React 19, GSAP 3.15 + ScrollTrigger, Lenis, vlastní WebGL1 distorze, 8 kapitol, podstránky, formulář, kvíz) a Jakub opakovaně požadoval „zlepšování, ne restart“. Fáze master promptu proto mapujeme na stávající stav:

| Fáze | Výstup | Stav |
|---|---|---|
| 0 Audit | `PROJECT_AUDIT.md`, `SKILLS_INVENTORY.md`, `MISSING_INPUTS.md` | ✅ 15. 11. |
| 1 Creative discovery | `CREATIVE_DIRECTIONS.md` (3 směry), reference ≥ 20 (2025–26) | 🟡 rešerše zahájena (`RESEARCH_PLAN.md`). **Stop: Jakub vybírá směr.** |
| 2 Experience design | `EXPERIENCE_DESIGN.md`, `MOTION_BIBLE.md`, `COMPONENT_SYSTEM.md`, `ASSET_PLAN.md` | ⬜ po výběru směru (staví na `docs/era40-ai/motion/MOTION.md`) |
| 3 Technická architektura | `TECHNICAL_ARCHITECTURE.md` (Claude) + nezávislé review Codexu + PoC nejrizikovějšího efektu | ⬜ |
| 4 Implementace | milníky po briefech CDX-NNN | ⬜ (spec 007 od Codexu běží mimo tento cyklus, viz audit) |
| 5 Visual polish | `docs/qa/` | ⬜ |
| 6 Final QA | `FINAL_QA_REPORT.md` | ⬜ |

## 6. Šablony

- Brief: `docs/agent-briefs/_TEMPLATE.md`
- Report: `docs/agent-reports/_TEMPLATE.md`
- Review: `docs/qa/_TEMPLATE.md`
- Rozhodnutí: dál jen do `docs/era40-ai/decisions/decision-log.md` (`docs/decisions/README.md` na něj odkazuje, žádná duplicita).

## 7. Jednotná QA matice

Sjednoceno po CDX-000 (dřív si odporovaly orchestrace a skill `era40-visual-qa`):

| Šířka × výška | Proč |
|---|---|
| 1920 × 1080 | velký desktop |
| 1440 × 900 | hlavní desktop |
| 1280 × 800 | menší notebook |
| 1024 × 768 | hranice desktopových pinů (`min-width:1024px`) |
| 768 × 1024 | tablet |
| 390 × 844, 375 × 812, 360 × 780 | mobily |

Každou šířku projít normálně i s reduced motion. Dále zkontrolovat:
- scroll vpřed, zpět a rychle,
- přímé kotvy a návrat z podstránky,
- klávesnici, konzoli, přetečení a axe,
- canvas WebGL (vykreslen / fallback),
- výkon (FPS, LCP) u změn pohybu.

Nástroj: `web/scripts/qa-viewports.mjs` (výchozí šířky = tato matice), `qa-checks.mjs`, cílené skripty úkolu.

## 8. Přidělení a souběh (zámek)

Koordinační dokument je dohoda, ne technický zámek. Každé přidělení v `web/docs/CLAUDE-COORDINATION.md` proto musí obsahovat:

| Pole | Příklad |
|---|---|
| Úkol | CDX-012 / spec 007 |
| Vlastník a session | Codex desktop · Codex exec (log CDX-012) · Claude |
| Checkout | hlavní / worktree `<cesta>` |
| Základní commit | `<SHA>` |
| Přesné cesty | `web/src/components/numbers/**` |
| Rezervace | build :3000 · dev :3040 · QA běh |
| Stav | přiděleno → rozpracováno → předáno → přijato / vráceno |

Předání musí být výslovné („soubory uvolněny“). Bez něj se soubory nepřebírají.

**Worktree:** brief do worktree smí odkazovat jen na **commitnuté** vstupy, protože nový worktree necommitované soubory nemá. Report musí uvést cestu worktree, základní SHA a výsledný commit nebo patch. Integraci dělá Claude po review. Přenos necommitovaných souborů do spravovaného worktree zatím není ověřený.

`tools/codex-task.sh` před během uloží snapshot (`HEAD` + `git status --porcelain`) do `docs/agent-reports/logs/<ID>.baseline`. Opakovaný běh dostane číslo pokusu a nikdy nepřepíše starší report.
