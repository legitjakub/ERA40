import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const dir = "qa/live-references";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const [id, url] of [
  ["tracing-art", "https://www.getty.edu/tracingart/"],
  ["inkwell", "https://inkwell.tech/"],
  ["savor", "https://www.savor.it/"],
  ["lando", "https://landonorris.com/"],
  ["paper-planes", "https://paperplanes.world/"],
  ["pangram", "https://pangrampangram.com/"],
  ["unseen", "https://unseen.co/"],
  ["zentry", "https://zentry.com/"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(3500);
    const state = () =>
      page.evaluate(() => ({
        url: location.href,
        title: document.title,
        scroll: scrollY,
        height: document.documentElement.scrollHeight,
        text: document.body.innerText.slice(0, 1700),
        canvases: document.querySelectorAll("canvas").length,
        video: document.querySelectorAll("video").length,
      }));
    const before = await state();
    await page.screenshot({
      path: dir + "/" + id + "-before.png",
      timeout: 10000,
    });
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(1400);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(1400);
    const after = await state();
    await page.screenshot({
      path: dir + "/" + id + "-after.png",
      timeout: 10000,
    });
    results.push({ id, status: response.status(), before, after });
    console.log(id, response.status(), before.scroll, after.scroll);
  } catch (error) {
    results.push({ id, url, error: error.message });
    console.log(id, error.message.slice(0, 80));
  }
  await page.close();
}
await browser.close();
await writeFile(dir + "/observations.json", JSON.stringify(results, null, 2));
