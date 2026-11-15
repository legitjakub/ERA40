import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageIntro";
import s from "@/components/pages/Prose.module.css";

export const metadata: Metadata = {
  title: "O projektu",
  description:
    "Digitální výstava ke 40 letům evropského programu Erasmus+. Co je ověřené, co modelové a jak pracujeme s tvými příběhy.",
};

const infographic =
  "https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf";

export default function AboutPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="O&nbsp;projektu"
        title="Čtyřicet let cest."
        lead="Erasmus+ navždy je digitální výstava ke 40 letům evropského programu Erasmus+ (1987–&#8288;2027). Česko je jeho součástí od roku 1998."
        image={{
          src: "/media/placeholders/ph-group.jpg",
          alt: "Skupina lidí v\u00a0rozhovoru na schodech",
          position: "25% 50%",
        }}
      />
      <div className={s.body}>
        <ul className={s.facts}>
          <li>
            <strong>1987</strong>
            <span>Evropská komise spouští program Erasmus. Na začátku je v&nbsp;něm jedenáct zemí.</span>
          </li>
          <li>
            <strong>1998</strong>
            <span>Česko se zapojuje do evropských vzdělávacích programů.</span>
          </li>
          <li>
            <strong>411 400</strong>
            <span>účastníků vyjelo z&nbsp;Česka do zahraničí.</span>
            <small>
              Výzvy 1998–&#8288;2023, stav k&nbsp;31.&nbsp;12.&nbsp;2023.{" "}
              <a href={infographic}>DZS (PDF)</a>
            </small>
          </li>
        </ul>

        <section className={s.section}>
          <h2>Proč tento web</h2>
          <div className={s.text}>
            <p>
              O&nbsp;Erasmu se většinou mluví v&nbsp;číslech. My ho chceme vyprávět
              přes lidi: přes první přednášku v&nbsp;cizím jazyce, ranní vlak na
              stáž nebo kamarádství, které vydrží desítky let.
            </p>
            <p>
              Web prochází osm kapitol od odjezdu přes návrat po pokračování. Historie
              spojuje evropskou linku od roku 1987 s&nbsp;českou od roku 1998.
              Mapa ukazuje, kam cesty vedou, a&nbsp;čísla připomínají, kolik lidí
              už vyjelo.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Co je ověřené a&nbsp;co modelové</h2>
          <div className={s.text}>
            <p>
              Data a&nbsp;historická fakta pocházejí z&nbsp;veřejných materiálů Domu
              zahraniční spolupráce. U&nbsp;každého čísla uvádíme období a&nbsp;zdroj.
            </p>
            <p>
              Příběhy na webu jsou zatím modelové. Postavy, jména i&nbsp;citace jsou
              fiktivní a&nbsp;nesou viditelné označení. Fotografie a&nbsp;film jsou
              ilustrační a&nbsp;nezobrazují skutečné účastníky. Postupně je nahradí
              skutečné výpovědi se souhlasem.
            </p>
            <ul>
              <li>
                <Link href="/placeholders">Seznam modelového obsahu</Link>
              </li>
              <li>
                <Link href="/credits">Zdroje a&nbsp;obrazové kredity</Link>
              </li>
            </ul>
          </div>
        </section>

        <section className={s.section}>
          <h2>Jak pracujeme s&nbsp;tvými příběhy</h2>
          <div className={s.text}>
            <ul>
              <li>Každý příběh si přečte redakce výročí.</li>
              <li>
                Pokud ho chceme zveřejnit, pošleme ti upravený text ke
                schválení. Bez souhlasu nic nezveřejníme.
              </li>
              <li>
                Kontakt použijeme jen k&nbsp;účelu, který jsi ve formuláři
                vybral(a). Souhlas můžeš kdykoli odvolat.
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
              Program Erasmus+ v&nbsp;Česku zajišťuje{" "}
              <a href="https://www.dzs.cz/">Dům zahraniční spolupráce</a>.
              Vydavatel tohoto webu, jeho financování a&nbsp;kontaktní adresa{" "}
              <span className={s.todo}>čekají na potvrzení</span>.
            </p>
            <p>
              Do té doby nám můžeš napsat přes{" "}
              <Link href="/zapojte-se#organizace">formulář pro školy a&nbsp;organizace</Link>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
