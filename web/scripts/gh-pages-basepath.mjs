// Po `next build` se statickým exportem (GITHUB_PAGES=1) doplní /ERA40 před
// kořenové cesty k souborům z public/, které Next basePath sám nepřepisuje
// (<img src="/media/…">, url(/fonts/…), řetězce v JS).
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
const BASE = process.env.PAGES_BASE_PATH || "/ERA40";
const roots = readdirSync(new URL("../public/", import.meta.url).pathname)
  .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const re = new RegExp(`([("'\`=]|\\\\")/(${roots.join("|")})(?=[/"'\`)\\\\?#]|$)`, "g");

let files = 0;
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(html|js|css|txt|json|webmanifest)$/.test(name)) continue;
    const src = readFileSync(p, "utf8");
    const next = src.replace(re, `$1${BASE}/$2`);
    if (next !== src) { writeFileSync(p, next); files++; }
  }
})(OUT);
console.log(`basePath ${BASE}: přepsáno ${files} souborů`);
