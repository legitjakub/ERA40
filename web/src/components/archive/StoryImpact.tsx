import Link from "next/link";
import type { Story } from "@/content/types";
import { impactThemes, storyImpact } from "@/content/story-impact";
import s from "./StoryImpact.module.css";

export function StoryImpact({ story }: { story: Story }) {
  const impact = storyImpact(story);
  if (!impact) return null;
  return (
    <aside className={s.impact} aria-label="Pokračování příběhu">
      <p className={s.label}>Co pokračuje dál</p>
      <p className={s.summary}>{impact.summary}</p>
      <div className={s.links} aria-label="Další příběhy se stejným tématem">
        {impact.themes.map((id) => (
          <Link key={id} href={`/pribehy?dopad=${id}`}>
            {impactThemes.find((theme) => theme.id === id)?.label} <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
