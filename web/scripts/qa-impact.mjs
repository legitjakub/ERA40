// Integration checks for the URL filters, manual comparison ownership and linked examples.
// Contacts are always blocked. Run against an already-built local production server.
import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: {
  url: { type: "string", default: "http://127.0.0.1:3000" },
  out: { type: "string", default: "/private/tmp/era40-impact-qa" },
} });
await mkdir(values.out, { recursive: true });
const browser = await chromium.launch();
const report = [];
try {
  for (const width of [1440, 390, 360]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 1440 ? 900 : 844 },
      isMobile: width < 768, hasTouch: width < 768,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("**/api/kontakty", (route) => route.abort());
    const enter = async (locator) => { await locator.focus(); await page.keyboard.press("Enter"); };
    const settle = () => page.waitForTimeout(800);
    await page.goto(values.url, { waitUntil: "networkidle" });
    await settle();

    const comparison = page.locator("#tehdy-ted");
    await enter(comparison.getByRole("button", { name: "Teď", exact: true }));
    const slider = comparison.getByRole("slider");
    await expect(slider).toHaveValue("0");
    await page.evaluate(() => window.scrollBy({ top: -180, behavior: "instant" }));
    await settle();
    await expect(slider).toHaveValue("0");
    await enter(comparison.getByRole("button", { name: "Obojí", exact: true }));
    await expect(slider).toHaveValue("50");
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("51");
    await page.screenshot({ path: `${values.out}/${width}-comparison.jpg` });
    await enter(comparison.getByRole("button", { name: "Tehdy", exact: true }));
    await expect(slider).toHaveValue("100");

    const numbers = page.locator("#cisla");
    const cases = [
      ["Vysoké školy", "Martin"],
      ["Neformální vzdělávání mládeže", "Adéla"],
      ["Odborné vzdělávání", "Jakub"],
      ["Školní vzdělávání", "Mgr. Jana"],
      ["Vzdělávání dospělých", "Patří sem i tvůj příběh."],
    ];
    for (const [label, name] of cases) {
      const choice = numbers.getByRole("button", { name: new RegExp(`^${label}`) });
      await enter(choice);
      await expect(choice).toHaveAttribute("aria-pressed", "true");
      await expect(numbers.locator("#sector-example h4")).toHaveText(name);
      await expect(choice).toBeFocused();
      // A clipped ancestor can conceal internal overflow from document.scrollWidth.
      const internalOverflow = await numbers.locator("#sector-example").evaluate((panel) => {
        const outer = panel.getBoundingClientRect();
        return [...panel.querySelectorAll("figure, h4, aside, p")].some((child) => {
          const box = child.getBoundingClientRect();
          return box.left < outer.left - 1 || box.right > outer.right + 1;
        });
      });
      expect(internalOverflow).toBe(false);
    }
    await enter(numbers.getByRole("button", { name: /^Školní vzdělávání/ }));
    await page.locator("#sector-example").scrollIntoViewIfNeeded();
    await settle();
    await page.screenshot({ path: `${values.out}/${width}-example.jpg` });
    await page.addScriptTag({ path: process.env.AXE_SCRIPT });
    const violations = await page.evaluate(async () => (await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    })).violations.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) })));
    expect(violations).toEqual([]);

    await page.goto(`${values.url}/pribehy?dopad=uceni&pohled=index`, { waitUntil: "networkidle" });
    const archive = page.getByRole("region", { name: "Archiv příběhů" });
    await expect(archive.getByRole("button", { name: "Učení a výuka", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(archive.locator('a[href^="/pribehy/"]')).toHaveCount(4);
    await enter(archive.getByRole("button", { name: "Do Česka", exact: true }));
    await expect(archive.locator('a[href^="/pribehy/"]')).toHaveCount(1);
    await enter(archive.locator('a[href="/pribehy/praha-in"]'));
    await page.waitForURL("**/pribehy/praha-in");
    await expect(page.getByRole("complementary", { name: "Pokračování příběhu" })).toContainText("novým zahraničním studentům");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${values.out}/${width}-detail.jpg` });
    await page.goBack({ waitUntil: "networkidle" });
    await expect(archive.getByRole("button", { name: "Do Česka", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(archive.getByRole("button", { name: "Rejstřík", exact: true })).toHaveAttribute("aria-pressed", "true");
    await enter(archive.getByRole("button", { name: "Stáže a praxe", exact: true }));
    await expect(archive.locator('a[href^="/pribehy/"]')).toHaveCount(0);
    await enter(archive.getByRole("button", { name: "Zrušit filtry", exact: true }));
    await expect(archive.locator('a[href^="/pribehy/"]')).toHaveCount(8);
    await expect(archive.getByRole("button", { name: "Rejstřík", exact: true })).toHaveAttribute("aria-pressed", "true");
    await archive.locator("button").first().focus();
    await settle();
    await page.screenshot({ path: `${values.out}/${width}-archive.jpg` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    expect(errors).toEqual([]);
    report.push({ width, comparisonManual: true, examples: cases.length, urlFiltersAndReturn: true, resetPreservesView: true, violations, errors });
    await context.close();
    console.log(`${width}: PASS`);
  }
} catch (error) {
  report.push({ failure: error.stack });
  process.exitCode = 1;
} finally {
  await writeFile(`${values.out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}
