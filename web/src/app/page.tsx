import { StoryProvider } from "@/components/people/StoryDialog";
import { Hero } from "@/components/hero/Hero";
import { PeopleIntro } from "@/components/people/PeopleIntro";
import { HistoryTimeline } from "@/components/history/HistoryTimeline";
import { PeopleStories } from "@/components/people/PeopleStories";
import { MapLand } from "@/components/map/MapLand";
import { EuropeMap } from "@/components/map/EuropeMap";
import { ThenNow } from "@/components/then-now/ThenNow";
import { Numbers } from "@/components/numbers/Numbers";
import { Future } from "@/components/future/Future";
import { JourneySequence } from "@/components/people/JourneySequence";

export default function HomePage() {
  return (
    <main id="main">
      <link
        rel="preload"
        as="image"
        href="/media/hero/hero-mobile.avif"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/media/hero/hero-desktop.avif"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <StoryProvider>
        <Hero />
        <PeopleIntro />
        <HistoryTimeline />
        <JourneySequence>
          <PeopleStories />
          <EuropeMap land={<MapLand />} />
        </JourneySequence>
        <ThenNow />
        <Numbers />
        <Future />
      </StoryProvider>
    </main>
  );
}
