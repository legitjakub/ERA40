// Regression coverage for CDX-008. No real contact submissions.
import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
const { values } = parseArgs({ options: {
  url: { type: "string", default: "http://127.0.0.1:3000" },
  out: { type: "string", default: "/private/tmp/era40-editorial-qa" },
} });
await mkdir(values.out, { recursive: true });
const browser = await chromium.launch(), report = [];
try {
  for (const width of [360, 390, 430, 1440]) {
    for (const reduced of [false, true]) {
      const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, hasTouch: width < 768, isMobile: width < 768, reducedMotion: reduced ? "reduce" : "no-preference" });
      await context.route("**/api/kontakty", r => r.abort());
      const page = await context.newPage(), errors = [], overflows = [], violations = [];
      page.on("pageerror", e => errors.push(e.message));
      const tag = `${width}-${reduced ? "reduced" : "normal"}`;
      async function inspect(name, screenshot = false) {
        await page.evaluate(() => document.fonts.ready);
        overflows.push({ name, px: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth) });
        await page.addScriptTag({ path: process.env.AXE_SCRIPT || "/private/tmp/era40-qa-tools/node_modules/axe-core/axe.min.js" });
        const found = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } })).violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })));
        violations.push({ name, found });
        if (screenshot) await page.screenshot({ path: `${values.out}/${tag}-${name}.png` });
      }
      await page.goto(values.url + "/#mapa", { waitUntil: "networkidle" });
      await page.waitForTimeout(1300);
      await expect(page.locator("main [data-content-note]")).toHaveCount(1);
      await expect(page.locator("#pribehy header")).toContainText("modelových příběhů");
      await expect(page.locator("#tehdy-ted header")).toContainText("modelové příběhy");
      await expect(page.locator("#cisla header")).toContainText("Příklady lidí jsou modelové");
      await expect(page.locator("#budoucnost figcaption")).toContainText("Z modelového příběhu");
      expect(await page.getByText(/^Ilustrační (snímek|video)$/).count()).toBe(0);
      const photo = page.locator("[data-map-photo]"), first = await photo.getAttribute("data-flip-id");
      const next = page.getByRole("button", { name: "Další trasa", exact: true });
      await next.focus(); await page.keyboard.press("Enter");
      await expect(photo).not.toHaveAttribute("data-flip-id", first);
      const chosen = await photo.getAttribute("data-flip-id");
      await page.waitForTimeout(1600);
      await expect(photo).toHaveAttribute("data-flip-id", chosen);
      await expect(next).toBeFocused();
      await inspect("map", true);
      await page.getByRole("button", { name: "Předchozí trasa", exact: true }).click();
      await expect(photo).toHaveAttribute("data-flip-id", first);
      const open = page.locator("#mapa").getByRole("button", { name: /^Celý příběh:/ });
      await open.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.locator("[data-content-note]")).toContainText("Postava i citace jsou modelové");
      await inspect("dialog");
      await page.keyboard.press("Escape"); await expect(dialog).not.toBeVisible();
      await expect(open).toBeFocused();
      await page.goto(values.url + "/pribehy", { waitUntil: "networkidle" });
      await expect(page.locator("main [data-content-note]")).toHaveCount(1);
      expect(await page.getByText(/^Ilustrační (snímek|video)$/).count()).toBe(0);
      await inspect("archive", width === 390 || width === 1440);
      await page.goto(values.url + "/pribehy/valencie", { waitUntil: "networkidle" });
      await expect(page.getByText(/Postava, jméno i\s+citace jsou modelové/)).toBeAttached();
      await inspect("detail", width === 390 || width === 1440);
      await page.goto(values.url + "/placeholders", { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { name: /O\s+modelovém obsahu/ })).toBeVisible();
      await inspect("provenance");
      expect(errors).toEqual([]);
      expect(overflows.filter(o => o.px > 1)).toEqual([]);
      expect(violations.filter(v => v.found.length)).toEqual([]);
      report.push({ width, reduced, chosen, overflows, violations, errors });
      console.log(tag, "PASS: map, disclosure, dialog, archive, detail, provenance");
      await context.close();
    }
  }
} finally { await writeFile(`${values.out}/report.json`, JSON.stringify(report, null, 2)); await browser.close(); }
