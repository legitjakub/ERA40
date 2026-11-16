# CDX-016 · Review integrace Living Route (hero → Prolog)

**16. 11. 2026 · Claude · Verdikt: PŘIJATO.**

## Průběh

- Brief `docs/agent-briefs/CDX-016-living-route-integration.md` neprovedl Codex: `codex exec` skončil limitem účtu (do 20:22).
- Jakub pak rozhodl, že integraci udělá Claude („udělej to za něj, teď jsi ty ten hlavní“).
- Implementace i review jsou tedy od Claude. **Nejde o nezávislé review druhým agentem.** Nezávislou kontrolu může Codex udělat dodatečně v režimu read-only.

## Změněné soubory

- `web/src/components/hero/`
  - `Hero.tsx`, `Hero.module.css`: kompozice C2, copy C1–C4, scéna RICH / COMPACT / MOBILE / REDUCED;
  - `livingRoute.ts` (nový): geometrie a render Trasy;
  - `FilmCaptions.*`: bez linky postupu, titulky až po prvním přehrání.
- `web/src/components/people/PeopleIntro.*`: „trochu jiní.“ na vlastním řádku (≥ 1024 px), S2 Trasa jako podtržení, svislá Trasa na mobilu.
- `web/src/components/layout/SiteNav.*`: lockup „40“ a čtecí linka skryté nad filmem; tečka linky skrytá pod skrytou hlavičkou.
- `web/scripts/qa-living-route.mjs` (nový): cílené QA.

## Ověření

| Kontrola | Výsledek |
|---|---|
| `tsc --noEmit`, `npm run lint` | 0 chyb, 0 varování |
| `npm run build` + restart :3000 | OK, homepage vrací novou kompozici |
| `qa-living-route.mjs` (:3040 i :3000) | 46/46 |
| `qa-viewports.mjs` (:3000, 8 šířek × normal/reduced) | bez chyb a přetečení |
| `qa-handoffs.mjs` (:3040) | 0 selhání |
| `qa-checks.mjs` (:3000, axe + klávesnice) | vše PASS |
| `qa-interactions.mjs` | :3040 13/13. Na :3000 selhává jen „Desktop pin order“, který vyžaduje build s `NEXT_PUBLIC_ERA_QA=1`; tento předpoklad platil už dřív. |

**Prohlédnuté snímky** (`/private/tmp/era40-living-route-qa/`):
- RICH 1440 × 900 vpřed (0 → 1) i zpět, Prolog start/mid/end;
- COMPACT 1280 × 640;
- tablet 768;
- mobily 430 / 390 / 360;
- reduced 1440 a 390.

**Co odpovídá prototypu a spec 016 (Revize 1):**
- freeze bez seeku;
- obrys a deska 0,25 → 0,55, boky 0,55 → 1;
- sestup v okraji do podtržení;
- stanice vpravo, linka bílá nad filmem a modrá na papíře;
- focus hold s okamžitým uvolněním;
- ruční pauza se neobnovuje;
- reduced bez oživení;
- na mobilu copy neodjíždí do masek.

## Opravy během integrace (nad rámec prototypu)

1. **Pozdní překreslení:** opožděné `document.fonts.ready` z reduced efektu přepisovalo RICH Trasu po hydrataci. Přidán guard `alive`.
2. **Napojení v nativních režimech:** S2 v Prologu v nativních režimech začínala dřív, než hero dokreslil svou linku. Start je teď `top 40%` (RICH dál `top bottom`).
3. **Tečka z nulové čáry:** nulová čárka s kulatým zakončením kreslila tečku. Prázdné úseky jsou teď skryté.
4. **Hlavička:** čtecí linka hlavičky (tečkovaná se stanicí) byla nad filmem druhou vodorovnou Trasou. Je skrytá, dokud hlavička není světlá (U3).

## Neověřeno

Safari/iOS, skutečný telefon (fps, LCP), VoiceOver.

## Mimo tuto dávku

S04, S07, copy C6–C11, 404 a chyba; mobilní laboratorní přeřez (mediální úkol).
