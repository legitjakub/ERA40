/** Lightweight word/line split for kinetic typography (DOM-safe). */
export function splitWords(el: HTMLElement | null) {
  if (!el || el.dataset.split === "1") return;
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.innerHTML = text
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token)) return token;
      return `<span class="kt-word"><span class="kt-word-inner">${token}</span></span>`;
    })
    .join("");
  el.dataset.split = "1";
}

export function splitLines(el: HTMLElement | null) {
  if (!el || el.dataset.splitLines === "1") return;
  const html = el.innerHTML.trim();
  const parts = html.split(/<br\s*\/?>/i);
  el.innerHTML = parts
    .map(
      (line) =>
        `<span class="kt-line"><span class="kt-line-inner">${line}</span></span>`,
    )
    .join("");
  el.dataset.splitLines = "1";
}
