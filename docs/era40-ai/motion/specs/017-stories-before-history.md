# 017 — Po filmu rovnou k lidem

27. 11. 2026. Jakub vybral Příběhy před Historií a následně požádal o přímou integraci prvního průchodu včetně animací.

Úvod předá Trasu Prologu s krátkým textem. Po něm následují tři modelové příběhy ze současného katalogu v pořadí Tereza, Jana, Inês. V čitelné kompozici se výsledek zkušenosti dostane před podrobnosti o pobytu. Úplný archiv, samostatné detaily, navigace a všech osm kotev zůstávají dostupné.

## Choreografie

- Desktop od 1024 px a výšky 680 px. Jeden rám přes přibližně 60 % šířky, vpravo text a volby. Přidaný scroll nejvýše 120 vh. Trasa v Prologu se kreslí k otázce a text je čitelný ihned.
- Střih Tereza → Jana v rozsahu 18–32 % a Jana → Inês v rozsahu 62–76 %. Maska odhaluje záběr zprava. Jméno se mění v polovině, doprovodný text je v klidovém stavu. Scrub 0,45 s. Stejná geometrie v opačném směru. Další pohyb opouští rám střihem do existující časové osy.
- Na užších či nižších obrazovkách nativní vodorovný scroll se snapem a tři přímo volitelné stanice. Při omezeném pohybu jsou příběhy čitelné v toku dokumentu. Příběh jde otevřít tlačítkem i klepnutím na fotografii.
- Historie je kapitola 04, Příběhy kapitola 03. Staré obrazové předávky Historie → Příběhy a Příběhy → Mapa ustupují novému pořadí. Mapa přebírá stabilní ID příběhu a přímý vstup má svůj výchozí stav. Ruční volba mapy zůstává, dokud čtenář ve výběru nepřejde k jiné osobě nebo nepoužije přímou volbu. Předávka 008B z Návratu do čísel pokračuje.

Implementace používá stávající GSAP, CSS a data, bez dalších runtime závislostí. Výběr tří příběhů je určený pro homepage. Ilustrační fotografie nepředstavují ověřené účastníky. Doplňování skutečných příběhů, licence filmu a další režie kapitol 05–08 mají vlastní rozsah.

## Ověření integrace

Vlastní review Codexu z 27. 11. 2026 nad změnou proti GitHub `main` `507a959`. Build, lint a typecheck prošly. V Chromium prošlo devět šířek od 360 do 1920 px, mobilní gesto při 390 px, omezený pohyb a obsah bez JavaScriptu. Axe při 390 a 1440 px pro klidový režim bez porušení vybraných pravidel WCAG A/AA. `qa-handoffs` 5/5, `qa-interactions` 13/13, `qa-living-route` 46/46. Vizuálně prohlédnuty mobilní 390 px, desktop 1440 px a mezisnímek střihu. Ruční iOS a Safari zůstávají k ověření.
