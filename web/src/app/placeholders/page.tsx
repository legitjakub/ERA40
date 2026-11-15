import Link from "next/link";
import { stories } from "@/content/stories";
export default function Placeholders() {
  return (
    <main id="main" className="document-page">
      <h1>O&nbsp;modelovém obsahu</h1>
      <p>Tento web je připravovaný obsahový a&nbsp;interakční prototyp.</p>
      <h2>Modelové příběhy</h2>
      <p>
        {stories.filter((story) => story.status === "model-story").map((story) => story.name).join(", ")}{" "}
        jsou smyšlené postavy. Jejich příběhy i&nbsp;citace ukazují různé zkušenosti
        s&nbsp;Erasmem. Původ obsahu vysvětluje společná poznámka u&nbsp;přehledu
        a&nbsp;text v&nbsp;detailu příběhu.
      </p>
      <h2>Ilustrativní fotografie a&nbsp;film</h2>
      <p>
        Současné snímky a&nbsp;film využívají materiály Pexels. Záběry nenesou
        identitu konkrétních účastníků Erasmu. Porovnání tehdy a&nbsp;teď v&nbsp;kapitole Návrat používá
        současné ilustrační fotografie předmětů a&nbsp;situací.
      </p>
      <h2>Časové údaje</h2>
      <p>
        Účastnická čísla popisují evidenci DZS k&nbsp;31. 12. 2023. Rozpočet téměř
        103 milionů eur se vztahuje k&nbsp;výzvě 2026. Aktualizace před publikací je
        součástí přípravy obsahu.
      </p>
      <h2>Zapsání příběhu</h2>
      <p>
        Zprávy odeslané přes Zapoj se se ukládají pro tým výročí. Zveřejnění
        příběhu vyžaduje výslovný souhlas jeho autora.
      </p>
      <Link href="/">Zpět k&nbsp;příběhům</Link>
    </main>
  );
}
