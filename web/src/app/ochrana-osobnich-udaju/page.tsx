import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageIntro";
import { PRIVACY_VERSION } from "@/lib/contacts/schema";
import s from "@/components/pages/Prose.module.css";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů — Erasmus v Česku",
};

function Todo({ children }: { children: React.ReactNode }) {
  return <span className={s.todo}>{children}</span>;
}

export default function PrivacyPage() {
  return (
    <main id="main" className={s.page}>
      <PageIntro
        kicker="Ochrana osobních údajů"
        title="Tvoje údaje, tvoje rozhodnutí."
        lead="Jak zacházíme s údaji z formuláře Zapoj se."
      />
      <div className={s.body}>
        <p className={s.draft} role="note">
          Návrh textu k právnímu posouzení. Před spuštěním webu ho musí
          schválit vydavatel a jeho pověřenec pro ochranu osobních údajů.
          Zvýrazněné části doplní vydavatel.
        </p>

        <section className={s.section}>
          <h2>Správce</h2>
          <div className={s.text}>
            <p>
              Správcem osobních údajů je <Todo>název, sídlo a IČO vydavatele</Todo>.
              Kontakt na pověřence pro ochranu osobních údajů:{" "}
              <Todo>e-mail pověřence</Todo>.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Jaké údaje zpracováváme</h2>
          <div className={s.text}>
            <ul>
              <li>Všichni: jméno, e-mail a zda chceš dostávat novinky.</li>
              <li>
                Sdílení příběhu: odkud a kam jsi vyjel(a), rok, typ pobytu, text
                příběhu a souhlas se zveřejněním.
              </li>
              <li>Zájem o výjezd: kdo jsi a kam by tě to táhlo.</li>
              <li>
                Školy a organizace: název organizace, role, telefon a zpráva.
              </li>
            </ul>
          </div>
        </section>

        <section className={s.section}>
          <h2>Proč a na jakém základě</h2>
          <div className={s.text}>
            <p>
              Údaje zpracováváme na základě tvého souhlasu (čl. 6 odst. 1
              písm. a) GDPR), abychom ti mohli odpovědět, připravit příběh ke
              zveřejnění nebo poslat informace k výročí. Novinky posíláme jen
              těm, kdo o ně požádali.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Jak dlouho</h2>
          <div className={s.text}>
            <p>
              Údaje uchováváme do konce kampaně k výročí, nejdéle do{" "}
              <Todo>datum, navrhujeme 31. 12. 2028</Todo>, nebo do odvolání
              souhlasu. Zveřejněné příběhy zůstávají na webu, dokud nás
              nepožádáš o jejich odstranění.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Kdo k nim má přístup</h2>
          <div className={s.text}>
            <p>
              Redakce výročí a <Todo>zpracovatel úložiště, např. poskytovatel CRM</Todo>.
              Údaje neprodáváme a nepředáváme dalším stranám pro marketing.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <h2>Tvoje práva</h2>
          <div className={s.text}>
            <p>
              Máš právo na přístup k údajům, jejich opravu, výmaz, omezení
              zpracování a přenositelnost. Souhlas můžeš kdykoli odvolat
              e-mailem na <Todo>kontaktní e-mail</Todo>. Pokud nesouhlasíš se
              způsobem zpracování, můžeš podat stížnost u{" "}
              <a href="https://uoou.gov.cz/">Úřadu pro ochranu osobních údajů</a>.
            </p>
            <p>
              Verze textu: {PRIVACY_VERSION}.{" "}
              <Link href="/zapojte-se">Zpět na formulář</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
