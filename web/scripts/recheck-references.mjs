import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
const dir = "qa/live-references";
const report = JSON.parse(await readFile(dir + "/observations.json"));
const b = await chromium.launch();
for (const id of ["tracing-art", "inkwell", "unseen", "zentry"]) {
  const item = report.find((v) => v.id === id);
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await p.goto(item.before.url, {
      waitUntil: "domcontentloaded",
      timeout: 35000,
    });
    await p.waitForTimeout(7000);
    for (const name of [/decline/i, /enter without audio/i, /^enter$/i]) {
      const el = p.getByRole("button", { name }).first();
      if (await el.isVisible().catch(() => false))
        await el.click({ timeout: 2000 }).catch(() => {});
    }
    if (id === "unseen") {
      const el = p.getByText("ENTER WITHOUT AUDIO", { exact: true });
      if (await el.isVisible().catch(() => false))
        await el.click().catch(() => {});
    }
    await p.waitForTimeout(2000);
    await p.mouse.move(700, 500);
    await p.mouse.wheel(0, 1400);
    await p.waitForTimeout(1800);
    await p.mouse.wheel(0, 1200);
    await p.waitForTimeout(1500);
    item.retry = await p.evaluate(() => ({
      scroll: scrollY,
      text: document.body.innerText.slice(0, 2400),
      height: document.documentElement.scrollHeight,
    }));
    await p.screenshot({ path: dir + "/" + id + "-retry.png" });
    console.log(id, item.retry.scroll);
  } catch (e) {
    item.retryError = e.message;
  }
  await p.close();
}
await b.close();
await writeFile(dir + "/observations.json", JSON.stringify(report, null, 2));
