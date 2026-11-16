import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageIntro";
import s from "./lost.module.css";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
};

/* Blueprint v0.2 copy C10. */
export default function NotFound() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Stránka nenalezena"
        title="Sem žádná cesta nevede."
        lead="Adresa neexistuje, nebo se změnila."
      >
        <div className={s.actions}>
          <Link className={s.primary} href="/">
            Zpět na výstavu
          </Link>
          <Link className={s.secondary} href="/pribehy">
            Všechny příběhy
          </Link>
        </div>
      </PageIntro>
    </main>
  );
}
