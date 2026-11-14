import Link from "next/link";
import { FictionBadge } from "@/components/ui/FictionBadge";
export default function Placeholders() {
  return (
    <main id="main" className="document-page">
      <h1>O modelovém obsahu</h1>
      <p>Tento web je připravovaný obsahový a interakční prototyp.</p>
      <h2>Osm modelových příběhů</h2>
      <p>
        Tereza, Ondřej, Inês, Jakub, Jana, Adéla, Martin, Lucie a Marta jsou
        smyšlené postavy. Jejich příběhy i citace vznikly jako ilustrace různých
        zkušeností s Erasmem. U každého příběhu je viditelné označení „<FictionBadge />“.
      </p>
      <h2>Ilustrativní fotografie a film</h2>
      <p>
        Současné snímky a film využívají materiály Pexels. Záběry nenesou
        identitu konkrétních účastníků Erasmu. Porovnání Tehdy a teď používá
        současné ilustrační fotografie předmětů a situací.
      </p>
      <h2>Časové údaje</h2>
      <p>
        Účastnická čísla popisují evidenci DZS k 31. 12. 2023. Rozpočet téměř
        103 milionů eur se vztahuje k výzvě 2026. Aktualizace před publikací je
        součástí přípravy obsahu.
      </p>
      <h2>Zapsání příběhu</h2>
      <p>
        Zápis lze uložit jako textový soubor do vlastního zařízení. Pro veřejný
        sběr příběhů bude potřeba připravit redakční zpracování a souhlasy.
      </p>
      <Link href="/">Zpět k příběhům</Link>
    </main>
  );
}
