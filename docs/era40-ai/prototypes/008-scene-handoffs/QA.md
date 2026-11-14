# Vizuální revize 008 — 15. 11. 2026

Oba koncepty i jejich integraci Jakub výslovně schválil. Prototyp zůstává samostatnou pomůckou; produkční implementace je v `web/src/components/scenes/SceneHandoffs.*`.

Testováno při 1920/1440/1280/1024/768/390/375/360 px. Desktopové fáze 0/.25/.5/.75/1 vpřed i zpět, přerušení přehrávače ručním posuvníkem, změna výchozího děliče, mobilní statické pořadí, OS i ruční reduced motion. 0 JS errors, 0 přetečení a 0 axe violations. Důkazy: `/private/tmp/era40-main-20261114/prototype008/report.json` a skutečně prohlédnuté screenshoty stejné složky.

Refinement: průsvitné prolínání dvou různých tváří bylo rušivé. Ani směrová maska neposkytla klidný střední snímek. Finální varianta drží souvislý rám a uvnitř použije obrazový střih v p .5. U čísel zůstávají hodnota, období a zdroj plně čitelné; nadpis čeká, až jej linka nekříží.

Produkční QA následně odhalilo potřebu respektovat 64px odstup kotev pod navigací. Cíl i konec předávky se měří se stejným odstupem. Finální regrese, limity a předání jsou v [reportu desktop session](../../../agent-reports/CDX-desktop-007-008.md).
