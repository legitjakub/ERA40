import Link from "next/link";
import s from "./ContentNote.module.css";

/** A single editorial note replaces repeated badges over every photograph. */
export function ContentNote({ dark = false, story = false }: { dark?: boolean; story?: boolean }) {
  return (
    <p className={s.note} data-dark={dark || undefined} data-content-note>
      {story
        ? "Postava i citace jsou modelové, fotografie doprovází vyprávění."
        : "Příběhy jsou modelové. Současné fotografie doprovázejí jejich vyprávění."}{" "}
      <Link href="/placeholders">O původu obsahu</Link>
    </p>
  );
}
