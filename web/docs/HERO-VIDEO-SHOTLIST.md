# Film Odjezd

Střih a technická kontrola proběhly 13. listopadu 2026. Všechny použité záběry jsou současný ilustrativní materiál Pexels. Osoby ve filmu nezastupují modelové postavy ani doložené účastníky Erasmu. Autor není u všech klipů strojově ověřen, proto kredity odkazují na jednotlivé zdrojové stránky.

## Desktop

| Čas | Obraz | Pexels ID |
|---|---|---|
| 0–3 s | Odjezdová tabule a nástupiště | 31751324 |
| 3–7 s | Balení kufru | 7429368 |
| 7–9,5 s | Cestující v nádražní hale | 29620090 |
| 9,5–14,5 s | Okno jedoucího vlaku | 4832768 |
| 14,5–19,5 s | Příjezd, pohled do města z vlaku | 27874072 |
| 19,5–23,5 s | Společné studium v knihovně | 8199379 |
| 23,5–28,5 s | Večerní setkání přátel | 7645530 |
| 28,5–32,5 s | Zpáteční pohled z okna | 4832768 |
| 32,5–36 s | Návrat na úvodní nástupiště | 31751324 |

Z původní nabídky byl vyřazen záběr s rozpoznatelným americkým univerzitním nápisem. Pro příjezd do města byl použit evropsky působící městský záběr. Film konkrétní místo tohoto příjezdu nepojmenovává.

## Mobil

Třicetisekundový svislý střih má vlastní sled záběrů. Přijíždějící noční vlak → kufr → jízda krajinou → městská tramvaj → skupina mladých lidí → výhled z vlaku do města → návrat do noční stanice. Zdrojové klipy mají ID 9142477, 14536989, 37954692, 7683346, 34900857 a 27874072. Skutečné pořadí a přesné vstupní časy jsou v `scripts/build-hero.sh`.

## Rendice

- Desktop 1920 × 1080, 24 fps, 36 sekund, MP4 H.264 a WebM VP9.
- Mobil 720 × 1280, 24 fps, 30 sekund, MP4 H.264 a WebM VP9.
- Dva AVIF postery odpovídají příslušnému prvnímu záběru.
- Tichý střih. Ovládání zvuku se nezobrazuje.
- MP4 mají `faststart`. Skript kontroluje limit 4 000 000 bajtů a 2 000 000 bajtů i u WebM.
- HLG záběr krajiny se před střihem převádí do SDR BT.709.
- Přehrávání se pozastaví mimo viewport a při skrytí dokumentu. Uživatelské pozastavení zůstane zachováno při návratu do úvodu.
- Při omezeném pohybu je poster doplněný tlačítkem pro ruční přehrání. Nativní zdroje zůstávají stabilní, aby přepnutí preference nepřerušilo dostupnost ovládání.

## Znovuvytvoření

`npm run media:fetch` stáhne zdroje do lokální cache. Poté `npm run media:hero` vyžaduje FFmpeg na PATH s libx264, libvpx-vp9 a filtrem zscale. Postery vyrábí Sharp. V tomto prostředí byl použit FFmpeg z `/private/tmp/ffbin/ffmpeg`, cesta je předatelná proměnnou `FFMPEG`. Hotové rendice jsou součástí projektu a pro běžné spuštění se znovu nestříhají.
