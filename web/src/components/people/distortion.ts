/** A single on-demand canvas enhances the visible DOM photograph. */
export function createDistortion(
  canvas: HTMLCanvasElement,
  section: HTMLElement,
) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return () => {};
  function shader(type: number, code: string) {
    const value = gl!.createShader(type)!;
    gl!.shaderSource(value, code);
    gl!.compileShader(value);
    if (!gl!.getShaderParameter(value, gl!.COMPILE_STATUS)) {
      gl!.deleteShader(value);
      return null;
    }
    return value;
  }
  const vertex = shader(
    gl.VERTEX_SHADER,
    "attribute vec2 a; varying vec2 uv; void main(){uv=(a+1.)*.5;gl_Position=vec4(a,0.,1.);}",
  );
  const fragment = shader(
    gl.FRAGMENT_SHADER,
    `precision mediump float;
    varying vec2 uv; uniform sampler2D image; uniform float strength; uniform vec2 crop;
    void main(){ vec2 p=uv; p.x += sin(p.y*11.)*strength*.018; p=(p-.5)*crop+.5;
      gl_FragColor=texture2D(image,vec2(p.x,1.-p.y)); }`,
  );
  if (!vertex || !fragment) return () => {};
  const program = gl.createProgram()!;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return () => {};
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const loc = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const strength = gl.getUniformLocation(program, "strength"),
    crop = gl.getUniformLocation(program, "crop");
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  let previous = scrollY,
    velocity = 0,
    frame = 0,
    loaded = "",
    disposed = false;
  const photos = Array.from(
    section.querySelectorAll<HTMLElement>("[data-photo-wipe]"),
  );
  function draw() {
    frame = 0;
    if (disposed || document.hidden) return;
    if (section.dataset.handoff === "true" || section.dataset.entryHandoff === "true") {
      canvas.style.opacity = "0";
      previous = scrollY;
      velocity = 0;
      return;
    }
    const delta = scrollY - previous;
    previous = scrollY;
    velocity = velocity * 0.78 + Math.max(-2, Math.min(2, delta * 0.04)) * 0.22;
    if (Math.abs(velocity) < 0.006) {
      canvas.style.opacity = "0";
      return;
    }
    const visible = photos.find((photo) => {
      const r = photo.getBoundingClientRect();
      return r.left + r.width / 2 > 0 && r.left + r.width / 2 < innerWidth;
    });
    const image = visible?.querySelector("img");
    if (visible && image?.complete && image.naturalWidth) {
      const rect = visible.getBoundingClientRect(),
        parent = section.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio, 1.5);
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      canvas.style.left = rect.left - parent.left + "px";
      canvas.style.top = rect.top - parent.top + "px";
      canvas.style.clipPath = getComputedStyle(visible).clipPath;
      try {
        if (loaded !== image.currentSrc) {
          gl!.texImage2D(
            gl!.TEXTURE_2D,
            0,
            gl!.RGBA,
            gl!.RGBA,
            gl!.UNSIGNED_BYTE,
            image,
          );
          loaded = image.currentSrc;
        }
        const imageRatio = image.naturalWidth / image.naturalHeight,
          targetRatio = rect.width / rect.height;
        gl!.uniform2f(
          crop,
          Math.min(1, targetRatio / imageRatio),
          Math.min(1, imageRatio / targetRatio),
        );
        gl!.viewport(0, 0, canvas.width, canvas.height);
        gl!.uniform1f(strength, velocity);
        gl!.drawArrays(gl!.TRIANGLES, 0, 6);
        canvas.style.opacity = "1";
      } catch {
        canvas.style.opacity = "0";
      }
    }
    frame = requestAnimationFrame(draw);
  }
  const start = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };
  window.addEventListener("scroll", start, { passive: true });
  return () => {
    disposed = true;
    window.removeEventListener("scroll", start);
    cancelAnimationFrame(frame);
    canvas.style.opacity = "0";
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  };
}
