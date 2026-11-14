// Spec 008 integration: geometry, reverse, interruption, anchors and lifecycle.
import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
const { values } = parseArgs({ options: {
  url: { type: "string", default: "http://127.0.0.1:3000" },
  out: { type: "string", default: "/private/tmp/era40-handoffs" },
} });
await mkdir(values.out, { recursive: true });
const browser = await chromium.launch();
const report = [], errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route("**/api/kontakty", (route) => route.abort());
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
const jump = async (y) => {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(750);
};
const ready = async () => {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForSelector("#pribehy[data-enhanced]");
  await page.waitForTimeout(1000);
};
async function ranges() {
  return page.evaluate(() => {
    const people = window.__eraRanges().pribehy;
    const numberElement = document.querySelector("#cisla");
    const numbers = numberElement.getBoundingClientRect().top + scrollY;
    const inset = parseFloat(getComputedStyle(numberElement).scrollMarginTop) || 0;
    return { history: [people.start - innerHeight, people.start - inset], axis: [numbers - innerHeight, numbers - inset] };
  });
}
async function phase(which, p) {
  const [start, end] = (await ranges())[which];
  await jump(start + p * (end - start));
}
try {
  await page.goto(values.url, { waitUntil: "networkidle" }); await ready();
  for (const which of ["history", "axis"]) {
    if (which === "axis") {
      const slider = page.locator("#tehdy-ted input[type=range]");
      await slider.focus(); await slider.fill("35"); await expect(slider).toHaveValue("35");
    }
    const overlay = page.locator(which === "history" ? "[data-history-handoff]" : "[data-axis-handoff]");
    for (const [direction, stops] of [["down", [0, .25, .5, .75, .99, 1]], ["up", [1, .75, .5, .25, 0]]]) {
      for (const p of stops) {
        await phase(which, p);
        await expect(overlay).toHaveAttribute("data-active", String(p > 0 && p < 1));
        if (which === "history" && p > 0 && p < 1) {
          expect(await overlay.locator("img").evaluateAll((imgs) => imgs.every((img) => img.complete && img.naturalWidth))).toBe(true);
          await expect(page.locator("#pribehy canvas")).toHaveCSS("opacity", "0");
          const uniform = await overlay.locator("img").evaluateAll((imgs) => imgs.every((img) => {
            const m = new DOMMatrix(getComputedStyle(img).transform);
            return Math.abs(m.a - m.d) < .001;
          }));
          expect(uniform).toBe(true);
        }
        if (which === "axis") await expect(page.locator("#tehdy-ted input[type=range]")).toHaveValue("35");
        await page.screenshot({ path: `${values.out}/1440-${which}-${direction}-${Math.round(p * 100)}.jpg` });
      }
    }
    report.push({ check: which + " forward/reverse", pass: true });
  }
  // Immediate jumps outside either boundary must restore originals, even during scrub catch-up.
  for (const which of ["history", "axis"]) {
    await phase(which, .5);
    const [, end] = (await ranges())[which];
    await jump(end + 400);
    await expect(page.locator("[data-history-handoff]")).toHaveAttribute("data-active", "false");
    await expect(page.locator("[data-axis-handoff]")).toHaveAttribute("data-active", "false");
  }
  report.push({ check: "fast exit restores originals", pass: true });

  await phase("history", .5);
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(800);
  expect(await page.locator(".pin-spacer").count()).toBe(0);
  await expect(page.locator("#historie [data-history-frame]").locator("..")).not.toHaveCSS("visibility", "hidden");
  await expect(page.locator("#pribehy [data-photo-wipe]").first()).not.toHaveCSS("visibility", "hidden");
  await page.screenshot({ path: `${values.out}/390-resize.jpg` });
  await page.setViewportSize({ width: 1440, height: 900 }); await ready();
  await phase("history", .5);
  await expect(page.locator("[data-history-handoff]")).toHaveAttribute("data-active", "true");
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.waitForTimeout(600);
  expect(await page.locator(".pin-spacer").count()).toBe(0);
  await expect(page.locator("[data-history-handoff]")).toHaveAttribute("data-active", "false");
  await page.emulateMedia({ reducedMotion: "no-preference" }); await ready();
  await phase("history", .5);
  await expect(page.locator("[data-history-handoff]")).toHaveAttribute("data-active", "true");
  report.push({ check: "resize and live reduced-motion cleanup/recreate", pass: true });

  for (const id of ["pribehy", "cisla"]) {
    await page.goto(`${values.url}/#${id}`, { waitUntil: "networkidle" }); await ready();
    await expect(page.locator("[data-history-handoff]")).toHaveAttribute("data-active", "false");
    await expect(page.locator("[data-axis-handoff]")).toHaveAttribute("data-active", "false");
    const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.min(Math.abs(top), Math.abs(top - 64))).toBeLessThan(5);
    await page.screenshot({ path: `${values.out}/1440-anchor-${id}.jpg` });
  }
  await page.goto(`${values.url}/pribehy`, { waitUntil: "networkidle" });
  await expect(page.locator("[data-history-handoff]")).toHaveCount(0);
  await page.goBack({ waitUntil: "networkidle" }); await ready();
  await phase("axis", .5);
  await expect(page.locator("[data-axis-handoff]")).toHaveAttribute("data-active", "true");
  report.push({ check: "direct anchors and navigation Back", pass: true });
  expect(errors).toEqual([]);
} catch (error) {
  report.push({ check: "failure", error: error.stack, pass: false });
  await page.screenshot({ path: `${values.out}/failure.jpg` });
  process.exitCode = 1;
} finally {
  report.push({ check: "browser errors", errors, pass: errors.length === 0 });
  await writeFile(`${values.out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close(); console.log(JSON.stringify(report, null, 2));
}
