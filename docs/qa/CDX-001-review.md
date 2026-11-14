# Review CDX-001 — úklid, dávka A

Reviewer: Claude · Datum: 15. 11. 2026 · Verdikt: **PŘIJATO**

## Diff
- Výchozí snapshot: `docs/agent-reports/logs/CDX-001-cleanup.baseline`.
- Přírůstek CDX-001: `SiteFooter.*`, `PeopleIntro.*`, `FilmCaptions.*`, `app/o-projektu/page.tsx`, `web/docs/PLACEHOLDERS.md` a smazání 5× `public/media/qa-*.png`. Všechno v povoleném rozsahu.
- Ostatní změny v pracovním stromu (007/008) patří desktop session a do commitu CDX-001 nejdou.

## Akceptační kritéria
| Kritérium | Stav | Důkaz |
|---|---|---|
| Patička bez interních poznámek, bez děr | prošlo | `/private/tmp/era40-cdx001/1440-footer-complete.png`, `390-footer-complete.png` |
| Prolog bez osiřelé linky | prošlo (odstraněna, napojení by měnilo kompozici) | `1440-prolog-history.png`, `390-prolog-history.png` |
| Hero bez časového kódu, titulky beze změny | prošlo | diff `FilmCaptions.tsx`, `1440-hero.png` |
| `/o-projektu` bez odjezdové tabule | prošlo (`ph-group.jpg`, štítek zachován) | `1440-about.png`, `390-about.png` |
| QA PNG smazány | prošlo, nikde nebyly odkazované | `git status` |
| Varování DrawSVG | odloženo poctivě: zdroj je `data-trail` v `Hero.tsx`, ne mapa | report |
| Typecheck, lint | prošlo (exit 0, Codex) | report |

## Další krok
Varování DrawSVG v hero (`data-trail` s `non-scaling-stroke`) zařadit do úklidu dávky B. Totéž platí pro sjednocení štítků „Ilustrační snímek“ a závěrečný průchod na 8 šířkách.
