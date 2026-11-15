import { chromium, expect } from "../../../../web/node_modules/@playwright/test/index.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const out = process.env.ERA40_CAMERA_QA_OUT || "/private/tmp/era40-camera-015-qa";
await mkdir(out, { recursive: true });
const routes = JSON.parse(await readFile(new URL("routes.json", import.meta.url)));
const browser = await chromium.launch();
const report = [];
try {
  for (const width of [360, 390, 430, 1440]) {
    for (const reduced of [false, true]) {
      const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 900 }, reducedMotion: reduced ? "reduce" : "no-preference" });
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.goto("http://127.0.0.1:3074", { waitUntil: "networkidle" });
      const follow = page.locator("#follow");
      const activeCamera = width >= 1024 && !reduced;
      if (activeCamera) { await follow.focus(); await page.keyboard.press("Space"); await expect(follow).toBeChecked(); }
      else await expect(follow).toBeDisabled();
      const evidence = [];
      for (const route of routes) {
        const button = page.locator(`[data-route="${route.id}"]`);
        await button.focus(); await page.keyboard.press("Enter");
        await expect(button).toHaveAttribute("aria-pressed", "true");
        await page.waitForTimeout(500);
        const box = await page.locator("#map").evaluate(svg => svg.getAttribute("viewBox").split(" ").map(Number));
        const zoom = 840 / box[2];
        if (zoom > 1.60001) throw new Error("Camera exceeds 1.6×");
        for (const point of [route.a, route.b]) {
          if (point[0] < box[0] || point[0] > box[0] + box[2] || point[1] < box[1] || point[1] > box[1] + box[3]) throw new Error(`Endpoint outside view: ${route.id}`);
        }
        if (!activeCamera) expect(box).toEqual([0, 0, 840, 870]);
        evidence.push({ id: route.id, zoom: +zoom.toFixed(3), endpoints: true });
      }
      if (activeCamera) {
        await page.locator("[data-route]").evaluateAll(buttons => { for (const b of buttons) b.click(); });
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${out}/${width}-camera.png` });
        await page.locator("#overview").click(); await page.waitForTimeout(500);
        await expect(page.locator("#zoom")).toContainText("1,00×");
        await follow.check(); await page.waitForTimeout(500);
        await page.setViewportSize({ width: 390, height: 844 });
        await expect(follow).toBeDisabled();
        await expect(page.locator("#map")).toHaveAttribute("viewBox", "0.000 0.000 840.000 870.000");
      }
      await page.screenshot({ path: `${out}/${width}-${reduced ? "reduced" : "normal"}.png` });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(errors).toEqual([]); expect(overflow).toBe(0);
      report.push({ width, reduced, routes: evidence, errors, overflow });
      console.log(width, reduced, "PASS, 8 routes");
      await page.close();
    }
  }
} finally { await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2)); await browser.close(); }
