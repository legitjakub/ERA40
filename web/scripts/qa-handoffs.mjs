// Homepage story cuts and Spec 008B, including reverse, anchors and cleanup.
import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: {
  url: { type: "string", default: "http://127.0.0.1:3000" },
  out: { type: "string", default: "/private/tmp/era40-handoffs" },
} });
await mkdir(values.out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
const report = [], errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route("**/api/kontakty", (route) => route.abort());
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
const stories = page.locator("#pribehy");
const axis = page.locator("[data-axis-handoff]");
const jump = async (y) => {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(650);
};
const ready = async () => {
  await page.evaluate(() => document.fonts.ready);
  await expect(stories).toHaveAttribute("data-enhanced", "true");
  await page.waitForFunction(() => Boolean(window.__eraRanges?.().pribehy));
};
async function phase(which, progress) {
  const range = await page.evaluate((scene) => {
    if (scene === "stories") {
      const { start, end } = window.__eraRanges().pribehy;
      return [start, end];
    }
    const section = document.querySelector("#cisla");
    const top = section.getBoundingClientRect().top + scrollY;
    return [top - innerHeight, top - parseFloat(getComputedStyle(section).scrollMarginTop)];
  }, which);
  await jump(range[0] + progress * (range[1] - range[0]));
}

try {
  await page.goto(values.url, { waitUntil: "networkidle" });
  await ready();
  await expect(stories.locator("[data-story-open]")).toHaveCount(3);
  await expect(page.locator("[data-history-handoff], [data-journey-overlay]")).toHaveCount(0);
  const bounds = [0.07, .25, .46, .69, .87];
  const wanted = ["valencie", "ucitelka", "ucitelka", "praha-in", "praha-in"];
  // Use precise midpoints for the snapshots and unambiguous settled samples for a11y state.
  for (const [indices, direction] of [[[0, 1, 2, 3, 4], "down"], [[4, 3, 2, 1, 0], "up"]]) {
    for (const index of indices) {
      await phase("stories", bounds[index]);
      if (index % 2 === 1) {
        await expect(stories.locator("[data-cutting]")).toHaveCount(1);
        const mask = await stories.locator("[data-photo-wipe]").nth(index === 1 ? 1 : 2)
          .evaluate((el) => getComputedStyle(el).clipPath);
        expect(mask).not.toBe("inset(0px)");
        expect(mask).not.toContain("100%");
      } else {
        await expect(stories.locator("[data-cutting]")).toHaveCount(0);
        await expect(stories.locator("[data-active=true][data-story-spread]"))
          .toHaveAttribute("id", "story-" + wanted[index]);
      }
      await page.screenshot({ path: `${values.out}/1440-stories-${direction}-${index}.jpg` });
    }
  }
  report.push({ check: "two reversible cuts and three stable stops", pass: true });

  const slider = page.locator("#tehdy-ted input[type=range]");
  await slider.focus();
  await slider.fill("35");
  for (const p of [.25, .5, .75, .5, .25]) {
    await phase("axis", p);
    await expect(axis).toHaveAttribute("data-active", "true");
    await expect(slider).toHaveValue("35");
  }
  await phase("axis", 1.15);
  await expect(axis).toHaveAttribute("data-active", "false");
  report.push({ check: "comparison to numbers handoff and fast exit", pass: true });

  await phase("stories", .25);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(stories.locator("[inert]")).toHaveCount(0);
  await expect(stories.locator("[data-photo-wipe]").nth(1)).toHaveCSS("clip-path", "none");
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready();
  await phase("stories", .25);
  await expect(stories.locator("[data-cutting]")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(stories.locator("[inert]")).toHaveCount(0);
  await expect(stories.locator("[data-cutting]")).toHaveCount(0);
  await expect(stories.locator("[data-photo-wipe]").nth(1)).toHaveCSS("clip-path", "none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await ready();
  report.push({ check: "resize and live reduced-motion cleanup", pass: true });

  for (const id of ["pribehy", "historie", "mapa", "cisla"]) {
    await page.goto(`${values.url}/#${id}`, { waitUntil: "networkidle" });
    await ready();
    await expect.poll(async () => {
      const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
      return Math.min(Math.abs(top), Math.abs(top - 64));
    }).toBeLessThan(7);
    if (id === "mapa") await expect(page.locator("#mapa")).toHaveAttribute("data-active-story", "valencie");
  }
  await page.goto(`${values.url}/pribehy`, { waitUntil: "networkidle" });
  await expect(axis).toHaveCount(0);
  await page.goBack({ waitUntil: "networkidle" });
  await ready();
  await phase("axis", .5);
  await expect(axis).toHaveAttribute("data-active", "true");
  report.push({ check: "direct chapters and Back", pass: true });
  expect(errors).toEqual([]);
} catch (error) {
  report.push({ check: "failure", error: error.stack, pass: false });
  await page.screenshot({ path: `${values.out}/failure.jpg` });
  process.exitCode = 1;
} finally {
  report.push({ check: "browser errors", errors, pass: errors.length === 0 });
  await writeFile(`${values.out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}
