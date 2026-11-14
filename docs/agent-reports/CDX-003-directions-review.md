# Report CDX-003 — review směrů a spec 009

## Výchozí stav
Základ: `87c81e32111ad64e1d547fe165c9e72a5287064c`, hlavní checkout `/Users/jakubhrncir/ERA40`.
Posouzen pracovní strom nad tímto SHA, včetně rozpracované 007/008. Bez commitu či patche.

## Změněné soubory
Žádné (read-only).

## Co je implementováno
Nic; provedeno nezávislé review strategie, specifikací a současného kódu.

**Strategie — směr A sedí s výhradami.** Trasa dobře propojuje zkušenost, návrat a pokračování k dalším lidem. Navazuje na existující identitu a nepotřebuje skutečné portréty pro samotnou funkčnost.
- Chybí výraznější místo pro lidi, kteří nikdy nevyjeli, a změnu ve školách či organizacích. Doplnit jejich perspektivu do textů 06–08; neomezovat pokračování na návrat účastníka.
- Smyčka sama dopad nevysvětluje. Nositelem významu musí být konkrétní změna a komu zkušenost pomáhá.
- Dokument slibuje „jednu jedinou smyčku“, ale opakuje ji u každého příběhu i na mapě. Určit jeden hlavní moment; nevykreslovat zpáteční cesty bez opory v obsahu.
- Hodnocení celého směru jako „nízké až střední riziko“ je příliš optimistické kvůli rendereru a kameře.

## Technická rozhodnutí
S/M/L označuje relativní implementační náročnost včetně integrace a QA.

| Prvek A | Odhad | Největší riziko a doporučení |
|---|---|---|
| Smyčka přes 0 v hero | M | Současné „40“ je součást drobného textu, nemá samostatnou geometrii. Nejdřív izolovaný SVG prototyp s přesnou kompozicí; zachovat čitelnost a schválený film. |
| GPU ribbon | L | `distortion.ts` je lokální WebGL1 efekt se svým RAF, nikoli hotový globální renderer. Sjednotit vlastnictví canvasu, souřadnice DOM, scrub, clipping a lifecycle. SVG ponechat jako základ. |
| Kamera v Historii | L | Dnešní DOM scéna má pin 250 vh a předává fotografii do 008A. Kamera nesmí rozpojit cílový rám, popisky a kotvy. Nejdřív samostatný PoC; mobil/reduced bez kamery. |
| Rozvětvení v Číslech | M | SVG a existující výběr oblastí lze využít. Rizikem je pravdivé měřítko a napojení 008B; GPU zde není nutné. |

Opora: technické poznámky 01–03, 07, 14 a 18. U GPU vyřešit i ztrátu kontextu a návrat k DOM; přidání Three.js samo současný efekt nezjednoduší.

**Spec 009 je realizovatelná bez nových statistik, potřebuje však upřesnění:**
- Pět oblastí v `stats.ts` dává přesně 411 400. Délku měřit po cestě větve, se společným lineárním měřítkem; minimální délky ani rozdílné měřítko jednotlivých větví nepřidávat.
- Jde o počty účastníků podle oblastí, nikoli změřený počet nepřímo ovlivněných lidí. Tento rozdíl výslovně uvést.
- `story-impact.ts` poskytuje shrnutí pokračování, nikoli kompletní dvojice „před / po“. Vybrat 2–3 příběhy a texty doložit existujícím modelovým obsahem; nepřidávat nové výsledky ani předstírané archivní fotografie.
- „86 % spokojenosti“ zpřesnit podle současného zdroje: výjezd přispěl ke spokojenosti se životem. U příchozích zachovat „přibližně“.
- 007 lze obsahově převzít: modelová označení, výběr oblastí, výzvu pro dospělé a ruční převzetí slideru. 009 nahrazuje její dosavadní vizuál závěru.
- **008B má přímý konflikt:** míří na horní hranu prvního `[data-number-stat]`, předpokládá žlutý dělič a ink kapitolu. Nově musí mířit na kořen větvení a respektovat modrou linku i světlou plochu.
- 008A se spodní přestavbou přímo nekoliduje; budoucí kamera v Historii ale vyžaduje nové ověření předávky.

## Testy a výsledky
Testovaná revize: pracovní strom nad `87c81e3` · Server/URL: nepoužit.

| Příkaz | Exit code | Stav | Poznámka |
|---|---|---|---|
| `git rev-parse HEAD`, `git status --short` | 0 | prošlo | Rozpracované změny jiné session; Git hlásil omezení pomocné cache. |
| `cat`, `rg`, `sed` nad dokumenty a zdroji | 0 | prošlo | Statické review. |
| Build, lint, typecheck, browser QA | — | nespuštěno | Read-only review; typecheck výslovně zakázán. |

## Screenshoty
Žádné; vizuální výsledek ani výkon nebyly ověřeny.

## Známé nedostatky
Odhady nejsou důkaz funkčního GPU prototypu. Rozpracovaná 007/008 ještě není tímto reportem přijata.

## Doporučený další krok
**Verdikt: souhlas s výhradami výše.**
Nejprve předat 007/008 a uvolnit soubory. Poté upřesnit obsah 06, měřítko 07 a nový cíl 008B; realizovat SVG variantu 009 a provést jednotné QA. GPU ribbon a kameru řešit oddělenými PoC před produkční integrací.