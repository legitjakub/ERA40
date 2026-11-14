# Nezávislé review dev webu (Claude), 13. 11. 2026

## Načtené skilly

Před review jsem načetl tyto soubory:
- `~/.claude/skills/cinematic-websites/SKILL.md`,
- `~/.claude/skills/awwwards/SKILL.md` a `references/quality-bar.md`,
- osnovy `gsap-scrolltrigger`, `gsap-react`, `gsap-performance` a `web-design-guidelines`,
- root `CLAUDE.md` a `web/docs/CREATIVE-SKILLS.md`.

Hodnotím v rámci schválené identity (Erasmus+ modrá, Roboto Flex, Trasa). Skóre neuvádím.

## Rozsah a metoda

- Dev `http://127.0.0.1:3040` při 1440 × 900 a 390 × 844 (isMobile, touch), Chromium přes Playwright, reálné screenshoty.
- Prošel jsem homepage (5 hloubek scrollu), nové menu (otevření, Tab, Escape, skok na kapitolu), archiv (Fotografie, Rejstřík), detail, klientskou navigaci tam a zpět, formulář (prázdné odeslání, šipky v radio skupině) a omezený pohyb.
- Formulář jsem neodeslal. `POST /api/kontakty` byl v testu zablokovaný (`route.abort`) a zaznamenal 0 pokusů. `data/kontakty.ndjson` je beze změny (2 řádky, 766 B, mtime 21:07:20).
- Žádný build, restart ani změna produktového kódu.
- Důkazy:
  - výběr screenshotů a záznam jsou v `qa/claude-review/` (`notes.txt`, `review.mjs`, `hdr.mjs`),
  - plná sada screenshotů je v pracovní složce Claude (`review/*.jpg`).
- Konzole: v celém průchodu žádná chyba ani `pageerror`.

## Nálezy, nejdůležitější první

1. **Desktopová hlavička opakuje „Příběhy“ a je přeplněná.**
   - Důkaz: `notes.txt`, `d home @0.3/0.5/0.7`, text hlavičky „04 / 08 Příběhy Příběhy Zapojte se ↗ Kapitoly“. Screenshot `d-04-home-50.jpg`.
   - Místo: `SiteNav`. Popisek aktivní kapitoly („Příběhy“) stojí hned vedle trvalého odkazu „Příběhy“ na archiv. V jedné liště je tak pět prvků (počítadlo, název kapitoly, Příběhy, Zapojte se, Kapitoly).
   - Návrh: při kapitole „Příběhy“ odkaz skrýt, nebo odkaz přejmenovat na „Archiv“. Případně z lišty vypustit název kapitoly a ponechat jen počítadlo.

2. **Archiv po návratu z detailu ztratí zvolený pohled.**
   - Kroky: Rejstřík → detail `/pribehy/praha-in` → Zpět.
   - Důkaz: na desktopu je po návratu `aria-pressed` u Rejstříku `false` a `scrollY` 900. Uživatel tedy stojí 900 px hluboko v jiném rozvržení (Fotografie). Na mobilu stejná sekvence vrátila `true`, chování je nekonzistentní. Viz `notes.txt` („back to archive“).
   - Místo: `src/components/archive/StoryArchive.tsx`, `view`, `kind` a `direction` jsou jen v `useState`.
   - Návrh: držet pohled a filtry v URL (`?pohled=rejstrik&typ=…`) nebo v `sessionStorage`.

3. **Lenis po klientské navigaci zůstává ve stavu „scrolling“.**
   - Důkaz: na desktopu po kliknutí na „Všechny příběhy“ v `#pribehy` má `<html>` ještě 2 s po načtení `/pribehy` v klidu třídu `lenis lenis-scrolling`. Viz `notes.txt` („nav home->archive“).
   - Scroll kolečkem potom fungoval (`scrollY` 899), takže to nic neblokuje. Spadá to ale do tvé práce na úklidu Lenisu mezi stránkami.

4. **Skok z menu na kapitolu na mobilu nerespektuje odsazení pod hlavičkou.**
   - Důkaz: desktop `#mapa` `top` 64 px, mobil `top` 0. Ve stylech přitom existuje `[id] { scroll-margin-top: 64px }`. Nadpis „Blíž, než se zdá.“ pak začíná přímo pod hlavičkou, viz `m-03-after-jump-mapa.jpg`.
   - Místo: obsluha kliknutí na kapitolu v novém menu (mobilní větev zřejmě počítá cíl bez `scroll-margin`).

5. **Mobilní hlavička nedává orientaci v kapitolách.**
   - Důkaz: hlavička při 390 px je ve všech hloubkách „Erasmus+ Zapojte se Kapitoly“ (`notes.txt` `m home @…`, `m-04-home-50.jpg`).
   - Počítadlo jsem dříve na mobilu skryl já, kvůli místu pro „Zapojte se“. Je to rozhodnutí k přehodnocení, ne regrese: orientace je teď jen v otevřeném menu.

## Ověřeno bez nálezu (měřené)

- Menu je modální `<dialog>` (`:modal` true, `body` overflow hidden). Tab cyklí v menu, Escape ho zavře a fokus se vrátí na „Kapitoly“.
- Hlavička se při skutečném scrollu kolečkem schovává (`translateY(-72px)` desktop, `-68px` mobil) a při scrollu nahoru se vrací (`hdr.mjs`).
  - Moje první podezření „hlavička se neschová“ byl artefakt programového `scrollTo`, ne vada.
- Formulář:
  - prázdné odeslání na cestě „pribeh“ označí `name, email, to, story, privacyConsent`,
  - fokus skočí na Jméno a je viditelný,
  - šipka dolů v radio skupině přepne na „vyjet“.
- Detail → homepage přes logo: film hraje, piny se obnoví (3 `.pin-spacer`) a Historie se vykreslí správně (`d-11-home-historie-after-subpage.jpg`).
- Při omezeném pohybu je hero statické s posterem a tlačítkem přehrát a příběhy jsou pod sebou (`d-15`, `d-16`, `m-16`).
