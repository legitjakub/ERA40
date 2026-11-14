/* Isolated visual study. No production components, pins, networking or persistent data. */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const stage = $("#stage"), slider = $("#progress"), output = $(".scrubber output");
  const play = $("#play"), reverse = $("#reverse"), reduce = $("#reduce");
  const frame = $(".photo-frame"), archive = $("#archive"), portrait = $("#portrait");
  const portraitLayer = $(".portrait-layer");
  const label = $(".photo-label"), line = $(".axis-line line");
  const historySource = $(".history-source"), personTarget = $(".person-target");
  const comparisonSource = $(".comparison-source"), numbersTarget = $(".numbers-target");
  const historyCopy = $(".history-copy"), rail = $(".history-rail");
  const personCopy = $(".person-copy"), peopleHeading = $(".people-heading");
  const numbersHeading = $(".numbers-target h2"), metrics = $(".metrics");
  const firstMetric = $(".first-metric"), compare = $(".comparison");
  const split = $("#split");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const compact = matchMedia("(max-width: 1023px), (max-height: 619px)");
  const state = { p: 0, mode: "history", reduced: false, split: .5 };
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const between = (p, a, b) => clamp((p - a) / (b - a));
  const lerp = (a, b, p) => a + (b - a) * p;
  const ease = gsap.parseEase("power2.inOut");
  const lineColor = gsap.utils.interpolate("#ffed00", "#55677e");
  let geometry, tween, ready = false;

  function cover(box, ratio) {
    const width = Math.max(box.w, box.h * ratio), height = width / ratio;
    return { x: box.x + (box.w - width) / 2, y: box.y + (box.h - height) / 2, w: width, h: height };
  }
  function stop() {
    tween?.kill(); tween = undefined;
    play.textContent = "Přehrát přechod ↗";
  }
  function measure() {
    if (!ready || stage.dataset.static === "true") return;
    const w = stage.clientWidth, h = stage.clientHeight;
    const from = { x: w * .54, y: h * .32, w: w * .40, h: h * .43 };
    const to = { x: w * .05, y: h * .28, w: w * .45, h: h * .61 };
    const planes = [archive, portrait].map((img) => {
      const ratio = img.naturalWidth / img.naturalHeight;
      const first = cover(from, ratio), last = cover(to, ratio);
      return { img, first, last };
    });
    const r = stage.getBoundingClientRect(), metric = firstMetric.getBoundingClientRect();
    geometry = {
      w, h, from, to, planes,
      axis: { x: compare.offsetLeft + compare.offsetWidth * state.split, y: compare.offsetTop, h: $(".comparison-images").clientHeight },
      target: { x: metric.left - r.left, y: metrics.offsetTop, w: metric.width },
    };
    planes.forEach(({ img, first }) => { img.style.width = first.w + "px"; img.style.height = first.h + "px"; });
    render();
  }
  function render() {
    const p = state.p;
    slider.value = String(Math.round(p * 1000));
    output.value = Math.round(p * 100) + " %";
    slider.setAttribute("aria-valuetext", Math.round(p * 100) + " % přechodu");
    document.querySelectorAll("[data-frame]").forEach((button) => button.setAttribute("aria-pressed", String(Math.abs(p - Number(button.dataset.frame)) < .001)));
    if (!geometry || stage.dataset.static === "true") return;
    const { w, h } = geometry;
    if (state.mode === "history") {
      const at = ease(between(p, .12, .88));
      const { from, to, planes } = geometry;
      const x = lerp(from.x, to.x, at), y = lerp(from.y, to.y, at);
      const fw = lerp(from.w, to.w, at), fh = lerp(from.h, to.h, at);
      frame.style.clipPath = `inset(${y}px ${w - x - fw}px ${h - y - fh}px ${x}px)`;
      planes.forEach(({ img, first, last }) => {
        img.style.transform = `translate3d(${lerp(first.x, last.x, at)}px,${lerp(first.y, last.y, at)}px,0) scale(${lerp(1, last.w / first.w, at)})`;
      });
      // Match cut at the change of scale: two distinct moments never merge into one face.
      portraitLayer.style.opacity = p < .5 ? "0" : "1";
      label.style.transform = `translate3d(${x + 12}px,${y + fh - 37}px,0)`;
      const leaving = 1 - between(p, .08, .30), arriving = between(p, .78, 1);
      historyCopy.style.opacity = String(leaving);
      rail.style.opacity = String(leaving);
      personCopy.style.opacity = String(arriving);
      peopleHeading.style.opacity = String(arriving);
      personTarget.style.background = "transparent";
      historySource.setAttribute("aria-hidden", String(p >= .5));
      personTarget.setAttribute("aria-hidden", String(p < .5));
    } else {
      const { axis: a, target: t } = geometry;
      const at = ease(between(p, .12, .88));
      comparisonSource.style.transform = `translate3d(0,${-p * h}px,0)`;
      numbersTarget.style.transform = `translate3d(0,${(1 - p) * h}px,0)`;
      // The destination moves with the incoming page; its headline waits until the line is below it.
      const y = t.y + (1 - p) * h;
      line.setAttribute("x1", lerp(a.x, t.x, at));
      line.setAttribute("y1", lerp(a.y, y, at));
      line.setAttribute("x2", lerp(a.x, t.x + t.w, at));
      line.setAttribute("y2", lerp(a.y + a.h, y, at));
      line.style.stroke = lineColor(at);
      numbersHeading.style.opacity = String(between(p, .62, .82));
      metrics.style.opacity = "1";
      firstMetric.style.borderTopColor = p < 1 ? "transparent" : "#55677e";
      comparisonSource.setAttribute("aria-hidden", String(p >= .5));
      numbersTarget.setAttribute("aria-hidden", String(p < .5));
    }
  }
  function setProgress(p) { stop(); state.p = clamp(p); render(); }
  function policy() {
    stop();
    const still = motion.matches || state.reduced || compact.matches || !ready;
    stage.dataset.static = String(still);
    reduce.setAttribute("aria-pressed", String(motion.matches || state.reduced));
    $(".fallback-note").hidden = !still;
    [play, reverse, slider, ...document.querySelectorAll("[data-frame]")].forEach((control) => { control.disabled = still; });
    $(".split-control").hidden = state.mode !== "axis" || still;
    for (const panel of [historySource, personTarget, comparisonSource, numbersTarget]) panel.removeAttribute("aria-hidden");
    if (!still) measure();
  }
  function playback(target) {
    if (stage.dataset.static === "true") return;
    stop();
    if (Math.abs(target - state.p) < .001) state.p = target ? 0 : 1;
    play.textContent = "Pozastavit";
    tween = gsap.to(state, { p: target, duration: 4.2 * Math.abs(target - state.p), ease: "none", onUpdate: render, onComplete: stop });
  }
  slider.addEventListener("input", () => setProgress(Number(slider.value) / 1000));
  play.addEventListener("click", () => tween ? stop() : playback(state.p >= 1 ? 0 : 1));
  reverse.addEventListener("click", () => playback(0));
  document.querySelectorAll("[data-frame]").forEach((button) => button.addEventListener("click", () => setProgress(Number(button.dataset.frame))));
  document.querySelectorAll("[data-mode]").forEach((button) => {
    if (button === stage) return;
    button.addEventListener("click", () => {
      stop(); state.mode = button.dataset.mode; state.p = 0; stage.dataset.mode = state.mode;
      stage.setAttribute("aria-label", state.mode === "history" ? "Historický rám předává místo prvnímu lidskému příběhu" : "Dělicí čára přechází do osy doložených čísel");
      document.querySelectorAll("button[data-mode]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      policy(); render();
    });
  });
  split.addEventListener("input", () => {
    state.split = Number(split.value) / 100;
    $("#split-output").value = split.value + " %";
    $(".now-image").style.clipPath = `inset(0 0 0 ${split.value}%)`;
    setProgress(0); measure();
  });
  reduce.addEventListener("click", () => { state.reduced = !state.reduced; policy(); });
  motion.addEventListener("change", policy);
  compact.addEventListener("change", policy);
  stage.addEventListener("wheel", (event) => {
    if (stage.dataset.static === "true" || event.ctrlKey || event.deltaY === 0) return;
    const next = clamp(state.p + event.deltaY / 1800);
    if (next === state.p) return;
    event.preventDefault(); setProgress(next);
  }, { passive: false });
  const observer = new ResizeObserver(measure);
  observer.observe(stage);
  Promise.all([document.fonts.ready, archive.decode(), portrait.decode()]).then(() => { ready = true; policy(); render(); }).catch(() => { ready = false; policy(); });
  policy();
  addEventListener("pagehide", () => { stop(); observer.disconnect(); });
})();
