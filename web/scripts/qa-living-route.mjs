#!/usr/bin/env node
/*
 * Targeted QA for spec 016 (Living Route hero → Prolog).
 *   node scripts/qa-living-route.mjs --url http://127.0.0.1:3040 --out /private/tmp/era40-living-route-qa
 * Screenshots the pinned desktop scene forward and back, the native modes,
 * reduced motion, the focus exception and the freeze (no seek).
 */
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    url: { type: "string", default: "http://127.0.0.1:3040" },
    out: { type: "string", default: "/private/tmp/era40-living-route-qa" },
  },
});
const out = resolve(values.out);
await mkdir(out, { recursive: true });
const results = [];
const check = (label, ok, detail) => results.push({ label, ok: Boolean(ok), detail });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch();

async function open(width, height, { reduced = false, touch = false } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: reduced ? "reduce" : "no-preference",
    hasTouch: touch,
    isMobile: touch,
  });
  await context.route("**/api/kontakty", (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(values.url + "/", { waitUntil: "networkidle" });
  await wait(3200);
  return { context, page, errors };
}
const scroll = (page, y) =>
  page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y).then(() => wait(1100));
const overflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
const state = (page) =>
  page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const copy = q("[data-film-copy]");
    return {
      d: q("[data-route]")?.getAttribute("d"),
      paused: q("[data-video]")?.paused,
      time: q("[data-video]")?.currentTime,
      copyOpacity: getComputedStyle(copy).opacity,
      copyInert: copy.inert,
      uiInert: q("[data-film-ui]").inert,
      header: q("header")?.dataset,
      prologPoint: q("[data-prolog-route] circle")?.style.opacity,
      underlineHidden: getComputedStyle(q("[data-underline]")).visibility,
    };
  });

// RICH 1440 × 900 forward and back.
{
  const { context, page, errors } = await open(1440, 900);
  const H = 900;
  await page.screenshot({ path: `${out}/rich-0.png` });
  const forward = {};
  for (const p of [0.1, 0.15, 0.25, 0.46, 0.55, 0.7, 1]) {
    await scroll(page, Math.round(p * 1.5 * H));
    forward[p] = await state(page);
    await page.screenshot({ path: `${out}/rich-forward-${p}.png` });
  }
  const t1 = forward[0.25].time;
  await scroll(page, Math.round(0.7 * 1.5 * H));
  const t2 = (await state(page)).time;
  check("rich: freeze without seek", forward[0.25].paused && Math.abs(t2 - t1) < 0.01, { t1, t2 });
  check("rich: copy inert after 0.15", forward[0.25].copyInert, forward[0.25]);
  check("rich: controls inert after 0.25", forward[0.46].uiInert, null);
  const end = Math.round(1.5 * H);
  for (const [name, dy] of [["prologue-start", 200], ["prologue-mid", 600], ["prologue-end", 1100]]) {
    await scroll(page, end + dy);
    await page.screenshot({ path: `${out}/rich-${name}.png` });
  }
  check("rich: underline drawn by route", (await state(page)).underlineHidden === "hidden", null);
  for (const p of [0.7, 0.25, 0.12, 0.05]) {
    await scroll(page, Math.round(p * 1.5 * H));
    await page.screenshot({ path: `${out}/rich-reverse-${p}.png` });
  }
  await wait(800);
  const back = await state(page);
  check("rich: resumes after scene pause", back.paused === false, back);
  check("rich: copy back and reachable", !back.copyInert && !back.uiInert, back);

  // Focus exception: a focused CTA stays visible, leaves at once on blur.
  await scroll(page, 0);
  await page.focus("[data-film-copy] a");
  await scroll(page, Math.round(0.4 * 1.5 * H));
  const held = await state(page);
  check("focus: CTA held visible", held.copyOpacity === "1" && !held.copyInert, held);
  await page.focus("#pribehy-intro a");
  await wait(300);
  const left = await state(page);
  check("focus: released after blur", left.copyOpacity === "0" && left.copyInert, left);

  // Manual pause wins: the scene never resumes it.
  await scroll(page, 0);
  await page.click("[data-film-toggle]");
  await scroll(page, Math.round(0.3 * 1.5 * H));
  await scroll(page, 0);
  await wait(600);
  check("manual pause kept", (await state(page)).paused === true, null);
  check("rich: no overflow", (await overflow(page)) <= 0, null);
  check("rich: console clean", errors.length === 0, errors);
  await context.close();
}

// Native modes and reduced.
for (const [name, w, h, opts] of [
  ["compact-1280x640", 1280, 640, {}],
  ["tablet-768x1024", 768, 1024, { touch: true }],
  ["mobile-430x932", 430, 932, { touch: true }],
  ["mobile-390x844", 390, 844, { touch: true }],
  ["mobile-360x740", 360, 740, { touch: true }],
  ["reduced-1440x900", 1440, 900, { reduced: true }],
  ["reduced-390x844", 390, 844, { reduced: true, touch: true }],
]) {
  const { context, page, errors } = await open(w, h, opts);
  await page.screenshot({ path: `${out}/${name}-hero.png` });
  await scroll(page, Math.round(h * 0.45));
  await page.screenshot({ path: `${out}/${name}-departure.png` });
  const departure = await page.evaluate(() => {
    const el = document.querySelector("[data-figure]");
    const fig = el?.getBoundingClientRect(), mask = el?.parentElement?.getBoundingClientRect();
    return { figureVisible: fig && mask ? fig.bottom <= mask.bottom + 1 && fig.top >= mask.top - 1 : null };
  });
  check(`${name}: copy not masked on departure`, departure.figureVisible, departure);
  const prolog = await page.evaluate(() => document.getElementById("pribehy-intro").getBoundingClientRect().top + scrollY);
  await scroll(page, Math.round(prolog + h * 0.2));
  await page.screenshot({ path: `${out}/${name}-prologue.png` });
  const s = await state(page);
  check(`${name}: header in Prolog state`, s.header?.light === "true", s.header);
  const gap = await page.evaluate(() => {
    const cta = document.querySelector("[data-film-copy] .actions, [data-film-copy] div:last-child")?.getBoundingClientRect();
    const cap = document.querySelector("[data-film-ui] p")?.getBoundingClientRect();
    return cta && cap ? Math.round(cap.top - cta.bottom) : null;
  });
  await scroll(page, 0);
  const gap0 = await page.evaluate(() => {
    const ctas = [...document.querySelectorAll("[data-film-copy] a")].map((a) => a.getBoundingClientRect().bottom);
    const cap = document.querySelector("[data-film-ui] p")?.getBoundingClientRect();
    return cap ? Math.round(cap.top - Math.max(...ctas)) : null;
  });
  check(`${name}: caption ≥ 16 px under CTA`, gap0 === null || gap0 >= 16, { gap0, gap });
  check(`${name}: no overflow`, (await overflow(page)) <= 0, null);
  check(`${name}: console clean`, errors.length === 0, errors);
  await context.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
await writeFile(`${out}/results.json`, JSON.stringify({ checks: results.length, failed: failed.length, results }, null, 2));
console.log(`${results.length - failed.length}/${results.length} ok`);
for (const f of failed) console.log("FAIL", f.label, JSON.stringify(f.detail)?.slice(0, 300));
process.exit(failed.length ? 1 : 0);
