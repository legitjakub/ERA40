import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const url = process.argv[2] || "http://127.0.0.1:3000";
const folder = "qa/motion";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const result = {};
await page.goto(url);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
const figure = page.locator('[data-section="prolog"] figure');
const top = await figure.evaluate(
  (el) => el.getBoundingClientRect().top + scrollY,
);
await page.evaluate((y) => scrollTo(0, y), top - 650);
await page.waitForTimeout(600);
const first = await figure.locator("canvas").evaluate((c) => c.toDataURL());
await page.evaluate((y) => scrollTo(0, y), top - 90);
await page.waitForTimeout(600);
const last = await figure.locator("canvas").evaluate((c) => c.toDataURL());
result.trainSequence = {
  changed: first !== last,
  firstEncodedLength: first.length,
  lastEncodedLength: last.length,
};
const scene = await page.evaluate(() => window.__eraRanges().pribehy);
await page.evaluate((y) => scrollTo(0, y), scene.start + 120);
await page.waitForTimeout(1200);
result.distortion = await page.evaluate(async () => {
  const canvas = document.querySelector("#pribehy > canvas");
  const gl = canvas.getContext("webgl");
  let rendered = false;
  const from = scrollY;
  for (let i = 0; i < 18; i++) {
    scrollTo(0, from + i * 25);
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r)),
    );
    if (canvas.style.opacity === "1") rendered = true;
  }
  return {
    available: Boolean(gl),
    renderedDuringScroll: rendered,
    width: canvas.width,
    height: canvas.height,
    error: gl?.getError(),
  };
});
await page.screenshot({ path: folder + "/story-transition.png" });
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(700);
result.reverseHero = await page
  .locator("h1")
  .evaluate((el) => ({
    opacity: getComputedStyle(el.parentElement).opacity,
    visible: el.getBoundingClientRect().top > 0,
  }));
await page.screenshot({ path: folder + "/reverse-hero.png" });
await browser.close();
await writeFile(folder + "/checks.json", JSON.stringify(result, null, 2));
console.log(result);
expect(result.trainSequence.changed).toBe(true);
expect(result.distortion.renderedDuringScroll).toBe(true);
expect(result.reverseHero.opacity).toBe("1");
