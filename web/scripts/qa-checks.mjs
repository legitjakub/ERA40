// Run against the production server after building. Set AXE_SCRIPT if axe-core lives outside web/.
import { chromium, expect } from "@playwright/test";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    url: { type: "string", default: "http://127.0.0.1:3040" },
    out: { type: "string", default: "qa/checks" },
  },
});
const dest = resolve(values.out);
await mkdir(dest, { recursive: true });
const axePath =
  process.env.AXE_SCRIPT ||
  createRequire(import.meta.url).resolve("axe-core/axe.min.js");
const browser = await chromium.launch();
const results = [];
const run = async (name, action) => {
  try {
    const evidence = await action();
    results.push({ name, pass: true, evidence });
  } catch (e) {
    results.push({ name, pass: false, error: e.message });
  }
};

async function axe(page, area) {
  await page.addScriptTag({ path: axePath });
  const report = await page.evaluate(async () => {
    const { violations, incomplete } = await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      },
    });
    return {
      violations: violations.map(({ id, help, impact, nodes }) => ({
        id,
        help,
        impact,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      })),
      incomplete: incomplete.map(({ id, nodes }) => ({
        id,
        count: nodes.length,
      })),
    };
  });
  await writeFile(`${dest}/axe-${area}.json`, JSON.stringify(report, null, 2));
  if (report.violations.length)
    throw new Error(report.violations.map((v) => v.id).join(", "));
  return report;
}

async function openStory(page, control) {
  await control.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(dialog).toBeVisible({ timeout: 4000 });
  await expect.poll(() => page.evaluate(() => location.hash)).toMatch(/.+/);
  await page.waitForTimeout(600);
  const hash = new URL(page.url()).hash;
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    if (!(await dialog.evaluate((d) => d.contains(document.activeElement))))
      throw new Error("Tab left the open dialog");
  }
  await page.screenshot({
    path: `${dest}/detail-${page.viewportSize().width}.png`,
  });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(control).toBeFocused();
  return hash;
}

try {
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
  ]) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      isMobile: width === 390,
      hasTouch: width === 390,
      reducedMotion: "reduce",
      locale: "cs-CZ",
    });
    const page = await ctx.newPage();
    page.setDefaultTimeout(3500);
    await page.goto(values.url, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);
    await run(`reduced-motion-${width}`, async () => {
      const counts = await page.evaluate(() => ({
        pins: document.querySelectorAll(".pin-spacer").length,
        videosPlaying: [...document.querySelectorAll("video")].filter(
          (v) => !v.paused,
        ).length,
        canvases: [...document.querySelectorAll("canvas")].filter(
          (x) => x.getBoundingClientRect().width > 0,
        ).length,
        sections: [...document.querySelectorAll("section[data-section]")].map(
          (s) => ({
            id: s.dataset.section,
            height: Math.round(s.getBoundingClientRect().height),
          }),
        ),
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      }));
      if (
        !counts.reduced ||
        counts.pins ||
        counts.videosPlaying ||
        counts.sections.length !== 8 ||
        counts.sections.some((s) => s.height === 0)
      )
        throw new Error(JSON.stringify(counts));
      return counts;
    });
    await run(`skip-link-${width}`, async () => {
      await page.keyboard.press("Tab");
      await expect(page.locator(":focus")).toHaveText(/Přeskočit/i);
      await page.keyboard.press("Enter");
      await expect
        .poll(() => page.evaluate(() => location.hash))
        .toMatch(/main|obsah/);
    });
    await run(`chapters-keyboard-${width}`, async () => {
      const menu = page.getByRole("button", { name: /kapitol|menu/i }).first();
      await menu.focus();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog").filter({ visible: true });
      await expect(dialog).toBeVisible();
      const links = dialog.locator("a[href^='#']");
      await expect(links).toHaveCount(8);
      await page.keyboard.press("Tab");
      if (!(await dialog.evaluate((d) => d.contains(document.activeElement))))
        throw new Error("Tab left chapter index");
      await page.screenshot({ path: `${dest}/index-${width}.png` });
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(menu).toBeFocused();
    });
    await run(`story-keyboard-${width}`, () =>
      openStory(
        page,
        page
          .locator('[data-section="pribehy"]')
          .getByRole("button", { name: /číst|příběh|otevřít/i })
          .last(),
      ),
    );
    await run(`map-keyboard-${width}`, () =>
      openStory(
        page,
        page.locator('[data-section="evropa"] button:visible').last(),
      ),
    );
    await run(`comparison-keyboard-${width}`, async () => {
      const slider = page.getByRole("slider").first();
      await slider.focus();
      const previous = Number(await slider.inputValue());
      await page.keyboard.press(previous > 0 ? "ArrowLeft" : "ArrowRight");
      await expect
        .poll(async () => Number(await slider.inputValue()))
        .not.toBe(previous);
      return { before: previous, after: Number(await slider.inputValue()) };
    });
    await page.keyboard.press("Escape");
    await page.evaluate(() => scrollTo(0, 0));
    await run(`axe-reduced-${width}`, () => axe(page, `reduced-${width}`));
    await ctx.close();
  }
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  const res = await page.goto(values.url);
  const markup = await res.text();
  const modernMarkup = markup.replace(
    /<script\b[^>]*\bnoModule[^>]*><\/script>/gi,
    "",
  );
  const srcs = [
    ...new Set(
      [...modernMarkup.matchAll(/<script\b[^>]*?\bsrc="([^"]+)"/g)].map(
        (m) => new URL(m[1], values.url).href,
      ),
    ),
  ];
  const scripts = [];
  for (const src of srcs) {
    const response = await page.request.get(src);
    const body = await response.body();
    scripts.push({
      file: new URL(src).pathname,
      raw: body.length,
      gzip: gzipSync(body, { level: 9 }).length,
    });
  }
  await writeFile(
    `${dest}/initial-js.json`,
    JSON.stringify(
      {
        initialGzipBytes: scripts.reduce((sum, s) => sum + s.gzip, 0),
        scripts,
      },
      null,
      2,
    ),
  );
  await page.waitForTimeout(1250);
  await run("axe-desktop-hero", () => axe(page, "desktop-hero"));
  await page.close();
} finally {
  await browser.close();
  await writeFile(`${dest}/checks.json`, JSON.stringify(results, null, 2));
}
console.log(
  results
    .map((k) => `${k.pass ? "PASS" : "FAIL"} ${k.name} ${k.error || ""}`)
    .join("\n"),
);
if (results.some((k) => !k.pass)) process.exitCode = 1;
