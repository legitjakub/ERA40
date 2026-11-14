/** Lightweight DOM split — keeps real text for a11y (aria-label on parent). */
export function splitWords(el: HTMLElement | null) {
  if (!el || el.dataset.split === "1") return [];
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.textContent = "";
  const words: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((chunk) => {
    if (!chunk) return;
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const wrap = document.createElement("span");
    wrap.className = "split-word-wrap";
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.verticalAlign = "bottom";
    const word = document.createElement("span");
    word.className = "split-word";
    word.style.display = "inline-block";
    word.textContent = chunk;
    wrap.appendChild(word);
    el.appendChild(wrap);
    words.push(word);
  });
  el.dataset.split = "1";
  return words;
}

export function splitLines(el: HTMLElement | null) {
  if (!el || el.dataset.splitLines === "1") return [];
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  const parts = text.split(/\n+/).flatMap((p) => p.split(/(?<=\.)\s+(?=[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ„])/));
  el.textContent = "";
  const lines: HTMLElement[] = [];
  (parts.length ? parts : [text]).forEach((part) => {
    const line = document.createElement("span");
    line.className = "split-line";
    line.style.display = "block";
    line.style.overflow = "hidden";
    const inner = document.createElement("span");
    inner.className = "split-line-inner";
    inner.style.display = "block";
    inner.textContent = part.trim();
    line.appendChild(inner);
    el.appendChild(line);
    lines.push(inner);
  });
  el.dataset.splitLines = "1";
  return lines;
}
