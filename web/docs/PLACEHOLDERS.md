# Obsah k nahrazení nebo potvrzení

## Modelové příběhy

Všech osm příběhů v `src/content/stories.ts` a jejich delší vyprávění v `src/content/story-details.ts` jsou fikce. Mají viditelné označení MODEL STORY – FICTIONAL PLACEHOLDER v galerii, mapě i dialogu. Jména a citace nejsou připsány reálným osobám. Před nahrazením je potřeba získat skutečný rozhovor, schválenou citaci, fotografii a souhlas k použití.

## Fotografie a film

Aktivní rozhraní používá současné fotografie a záběry Pexels. U fotografií je označení Ilustrační snímek, u videa Ilustrační video. Historie ani porovnání Tehdy a teď neoznačují tyto snímky za archiv. Původní AI vizuály zůstávají v podkladech projektu a starších assetech. Fallback fotografie studijního stolu z původní sady je AI ilustrace a je určena pouze pro případ chybějícího mapování fotografie.

Před veřejným uvedením potvrdit vhodnost zobrazení osob v kontextu programu a doplnit případné úplné jmenné kredity ze zdrojových stránek. Samotná fotografie nepotvrzuje účast zobrazeného člověka na Erasmu.

## Statistiky

Účastnická evidence platí k 31. 12. 2023, rozpočet k výzvě 2026. Kontrola zdrojů proběhla 13. 11. 2026. Čísla nepředstavují stav roku 2027. Před uvedením projektu aktualizovat nebo ponechat toto časové označení.

## Branding a vydavatel

Typografický nápis Erasmus+ v záhlaví je pracovní wordmark. Oficiální finální logotyp je potřeba dodat nebo potvrdit podle manuálu. Patička podle `DESIGN.md` ukazuje pás „Vydává Dům zahraniční spolupráce“ a „Spolufinancováno Evropskou unií“ s místními soubory z `public/brand/`. Pás nese viditelnou poznámku, že jde o návrh k potvrzení. Před uvedením potvrdit vydavatele, financování tohoto konkrétního webu a dodat oficiální soubory logotypů (DZS a varianta „Spolufinancováno Evropskou unií“ podle manuálu EU). Pak poznámku odstranit v `src/components/layout/SiteFooter.tsx`.

## Sběr kontaktů a příběhů

Formulář `/zapojte-se` ukládá záznamy jen lokálně do `data/kontakty.ndjson`. Před spuštěním je potřeba:

- napojit schválené úložiště vydavatele (CRM nebo databázi) v `src/lib/contacts/store.ts`,
- nechat schválit text `/ochrana-osobnich-udaju` pověřencem pro ochranu osobních údajů a doplnit zvýrazněná místa (správce, kontakt, doba uložení, zpracovatel),
- při změně textu zvýšit `PRIVACY_VERSION` v `src/lib/contacts/schema.ts`, aby u každého záznamu bylo vidět, s čím člověk souhlasil,
- odstranit viditelnou poznámku „Prototyp“ pod tlačítkem Odeslat,
- určit redakční postup pro příběhy (kdo čte, jak se posílá text ke schválení) a způsob odesílání novinek.

Ochrana proti spamu je zatím jen skryté pole a jednoduchý limit počtu odeslání v paměti serveru. Pro veřejný provoz doplnit ochranu na úrovni hostingu.

## Vybraná technická omezení

Měření a automatizované průchody používají Chromium. Safari, Firefox a fyzický iPhone vyžadují samostatný přejímací průchod. Experimentální 3D scéna P2 je popsaná v doporučení níže a čeká na obsahové rozhodnutí.

### Návrh P2

Závěrečná trasa by se mohla na jednu krátkou scénu prostorově naklonit. Zachovala by skutečné body mapy a pokračovala do CTA. Přínos musí být posouzen proti již fungující SVG variantě, době načtení a mobilní zkušenosti.
