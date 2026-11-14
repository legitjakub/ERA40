#!/usr/bin/env node
// From web/: npm run qa:shots -- --url http://127.0.0.1:3040 --video
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    url: { type: "string", default: "http://127.0.0.1:3040" },
    out: {
      type: "string",
      default: `qa/${new Date().toISOString().replace(/[:.]/g, "-")}`,
    },
    section: { type: "string" },
    widths: { type: "string" },
    video: { type: "boolean" },
    "video-only": { type: "boolean" },
  },
});
const sizes = [
  [1440, 900],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [375, 812],
];
const selected = sizes.filter(
  ([w]) => !values.widths || values.widths.split(",").includes(String(w)),
);
if (!selected.length) throw new Error("No matching viewport");
const dest = resolve(values.out);
await mkdir(dest, { recursive: true });
const browser = await chromium.launch();
const errors = new Set();
const dimensions = [];
const sections = [
  "hero",
  "prolog",
  "historie",
  "pribehy",
  "evropa",
  "tehdy-ted",
  "cisla",
  "budoucnost",
];
const stops = [0, 25, 50, 75, 100];

async function getSceneRanges(page) {
  return page.evaluate(() => {
    const ranges = window.__eraRanges?.() ?? {};
    const max = Math.max(
      0,
      document.documentElement.scrollHeight - innerHeight,
    );
    return Array.from(
      document.querySelectorAll("section[data-section]"),
      (element) => {
        const id = element.dataset.section;
        const { top, height } = element.getBoundingClientRect();
        const start = ranges[id]?.start ?? top + scrollY;
        const end =
          ranges[id]?.end ?? start + Math.max(0, height - innerHeight);
        return {
          id,
          start: Math.max(0, Math.min(max, start)),
          end: Math.max(0, Math.min(max, end)),
        };
      },
    );
  });
}

// Native scrolling stays bounded at the page ends and walks every intermediate frame.
async function scrollToY(page, y, duration) {
  await page.evaluate(
    ({ y, duration }) =>
      new Promise((done) => {
        const from = scrollY;
        const start = performance.now();
        function advance(now) {
          const progress = Math.min(1, (now - start) / duration);
          window.scrollTo({
            top: from + (y - from) * progress,
            behavior: "instant",
          });
          if (progress < 1) requestAnimationFrame(advance);
          else done();
        }
        requestAnimationFrame(advance);
      }),
    { y, duration },
  );
}

async function visit(width, height, reducedMotion, film = false) {
  const phone = width < 768;
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: phone,
    hasTouch: phone,
    reducedMotion,
    locale: "cs-CZ",
    ...(film && { recordVideo: { dir: dest, size: { width, height } } }),
  });
  const page = await ctx.newPage();
  const prefix = `${reducedMotion === "reduce" ? "reduced-" : ""}${width}`;
  const err = (message) => errors.add(`${prefix} ${message}`);
  page.on("pageerror", (e) => err(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") err(msg.text());
  });
  page.on("response", (res) => {
    if (res.status() >= 400) err(`${res.status()} ${res.url()}`);
  });
  try {
    await page.goto(values.url, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1250);
    const ranges = await getSceneRanges(page);
    if (ranges.map(({ id }) => id).join(",") !== sections.join(",")) {
      throw new Error(
        `Expected eight chapters, received ${ranges.map(({ id }) => id)}`,
      );
    }
    if (values.section && !ranges.some(({ id }) => id === values.section)) {
      throw new Error(`Unknown section ${values.section}`);
    }
    const frames = ranges.filter(
      ({ id }) => !values.section || values.section === id,
    );
    const remember = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
      lang: document.documentElement.lang,
    }));
    if (remember.scrollWidth > width + 1 || remember.innerWidth > width + 1)
      err("Horizontal overflow");
    dimensions.push({
      width,
      height,
      reducedMotion,
      film,
      ...remember,
      ranges,
    });
    if (film) {
      for (const { start, end } of frames) {
        for (const y of [start, end]) {
          const dist = Math.abs(y - (await page.evaluate(() => scrollY)));
          await scrollToY(page, y, Math.max(180, Math.min(6000, dist * 1.2)));
          await page.waitForTimeout(380);
        }
      }
      const bottom = await page.evaluate(
        () => document.documentElement.scrollHeight - innerHeight,
      );
      await scrollToY(page, bottom, 1100);
      await page.waitForTimeout(600);
      await scrollToY(page, 0, Math.min(13500, bottom * 0.75));
      await page.waitForTimeout(750);
    } else {
      for (const { id, start, end } of frames) {
        for (const p of stops) {
          const y = start + ((end - start) * p) / 100;
          await scrollToY(page, y, 180);
          await page.waitForTimeout(500);
          await page.screenshot({
            path: `${dest}/${prefix}-${id}-${p}.png`,
            timeout: 30000,
          });
        }
      }
      await scrollToY(page, 0, 850);
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${dest}/${prefix}-reverse-top.png` });
    }
    console.log(`${film ? "walkthrough" : "screenshots"} ${prefix} complete`);
  } finally {
    const vid = page.video();
    await ctx.close();
    if (vid) {
      await vid.saveAs(`${dest}/walkthrough-${width}.webm`);
      await vid.delete();
    }
  }
}

try {
  if (!values["video-only"]) {
    const jobs = [
      ...selected.map(([w, h]) => [w, h, "no-preference"]),
      ...selected
        .filter(([w]) => w === 1440 || w === 390)
        .map(([w, h]) => [w, h, "reduce"]),
    ];
    // Two contexts balance total run time with decoding/compositing contention.
    for (let i = 0; i < jobs.length; i += 2) {
      await Promise.all(jobs.slice(i, i + 2).map((job) => visit(...job)));
    }
  }
  if (values.video || values["video-only"]) {
    for (const [w, h] of selected.filter(([w]) => w === 1440 || w === 390)) {
      await visit(w, h, "no-preference", true);
    }
  }
} finally {
  await browser.close();
  await writeFile(
    `${dest}/run.json`,
    JSON.stringify(
      { url: values.url, dimensions, errors: [...errors] },
      null,
      2,
    ),
  );
}
console.log(dest);
if (errors.size) {
  console.error([...errors].join("\n"));
  process.exitCode = 1;
}
