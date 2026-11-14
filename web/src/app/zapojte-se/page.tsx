import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { JoinForm } from "@/components/join/JoinForm";
import s from "./join.module.css";

export const metadata: Metadata = {
  title: "Zapojte se — Erasmus v Česku",
  description:
    "Sdílejte svou cestu s Erasmem, nechte si poslat, jak vyjet, nebo zapojte svou školu či organizaci do 40 let Erasmu.",
};

export default function JoinPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Zapojte se do výročí"
        title="Erasmus píšou lidé."
        lead="Ke 40 letům Erasmu sbíráme příběhy absolventů, kontakty na ty, kdo chtějí vyjet, a nápady škol a organizací."
        image={{
          src: "/media/placeholders/ph-scrapbook.jpg",
          alt: "Cestovní deník s fotografiemi a poznámkami",
          position: "50% 60%",
        }}
      >
        <a href="#zapojeni" className={s.start}>
          Vybrat svou cestu <span aria-hidden="true">↓</span>
        </a>
      </PageIntro>
      <div className={s.content}>
        <JoinForm />
      </div>
    </main>
  );
}
