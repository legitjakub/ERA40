import {
  readFile,
  writeFile,
  mkdir,
  rename,
  access,
  unlink,
} from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const media = JSON.parse(
  await readFile(join(root, "src/content/media.json"), "utf8"),
);
let failures = 0;
for (const item of media) {
  const target = join(
    root,
    item.kind === "video" ? "node_modules/.cache/era40-media" : "public",
    item.kind === "video" ? item.id + ".mp4" : item.file,
  );
  try {
    if (!process.argv.includes("--force")) {
      try {
        await access(target);
        console.log("Exists", item.id);
        continue;
      } catch {}
    }
    await mkdir(dirname(target), { recursive: true });
    const response = await fetch(item.download, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(120000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = Buffer.from(await response.arrayBuffer());
    const video = data.subarray(0, 64).includes(Buffer.from("ftyp"));
    const image = data[0] === 255 && data[1] === 216;
    if (!(item.kind === "video" ? video : image))
      throw new Error("Unexpected media type, inspect the source page");
    await writeFile(target + ".partial", data);
    await rename(target + ".partial", target);
    console.log("Downloaded", item.id);
  } catch (error) {
    failures++;
    await unlink(target + ".partial").catch(() => {});
    console.error(item.id, error.message, item.sourceUrl);
  }
}
if (failures) process.exitCode = 1;
