import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RouteMap } from "@/components/archive/RouteMap";
import { SharedPhoto } from "@/components/archive/SharedPhoto";
import { StoryLabel } from "@/components/archive/StoryLabel";
import { StoryImpact } from "@/components/archive/StoryImpact";
import { StoryDetailScene } from "@/components/archive/StoryDetailScene";
import { storyDetails } from "@/content/story-details";
import {
  getStory,
  stories,
  storyKind,
  storyKinds,
  storyPhoto,
} from "@/content/stories";
import s from "./story.module.css";

export function generateStaticParams() {
  return stories.map((story) => ({ id: story.id }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const story = getStory(id);
  if (!story) return {};
  return {
    title: `${story.name}: ${story.from} – ${story.to}`,
    description: `„${story.quote}“ Modelový příběh k 40 letům Erasmu.`,
  };
}

// URL data stays behind Suspense so the shared App Shell can be prefetched;
// the eight stories are still fully prerendered via generateStaticParams.
export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main id="main" className={s.page}>
      <Suspense
        fallback={
          <div className={s.hero} aria-hidden="true">
            <div className={s.heroText} />
            <div className={s.photo} />
          </div>
        }
      >
        <StoryContent params={params} />
      </Suspense>
    </main>
  );
}

async function StoryContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  const index = stories.indexOf(story);
  const next = stories[(index + 1) % stories.length];
  const photo = storyPhoto(story);
  const nextPhoto = storyPhoto(next);
  const kind = storyKinds.find((k) => k.id === storyKind(story))?.label;
  const body = storyDetails[story.id] ?? [];

  return (
    <>
      <article>
        <header className={s.hero}>
          <div className={s.heroText}>
            <p className={s.back}>
              <Link href="/pribehy">Všechny příběhy</Link>
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(stories.length).padStart(2, "0")}
              </span>
            </p>
            {/* R10: the title is the route and the name. */}
            <h1 className={s.title}>
              <span className={s.route}>
                {story.from} <span aria-hidden="true">⟶</span>
                <span className="visually-hidden"> do </span> {story.to}
              </span>
              <span className="visually-hidden">, </span>
              <span className={s.name}>{story.name}</span>
            </h1>
            <p className={s.label}>
              <StoryLabel story={story} />
            </p>
          </div>
          <SharedPhoto id={story.id}>
            <figure className={s.photo} data-grain data-shared-photo={story.id}>
              <Image
                src={photo.file}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <figcaption>
                Ilustrační snímek · {story.to}, {story.year}
              </figcaption>
            </figure>
          </SharedPhoto>
        </header>

        {/* P1: the quote gets its own quiet moment, revealed word by word. */}
        <section className={s.voice} aria-label={`Slovy: ${story.name}`}>
          <blockquote className={s.voiceQuote} data-voice>
            „{story.quote}“
          </blockquote>
          <p className={s.voiceBy}>
            {story.name} · {story.to}, {story.year}
          </p>
        </section>

        <div className={s.body}>
          <aside className={s.aside}>
            <dl className={s.facts}>
              <div>
                <dt>Typ pobytu</dt>
                <dd>{story.mobility}</dd>
              </div>
              <div>
                <dt>Obor</dt>
                <dd>{story.field}</dd>
              </div>
              <div>
                <dt>Rok</dt>
                <dd>{story.year}</dd>
              </div>
              <div>
                <dt>Cíl</dt>
                <dd>
                  {story.to}, {story.toCountry}
                </dd>
              </div>
              {kind && (
                <div>
                  <dt>Skupina</dt>
                  <dd>{kind}</dd>
                </div>
              )}
            </dl>
            <RouteMap story={story} />
          </aside>
          <div className={s.text}>
            <div data-reveal>
              <StoryImpact story={story} />
            </div>
            <p className={s.lead} data-reveal>{story.excerpt}</p>
            {body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} data-reveal>{paragraph}</p>
            ))}
            <p className={s.disclaimer}>
              Postava, jméno i&nbsp;citace jsou modelové. Fotografie je ilustrační a&nbsp;nezobrazuje skutečného účastníka.
            </p>
          </div>
        </div>
      </article>

      <Link href={`/pribehy/${next.id}`} className={s.next}>
        <span className={s.nextLabel}>Kdo pokračuje dál</span>
        <span className={s.nextName}>{next.name}</span>
        <span className={s.nextRoute}>
          {next.from} <span aria-hidden="true">⟶</span> {next.to}
        </span>
        <span className={s.nextPhoto} data-grain data-next-photo aria-hidden="true">
          <Image src={nextPhoto.file} alt="" fill sizes="40vw" />
        </span>
      </Link>

      <aside className={s.invite}>
        <p>Máš podobnou zkušenost?</p>
        <Link href="/zapojte-se#pribeh">Přidat svůj příběh</Link>
      </aside>
      <StoryDetailScene />
    </>
  );
}
