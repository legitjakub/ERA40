// Visual QA matrix for motion work (docs/era40-ai/workflows/visual-qa.md).
// Eight widths (docs/orchestration/ORCHESTRATION.md §7) × scroll positions forward and back, a fast scroll, reduced motion,
// console errors and horizontal overflow. Screenshots are evidence to LOOK AT.
// The contact API is blocked so QA never stores personal data.
//
//   node scripts/qa-viewports.mjs --url http://127.0.0.1:3000 --path / --out qa/viewports
//   options: --widths 1920,1440,1280,1024,768,390,375,360  --stops 0,0.15,0.3,0.5,0.7,0.9,1
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    url: { type: "string", default: "http://127.0.0.1:3000" },
    path: { type: "string", default: "/" },
    out: { type: "string", default: "qa/viewports" },
    widths: { type: "string", default: "1920,1440,1280,1024,768,390,375,360" },
    stops: { type: "string", default: "0,0.15,0.3,0.5,0.7,0.9,1" },
  },
});

const heights = { 1920: 1080, 1440: 900, 1280: 800, 1024: 768, 768: 1024, 390: 844, 375: 812, 360: 780 };
const widths = values.widths.split(",").map(Number);
const stops = values.stops.split(",").map(Number);
const dest = resolve(values.out);
await mkdir(dest, { recursive: true });

const browser = await chromium.launch();
const report = [];

async function settle(page, ms = 700) {
  await page.waitForTimeout(ms);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

async function scrollTo(page, fraction) {
  await page.evaluate((f) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({ top: Math.round(max * f), behavior: "instant" });
  }, fraction);
}

for (const width of widths) {
  for (const reduced of [false, true]) {
    const mobile = width < 768;
    const context = await browser.newContext({
      viewport: { width, height: heights[width] ?? 900 },
      isMobile: mobile,
      hasTouch: mobile,
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const tag = `${width}${reduced ? "-reduced" : ""}`;
    const entry = { width, reduced, console: [], pageErrors: [], overflow: [], shots: [] };
    let blocked = 0;
    await page.route("**/api/kontakty", (r) => {
      blocked++;
      return r.abort();
    });
    page.on("console", (m) => m.type() === "error" && entry.console.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => entry.pageErrors.push(String(e).slice(0, 200)));

    const t0 = Date.now();
    await page.goto(values.url + values.path, { waitUntil: "networkidle" });
    entry.loadMs = Date.now() - t0;
    await settle(page, 1200);

    const pass = async (direction, list) => {
      for (const stop of list) {
        await scrollTo(page, stop);
        await settle(page);
        const file = `${tag}-${direction}-${String(Math.round(stop * 100)).padStart(3, "0")}.jpg`;
        await page.screenshot({ path: `${dest}/${file}`, type: "jpeg", quality: 60 });
        entry.shots.push(file);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (over > 1) entry.overflow.push({ direction, stop, px: over });
      }
    };
    await pass("down", stops);
    await pass("up", [...stops].reverse());

    // Fast scroll: jump through the page without settling, then check for stuck states.
    for (const stop of [0.2, 0.8, 0.1, 1, 0]) await scrollTo(page, stop);
    await settle(page, 1200);
    await page.screenshot({ path: `${dest}/${tag}-fast-return.jpg`, type: "jpeg", quality: 60 });
    entry.shots.push(`${tag}-fast-return.jpg`);

    entry.apiBlocked = blocked;
    report.push(entry);
    await context.close();
    console.log(
      `${tag}: load ${entry.loadMs} ms, console ${entry.console.length}, errors ${entry.pageErrors.length}, overflow ${entry.overflow.length}`,
    );
  }
}

await writeFile(`${dest}/report.json`, JSON.stringify(report, null, 2));
await browser.close();
const failed = report.some((r) => r.pageErrors.length || r.overflow.length);
console.log(failed ? "FAIL: see report.json" : "PASS: no page errors or overflow");
process.exitCode = failed ? 1 : 0;
