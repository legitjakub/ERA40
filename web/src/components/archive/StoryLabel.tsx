import type { Story } from "@/content/types";

/** Visible integrity label shared by the archive and the story pages. */
export function StoryLabel({ story }: { story: Story }) {
  return story.status === "model-story" ? (
    <span>MODEL STORY – FICTIONAL PLACEHOLDER</span>
  ) : (
    <a href={story.source.url}>{story.source.label}</a>
  );
}
