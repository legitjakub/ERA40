## Funkční lokální prototyp

Aktuální aplikace běží na [localhost:3000](http://127.0.0.1:3000). Spuštění, výsledky testů a nová art direction jsou v [web/README.md](web/README.md). Původní kreativní dokumentace níže zachovává podklady první fáze.

# ERA40 — Erasmus v Česku (dokumentace)

**Pracovní název:** **ERASMUS V ČESKU — PŘÍBĚHY, KTERÉ PŘEKRAČUJÍ HRANICE.**  
**Fáze:** creative research + handoff specs — **žádný produkční web, žádný deploy.**  
**Jazyk:** čeština (primární)

---

## Implementace (prototyp)

Lokální web: [`web/`](web/) — Next.js App Router + GSAP.  
Motion craft notes (live reference browse): [`web/MOTION-REFERENCE-ANALYSIS.md`](web/MOTION-REFERENCE-ANALYSIS.md)

```bash
cd web && npm install && npm run dev
# http://localhost:3000
```

**Nenasazovat / no deploy.**

---

## Verdikt (tlustým písmem to podstatné)

1. **„20 let Erasmu v Česku“ není správný framing pro 2027** — česká účast od **1998 / AY 1998/1999** ≈ 28–29 let; „20 let“ sedí ~2018/19 a často se plete s **20 lety členství v EU (2004→2024)**.  
2. **Doporučený směr: A — Human Stories (8.73/10)** + hybrid C timeline + B SVG mapa.  
3. **Stack:** Next.js + React + TS + **GSAP/ScrollTrigger** + SVG-first + optional R3F (1 scéna).

→ Detail: [`docs/18-final-creative-recommendation.md`](docs/18-final-creative-recommendation.md) · [`docs/01-executive-summary.md`](docs/01-executive-summary.md)

---

## Index dokumentů

| # | Soubor | Obsah |
|---|--------|--------|
| 01 | [docs/01-executive-summary.md](docs/01-executive-summary.md) | Shrnutí verdiktů |
| 02 | [docs/02-historical-research-fact-check.md](docs/02-historical-research-fact-check.md) | Fact-check výročí |
| 03 | [docs/03-reference-library.md](docs/03-reference-library.md) | ≥20 referencí |
| 04 | [docs/04-top-10-references.md](docs/04-top-10-references.md) | Top 10 ranking |
| 05 | [docs/05-motion-design-bible.md](docs/05-motion-design-bible.md) | ≥20 technik / motion systém |
| 06 | [docs/06-content-strategy.md](docs/06-content-strategy.md) | CZ copy + strategie |
| 07 | [docs/07-model-stories-placeholder-copy.md](docs/07-model-stories-placeholder-copy.md) | Fiktivní příběhy |
| 08 | [docs/08-image-research-visual-assets.md](docs/08-image-research-visual-assets.md) | Foto research + scény |
| 09 | [docs/09-erasmus-czechia-timeline.md](docs/09-erasmus-czechia-timeline.md) | Chronologie |
| 10 | [docs/10-erasmus-in-numbers.md](docs/10-erasmus-in-numbers.md) | Ověřená čísla + viz |
| 11 | [docs/11-three-creative-directions.md](docs/11-three-creative-directions.md) | Směry A/B/C/(D) |
| 12 | [docs/12-visual-moodboards.md](docs/12-visual-moodboards.md) | Moodboardy |
| 13 | [docs/13-motion-storyboards.md](docs/13-motion-storyboards.md) | Storyboardy scroll states |
| 14 | [docs/14-recommended-technology-stack.md](docs/14-recommended-technology-stack.md) | Tech stack |
| 15 | [docs/15-ai-developer-handoff.md](docs/15-ai-developer-handoff.md) | Dev handoff |
| 16 | [docs/16-ux-accessibility-requirements.md](docs/16-ux-accessibility-requirements.md) | UX / a11y |
| 17 | [docs/17-quality-evaluation.md](docs/17-quality-evaluation.md) | Scoring tabulka |
| 18 | [docs/18-final-creative-recommendation.md](docs/18-final-creative-recommendation.md) | Finální recommendation |
| 19 | [docs/19-open-questions-required-materials.md](docs/19-open-questions-required-materials.md) | Open questions |

**Future coding agent (STOP — ne implementovat teď):**  
[`prompts/future-ai-coding-agent-master-prompt.md`](prompts/future-ai-coding-agent-master-prompt.md)

---

## Assets

```
assets/
  ref-*.png            # live screenshots (Tracing Art, Inkwell, Persepolis, …)
  references/          # additional live captures
  moodboards/          # ILLUSTRATIVE AI mood tiles per direction
  ai-placeholder-*.jpg # ILLUSTRATIVE only — never archival
```

**Reference trinity (Direction A craft):** Tracing Art → struktura · Inkwell/Persepolis → scroll form · Paper Planes + 100 Lost Species → metafora. Viz [`docs/04-top-10-references.md`](docs/04-top-10-references.md).

---

## Prototype app

Immersive Next.js prototype lives in [`web/`](web/).  
Motion matrix (live-browsed): [`web/MOTION-REFERENCE-ANALYSIS.md`](web/MOTION-REFERENCE-ANALYSIS.md).

```bash
cd web && npm install && npm run dev
```

## Visitor journey (recommended)

Video hero → People peek → History (1998…) → People deep → Europe map → Then & Now → Numbers → Future/CTA

---

## Pravidla integrity

- Nevymýšlet ceny, statistiky, citáty, historická fakta.  
- MODEL STORY – FICTIONAL PLACEHOLDER u fiktivních příběhů.  
- AI vizuála = ILLUSTRATIVE, nikdy „archivní foto“.  
- Neověřené = UNVERIFIED / DATA PLACEHOLDER.

---

## Research notes

[`research/raw-notes-erasmus-czechia.md`](research/raw-notes-erasmus-czechia.md)
