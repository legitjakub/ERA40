# Rozhodnutí a podklady ERA40

Aktualizováno 15. 11. 2026 · Codex desktop. Jakub výslovně delegoval rozhodování o všech bodech tohoto dokumentu. Běžná kreativní a technická rozhodnutí už nevracíme jako otázky. Skutečné souhlasy, data a schválení cizí organizace nelze nahradit rozhodnutím AI; jejich absence neblokuje další práci na návrhu.

## Rozhodnuto pro současnou fázi

| Původní bod | Rozhodnutí a konkrétní postup |
|---|---|
| A1 ChatGPT kontext | Tři projektové chaty jsou přepsané lokálně mimo Git; navíc načten „Reference pro web Erasmu“. Původní příloha Advanced AI Creative Development System je dostupná v Codex attachments. Další export není podmínkou pokračování. |
| A2 Interactive Assets | Osa 40 let už vznikla z existujících dat a je hotová. Kamera 015 B dostane izolovaný geografický PoC; produkční mapa zatím zachová celý přehled. Chybějící původní ZIP není blokace. |
| A3 Tabasco / font | Tabasco je reference studia Hilo. Roboto Flex a identita Erasmus+ zůstávají. |
| B4 Mobilní Historie | Schválená a hotová interaktivní varianta Swipe 40 let, bez pinu. Neotvírat znovu. |
| B5 Hero CTA | „Objev příběhy“: jasná aktivní výzva se stejným cílem #pribehy. |
| B6 Kamera mapy | Izolovaný prototyp podle skutečných souřadnic, max 1,6× po výběru, mobil/reduced celý přehled. Produkční prioritou je srozumitelné procházení tras, nikoli automatický let kamery. Vizuální ověření hotové: 8 kombinací / 64 výběrů, oba konce uvnitř, max1,6×. Verdikt: ponechat mimo produkci, kde je důležitější evropský přehled. Viz README prototypu015-map-camera. |
| B7 Živá karta a podstránky | Již schváleno a hotovo. Dál pouze řemeslné doladění. |
| B8 Hero signatura | Pevné 1987–2027; dokončil Claude v 9576994 (D-022). |
| D-007 Pohyb | Sdílené EASE/DUR, CSS easing podle d600d0f. Stávající scény rozvíjet, nevyrábět stejné fade-up na každém bloku ani plovoucí kurzorové efekty. |
| Štítky a AI vzhled | Odstranit opakované „Ilustrační snímek/video“ a modelové pill badges z kompozice. Původ vysvětlit jednou v přehledu a v detailu/dialogu běžným textem; zachovat metadata, kredity a skutečné zdroje. Nevymazat rozdíl mezi skutečnými a modelovými příběhy. |
| Barvy a zvýraznění | Modrá Erasmus+ je skutečná plocha kapitoly Mapa, tmavší modrá drží geografii a malé bílé popisky, žlutý bod ukazuje právě zvolenou cestu. Žádné nové gradienty, neon nebo univerzální barevné pilulky. Kontrast ověřit v prohlížeči. |

## Obsahové podklady: pokračujeme s pravdivou pracovní verzí

| Původní bod | Rozhodnutí do dodání skutečných podkladů |
|---|---|
| C7 Skutečné příběhy a souhlasy | Stávající postavy zůstávají modelové. Reálný příběh se zařadí až s doloženým zdrojem, souhlasem autora a popisem předaného dopadu. Redakční role náleží týmu výročí/DZS; nepřidělujeme ji vymyšlenému člověku. |
| C8 Fotografie a video | Použít existující licencované materiály a přiznaný obrazový doprovod. Žádné generované „autentické účastníky“ ani falešný archiv. Archivní fotografie se přidají až s ověřeným původem. |
| C9 Fotografie u čísel | Existující portréty představují modelové příběhy, nikoliv osoby ve statistice. Nenahrazovat je vymyšlenými autentickými absolventy. |
| D10 Loga a výroční lockup | Zachovat již dostupné značky Erasmus+ a DZS, výročí vyjádřit typograficky. Nevymýšlet oficiální nové logo ani schválení DZS. Další povinné formulace přidat podle skutečných podkladů. |
| D11 Čísla 2027 | Používat doložené hodnoty ze stats.ts s viditelným obdobím 2023/2026. Pracovní 500 000 nepoužít. Novější hodnotu lze nahradit až po ověření primárního zdroje. |

## Provoz a zveřejnění

- **Kontakty:** současný formulář ukládá podání pro tým výročí. Neprobíhá automatická rozesílka, CRM synchronizace ani slib odpovědi do pevné lhůty. Redakční zpracování a případné zveřejnění vyžadují skutečného provozovatele a souhlasy; v UI nic neimplementovaného neslibovat.
- **Analytika a cookies:** pro pracovní verzi bez nového měření, reklamních služeb a dalších souhlasových lišt. Před veřejným spuštěním bude rozsah vycházet ze skutečně zapojených služeb.
- **Akce a partneři:** nezveřejňovat vymyšlené termíny, místa a loga. Zatím vede zapojení přes funkční formulář.
- **Doména, hosting a launch:** současná fáze = lokální produkční náhled a ověřené dávky na GitHub main. Žádné placené služby ani nákup domény. Veřejné nasazení není součást této úpravy a nebude předbíhat ověření obsahu a provozovatele.

## Aktuální práce

Codex po výslovném HANDOFF-96 vlastní implementaci i QA. Pořadí: úklid štítků a generických dekorací → barva a ovládání mapy → izolovaný PoC kamery → společné mobilní a desktopové QA, vlastní review a push. Nové velké 3D vrstvy/GPU ribbon/Blender se nyní nezařazují: pro tuto fázi mají vyšší hodnotu fotografie, orientace a odezva na dotyk.
