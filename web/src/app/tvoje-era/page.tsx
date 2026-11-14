import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { EraQuiz } from "@/components/era/EraQuiz";
import s from "./era.module.css";

export const metadata: Metadata = {
  title: "Jaké je tvoje ERA? — Erasmus+ již 40 let mění životy",
  description:
    "Pět otázek o tom, co z Erasmu žije dodnes a komu se to dostalo dál. Výsledkem je nálepka ke stažení a sdílení. Platí i pro ty, kdo na Erasmu nikdy nebyli.",
};

export default function EraPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Erasmus+ již 40 let mění životy"
        title="Jaké je tvoje ERA?"
        lead="Co z tvého Erasmu žije dodnes? A komu se to dostalo dál? Erasmus se týká i lidí, kteří nikdy nevyjeli."
      />
      <div className={s.content}>
        <EraQuiz />
      </div>
    </main>
  );
}
