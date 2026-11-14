# CDX-004 — Realizace spec 009: spodní kapitoly 06–08

Zadal: Claude · 15. 11. 2026 · Režim: **workspace-write** (hlavní checkout) · Spec: `docs/era40-ai/motion/specs/009-lower-chapters-redesign.md` (schváleno, D-017) · Motion: `docs/orchestration/MOTION_BIBLE.md` M07–M09
**Spustit až po předání 007/008** a uvolnění `then-now/*`, `numbers/*`, `future/*` v `web/docs/CLAUDE-COORDINATION.md`.
Vlastník buildu: ten, kdo je uvedený v koordinaci v okamžiku spuštění · QA: dev :3040

## Kontext
Jakub nechce současné spodní kapitoly („nemusíme pracovat s tím, co máme, můžeme to úplně přeměnit“). Směr A (D-016) je vypráví ve třech krocích: **Návrat → Rozvětvení → Pokračování**. Spec 009 obsahuje upřesnění po tvém review CDX-003: měřítko, formulace, konflikt s 008B a 06 bez vymýšlení.

## Co vytvořit
1. **06 `#tehdy-ted` „Návrat“** (`then-now/ThenNow.*`): 2–3 dvojice tehdy/dnes z existujícího modelového obsahu (`content/stories.ts`, `story-impact.ts`). Dělič = modrá linka se žlutým bodem, vedený scrollem do první ruční interakce, potom ručně (tah, šipky, Tehdy / Obojí / Teď). Aspoň jedna dvojice ukazuje pokračování k lidem, kteří nevyjeli (studenti/kolegové). Stockovou mapu s telefonem a záložky odstranit.
2. **07 `#cisla` „Rozvětvení“** (`numbers/Numbers.*`):
   - SVG: kmen 411 400 → 5 větví. Délka podél cesty je lineární a společná, součet = kmen (data jen z `content/stats.ts`).
   - Na konci větve počet, název, modelový příklad (007) a u dospělých výzva k doplnění.
   - Výběr větve tlačítky (`aria-pressed`).
   - Doprovodné údaje (450 000 příchozích „přibližně“, 86 % se zdrojem a přesnou formulací, rozpočet 2026) klidně typograficky, ne jako karty.
   - Věta: „Počty účastníků podle oblasti vzdělávání, nikoli počet lidí, které zkušenost nepřímo ovlivnila.“
   - Světlá plocha. Cíl předávky 008B je kořen větvení.
3. **08 `#budoucnost` „Pokračování“** (`future/Future.*`):
   - nadpis „Cesta končí. Zkušenost pokračuje.“,
   - linka plná → žlutý bod „Vaše cesta“ → tečky za pravý okraj,
   - primární „Zapsat svůj příběh“, sekundární „Jaké je tvoje ERA?“, řádek odkazů (Vyrazit s Erasmus+, O programu, Sdílet),
   - bez osmi měst na lince.
4. Pohyb podle MOTION_BIBLE M07–M09: GSAP z `lib/gsap/setup.ts`, `useScene`, DrawSVG, žádný nový pin na mobilu, žádný canvas.

## Smíš měnit
`web/src/components/then-now/**`, `numbers/**`, `future/**`, `content/story-impact.ts` (jen čtení/drobné úpravy textů z existujícího modelového obsahu), `components/scenes/SceneHandoffs*` (jen cíl 008B na kořen větvení), `web/scripts/qa-*.mjs` (aktualizace testů těchto kapitol).

## Nesmíš
`web/data/**`, `docs/private/**`, hero, historie, příběhy, mapa (kromě cíle 008B). Nové závislosti. Vymyšlená čísla, násobitele dopadu, nové „výsledky“ modelových postav nebo předstírané archivní fotky. Commit (dělá Claude po review).

## Akceptační kritéria
- [ ] 06/07/08 odpovídají spec 009 včetně upřesnění. Kotvy `#tehdy-ted`, `#cisla`, `#budoucnost` fungují i jako přímé odkazy.
- [ ] Délky větví jsou lineární k `stats.ts` (ověř výpočtem v testu: poměr délek = poměr počtů ± 1 %).
- [ ] Klávesnice: slider, výběr větve, akce v závěru. axe bez porušení.
- [ ] Reduced motion: vše nakreslené hned.
- [ ] Mobil 390/360: větve svisle, bez přetečení.
- [ ] Předávka 008B dosedá na kořen větvení (nebo je, pokud 008B ještě neexistuje, cíl jasně připravený).
- [ ] Konzole bez chyb.

## Povinné testy
`npm run typecheck`, `npm run lint`; Playwright proti :3040 podle QA matice (8 šířek) pro `/` od `#tehdy-ted` po patičku, normal + reduced; `node scripts/qa-checks.mjs` (axe + klávesnice). Screenshoty mimo Git, cesty v reportu.

## Report
Podle šablony. Přilož screenshoty 06–08 na 1440 a 390.
