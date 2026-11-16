import Image from "next/image";
import type { ReactNode } from "react";
import s from "./PageIntro.module.css";

/**
 * Opening of every subpage, in the language of the home hero: a full-bleed
 * photograph under an ink scrim (or an EU-blue field), white condensed type
 * bottom-left and the yellow Trasa drawn along the bottom edge.
 */
export function PageIntro({
  kicker,
  title,
  lead,
  children,
  image,
  route = "travelled",
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: { src: string; alt: string; position?: string };
  /** Trasa grammar: solid = travelled; dotted, static = still to come. */
  route?: "travelled" | "open";
}) {
  return (
    <header className={s.intro} data-tone={image ? "photo" : "blue"}>
      {image && (
        <div className={s.media} data-grain>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
          <span className={s.scrim} aria-hidden="true" />
        </div>
      )}
      <div className={s.inner}>
        <p className={s.kicker}>
          <span className={s.station} aria-hidden="true" />
          {kicker}
        </p>
        <h1 className={s.title}>{title}</h1>
        {lead && <p className={s.lead}>{lead}</p>}
        {children}
      </div>
      <span className={s.trasa} data-route={route} aria-hidden="true" />
    </header>
  );
}
