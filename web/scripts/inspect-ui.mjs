import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("qa/inspection", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("pageerror", (e) => console.log(e.message));
await p.goto("http://127.0.0.1:3040");
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1700);
console.log(
  await p
    .locator("h1")
    .evaluate((el) => ({
      style: getComputedStyle(el).cssText,
      font: getComputedStyle(el).fontFamily,
      variation: getComputedStyle(el).fontVariationSettings,
      letter: getComputedStyle(el).letterSpacing,
      stretch: getComputedStyle(el).fontStretch,
      text: el.textContent,
      html: el.outerHTML,
      range: window.__eraRanges?.(),
    })),
);
await p.locator("h1").evaluate((el) => {
  el.style.fontVariationSettings = '"wdth" 85,"wght" 750';
  el.style.letterSpacing = "-.025em";
});
await p.screenshot({ path: "qa/inspection/type.png" });
for (const id of [
  "historie",
  "pribehy",
  "mapa",
  "tehdy-ted",
  "cisla",
  "budoucnost",
]) {
  await p
    .locator("#" + id)
    .evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY));
  await p.waitForTimeout(1100);
  await p.screenshot({ path: "qa/inspection/" + id + ".png" });
}
await b.close();
