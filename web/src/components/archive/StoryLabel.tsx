import type { Story } from "@/content/types";

/** Real-story sources. Model content is explained once by its page or detail. */
export function StoryLabel({ story }: { story: Story }) {
  return story.status === "model-story" ? null : (
    <a href={story.source.url}>{story.source.label}</a>
  );
}
