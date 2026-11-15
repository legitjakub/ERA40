# O3 – přepis na tykání, ověřeno proti main 2ef276a, 15. 11. 2026, 01:22 SEČ

Zdroj pravdy: kopie GitHub `main` `2ef276a` v `/workspace/era40/web-main/` (SOURCE.txt, snapshot 15. 11. 01:07). Jen čtení, nic se v kódu neměnilo.

Rozhodnutí Jakuba: web i kvíz budou všude tykat. Jméno webu „Erasmus+ navždy“ je zatím návrh, proto se v tabulce nepřepisuje.

Kritérium: každý uživatelsky viditelný vykající řetězec (včetně aria-label, placeholder, metadata title/description, chybových hlášek a kvízu). Komentáře v kódu jsou vynechané. Plurál „vy“ ve významu skupiny se v main na těchto místech nevyskytuje — všechny níže uvedené tvary oslovují jednotlivce zdvořile.

Řádky ověřené `rg -n`. Soubory jsou relativní k `/workspace/era40/web-main/`.

## Tabulka přepisu

| soubor:řádek | současné znění (přesně) | návrh v tykání | poznámka |
|---|---|---|---|
| `src/components/layout/SiteNav.tsx:26` | Zapojte se | Zapoj se | Položka v menu (`pages`). |
| `src/components/layout/SiteNav.tsx:176` | Zapojte se | Zapoj se | Viditelný CTA v hlavičce; text je zapsaný zvlášť, nebere se z řádku 26. |
| `src/components/layout/SiteFooter.tsx:19` | Zapojte se | Zapoj se | Odkaz v patičce. |
| `src/app/zapojte-se/page.tsx:7` | Zapojte se — Erasmus v Česku | Zapoj se — Erasmus v Česku | Metadata `title`. Příponu se jménem webu neměnit, dokud Jakub jméno nerozhodne. |
| `src/app/zapojte-se/page.tsx:9` | Sdílejte svou cestu s Erasmem, nechte si poslat, jak vyjet, nebo zapojte svou školu či organizaci do 40 let Erasmu. | Sdílej svou cestu s Erasmem, nech si poslat, jak vyjet, nebo zapoj svou školu či organizaci do 40 let Erasmu. | Metadata `description`. Tři vykající rozkazy v jedné větě. |
| `src/app/zapojte-se/page.tsx:16` | Zapojte se do výročí | Zapoj se do výročí | Kicker stránky. |
| `src/app/ochrana-osobnich-udaju/page.tsx:20` | Vaše údaje, vaše rozhodnutí. | Tvoje údaje, tvoje rozhodnutí. | Titulek právní stránky. |
| `src/app/ochrana-osobnich-udaju/page.tsx:21` | Jak zacházíme s údaji z formuláře Zapojte se. | Jak zacházíme s údaji z formuláře Zapoj se. | Lead; odkaz na název formuláře. |
| `src/app/ochrana-osobnich-udaju/page.tsx:45` | Všichni: jméno, e-mail a zda chcete dostávat novinky. | Všichni: jméno, e-mail a zda chceš dostávat novinky. | Oslovení jednotlivce, ne skupiny. |
| `src/app/ochrana-osobnich-udaju/page.tsx:47` | Sdílení příběhu: odkud a kam jste vyjeli, rok, typ pobytu, text příběhu a souhlas se zveřejněním. | Sdílení příběhu: odkud a kam jsi vyjel(a), rok, typ pobytu, text příběhu a souhlas se zveřejněním. | Věta pokračuje na ř. 48. Rod podle vzoru „Byl(a) jsem na Erasmu“. |
| `src/app/ochrana-osobnich-udaju/page.tsx:50` | Zájem o výjezd: kdo jste a kam by vás to táhlo. | Zájem o výjezd: kdo jsi a kam by tě to táhlo. | |
| `src/app/ochrana-osobnich-udaju/page.tsx:62` | Údaje zpracováváme na základě vašeho souhlasu (čl. 6 odst. 1 písm. a) GDPR), abychom vám mohli odpovědět, připravit příběh ke zveřejnění nebo poslat informace k výročí. | Údaje zpracováváme na základě tvého souhlasu (čl. 6 odst. 1 písm. a) GDPR), abychom ti mohli odpovědět, připravit příběh ke zveřejnění nebo poslat informace k výročí. | Věta přes ř. 62–64. Následující věta „těm, kdo o ně požádali“ je 3. os. mn., neměnit. |
| `src/app/ochrana-osobnich-udaju/page.tsx:77` | Zveřejněné příběhy zůstávají na webu, dokud nás nepožádáte o jejich odstranění. | Zveřejněné příběhy zůstávají na webu, dokud nás nepožádáš o jejich odstranění. | Věta začíná na ř. 76. |
| `src/app/ochrana-osobnich-udaju/page.tsx:93` | Vaše práva | Tvoje práva | Nadpis. Právní tón bude hovorovější, ale platí rozhodnutí „všude tykat“. |
| `src/app/ochrana-osobnich-udaju/page.tsx:96` | Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost. Souhlas můžete kdykoli odvolat e-mailem na [kontaktní e-mail]. Pokud nesouhlasíte se způsobem zpracování, můžete podat stížnost u Úřadu pro ochranu osobních údajů. | Máš právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost. Souhlas můžeš kdykoli odvolat e-mailem na [kontaktní e-mail]. Pokud nesouhlasíš se způsobem zpracování, můžeš podat stížnost u Úřadu pro ochranu osobních údajů. | Souvislý odstavec ř. 96–100; v kódu je e-mail i odkaz na ÚOOÚ v elementech. |
| `src/app/o-projektu/page.tsx:9` | Digitální výstava ke 40 letům evropského programu Erasmus. Co je ověřené, co modelové a jak pracujeme s vašimi příběhy. | Digitální výstava ke 40 letům evropského programu Erasmus. Co je ověřené, co modelové a jak pracujeme s tvými příběhy. | Metadata `description`. |
| `src/app/o-projektu/page.tsx:90` | Jak pracujeme s vašimi příběhy | Jak pracujeme s tvými příběhy | Nadpis sekce. |
| `src/app/o-projektu/page.tsx:95` | Pokud ho chceme zveřejnit, pošleme vám upravený text ke schválení. Bez souhlasu nic nezveřejníme. | Pokud ho chceme zveřejnit, pošleme ti upravený text ke schválení. Bez souhlasu nic nezveřejníme. | Věta přes ř. 95–96. „chceme“ je 1. os. mn. (redakce), neměnit. |
| `src/app/o-projektu/page.tsx:99` | Kontakt použijeme jen k účelu, který jste ve formuláři vybrali. Souhlas můžete kdykoli odvolat. | Kontakt použijeme jen k účelu, který jsi ve formuláři vybral(a). Souhlas můžeš kdykoli odvolat. | Věta přes ř. 99–100. |
| `src/app/o-projektu/page.tsx:121` | Do té doby nám můžete napsat přes formulář pro školy a organizace. | Do té doby nám můžeš napsat přes formulář pro školy a organizace. | „formulář…“ je text odkazu na ř. 122, beze změny. |
| `src/lib/contacts/schema.ts:10` | Sdílejte svou cestu. Vybrané příběhy se po redakční úpravě a vašem schválení mohou objevit na webu. | Sdílej svou cestu. Vybrané příběhy se po redakční úpravě a tvém schválení mohou objevit na webu. | Lead cesty „příběh“, vykresluje ho JoinForm. |
| `src/lib/contacts/schema.ts:15` | Pošleme vám, jak se zapojit, a upozorníme na výzvy a akce k výročí. | Pošleme ti, jak se zapojit, a upozorníme na výzvy a akce k výročí. | Lead cesty „chci vyjet“. |
| `src/lib/contacts/schema.ts:20` | Chystáte akci, projekt nebo setkání absolventů? Ozvěte se, rádi vás propojíme s výročím. | Chystáš akci, projekt nebo setkání absolventů? Ozvi se, rádi tě propojíme s výročím. | Lead cesty „organizace“. |
| `src/lib/contacts/schema.ts:109` | Vyberte, co je vám nejblíž. | Vyber, co je ti nejblíž. | Chybová hláška (API i formulář). |
| `src/lib/contacts/schema.ts:112` | Napište, jak vám můžeme říkat. | Napiš, jak ti můžeme říkat. | Chybová hláška u jména. |
| `src/lib/contacts/schema.ts:113` | Zkontrolujte e-mail. | Zkontroluj e-mail. | Chybová hláška. |
| `src/lib/contacts/schema.ts:115` | Bez souhlasu vám nemůžeme odpovědět. | Bez souhlasu ti nemůžeme odpovědět. | Chybová hláška u souhlasu. |
| `src/lib/contacts/schema.ts:127` | Kam jste vyjeli? | Kam jsi vyjel(a)? | Chybová hláška u cíle cesty. |
| `src/lib/contacts/schema.ts:135` | Doplňte název školy nebo organizace. | Doplň název školy nebo organizace. | Chybová hláška. |
| `src/components/join/JoinForm.tsx:47` | Pokud ho budeme chtít zveřejnit, ozveme se a pošleme vám upravený text ke schválení. | Pokud ho budeme chtít zveřejnit, ozveme se a pošleme ti upravený text ke schválení. | Krok po odeslání (příběh). |
| `src/components/join/JoinForm.tsx:48` | Bez vašeho souhlasu nic nezveřejníme. | Bez tvého souhlasu nic nezveřejníme. | |
| `src/components/join/JoinForm.tsx:51` | Pošleme vám přehled, kdo a kam může s Erasmem+ vyjet. | Pošleme ti přehled, kdo a kam může s Erasmem+ vyjet. | Krok po odeslání (výjezd). |
| `src/components/join/JoinForm.tsx:52` | Upozorníme vás na výzvy a akce k výročí, pokud o to stojíte. | Upozorníme tě na výzvy a akce k výročí, pokud o to stojíš. | |
| `src/components/join/JoinForm.tsx:53` | Odhlásit se můžete jedním odkazem v každém e-mailu. | Odhlásit se můžeš jedním odkazem v každém e-mailu. | |
| `src/components/join/JoinForm.tsx:56` | Ozveme se vám do dvou týdnů. | Ozveme se ti do dvou týdnů. | Krok po odeslání (organizace). |
| `src/components/join/JoinForm.tsx:57` | Domluvíme, jak vaši akci nebo projekt propojit s výročím. | Domluvíme, jak tvoji akci nebo projekt propojit s výročím. | |
| `src/components/join/JoinForm.tsx:154` | Za chvíli to prosím zkuste znovu. Vaše vyplněné údaje zůstávají tady. | Za chvíli to prosím zkus znovu. Tvoje vyplněné údaje zůstávají tady. | Chyba 429. |
| `src/components/join/JoinForm.tsx:155` | Odeslání se nepovedlo. Vaše údaje zůstávají vyplněné, zkuste to prosím znovu. | Odeslání se nepovedlo. Tvoje údaje zůstávají vyplněné, zkus to prosím znovu. | Obecná chyba odeslání. |
| `src/components/join/JoinForm.tsx:161` | Připojení se přerušilo. Vaše údaje zůstávají vyplněné, zkuste to prosím znovu. | Připojení se přerušilo. Tvoje údaje zůstávají vyplněné, zkus to prosím znovu. | Chyba sítě. |
| `src/components/join/JoinForm.tsx:184` | Děkujeme. Vaše cesta je na trase. | Děkujeme. Tvoje cesta je na trase. | Poděkování po odeslání příběhu. |
| `src/components/join/JoinForm.tsx:227` | Co je vám nejblíž? | Co je ti nejblíž? | Legenda kroku 1. |
| `src/components/join/JoinForm.tsx:260` | Vaše cesta | Tvoje cesta | Legenda kroku 2 (příběh). |
| `src/components/join/JoinForm.tsx:262` | Kam vám máme psát | Kam ti máme psát | Legenda kroku 2 (výjezd). |
| `src/components/join/JoinForm.tsx:263` | Vaše škola nebo organizace | Tvoje škola nebo organizace | Legenda kroku 2 (organizace). |
| `src/components/join/JoinForm.tsx:276` | Vaše role | Tvoje role | Popisek pole. |
| `src/components/join/JoinForm.tsx:339` | Vyberte | Vyber | Prázdná volba v selectu typu pobytu. |
| `src/components/join/JoinForm.tsx:348` | Co vám z cesty zůstalo? | Co ti z cesty zůstalo? | Popisek textového pole. |
| `src/components/join/JoinForm.tsx:354` | Okamžik, člověk, věta, kterou si pamatujete. Pár řádků stačí. | Okamžik, člověk, věta, kterou si pamatuješ. Pár řádků stačí. | `placeholder`. |
| `src/components/join/JoinForm.tsx:369` | Příběh můžete po redakční úpravě a mém schválení zveřejnit. | Příběh můžeš po redakční úpravě a mém schválení zveřejnit. | Souhlas se zveřejněním (1. os. „mém“ zůstává). |
| `src/components/join/JoinForm.tsx:379` | Kdo jste | Kdo jsi | Popisek pole. |
| `src/components/join/JoinForm.tsx:381` | Vyberte | Vyber | Prázdná volba v selectu „kdo jsi“. |
| `src/components/join/JoinForm.tsx:389` | Kam by vás to táhlo? | Kam by tě to táhlo? | Popisek pole. |
| `src/components/join/JoinForm.tsx:405` | Co chystáte? | Co chystáš? | Popisek pole. |
| `src/components/join/JoinForm.tsx:491` | Vaše jízdenka | Tvoje jízdenka | Titulek postranního náhledu. |
| `src/components/join/JoinForm.tsx:494` | Po odeslání si ji můžete stáhnout a sdílet. | Po odeslání si ji můžeš stáhnout a sdílet. | |
| `src/components/join/JoinForm.tsx:502` | Vyberte, co je vám nejblíž. | Vyber, co je ti nejblíž. | Výchozí krok v postranním panelu, dokud není vybraná cesta. Stejná věta jako chyba ve `schema.ts:109`. |
| `src/components/join/JoinForm.tsx:503` | Vyplňte pár údajů. Zabere to dvě minuty. | Vyplň pár údajů. Zabere to dvě minuty. | |
| `src/components/join/JoinForm.tsx:504` | Ozveme se, nebo vám pošleme, co potřebujete. | Ozveme se, nebo ti pošleme, co potřebuješ. | |
| `src/components/join/Ticket.tsx:42` | Vaše jméno | Tvoje jméno | Placeholder na jízdenkce, než člověk vyplní jméno. Ve `downloadTicket.ts` je místo toho pomlčka „—“, ne vykání. |
| `src/components/numbers/Numbers.tsx:121` | Každá oblast vzdělávání je jedna větev. Vyberte ji a podívejte se, jak může zkušenost pokračovat dál. | Každá oblast vzdělávání je jedna větev. Vyber ji a podívej se, jak může zkušenost pokračovat dál. | Lead kapitoly, věta přes ř. 121–122. |
| `src/components/numbers/Numbers.tsx:190` | Patří sem i váš příběh. | Patří sem i tvůj příběh. | Prázdný stav větve vzdělávání dospělých. |
| `src/components/numbers/Numbers.tsx:191` | Příběhy ze vzdělávání dospělých teprve shromažďujeme. Co se díky zahraniční zkušenosti změnilo u vás? | Příběhy ze vzdělávání dospělých teprve shromažďujeme. Co se díky zahraniční zkušenosti změnilo u tebe? | |
| `src/components/then-now/ThenNow.tsx:80` | Posuňte čáru mezi tehdy a dnes. | Posuň čáru mezi tehdy a dnes. | Konec odstavce v záhlaví. Předchozí věta mluví o lidech ve 3. os., neměnit. |
| `src/components/then-now/ThenNow.tsx:87` | Vyberte člověka | Vyber člověka | `aria-label` skupiny tlačítek. |
| `src/components/then-now/ThenNow.tsx:191` | Posuňte dělicí čáru tahem nebo šipkami na klávesnici. | Posuň dělicí čáru tahem nebo šipkami na klávesnici. | Nápověda u posuvníku. |
| `src/components/map/EuropeMap.tsx:96` | Vyberte město a poznejte příběh. | Vyber město a poznej příběh. | |
| `src/components/future/Future.tsx:67` | Vaše cesta | Tvoje cesta | Popisek otevřené zastávky, desktopová trasa. |
| `src/components/future/Future.tsx:75` | Vaše cesta | Tvoje cesta | Totéž na mobilní trase (samostatný řetězec). |
| `src/components/archive/StoryArchive.tsx:187` | Napište nám tu svoji. | Napiš nám tu svoji. | Prázdný stav filtrů. |
| `src/app/pribehy/page.tsx:44` | Chybí tu ten váš? | Chybí tu ten tvůj? | Výzva pod archivem. |
| `src/app/pribehy/[id]/page.tsx:162` | Máte podobnou zkušenost? | Máš podobnou zkušenost? | Výzva na stránce příběhu. |
| `src/components/era/EraQuiz.tsx:110` | Sdílení se nepovedlo. Stáhněte si nálepku. | Sdílení se nepovedlo. Stáhni si nálepku. | Jediné vykání v UI kvízu; zbytek kvízu už tyká. |
| `src/content/era-quiz.ts:79` | Evropa u vás sedí u stolu. | Evropa u tebe sedí u stolu. | Tagline typu „Svět doma“. V těle stejného typu už je tykání („Doma máš kus světa“). |

**Počet nálezů: 73.**

## Tři nejdůležitější místa

1. **Hero CTA** — v `Hero.tsx:264–265` už vykání není. Primární tlačítko je infinitiv „Objevovat příběhy“, sekundární „Jak to začalo“. Přepis tu není potřeba. Formální výzva „Zapojte se“ sedí vedle, v hlavičce (`SiteNav.tsx:176`) a v patičce (`SiteFooter.tsx:19`).
2. **JoinForm** — největší koncentrace (29 míst v `JoinForm.tsx` + 9 hlášek a leadů v `schema.ts` + placeholder na jízdenkce + metadata a kicker stránky `/zapojte-se`). Po přepisu bude formulář mluvit stejně jako kvíz.
3. **Kvíz** — skoro celý už tyká. Zbývají jen dva zásahy: chybová hláška „Stáhněte si nálepku“ (`EraQuiz.tsx:110`) a tagline „Evropa u vás sedí u stolu“ (`era-quiz.ts:79`).

## Místa, kde se už tyká (kontrola konzistence)

- `SiteNav.tsx:27`, `SiteFooter.tsx:20`, `Future.tsx:80`, `src/app/tvoje-era/page.tsx:7` a `:17` — „Jaké je tvoje ERA?“
- `src/app/tvoje-era/page.tsx:18` — „Co z tvého Erasmu žije dodnes?“
- `EraQuiz.tsx:94` — „Jaká je ta tvoje?“; `:103` title sdílení „Jaké je tvoje ERA?“; `:118` „Jak se k tobě Erasmus dostal?“; `:164` „Zkusit znovu“; `:171` „Za tvou zkušeností je konkrétní příběh.“
- `era-quiz.ts` — otázky i výsledky typů (kromě N nálezu na ř. 79): např. `:30` „Tvá zkušenost už dávno není jen tvoje.“, `:31` „předáváš“, `:33` „k tobě“, `:50` „díky tobě“, `:51` „Máš… stojíš ty“, `:67–68` „tvůj… u tebe“, `:80` „Doma máš“, `:90` „máš… víš“, `:92–93` „Tvoje první cesta… tě… máš… tvoje“, `:108` „máš… ti… neumíš“, `:156` „Co z tvého Erasmu žije dodnes?“, `:166` „Co ti to změnilo?“, `:190` a `:200` „k tobě“.
- `FilmCaptions.tsx:31` (jen mobil) — „Lidé, které ráno ještě neznáš.“ Desktopové titulky jsou ve 3. osobě a nikoho neoslovují.
- Už neutrální infinitivy a 1. osoba, které netřeba měnit: `Hero.tsx:265` „Objevovat příběhy“; „Zapojit se“ (`o-projektu/page.tsx:105`); „Vybrat svou cestu“ (`zapojte-se/page.tsx:26`); „Zapsat svůj příběh“, „Přidat svůj příběh“, „Zapojit organizaci“; „Stáhnout nálepku“, „Sdílet“, „Odeslat“, „Projít příběhy“, „Přeskočit na obsah“. Ve formuláři „Chci dostávat novinky…“ a „Souhlasím se zpracováním…“; cesty „Byl(a) jsem na Erasmu“, „Chci vyjet“.

## Místa pro jméno webu

Bez přepisu. V main se střídá „Erasmus v Česku“ a viditelný logotyp „Erasmus+“. Návrh „Erasmus+ navždy“ sem zatím nevpisovat.

- `src/components/layout/SiteNav.tsx:161` — `aria-label="Erasmus v Česku, úvod"`
- `src/components/layout/SiteNav.tsx:162` — viditelný brand „Erasmus+“
- `src/components/layout/SiteFooter.tsx:14` — „Erasmus v Česku“
- `src/app/layout.tsx:11` — metadata title „Erasmus+ již 40 let mění životy — Erasmus v Česku“
- `src/components/hero/Hero.tsx:246` — „Erasmus v Česku“
- `src/components/future/Future.tsx:42` — `navigator.share({ title: "Erasmus v Česku" })`
- `src/components/join/downloadTicket.ts:136` — „Erasmus v Česku — příběhy, které překračují hranice“
- `src/app/zapojte-se/page.tsx:7` — přípona title „— Erasmus v Česku“ (řádek je i v tabulce kvůli „Zapojte se“)
- `src/app/o-projektu/page.tsx:7` — title „O projektu — Erasmus v Česku“
- `src/app/o-projektu/page.tsx:21` — lead „Erasmus v Česku je digitální výstava…“
- `src/app/ochrana-osobnich-udaju/page.tsx:8` — title „Ochrana osobních údajů — Erasmus v Česku“
- `src/app/pribehy/page.tsx:10` — title „Příběhy — Erasmus v Česku“
- `src/app/pribehy/[id]/page.tsx:30` — title příběhu, přípona „— Erasmus v Česku“
- `src/app/styleguide/page.tsx:35` — „Vizuální styl Erasmus v Česku“
- `src/app/tvoje-era/page.tsx:7` — title kvízu používá jinou příponu: „Jaké je tvoje ERA? — Erasmus+ již 40 let mění životy“ (claim, ne krátký název)

## Technická poznámka mimo tabulku

Slug `/zapojte-se` je v adrese, v `href`, v `darkHeroPages` a v komentáři `JoinForm.tsx:72`. Není to věta k přepisu; případný přechod na `/zapoj-se` je samostatné technické rozhodnutí (přesměrování). Komentáře jsem do tabulky nedával.
