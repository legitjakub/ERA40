# Scroll-synchronized animation: video vs. frame sequence (OPTIKKA)

- **URL:** https://tympanus.net/codrops/2025/10/16/creating-smooth-scroll-synchronized-animation-for-optikka-from-html5-video-to-frame-sequences/
- **Autor / datum:** Zajno, 16. 10. 2025. Typ: případová studie. Přečteno celé 14. 11. 2026 (Chrome). ⚠️ starší než rok.
- **Technologie:** GSAP ScrollTrigger, canvas 2D, FFmpeg (PNG → WebP), paralelní načítací fronta.

## Zjištění
- **`video.currentTime = progress × duration`** je jednoduché (1 soubor, dobrá komprese), ale na mobilu se seká, reverse je horší a autoplay je omezený. Přesnost seekování závisí na rozestupu keyframů. Kdo zůstává u videa, musí ho kódovat s keyframem v každém snímku (`-g 1`), což zvětší soubor.
- **Frame sequence:** FFmpeg `fps=30` do PNG a pak do WebP q80. Sady snímků zvlášť pro desktop a mobil (méně snímků, jiný poměr stran).
- **Načítání:** prvních ~10 snímků hned (první frame je vidět okamžitě), zbytek paralelní frontou na pozadí. Při scrollu se přednačítá 5 snímků ve směru pohybu.
- **Render:** canvas 2D + `drawImage` s výpočtem cover a DPR. `<img>` swap problikává.
- **Smyčka na startu:** úvodní loop snímků, při prvním scrollu plynulý tween do scroll-řízeného snímku (GSAP na `{contents}`), při návratu na 0 zpět do loopu.
- **Cena:** víc požadavků a dat, složitější cache.

## Pro ERA40
- DESIGN §7 P1 počítá s „okno vlaku“ sekvencí (80–120 snímků) mezi Prologem a Historií. Tohle je ověřený postup: AVIF/WebP, canvas, postupné načítání a přednačítání podle směru.
- Hero film zůstává jako **přehrávané** video (schváleno). Scrubovat ho nechceme, scrub by sebral filmový pocit a na mobilu by se sekal.
- Reduced motion: statický klíčový snímek. Mobil: méně snímků, nebo jen 3 klíčové fotky s crossfade.
- Rozpočet: ~100 snímků × ~25 KB AVIF ≈ 2,5 MB. Načítat až při přiblížení sekce (IO rootMargin).
