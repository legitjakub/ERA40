# CDX-001 — Úklid nesmyslných prvků (dávka A)

Zadal: Claude · Datum: 15. 11. 2026 · Režim: **workspace-write** (hlavní checkout) · Pokyn: Jakub „pročisti naši šablonu od nesmyslných prvků, chci to mít čisté a hezké“
Základní commit: `d8183aa` · Vlastník buildu :3000: desktop session Codexu (spec 007/008), **ty build ani restart nespouštíš** · QA server: dev `http://127.0.0.1:3040` (HMR z pracovního stromu)

## Kontext
Claude prošel celý web na screenshotech (1440 a 390, homepage po kapitolách + podstránky). Našel prvky, které působí jako vývojářské poznámky, pozůstatky nebo samoúčelná dekorace. Web má být čistý: méně, ale přesně. Identita zůstává (Erasmus+ modrá, žlutá střídmě, Roboto Flex, Trasa, osm kapitol, modelová označení).

**Souběh:** v hlavním checkoutu má desktop session Codexu rozpracovanou spec 007/008 (necommitováno). Její soubory **nesmíš otevřít pro zápis**: `archive/StoryArchive.*`, `archive/StoryImpact.*`, `content/story-impact.ts`, `numbers/*`, `then-now/*`, `future/*`, `layout/SiteNav.tsx`, `app/pribehy/[id]/page.tsx`, `scripts/qa-impact.mjs`, `docs/era40-ai/motion/specs/007*`, `008*`, `prototypes/008-*`.

## Cíl
Šest konkrétních nečistot zmizí nebo se opraví. Nic dalšího se nezmění.

## Co přesně udělat
1. **Patička** (`web/src/components/layout/SiteFooter.tsx` + `.module.css`):
   - Z veřejné patičky odstraň interní poznámky „Obsahový prototyp ke 40 letům…“ a „Návrh patičky. Vydavatel, financování a logotypy čekají na potvrzení.“. Informace o nepotvrzených logotypech už je v `web/docs/PLACEHOLDERS.md`; zkontroluj, že tam je, a případně doplň jednu větu.
   - Ponech claim, odkazy, blok vydavatele a EU a řádek „Evropa od roku 1987. Česko od roku 1998.“ + odkaz „O modelovém obsahu“.
   - Uprav rozestupy, ať po odstranění nezůstane prázdné místo.
2. **Osiřelá Trasa v prologu** (`web/src/components/people/PeopleIntro.tsx` + css):
   - U levého okraje visí tenká linka se zahnutím (`d="M 120,2 H 58 Q 22,2 22,38 V 140"`) a nikam nevede. Na 1440 i 390 vypadá jako chyba vykreslení.
   - Buď ji napoj tak, aby vizuálně plynule přešla do svislé linky Historie (ta je u levého okraje obsahu, ne u okraje okna), nebo ji odstraň. Rozhodni podle screenshotů a v reportu zdůvodni volbu.
   - Na mobilu nesmí linka zasahovat do textu.
3. **Časový kód ve filmových titulcích** (`web/src/components/hero/FilmCaptions.tsx` + css):
   - Žlutý čítač „00:00 / 00:06“ nad titulkem je samoúčelná dekorace. Odstraň ho.
   - Titulky samotné („Den odjezdu.“ atd.), jejich časování a celý hero ponech beze změny (Jakub hero schválil, D-002).
4. **O projektu** (`web/src/app/o-projektu/page.tsx`):
   - Úvodní fotka je odjezdová tabule nádraží. Tabuli Jakub odmítl jako motiv (D-004).
   - Vyměň ji za jinou **existující** ilustrační fotku z `web/public/media/` nebo `placeholders/` s lidmi, ne s nádražím. Zachovej viditelný štítek „Ilustrační snímek“ a čitelný kontrast nadpisu.
   - Kredit fotky musí odpovídat `media.json` / `/credits`. Pokud vybraná fotka v kreditech je, nic nepřidávej.
5. **QA screenshoty ve veřejné složce:** smaž `web/public/media/qa-*.png` (5 souborů, 3,4 MB). Nejdřív ověř `grep`em, že je nic v `web/src`, `web/scripts` ani `web/docs` neodkazuje. Pokud ano, napiš to do reportu a nemaž.
6. **Konzolové varování DrawSVG** na mapě (`web/src/components/map/EuropeMap.tsx`):
   - Jen pokud jde opravit bez změny vzhledu. Varování „length cannot be measured when vector-effect is non-scaling-stroke…“ vzniká při měření aktivní cesty.
   - Když oprava vyžaduje vizuální změnu, nech to být a napiš to.

## Nejdřív prostuduj
`AGENTS.md`, `web/AGENTS.md`, `web/docs/DESIGN.md` (identita, §anti-AI), `docs/era40-ai/decisions/decision-log.md` (D-002, D-004, D-005, D-015), `docs/orchestration/ORCHESTRATION.md` §7–8.

## Smíš měnit (a nic jiného)
- `web/src/components/layout/SiteFooter.tsx`, `SiteFooter.module.css`
- `web/src/components/people/PeopleIntro.tsx`, `PeopleIntro.module.css`
- `web/src/components/hero/FilmCaptions.tsx`, `FilmCaptions.module.css`
- `web/src/app/o-projektu/page.tsx` (+ jeho css, pokud existuje)
- `web/src/components/map/EuropeMap.tsx`, `EuropeMap.module.css` (jen bod 6)
- `web/public/media/qa-*.png` (smazání)
- `web/docs/PLACEHOLDERS.md` (jedna věta k patičce)

## Nesmíš měnit
- soubory desktop session (seznam výše), `web/data/**`, `docs/private/**`
- texty a časování filmových titulků, hero kompozici, osm kapitol a kotvy, modelová označení
- žádné nové závislosti, žádný `next build`, žádný restart :3000, žádný commit (commit dělá Claude po review)

## Akceptační kritéria
- [ ] Patička neobsahuje interní poznámky. Na 1440 a 390 nemá prázdné díry.
- [ ] V prologu není osiřelá linka. Buď navazuje na Historii, nebo zmizela. Na 390 nezasahuje do textu.
- [ ] Hero nemá časový kód. Titulky fungují dál.
- [ ] `/o-projektu` nemá odjezdovou tabuli. Štítek a kontrast jsou v pořádku.
- [ ] `qa-*.png` smazány (nebo zdůvodněno, proč ne).
- [ ] Bod 6 opraven, nebo poctivě odložen.
- [ ] `git status` ukazuje změny jen v povolených cestách.

## Povinné testy
- `npm run typecheck`, `npm run lint` ve `web/`
- Playwright proti `http://127.0.0.1:3040` (dev):
  - screenshoty hero, prologu (včetně přechodu do Historie), patičky a `/o-projektu` při 1440 × 900 a 390 × 844,
  - jednou s reduced motion,
  - konzole bez chyb na `/` a `/o-projektu`.
- Screenshoty ulož mimo Git (např. `/private/tmp/era40-cdx001/`) a cesty uveď v reportu. Projektový skill `era40-visual-qa` použij jako postup.

## Report
Podle `docs/agent-reports/_TEMPLATE.md`. U bodu 2 popiš zvolenou variantu a důvod.
