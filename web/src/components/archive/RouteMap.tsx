import type { Story } from "@/content/types";
import { EUROPE_VIEWBOX, project, routeArc } from "@/lib/geo/europe";
import s from "./RouteMap.module.css";

/**
 * A crop of the Natural Earth map around one journey: two stations and the
 * Trasa arc between them, drawn once on load.
 */
export function RouteMap({ story }: { story: Story }) {
  const a = project(story.coords.from);
  const b = project(story.coords.to);
  const pad = 70;
  const minX = Math.max(0, Math.min(a[0], b[0]) - pad);
  const minY = Math.max(0, Math.min(a[1], b[1]) - pad);
  const maxX = Math.min(EUROPE_VIEWBOX.width, Math.max(a[0], b[0]) + pad);
  const maxY = Math.min(EUROPE_VIEWBOX.height, Math.max(a[1], b[1]) + pad);
  // Keep a calm 4:3 frame around the route.
  let w = maxX - minX;
  let h = maxY - minY;
  if (w / h < 4 / 3) w = (h * 4) / 3;
  else h = (w * 3) / 4;
  const x = Math.max(0, Math.min(EUROPE_VIEWBOX.width - w, (minX + maxX - w) / 2));
  const y = Math.max(0, Math.min(EUROPE_VIEWBOX.height - h, (minY + maxY - h) / 2));
  const k = w / 400; // keeps strokes and labels a constant size
  return (
    <figure className={s.map}>
      <svg
        viewBox={`${x} ${y} ${w} ${h}`}
        role="img"
        aria-label={`Trasa ${story.from} – ${story.to}`}
      >
        <image
          href="/media/europe-land.svg"
          width={EUROPE_VIEWBOX.width}
          height={EUROPE_VIEWBOX.height}
        />
        <path
          className={s.route}
          data-route-draw
          d={routeArc(a, b)}
          pathLength={1}
          style={{ strokeWidth: 2.4 * k }}
        />
        {[
          [a, story.from, "from"],
          [b, story.to, "to"],
        ].map(([point, name, role]) => {
          const [px, py] = point as [number, number];
          return (
            <g key={role as string} className={s.stop} data-role={role}>
              <circle cx={px} cy={py} r={6 * k} style={{ strokeWidth: 2 * k }} />
              <text x={px + 11 * k} y={py - 9 * k} style={{ fontSize: 15 * k }}>
                {name as string}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>Mapový podklad Natural Earth</figcaption>
    </figure>
  );
}
