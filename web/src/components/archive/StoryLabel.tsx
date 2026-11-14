import type { Story } from "@/content/types";
import { FictionBadge } from "@/components/ui/FictionBadge";

/** Visible integrity label shared by the archive and the story pages. */
export function StoryLabel({ story }: { story: Story }) {
  return story.status === "model-story" ? (
    <FictionBadge />
  ) : (
    <a href={story.source.url}>{story.source.label}</a>
  );
}
