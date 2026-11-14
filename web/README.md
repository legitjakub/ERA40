# ERA40 — Erasmus v Česku

Funkční lokální prototyp osmi kapitol o zkušenosti s Erasmem. Kombinuje dokumentární film, příběhy, evropskou mapu a českou historii programu. Pracovní výroční rámec je 40 let evropského programu v letech 1987–2027, české zapojení začíná rokem 1998.

Aktuální lokální náhled běží na [localhost:3000](http://127.0.0.1:3000).

## Spuštění

```bash
npm ci
npm run dev
```

Optimalizovaná sestava se spustí pomocí `npm run build` a `npm run start`. Hotové filmy, postery, fotografie, mapa a písma jsou uložené lokálně. Běžné spuštění nevyžaduje nové stažení ani střih médií.

## Co je implementované

- Úvodní film má vlastní střih pro desktop a telefon, AVIF postery a přístupné ovládání přehrávání. Desktopový scroll promění obraz v zarámovanou fotografii.
- Prolog zvýrazňuje čtená slova a pokračuje sekvencí 88 obrazů z okna vlaku.
- Historie spojuje evropskou linku od roku 1987 s českou od roku 1998. Rok, fotografie a popisek se mění podle průchodu. Mobil má svislou osu.
- Osm modelových příběhů tvoří desktopový horizontální rail a mobilní galerii s nativním swipe. Při omezeném pohybu se skládají pod sebe. Detail se sdílí mezi galerií a mapou a podporuje přímé odkazy.
- Mapa Natural Earth propojuje souřadnice příběhů v obou směrech. Má klikatelné a klávesnicově dostupné body i seznam destinací.
- Tehdy a teď má tři témata a posuvník. Ruční ovládání má přednost před animací.
- Statistiky obsahují konkrétní období a zdroj. Počty a sektorové pruhy mají vlastní pohyb.
- Závěr vede na formulář pro vlastní příběh a nabízí oficiální odkazy DZS a Erasmus+.

Stránky `/credits`, `/placeholders` a `/styleguide` doplňují zdroje, označení modelového obsahu a vzorky vizuálního systému.

## Podstránky a sběr kontaktů

- `/pribehy`: archiv cest s filtry (typ pobytu, směr) a dvěma pohledy, Fotografie a Rejstřík s pevným fotografickým panelem. Pohled a filtry se ukládají do URL, takže je návrat z detailu zachová.
- `/pribehy/[id]`: samostatná stránka příběhu s mapkou trasy a přechodem na další cestu. Všech osm stránek se předrenderuje.
- `/zapojte-se`: tři cesty (Byl(a) jsem na Erasmu, Chci vyjet, Za školu nebo organizaci), osobní jízdenka ke stažení jako PNG. Odkazy `/zapojte-se#pribeh`, `#vyjet` a `#organizace` předvyberou cestu a přejdou přímo na ni.
- `/o-projektu` a `/ochrana-osobnich-udaju` (návrh k právnímu schválení).
- Hero má titulky filmu načasované podle střihu (desktop i mobil) s linkou postupu a rok 2027, který při načtení naběhne z 1987.
- Podstránky otevírá stejný filmový úvod jako homepage: fotografie pod tmavým závojem nebo modrá plocha a žlutá Trasa na spodní hraně. Hlavička je nad ním průhledná.

Formulář posílá data na `POST /api/kontakty`. Validace je sdílená v `src/lib/contacts/schema.ts`. Prototyp ukládá záznamy do `data/kontakty.ndjson` (v `.gitignore`), export do CSV pro Excel:

```bash
npm run kontakty:export
```

Před spuštěním nahraďte `src/lib/contacts/store.ts` schváleným úložištěm vydavatele. Formulář ani API se měnit nemusí.

## Dokumentace a kontrola

- [Výsledky a známá omezení](docs/IMPLEMENTATION-REPORT.md)
- [Art direction a storyboardy](docs/DESIGN.md)
- [Historie a faktické podklady](docs/CONTENT-FACTS.md)
- [Reference a implementované techniky](docs/REFERENCE-NOTES.md)
- [Film a přesný střih](docs/HERO-VIDEO-SHOTLIST.md)
- [Obrazové kredity](docs/MEDIA-CREDITS.md)
- [Obsah k nahrazení](docs/PLACEHOLDERS.md)
- [Skilly pro filmové weby](docs/CREATIVE-SKILLS.md)
- [Koordinace Claude Code a Codexu](docs/CLAUDE-COORDINATION.md)
- [Nezávislé review Claude Code](docs/CLAUDE-REVIEW.md)

Poslední vizuální kontrola je ve složce `qa/handoff/`. Obsahuje screenshoty pro pět rozlišení, reduced-motion varianty, kontrolu návratu a souvislé video na desktopu a telefonu. Předchozí kola zůstávají v `qa/round-1`, `qa/final` a `qa/release`. Reporty Lighthouse jsou v `qa/lighthouse-*.report.html`.

## Technický základ

Next.js App Router, React a TypeScript. Lokální Roboto Flex má zachované osy šířky a váhy a české znaky. Komponenty používají CSS Modules a společné tokeny. GSAP se registruje v `src/lib/gsap/setup.ts`. Hook `useScene` vytváří scény po odloženém načtení ScrollTriggeru a uklízí je při změně breakpointu či preference pohybu.

Flip se načítá při otevření fotografie. Lenis se načítá jen na homepage pro desktop s jemným ukazatelem; čtecí podstránky a formuláře používají nativní scroll. Při klientské navigaci se instance i její animace uklidí. Jemné zkreslení fotografií používá jeden odložený WebGL canvas s plnohodnotným HTML obrazem pod ním. Statická geografie mapy je lokální SVG, interaktivní trasy jsou v DOM. Delší modelové příběhy se načítají při otevření detailu.

## Opakování kontrol

```bash
npm run build
npm run lint
npm run typecheck
npx playwright install chromium
npm run qa:shots -- --url http://127.0.0.1:3000 --video
node scripts/qa-interactions.mjs http://127.0.0.1:3000
node scripts/qa-motion.mjs http://127.0.0.1:3000
```

Pro snímání přesných rozsahů pinů v optimalizované sestavě použijte `NEXT_PUBLIC_ERA_QA=1 npm run build`. Produkční sestava bez této proměnné neexportuje pomocné měřicí rozhraní.

`qa:checks` používá Playwright a axe-core. Cestu k instalovanému `axe.min.js` lze předat proměnnou `AXE_SCRIPT`. Příkaz Playwright respektuje `PLAYWRIGHT_BROWSERS_PATH`. V tomto prostředí jsou prohlížeče v `/private/tmp/era40-qa-browsers` a kontrolní nástroje v `/private/tmp/era40-qa-tools`.

## Obnova assetů

```bash
npm run media:fetch
npm run media:hero
node scripts/rebuild-vector-assets.mjs
```

Střih vyžaduje FFmpeg. Jeho cestu lze změnit pomocí `FFMPEG`, složku zdrojů pomocí `ERA40_RAW`. Běžná lokální cache je `node_modules/.cache/era40-media`. Dvě varianty písma lze obnovit přes `scripts/subset-fonts.py` s FontTools a podporou WOFF. Aktuálně mají dohromady 85 012 bajtů a licence je v `public/fonts/OFL.txt`.

Všechny modelové příběhy mají viditelné označení MODEL STORY – FICTIONAL PLACEHOLDER. Ilustrativní záběry doprovází vlastní popisky. Schválení reálných příběhů, logotypů, vydavatele a financování je zaznamenané mezi otevřenými obsahovými podklady.
