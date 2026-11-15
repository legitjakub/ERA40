import Link from "next/link";
import media from "@/content/media.json";
import { comparisons } from "@/content/comparisons";
export default function Credits() {
  return (
    <main id="main" className="document-page">
      <h1>Zdroje a&nbsp;obrazové kredity</h1>
      <p>
        Fotografie a&nbsp;filmové záběry ilustrují prostředí cestování a&nbsp;studia.
        Osoby na fotografiích nepředstavují postavy modelových příběhů.
      </p>
      <h2>Fotografie a&nbsp;záběry Pexels</h2>
      <p>
        <a href="https://www.pexels.com/license/">Podmínky licence Pexels</a>
      </p>
      <ul>
        {media.map((m) => (
          <li key={m.id}>
            <a href={m.sourceUrl}>{m.alt}</a> — {m.credit}. {m.license}.
          </li>
        ))}
      </ul>
      <h2>Porovnání tehdy a&nbsp;teď v&nbsp;kapitole Návrat</h2>
      <ul>
        {comparisons.map((c) => (
          <li key={c.topic}>
            {c.topic} — <a href={c.then.source}>{c.then.caption}</a>,{" "}
            <a href={c.now.source}>{c.now.caption}</a>.
          </li>
        ))}
      </ul>
      <h2>Mapa</h2>
      <p>
        <a href="https://www.naturalearthdata.com/about/terms-of-use/">
          Natural Earth
        </a>
        , data ve veřejné doméně. Projekce equirectangular se standardní
        rovnoběžkou přibližně 52°.
      </p>
      <h2>Fakta a&nbsp;statistiky</h2>
      <p>
        <a href="https://www.dzs.cz/sites/default/files/2024-03/Infografika_20let_finalA4.pdf">
          DZS, infografika z&nbsp;roku 2024
        </a>
        . Účastnická data za výzvy 1998–&#8288;2023, evidence k&nbsp;31.&nbsp;12.&nbsp;2023.
      </p>
      <p>
        <a href="https://www.dzs.cz/sites/default/files/press_release/2025-11/TZ_V%C3%BDzva_Rozpo%C4%8Det_Erasmus_26_DZS.pdf">
          DZS, rozpočet výzvy 2026
        </a>
        , 12. 11. 2025.
      </p>
      <Link href="/">Zpět k&nbsp;příběhům</Link>
    </main>
  );
}
