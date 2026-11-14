# 009 — Přepracování spodních kapitol (06–08) podle směru A

15. 11. 2026 · Claude · **Stav: schváleno k realizaci.** Jakub: spodní sekce hlavní stránky se mu nelíbí, „klidně ať se nějak změní, nemusíme pracovat s tím, co máme teď, můžeme to úplně přeměnit dle plánu“. Jakub zároveň určil autonomní práci, proto rozhodl Claude.

Směr: `docs/orchestration/CREATIVE_DIRECTIONS.md`, směr A, „Linka, která se vrací a pokračuje“. Kotvy `#tehdy-ted`, `#cisla` a `#budoucnost` i osm kapitol zůstávají. Obsah a forma kapitol se mohou změnit od základu.

## Proč
Současné 06–08 vypadají jako tři různé šablony za sebou: slider se stockovými fotkami s mapou a telefonem, tmavý datový blok s pruhy a světlý závěr s linkou. Nepokračují v příběhu a neříkají hlavní myšlenku briefu: **hodnota vzniká po návratu a pokračuje k dalším lidem**. To mají spodní kapitoly vyprávět ve třech krocích:

**06 Návrat → 07 Rozvětvení → 08 Pokračování.**

## 06 Tehdy a teď → „Návrat“ (`#tehdy-ted`)
- **Myšlenka:** linka z Příběhů a mapy se vrací domů a uzavře smyčku. Kapitola ukazuje, **co se po návratu změnilo**: srovnání „tehdy (odjezd) / dnes (co dělá jinak)“ u lidí z modelových příběhů.
- **Forma:** 2–3 dvojice tehdy/dnes s textem ze spec 007 (`story-impact.ts`, „co pokračuje dál“). Dělicí čára mezi „tehdy“ a „dnes“ je **ta samá modrá linka** a scroll ji posouvá. Ruční ovládání (tažení, klávesy, tlačítka Tehdy / Obojí / Teď) zůstává.
- **Pryč:** stocková mapa/telefon jako hlavní obsah a záložky „Orientace / Kontakt / Vzpomínky“. Modelové označení zůstává.

## 07 Čísla → „Rozvětvení“ (`#cisla`)
- **Myšlenka:** po návratu se linka **rozvětví**. Jeden kmen = 411 400 lidí z Česka (DZS, výzvy 1998–2023). Větve = oblasti vzdělávání se **skutečnými** počty (VŠ 178 700, neformální vzdělávání mládeže 111 000, odborné 68 900, školní 43 800, dospělí 9 000).
- **Forma:**
  - délka větve odpovídá počtu (lineárně, žádné vymyšlené měřítko),
  - na konci větve počet, název a jeden modelový příklad „co pokračuje“ (spec 007; u dospělých výzva k doplnění),
  - 86 % spokojenosti, 450 000 příchozích a rozpočet 2026 zůstávají jako doprovodné údaje s obdobím a zdrojem, typograficky klidně, ne jako čtyři stejné karty.
- **Interakce:** výběr větve (klávesnice, `aria-pressed`) zvýrazní větev a ukáže příklad.
- **Pohyb:** větve se kreslí scrubem od kmene (DrawSVG), čísla se dopočítávají při dokreslení.
- **Mobil:** větve svisle pod sebou.
- **Barva:** světlá kapitola (sky/bílá), ne ink blok. Ink zůstává filmovým scénám.
- **Zakázáno:** násobitele dopadu („každý ovlivnil N lidí“), náhodné částice, nové piny delší než 100 vh.

## 08 Budoucnost → „Pokračování“ (`#budoucnost`)
- **Myšlenka:** linka nekončí. Jedno silné sdělení „Cesta končí. Zkušenost pokračuje.“ a otevřená tečkovaná linka za okraj s bodem „Vaše cesta“.
- **Forma:**
  - minimum prvků: velký nadpis,
  - dvě akce: **Zapsat svůj příběh** (primární) a **Jaké je tvoje ERA?**,
  - odkazy „Vyrazit s Erasmus+“, „O programu“ a „Sdílet“ jako jeden klidný řádek,
  - osmi měst na lince není potřeba: linka jde z rozvětvení dál. Výsledek nesmí působit jako další šablona karet.
- **Patička** navazuje bez dalšího bloku.

## Upřesnění po review Codexu (CDX-003)
- **Měřítko 07:** pět oblastí v `content/stats.ts` dává přesně 411 400. Délka větve se měří podél její cesty, se společným lineárním měřítkem. Žádné minimální délky ani rozdílná měřítka větví. Pod grafem musí stát: „Počty účastníků podle oblasti vzdělávání, nikoli počet lidí, které zkušenost nepřímo ovlivnila.“
- **06 bez vymýšlení:** `story-impact.ts` obsahuje shrnutí pokračování, ne celé dvojice před/po. Použít 2–3 příběhy a texty stavět jen z existujícího modelového obsahu. Žádné nové výsledky ani předstírané archivní fotky.
- **Perspektiva neúčastníků a institucí:** v 06–08 aspoň jednou ukázat pokračování k lidem, kteří nevyjeli (studenti, kolegové, škola). Kvíz „Na Erasmu: 0 dní“ je pro to vstup.
- **Formulace čísel:** „86 % účastníků uvedlo, že výjezd přispěl k jejich spokojenosti se životem“ (šetření DZS a STEM/MARK 2022). U příchozích „přibližně 450 000“.
- **Konflikt s 008B:** předávka mířila na horní hranu `[data-number-stat]`, žlutý dělič a ink kapitolu. V 009 musí mířit na **kořen větvení** a respektovat modrou linku na světlé ploše. 008A nekoliduje.
- **Převzato z 007:** modelová označení, výběr oblasti, výzva pro vzdělávání dospělých, ruční převzetí slideru. Vizuál závěru 007 se nahrazuje.

## Choreografie (desktop)
| Prvek | Role | Spouštěč | Pohyb | Reverse |
|---|---|---|---|---|
| Linka smyčky (06) | lead | vstup kapitoly | DrawSVG scrub, uzavření smyčky | přesná inverze |
| Dělicí linka tehdy/dnes | support | scroll, ruční převzetí | posun x | ruční volba vyhrává |
| Větve (07) | lead | vstup | DrawSVG scrub od kmene, stagger podle pořadí velikosti | inverze |
| Čísla na koncích větví | support | dokreslení větve | count-up `DUR.l` | zůstávají |
| Otevřená linka (08) | lead | vstup | plná → bod → tečkovaná za okraj | inverze |

Gramatika Trasy (spec 001): plná = ujeto, žlutý bod = tady jsi, tečky = budoucnost. GSAP z `lib/gsap/setup.ts`, `useScene`, jeden Lenis. Bez nového canvasu, WebGL až podle fáze 3.

**Reduced motion:** vše nakreslené hned, čísla konečná. **Mobil:** bez pinů, větve svisle, linka u levého okraje.

## Přístupnost a pravdivost
- Čísla vždy s obdobím a zdrojem.
- Modelové příběhy viditelně označené.
- SVG linky `aria-hidden`, údaje v textu a v seznamu.
- Klávesnice pro výběr větve a slider. Cíle ≥ 44 px.

## Akceptace
QA matice 8 šířek (`docs/orchestration/ORCHESTRATION.md` §7), reduced motion, klávesnice a axe. Screenshoty 06–08 na 1440 a 390 posoudí Claude. Dále přímé kotvy `#tehdy-ted`, `#cisla`, `#budoucnost`.
