import { readFile, writeFile } from "node:fs/promises";
const media = JSON.parse(
  await readFile(new URL("../src/content/media.json", import.meta.url)),
);
await writeFile(
  new URL("../src/content/media-images.json", import.meta.url),
  JSON.stringify(
    media
      .filter((m) => m.kind === "image")
      .map(({ id, file, alt }) => ({ id, file, alt })),
    null,
    2,
  ) + "\n",
);
const countries = JSON.parse(
  await readFile(new URL("../src/content/europe-map.json", import.meta.url)),
);
const paths = countries
  .map((c) => `<path d="${c.path}"${c.cz ? ' fill="#007fc7"' : ""}/>`)
  .join("");
await writeFile(
  new URL("../public/media/europe-land.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 870"><g fill="#d6e4ef" stroke="#fff" stroke-width="1.25">${paths}</g></svg>`,
);
