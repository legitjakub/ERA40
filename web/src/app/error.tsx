"use client";

import Link from "next/link";
import { PageIntro } from "@/components/pages/PageIntro";
import s from "./lost.module.css";

/* Blueprint v0.2 copy C11: no technical detail and no promise of contact. */
export default function RouteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Chyba stránky"
        title="Tady se cesta přerušila."
        lead="Stránku se nepodařilo zobrazit."
      >
        <div className={s.actions}>
          <button type="button" className={s.primary} onClick={() => reset()}>
            Načíst znovu
          </button>
          <Link className={s.secondary} href="/">
            Zpět na výstavu
          </Link>
        </div>
      </PageIntro>
    </main>
  );
}
