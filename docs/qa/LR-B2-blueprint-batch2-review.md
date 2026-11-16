# Living Route · dávka 2 Blueprintu v0.2 · Review

**16. 11. 2026 · Claude (implementace i review, Codex mimo provoz kvůli limitu) · Verdikt: PŘIJATO.**
Jakub: „Ano, pokračuj“ (druhá dávka po D-026).

## Rozsah a změny

| Položka Blueprintu | Změna |
|---|---|
| S04 v Prologu | `PeopleIntro.tsx`: samostatná fotografie pod poznámkou ke zdroji (vpravo 56 %, mobil na plnou šířku), alt podle viditelného obrazu. |
| C6 | Pod S04 i na konci `/zapojte-se`: „Fotografie je z fotobanky. Nezachycuje doložený příběh účastníků programu.“ |
| S07 | `/zapojte-se`: PageIntro místo placeholderu `ph-scrapbook`. |
| Statická budoucí Trasa | `PageIntro` dostal `route="open"`: tečkovaná statická hrana, použitá jen na Zapojte se. |
| C7–C9 | `JoinForm`: po odeslání „…byl(a) uložen(a) v tomto náhledu. Automaticky se nikam neodesílá.“ Před odesláním budoucí čas („Po odeslání se … uloží…“), aby panel netvrdil uložení předem. Titulky úspěchu neutrálně („Děkujeme za příběh.“). Výchozí krok bez slibu „Ozveme se“. |
| C10 | Nové `app/not-found.tsx`: „Sem žádná cesta nevede.“, HTTP 404, titulek „Stránka nenalezena“. |
| C11 | Nové `app/error.tsx`: „Tady se cesta přerušila.“, tlačítko „Načíst znovu“ (reset) a odkaz zpět. |
| Kredity | `media.json`: S04 (RDNE Stock project / Pexels) a S07 (Armin Rimoldi / Pexels). `/credits` je vypíše. Soubory v `public/media/placeholders/`; SHA256 odpovídá licenčnímu manifestu (`7d404015…`, `5ba6c512…`). |

## Ověření

| Kontrola | Výsledek |
|---|---|
| `tsc`, `lint`, `build`, restart :3000 | OK |
| Smoke | `/` 200, neexistující adresa 404, `/credits` obsahuje oba autory |
| `qa-living-route` (:3000) | 46/46 |
| `qa-viewports` `/` a `/zapojte-se` | bez chyb a přetečení |
| `qa-checks` | 15/15 PASS |
| `qa-interactions` (:3040) | vše PASS |
| `qa-handoffs` | 0 selhání |
| axe WCAG 2.2 AA (`/nic-tu-neni`, `/zapojte-se`, `/credits`; 1440 i 390) | 0 porušení |

Kontrola copy ve formuláři: postranní panel ukazuje budoucí čas a stav po odeslání minulý čas (ověřeno výběrem všech tří cest).

**Prohlédnuté snímky** (`/private/tmp/era40-batch2-qa/`):
- Prolog s S04 při 1440 a 390;
- Zapojte se při 1440 a 390;
- 404 při 390;
- tečkovaná hrana úvodu.

## Neověřeno a otevřené

- `error.tsx` nebyl vyvolán za běhu (vyžaduje simulovanou chybu renderu).
- Stock fotografie jsou pracovní náhledy 1600 px; před veřejným spuštěním znovu ověřit licenci a rozlišení (Blueprint §6).
- `/o-projektu` stále uvádí „Každý příběh si přečte redakce výročí.“ Blueprint tuto stránku nechává beze změny. Skutečný proces je EXTERNÍ (§13).
- Mobilní laboratorní přeřez filmu zůstává mediálním úkolem.
