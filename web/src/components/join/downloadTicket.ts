import type { TicketData } from "./Ticket";

/**
 * Draws the personal ticket to a 1200 × 630 canvas (social-share size) and
 * downloads it as PNG. Uses the page's Roboto Flex once it has loaded.
 */
export async function downloadTicket(data: TicketData) {
  await document.fonts?.ready;
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const font = (weight: number, size: number) =>
    `${weight} ${size}px "Roboto Flex Variable", "Roboto Flex", Roboto, Arial, sans-serif`;
  const blue = "#004494";
  const yellow = "#FFED00";
  const ink = "#0B1B33";
  const stub = 230;

  ctx.fillStyle = "#EAF3FA";
  ctx.fillRect(0, 0, W, H);
  const x = 60;
  const y = 70;
  const w = W - 120;
  const h = H - 140;
  ctx.fillStyle = blue;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = yellow;
  ctx.fillRect(x + w - stub, y, stub, h);
  // notches
  ctx.fillStyle = "#EAF3FA";
  for (const cy of [y, y + h]) {
    ctx.beginPath();
    ctx.arc(x + w - stub, cy, 22, 0, Math.PI * 2);
    ctx.fill();
  }
  // perforation
  ctx.strokeStyle = "rgba(255,255,255,.5)";
  ctx.setLineDash([10, 10]);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + w - stub - 2, y + 30);
  ctx.lineTo(x + w - stub - 2, y + h - 30);
  ctx.stroke();
  ctx.setLineDash([]);

  const pad = 52;
  const left = x + pad;
  const right = x + w - stub - pad;
  ctx.fillStyle = "white";
  ctx.font = font(700, 26);
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Jízdenka Erasmus", left, y + 70);
  ctx.fillStyle = yellow;
  ctx.textAlign = "right";
  ctx.fillText("1987–2027", right, y + 70);
  ctx.textAlign = "left";

  const fit = (text: string, max: number, size: number) => {
    let s = size;
    ctx.font = font(850, s);
    while (ctx.measureText(text).width > max && s > 28) {
      s -= 2;
      ctx.font = font(850, s);
    }
  };
  const from = data.from?.trim() || "Odkud";
  const to = data.to?.trim() || "Kam";
  const half = (right - left - 180) / 2;
  ctx.fillStyle = "#C9D6E3";
  ctx.font = font(600, 20);
  ctx.fillText("Odkud", left, y + 170);
  ctx.textAlign = "right";
  ctx.fillText("Kam", right, y + 170);
  ctx.fillStyle = "white";
  fit(from, half, 76);
  ctx.textAlign = "left";
  ctx.fillText(from, left, y + 250);
  fit(to, half, 76);
  ctx.textAlign = "right";
  ctx.fillText(to, right, y + 250);
  ctx.textAlign = "left";
  // the Trasa between the two stations
  const mid = (left + right) / 2;
  ctx.strokeStyle = yellow;
  ctx.fillStyle = yellow;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(mid - 44, y + 228);
  ctx.lineTo(mid + 44, y + 228);
  ctx.stroke();
  for (const cx of [mid - 44, mid + 44]) {
    ctx.beginPath();
    ctx.arc(cx, y + 228, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(255,255,255,.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, y + 320);
  ctx.lineTo(right, y + 320);
  ctx.stroke();
  const cols: [string, string][] = [
    ["Cestující", data.name?.trim() || "—"],
    ["Rok", data.year?.trim() || "—"],
    ["Platnost", "celý život"],
  ];
  const colW = (right - left) / 3;
  cols.forEach(([label, value], i) => {
    const cx = left + i * colW;
    ctx.fillStyle = "#C9D6E3";
    ctx.font = font(600, 20);
    ctx.fillText(label, cx, y + 368);
    ctx.fillStyle = "white";
    ctx.font = font(700, 30);
    let text = value;
    while (ctx.measureText(text).width > colW - 20 && text.length > 3)
      text = text.slice(0, -2) + "…";
    ctx.fillText(text, cx, y + 410);
  });

  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.font = font(900, 120);
  ctx.fillText("40", x + w - stub / 2, y + h / 2 + 20);
  ctx.font = font(700, 24);
  ctx.fillText("let Erasmu", x + w - stub / 2, y + h / 2 + 62);
  ctx.textAlign = "left";

  ctx.fillStyle = blue;
  ctx.font = font(600, 22);
  ctx.fillText("Erasmus v Česku — příběhy, které překračují hranice", x, H - 26);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const slug = (to || "erasmus")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  a.href = url;
  a.download = `jizdenka-erasmus-${slug}.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
