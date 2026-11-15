import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentNote } from "@/components/ui/ContentNote";
import { PageIntro } from "@/components/pages/PageIntro";
import { StoryArchive } from "@/components/archive/StoryArchive";
import { stories, storyPhoto } from "@/content/stories";
import s from "@/components/archive/StoryArchive.module.css";

export const metadata: Metadata = {
  title: "Příběhy",
  description:
    "Archiv cest: studium, stáže, výuka a výměny mládeže. Modelové příběhy k 40 letům Erasmu.",
};

export default function StoriesPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Archiv cest"
        title="Každá cesta pokračuje jinak."
        lead={`${stories.length} příběhů z\u00a0Česka do Evropy a\u00a0z\u00a0Evropy do Česka.`}
      >
        <ContentNote dark />
        <ol className={s.strip} aria-label="Rychlý výběr příběhu">
          {stories.map((story) => (
            <li key={story.id}>
              <Link href={`/pribehy/${story.id}`}>
                <span className={s.stripPhoto} data-grain>
                  <Image
                    src={storyPhoto(story).file}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 11vw, 30vw"
                  />
                </span>
                <span className={s.stripName}>{story.name}</span>
                <span className={s.stripTo}>{story.to}</span>
              </Link>
            </li>
          ))}
        </ol>
      </PageIntro>
      <StoryArchive />
      <aside className={s.invite}>
        <p>Chybí tu ten tvůj?</p>
        <Link href="/zapojte-se#pribeh">Přidat svůj příběh</Link>
      </aside>
    </main>
  );
}
