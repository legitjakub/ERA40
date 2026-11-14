import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageIntro";
import s from "@/components/pages/Prose.module.css";

export const metadata: Metadata = {
  title: "O projektu — Erasmus v Česku",
  description:
    "Digitální výstava ke 40 letům evropského programu Erasmus. Co je ověřené, co modelové a jak pracujeme s vašimi příběhy.",
};

const infographic =
  "https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf";

export default function AboutPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="O projektu"
        title="Čtyřicet let cest."
        lead="Erasmus v Česku je digitální výstava k 40 letům evropského programu Erasmus (1987–2027). Česko je jeho součástí od roku 1998."
        image={{
          src: "/media/hero/hero-desktop.avif",
          alt: "Odjezdová tabule a nástupiště nádraží",
          position: "50% 40%",
        }}
      />
      <div className={s.body}>
        <ul className={s.facts}>
          <li>
            <strong>1987</strong>
            <span>Evropská komise spouští program Erasmus. Na začátku je v něm jedenáct zemí.</span>
          </li>
          <li>
            <strong>1998</strong>
            <span>Česko se zapojuje do evropských vzdělávacích programů.</span>
          </li>
          <li>
            <strong>411 400</strong>
            <span>účastníků vyjelo z Česka do zahraničí.</span>
            <small>
              Výzvy 1998–2023, stav k 31. 12. 2023.{" "}
              <a href={infographic}>DZS (PDF)</a>
            </small>
          </li>
        </ul>

        <section className={s.section}>
          <h2>Proč tento web</h2>
          <div className={s.text}>
            <p>
              O Erasmu se většinou mluví v číslech. My ho chceme vyprávět
              přes lidi: přes první přednášku v cizím jazyce, ranní vlak na
              stáž nebo kamarádství, které vydrží desítky let.
            </p>
            <p>
              Web prochází osm kapitol od odjezdu po budoucnost. Historie
              spojuje evropskou linku od roku 1987 s českou od roku 1998.
              Mapa ukazuje, kam cesty vedou, a čísla připomínají, kolik lidí
              už vyjelo.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Co je ověřené a co modelové</h2>
          <div className={s.text}>
            <p>
              Data a historická fakta pocházejí z veřejných materiálů Domu
              zahraniční spolupráce. U každého čísla uvádíme období a zdroj.
            </p>
            <p>
              Příběhy na webu jsou zatím modelové. Postavy, jména i citace jsou
              fiktivní a nesou viditelné označení. Fotografie a film jsou
              ilustrační a nezobrazují skutečné účastníky. Postupně je nahradí
              skutečné výpovědi se souhlasem.
            </p>
            <ul>
              <li>
                <Link href="/placeholders">Seznam modelového obsahu</Link>
              </li>
              <li>
                <Link href="/credits">Zdroje a obrazové kredity</Link>
              </li>
            </ul>
          </div>
        </section>

        <section className={s.section}>
          <h2>Jak pracujeme s vašimi příběhy</h2>
          <div className={s.text}>
            <ul>
              <li>Každý příběh si přečte redakce výročí.</li>
              <li>
                Pokud ho chceme zveřejnit, pošleme vám upravený text ke
                schválení. Bez souhlasu nic nezveřejníme.
              </li>
              <li>
                Kontakt použijeme jen k účelu, který jste ve formuláři
                vybrali. Souhlas můžete kdykoli odvolat.
              </li>
            </ul>
            <p>
              <Link className={s.cta} href="/zapojte-se">
                Zapojit se
              </Link>
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Kdo za webem stojí</h2>
          <div className={s.text}>
            <p>
              Program Erasmus+ v Česku zajišťuje{" "}
              <a href="https://www.dzs.cz/">Dům zahraniční spolupráce</a>.
              Vydavatel tohoto webu, jeho financování a kontaktní adresa{" "}
              <span className={s.todo}>čekají na potvrzení</span>.
            </p>
            <p>
              Do té doby nám můžete napsat přes{" "}
              <Link href="/zapojte-se#organizace">formulář pro školy a organizace</Link>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
