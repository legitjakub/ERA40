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
// The homepage's blue chapter uses the same geography; story detail maps keep
// their light asset and their existing contrast.
const bluePaths = countries
  .map((c) => `<path d="${c.path}"${c.cz ? ' fill="#004494" stroke="#fff"' : ""}/>`)
  .join("");
await writeFile(
  new URL("../public/media/europe-land-blue.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 870"><g fill="#007FC7" stroke="#004494" stroke-width="1.25">${bluePaths}</g></svg>`,
);

// Homepage map 05 „night map“ (Jakub 15. 11.: the blue-on-blue boxed map was
// ugly): Europe as one EU-blue silhouette on ink, borders only as faint gaps,
// Czechia in Erasmus+ blue with a white edge.
const nightPaths = countries
  .map((c) => `<path d="${c.path}"${c.cz ? ' fill="#007fc7" stroke="#fff" stroke-width="1.6"' : ""}/>`)
  .join("");
await writeFile(
  new URL("../public/media/europe-land-night.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 870"><g fill="#0a468f" stroke="#0b1b33" stroke-width="0.8">${nightPaths}</g></svg>`,
);
