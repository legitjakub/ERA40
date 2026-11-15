import { eraCopy, type EraPath, type EraType } from "@/content/era-quiz";

const SIZE = 1080;
const blue = "#004494";
const yellow = "#FFED00";
const sky = "#C9D6E3";

/**
 * Draws the ERA sticker: a rounded blue card on a transparent background
 * (usable as a profile picture or a sticker, as the DZS brief asks).
 */
export async function drawEraCard(type: EraType, path: EraPath) {
  await document.fonts?.ready;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const font = (weight: number, size: number) =>
    `${weight} ${size}px "Roboto Flex Variable", "Roboto Flex", Roboto, Arial, sans-serif`;

  const inset = 36;
  ctx.fillStyle = blue;
  ctx.beginPath();
  ctx.roundRect(inset, inset, SIZE - inset * 2, SIZE - inset * 2, 64);
  ctx.fill();

  const left = 116;
  const right = SIZE - 116;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = sky;
  ctx.font = font(650, 34);
  ctx.fillText("Moje ERA", left, 168);
  if (path === "nevyjel") {
    ctx.textAlign = "right";
    ctx.fillText("Na Erasmu: 0 dní. Přesto.", right, 168);
    ctx.textAlign = "left";
  }

  // The glyph in the Trasa language, 200 × 200 box scaled to 2.1×.
  const scale = 2.1;
  ctx.save();
  ctx.translate(SIZE / 2 - 100 * scale, 210);
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  type.glyph.solid.forEach((d) => ctx.stroke(new Path2D(d)));
  if (type.glyph.dotted) {
    ctx.setLineDash([0.1, 11]);
    ctx.lineWidth = 6;
    ctx.stroke(new Path2D(type.glyph.dotted));
    ctx.setLineDash([]);
  }
  ctx.fillStyle = yellow;
  ctx.beginPath();
  ctx.arc(type.glyph.dot[0], type.glyph.dot[1], 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "white";
  const max = right - left;
  const wrap = (text: string, weight: number, size: number) => {
    ctx.font = font(weight, size);
    const lines: string[] = [];
    let current = "";
    for (const word of text.split(" ")) {
      const next = current ? current + " " + word : word;
      if (ctx.measureText(next).width > max && current) {
        lines.push(current);
        current = word;
      } else current = next;
    }
    lines.push(current);
    return lines;
  };
  // Shrinks the type until the text fits in two lines at most.
  const fit = (text: string, weight: number, size: number, min: number) => {
    let lines = wrap(text, weight, size);
    while ((lines.length > 2 || lines.some((l) => ctx.measureText(l).width > max)) && size > min) {
      size -= 2;
      lines = wrap(text, weight, size);
    }
    return { lines, size };
  };

  // The line sits above the divider; a two-line line lifts the name with it.
  const tagline = fit(eraCopy(type, path).line, 600, 40, 30);
  const taglineGap = tagline.size * 1.25;
  const taglineTop = 838 - (tagline.lines.length - 1) * taglineGap;
  const name = fit(type.name, 850, 116, 60);
  const nameBottom = taglineTop - 78;
  ctx.font = font(850, name.size);
  name.lines.forEach((line, i) =>
    ctx.fillText(line, left, nameBottom - (name.lines.length - 1 - i) * name.size * 1.02),
  );
  ctx.font = font(600, tagline.size);
  tagline.lines.forEach((line, i) => ctx.fillText(line, left, taglineTop + i * taglineGap));

  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, 900);
  ctx.lineTo(right, 900);
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.font = font(700, 30);
  ctx.fillText("Erasmus+ již 40 let mění životy", left, 958);
  ctx.fillStyle = sky;
  ctx.textAlign = "right";
  ctx.fillText("1987–2027", right, 958);
  ctx.textAlign = "left";

  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
}

export function eraFileName(type: EraType) {
  const slug = type.name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `moje-era-${slug}.png`;
}
