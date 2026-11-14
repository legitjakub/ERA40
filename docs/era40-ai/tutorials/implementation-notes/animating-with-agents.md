# Animating with Agents (Animaxxing)

- **URL:** https://tympanus.net/codrops/2026/10/26/animating-agents-gsap-animaxxing/
- **Autor / datum:** John Polacek, 26. 10. 2026. Typ: tutoriál + workflow. Přečteno celé 14. 11. 2026.
- **Technologie:** Next.js App Router, GSAP (SplitText, Flip, ScrollTrigger), oficiální gsap-skills + animaxxing-skills, variabilní písmo Archivo (osy wdth/wght).

## Techniky
- **Motion brief (MOTION.md)** napsaný jednou větou osobnosti a pak doplněný hodnotami. Každý další prompt se na něj odkazuje, takže agent nemusí pokaždé znovu popisovat timing.
- Volba osobnosti ze tří typů (přesná / kinetický plakát / galerie), každá s konkrétními hodnotami (délka, ease, overshoot, stagger).
- Životní cyklus prvku: **intro → settled (statický nebo ambientní) → outro**.
- Nejdřív plánovací prompt („zeptej se na nejasnosti“), pak čistá session s build promptem.
- Kinetická typografie po osách variabilního fontu: šířka/váha, slova drží své místo, aby se řádek nepřelamoval.
- Page transition: kliknuté jméno „přeletí“ do titulku nové stránky (Flip, sdílený prvek).

## Implementační detaily, které stojí za převzetí
- Hero je skrytý do připravení animace, ale má **deadline**. Když JS nedorazí, obsah se ukáže sám.
- Písmo se načte **před** splitováním textu.
- Prvek měnící šířku si drží rezervované místo. Šířka se zamyká bez zaokrouhlení, protože 276,6 → 277 px stačilo k přelomení řádku.
- U prvku u okraje se nesmí použít ease s overshootem, jinak vznikne horizontální scroll.
- Back/forward přeskočí outro. Druhé kliknutí během outra se ignoruje a outro, které se zasekne, se vzdá.
- Smyčky mají pauzu (WCAG 2.2.2), pauzují mimo obraz a volba se pamatuje.

## Časté chyby (z článku)
- Layout shift při hover rozšíření slova (zaokrouhlení šířky).
- Na reálném telefonu problikl hotový obrázek před revealem a modrý tap highlight. Emulace to neodhalila.
- Katalog efektů „jako checklist“ je nudný. Pomohlo škrtat a přejmenovat efekty podle toho, co je vidět.

## Výkon a přístupnost
- Reduced motion = rovnou klidový stav. Bez JS je stránka čitelná. Focus kopíruje hover. Na dotyku hover nezůstává viset. Slider je nativní `input[type=range]`.

## Pro ERA40
- **Převzít postup:** brief → plánovací otázky → build → test → poučení zapsat do skillu. Pro ERA40 je motion brief `motion/MOTION.md`.
- **Převzít:** deadline proti prázdné stránce, fonty před split, rezervace šířky u `flexAxes`, žádný overshoot u prvků na okraji.
- **Nepřebírat:** „animate-all-the-things“ a cizí styl. ERA40 má jeden hlavní pohyb na kapitolu.
- Poučení ze smyčky „chyba → oprava → zápis do skillu“ je přesně Fáze 10 našeho workflow.
