/*
 * Spec 016 geometry for the hero half of the Living Route. All layout is read
 * in measureRoute() (on refresh/resize only); the render functions only
 * write attributes and styles, once per scrubbed frame.
 */

export type RouteNodes = {
  section: HTMLElement;
  frame: HTMLElement;
  media: HTMLElement[];
  scrims: HTMLElement[];
  copy: HTMLElement;
  ui: HTMLElement;
  context: HTMLElement;
  figure: HTMLElement;
  label: HTMLElement;
  lines: HTMLElement[];
  svg: SVGSVGElement;
  path: SVGPathElement;
  white: SVGPathElement;
  bounds: SVGRectElement;
  station: SVGCircleElement;
  video: HTMLVideoElement;
};

export type Geometry = {
  W: number;
  H: number;
  xR: number;
  top: number;
  bottom: number;
  scale: number;
  clip: number;
  tx: number;
  ty: number;
  copyLeft: number;
  stationX: number;
};

export type RouteState = {
  geometry: Geometry | null;
  mode: "rich" | "compact" | "mobile" | "reduced" | "static";
  p: number;
  /** Intro draw of the resting line (0–1). */
  fraction: number;
};

export type FilmState = {
  inView: boolean;
  manual: boolean;
  hold: boolean;
  override: boolean;
  pausedByScene: boolean;
  sync: () => void;
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const BLUE_RING = "#004494";

export function measureRoute(section: HTMLElement, nodes: RouteNodes): Geometry {
  const W = section.clientWidth;
  const H = section.clientHeight;
  const sectionLeft = section.getBoundingClientRect().left;
  const heading = document.getElementById("people-intro-title");
  const headingLeft = heading ? heading.getBoundingClientRect().left - sectionLeft : 86;
  // The descent runs in the margin, never through the Prolog letters.
  const xR = W >= 1024 ? Math.max(16, Math.round(headingLeft - 28)) : 16;
  const left = xR + 12;
  const scale = (W - left * 2) / W;
  const nav = document.querySelector("header")?.getBoundingClientRect().height ?? 80;
  const targetTop = nav + 24;
  const targetHeight = H - 112 - targetTop;
  const photoHeight = Math.min(targetHeight, H * scale);
  const top = targetTop + (targetHeight - photoHeight) / 2;
  const bottom = top + photoHeight;
  const clip = Math.max(0, (H * scale - photoHeight) / (2 * scale));
  const toggle = section.querySelector("[data-film-toggle]");
  const toggleRect = toggle?.getBoundingClientRect();
  const stationX = toggleRect && toggleRect.width
    ? toggleRect.left + toggleRect.width / 2 - sectionLeft
    : W - 100;
  nodes.svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  return {
    W, H, xR, top, bottom, scale, clip,
    tx: left,
    ty: top - clip * scale,
    copyLeft: nodes.copy.offsetLeft,
    stationX,
  };
}

function setDash(nodes: RouteNodes, d: string, dash: string) {
  nodes.path.setAttribute("d", d);
  nodes.white.setAttribute("d", d);
  nodes.path.style.strokeDasharray = dash;
  nodes.white.style.strokeDasharray = dash;
  // A zero-length dash with round caps would still paint a dot.
  const empty = dash !== "none" && Number.parseFloat(dash) < 0.5;
  nodes.path.style.visibility = nodes.white.style.visibility = empty ? "hidden" : "";
}

function focusState(nodes: RouteNodes, p: number, copyFrom: number, uiFrom: number) {
  const active = document.activeElement;
  const ownCopy = nodes.copy.contains(active);
  const ownUi = nodes.ui.contains(active);
  nodes.section.toggleAttribute("data-focus-copy", ownCopy);
  nodes.section.toggleAttribute("data-focus-ui", ownUi);
  nodes.copy.inert = p >= copyFrom && !ownCopy;
  nodes.ui.inert = p >= uiFrom && !ownUi;
}

/** RICH desktop: pinned 150 vh, freeze, frame and descent (spec 016 §5, Revize 1). */
export function renderRich(nodes: RouteNodes, state: RouteState, p: number, film: FilmState) {
  const g = state.geometry;
  if (!g) return;
  state.p = p;

  // Freeze the frame the reader sees: pause without seeking, before the
  // controls leave. Resume only after a pause caused by this scene.
  if (p >= 0.15 && !film.hold) {
    film.hold = true;
    film.override = false;
    film.pausedByScene = !nodes.video.paused && !film.manual;
    film.sync();
  } else if (p <= 0.1 && film.hold) {
    film.hold = false;
    film.override = false;
    const resume = film.pausedByScene;
    film.pausedByScene = false;
    if (resume) film.sync();
  }

  const t = clamp((p - 0.25) / 0.3);
  const d = clamp((p - 0.55) / 0.45);
  const scale = lerp(1, g.scale, t);
  nodes.frame.style.transformOrigin = "0 0";
  nodes.frame.style.transform = `translate(${g.tx * t}px, ${g.ty * t}px) scale(${scale})`;
  nodes.frame.style.clipPath = `inset(${g.clip * t}px 0px)`;
  const parallax = -Math.min(3 * t, ((g.clip * t) / g.H) * 100);
  for (const m of nodes.media) m.style.transform = `translateY(${parallax}%)`;
  nodes.copy.style.opacity = String(1 - clamp(p / 0.15));
  nodes.copy.style.transform = `translateY(${-6 * clamp(p / 0.15)}%)`;
  nodes.ui.style.opacity = String(1 - clamp((p - 0.15) / 0.1));
  const scrim = String(1 - clamp((p - 0.15) / 0.25));
  for (const s of nodes.scrims) s.style.opacity = scrim;

  const k = {
    left: lerp(g.copyLeft, g.xR, t),
    right: lerp(g.stationX, g.W - g.xR, t),
    top: lerp(g.H - 10, g.top - 12, t),
    bottom: lerp(g.H - 10, g.bottom + 12, t),
  };
  const lb = k.right - k.left;
  const lr = k.bottom - k.top;
  const ld = g.H - k.top;
  const e = (lb + d * (lr + lb + ld)) * (p < 0.001 ? state.fraction : 1);
  setDash(
    nodes,
    `M${k.left} ${k.bottom}H${k.right}V${k.top}H${k.left}V${g.H}`,
    `${e} 99999`,
  );

  // The white copy is clipped to the film, the blue one shows on paper.
  const filmH = (g.H - 2 * g.clip * t) * scale;
  nodes.bounds.setAttribute("x", String(g.tx * t));
  nodes.bounds.setAttribute("y", String(g.ty * t + g.clip * t * scale));
  nodes.bounds.setAttribute("width", String(g.W * scale));
  nodes.bounds.setAttribute("height", String(filmH));

  let [x, y] = [k.left + Math.min(e, lb), k.bottom];
  let rest = e - lb;
  if (rest > 0) {
    if (rest <= lr) [x, y] = [k.right, k.bottom - rest];
    else if ((rest -= lr) <= lb) [x, y] = [k.right - rest, k.top];
    else [x, y] = [k.left, k.top + (rest - lb)];
  }
  nodes.station.setAttribute("cx", String(x));
  nodes.station.setAttribute("cy", String(y));
  nodes.station.style.stroke = t > 0.45 ? BLUE_RING : "none";
  nodes.station.style.opacity = state.fraction < 0.98 && p < 0.001 ? "0" : "";

  focusState(nodes, p, 0.15, 0.25);
}

/**
 * COMPACT, MOBILE and REDUCED: native scroll, no pin. A short photographic
 * edge; on desktop the line bends down in the margin without circling.
 */
export function renderNative(nodes: RouteNodes, state: RouteState, p: number) {
  const g = state.geometry;
  if (!g) return;
  state.p = p;
  const reduced = state.mode === "reduced";
  const phone = g.W < 1024;
  const edge = phone ? 16 : g.xR + 12;
  const inset = reduced ? 0 : edge * p;
  nodes.frame.style.clipPath = reduced ? "" : `inset(0px ${inset}px ${inset}px ${inset}px)`;
  nodes.bounds.setAttribute("x", String(inset));
  nodes.bounds.setAttribute("y", "0");
  nodes.bounds.setAttribute("width", String(g.W - 2 * inset));
  nodes.bounds.setAttribute("height", String(g.H - inset));

  if (phone) {
    // No horizontal route at rest; a short vertical one on departure.
    setDash(nodes, `M16 ${g.H - 16}V${g.H}`, reduced ? "none" : `${16 * p} 99999`);
    nodes.path.style.opacity = nodes.white.style.opacity = reduced || p > 0 ? "1" : "0";
    nodes.station.style.opacity = "0";
    return;
  }
  nodes.path.style.opacity = nodes.white.style.opacity = "";
  const lb = g.stationX - g.copyLeft;
  const remaining = g.stationX - g.xR + 10;
  const drawn = reduced ? lb + remaining : (lb + p * remaining) * (p < 0.001 ? state.fraction : 1);
  setDash(nodes, `M${g.copyLeft} ${g.H - 10}H${g.stationX}H${g.xR}V${g.H}`, `${drawn} 99999`);
  const distance = reduced ? 0 : p * remaining;
  const x = Math.max(g.xR, g.stationX - distance);
  const y = g.H - 10 + Math.max(0, distance - (g.stationX - g.xR));
  nodes.station.setAttribute("cx", String(x));
  nodes.station.setAttribute("cy", String(y));
  nodes.station.style.stroke = p > 0 && !reduced ? BLUE_RING : "none";
  nodes.station.style.opacity = state.fraction < 0.98 && p < 0.001 ? "0" : "";
}

export function resetScene(nodes: RouteNodes) {
  for (const el of [nodes.frame, nodes.copy, nodes.ui, ...nodes.media, ...nodes.scrims]) {
    el.style.removeProperty("transform");
    el.style.removeProperty("opacity");
    el.style.removeProperty("clip-path");
    el.style.removeProperty("transform-origin");
  }
  nodes.copy.inert = false;
  nodes.ui.inert = false;
  nodes.section.removeAttribute("data-focus-copy");
  nodes.section.removeAttribute("data-focus-ui");
}
