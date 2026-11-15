# Prototyp 015 A: 40 let na lince Historie

Izolovaný HTML prototyp. Produkce beze změny. Otevři `index.html` v prohlížeči (lokální font z `web/public/fonts`).

Parametry: `?year=1998.4`, `&even=1` (dnešní rovnoměrné rozmístění pro srovnání), `&reduced=1`. Posuvník dole simuluje scroll pinu.

## Co ukazuje
- **Časové měřítko:** stanice podle let (1998 = 27,5 %, 2004 = 42,5 %, 2007 = 50 %, …). Přepínač „rovnoměrně“ ukazuje dnešní stav pro srovnání: tam značky let nejsou rovnoměrné (1987–1998 je natlačené vedle 2004–2007).
- **40 pražců 1988–2027** pod linkou EU, 1,5 px. Projeté roky přecházejí do barvy linky. Každá desátá značka (1997, 2007, 2017, 2027) je delší. Bez čísel.
- **1998:** česká linka se napojí přesně na 11. značce. **2004** přepne pozadí na modré a zůstává samostatná stanice.
- Velké číslo roku má podtitulek „Rok N ze 40“, jediné nové textové místo.

## Ověřeno (screenshoty prohlédnuty, 15. 11. 2026)
- 1440, 1024, 390, 360: přetečení 0, chyby konzole 0.
- Rozestup stanic: na 1024 px je nejmenší mezera 22 px. Na 390/360 se popisky 2007/2014/2021 skryjí (statický pás na mobilu, stanice jsou jen značky).
- Klávesnice: Tab vede na stanice, klik skočí na rok.
- **Opraveno při kontrole:**
  - značky byly na desktopu skoro neviditelné, teď mají 1,5 px a tmavší barvu,
  - na modrém pozadí zmizel žlutý bod aktuální stanice (vyhrála ho specifičtější tmavá varianta, opraveno),
  - ovládací lišta prototypu překrývala linku na mobilu.

## Pro produkci (po schválení)
- Jen `HistoryTimeline.tsx` + `.module.css`. **Žádný nový trigger ani pin.** Značky a měřítko se počítají ve stávajícím `apply()` ze stejné `time.position`.
- Rok se má mezi stanicemi posouvat úměrně času. Délka nakreslené linky = aktuální rok, ne index stanice.
- Přepočítat `dock`/`czStart` a ověřit `qa-handoffs` (předávka 008A do Příběhů) a reverse scroll.
- Mobil a reduced: statický pás 40 značek nad seznamem milníků.
