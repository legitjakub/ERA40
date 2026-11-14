# Výkonová pravidla

Cíle (z awwwards/quality-bar a DESIGN): desktop ≥ 55 fps při scrollu, mobil LCP < 2,5 s, CLS < 0,05, INP < 200 ms.

1. Animovat jen `transform`, `opacity`, `clip-path` (a `filter` střídmě). Ne width/height/top/left. Výjimka: měřená výška akordeonu.
2. `will-change` jen během animace, potom odebrat (gsap-nextjs přebíjí gsap-performance).
3. Žádné tweeny ani React state v rAF/scroll handleru. Používat `quickTo`, `quickSetter` nebo ref + style.
4. ScrollTriggery vytvářet shora dolů. Jinak použít `ScrollTrigger.sort()` (SmoothScroll to dělá po `fonts.ready`).
5. Předek pinu nesmí mít `transform` / `will-change` / `content-visibility` (rozbije to pin a měření).
6. Mimo obraz zastavit: video (IO), WebGL (IO + visibilitychange), smyčky.
7. WebGL: DPR ≤ 2 (mobil ≤ 1,5), jeden canvas, dispose geometrie, materiálů a textur, sdílení textur, context loss = DOM fallback.
8. SplitText jen na viditelných nadpisech, revert po dokončení, pokud split není potřeba (méně DOM uzlů).
9. Lenis jen desktop + pointer fine. Safari 60 fps cap a low power 30 fps jsou známé limity (Lenis README).
10. Obrázky: AVIF/WebP, `next/image`, `fetchPriority="high"` jen pro LCP.
11. Měřit v produkční sestavě (`npm run build && npm run start`), ne v dev.
