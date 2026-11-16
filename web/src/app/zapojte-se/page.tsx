import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { JoinForm } from "@/components/join/JoinForm";
import s from "./join.module.css";

export const metadata: Metadata = {
  title: "Zapoj se",
  description:
    "Sdílej svou cestu s Erasmem, nech si poslat, jak vyjet, nebo zapoj svou školu či organizaci do 40 let Erasmu.",
};

export default function JoinPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Zapoj se do výročí"
        route="open"
        title="Erasmus píšou lidé."
        lead="Erasmus návratem nekončí. Pokračuje u&nbsp;lidí, kterým zkušenost předáš dál. Ke 40 letům sbíráme příběhy, kontakty na ty, kdo chtějí vyjet, a&nbsp;nápady škol a&nbsp;organizací."
        image={{
          src: "/media/placeholders/ph-campus-conversation.jpg",
          alt: "Ilustrační snímek: dva studenti v\u00a0rozhovoru před školní budovou.",
          position: "62% 30%",
        }}
      >
        <a href="#zapojeni" className={s.start}>
          Vybrat svou cestu <span aria-hidden="true">↓</span>
        </a>
      </PageIntro>
      <div className={s.content}>
        <JoinForm />
        <p className={s.photoNote}>
          Úvodní fotografie je z&nbsp;fotobanky. Nezachycuje doložený příběh
          účastníků programu.
        </p>
      </div>
    </main>
  );
}
