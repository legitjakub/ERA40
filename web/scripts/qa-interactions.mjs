import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const url = process.argv[2] || "http://127.0.0.1:3043";
const dir = "qa/interactions";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
const checks = [];
async function test(name, fn) {
  try {
    const detail = await fn();
    checks.push({ name, pass: true, detail });
  } catch (e) {
    checks.push({ name, pass: false, error: e.message });
  }
}
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(url);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1300);
await test("Desktop pin order", async () => {
  const r = await page.evaluate(() => window.__eraRanges());
  expect(r.hero.start).toBeLessThan(r.historie.start);
  expect(r.hero.end).toBeLessThan(r.historie.start);
  expect(r.historie.end).toBeLessThan(r.pribehy.start);
  return r;
});
await test("History direct milestone and reverse", async () => {
  const btn = page.locator("#historie ol button").last();
  await btn.click();
  await page.waitForTimeout(500);
  await expect(btn).toHaveAttribute("aria-current", "step");
  const first = page.locator("#historie ol button").first();
  await first.click();
  await page.waitForTimeout(500);
  await expect(first).toHaveAttribute("aria-current", "step");
});
await test("Pinned story focus and Flip dialog", async () => {
  const trigger = page.locator("[data-story-open]").last();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const d = page.locator("dialog[open]");
  await expect(d).toBeVisible();
  await expect(d).toContainText("Lucie a Marta");
  await page.waitForTimeout(750);
  await page.screenshot({ path: dir + "/desktop-dialog.png" });
  await page.keyboard.press("Escape");
  await expect(d).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
await test("Map list opens the matching narrative", async () => {
  const button = page
    .locator("#mapa")
    .getByRole("button", { name: "Lisabon → Praha", exact: true });
  await button.click();
  await expect(page.locator("dialog[open]")).toContainText("Inês");
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
});
await test("Manual comparison position persists while scrolling", async () => {
  const slider = page.getByRole("slider").first();
  await slider.focus();
  await slider.fill("35");
  await page.evaluate(() => scrollBy(0, 130));
  await page.waitForTimeout(450);
  await expect(slider).toHaveValue("35");
});
await test("Video pauses off screen and reduced preference updates live", async () => {
  await page.evaluate(() => scrollTo(0, 0));
  const player = page.locator("video");
  await expect.poll(() => player.evaluate((v) => v.paused)).toBe(false);
  await page
    .locator("#cisla")
    .evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY));
  await expect.poll(() => player.evaluate((v) => v.paused)).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator(".pin-spacer").count()).toBe(0);
  await expect.poll(() => player.evaluate((v) => v.paused)).toBe(true);
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole("button", { name: "Přehrát film", exact: true }).click();
  await expect.poll(() => player.evaluate((v) => v.paused)).toBe(false);
  await page
    .getByRole("button", { name: "Pozastavit film", exact: true })
    .click();
  await expect.poll(() => player.evaluate((v) => v.paused)).toBe(true);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect
    .poll(() => page.locator(".pin-spacer").count())
    .toBeGreaterThan(0);
});
await test("Breakpoint rotation removes and recreates desktop pins", async () => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect.poll(() => page.locator(".pin-spacer").count()).toBe(0);
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect.poll(() => page.locator(".pin-spacer").count()).toBe(3);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.locator(".pin-spacer").count()).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});
await test("Mobile story rail is natively swipeable", async () => {
  const rail = page
    .locator("#pribehy [data-story-spread]")
    .first()
    .locator("..");
  const result = await rail.evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
    return { left: el.scrollLeft, max: el.scrollWidth - el.clientWidth };
  });
  expect(result.left).toBeGreaterThan(0);
  return result;
});
await test("Mobile portrait film selects the mobile rendition", async () => {
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(800);
  const source = await page.locator("video").evaluate((v) => v.currentSrc);
  expect(source).toContain("hero-mobile");
  return source;
});
await test("Closing CTA leads to the participation form", async () => {
  const href = await page
    .locator("#budoucnost")
    .getByRole("link", { name: /Zapsat/ })
    .getAttribute("href");
  expect(href).toBe("/zapojte-se#pribeh");
  return href;
});
await test("Deep link survives reload and browser Back closes overlay", async () => {
  await page.goto(url + "/#pribeh/lipsko");
  await expect(page.locator("dialog[open]")).toContainText("Ondřej");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await page
    .locator("#mapa")
    .getByRole("button", { name: "Lyon", exact: true })
    .click();
  await expect(page.locator("dialog[open]")).toContainText("Martin");
  await page.goBack();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
});
await page.close();
await test("Content survives WebGL unavailability", async () => {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await ctx.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (kind.startsWith("webgl")) return null;
      return original.call(this, kind, ...args);
    };
  });
  const p = await ctx.newPage();
  await p.goto(url);
  await p.waitForTimeout(1000);
  await p
    .locator("#pribehy")
    .evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY));
  await p.waitForTimeout(800);
  await expect(p.locator("[data-story-open]")).toHaveCount(8);
  await expect(p.locator("#pribehy img").first()).toBeVisible();
  await ctx.close();
});
await browser.close();
checks.push({
  name: "No uncaught browser errors",
  pass: errors.length === 0,
  detail: errors,
});
await writeFile(dir + "/checks.json", JSON.stringify(checks, null, 2));
console.log(
  checks
    .map(
      (x) =>
        (x.pass ? "PASS " : "FAIL ") + x.name + (x.error ? " " + x.error : ""),
    )
    .join("\n"),
);
if (checks.some((c) => !c.pass)) process.exitCode = 1;
