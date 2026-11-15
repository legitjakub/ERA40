# Fronta úkolů pro Codex (aktualizováno 15. 11. 2026)

Před spuštěním každého tasku ověř `tools/codex-usage.sh` (< 90 %), aktuální HEAD a přidělení v `web/docs/CLAUDE-COORDINATION.md` podle `docs/orchestration/ORCHESTRATION.md` §8. Aktivní zadání je vždy konkrétní brief; samotný zápis ve frontě není povolení překročit jeho rozsah.

## Aktivní

| Pořadí | Brief | Režim | Základní commit | Podmínka |
|---|---|---|---|---|
| 1 | `CDX-011-map-05-polish.md` | workspace-write | `64b77e4` | D-023 schváleno; Codex desktop je jediný zapisovatel mapy, předávky, buildu a QA |

## Uzavřeno / neprovádět

- **CDX-009 — vizuální review mapy 05:** screenshot package (8 snímků) už byl připraven a předán Jakubovi. Jakub schválil D-023 a `web/docs/DESIGN.md` je aktualizovaný. Původní brief je označen `SUPERSEDED`; nespouštět znovu.
- **Prototyp 015B / map camera:** byl vyhodnocen v rámci CDX-008 s verdiktem ponechat mimo produkci. Neintegrovat do webu.

## Pozastavený historický backlog

Dřívější položky CDX-006, PoC 2, M02 hero loop a sjednocení MediaLabel nejsou aktuálním přidělením. Nespouštět je automaticky; nejdřív vyžadují nové ověření relevance a nový záznam v koordinaci.

## Další postup

Po dokončení CDX-011 provede Claude review podle `docs/qa/_TEMPLATE.md`. Další kapitolu ani novou motion scénu nezačínat bez aktuálního schváleného briefu / kreativního rozhodnutí Jakuba.
