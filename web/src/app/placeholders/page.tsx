import Link from "next/link";
import { FictionBadge } from "@/components/ui/FictionBadge";
export default function Placeholders() {
  return (
    <main id="main" className="document-page">
      <h1>O&nbsp;modelovém obsahu</h1>
      <p>Tento web je připravovaný obsahový a&nbsp;interakční prototyp.</p>
      <h2>Osm modelových příběhů</h2>
      <p>
        Tereza, Ondřej, Inês, Jakub, Jana, Adéla, Martin, Lucie a&nbsp;Marta jsou
        smyšlené postavy. Jejich příběhy i&nbsp;citace vznikly jako ilustrace různých
        zkušeností s&nbsp;Erasmem. U&nbsp;každého příběhu je viditelné označení „<FictionBadge />“.
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
        Zápis lze uložit jako textový soubor do vlastního zařízení. Pro veřejný
        sběr příběhů bude potřeba připravit redakční zpracování a&nbsp;souhlasy.
      </p>
      <Link href="/">Zpět k&nbsp;příběhům</Link>
    </main>
  );
}
