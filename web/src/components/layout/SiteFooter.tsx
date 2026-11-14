import Link from "next/link";
import s from "./SiteFooter.module.css";

/*
 * Publisher and co-funding lines follow docs/DESIGN.md §6 (08 Budoucnost).
 * Before public launch, confirm the publisher, the funding statement and the
 * official logo files (see docs/PLACEHOLDERS.md).
 */
export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div>
          <p className={s.brand}>Erasmus v Česku</p>
          <p>Příběhy, které překračují hranice.</p>
          <p className={s.note}>
            Obsahový prototyp ke 40 letům evropského programu Erasmus.
          </p>
        </div>
        <nav aria-label="Závěrečná navigace">
          <Link href="/pribehy">Všechny příběhy</Link>
          <Link href="/zapojte-se">Zapojte se</Link>
          <Link href="/o-projektu">O projektu</Link>
          <Link href="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>
          <Link href="/credits">Zdroje a obrazové kredity</Link>
          <a href="https://www.dzs.cz/">Dům zahraniční spolupráce</a>
          <a href="https://erasmus-plus.ec.europa.eu/">Erasmus+</a>
        </nav>
        <div className={s.partners}>
          <p className={s.partner}>
            <span className={s.plate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/dzs.svg" alt="" width={36} height={36} />
            </span>
            <span>
              Vydává
              <br />
              <strong>Dům zahraniční spolupráce</strong>
            </span>
          </p>
          <p className={s.partner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={s.flag}
              src="/brand/eu.svg"
              alt="Vlajka Evropské unie"
              width={66}
              height={45}
            />
            <strong>Spolufinancováno Evropskou unií</strong>
          </p>
          <p className={s.pending}>
            Návrh patičky. Vydavatel, financování a logotypy čekají na
            potvrzení.
          </p>
        </div>
        <div className={s.bottom}>
          <p>Evropa od roku 1987. Česko od roku 1998.</p>
          <Link href="/placeholders">O modelovém obsahu</Link>
        </div>
      </div>
    </footer>
  );
}
