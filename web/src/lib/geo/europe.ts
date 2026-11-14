/**
 * Equirectangular projection used by the Natural Earth map asset
 * (public/media/europe-land.svg, 840 × 870 user units).
 */
export const EUROPE_VIEWBOX = { width: 840, height: 870 } as const;

export function project([lon, lat]: [number, number]): [number, number] {
  return [(lon + 15) * 15, (71 - lat) * 24.35];
}

/** A gentle arc between two projected points, bending away from the straight line. */
export function routeArc(a: [number, number], b: [number, number]) {
  const cx = (a[0] + b[0]) / 2 + Math.abs(a[1] - b[1]) * 0.16;
  const cy = (a[1] + b[1]) / 2 - Math.abs(a[0] - b[0]) * 0.16;
  return `M${a[0]} ${a[1]} Q${cx} ${cy} ${b[0]} ${b[1]}`;
}
